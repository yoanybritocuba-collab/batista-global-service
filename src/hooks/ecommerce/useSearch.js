import { useState, useMemo, useCallback } from 'react';
import Fuse from 'fuse.js';

// Base de datos de sinónimos para productos del Caribe
const SINONIMOS = {
  // Electrodomésticos
  'licuadora': ['licuadora', 'batidora', 'mezcladora', 'blender'],
  'refrigerador': ['refrigerador', 'nevera', 'frigorífico', 'heladera', 'refri'],
  'cocina': ['cocina', 'estufa', 'hornilla', 'fogón', 'hornillo'],
  'microondas': ['microondas', 'horno microondas', 'micro'],
  'lavadora': ['lavadora', 'máquina de lavar', 'washer'],
  
  // Tecnología
  'telefono': ['teléfono', 'celular', 'móvil', 'smartphone'],
  'computadora': ['computadora', 'ordenador', 'pc', 'laptop', 'portátil'],
  'televisor': ['televisor', 'televisión', 'tv', 'pantalla'],
  
  // Hogar
  'ventilador': ['ventilador', 'abanico', 'cooler'],
  'aire acondicionado': ['aire acondicionado', 'ac', 'clima', 'aire'],
  'cama': ['cama', 'colchón', 'litera'],
  'sofá': ['sofá', 'sillón', 'mueble'],
  
  // Ropa y Accesorios
  'camiseta': ['camiseta', 'playera', 'remera', 't-shirt', 'polo'],
  'ropa': ['ropa', 'vestimenta', 'prendas', 'indumentaria'],
  'sombrero': ['sombrero', 'gorra', 'pañuelo', 'tocado'],
  'accesorios': ['accesorios', 'complementos', 'adornos'],
  
  // Bebidas
  'ron': ['ron', 'licor', 'aguardiente', 'bebida alcoholica'],
  'bebida': ['bebida', 'trago', 'refresco', 'jugo'],
  
  // Joyería
  'collar': ['collar', 'gargantilla', 'cadena', 'pendiente'],
  'joyeria': ['joyería', 'bisutería', 'adornos', 'accesorios personales'],
  'concha': ['concha', 'caracol', 'marisco', 'marina'],
  
  // Cosmética
  'crema': ['crema', 'loción', 'pomada', 'ungüento'],
  'cosmeticos': ['cosméticos', 'maquillaje', 'belleza', 'cuidado personal'],
  'coco': ['coco', 'cocotero', 'tropical', 'palmera'],
  
  // Categorías generales
  'oferta': ['oferta', 'descuento', 'promoción', 'rebaja', 'liquidación'],
  'nuevo': ['nuevo', 'novedad', 'reciente', 'lanzamiento'],
  'popular': ['popular', 'vendido', 'destacado', 'recomendado'],
  'caribe': ['caribe', 'tropical', 'isla', 'playa', 'verano']
};

// Correcciones comunes de ortografía
const CORRECCIONES = {
  'refrijerador': 'refrigerador',
  'licuadera': 'licuadora',
  'microhondas': 'microondas',
  'televicion': 'televisor',
  'komputadora': 'computadora',
  'celural': 'celular',
  'camiseta': 'camiseta',
  'ron': 'ron',
  'sombrero': 'sombrero',
  'crema': 'crema',
  'coco': 'coco',
  'concha': 'concha',
  'nebera': 'nevera',
  'cocina': 'cocina',
  'lavadera': 'lavadora'
};

