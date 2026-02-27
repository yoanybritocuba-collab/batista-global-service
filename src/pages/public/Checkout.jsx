import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/cart/CartContext';
import { 
  ArrowLeft, CreditCard, Lock, CheckCircle, 
  Truck, MapPin, User, Phone, Mail, ShoppingBag 
} from 'lucide-react';

const Checkout = () => {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    setStep(3);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simular procesamiento de pago
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      clearCart();
    }, 2000);
  };

  if (cart.length === 0 && !completed) {
    navigate('/cart');
    return null;
  }

  if (completed) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">¡Compra exitosa!</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Tu pedido ha sido procesado correctamente. Recibirás un correo con los detalles.
        </p>
        <Link
          to="/tienda"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 transition-colors"
        >
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 lg:py-12 px-4">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/cart')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Finalizar compra</h1>
      </div>

      {/* Barra de progreso */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
            step >= 1 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            1
          </div>
          <div className={`w-20 h-1 ${step >= 2 ? 'bg-amber-500' : 'bg-gray-200'}`}></div>
        </div>
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
            step >= 2 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            2
          </div>
          <div className={`w-20 h-1 ${step >= 3 ? 'bg-amber-500' : 'bg-gray-200'}`}></div>
        </div>
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
            step >= 3 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            3
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Formulario izquierdo */}
        <div className="flex-1">
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-amber-500" />
                Información de contacto
              </h2>
              
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    placeholder="Juan Pérez"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    placeholder="juan@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    placeholder="+1 809 555 1234"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección de envío *
                  </label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    placeholder="Calle Principal #123"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      placeholder="Santo Domingo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Código postal *
                    </label>
                    <input
                      type="text"
                      name="codigoPostal"
                      value={formData.codigoPostal}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      placeholder="10101"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 mt-6"
                >
                  Continuar con el pago
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-500" />
                Método de pago
              </h2>
              
              <div className="space-y-4">
                {/* Visa */}
                <button
                  onClick={() => handlePaymentMethod('visa')}
                  className={`w-full flex items-center gap-4 p-4 border-2 rounded-xl transition-all ${
                    paymentMethod === 'visa' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" 
                    alt="Visa" 
                    className="w-12 h-12"
                  />
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-gray-900">Visa</h3>
                    <p className="text-sm text-gray-500">Paga con tu tarjeta Visa</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 ${
                    paymentMethod === 'visa' ? 'border-amber-500 bg-amber-500' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'visa' && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </button>

                {/* Mastercard */}
                <button
                  onClick={() => handlePaymentMethod('mastercard')}
                  className={`w-full flex items-center gap-4 p-4 border-2 rounded-xl transition-all ${
                    paymentMethod === 'mastercard' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" 
                    alt="Mastercard" 
                    className="w-12 h-12"
                  />
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-gray-900">Mastercard</h3>
                    <p className="text-sm text-gray-500">Paga con tu tarjeta Mastercard</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 ${
                    paymentMethod === 'mastercard' ? 'border-amber-500 bg-amber-500' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'mastercard' && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="w-full text-center text-sm text-gray-500 hover:text-gray-700 hover:underline mt-4"
                >
                  ← Volver a información de contacto
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-500" />
                Confirmar pago
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Resumen del pedido</h3>
                  <div className="space-y-2">
                    {cart.slice(0, 2).map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.name} x{item.quantity}</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    {cart.length > 2 && (
                      <p className="text-xs text-gray-500">+ {cart.length - 2} productos más</p>
                    )}
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-amber-600">${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex gap-2">
                    <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                      Tus datos están seguros. La transacción es 100% segura.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={processing}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {processing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Procesando pago...</span>
                    </div>
                  ) : (
                    `Pagar $${cartTotal.toFixed(2)}`
                  )}
                </button>

                <button
                  onClick={() => setStep(2)}
                  className="w-full text-center text-sm text-gray-500 hover:text-gray-700 hover:underline"
                >
                  ← Volver a método de pago
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Resumen lateral */}
        <div className="lg:w-96">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              Tu pedido
            </h2>
            
            <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <ShoppingBag className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                    <p className="text-sm font-bold text-amber-600">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Envío</span>
                <span className="text-green-600">Gratis</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-amber-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;