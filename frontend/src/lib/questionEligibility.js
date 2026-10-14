/**
 * Centralized question eligibility and selection rules for CLF-C02.
 *
 * Rules:
 * 1. Curriculum Practice:
 *    - Only questions with factual-verification status "verified" from the learning manifest.
 *    - Blocked and needs-review questions are never presented as verified curriculum content.
 * 2. Exam Simulator:
 *    - Draws on the broader question bank using clean normalized/recovered options.
 *    - Excludes blocked questions with corrupted answer keys (e.g., q200, q250, q269, q626)
 *      or incomplete options (q339) so all testable questions are answerable.
 *    - Clearly distinguishes fact-checked questions from unverified questions.
 * 3. Separation of Concerns:
 *    - Curriculum practice history (stored in `aws_learning_v1`) and simulator history
 *      (stored in `aws_exam_stats`) are never merged or commingled.
 */

import manifest from '../data/learning-manifest.json';
import normalizedQuestions from '../data/questions.normalized.json';
import domainById from '../data/question-domains.json';
import { validateQuestion, ValidationStatus } from './questionValidation';

const verifiedQuestionMap = new Map(
    manifest.practiceQuestions.map((q) => [q.id, q])
);

/**
 * Check if a question is eligible for curriculum practice.
 * Must be present in the manifest and strictly valid.
 *
 * @param {object} question
 * @returns {boolean}
 */
export function isCurriculumEligible(question) {
    if (!question || typeof question.id !== 'string') return false;
    const verified = verifiedQuestionMap.get(question.id);
    if (!verified) return false;
    const validation = validateQuestion(verified);
    return validation.status === ValidationStatus.VALID;
}

/**
 * Check if a question is eligible for the full exam simulator.
 * Excludes blocked questions with corrupted answer keys or missing options.
 *
 * @param {object} question
 * @returns {boolean}
 */
export function isSimulatorEligible(question) {
    const validation = validateQuestion(question);
    return validation.status !== ValidationStatus.BLOCKED;
}

/**
 * Get all verified questions eligible for curriculum practice (321 questions).
 * @returns {object[]}
 */
export function getCurriculumQuestions() {
    return manifest.practiceQuestions.filter(isCurriculumEligible);
}

/**
 * Get all valid questions for the exam simulator.
 * Uses normalized records so recovered options (e.g. q518, q618, etc.) are present.
 * Filters out blocked questions.
 * Adds `isVerified: boolean` and `domainNumber: number` metadata.
 *
 * @returns {object[]}
 */
export function getSimulatorQuestions() {
    return normalizedQuestions
        .filter(isSimulatorEligible)
        .map((q) => {
            const isVerified = verifiedQuestionMap.has(q.id);
            const domainNumber = domainById[q.id] ?? null;
            return {
                ...q,
                isVerified,
                domainNumber,
                // Ensure options are always formatted as an array
                options: Array.isArray(q.options) ? q.options : [],
                // Ensure answer is array of letters
                answer: Array.isArray(q.answer) ? q.answer : (typeof q.answer === 'string' ? q.answer.split('') : []),
            };
        });
}

/**
 * Retrieve a question by ID from the question bank.
 * Prioritizes the verified manifest if available, otherwise returns normalized simulator record.
 *
 * @param {string} id
 * @returns {object|null}
 */
export function getAnyQuestionById(id) {
    if (!id) return null;
    if (verifiedQuestionMap.has(id)) {
        return {
            ...verifiedQuestionMap.get(id),
            isVerified: true,
            domainNumber: domainById[id] ?? null,
        };
    }
    const found = normalizedQuestions.find((q) => q.id === id);
    if (found) {
        return {
            ...found,
            isVerified: false,
            domainNumber: domainById[id] ?? null,
        };
    }
    return null;
}
