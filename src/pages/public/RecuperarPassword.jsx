import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { Mail, ArrowLeft, Send, CheckCircle } from 'lucide-react';

const RecuperarPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { resetPassword } = useClienteAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await resetPassword(email);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || 'Error al enviar el email');
      }
    } catch (err) {
      setError('Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
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

        {success ? (
          <>
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
              ¡Email enviado!
            </h1>
            
            <p className="text-gray-600 text-center mb-6">
              Hemos enviado un enlace de recuperación a <strong>{email}</strong>
            </p>
            
            <p className="text-sm text-gray-500 text-center mb-8">
              Revisa tu correo y haz clic en el enlace para restablecer tu contraseña.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => navigate('/cliente/login')}
                className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                Ir a iniciar sesión
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-10 w-10 text-amber-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
              Recuperar contraseña
            </h1>
            
            <p className="text-gray-600 text-center mb-8">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  'Enviando...'
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Enviar enlace de recuperación
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/cliente/login"
                className="text-sm text-gray-500 hover:text-amber-500 transition-colors"
              >
                ← Volver a iniciar sesión
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecuperarPassword;