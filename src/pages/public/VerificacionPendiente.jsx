import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { Mail, RefreshCw, ArrowLeft, AlertCircle } from 'lucide-react';

const VerificacionPendiente = () => {
  const navigate = useNavigate();
  const { resendVerificationEmail, user } = useClienteAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleResendEmail = async () => {
    setLoading(true);
    setMessage('');
    const result = await resendVerificationEmail();
    if (result.success) {
      setMessage('✅ Email reenviado. Revisa tu bandeja de entrada o SPAM.');
    } else {
      setMessage('❌ Error al reenviar. Intenta más tarde.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
        
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-500 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al inicio</span>
        </button>

        <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="h-10 w-10 text-amber-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          ¡Verifica tu email!
        </h1>
        
        <p className="text-gray-600 mb-4">
          Hemos enviado un enlace de verificación a:
        </p>
        
        <p className="text-lg font-semibold text-amber-600 mb-4 break-all">
          {user?.email || 'tu correo electrónico'}
        </p>
        
        <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-left">
              <strong>Importante:</strong> Revisa también tu carpeta de <strong>SPAM</strong> o <strong>Correo no deseado</strong>. 
              El email puede tardar unos minutos en llegar.
            </p>
          </div>
        </div>

        {message && (
          <div className={`p-3 rounded-lg mb-4 text-sm ${
            message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleResendEmail}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Enviando...' : 'Reenviar email'}
          </button>

          <button
            onClick={() => navigate('/cliente/login')}
            className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Ir a iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificacionPendiente;