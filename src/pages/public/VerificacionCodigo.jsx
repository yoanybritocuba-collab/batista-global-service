import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const VerificacionCodigo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const message = location.state?.message || '';

  useEffect(() => {
    if (!email) {
      toast.error('No hay email pendiente de verificación');
      navigate('/cliente/login');
    }
    
    if (message) {
      toast.success(message);
    }
  }, [email, navigate, message]);

  const handleVerificado = () => {
    navigate('/cliente/login', { 
      state: { message: '✅ ¡Email verificado! Ya puedes iniciar sesión.' } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        
        <button
          onClick={() => navigate('/cliente/login')}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-500 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al login</span>
        </button>

        <div className="text-center mb-6">
          <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-10 w-10 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            ¡Revisa tu correo!
          </h1>
          <p className="text-gray-600">
            Hemos enviado un enlace de verificación a:
          </p>
          <p className="text-lg font-semibold text-amber-600 mt-1 break-all">
            {email}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-2">Pasos para activar tu cuenta:</p>
              <ol className="list-decimal ml-4 space-y-1">
                <li>Abre tu bandeja de entrada de <strong>{email}</strong></li>
                <li>Busca el email de <strong>Batista Global Service</strong></li>
                <li>Haz clic en el enlace de verificación</li>
                <li>¡Listo! Vuelve aquí e inicia sesión</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div className="text-sm text-green-800">
              <p className="font-medium">¿Ya verificaste?</p>
              <p className="mt-1">Haz clic en el botón de abajo cuando hayas confirmado tu email.</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleVerificado}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
        >
          Ya verifiqué mi email
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          ¿No recibiste el email? Revisa tu carpeta de spam
        </p>
      </div>
    </div>
  );
};

export default VerificacionCodigo;
