import { describe, it, expect } from 'vitest';
import { evaluateAnswer, isMultiAnswer, formatAnswer } from '../answers';

describe('answer evaluation', () => {
    it('marks a single correct letter', () => {
        expect(evaluateAnswer({ answer: ['A'] }, ['A'])).toBe(true);
    });

    it('marks a single wrong letter', () => {
        expect(evaluateAnswer({ answer: ['A'] }, ['B'])).toBe(false);
    });

    it('requires every letter of a multi-answer question', () => {
        const question = { answer: ['A', 'E'] };
        expect(evaluateAnswer(question, ['A', 'E'])).toBe(true);
        expect(evaluateAnswer(question, ['E', 'A'])).toBe(true); // order is irrelevant
        expect(evaluateAnswer(question, ['A'])).toBe(false);     // under-select
        expect(evaluateAnswer(question, ['A', 'E', 'C'])).toBe(false); // over-select
        expect(evaluateAnswer(question, ['A', 'C'])).toBe(false); // wrong pairing
    });

    it('treats duplicated selections as incorrect rather than double-counting', () => {
        expect(evaluateAnswer({ answer: ['A'] }, ['A', 'A'])).toBe(false);
    });

    it('never marks an empty selection or an empty answer correct', () => {
        expect(evaluateAnswer({ answer: ['A'] }, [])).toBe(false);
        expect(evaluateAnswer({ answer: [] }, ['A'])).toBe(false);
        expect(evaluateAnswer({}, [])).toBe(false);
    });

    it('tolerates malformed input without throwing', () => {
        expect(evaluateAnswer(null, ['A'])).toBe(false);
        expect(evaluateAnswer({ answer: 'A' }, ['A'])).toBe(false);
        expect(evaluateAnswer({ answer: ['A'] }, null)).toBe(false);
    });

    it('isMultiAnswer reflects the answer array', () => {
        expect(isMultiAnswer({ answer: ['A'] })).toBe(false);
        expect(isMultiAnswer({ answer: ['A', 'C'] })).toBe(true);
        expect(isMultiAnswer({ answer: [] })).toBe(false);
        expect(isMultiAnswer(null)).toBe(false);
    });

    it('formatAnswer renders letters for display', () => {
        expect(formatAnswer(['A'])).toBe('A');
        expect(formatAnswer(['A', 'C'])).toBe('A and C');
        expect(formatAnswer([])).toBe('');
        expect(formatAnswer(undefined)).toBe('');
    });
});
