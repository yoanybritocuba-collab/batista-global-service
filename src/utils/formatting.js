// FUNCIONES DE FORMATEO

/**
 * Formatea un precio con moneda
 */
export const formatPrice = (price, currency = 'USD') => {
  const formatter = new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  });
  return formatter.format(price);
};

/**
 * Formatea una fecha
 */
export const formatDate = (date, format = 'short') => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  
  if (format === 'short') {
    options.month = 'short';
  }
  
  return new Date(date).toLocaleDateString('es-ES', options);
};

/**
 * Recorta texto si es muy largo
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Formatea número de teléfono
 */
export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

/**
 * Calcula precio con impuestos
 */
export const calculateTotal = (subtotal, taxRate = 0.18, shipping = 0) => {
  const tax = subtotal * taxRate;
  return {
    subtotal: formatPrice(subtotal),
    tax: formatPrice(tax),
    shipping: formatPrice(shipping),
    total: formatPrice(subtotal + tax + shipping),
    rawTotal: subtotal + tax + shipping,
  };
};
