import React, { useMemo } from 'react';
import ProductCard from './ProductCard';

/**
 * ProductGrid Component
 * Renders filtered product grid based on active filter and recommendations
 */
export default function ProductGrid({ phones, recommendedIds, activeFilter }) {
    const filteredPhones = useMemo(() => {
        let result = phones;

        if (activeFilter === 'recommended') {
            result = result.filter((p) => recommendedIds.includes(p.id));
        } else if (activeFilter === 'budget') {
            result = result.filter((p) => p.price < 400);
        } else if (activeFilter === 'premium') {
            result = result.filter((p) => p.price >= 400);
        }

        return result;
    }, [phones, recommendedIds, activeFilter]);

    if (filteredPhones.length === 0) {
        return (
            <div className="empty-state">
                {activeFilter === 'recommended'
                    ? 'No recommendations yet. Try asking AI first!'
                    : 'No phones match this filter.'}
            </div>
        );
    }

    return (
        <div className="products-grid">
            {filteredPhones.map((phone) => (
                <ProductCard
                    key={phone.id}
                    phone={phone}
                    isRecommended={recommendedIds.includes(phone.id)}
                />
            ))}
        </div>
    );
}
