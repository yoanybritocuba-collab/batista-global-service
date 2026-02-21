import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/cart/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const { cart, cartTotal, cartCount, removeFromCart, updateQuantity, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Parece que aún no has agregado productos a tu carrito.
        </p>
        <Link
          to="/tienda"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#00A8B5] text-white font-medium rounded-lg hover:bg-[#00909B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 lg:py-12 px-4">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <ShoppingBag className="w-6 h-6 lg:w-8 lg:h-8" />
        Carrito de Compras ({cartCount} {cartCount === 1 ? 'producto' : 'productos'})
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Lista de productos */}
        <div className="flex-1 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Imagen */}
              <div className="w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Información */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                  {item.category || 'Sin categoría'}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-lg lg:text-xl font-bold text-[#00A8B5]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">
                    ${item.price} c/u
                  </span>
                </div>
              </div>

              {/* Controles de cantidad */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="w-10 text-center font-medium text-gray-900">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 ml-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Eliminar producto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Botón vaciar carrito */}
          <div className="flex justify-end pt-4">
            <button
              onClick={clearCart}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Vaciar carrito
            </button>
          </div>
        </div>

        {/* Resumen de compra */}
        <div className="lg:w-80 xl:w-96">
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 sticky top-24">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">
              Resumen de compra
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartCount} productos)</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className="text-green-600">Gratis</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-[#00A8B5]">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-gradient-to-r from-[#00A8B5] to-[#00909B] text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 mb-3"
            >
              Proceder al pago
            </button>
            <Link
              to="/tienda"
              className="block text-center text-sm text-gray-500 hover:text-gray-700 hover:underline"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
