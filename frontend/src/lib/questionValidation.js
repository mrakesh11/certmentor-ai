/**
 * Question integrity validator for CLF-C02 practice and simulator questions.
 *
 * Validates:
 * - Unique identifiers
 * - Non-empty question text
 * - Valid options (array of { id, text }, >= 2 options, standard letter IDs A-E)
 * - Valid answer keys (single or multi-letter, all letters present in options)
 * - Classification into: VALID, WARNING, NEEDS_REVIEW, BLOCKED
 */

export const ValidationStatus = {
    VALID: 'valid',
    WARNING: 'warning',
    NEEDS_REVIEW: 'needs-review',
    BLOCKED: 'blocked',
};

const VALID_OPTION_LETTERS = new Set(['A', 'B', 'C', 'D', 'E']);

/**
 * Validate a single question record.
 *
 * @param {object} question
 * @returns {{ status: string, issues: string[], isMultiAnswer: boolean }}
 */
export function validateQuestion(question) {
    const issues = [];

    if (!question || typeof question !== 'object') {
        return {
            status: ValidationStatus.BLOCKED,
            issues: ['question_is_null_or_not_object'],
            isMultiAnswer: false,
        };
    }

    // 1. Question ID
    const id = typeof question.id === 'string' ? question.id.trim() : '';
    if (!id) {
        issues.push('missing_question_id');
    }

    // 2. Question Text
    const text = typeof question.text === 'string' ? question.text.trim() : '';
    if (!text) {
        issues.push('missing_question_text');
    }

    // 3. Options validation
    const options = Array.isArray(question.options) ? question.options : [];
    if (options.length === 0) {
        issues.push('empty_options');
    } else if (options.length < 2) {
        issues.push('fewer_than_two_options');
    }

    const optionIds = new Set();
    for (const opt of options) {
        if (!opt || typeof opt !== 'object') {
            issues.push('malformed_option_entry');
            continue;
        }
        const optId = typeof opt.id === 'string' ? opt.id.trim().toUpperCase() : '';
        const optText = typeof opt.text === 'string' ? opt.text.trim() : '';

        if (!optId) {
            issues.push('missing_option_id');
        } else if (!VALID_OPTION_LETTERS.has(optId)) {
            issues.push(`unrecognized_option_id_${optId}`);
        } else if (optionIds.has(optId)) {
            issues.push(`duplicate_option_id_${optId}`);
        } else {
            optionIds.add(optId);
        }

        if (!optText) {
            issues.push(`empty_option_text_for_${optId || 'unknown'}`);
        }
    }

    // 4. Answer validation (handles string 'A', 'AD', or array ['A', 'D'])
    let answerLetters = [];
    if (Array.isArray(question.answer)) {
        answerLetters = question.answer.map((a) => (typeof a === 'string' ? a.trim().toUpperCase() : ''));
    } else if (typeof question.answer === 'string') {
        const raw = question.answer.trim().toUpperCase();
        // If string contains punctuation or words (>5 chars), it's corrupted text
        if (/^[A-E]+$/.test(raw)) {
            answerLetters = [...new Set(raw.split(''))];
        } else {
            issues.push('corrupted_answer_string');
        }
    } else {
        issues.push('missing_or_invalid_answer_type');
    }

    if (answerLetters.length === 0 && !issues.includes('corrupted_answer_string')) {
        issues.push('empty_answer');
    }

    // Check that every answer letter corresponds to an existing option
    for (const letter of answerLetters) {
        if (!optionIds.has(letter)) {
            issues.push(`answer_letter_${letter}_not_in_options`);
        }
    }

    const isMultiAnswer = answerLetters.length > 1;

    // Determine final validation status
    let status = ValidationStatus.VALID;
    if (
        issues.includes('corrupted_answer_string') ||
        issues.includes('empty_options') ||
        issues.includes('empty_answer') ||
        issues.includes('missing_question_id') ||
        issues.includes('missing_question_text') ||
        issues.some((i) => i.startsWith('answer_letter_'))
    ) {
        status = ValidationStatus.BLOCKED;
    } else if (issues.length > 0) {
        status = ValidationStatus.NEEDS_REVIEW;
    }

    return {
        status,
        issues,
        isMultiAnswer,
    };
}

/**
 * Validate an entire array of questions and produce a machine-readable report.
 *
 * @param {object[]} questions
 * @returns {{ total: number, valid: number, blocked: number, needsReview: number, report: object[] }}
 */
export function validateQuestionBank(questions) {
    if (!Array.isArray(questions)) {
        return { total: 0, valid: 0, blocked: 0, needsReview: 0, report: [] };
    }

    const idCounts = new Map();
    for (const q of questions) {
        if (q?.id) {
            idCounts.set(q.id, (idCounts.get(q.id) ?? 0) + 1);
        }
    }

    let validCount = 0;
    let blockedCount = 0;
    let needsReviewCount = 0;

    const report = questions.map((q) => {
        const result = validateQuestion(q);
        if (q?.id && idCounts.get(q.id) > 1) {
            result.issues.push('duplicate_question_id_in_bank');
            result.status = ValidationStatus.BLOCKED;
        }

        if (result.status === ValidationStatus.VALID) validCount += 1;
        else if (result.status === ValidationStatus.BLOCKED) blockedCount += 1;
        else needsReviewCount += 1;

        return {
            id: q?.id ?? 'UNKNOWN',
            status: result.status,
            issues: result.issues,
            isMultiAnswer: result.isMultiAnswer,
        };
    });

    return {
        total: questions.length,
        valid: validCount,
        blocked: blockedCount,
        needsReview: needsReviewCount,
        report,
    };
}
