import React, { createContext, useContext, useState, useEffect } from 'react';
import searchService from '../services/search/searchService';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch debe usarse dentro de SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([
    'celular', 'ropa', 'zapatos', 'electrónica', 'hogar'
  ]);

  useEffect(() => {
    const initSearch = async () => {
      await searchService.loadProducts();
      setIsInitialized(true);
    };
    initSearch();

    // Cargar búsquedas recientes del localStorage
    const saved = localStorage.getItem('recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const search = (query, limit) => {
    return searchService.search(query, limit);
  };

  const getSuggestions = (query) => {
    return searchService.getSuggestions(query);
  };

  const addRecentSearch = (query) => {
    if (!query.trim()) return;
    
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent_searches', JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recent_searches');
  };

  const value = {
    isInitialized,
    search,
    getSuggestions,
    recentSearches,
    popularSearches,
    addRecentSearch,
    clearRecentSearches
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
