import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { Mail, RefreshCw, ArrowLeft } from 'lucide-react';

const VerificacionPendiente = () => {
  const navigate = useNavigate();
  const { resendVerificationEmail, user } = useClienteAuth();

  const handleResendEmail = async () => {
    await resendVerificationEmail();
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
        
        <p className="text-gray-600 mb-6">
          Hemos enviado un enlace de verificación a:
        </p>
        
        <p className="text-lg font-semibold text-amber-600 mb-4 break-all">
          {user?.email || 'tu correo electrónico'}
        </p>
        
        <p className="text-sm text-gray-500 mb-8">
          Haz clic en el enlace del correo para activar tu cuenta. Luego podrás iniciar sesión.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleResendEmail}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            Reenviar email
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