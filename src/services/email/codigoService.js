// Servicio para generar códigos de verificación
// NOTA: En producción, esto usaría un servicio real de email

// Generar código aleatorio de 6 dígitos
export const generarCodigo = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Guardar código temporalmente en localStorage
export const guardarCodigo = (email, codigo) => {
  // Guardar con timestamp para expiración
  const data = {
    codigo,
    expira: Date.now() + 10 * 60 * 1000 // 10 minutos
  };
  
  // Guardar en localStorage (simulación - en producción iría a un backend)
  const codigos = JSON.parse(localStorage.getItem('codigos_verificacion') || '{}');
  codigos[email] = data;
  localStorage.setItem('codigos_verificacion', JSON.stringify(codigos));
  
  console.log(`📦 Código generado para ${email}: ${codigo}`);
  
  // SIMULACIÓN: Mostrar el código en consola para pruebas
  console.log(`🔑 CÓDIGO DE VERIFICACIÓN (simulado): ${codigo}`);
  
  return codigo;
};

// Verificar código
export const verificarCodigo = (email, codigoIngresado) => {
  const codigos = JSON.parse(localStorage.getItem('codigos_verificacion') || '{}');
  const data = codigos[email];
  
  if (!data) {
    return { valido: false, error: 'No hay código pendiente' };
  }
  
  if (Date.now() > data.expira) {
    delete codigos[email];
    localStorage.setItem('codigos_verificacion', JSON.stringify(codigos));
    return { valido: false, error: 'Código expirado' };
  }
  
  if (data.codigo !== codigoIngresado) {
    return { valido: false, error: 'Código incorrecto' };
  }
  
  // Código válido - limpiar
  delete codigos[email];
  localStorage.setItem('codigos_verificacion', JSON.stringify(codigos));
  
  return { valido: true };
};