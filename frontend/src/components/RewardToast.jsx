import React, { useState, useEffect } from 'react';
import './RewardToast.css';

export default function RewardToast() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handleToast = (e) => {
            const toast = e.detail;
            if (!toast) return;
            setToasts((prev) => [...prev, toast]);

            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== toast.id));
            }, 3500);
        };

        window.addEventListener('certmentor:toast', handleToast);
        return () => window.removeEventListener('certmentor:toast', handleToast);
    }, []);

    if (toasts.length === 0) return null;

    return (
        <div className="reward-toast-container" aria-live="polite">
            {toasts.map((toast) => (
                <div key={toast.id} className="reward-toast">
                    <div className="reward-toast__icon">
                        <i className={toast.icon || 'fa-solid fa-bolt'} aria-hidden="true"></i>
                    </div>
                    <div className="reward-toast__content">
                        <div className="reward-toast__title">{toast.title}</div>
                        <div className="reward-toast__msg">{toast.message}</div>
                    </div>
                    {toast.points > 0 && (
                        <div className="reward-toast__pill">
                            +{toast.points} ⚡
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
