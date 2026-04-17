import React, { useState } from "react";

const SearchBar = ({ onSearch, onLocationSearch, loading }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrap">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            autoComplete="off"
          />
          {query && (
            <button type="button" className="clear-btn" onClick={() => setQuery("")} aria-label="Clear">
              ✕
            </button>
          )}
        </div>
        <button type="submit" className="search-btn" disabled={loading || !query.trim()}>
          {loading ? <span className="spinner" /> : "Search"}
        </button>
        <button
          type="button"
          className="location-btn"
          onClick={onLocationSearch}
          disabled={loading}
          title="Use my location"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            <circle cx="12" cy="12" r="8" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
