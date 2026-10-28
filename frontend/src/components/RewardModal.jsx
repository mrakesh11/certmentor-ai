import React, { useState, useEffect } from 'react';
import { loadEconomy, redeemCatalogItem, getReadinessTier, CATALOG } from '../lib/economy';
import './RewardModal.css';

export default function RewardModal({ isOpen, onClose }) {
    const [economy, setEconomy] = useState(loadEconomy);
    const [activeTab, setActiveTab] = useState('store');
    const [statusMessage, setStatusMessage] = useState(null);

    useEffect(() => {
        const refresh = () => setEconomy(loadEconomy());
        window.addEventListener('certmentor:economy', refresh);
        window.addEventListener('storage', refresh);
        return () => {
            window.removeEventListener('certmentor:economy', refresh);
            window.removeEventListener('storage', refresh);
        };
    }, []);

    if (!isOpen) return null;

    const tier = getReadinessTier(economy.lifetimeEarned);

    const handleRedeem = (itemKey) => {
        const result = redeemCatalogItem(itemKey);
        setStatusMessage(result.message);
        setEconomy(loadEconomy());
        setTimeout(() => setStatusMessage(null), 4000);
    };

    return (
        <div className="reward-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
            <div className="reward-modal" onClick={(e) => e.stopPropagation()}>
                <header className="reward-modal__header">
                    <div className="reward-modal__title-row">
                        <div className="reward-modal__title">
                            <span className="reward-modal__icon">⚡</span>
                            <span>CloudRewards & AI Store</span>
                        </div>
                        <button type="button" className="reward-modal__close" onClick={onClose} aria-label="Close modal">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <div className="reward-modal__balance-card">
                        <div className="reward-modal__balance-main">
                            <span className="balance-label">Available Balance</span>
                            <div className="balance-value">
                                <span className="bolt">⚡</span> {economy.balance} <span className="unit">CC</span>
                            </div>
                        </div>
                        <div className="reward-modal__streak-info">
                            <div className="streak-badge">
                                <span className="fire">🔥</span> {economy.streak.current}-Day Streak
                            </div>
                            <span className="streak-sub">
                                Today: {economy.streak.todayQuestionsCount}/5 questions for bonus
                            </span>
                        </div>
                    </div>

                    <div className="reward-modal__tabs">
                        <button
                            type="button"
                            className={`reward-tab ${activeTab === 'store' ? 'is-active' : ''}`}
                            onClick={() => setActiveTab('store')}
                        >
                            <i className="fa-solid fa-store"></i> Rewards Store
                        </button>
                        <button
                            type="button"
                            className={`reward-tab ${activeTab === 'readiness' ? 'is-active' : ''}`}
                            onClick={() => setActiveTab('readiness')}
                        >
                            <i className="fa-solid fa-shield-halved"></i> Readiness Tier
                        </button>
                        <button
                            type="button"
                            className={`reward-tab ${activeTab === 'history' ? 'is-active' : ''}`}
                            onClick={() => setActiveTab('history')}
                        >
                            <i className="fa-solid fa-clock-rotate-left"></i> History
                        </button>
                    </div>
                </header>

                <div className="reward-modal__body">
                    {statusMessage && (
                        <div className="reward-status-banner">
                            <i className="fa-solid fa-circle-info"></i> {statusMessage}
                        </div>
                    )}

                    {activeTab === 'store' && (
                        <div className="reward-catalog">
                            {Object.values(CATALOG).map((item) => {
                                const canAfford = economy.balance >= item.cost;
                                let isAlreadyActive = false;
                                let remainingBadge = null;

                                if (item.id === 'ai_deep_tutor_pack') {
                                    remainingBadge = `${economy.unlockedFeatures.aiDeepTutorQueriesRemaining} queries left`;
                                } else if (item.id === 'timed_mock_exam_pass') {
                                    remainingBadge = `${economy.unlockedFeatures.timedSimulationsPasses} passes left`;
                                } else if (item.id === 'personalized_weakness_audit') {
                                    isAlreadyActive = economy.unlockedFeatures.personalizedAuditUnlocked;
                                } else if (item.id === 'offline_cram_sheet') {
                                    isAlreadyActive = economy.unlockedFeatures.cramGuideUnlocked;
                                }

                                return (
                                    <div key={item.id} className="catalog-card">
                                        <div className="catalog-card__icon">
                                            <i className={item.icon}></i>
                                        </div>
                                        <div className="catalog-card__content">
                                            <div className="catalog-card__header">
                                                <h4>{item.title}</h4>
                                                {remainingBadge && (
                                                    <span className="catalog-pill catalog-pill--active">
                                                        {remainingBadge}
                                                    </span>
                                                )}
                                                {isAlreadyActive && (
                                                    <span className="catalog-pill catalog-pill--owned">
                                                        Unlocked ✓
                                                    </span>
                                                )}
                                            </div>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className="catalog-card__action">
                                            <button
                                                type="button"
                                                className={`btn btn--sm ${canAfford ? 'btn--primary' : 'btn--ghost'}`}
                                                disabled={!canAfford}
                                                onClick={() => handleRedeem(item.id)}
                                            >
                                                <span>⚡ {item.cost} CC</span>
                                                {isAlreadyActive ? 'Re-unlock' : 'Unlock'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {activeTab === 'readiness' && (
                        <div className="readiness-panel">
                            <div className="readiness-hero">
                                <div className="readiness-badge">{tier.badge}</div>
                                <h3>{tier.name}</h3>
                                <p>Lifetime CloudCredits Earned: <strong>{economy.lifetimeEarned} ⚡</strong></p>
                            </div>

                            <div className="readiness-progress-box">
                                <div className="readiness-progress-header">
                                    <span>Progress to {tier.nextTier}</span>
                                    <span>{tier.progressPercent}%</span>
                                </div>
                                <div className="progress-bar-track">
                                    <div
                                        className="progress-bar-fill"
                                        style={{ width: `${tier.progressPercent}%`, backgroundColor: tier.color }}
                                    ></div>
                                </div>
                                {tier.creditsNeeded > 0 ? (
                                    <p className="readiness-sub">
                                        Earn <strong>{tier.creditsNeeded} more ⚡ CC</strong> to achieve {tier.nextTier}!
                                    </p>
                                ) : (
                                    <p className="readiness-sub">Maximum Certification Readiness Achieved! 🏆</p>
                                )}
                            </div>

                            <div className="tier-breakdown">
                                <h4>Certification Readiness Tiers</h4>
                                <ul className="tier-list">
                                    <li>🌱 <strong>Cloud Novice</strong> (0 - 200 CC): Getting started with foundational concepts.</li>
                                    <li>⚡ <strong>Cloud Apprentice</strong> (200 - 600 CC): Regularly clearing curriculum retries.</li>
                                    <li>🛡️ <strong>Practitioner Candidate</strong> (600 - 1200 CC): Strong grasp of security and architecture.</li>
                                    <li>🚀 <strong>Solutions Specialist</strong> (1200 - 2000 CC): Consistently passing exam simulations.</li>
                                    <li>👑 <strong>Cloud Architect Ready</strong> (2000+ CC): Mastered CLF-C02 question bank!</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="history-panel">
                            {economy.transactions.length === 0 ? (
                                <p className="history-empty">No transactions recorded yet.</p>
                            ) : (
                                <ul className="history-list">
                                    {economy.transactions.map((tx) => (
                                        <li key={tx.id} className="history-item">
                                            <div className={`history-indicator ${tx.type === 'earn' ? 'is-earn' : 'is-spend'}`}>
                                                <i className={tx.type === 'earn' ? 'fa-solid fa-arrow-down' : 'fa-solid fa-arrow-up'}></i>
                                            </div>
                                            <div className="history-details">
                                                <span className="history-desc">{tx.description}</span>
                                                <span className="history-date">{new Date(tx.timestamp).toLocaleString()}</span>
                                            </div>
                                            <div className={`history-amount ${tx.type === 'earn' ? 'is-earn' : 'is-spend'}`}>
                                                {tx.type === 'earn' ? `+${tx.amount}` : tx.amount} ⚡
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
