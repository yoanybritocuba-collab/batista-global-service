import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase/config';  // 👈 RUTA CORREGIDA

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('🔍 Buscando categorías...');

        // PRIMERO: Intentar obtener categorías de la colección 'categories'
        const categoriesSnapshot = await getDocs(collection(db, 'categories'));

        if (!categoriesSnapshot.empty) {
          // SI EXISTEN categorías en Firestore, usarlas
          const categoriesList = [];
          categoriesSnapshot.forEach((doc) => {
            categoriesList.push({ id: doc.id, ...doc.data() });
          });

          categoriesList.sort((a, b) => (a.order || 99) - (b.order || 99));
          console.log(`✅ Categorías de Firestore: ${categoriesList.length}`);
          setCategories([
            { id: 'all', name: 'Todos', slug: 'all', icon: '📦' },
            { id: 'ofertas', name: 'Ofertas', slug: 'ofertas', icon: '🔥' },
            { id: 'nuevos', name: 'Nuevos', slug: 'nuevos', icon: '🆕' },
            ...categoriesList
          ]);
        } else {
          // SI NO EXISTEN: Extraer categorías ÚNICAS de los productos
          console.log('🔍 Extrayendo categorías de productos existentes...');
          const productsSnapshot = await getDocs(collection(db, 'products'));
          const categoryMap = new Map();

          productsSnapshot.forEach(doc => {
            const product = doc.data();
            if (product.category && typeof product.category === 'string') {
              const cat = product.category.trim().toLowerCase();
              if (cat && !categoryMap.has(cat)) {
                categoryMap.set(cat, {
                  id: cat,
                  name: cat.charAt(0).toUpperCase() + cat.slice(1),
                  slug: cat,
                  count: 1
                });
              } else if (categoryMap.has(cat)) {
                categoryMap.get(cat).count++;
              }
            }
          });

          // Convertir a array y ordenar por cantidad de productos
          const categoriesFromProducts = Array.from(categoryMap.values())
            .sort((a, b) => b.count - a.count)
            .map(cat => ({
              id: cat.id,
              name: cat.name,
              slug: cat.slug,
              icon: getIconForCategory(cat.id)
            }));

          console.log(`✅ Categorías extraídas de productos: ${categoriesFromProducts.length}`);

          // Añadir categorías especiales al inicio
          setCategories([
            { id: 'all', name: 'Todos', slug: 'all', icon: '📦' },
            { id: 'ofertas', name: 'Ofertas', slug: 'ofertas', icon: '🔥' },
            { id: 'nuevos', name: 'Nuevos', slug: 'nuevos', icon: '🆕' },
            ...categoriesFromProducts
          ]);
        }
      } catch (err) {
        console.error('❌ Error cargando categorías:', err);
        setError(err.message);
        // Categorías mínimas de respaldo
        setCategories([
          { id: 'all', name: 'Todos', slug: 'all' },
          { id: 'ofertas', name: 'Ofertas', slug: 'ofertas' },
          { id: 'nuevos', name: 'Nuevos', slug: 'nuevos' },
          { id: 'electronics', name: 'Electrónicos', slug: 'electronics' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

// Función helper para asignar iconos según categoría
const getIconForCategory = (category) => {
  const iconMap = {
    'electronics': '⚡',
    'home': '🏠',
    'kitchen': '🔪',
    'clothing': '👕',
    'sports': '⚽',
    'books': '📚',
    'toys': '🧸',
    'beauty': '💄',
    'food': '🍎',
    'drinks': '🥤',
    'default': '📦'
  };
  return iconMap[category] || iconMap.default;
};
