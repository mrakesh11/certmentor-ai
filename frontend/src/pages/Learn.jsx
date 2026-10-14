import { Link } from 'react-router-dom';
import { domainSummaries, TOTALS, EXAM_GUIDE_URL } from '../lib/curriculum';
import './Learn.css';

/**
 * Curriculum view organised by the four official CLF-C02 domains.
 *
 * Every number here counts real questions from the learning manifest:
 * "verified" questions have been checked against official AWS documentation,
 * and "not yet verified" are the blocked / needs-review items that practice
 * deliberately excludes. The two are never added together, and no mastery or
 * readiness percentage is shown anywhere on this page.
 */
export default function Learn() {
    const domains = domainSummaries();
    const excludedTotal = TOTALS.excluded['needs-review']
        + TOTALS.excluded.unsupported
        + TOTALS.excluded.blocked;

    return (
        <div className="learn-page page">
            <header className="learn-header">
                <p className="eyebrow">Study path</p>
                <h1>CLF-C02 curriculum</h1>
                <p className="learn-sub">
                    The four official exam domains, weighted as in the{' '}
                    <a href={EXAM_GUIDE_URL} target="_blank" rel="noreferrer">
                        AWS CLF-C02 exam guide
                    </a>. Pick a topic to read the reference material and practise its
                    verified questions.
                </p>
            </header>

            <div className="verification-note" role="note">
                <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
                <p>
                    <strong>{TOTALS.practiceEligible}</strong> of {TOTALS.totalQuestions} questions
                    are fact-checked against official AWS documentation and available as practice.{' '}
                    <strong>{excludedTotal}</strong> questions
                    ({TOTALS.excluded.blocked} with unresolved answers) are{' '}
                    <span className="em">not yet verified</span>: they are kept out of practice and
                    are never presented as verified content.
                </p>
            </div>

            {domains.map((domain) => (
                <section key={domain.number} id={`domain-${domain.number}`} className="domain-block">
                    <div className="domain-head">
                        <h2>{domain.label}</h2>
                        <span className="domain-weight">{domain.weightPercent}% of scored content</span>
                    </div>

                    <div className="domain-counts">
                        <span className="count-verified">
                            <i className="fa-solid fa-circle-check" aria-hidden="true"></i>{' '}
                            {domain.verified} verified for practice
                        </span>
                        <span className="count-unverified">
                            <i className="fa-regular fa-circle" aria-hidden="true"></i>{' '}
                            {domain.unverified} not yet verified
                        </span>
                        <span>{domain.topicCount} topics</span>
                    </div>

                    {domain.taskStatements.length > 0 && (
                        <ul className="task-statements" aria-label={`Task statements for ${domain.name}`}>
                            {domain.taskStatements.map((task) => (
                                <li key={task.id}>
                                    <span className="task-id">{task.id}</span>
                                    <span>{task.statement}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    <table className="topic-table">
                        <thead>
                            <tr>
                                <th scope="col">Topic</th>
                                <th scope="col" className="num">Verified questions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {domain.topics.map((topic) => (
                                <tr key={topic.slug}>
                                    <td data-label="Topic">
                                        {topic.verifiedCount > 0 ? (
                                            <Link to={`/learn/${domain.number}/${topic.slug}`}>
                                                <span>{topic.name}</span>
                                                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                                            </Link>
                                        ) : (
                                            <span className="empty-topic">
                                                <span>{topic.name}</span>
                                                <span className="empty-note">— no verified questions yet</span>
                                            </span>
                                        )}
                                    </td>
                                    <td className="num num--count" data-label="Verified">
                                        {topic.verifiedCount > 0 ? topic.verifiedCount : '—'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            ))}
        </div>
    );
}
