import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ClienteLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { login, register } = useClienteAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isLogin) {
      // Validar registro
      if (formData.password !== formData.confirmPassword) {
        toast.error('Las contraseñas no coinciden');
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        toast.error('La contraseña debe tener al menos 6 caracteres');
        setLoading(false);
        return;
      }
    }

    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
    }

    if (result.success) {
      navigate('/cliente/perfil');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-amber-400/20">
        
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-6">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver al inicio
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Bienvenido' : 'Crear cuenta'}
          </h2>
          <p className="text-gray-400">
            {isLogin 
              ? 'Ingresa a tu cuenta de cliente' 
              : 'Regístrate para una mejor experiencia'}
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Tu nombre"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder={isLogin ? 'Tu contraseña' : 'Mínimo 6 caracteres'}
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Repite tu contraseña"
                />
              </div>
            </div>
          )}

          {isLogin && (
            <div className="flex items-center justify-end">
              <Link
                to="/cliente/recuperar"
                className="text-sm text-amber-400 hover:text-amber-300"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-all ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Procesando...' : (isLogin ? 'Iniciar sesión' : 'Registrarse')}
          </button>
        </form>

        {/* Cambiar modo */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-amber-400 hover:text-amber-300 font-medium"
            >
              {isLogin ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </div>

        {/* Comprar sin registrarse */}
        <div className="pt-4 text-center border-t border-white/10">
          <Link
            to="/tienda"
            className="text-sm text-gray-400 hover:text-amber-400"
          >
            ← Seguir comprando sin registrarme
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClienteLogin;