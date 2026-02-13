import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getProducts } from '../../services/productService';
import { useCart } from '../../contexts/cart/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ShoppingCart, Search, Filter, X, Eye, Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Tienda = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('recomendados');
  
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    loadProducts();
    loadFavorites();
  }, []);

  // Efecto para búsqueda desde URL (MobileBottomBar)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('buscar');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location]);

  const loadProducts = async () => {
    setLoading(true);
    const result = await getProducts();
    
    if (result.success) {
      const activeProducts = result.data.filter(p => p.status === 'active' || !p.status);
      setProducts(activeProducts);
      setFilteredProducts(activeProducts);
      
      const uniqueCategories = ['todas', ...new Set(activeProducts.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } else {
      toast.error(t('error_cargar_productos'));
    }
    setLoading(false);
  };

  const loadFavorites = () => {
    const saved = localStorage.getItem('batistaFavorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  };

  const toggleFavorite = (productId) => {
    const newFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];
    
    setFavorites(newFavorites);
    localStorage.setItem('batistaFavorites', JSON.stringify(newFavorites));
    
    toast.success(
      favorites.includes(productId) ? 'Eliminado de favoritos' : 'Añadido a favoritos',
      { icon: favorites.includes(productId) ? '💔' : '❤️' }
    );
  };

  // Filtrar y ordenar productos
  useEffect(() => {
    let filtered = [...products];

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

    // Ordenamiento
    switch(sortBy) {
      case 'precio-asc':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'precio-desc':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'nombre':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      default:
        // recomendados - mantener orden original
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products, sortBy]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category
    });
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setZoomLevel(1);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setZoomLevel(1);
    document.body.style.overflow = 'auto';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(language === 'es' ? 'es-CU' : 'en-US', {
      style: 'currency',
      currency: language === 'es' ? 'CUP' : 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#00A8B5] mb-4"></div>
        <p className="text-gray-600">{t('cargando_productos')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8 pb-20 lg:pb-8">
      
      {/* Header con título y contador */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
            {t('nuestra_tienda')}
          </h1>
          <p className="text-gray-500 text-sm lg:text-base">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'} disponibles
          </p>
        </div>
        
        {/* Ordenar - Solo visible en desktop */}
        <div className="hidden lg:flex items-center gap-2 mt-3 lg:mt-0">
          <span className="text-sm text-gray-500">Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:border-[#00A8B5] focus:ring-1 focus:ring-[#00A8B5] outline-none"
          >
            <option value="recomendados">Recomendados</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="nombre">Nombre</option>
          </select>
        </div>

        {/* Ordenar móvil - Select compacto */}
        <div className="lg:hidden mt-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:border-[#00A8B5] focus:ring-1 focus:ring-[#00A8B5] outline-none bg-white"
          >
            <option value="recomendados">Recomendados</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="nombre">Nombre</option>
          </select>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('buscar_productos')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg focus:border-[#00A8B5] focus:ring-1 focus:ring-[#00A8B5] transition-all outline-none text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="lg:w-48 relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#00A8B5] focus:ring-1 focus:ring-[#00A8B5] transition-all outline-none appearance-none bg-white text-sm"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'todas' ? t('todas_categorias') : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid de productos - ESTILO TEMU */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {t('no_productos')}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {t('intentar_otros_filtros')}
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('todas');
            }}
            className="px-4 py-2 bg-[#00A8B5] text-white rounded-lg text-sm hover:bg-[#00909B] transition-colors"
          >
            {t('ver_todos')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#00A8B5]/30 relative"
            >
              {/* Botón de favoritos */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-2 right-2 z-10 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    favorites.includes(product.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-400'
                  }`}
                />
              </button>

              {/* Imagen */}
              <div 
                className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer"
                onClick={() => handleViewDetails(product)}
              >
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/300x300?text=Sin+imagen'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x300?text=Sin+imagen';
                  }}
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.discount > 0 && (
                    <div className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      -{product.discount}%
                    </div>
                  )}
                  {product.isNew && (
                    <div className="bg-[#00A8B5] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      NUEVO
                    </div>
                  )}
                </div>
              </div>

              {/* Información */}
              <div className="p-2 lg:p-3">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400">(128)</span>
                </div>

                {/* Nombre */}
                <h3 className="font-medium text-gray-900 text-xs lg:text-sm mb-1 line-clamp-2 h-8 lg:h-10">
                  {product.name}
                </h3>

                {/* Precio */}
                <div className="mb-2">
                  <span className="text-sm lg:text-base font-bold text-[#00A8B5]">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-[10px] lg:text-xs text-gray-400 line-through ml-1">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Stock bajo */}
                {product.stock <= 5 && product.stock > 0 && (
                  <p className="text-[10px] text-orange-600 mb-2">
                    ¡Solo {product.stock} uds!
                  </p>
                )}

                {/* Botón comprar */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className={`w-full bg-[#00A8B5] hover:bg-[#00909B] text-white py-1.5 lg:py-2 rounded text-xs lg:text-sm font-medium transition-all hover:scale-[1.02] ${
                    product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {product.stock === 0 ? t('agotado') : t('agregar')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de detalles estilo TEMU */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-4">
            <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" onClick={closeModal} />

            <div className="relative bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header del modal */}
              <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between z-10">
                <h3 className="text-lg font-semibold text-gray-900 truncate pr-4">
                  {selectedProduct.name}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contenido */}
              <div className="p-4 lg:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Imagen con zoom */}
                  <div className="space-y-3">
                    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className="w-full h-full transition-transform duration-300 cursor-zoom-in"
                        style={{ transform: `scale(${zoomLevel})` }}
                        onClick={() => setZoomLevel(zoomLevel === 1 ? 2 : 1)}
                      >
                        <img
                          src={selectedProduct.imageUrl || 'https://via.placeholder.com/600x600?text=Sin+imagen'}
                          alt={selectedProduct.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Controles de zoom */}
                      <div className="absolute bottom-3 right-3 flex gap-2">
                        <button
                          onClick={() => setZoomLevel(prev => Math.max(prev - 0.5, 1))}
                          className="p-1.5 bg-white/90 backdrop-blur-sm rounded shadow hover:bg-white"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="px-2 py-1.5 bg-white/90 backdrop-blur-sm rounded text-xs font-medium">
                          {Math.round(zoomLevel * 100)}%
                        </span>
                        <button
                          onClick={() => setZoomLevel(prev => Math.min(prev + 0.5, 3))}
                          className="p-1.5 bg-white/90 backdrop-blur-sm rounded shadow hover:bg-white"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Detalles */}
                  <div className="space-y-4">
                    {/* Precio */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl lg:text-3xl font-bold text-[#00A8B5]">
                        {formatCurrency(selectedProduct.price)}
                      </span>
                      {selectedProduct.originalPrice > selectedProduct.price && (
                        <>
                          <span className="text-base text-gray-400 line-through">
                            {formatCurrency(selectedProduct.originalPrice)}
                          </span>
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            -{selectedProduct.discount || 
                              Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}%
                          </span>
                        </>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">128 opiniones</span>
                    </div>

                    {/* Descripción */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Descripción</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>

                    {/* Especificaciones */}
                    {selectedProduct.specifications && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Especificaciones</h4>
                        <p className="text-sm text-gray-600 whitespace-pre-line">
                          {selectedProduct.specifications}
                        </p>
                      </div>
                    )}

                    {/* Categoría y stock */}
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">Categoría:</span>
                        <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded">
                          {selectedProduct.category || 'General'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">Stock:</span>
                        <span className={`text-xs font-medium ${
                          selectedProduct.stock > 10 ? 'text-green-600' :
                          selectedProduct.stock > 0 ? 'text-orange-600' : 'text-red-600'
                        }`}>
                          {selectedProduct.stock > 10 ? 'Disponible' :
                           selectedProduct.stock > 0 ? `Últimas ${selectedProduct.stock}` : 'Agotado'}
                        </span>
                      </div>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => {
                          handleAddToCart(selectedProduct);
                          closeModal();
                        }}
                        disabled={selectedProduct.stock === 0}
                        className={`flex-1 bg-[#00A8B5] hover:bg-[#00909B] text-white py-3 px-4 rounded-lg font-medium transition-all hover:scale-[1.02] flex items-center justify-center gap-2 ${
                          selectedProduct.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {selectedProduct.stock === 0 ? t('agotado') : t('agregar_carrito')}
                      </button>
                      <button
                        onClick={closeModal}
                        className="px-4 py-3 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Seguir comprando
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tienda;