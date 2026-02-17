import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../contexts/SearchContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Search, X, TrendingUp, Clock, Mic, Camera, Loader } from 'lucide-react';

const SearchBar = ({ variant = 'default', onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  
  const { getSuggestions, recentSearches, popularSearches, addRecentSearch } = useSearch();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        setIsLoading(true);
        const results = getSuggestions(query);
        setSuggestions(results);
        setIsLoading(false);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, getSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      addRecentSearch(query);
      navigate(`/buscar?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
      if (onClose) onClose();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    addRecentSearch(suggestion.name);
    navigate(`/producto/${suggestion.id}`);
    setShowSuggestions(false);
    if (onClose) onClose();
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };
    } else {
      alert(t('voice_search_not_supported'));
    }
  };

  return (
    <div className="relative w-full" ref={suggestionsRef}>
      <form onSubmit={handleSearch} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder={t('search_placeholder')}
          className={`
            w-full px-4 py-3 pl-12 pr-24 
            border border-gray-300 rounded-full 
            focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
            ${variant === 'hero' ? 'text-lg py-4' : ''}
          `}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          <button
            type="button"
            onClick={handleVoiceSearch}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title={t('voice_search')}
          >
            <Mic className="h-4 w-4 text-gray-500" />
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 bg-amber-500 text-white rounded-full text-sm font-medium hover:bg-amber-600 transition-colors"
          >
            {t('search')}
          </button>
        </div>
      </form>

      {/* Sugerencias */}
      {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0 || popularSearches.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {/* Cargando */}
          {isLoading && (
            <div className="p-4 text-center text-gray-500">
              <Loader className="h-5 w-5 animate-spin mx-auto" />
            </div>
          )}

          {/* Resultados de búsqueda */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <h4 className="text-xs font-semibold text-gray-500 px-3 py-2">{t('suggestions')}</h4>
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSuggestionClick(item)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                  ) : (
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">${item.price}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Búsquedas recientes */}
          {recentSearches.length > 0 && (
            <div className="p-2 border-t">
              <h4 className="text-xs font-semibold text-gray-500 px-3 py-2 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {t('recent_searches')}
              </h4>
              {recentSearches.map((search, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(search);
                    handleSearch(new Event('submit'));
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Búsquedas populares */}
          <div className="p-2 border-t">
            <h4 className="text-xs font-semibold text-gray-500 px-3 py-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {t('popular_searches')}
            </h4>
            <div className="flex flex-wrap gap-2 px-3">
              {popularSearches.map((search, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(search);
                    handleSearch(new Event('submit'));
                  }}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;