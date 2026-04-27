import React, { useState } from 'react';

/**
 * SearchBar Component
 * Handles user input for AI recommendations
 */
export default function SearchBar({ onSearch, isLoading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="e.g. best camera phone under $600, long battery life..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !input.trim()}>
        {isLoading ? 'Thinking...' : 'Ask AI ↗'}
      </button>
    </form>
  );
}
