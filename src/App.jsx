import React, { useState, useCallback } from 'react';
import ProductGrid from './components/ProductGrid';
import SearchBar from './components/SearchBar';
import FilterButtons from './components/FilterButtons';
import AIResponse from './components/AIResponse';
import QuickChips from './components/QuickChips';
import { getAIRecommendations } from './services/aiService';
import { PHONES_DATA } from './data/phonesCatalog';

export default function App() {
  const [recommendedIds, setRecommendedIds] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handle AI recommendation request
   * Calls the AI service with user input and processes the response
   */
  const handleSearch = useCallback(async (userInput) => {
    if (!userInput.trim()) return;

    setLoading(true);
    setError(null);
    setAiResponse(null);

    try {
      const response = await getAIRecommendations(userInput, PHONES_DATA);

      if (response.recommended_ids && Array.isArray(response.recommended_ids)) {
        setRecommendedIds(response.recommended_ids);
        setAiResponse(response);
        
        // Automatically switch to recommended filter if there are recommendations
        if (response.recommended_ids.length > 0 && activeFilter === 'all') {
          setActiveFilter('recommended');
        }
      } else {
        setError('Invalid response format from AI');
      }
    } catch (err) {
      console.error('Error getting recommendations:', err);
      setError(
        err.message || 'Failed to get recommendations. Please check your API key and try again.'
      );
    } finally {
      setLoading(false);
    }
  }, [activeFilter]);

  /**
   * Handle filter changes
   */
  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  /**
   * Handle quick chip selection
   */
  const handleQuickChip = useCallback((chipText) => {
    handleSearch(chipText);
  }, [handleSearch]);

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-icon">📱</div>
        <div className="hero-text">
          <h1>PhoneAI Recommender</h1>
          <p>Describe what you need — AI finds your perfect phone</p>
        </div>
      </header>

      <SearchBar onSearch={handleSearch} isLoading={loading} />
      <QuickChips onChipClick={handleQuickChip} />
      
      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {aiResponse && (
        <AIResponse response={aiResponse} isLoading={loading} />
      )}

      <FilterButtons 
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        recommendedCount={recommendedIds.length}
      />

      <div className="section-label" id="gridLabel">
        {activeFilter === 'all' && 'All phones'}
        {activeFilter === 'recommended' && 'AI-recommended picks'}
        {activeFilter === 'budget' && 'Budget phones under $400'}
        {activeFilter === 'premium' && 'Premium phones $400+'}
      </div>

      <ProductGrid
        phones={PHONES_DATA}
        recommendedIds={recommendedIds}
        activeFilter={activeFilter}
      />
    </div>
  );
}
