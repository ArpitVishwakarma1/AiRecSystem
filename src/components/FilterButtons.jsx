import React from 'react';

/**
 * FilterButtons Component
 * Allows filtering of products by category
 */
export default function FilterButtons({ activeFilter, onFilterChange, recommendedCount }) {
    const filters = [
        { key: 'all', label: 'All phones' },
        { key: 'recommended', label: `AI Picks${recommendedCount > 0 ? ` (${recommendedCount})` : ''}` },
        { key: 'budget', label: 'Under $400' },
        { key: 'premium', label: '$400+' },
    ];

    return (
        <div className="filter-row">
            {filters.map((filter) => (
                <button
                    key={filter.key}
                    className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
                    onClick={() => onFilterChange(filter.key)}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
}
