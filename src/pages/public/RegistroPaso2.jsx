import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { User, Lock, Phone, Loader2, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { verificarCodigo } from '../../services/email/codigoService';

const RegistroPaso2 = () => {
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificado, setVerificado] = useState(false);
  const [verificando, setVerificando] = useState(false);
  
  const { register, verificarCodigoExitoso, codigoVerificado } = useClienteAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      console.log('📧 Email recibido:', location.state.email);
    } else {
      toast.error('❌ No hay email pendiente de verificación');
      navigate('/registro');
    }
  }, [location.state, navigate]);

  // Sincronizar con el contexto
  useEffect(() => {
    if (verificado) {
      console.log('🔄 Sincronizando verificado con contexto');
      verificarCodigoExitoso(email);
    }
  }, [verificado, email, verificarCodigoExitoso]);

  // También sincronizar si el contexto ya está verificado
  useEffect(() => {
    if (codigoVerificado && !verificado) {
      console.log('🔄 Contexto ya verificado, actualizando local');
      setVerificado(true);
    }
  }, [codigoVerificado, verificado]);

  const verificarAutomatico = async (codigoCompleto) => {
    if (codigoCompleto.length !== 6 || verificando) return;
    
    setVerificando(true);
    
    try {
      console.log('🔍 Verificando código:', codigoCompleto);
      const resultado = verificarCodigo(email, codigoCompleto);
      console.log('📊 Resultado:', resultado);
      
      if (resultado.valido) {
        setVerificado(true);
        setError('');
        // No llamamos a verificarCodigoExitoso aquí, el useEffect lo hará
        toast.success('✅ Código correcto');
      } else {
        setVerificado(false);
        setError(resultado.error);
        toast.error(resultado.error);
      }
    } catch (err) {
      console.error('❌ Error:', err);
      setVerificado(false);
      setError('Error al verificar');
    } finally {
      setVerificando(false);
    }
  };

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    
    const newCodigo = [...codigo];
    newCodigo[index] = value.replace(/[^0-9]/g, '');
    setCodigo(newCodigo);
    
    if (value && index < 5) {
      document.getElementById(`codigo-${index + 1}`)?.focus();
    }
    
    if (index === 5 && value) {
      const codigoCompleto = [...newCodigo.slice(0, 5), value].join('');
      verificarAutomatico(codigoCompleto);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !codigo[index] && index > 0) {
      document.getElementById(`codigo-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!verificado) {
      setError('Primero verifica el código');
      return;
    }

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
      console.log('📝 Registrando usuario con código verificado');
      const result = await register(email, password, {
        name,
        phone
      });
      
      console.log('✅ Resultado registro:', result);

      if (result.success) {
        // ✅ REDIRIGIR A LA PÁGINA PRINCIPAL
        navigate('/', { 
          state: { message: '✅ Cuenta creada exitosamente. Ya puedes iniciar sesión.' } 
        });
        toast.success('✅ Cuenta creada. Bienvenido a Batista Global Service');
      } else {
        setError(result.error || 'Error al crear la cuenta');
      }
    } catch (err) {
      console.error('❌ Error:', err);
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
            {verificado ? '✅ Código verificado' : 'Ingresa el código'}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Código enviado a:
          </p>
          <p className="text-sm font-semibold text-amber-600 break-all">
            {email}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 text-center">
              Código de verificación
            </label>
            <div className="flex justify-center gap-2">
              {codigo.map((digito, index) => {
                let borderColor = 'border-gray-300';
                if (verificado) {
                  borderColor = 'border-green-500 bg-green-50';
                } else if (error && !verificado) {
                  borderColor = 'border-red-500 bg-red-50';
                }
                
                return (
                  <input
                    key={index}
                    id={`codigo-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digito}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-14 h-14 text-center text-2xl font-bold border-2 ${borderColor} rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300 transform hover:scale-105`}
                    autoFocus={index === 0}
                    disabled={loading || verificado}
                  />
                );
              })}
            </div>
            
            {verificado && (
              <div className="flex items-center justify-center gap-2 text-green-600 mt-2 animate-pulse">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Código correcto ✓</span>
              </div>
            )}
            
            {error && !verificado && (
              <div className="flex items-center justify-center gap-2 text-red-600 mt-2 animate-shake">
                <XCircle className="h-5 w-5" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}
          </div>

          {verificado && (
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 transform hover:scale-105"
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
            </>
          )}
        </form>

        {!verificado && (
          <p className="text-xs text-gray-400 text-center mt-4">
            ¿No recibiste el código?{' '}
            <button 
              onClick={() => navigate('/registro')}
              className="text-amber-600 hover:text-amber-700"
            >
              Reenviar código
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default RegistroPaso2;