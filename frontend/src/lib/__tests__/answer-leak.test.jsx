import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TopicLesson from '../../pages/TopicLesson';
import PracticeQuestions from '../../pages/PracticeQuestions';
import Flashcards from '../../pages/Flashcards';
import { getDomains, getTopics, getTopicQuestions } from '../curriculum';
import { isMultiAnswer } from '../answers';

function renderAt(path) {
    return renderToStaticMarkup(
        <MemoryRouter initialEntries={[path]}>
            <Routes>
                <Route path="/learn/:domain/:topic" element={<TopicLesson />} />
                <Route path="/practice-questions" element={<PracticeQuestions />} />
                <Route path="/flashcards" element={<Flashcards />} />
            </Routes>
        </MemoryRouter>,
    );
}

/**
 * Locate a topic whose FIRST queued question needs multiple answers, so the
 * initial SSR render (which cannot click through to later questions) actually
 * exercises the multi-answer hint path.
 */
function findFirstMultiAnswerTopic() {
    for (const domain of getDomains()) {
        for (const topic of getTopics(domain.number)) {
            const [first] = getTopicQuestions(topic);
            if (first && isMultiAnswer(first)) {
                return { domain: domain.number, slug: topic.slug, question: first };
            }
        }
    }
    return null;
}

describe('answer is never revealed before grading', () => {
    it('the manifest still offers a topic that starts on a multi-answer question', () => {
        // Guards the test below from going vacuous if the data pipeline ever
        // reshuffles topic question order.
        const found = findFirstMultiAnswerTopic();
        expect(found, 'expected >=1 topic starting with a multi-answer question').toBeTruthy();
        expect(found.question.answer.length).toBeGreaterThan(1);
    });

    it('multi-answer lesson renders without leaking which options are correct', () => {
        const found = findFirstMultiAnswerTopic();
        expect(found).toBeTruthy();

        const html = renderAt(`/learn/${found.domain}/${found.slug}`);
        const { answer } = found.question;

        // The multi-answer hint must appear (proves we hit the path)...
        expect(html).toContain('Select all that apply');
        // ...but never the answer itself, e.g. the old "(B and D correct)" leak.
        expect(html).not.toContain(`Select all that apply (${answer.join(' and ')}`);
        expect(html).not.toContain(`Select all that apply (${answer.join(', ')}`);

        // Everything that states correctness is gated behind `graded`, which is
        // null until the learner submits — so none of it may be in a fresh render.
        for (const gradedOnly of [
            'answer-reveal',
            'option__state',
            'is-correct',
            'is-wrong',
            'is-dimmed',
            'explanation ',
        ]) {
            expect(html, `pre-grade render must not contain "${gradedOnly}"`).not.toContain(
                gradedOnly,
            );
        }

        // A sane pre-grade state: options are unselected and still interactive.
        expect(html).toContain('aria-pressed="false"');
        expect(html).toContain('disabled=""');
    });

    it('graded-only classes are absent on a single-answer lesson too', () => {
        const domain = getDomains()[0];
        const topic = getTopics(domain.number).find(
            (t) => getTopicQuestions(t)[0] && !isMultiAnswer(getTopicQuestions(t)[0]),
        );
        expect(topic, 'expected a single-answer topic').toBeTruthy();

        const html = renderAt(`/learn/${domain.number}/${topic.slug}`);
        expect(html).toContain('option-list');
        expect(html).not.toContain('is-correct');
        expect(html).not.toContain('answer-reveal');
    });
});

describe('remaining routes render', () => {
    it('exam simulator renders with no saved session', () => {
        const html = renderAt('/practice-questions?mode=standard');
        expect(html).toBeTruthy();
        expect(html).not.toContain('undefined');
        expect(html).not.toContain('[object Object]');
    });

    it('flashcards renders a deck without a saved session', () => {
        const html = renderAt('/flashcards');
        expect(html).toBeTruthy();
        expect(html).not.toContain('undefined');
        expect(html).not.toContain('[object Object]');
    });
});
