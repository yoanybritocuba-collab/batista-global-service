import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/productService';
import { useCart } from '../../contexts/cart/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ShoppingCart, Search, Filter, X, Eye, Star, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { addToCart } = useCart();
  const { t, language } = useLanguage();

  // Cargar productos desde Firebase
  useEffect(() => {
    loadProducts();
  }, []);

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

  // Filtrar productos
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.specifications?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
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

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
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
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      
      {/* Header de la tienda */}
      <div className="text-center mb-8 lg:mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
          {t('nuestra_tienda')}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('descripcion_tienda')}
        </p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8 lg:mb-12">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t('buscar_productos')}
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

        <div className="lg:w-64 relative">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00A8B5] focus:ring-2 focus:ring-[#00A8B5]/20 transition-all outline-none appearance-none bg-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'todas' ? t('todas_categorias') : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resultados de búsqueda */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? t('producto_encontrado') : t('productos_encontrados')}
        </p>
        {filteredProducts.length !== products.length && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('todas');
            }}
            className="text-[#00A8B5] hover:text-[#00909B] text-sm font-medium"
          >
            {t('limpiar_filtros')}
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
            {t('no_productos')}
          </h3>
          <p className="text-gray-600 mb-6">
            {t('intentar_otros_filtros')}
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('todas');
            }}
            className="px-6 py-3 bg-[#00A8B5] text-white rounded-xl hover:bg-[#00909B] transition-colors"
          >
            {t('ver_todos')}
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
              <div 
                className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer"
                onClick={() => handleViewDetails(product)}
              >
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
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.discount > 0 && (
                    <div className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      -{product.discount}%
                    </div>
                  )}
                  {product.isNew && (
                    <div className="bg-[#00A8B5] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {t('nuevo')}
                    </div>
                  )}
                </div>

                {/* Botón ver detalles */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(product);
                    }}
                    className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-[#00A8B5] hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    {t('ver_detalles')}
                  </button>
                </div>
              </div>

              {/* Información del producto */}
              <div className="p-5">
                <Link 
                  to={`/producto/${product.id}`}
                  className="block"
                  onClick={(e) => {
                    e.preventDefault();
                    handleViewDetails(product);
                  }}
                >
                  <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 hover:text-[#00A8B5] transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                {/* Ratings */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= (product.rating || 4)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.reviews || 0})
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Especificaciones rápidas */}
                {product.specifications && (
                  <div className="mb-3 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <span className="font-medium">{t('caracteristicas')}:</span>{' '}
                    {product.specifications.substring(0, 60)}...
                  </div>
                )}

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
                    {product.category || t('general')}
                  </span>
                </div>

                {/* Stock disponible */}
                <div className="mb-4">
                  {product.stock > 10 ? (
                    <span className="text-xs text-green-600">{t('en_stock')}</span>
                  ) : product.stock > 0 ? (
                    <span className="text-xs text-orange-600">
                      {t('ultimas_unidades', { count: product.stock })}
                    </span>
                  ) : (
                    <span className="text-xs text-red-600">{t('agotado')}</span>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className={`w-full bg-gradient-to-r from-[#00A8B5] to-[#00909B] text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 ${
                    product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.stock === 0 ? t('agotado') : t('agregar')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de detalles del producto - Estilo TEMU */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-black/90 backdrop-blur-sm"
              onClick={closeModal}
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
              
              {/* Header del modal */}
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedProduct.name}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Contenido del modal */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Galería de imágenes con ZOOM */}
                  <div className="space-y-4">
                    <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                      <div
                        className="w-full h-full transition-transform duration-300 ease-in-out cursor-zoom-in"
                        style={{
                          transform: `scale(${zoomLevel})`,
                          cursor: zoomLevel > 1 ? 'zoom-out' : 'zoom-in'
                        }}
                        onClick={zoomLevel > 1 ? handleZoomOut : handleZoomIn}
                      >
                        <img
                          src={selectedProduct.imageUrl || 'https://via.placeholder.com/600x600?text=Sin+imagen'}
                          alt={selectedProduct.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Controles de zoom */}
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        <button
                          onClick={handleZoomOut}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
                          disabled={zoomLevel <= 1}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium">
                          {Math.round(zoomLevel * 100)}%
                        </span>
                        <button
                          onClick={handleZoomIn}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
                          disabled={zoomLevel >= 3}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Detalles del producto */}
                  <div className="space-y-6">
                    {/* Precio */}
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-bold text-[#00A8B5]">
                          {formatCurrency(selectedProduct.price)}
                        </span>
                        {selectedProduct.originalPrice > selectedProduct.price && (
                          <>
                            <span className="text-xl text-gray-400 line-through">
                              {formatCurrency(selectedProduct.originalPrice)}
                            </span>
                            <span className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                              -{selectedProduct.discount || 
                                Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Descripción */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {t('descripcion')}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>

                    {/* Especificaciones técnicas */}
                    {selectedProduct.specifications && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {t('especificaciones')}
                        </h4>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-gray-700 whitespace-pre-line">
                            {selectedProduct.specifications}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Categoría */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        {t('categoria')}:
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-800">
                        {selectedProduct.category || t('general')}
                      </span>
                    </div>

                    {/* Stock */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        {t('disponibilidad')}:
                      </span>
                      {selectedProduct.stock > 10 ? (
                        <span className="text-green-600 font-medium">{t('en_stock')}</span>
                      ) : selectedProduct.stock > 0 ? (
                        <span className="text-orange-600 font-medium">
                          {t('ultimas_unidades', { count: selectedProduct.stock })}
                        </span>
                      ) : (
                        <span className="text-red-600 font-medium">{t('agotado')}</span>
                      )}
                    </div>

                    {/* Botones de acción */}
                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={() => {
                          handleAddToCart(selectedProduct);
                          closeModal();
                        }}
                        disabled={selectedProduct.stock === 0}
                        className={`flex-1 bg-gradient-to-r from-[#00A8B5] to-[#00909B] text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 ${
                          selectedProduct.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <ShoppingCart className="w-6 h-6" />
                        {selectedProduct.stock === 0 ? t('agotado') : t('agregar_carrito')}
                      </button>
                      <button
                        onClick={closeModal}
                        className="px-6 py-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {t('seguir_comprando')}
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