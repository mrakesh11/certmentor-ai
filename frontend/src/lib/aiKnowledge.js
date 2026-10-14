/**
 * Grounded AI Knowledge & Context Engine for CloudMentor AI.
 *
 * Provides factual, traceable context to the model derived strictly from:
 * 1. Official AWS documentation references and verified citations in learning-manifest.json.
 * 2. Real learner progress and retry state from `aws_learning_v1` and `aws_exam_stats`.
 * 3. Structured domain cheat sheet topics.
 *
 * Never fabricates verification statuses, question answers, or citations.
 */

import { loadProgress } from './progress';

// Known service comparison references grounded in official documentation
export const COMPARISONS = {
    'iam-vs-bucket-policy': {
        title: 'IAM Policies vs. S3 Bucket Policies',
        services: ['AWS IAM', 'Amazon S3'],
        docUrls: [
            'https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html',
            'https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-policies.html',
        ],
        keyDifferences: [
            'IAM policies are identity-based (attached to users, groups, or roles); S3 bucket policies are resource-based (attached directly to S3 buckets).',
            'IAM policies control what an identity can access across multiple AWS resources.',
            'S3 bucket policies control who (including cross-account principals or anonymous users) can access that specific bucket.',
            'Both use JSON policy grammar with Effect, Principal, Action, Resource, and Condition.',
        ],
    },
    's3-vs-ebs': {
        title: 'Amazon S3 vs. Amazon EBS',
        services: ['Amazon S3', 'Amazon EBS'],
        docUrls: [
            'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html',
            'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html',
        ],
        keyDifferences: [
            'S3 is object storage accessible over HTTP/HTTPS from anywhere; EBS is block storage attached to a single EC2 instance in the same AZ.',
            'S3 offers virtually unlimited scale and 99.999999999% (11 9s) durability; EBS provides high-performance persistent volumes for OS and file systems.',
            'S3 pricing is based on GB/month stored and requests; EBS charges for provisioned capacity whether used or idle.',
        ],
    },
    'sg-vs-nacl': {
        title: 'Security Groups vs. Network ACLs',
        services: ['Security Groups', 'Network Access Control Lists (NACLs)'],
        docUrls: [
            'https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security.html',
        ],
        keyDifferences: [
            'Security Groups operate at the instance level (EC2, RDS, etc.); NACLs operate at the subnet level.',
            'Security Groups are stateful (return traffic is automatically allowed); NACLs are stateless (inbound and outbound rules must be explicitly defined).',
            'Security Groups only support ALLOW rules; NACLs support both ALLOW and DENY rules evaluated in numerical order.',
        ],
    },
    'cloudwatch-vs-cloudtrail': {
        title: 'Amazon CloudWatch vs. AWS CloudTrail',
        services: ['Amazon CloudWatch', 'AWS CloudTrail'],
        docUrls: [
            'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html',
            'https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html',
        ],
        keyDifferences: [
            'CloudWatch focuses on PERFORMANCE metrics, logs, events, and alarms (CPU utilization, disk I/O, latency).',
            'CloudTrail focuses on AUDITING API activity and user actions (who did what, when, from which IP, and which API was called).',
            'Memory aid: CloudWatch monitors performance; CloudTrail tracks governance and account activity.',
        ],
    },
    'lambda-vs-ec2': {
        title: 'AWS Lambda vs. Amazon EC2',
        services: ['AWS Lambda', 'Amazon EC2'],
        docUrls: [
            'https://docs.aws.amazon.com/lambda/latest/dg/welcome.html',
            'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html',
        ],
        keyDifferences: [
            'EC2 is Infrastructure as a Service (IaaS): virtual servers where the customer manages the OS, patching, and scaling.',
            'Lambda is Serverless Function-as-a-Service (FaaS): event-driven code execution with zero server management.',
            'EC2 charges per second while the instance is running; Lambda charges based on execution count and duration (compute time).',
        ],
    },
};

/**
 * Format prompt context for explaining a specific practice question.
 *
 * @param {object} params
 * @param {object} params.question
 * @param {string[]} params.selectedAnswers
 * @param {boolean} params.isCorrect
 * @returns {string}
 */
