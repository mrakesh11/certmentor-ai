import React, { useState, useEffect } from 'react';
import { loadEconomy } from '../lib/economy';
import './EconomyBadge.css';

export default function EconomyBadge({ onClick }) {
    const [economy, setEconomy] = useState(loadEconomy);

    useEffect(() => {
        const refresh = () => setEconomy(loadEconomy());
        window.addEventListener('certmentor:economy', refresh);
        window.addEventListener('storage', refresh);
        return () => {
            window.removeEventListener('certmentor:economy', refresh);
            window.removeEventListener('storage', refresh);
        };
    }, []);

    return (
        <button
            type="button"
            className="economy-badge"
            onClick={onClick}
            title={`CloudCredits: ${economy.balance} ⚡ CC | Daily Streak: ${economy.streak.current} days (${economy.streak.todayQuestionsCount}/5 today) - Click to open rewards store`}
            aria-label={`Open CloudRewards store. Available balance: ${economy.balance} CloudCredits. Current streak: ${economy.streak.current} days.`}
        >
            <span className="economy-badge__streak">
                <span className="fire" aria-hidden="true">🔥</span>
                <span className="streak-num">{economy.streak.current}</span>
            </span>
            <span className="economy-badge__divider" aria-hidden="true"></span>
            <span className="economy-badge__credits">
                <span className="bolt" aria-hidden="true">⚡</span>
                <span className="credits-num">{economy.balance}</span>
                <span className="credits-unit">CC</span>
            </span>
        </button>
    );
}
