/**
 * Answer evaluation for practice questions.
 *
 * The learning manifest stores answers as arrays of option letters (e.g. ["A"]
 * or ["A","E"]); selection state is also an array of letters. Correctness is
 * exact set equality, matching how the existing simulator grades multi-answer
 * questions: the same letters must be selected, no more and no less.
 */

/** Does this question require selecting more than one option? */
export function isMultiAnswer(question) {
    return Array.isArray(question?.answer) && question.answer.length > 1;
}

/**
 * @param {{ answer?: string[] }} question
 * @param {string[]} selectedIds letters the learner selected
 * @returns {boolean} true only when the selected set equals the answer set
 */
export function evaluateAnswer(question, selectedIds) {
    const answer = Array.isArray(question?.answer) ? question.answer : [];
    const selected = Array.isArray(selectedIds) ? selectedIds : [];

    if (answer.length === 0 || selected.length === 0) return false;
    if (answer.length !== selected.length) return false;

    const selectedSet = new Set(selected);
    return answer.every((letter) => selectedSet.has(letter));
}

/** Human-readable label for an answer, e.g. "A" or "A and C". */
export function formatAnswer(answer) {
    if (!Array.isArray(answer) || answer.length === 0) return '';
    return answer.join(' and ');
}
