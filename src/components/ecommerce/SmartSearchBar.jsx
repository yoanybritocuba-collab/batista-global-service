import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Clock, TrendingUp, ArrowRight, Zap, Sparkles, Loader2 } from 'lucide-react';
import useSearch from '@/hooks/ecommerce/useSearch';

const SmartSearchBar = ({ 
  products = [], 
  onSearchResults, 
  placeholder = "Ã°Å¸â€Â Busca productos, marcas o categorÃƒÂ­as..."
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const inputRef = useRef(null);
  
  // Usar nuestro hook de bÃƒÂºsqueda
  const {
    searchQuery,
    setSearchQuery,
    resultados,
    getSuggestions,
    searchHistory,
    addToHistory,
    clearHistory,
    popularSearches,
    isSearching,
    totalProducts,
    foundProducts
  } = useSearch(products);

  // Sincronizar inputValue con searchQuery
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  // Manejar cambio en el input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchQuery(value);
    
    if (value.trim()) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 200);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      if (onSearchResults) {
        onSearchResults(products);
      }
    }
  };

  // Manejar selecciÃƒÂ³n de sugerencia
  const handleSuggestionClick = useCallback((suggestion) => {
    setInputValue(suggestion);
    setSearchQuery(suggestion);
    addToHistory(suggestion);
    setShowSuggestions(false);
    
    // Enfocar input y disparar bÃƒÂºsqueda
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    setTimeout(() => {
      if (onSearchResults && resultados) {
        onSearchResults(resultados);
      }
    }, 50);
  }, [addToHistory, resultados, onSearchResults]);

  // Manejar bÃƒÂºsqueda con Enter
  const handleKeyDown = (e) => {
    const suggestions = getSuggestions(inputValue);
    
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (inputValue.trim()) {
          addToHistory(inputValue);
          setShowSuggestions(false);
          if (onSearchResults && resultados) {
            onSearchResults(resultados);
          }
        }
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        if (showSuggestions && suggestions.length > 0) {
          setActiveSuggestionIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (showSuggestions) {
          setActiveSuggestionIndex(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
        }
        break;
        
      case 'Escape':
        setShowSuggestions(false);
        break;
        
      case 'Tab':
        if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
          e.preventDefault();
          handleSuggestionClick(suggestions[activeSuggestionIndex]);
        }
        break;
    }
  };

  // FunciÃƒÂ³n de bÃƒÂºsqueda manual
  const handleSearch = useCallback(() => {
    if (!inputValue.trim()) return;
    
    addToHistory(inputValue);
    setShowSuggestions(false);
    
    if (onSearchResults && resultados) {
      onSearchResults(resultados);
    }
  }, [inputValue, addToHistory, resultados, onSearchResults]);

  // Limpiar bÃƒÂºsqueda
  const handleClear = () => {
    setInputValue('');
    setSearchQuery('');
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    
    if (onSearchResults) {
      onSearchResults(products);
    }
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Clic fuera para cerrar sugerencias
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Obtener sugerencias actuales
  const suggestions = getSuggestions(inputValue);

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      {/* Barra de bÃƒÂºsqueda principal */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue.trim() && setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-32 py-3.5 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:ring-3 focus:ring-red-100 outline-none transition-all text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md hover:border-gray-400 text-sm md:text-base"
          aria-label="Buscar productos"
          aria-expanded={showSuggestions}
        />
        
        {/* Indicadores y botones */}
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
          {isLoading && (
            <div className="p-2">
              <Loader2 className="h-5 w-5 text-red-500 animate-spin" />
            </div>
          )}
          
          {inputValue && !isLoading && (
            <button
              onClick={handleClear}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Limpiar bÃƒÂºsqueda"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
          
          <button
            onClick={handleSearch}
            disabled={!inputValue.trim()}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-600 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm ml-1 flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Buscar
          </button>
        </div>
      </div>

      {/* Panel de sugerencias */}
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
        >
          {/* Encabezado */}
          <div className="p-3 bg-gradient-to-r from-gray-50 to-white border-b">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-bold text-gray-800">
                  BÃƒÂºsqueda inteligente
                </span>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {suggestions.length} sugerencias
              </span>
            </div>
          </div>

          {/* Contenido del panel */}
          <div className="max-h-80 overflow-y-auto">
            {/* Sugerencias en tiempo real */}
            {suggestions.length > 0 && (
              <div className="p-3 border-b">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Sugerencias para "{inputValue}"
                  </span>
                </div>
                
                <ul className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <li key={`${suggestion}-${index}`}>
                      <button
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between hover:bg-red-50 transition-all group ${
                          index === activeSuggestionIndex ? 'bg-red-50 border-l-4 border-red-500' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600 group-hover:text-red-600">
                            {index + 1}.
                          </span>
                          <span className="text-sm text-gray-800 font-medium group-hover:text-red-700">
                            {suggestion}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-red-400" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Historial de bÃƒÂºsqueda */}
            {searchHistory.length > 0 && (
              <div className="p-3 border-b">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Recientes
                    </span>
                  </div>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-red-500 hover:text-red-700 font-medium"
                  >
                    Limpiar
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {searchHistory.slice(0, 6).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Clock className="h-3 w-3" />
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* BÃƒÂºsquedas populares */}
            <div className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  Populares
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {popularSearches.slice(0, 8).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 text-xs font-medium rounded-lg transition-all border border-blue-100 hover:border-blue-200 shadow-sm flex items-center gap-2"
                  >
                    <Zap className="h-3 w-3" />
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer con estadÃƒÂ­sticas */}
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <div className="text-xs text-gray-600">
              <div className="flex items-center justify-between">
                <span>
                  Ã°Å¸â€œÂ¦ {totalProducts} productos en catÃƒÂ¡logo
                </span>
                {isSearching && (
                  <span className="text-green-600 font-medium">
                    Ã¢Å“Â¨ {foundProducts} resultados encontrados
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* EstadÃƒÂ­sticas de bÃƒÂºsqueda */}
      {isSearching && resultados.length > 0 && (
        <div className="mt-2 text-sm text-gray-600">
          <span className="font-medium text-green-600">
            Ã¢Å“â€¦ Encontrados {resultados.length} productos
          </span>
          <span className="text-gray-500 ml-2">
            (de {totalProducts} totales)
          </span>
        </div>
      )}
    </div>
  );
};

export default SmartSearchBar;

