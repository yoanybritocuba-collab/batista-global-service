import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { User, Lock, Phone, Loader2, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { verificarCodigo, obtenerDatosVerificados } from '../../services/email/codigoService';

const RegistroPaso2 = () => {
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [codigoValido, setCodigoValido] = useState(false);
  
  const { register } = useClienteAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  useEffect(() => {
    if (!email) {
      toast.error('No hay email pendiente de verificación');
      navigate('/registro');
    }
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    
    const newCodigo = [...codigo];
    newCodigo[index] = value.replace(/[^0-9]/g, '');
    setCodigo(newCodigo);
    
    // Auto-focus al siguiente input
    if (value && index < 5) {
      document.getElementById(`codigo-${index + 1}`)?.focus();
    }
    
    // Resetear verificación cuando cambia el código
    setCodigoValido(false);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !codigo[index] && index > 0) {
      document.getElementById(`codigo-${index - 1}`)?.focus();
    }
  };

  const verificarCodigoHandler = async () => {
    const codigoCompleto = codigo.join('');
    if (codigoCompleto.length !== 6) {
      setError('Ingresa el código completo de 6 dígitos');
      return false;
    }

    const resultado = verificarCodigo(email, codigoCompleto);
    
    if (resultado.valido) {
      setCodigoValido(true);
      setError('');
      toast.success('✅ Código verificado correctamente');
      return true;
    } else {
      setError(resultado.error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar código primero
    if (!codigoValido) {
      const valido = await verificarCodigoHandler();
      if (!valido) return;
    }

    // Validaciones básicas
    if (!password) {
      setError('Ingresa una contraseña');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!name) {
      setError('Ingresa tu nombre');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Crear usuario en Firebase
      const result = await register(email, password, {
        name,
        phone,
        emailVerified: true
      });

      if (result.success) {
        navigate('/cliente/login', { 
          state: { message: '✅ Cuenta creada exitosamente. Ya puedes iniciar sesión.' } 
        });
      } else {
        setError(result.error || 'Error al crear la cuenta');
      }
    } catch (err) {
      setError('Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        
        <button
          onClick={() => navigate('/registro')}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-500 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver</span>
        </button>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {codigoValido ? 'Completa tu registro' : 'Verifica tu código'}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {codigoValido ? (
              'Ingresa tus datos para crear la cuenta'
            ) : (
              <>
                Ingresa el código de 6 dígitos enviado a:<br />
                <span className="font-semibold text-amber-600">{email}</span>
              </>
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* CÓDIGO DE VERIFICACIÓN */}
          <div className={codigoValido ? 'opacity-50 pointer-events-none' : ''}>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Código de verificación
            </label>
            <div className="flex justify-center gap-1 mb-3">
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
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                  autoFocus={index === 0}
                  disabled={loading || codigoValido}
                />
              ))}
            </div>
            
            {!codigoValido && (
              <button
                type="button"
                onClick={verificarCodigoHandler}
                disabled={loading || codigo.join('').length !== 6}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm mb-4"
              >
                Verificar código
              </button>
            )}
            
            {codigoValido && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">✅ Código verificado</span>
              </div>
            )}
          </div>

          {/* DATOS DEL USUARIO (se muestran solo después de verificar) */}
          {codigoValido && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    placeholder="Juan Pérez"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono (opcional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    placeholder="+1 234 567 890"
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
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
              </div>
            </>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {codigoValido && (
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Creando cuenta...</span>
                </>
              ) : (
                'Crear cuenta'
              )}
            </button>
          )}
        </form>

        {!codigoValido && (
          <p className="text-xs text-gray-400 text-center mt-4">
            ¿No recibiste el código?{' '}
            <button 
              onClick={() => navigate('/registro')}
              className="text-amber-600 hover:text-amber-700"
            >
              Solicitar nuevo código
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default RegistroPaso2;