export function buildQuestionExplanationPrompt({ question, selectedAnswers = [], isCorrect }) {
    if (!question) return '';

    const optionsText = (question.options || [])
        .map((o) => `[Option ${o.id}] ${o.text}`)
        .join('\n');

    const expectedAnswer = Array.isArray(question.answer)
        ? question.answer.join(', ')
        : (question.answer || 'Not specified');

    const userSelected = selectedAnswers.length > 0
        ? selectedAnswers.join(', ')
        : 'None selected';

    let knownExplanation = '';
    if (typeof question.explanation === 'object' && question.explanation) {
        knownExplanation = `
Official Reference Summary: ${question.explanation.summary || 'N/A'}
Why Correct: ${question.explanation.whyCorrect || 'N/A'}
Exam Tip: ${question.examTip || 'N/A'}
Common Trap: ${question.commonTrap || 'N/A'}
`;
    } else if (typeof question.explanation === 'string') {
        knownExplanation = question.explanation;
    }

    const citationText = question.citation?.url
        ? `Verified against official documentation: ${question.citation.url}`
        : 'Status: Practice question (drawing from standard CLF-C02 curriculum bank)';

    return `Please explain this AWS CLF-C02 question for the learner:

Question (${question.id}):
${question.text}

Answer Options:
${optionsText}

Learner's Selection: ${userSelected} (Outcome: ${isCorrect ? 'Correct' : 'Incorrect'})
Verified Answer Key: ${expectedAnswer}

Available Verified Notes:
${knownExplanation.trim()}
${citationText}

Instructions for your explanation:
1. Explain the AWS concept being tested in simple terms.
2. Explain clearly why option ${expectedAnswer} is the correct choice.
3. If the learner was incorrect, explain why option ${userSelected} is not suitable for this scenario.
4. Give a practical memory aid or exam tip to help remember this concept.
5. Do not alter the answer key.`;
}

/**
 * Build personalized revision summary from real persisted learner activity.
 * Does not fabricate missing history.
 *
 * @returns {{ hasActivity: boolean, summaryText: string, promptText: string }}
 */
export function getPersonalizedRevisionContext(storage = (typeof localStorage !== 'undefined' ? localStorage : null)) {
    const progress = loadProgress(storage);
    const topics = progress?.topics || {};

    const retryTopics = [];
    let totalAttempts = 0;
    let totalCorrectFirst = 0;
    let totalRetriesOwed = 0;

    for (const [key, data] of Object.entries(topics)) {
        totalAttempts += data.attempts || 0;
        totalCorrectFirst += data.correctFirstAttempt || 0;
        if (Array.isArray(data.retryIds) && data.retryIds.length > 0) {
            totalRetriesOwed += data.retryIds.length;
            retryTopics.push({
                topicKey: key,
                retryCount: data.retryIds.length,
                retryIds: data.retryIds,
            });
        }
    }

    let simulatorMisses = [];
    if (storage) {
        try {
            const rawSim = storage.getItem('aws_exam_stats');
            if (rawSim) {
                const parsed = JSON.parse(rawSim);
                if (Array.isArray(parsed.incorrectIds)) {
                    simulatorMisses = parsed.incorrectIds;
                }
            }
        } catch {
            // Ignore JSON error
        }
    }

    if (totalAttempts === 0 && simulatorMisses.length === 0) {
        return {
            hasActivity: false,
            summaryText: 'You do not have any recorded practice questions or retries yet. Complete a curriculum topic or simulator session first, and I will analyze your weak areas!',
            promptText: '',
        };
    }

    const details = [];
    if (retryTopics.length > 0) {
        details.push(`Topics with retries owed: ${retryTopics.map(t => `${t.topicKey} (${t.retryCount} questions)`).join(', ')}`);
    } else {
        details.push('No questions currently owed a retry in the curriculum!');
    }

    if (simulatorMisses.length > 0) {
        details.push(`Exam simulator questions needing review: ${simulatorMisses.length} questions (${simulatorMisses.slice(0, 5).join(', ')}${simulatorMisses.length > 5 ? '...' : ''})`);
    }

    const promptText = `Here is my recorded practice activity so far:
- Total curriculum attempts: ${totalAttempts}
- Correct on first try: ${totalCorrectFirst}
- Questions owed a retry in curriculum: ${totalRetriesOwed}
- ${details.join('\n- ')}

Based solely on these recorded statistics, what concepts should I prioritize revising for the AWS CLF-C02 exam? Provide a focused study plan.`;

    return {
        hasActivity: true,
        summaryText: `Recorded practice found: ${totalRetriesOwed} retries owed, ${simulatorMisses.length} simulator review items.`,
        promptText,
    };
}
