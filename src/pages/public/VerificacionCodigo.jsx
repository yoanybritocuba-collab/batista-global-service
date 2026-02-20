import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, RefreshCw, Lock, User, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';

const VerificacionCodigo = () => {
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(600);
  
  const { verificarYCompletarRegistro, emailPendiente } = useClienteAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || emailPendiente || '';

  useEffect(() => {
    if (!email) {
      toast.error('No hay email pendiente de verificación');
      navigate('/cliente/login');
    }
  }, [email, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTiempoRestante(prev => prev <= 1 ? 0 : prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    
    const newCodigo = [...codigo];
    newCodigo[index] = value.replace(/[^0-9]/g, '');
    setCodigo(newCodigo);
    
    if (value && index < 5) {
      document.getElementById(`codigo-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !codigo[index] && index > 0) {
      document.getElementById(`codigo-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const codigoCompleto = codigo.join('');
    if (codigoCompleto.length !== 6) {
      setError('Ingresa el código completo de 6 dígitos');
      return;
    }

    if (!password) {
      setError('Ingresa una contraseña');
      return;
    }

    if (!name) {
      setError('Ingresa tu nombre');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Obtener datos del registro desde location.state
      const userData = location.state?.userData || {
        name,
        phone
      };

      const result = await verificarYCompletarRegistro(
        email,
        password,
        codigoCompleto,
        userData
      );

      if (result.success) {
        navigate('/cliente/login', { 
          state: { message: '✅ Cuenta verificada. Ya puedes iniciar sesión.' } 
        });
      } else {
        setError(result.error || 'Error al verificar');
      }
    } catch (err) {
      setError('Error al verificar el código');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        
        <button
          onClick={() => navigate('/cliente/login')}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-500 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al login</span>
        </button>

        <div className="text-center mb-6">
          <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
            <Mail className="h-8 w-8 text-amber-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">
            Verifica tu correo
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Hemos enviado un código a:
          </p>
          <p className="text-sm font-semibold text-amber-600 break-all">
            {email}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-lg mb-4 text-sm">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <div>
              <p>Ingresa el código de 6 dígitos para activar tu cuenta.</p>
              <p className="font-medium mt-1">Tiempo restante: {formatTime(tiempoRestante)}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campos del formulario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm"
                placeholder="Tu nombre"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono (opcional)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm"
                placeholder="+1 234 567 890"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Código de verificación
            </label>
            <div className="flex justify-center gap-1">
              {codigo.map((digito, index) => (
                <input
                  key={index}
                  id={`codigo-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digito}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 h-10 text-center text-lg font-bold border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                  autoFocus={index === 0}
                  disabled={loading}
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-2 rounded-lg text-xs text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || tiempoRestante === 0}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 disabled:opacity-50 text-sm"
          >
            {loading ? 'Verificando...' : 'Activar cuenta'}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          El código expira en 10 minutos
        </p>
      </div>
    </div>
  );
};

export default VerificacionCodigo;