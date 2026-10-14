import { describe, it, expect, beforeEach } from 'vitest';
import {
    COMPARISONS,
    buildQuestionExplanationPrompt,
    getPersonalizedRevisionContext,
} from '../aiKnowledge';

/** In-memory storage mock */
function fakeStorage() {
    const store = new Map();
    return {
        getItem: (key) => (store.has(key) ? store.get(key) : null),
        setItem: (key, value) => store.set(key, String(value)),
        removeItem: (key) => store.delete(key),
        clear: () => store.clear(),
    };
}

describe('aiKnowledge', () => {
    let storage;

    beforeEach(() => {
        storage = fakeStorage();
    });

    describe('COMPARISONS', () => {
        it('contains verified comparisons with official AWS doc URLs', () => {
            const keys = ['iam-vs-bucket-policy', 's3-vs-ebs', 'sg-vs-nacl', 'cloudwatch-vs-cloudtrail', 'lambda-vs-ec2'];
            for (const key of keys) {
                const comp = COMPARISONS[key];
                expect(comp).toBeDefined();
                expect(comp.title).toBeDefined();
                expect(comp.services.length).toBe(2);
                expect(comp.docUrls.length).toBeGreaterThanOrEqual(1);
                for (const url of comp.docUrls) {
                    expect(url).toMatch(/^https:\/\/docs\.aws\.amazon\.com\//);
                }
                expect(comp.keyDifferences.length).toBeGreaterThanOrEqual(3);
            }
        });
    });

    describe('buildQuestionExplanationPrompt', () => {
        it('constructs a grounded prompt containing question details and constraints', () => {
            const question = {
                id: 'q10',
                text: 'Which AWS service is used for object storage?',
                options: [
                    { id: 'A', text: 'Amazon S3' },
                    { id: 'B', text: 'Amazon EBS' },
                ],
                answer: 'A',
                explanation: {
                    summary: 'Amazon S3 is object storage with high availability.',
                    whyCorrect: 'S3 stores data as objects in buckets.',
                },
                citation: {
                    url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html',
                },
            };

            const prompt = buildQuestionExplanationPrompt({
                question,
                selectedAnswers: ['B'],
                isCorrect: false,
            });

            expect(prompt).toContain('Question (q10):');
            expect(prompt).toContain('Which AWS service is used for object storage?');
            expect(prompt).toContain('[Option A] Amazon S3');
            expect(prompt).toContain('Learner\'s Selection: B (Outcome: Incorrect)');
            expect(prompt).toContain('Verified Answer Key: A');
            expect(prompt).toContain('https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html');
            expect(prompt).toContain('Do not alter the answer key');
        });

        it('returns empty string if question is missing', () => {
            expect(buildQuestionExplanationPrompt({})).toBe('');
        });
    });

    describe('getPersonalizedRevisionContext', () => {
        it('returns hasActivity: false and does NOT fabricate activity when storage is empty', () => {
            const context = getPersonalizedRevisionContext(storage);
            expect(context.hasActivity).toBe(false);
            expect(context.summaryText).toContain('You do not have any recorded practice questions');
            expect(context.promptText).toBe('');
        });

        it('correctly builds personalized summary when real curriculum retries exist', () => {
            const progress = {
                version: 1,
                topics: {
                    '1:cloud-concepts': {
                        attempts: 4,
                        correctFirstAttempt: 2,
                        answeredIds: ['q1', 'q2', 'q3', 'q4'],
                        retryIds: ['q2', 'q4'],
                    },
                },
            };
            storage.setItem('aws_learning_v1', JSON.stringify(progress));

            const context = getPersonalizedRevisionContext(storage);
            expect(context.hasActivity).toBe(true);
            expect(context.summaryText).toContain('2 retries owed');
            expect(context.promptText).toContain('Total curriculum attempts: 4');
            expect(context.promptText).toContain('Topics with retries owed: 1:cloud-concepts (2 questions)');
        });

        it('includes simulator missed questions when present in aws_exam_stats', () => {
            const examStats = {
                totalAppeared: 10,
                correct: 8,
                incorrectIds: ['q518', 'q618'],
            };
            storage.setItem('aws_exam_stats', JSON.stringify(examStats));

            const context = getPersonalizedRevisionContext(storage);
            expect(context.hasActivity).toBe(true);
            expect(context.summaryText).toContain('2 simulator review items');
            expect(context.promptText).toContain('Exam simulator questions needing review: 2 questions (q518, q618)');
        });
    });
});
