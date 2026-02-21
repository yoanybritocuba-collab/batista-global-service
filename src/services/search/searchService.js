import Fuse from 'fuse.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';  // 👈 RUTA CORREGIDA

class SearchService {
  constructor() {
    this.fuse = null;
    this.products = [];
    this.options = {
      keys: [
        { name: 'name', weight: 0.7 },
        { name: 'description', weight: 0.2 },
        { name: 'category', weight: 0.1 },
        { name: 'tags', weight: 0.3 },
        { name: 'brand', weight: 0.4 }
      ],
      threshold: 0.4,
      ignoreLocation: true,
      findAllMatches: true,
      minMatchCharLength: 2,
      useExtendedSearch: true,
      includeScore: true,
      includeMatches: true
    };
  }

  async loadProducts() {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      this.products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        normalizedName: doc.data().name?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        searchableText: this.generateSearchableText(doc.data())
      }));
      
      this.fuse = new Fuse(this.products, this.options);
      console.log(`✅ ${this.products.length} productos cargados para búsqueda`);
      return this.products;
    } catch (error) {
      console.error('Error loading products for search:', error);
      return [];
    }
  }

  generateSearchableText(product) {
    const parts = [
      product.name,
      product.description,
      product.category,
      product.brand,
      ...(product.tags || [])
    ];
    return parts.filter(Boolean).join(' ').toLowerCase();
  }

  search(query, limit = 20) {
    if (!this.fuse || !query || query.trim().length < 2) {
      return [];
    }

    const results = this.fuse.search(query);

    return results.slice(0, limit).map(result => ({
      ...result.item,
      score: result.score,
      matches: result.matches
    }));
  }

  searchByCategory(query, category) {
    const results = this.search(query);
    if (category && category !== 'all') {
      return results.filter(item => item.category === category);
    }
    return results;
  }

  getSuggestions(query, limit = 5) {
    const results = this.search(query, limit);
    return results.map(item => ({
      id: item.id,
      name: item.name,
      image: item.imageUrl,
      price: item.price,
      category: item.category
    }));
  }
}

export default new SearchService();