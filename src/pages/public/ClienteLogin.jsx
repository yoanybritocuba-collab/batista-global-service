import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { Mail, Lock, ArrowLeft, AlertCircle } from 'lucide-react';

const ClienteLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useClienteAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!validateEmail(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        navigate('/tienda');
      } else if (result.necesitaVerificacion) {
        navigate('/verificacion-codigo', { 
          state: { email, message: '⚠️ Debes verificar tu email antes de iniciar sesión' } 
        });
      } else {
        setError(result.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden">
        
        {/* Decoración */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-200 rounded-full -ml-16 -mb-16 opacity-20"></div>
        
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-500 mb-6 transition-colors relative z-10"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al inicio</span>
        </button>

        <div className="text-center mb-8 relative z-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Batista Global Service
          </h1>
          <p className="text-gray-600 mt-2">Inicia sesión en tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                placeholder="tu@email.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                placeholder="••••••••"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-500"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm flex items-start gap-2 animate-shake">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 transform hover:scale-105"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Iniciando sesión...</span>
              </div>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm relative z-10">
          <p className="text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
              Regístrate aquí
            </Link>
          </p>
          <Link to="/recuperar-password" className="text-gray-500 hover:text-amber-600 text-sm block mt-2 transition-colors">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClienteLogin;