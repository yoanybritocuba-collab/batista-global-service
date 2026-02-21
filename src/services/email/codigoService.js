// src/services/email/codigoService.js
// SERVICIO REAL DE EMAIL - Usa EmailJS o similar

import emailjs from '@emailjs/browser';

// Configuración de EmailJS (GRATIS - 200 emails/mes)
// 1. Ve a https://www.emailjs.com/
// 2. Regístrate gratis
// 3. Crea un servicio de email (Gmail, Outlook, etc.)
// 4. Crea una plantilla con variables: {{to_email}}, {{codigo}}, {{nombre}}
// 5. Copia tus credenciales

const EMAILJS_SERVICE_ID = 'service_xxxxxx'; // Reemplazar
const EMAILJS_TEMPLATE_ID = 'template_xxxxxx'; // Reemplazar
const EMAILJS_PUBLIC_KEY = 'xxxxxx'; // Reemplazar

// Inicializar EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Generar código aleatorio de 6 dígitos
export const generarCodigo = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Guardar código temporalmente (en memoria, no localStorage)
const codigosTemp = new Map(); // { email: { codigo, expira, datos } }

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
      reply_to: 'no-reply@batistaglobalservice.com',
      subject: 'Tu código de verificación - Batista Global Service'
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
  
  // Código válido - NO borramos todavía, solo marcamos como verificado
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