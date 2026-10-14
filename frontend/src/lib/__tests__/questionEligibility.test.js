import { describe, it, expect } from 'vitest';
import {
    isCurriculumEligible,
    getCurriculumQuestions,
    getSimulatorQuestions,
    getAnyQuestionById,
} from '../questionEligibility';

describe('questionEligibility', () => {
    it('returns exactly 321 verified questions for the curriculum', () => {
        const curriculumQuestions = getCurriculumQuestions();
        expect(curriculumQuestions.length).toBe(321);
        for (const q of curriculumQuestions) {
            expect(isCurriculumEligible(q)).toBe(true);
            expect(q.id).toBeDefined();
            expect(q.options.length).toBeGreaterThanOrEqual(2);
            expect(q.answer).toBeDefined();
        }
    });

    it('filters out blocked questions from the simulator bank', () => {
        const simulatorQuestions = getSimulatorQuestions();
        // Total normalized is 495; 5 blocked questions are excluded, leaving 490 valid questions
        expect(simulatorQuestions.length).toBe(490);

        // Verify known corrupt questions are excluded
        const ids = new Set(simulatorQuestions.map((q) => q.id));
        expect(ids.has('q200')).toBe(false); // corrupted answer string
        expect(ids.has('q250')).toBe(false); // corrupted answer string
        expect(ids.has('q269')).toBe(false); // corrupted answer string
        expect(ids.has('q339')).toBe(false); // missing option C in options
    });

    it('ensures questions with previously empty options now have recovered options', () => {
        const simulatorQuestions = getSimulatorQuestions();
        const map = new Map(simulatorQuestions.map((q) => [q.id, q]));

        // Check recovered questions
        const recoveredIds = ['q518', 'q618', 'q627', 'q667', 'q668'];
        for (const id of recoveredIds) {
            const q = map.get(id);
            expect(q).toBeDefined();
            expect(q.options.length).toBeGreaterThanOrEqual(2);
            expect(q.answer.length).toBeGreaterThanOrEqual(1);
        }
    });

    it('correctly retrieves questions by ID using getAnyQuestionById', () => {
        const verifiedQ = getAnyQuestionById('q1');
        expect(verifiedQ).toBeDefined();
        expect(verifiedQ.id).toBe('q1');
        expect(verifiedQ.isVerified).toBe(true);

        const nonExistent = getAnyQuestionById('non_existent_id');
        expect(nonExistent).toBeNull();
    });
});
