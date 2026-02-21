// src/services/email/codigoService.js
import emailjs from '@emailjs/browser';

// ✅ TUS CREDENCIALES REALES
const EMAILJS_SERVICE_ID = 'service_a8mly7e';
const EMAILJS_TEMPLATE_ID = 'template_mt2syvx';
const EMAILJS_PUBLIC_KEY = 'SObq46i_K8W1ZK1Lk';

// Inicializar EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Generar código aleatorio de 6 dígitos
export const generarCodigo = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Guardar código temporalmente (en memoria)
const codigosTemp = new Map();

export const guardarCodigo = (email, codigo, datosParciales = {}) => {
  codigosTemp.set(email, {
    codigo,
    expira: Date.now() + 10 * 60 * 1000, // 10 minutos
    intentos: 0,
    datos: datosParciales
  });
  
  console.log(`📦 Código guardado para ${email}: ${codigo}`);
  return true;
};

// ENVIAR EMAIL REAL con el código
export const enviarCodigoEmail = async (email, codigo, nombre = 'Usuario') => {
  try {
    const templateParams = {
      to_email: email,
      to_name: nombre,
      codigo: codigo,
      from_name: 'Batista Global Service',
      reply_to: 'no-reply@batistaglobalservice.com'
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('✅ Email enviado:', response.status, response.text);
    return { success: true };
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    return { success: false, error: error.message };
  }
};

// Verificar código
export const verificarCodigo = (email, codigoIngresado) => {
  const data = codigosTemp.get(email);
  
  if (!data) {
    return { valido: false, error: '❌ No hay código pendiente. Solicita uno nuevo.' };
  }
  
  if (Date.now() > data.expira) {
    codigosTemp.delete(email);
    return { valido: false, error: '❌ Código expirado. Solicita uno nuevo.' };
  }
  
  if (data.intentos >= 3) {
    codigosTemp.delete(email);
    return { valido: false, error: '❌ Demasiados intentos. Solicita un nuevo código.' };
  }
  
  data.intentos++;
  
  if (data.codigo !== codigoIngresado) {
    return { valido: false, error: `❌ Código incorrecto. Intentos restantes: ${3 - data.intentos}` };
  }
  
  // Código válido
  data.verificado = true;
  return { valido: true, datos: data.datos };
};

// Obtener datos guardados (después de verificar)
export const obtenerDatosVerificados = (email) => {
  const data = codigosTemp.get(email);
  if (data && data.verificado) {
    return data.datos;
  }
  return null;
};

// Limpiar después de crear usuario
export const limpiarCodigo = (email) => {
  codigosTemp.delete(email);
};