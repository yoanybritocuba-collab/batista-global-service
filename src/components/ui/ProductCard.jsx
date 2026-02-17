import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/cart/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ShoppingCart, Star, Heart } from 'lucide-react';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleClick = () => {
    navigate(`/producto/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('/')) return imageUrl;
    return `/images/${imageUrl}`;
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={handleClick}
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col md:flex-row"
      >
        <div className="md:w-48 h-48 bg-gray-100">
          <img
            src={getImageUrl(product.imageUrl)}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">{product.rating || '4.5'}</span>
            </div>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-green-600">${product.price}</span>
              {product.oldPrice && (
                <span className="ml-2 text-sm text-gray-400 line-through">${product.oldPrice}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              {t('add_to_cart')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
    >
      <div className="relative h-48 bg-gray-100">
        <img
          src={getImageUrl(product.imageUrl)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-amber-50 transition-colors"
        >
          <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
        </button>
        {product.isNew && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
            Nuevo
          </span>
        )}
        {product.discount > 0 && (
          <span className="absolute bottom-3 left-3 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
            -{product.discount}%
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm text-gray-600">{product.rating || '4.5'}</span>
          <span className="text-sm text-gray-400 ml-2">({product.reviews || 0})</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-green-600">${product.price}</span>
            {product.oldPrice && (
              <span className="ml-2 text-sm text-gray-400 line-through">${product.oldPrice}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-200 transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;