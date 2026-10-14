import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Learn from '../../pages/Learn';
import TopicLesson from '../../pages/TopicLesson';
import Dashboard from '../../pages/Dashboard';
import { getDomains } from '../curriculum';

function renderAt(path) {
    return renderToStaticMarkup(
        <MemoryRouter initialEntries={[path]}>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/learn/:domain/:topic" element={<TopicLesson />} />
            </Routes>
        </MemoryRouter>,
    );
}

describe('pages render', () => {
    it('curriculum view renders all four official domains with weights', () => {
        const html = renderAt('/learn');
        for (const domain of getDomains()) {
            expect(html).toContain(domain.label);
            expect(html).toContain(`${domain.weightPercent}% of scored content`);
        }
        // Verified and not-yet-verified counts are shown separately.
        expect(html).toContain('verified for practice');
        expect(html).toContain('not yet verified');
    });

    it('curriculum links into a topic lesson page', () => {
        const html = renderAt('/learn');
        const domain = getDomains().find((d) => d.topics.length > 0);
        const topic = domain.topics.find((t) => t.verifiedCount > 0);
        expect(html).toContain(`/learn/${domain.number}/${topic.slug}`);
    });

    it('a topic lesson renders reference material and practice', () => {
        const domain = getDomains().find((d) => d.topics.some((t) => t.verifiedCount > 0));
        const topic = domain.topics.find((t) => t.verifiedCount > 0);
        const html = renderAt(`/learn/${domain.number}/${topic.slug}`);

        expect(html).toContain(topic.name);
        expect(html).toContain('Reference');
        expect(html).toContain('Practice');
        // Official AWS sources must be linked, not paraphrased.
        for (const url of topic.sourceUrls) {
            expect(html).toContain(url);
        }
    });

    it('an unknown topic shows a not-found message instead of crashing', () => {
        const html = renderAt('/learn/2/no-such-topic');
        expect(html).toContain('Topic not found');
    });

    it('an out-of-range domain does not crash', () => {
        const html = renderAt('/learn/99/anything');
        expect(html).toContain('Topic not found');
    });

    it('dashboard renders the curriculum entry and real totals, not a fake percentage', () => {
        const html = renderAt('/');
        expect(html).toContain('Open Curriculum');
        // No invented readiness/progress metric against an arbitrary denominator.
        expect(html).not.toMatch(/\/\s*400\b/);
        expect(html).not.toContain('COMING SOON');
        expect(html).toContain('not yet verified');
    });
});
