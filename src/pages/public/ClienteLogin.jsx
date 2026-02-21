import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';

const ClienteLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register, login } = useClienteAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const result = await login(email, password);
        if (result.success) {
          navigate('/tienda');
        }
      } else {
        const result = await register(email, password, { name, phone });
        if (result.necesitaVerificacion) {
          navigate('/verificacion-codigo', { 
            state: { 
              email, 
              userData: { name, phone } 
            } 
          });
        }
      }
    } catch (err) {
      setError('Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">
        
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-gray-600 hover:text-amber-500 mb-4 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver</span>
        </button>

        <h1 className="text-xl font-bold text-gray-800 text-center mb-2">
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm"
                  placeholder="Nombre completo"
                  required
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm"
                  placeholder="Teléfono"
                />
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm"
              placeholder="Email"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm"
              placeholder="Contraseña"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-2 rounded-lg text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-white py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors text-sm disabled:opacity-50"
          >
            {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarme')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-amber-500 hover:text-amber-600 text-sm"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClienteLogin;
