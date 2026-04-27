import React from 'react';

/**
 * AIResponse Component
 * Displays the AI recommendation response
 */
export default function AIResponse({ response, isLoading }) {
    if (isLoading) {
        return (
            <div className="ai-response">
                <div className="ai-label">AI Recommendation Engine</div>
                <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        );
    }

    if (!response) {
        return null;
    }

    return (
        <div className="ai-response">
            <div className="ai-label">AI Recommendation</div>
            <div style={{ fontSize: '14px', lineHeight: '1.7', marginBottom: '8px' }}>
                {response.summary}
            </div>
            <div
                style={{
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                    fontStyle: 'italic',
                }}
            >
                {response.highlights}
            </div>
        </div>
    );
}
