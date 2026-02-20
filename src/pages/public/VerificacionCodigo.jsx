import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';

const VerificacionCodigo = () => {
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [tiempoRestante, setTiempoRestante] = useState(600); // 10 minutos en segundos
  
  const { verificarCodigoRegistro } = useClienteAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Obtener email de la navegación
    const emailFromState = location.state?.email;
    if (emailFromState) {
      setEmail(emailFromState);
    } else {
      // Si no hay email, redirigir al login
      toast.error('No se encontró el email para verificar');
      navigate('/cliente/login');
    }
  }, [location, navigate]);

  useEffect(() => {
    // Timer de expiración
    const timer = setInterval(() => {
      setTiempoRestante(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) return; // Solo un dígito
    
    const newCodigo = [...codigo];
    newCodigo[index] = value.replace(/[^0-9]/g, ''); // Solo números
    
    setCodigo(newCodigo);
    
    // Auto-avanzar al siguiente campo
    if (value && index < 5) {
      const nextInput = document.getElementById(`codigo-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Retroceder con backspace
    if (e.key === 'Backspace' && !codigo[index] && index > 0) {
      const prevInput = document.getElementById(`codigo-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const codigoCompleto = codigo.join('');
    if (codigoCompleto.length !== 6) {
      setError('Ingresa el código completo de 6 dígitos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simular verificación (en producción usarías verificarCodigoRegistro)
      // const result = await verificarCodigoRegistro(email, codigoCompleto);
      
      // Simulación de éxito
      if (codigoCompleto === '123456') { // Código de prueba
        toast.success('✅ Código verificado correctamente');
        navigate('/cliente/login', { 
          state: { message: '✅ Cuenta verificada. Ya puedes iniciar sesión.' } 
        });
      } else {
        setError('Código incorrecto');
        setCodigo(['', '', '', '', '', '']);
        document.getElementById('codigo-0')?.focus();
      }
    } catch (err) {
      setError('Error al verificar el código');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    // Simular reenvío
    setTimeout(() => {
      setTiempoRestante(600);
      setCodigo(['', '', '', '', '', '']);
      setLoading(false);
      toast.success('✅ Nuevo código enviado a tu correo');
    }, 1500);
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

        <div className="text-center mb-8">
          <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-10 w-10 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Verifica tu correo
          </h1>
          <p className="text-gray-600">
            Hemos enviado un código de 6 dígitos a:
          </p>
          <p className="text-lg font-semibold text-amber-600 mt-2 break-all">
            {email}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-left">
              <p>Ingresa el código de 6 dígitos que enviamos a tu correo.</p>
              <p className="font-medium mt-1">Tiempo restante: {formatTime(tiempoRestante)}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              Código de verificación
            </label>
            <div className="flex justify-center gap-2">
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
                  disabled={loading}
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || tiempoRestante === 0}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              'Verificando...'
            ) : (
              <>
                <CheckCircle className="h-5 w-5" />
                Verificar código
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            ¿No recibiste el código?
          </p>
          <button
            onClick={handleResend}
            disabled={loading}
            className="text-amber-500 hover:text-amber-600 font-medium flex items-center justify-center gap-1 mx-auto"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Reenviar código
          </button>
        </div>

        <div className="mt-6 text-center border-t pt-6">
          <p className="text-xs text-gray-500">
            El código expira en 10 minutos por seguridad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificacionCodigo;