import { describe, it, expect } from 'vitest';
import { validateQuestion, validateQuestionBank, ValidationStatus } from '../questionValidation';

describe('questionValidation', () => {
    it('marks a well-formed single-answer question as VALID', () => {
        const q = {
            id: 'q1',
            text: 'Which service is an object store?',
            options: [
                { id: 'A', text: 'Amazon S3' },
                { id: 'B', text: 'Amazon EC2' },
                { id: 'C', text: 'Amazon RDS' },
                { id: 'D', text: 'Amazon EBS' },
            ],
            answer: 'A',
            explanation: 'S3 is an object storage service.',
        };

        const result = validateQuestion(q);
        expect(result.status).toBe(ValidationStatus.VALID);
        expect(result.issues).toEqual([]);
        expect(result.isMultiAnswer).toBe(false);
    });

    it('marks a well-formed multi-answer question as VALID and sets isMultiAnswer to true', () => {
        const q = {
            id: 'q2',
            text: 'Which TWO services are serverless compute?',
            options: [
                { id: 'A', text: 'AWS Lambda' },
                { id: 'B', text: 'Amazon EC2' },
                { id: 'C', text: 'AWS Fargate' },
                { id: 'D', text: 'Amazon EBS' },
            ],
            answer: ['A', 'C'],
        };

        const result = validateQuestion(q);
        expect(result.status).toBe(ValidationStatus.VALID);
        expect(result.issues).toEqual([]);
        expect(result.isMultiAnswer).toBe(true);
    });

    it('marks a question with empty options as BLOCKED', () => {
        const q = {
            id: 'q3',
            text: 'What is Amazon CloudWatch?',
            options: [],
            answer: 'A',
        };

        const result = validateQuestion(q);
        expect(result.status).toBe(ValidationStatus.BLOCKED);
        expect(result.issues).toContain('empty_options');
    });

    it('marks a question where the answer key does not exist in options as BLOCKED', () => {
        const q = {
            id: 'q4',
            text: 'Select the correct option',
            options: [
                { id: 'A', text: 'Option A' },
                { id: 'B', text: 'Option B' },
            ],
            answer: 'C', // Option C is missing from options!
        };

        const result = validateQuestion(q);
        expect(result.status).toBe(ValidationStatus.BLOCKED);
        expect(result.issues).toContain('answer_letter_C_not_in_options');
    });

    it('marks a question with a corrupted answer string as BLOCKED', () => {
        const q = {
            id: 'q5',
            text: 'What is CloudFront?',
            options: [
                { id: 'A', text: 'CDN' },
                { id: 'B', text: 'Compute' },
            ],
            answer: 'Amazon CloudFront is a content delivery network', // Corrupted answer key
        };

        const result = validateQuestion(q);
        expect(result.status).toBe(ValidationStatus.BLOCKED);
        expect(result.issues).toContain('corrupted_answer_string');
    });

    it('validates an entire array with validateQuestionBank', () => {
        const questions = [
            {
                id: 'q1',
                text: 'Valid question',
                options: [
                    { id: 'A', text: 'Opt 1' },
                    { id: 'B', text: 'Opt 2' },
                ],
                answer: 'A',
            },
            {
                id: 'q2',
                text: 'Blocked question',
                options: [],
                answer: 'A',
            },
        ];

        const report = validateQuestionBank(questions);
        expect(report.total).toBe(2);
        expect(report.valid).toBe(1);
        expect(report.blocked).toBe(1);
        expect(report.report[0].status).toBe(ValidationStatus.VALID);
        expect(report.report[1].status).toBe(ValidationStatus.BLOCKED);
    });
});
