import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { generarCodigo, enviarCodigoEmail, guardarCodigo } from '../../services/email/codigoService';

const RegistroPaso1 = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generar código
      const codigo = generarCodigo();
      
      // Guardar código temporalmente
      guardarCodigo(email, codigo);
      
      // ENVIAR EMAIL REAL
      const resultado = await enviarCodigoEmail(email, codigo);
      
      if (resultado.success) {
        setEnviado(true);
        toast.success('✅ Código enviado a tu correo');
        
        // Redirigir al paso 2 después de 2 segundos
        setTimeout(() => {
          navigate('/registro/paso2', { 
            state: { email } 
          });
        }, 2000);
      } else {
        toast.error('❌ Error al enviar el código. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Batista Global Service
          </h1>
          <p className="text-gray-600 mt-2">Verifica tu correo electrónico</p>
        </div>

        {!enviado ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  Te enviaremos un código de 6 dígitos para verificar tu correo.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="tu@email.com"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Enviando código...</span>
                </>
              ) : (
                'Enviar código de verificación'
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              ¡Código enviado!
            </h2>
            <p className="text-gray-600 mb-4">
              Revisa tu correo <span className="font-semibold">{email}</span>
            </p>
            <p className="text-sm text-gray-500">
              Serás redirigido automáticamente...
            </p>
          </div>
        )}

        <p className="text-xs text-gray-400 text-center mt-4">
          El código expirará en 10 minutos
        </p>
      </div>
    </div>
  );
};

export default RegistroPaso1;