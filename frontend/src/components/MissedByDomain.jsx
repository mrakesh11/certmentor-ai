import { useMemo } from 'react';
import { examQuestions } from '../questionsData.js';
import domainById from '../data/question-domains.json';
import { getDomains } from '../lib/curriculum';

/**
 * Missed questions grouped by official CLF-C02 domain.
 *
 * The exam simulator stores only the ids a learner got wrong. Each id is
 * mapped to its official domain through `question-domains.json`, which is
 * generated straight from the factual verification report's task-statement
 * assignment — so every bar is a count of real misses, not an estimate.
 *
 * This replaces an earlier "domain mastery" radar that invented a percentage
 * (100 − ratio × 100 × 3, bucketed by keyword matching). No mastery score is
 * shown here: the chart reports how many questions were missed, and nothing
 * about the questions that were never attempted.
 */
export default function MissedByDomain({ incorrectIds = [] }) {
    const rows = useMemo(() => {
        const counts = new Map();
        for (const id of incorrectIds) {
            const number = domainById[id];
            if (number == null) continue;
            counts.set(number, (counts.get(number) ?? 0) + 1);
        }

        const domains = getDomains();
        const max = Math.max(1, ...counts.values());

        return domains
            .map((domain) => ({
                number: domain.number,
                label: domain.label,
                weightPercent: domain.weightPercent,
                count: counts.get(domain.number) ?? 0,
            }))
            .sort((a, b) => b.count - a.count || a.number - b.number)
            .map((row) => ({ ...row, ratio: row.count / max }));
    }, [incorrectIds]);

    const total = rows.reduce((sum, row) => sum + row.count, 0);
    const unmapped = incorrectIds.length - total;

    if (total === 0) return null;

    return (
        <div className="missed-by-domain">
            <div className="missed-by-domain__head">
                <h3>Missed questions by domain</h3>
                <p>
                    {total} missed question{total === 1 ? '' : 's'} grouped by the official exam domain
                    each question belongs to. Counts only — no mastery score is inferred.
                </p>
            </div>

            <ul className="missed-by-domain__list">
                {rows.map((row) => (
                    <li key={row.number} className={row.count === 0 ? 'is-zero' : ''}>
                        <div className="missed-by-domain__label">
                            <span className="missed-by-domain__name">{row.label}</span>
                            <span className="missed-by-domain__count">
                                {row.count} {row.count === 1 ? 'miss' : 'misses'}
                            </span>
                        </div>
                        <div
                            className="missed-by-domain__track"
                            role="img"
                            aria-label={`${row.label}: ${row.count} missed`}
                        >
                            <span
                                className="missed-by-domain__bar"
                                style={{ width: `${Math.round(row.ratio * 100)}%` }}
                            ></span>
                        </div>
                    </li>
                ))}
            </ul>

            <p className="missed-by-domain__footnote">
                These are misses from the full {examQuestions.length}-question simulator pool, which
                includes questions not yet fact-checked. Curriculum practice counts are shown on the
                curriculum page and are tracked separately.
                {unmapped > 0 && ` ${unmapped} missed question${unmapped === 1 ? '' : 's'} could not be assigned a domain.`}
            </p>
        </div>
    );
}
