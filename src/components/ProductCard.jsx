import React from 'react';

/**
 * ProductCard Component
 * Displays individual product information
 */
export default function ProductCard({ phone, isRecommended }) {
    const stars = '★'.repeat(Math.round(phone.rating)) + '☆'.repeat(5 - Math.round(phone.rating));
    const matchScore = isRecommended ? 90 + Math.floor(Math.random() * 10) : 0;

    return (
        <div className={`product-card ${isRecommended ? 'highlighted' : ''}`}>
            {isRecommended && <div className="rec-badge">AI Pick</div>}

            <span className="phone-emoji">{phone.emoji}</span>

            <div className="product-name">{phone.name}</div>
            <div className="product-brand">{phone.brand}</div>

            <div className="stars">
                {stars} {phone.rating}
            </div>

            <div className="product-price">${phone.price.toLocaleString()}</div>

            <div className="tags">
                {phone.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="tag">
                        {tag}
                    </span>
                ))}
            </div>

            {isRecommended && (
                <div className="score-bar-wrap">
                    <div className="score-label">Match score</div>
                    <div className="score-bar">
                        <div className="score-fill" style={{ width: `${matchScore}%` }}></div>
                    </div>
                </div>
            )}
        </div>
    );
}
