import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/contexts/cart/CartContext';
import { ShoppingCart, Star, X, ZoomIn, Package, Check, Truck, Shield } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [imageZoom, setImageZoom] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log('AÃƒÂ±adiendo al carrito:', product);
    addToCart(product);
  };

  // Calcular precio con descuento
  const calculateDiscountPrice = () => {
    if (product.discount && product.discount > 0) {
      return product.price * (1 - product.discount / 100);
    }
    return product.price;
  };

  // Verificar si la URL de imagen es vÃƒÂ¡lida
  const getImageUrl = () => {
    if (product.imageUrl && 
        (product.imageUrl.includes('firebase') || 
         product.imageUrl.startsWith('http') ||
         product.imageUrl.startsWith('blob:') ||
         product.imageUrl.startsWith('data:image'))) {
      return product.imageUrl;
    }
    
    if (product.image && product.image.startsWith('http')) {
      return product.image;
    }
    
    if (product.image && product.image.startsWith('/')) {
      return product.image;
    }
    
    return '/images/placeholder.jpg';
  };

  const finalPrice = calculateDiscountPrice();
  const imageUrl = getImageUrl();

  // Parsear especificaciones
  const parseSpecifications = () => {
    if (!product.specifications) return [];
    
    if (typeof product.specifications === 'string') {
      return product.specifications.split('\n').filter(spec => spec.trim());
    }
    
    if (Array.isArray(product.specifications)) {
      return product.specifications;
    }
    
    return [];
  };

  const specifications = parseSpecifications();

  return (
    <>
      {/* TARJETA CON PROPORCIONES TEMU - Ancho fijo, foto mÃƒÂ¡s grande */}
      <div 
        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-red-300 cursor-pointer group w-full max-w-[180px] mx-auto"
        onClick={() => setShowModal(true)}
      >
        {/* CONTENEDOR DE IMAGEN - MÃƒÂ¡s grande proporcionalmente */}
        <div className="relative h-40 w-full overflow-hidden bg-white p-3">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = '/images/placeholder.jpg';
            }}
          />
          
          {/* Etiquetas superpuestas */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="px-2 py-1 bg-green-600 text-white text-[10px] font-bold rounded shadow">
                Ã°Å¸â€ â€¢ NUEVO
              </span>
            )}
            
            {product.discount > 0 && (
              <span className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded shadow">
                -{product.discount}%
              </span>
            )}
          </div>
          
          {/* Indicador de favorito (corazÃƒÂ³n) */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // AquÃƒÂ­ irÃƒÂ­a la lÃƒÂ³gica para favoritos
            }}
            className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span className="text-gray-600 text-lg">Ã¢ÂÂ¤Ã¯Â¸Â</span>
          </button>
        </div>

        {/* CONTENIDO - Compacto pero legible */}
        <div className="p-3 pt-2 border-t border-gray-100">
          {/* Nombre del producto */}
          <h3 className="font-medium text-gray-800 text-sm line-clamp-2 mb-2 min-h-[40px] leading-snug">
            {product.name}
          </h3>
          
          {/* Precio y rating en lÃƒÂ­nea */}
          <div className="flex items-center justify-between mb-2">
            {/* Precio */}
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-bold text-red-600">
                  ${finalPrice.toFixed(2)}
                </span>
                
                {product.discount > 0 && (
                  <span className="text-xs text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Precio por unidad si aplica */}
              {product.unit && (
                <div className="text-[10px] text-gray-500">
                  ${(finalPrice / product.unit).toFixed(2)}/unidad
                </div>
              )}
            </div>
            
            {/* Rating mini */}
            {product.rating && (
              <div className="flex items-center gap-1">
                <div className="flex">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                </div>
                <span className="text-xs text-gray-600">{product.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          
          {/* Badges de beneficios */}
          <div className="flex flex-wrap gap-1 mb-2">
            {finalPrice > 20 ? (
              <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded flex items-center gap-0.5">
                <Truck className="h-2.5 w-2.5" />
                EnvÃƒÂ­o gratis
              </span>
            ) : (
              <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] rounded">
                EnvÃƒÂ­o $2.99
              </span>
            )}
            
            <span className="px-1.5 py-0.5 bg-purple-100 text-purple-800 text-[10px] rounded flex items-center gap-0.5">
              <Shield className="h-2.5 w-2.5" />
              GarantÃƒÂ­a
            </span>
          </div>
          
          {/* BotÃƒÂ³n de acciÃƒÂ³n principal */}
          <button
            onClick={handleAddToCart}
            disabled={!product.stock || product.stock <= 0}
            className="w-full py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-semibold rounded-lg hover:from-red-600 hover:to-orange-600 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.stock > 0 ? 'AÃƒÂ±adir al carrito' : 'Agotado'}
          </button>
          
          {/* Stock restante (si es bajo) */}
          {product.stock > 0 && product.stock <= 5 && (
            <div className="mt-1.5 text-center">
              <div className="text-[10px] text-red-600 font-medium">
                Ã¢Å¡Â Ã¯Â¸Â Solo {product.stock} disponibles
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL DETALLADO */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-gray-50 to-white">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-gray-800 truncate">{product.name}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-2xl font-bold text-red-600">
                    ${finalPrice.toFixed(2)}
                  </span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full">
                        -{product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  setImageZoom(false);
                }}
                className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            {/* Contenido */}
            <div className="p-6 overflow-y-auto max-h-[65vh]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Imagen */}
                <div className="space-y-4">
                  <div 
                    className="relative rounded-xl overflow-hidden bg-gray-50 border-2 border-gray-200 cursor-zoom-in"
                    onClick={() => setImageZoom(!imageZoom)}
                  >
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className={`w-full h-auto transition-transform duration-300 ${imageZoom ? 'scale-125' : 'scale-100'}`}
                    />
                    <div className="absolute bottom-4 right-4 p-2 bg-white/90 rounded-full shadow">
                      <ZoomIn className="h-5 w-5 text-gray-700" />
                    </div>
                  </div>
                  
                  {/* Botones de acciÃƒÂ³n */}
                  <div className="space-y-3">
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.stock || product.stock <= 0}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg disabled:opacity-50"
                    >
                      {product.stock > 0 ? 'Ã°Å¸â€ºâ€™ COMPRAR AHORA' : 'PRODUCTO AGOTADO'}
                    </button>
                    
                    <button
                      onClick={handleAddToCart}
                      className="w-full py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                    >
                      AÃƒÂ±adir al carrito
                    </button>
                  </div>
                </div>
                
                {/* Detalles */}
                <div className="space-y-6">
                  {/* DescripciÃƒÂ³n */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">DescripciÃƒÂ³n del producto</h3>
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                  </div>
                  
                  {/* CaracterÃƒÂ­sticas */}
                  {specifications.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Especificaciones tÃƒÂ©cnicas
                      </h3>
                      <ul className="space-y-2.5">
                        {specifications.map((spec, index) => (
                          <li key={index} className="flex items-start gap-3 p-2 bg-gray-50 rounded-lg">
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{spec.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Info de envÃƒÂ­o y garantÃƒÂ­a */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="h-5 w-5 text-green-600" />
                        <h4 className="font-bold text-green-800">EnvÃƒÂ­o</h4>
                      </div>
                      <p className="text-sm text-green-700">
                        {finalPrice > 20 ? 'Ã°Å¸Å¡Å¡ EnvÃƒÂ­o GRATIS' : 'Ã°Å¸Å¡Å¡ EnvÃƒÂ­o: $2.99'}
                        <br/>
                        <span className="text-xs">Entrega en 3-5 dÃƒÂ­as</span>
                      </p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <h4 className="font-bold text-blue-800">GarantÃƒÂ­a</h4>
                      </div>
                      <p className="text-sm text-blue-700">
                        Ã¢Å“â€¦ 30 dÃƒÂ­as devoluciÃƒÂ³n
                        <br/>
                        <span className="text-xs">GarantÃƒÂ­a de 1 aÃƒÂ±o</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="border-t p-4 bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Continuar comprando
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;