const useSearch = (productos = []) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState(() => {
    // Cargar historial desde localStorage
    const saved = localStorage.getItem('miwebcaribe_search_history');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [popularSearches] = useState([
    'camiseta', 'sombrero', 'ron', 'collar', 'crema',
    'ropa', 'accesorios', 'bebidas', 'joyeria', 'cosmeticos',
    'oferta', 'nuevo', 'caribe', 'tropical', 'cocina', 'telefono'
  ]);

  // Guardar historial en localStorage
  const saveHistoryToStorage = useCallback((history) => {
    localStorage.setItem('miwebcaribe_search_history', JSON.stringify(history));
  }, []);

  // Expandir búsqueda con sinónimos y correcciones
  const expandSearchTerms = useCallback((query) => {
    if (!query.trim()) return [query];
    
    const originalQuery = query.toLowerCase().trim();
    const terms = originalQuery.split(' ').filter(term => term.length > 0);
    const expanded = new Set([originalQuery]);
    
    // Aplicar correcciones ortográficas primero
    terms.forEach(term => {
      if (CORRECCIONES[term]) {
        expanded.add(CORRECCIONES[term]);
      }
    });

    // Expandir con sinónimos para cada término
    terms.forEach(term => {
      // Buscar sinónimos directos
      for (const [key, synonyms] of Object.entries(SINONIMOS)) {
        if (synonyms.includes(term)) {
          // Agregar la palabra clave principal y todos sus sinónimos
          expanded.add(key);
          synonyms.forEach(syn => expanded.add(syn));
        }
        // Si el término coincide con la palabra clave principal
        if (key === term || key.includes(term) || term.includes(key)) {
          synonyms.forEach(syn => expanded.add(syn));
        }
      }
    });

    return Array.from(expanded);
  }, []);

  // Configurar Fuse.js para búsqueda difusa
  const fuse = useMemo(() => {
    // Preparar datos para Fuse
    const productsForSearch = productos.map(product => ({
      ...product,
      // Asegurar que todos los campos sean strings para Fuse
      name: product.name || '',
      description: product.description || '',
      category: product.category || '',
      searchableText: `${product.name || ''} ${product.description || ''} ${product.category || ''}`.toLowerCase()
    }));

    const options = {
      keys: [
        { name: 'name', weight: 0.6 },
        { name: 'description', weight: 0.3 },
        { name: 'category', weight: 0.1 },
      ],
      threshold: 0.4,
      distance: 100,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      shouldSort: true,
      findAllMatches: true,
      ignoreLocation: true,
      useExtendedSearch: true,
    };
    
    return new Fuse(productsForSearch, options);
  }, [productos]);

  // Realizar búsqueda
  const search = useCallback((query) => {
    if (!query.trim()) return productos;
    
    const expandedTerms = expandSearchTerms(query);
    console.log('🔍 Búsqueda con términos:', expandedTerms);
    
    let allResults = [];
    const seenIds = new Set();
    
    expandedTerms.forEach(term => {
      try {
        // Búsqueda con Fuse
        const results = fuse.search(term);
        
        results.forEach(result => {
          if (!seenIds.has(result.item.id)) {
            seenIds.add(result.item.id);
            allResults.push({
              ...result,
              searchTerm: term
            });
          }
        });
      } catch (error) {
        console.warn(`Error en búsqueda para "${term}":`, error);
      }
    });
    
    // Si no hay resultados con Fuse, intentar búsqueda simple
    if (allResults.length === 0 && query.length >= 2) {
      const queryLower = query.toLowerCase();
      const simpleResults = productos.filter(product => {
        const searchText = `${product.name || ''} ${product.description || ''} ${product.category || ''}`.toLowerCase();
        return searchText.includes(queryLower);
      });
      
      simpleResults.forEach(product => {
        if (!seenIds.has(product.id)) {
          allResults.push({
            item: product,
            score: 0.5,
            matches: []
          });
        }
      });
    }
    
    // Ordenar por score y eliminar duplicados
    const uniqueResults = allResults
      .filter(result => result.item && result.item.id)
      .sort((a, b) => a.score - b.score)
      .map(result => result.item);
    
    console.log(`✅ Encontrados ${uniqueResults.length} productos`);
    return uniqueResults;
  }, [fuse, productos, expandSearchTerms]);

  // Obtener sugerencias en tiempo real
  const getSuggestions = useCallback((query) => {
    if (!query.trim() || query.length < 2) return [];
    
    const suggestions = new Set();
    const queryLower = query.toLowerCase();
    
    // 1. Buscar en nombres de productos
    productos.forEach(product => {
      if (product.name && product.name.toLowerCase().includes(queryLower)) {
        suggestions.add(product.name);
      }
      
      if (product.category && product.category.toLowerCase().includes(queryLower)) {
        suggestions.add(product.category);
      }
    });
    
    // 2. Agregar sinónimos relacionados
    Object.entries(SINONIMOS).forEach(([key, synonyms]) => {
      if (key.includes(queryLower) || 
          synonyms.some(s => s.includes(queryLower)) ||
          queryLower.includes(key)) {
        suggestions.add(key);
        synonyms.forEach(syn => suggestions.add(syn));
      }
    });
    
    // 3. Agregar búsquedas populares relacionadas
    popularSearches.forEach(popular => {
      if (popular.includes(queryLower) || queryLower.includes(popular)) {
        suggestions.add(popular);
      }
    });
    
    // 4. Agregar del historial
    searchHistory.forEach(item => {
      if (item.includes(queryLower) || queryLower.includes(item)) {
        suggestions.add(item);
      }
    });
    
    // 5. Aplicar correcciones
    if (CORRECCIONES[queryLower]) {
      suggestions.add(CORRECCIONES[queryLower]);
    }
    
    // Limitar a 8 sugerencias y ordenar por relevancia
    return Array.from(suggestions)
      .filter(s => s.toLowerCase() !== queryLower)
      .slice(0, 8)
      .sort((a, b) => {
        const aStartsWith = a.toLowerCase().startsWith(queryLower);
        const bStartsWith = b.toLowerCase().startsWith(queryLower);
        
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        
        return a.length - b.length;
      });
  }, [productos, popularSearches, searchHistory]);

  // Agregar al historial
  const addToHistory = useCallback((query) => {
    if (!query.trim() || query.length < 2) return;
    
    const normalizedQuery = query.toLowerCase().trim();
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item !== normalizedQuery);
      const newHistory = [normalizedQuery, ...filtered].slice(0, 10);
      saveHistoryToStorage(newHistory);
      return newHistory;
    });
  }, [saveHistoryToStorage]);

  // Limpiar historial
  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem('miwebcaribe_search_history');
  }, []);

  // Obtener resultados actuales
  const resultados = useMemo(() => {
    return search(searchQuery);
  }, [searchQuery, search]);

  return {
    searchQuery,
    setSearchQuery,
    resultados,
    getSuggestions,
    searchHistory,
    addToHistory,
    clearHistory,
    popularSearches,
    isSearching: searchQuery.trim().length > 0,
    totalProducts: productos.length,
    foundProducts: resultados.length
  };
};

export default useSearch;