import React from 'react';

/**
 * QuickChips Component
 * Displays quick-select recommendation queries
 */
export default function QuickChips({ onChipClick }) {
    const quickChips = [
        'Best phone under $300',
        'Best camera phone under $800',
        'Phone with longest battery life',
        'Flagship phone with best performance',
        'Budget Android phone under $200',
        'Best iPhone alternative',
    ];

    return (
        <div className="chips">
            {quickChips.map((chip, index) => (
                <span
                    key={index}
                    className="chip"
                    onClick={() => onChipClick(chip)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') onChipClick(chip);
                    }}
                >
                    {chip}
                </span>
            ))}
        </div>
    );
}
