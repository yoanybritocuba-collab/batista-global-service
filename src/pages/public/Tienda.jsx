import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/productService';
import { useCart } from '../../contexts/cart/CartContext';
import { ShoppingCart, Search, Filter, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Tienda = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCart();

  // Cargar productos desde Firebase
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const result = await getProducts();
    
    if (result.success) {
      // Filtrar solo productos activos
      const activeProducts = result.data.filter(p => p.status === 'active' || !p.status);
      setProducts(activeProducts);
      setFilteredProducts(activeProducts);
      
      // Extraer categorías únicas
      const uniqueCategories = ['todas', ...new Set(activeProducts.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } else {
      toast.error('Error al cargar productos');
    }
    setLoading(false);
  };

  // Filtrar productos por búsqueda y categoría
  useEffect(() => {
    let filtered = products;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por categoría
    if (selectedCategory && selectedCategory !== 'todas') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CU', {
      style: 'currency',
      currency: 'CUP'
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#00A8B5] mb-4"></div>
        <p className="text-gray-600">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      
      {/* Header de la tienda */}
      <div className="text-center mb-8 lg:mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
          Nuestra Tienda
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descubre nuestra selección de productos y servicios turísticos premium
        </p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8 lg:mb-12">
        {/* Búsqueda */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00A8B5] focus:ring-2 focus:ring-[#00A8B5]/20 transition-all outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filtro por categoría */}
        <div className="lg:w-64 relative">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00A8B5] focus:ring-2 focus:ring-[#00A8B5]/20 transition-all outline-none appearance-none bg-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'todas' ? 'Todas las categorías' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resultados de búsqueda */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
        </p>
        {filteredProducts.length !== products.length && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('todas');
            }}
            className="text-[#00A8B5] hover:text-[#00909B] text-sm font-medium"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Grid de productos */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No se encontraron productos
          </h3>
          <p className="text-gray-600 mb-6">
            Intenta con otros términos de búsqueda o categorías
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('todas');
            }}
            className="px-6 py-3 bg-[#00A8B5] text-white rounded-xl hover:bg-[#00909B] transition-colors"
          >
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#00A8B5]/20"
            >
              {/* Imagen del producto */}
              <Link to={`/producto/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x400?text=Sin+imagen';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <ShoppingCart className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                
                {/* Badge de descuento */}
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    -{product.discount}%
                  </div>
                )}
                
                {/* Badge de nuevo */}
                {product.isNew && (
                  <div className="absolute top-4 right-4 bg-[#00A8B5] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    Nuevo
                  </div>
                )}
              </Link>

              {/* Información del producto */}
              <div className="p-5">
                <Link to={`/producto/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 hover:text-[#00A8B5] transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-[#00A8B5]">
                      {formatCurrency(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                    {product.category || 'General'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-gradient-to-r from-[#00A8B5] to-[#00909B] text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Agregar
                  </button>
                  <Link
                    to={`/producto/${product.id}`}
                    className="px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-[#00A8B5] hover:text-[#00A8B5] transition-colors"
                  >
                    Ver
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mensaje de productos agotados */}
      {products.length === 0 && !loading && (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">No hay productos disponibles en este momento</p>
          <Link
            to="/"
            className="text-[#00A8B5] hover:text-[#00909B] font-medium"
          >
            Volver al inicio
          </Link>
        </div>
      )}
    </div>
  );
};

export default Tienda;