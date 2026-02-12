// CONSTANTES DE LA APLICACIÓN

export const APP_CONFIG = {
  APP_NAME: 'Caribe Express',
  APP_VERSION: '1.0.0',
  COMPANY_NAME: 'Caribe Express Services',
  SUPPORT_EMAIL: 'support@caribeexpress.com',
  SUPPORT_PHONE: '+1 (809) 555-1234',
};

export const FIREBASE_CONFIG = {
  COLLECTIONS: {
    USERS: 'users',
    PRODUCTS: 'products',
    SERVICES: 'services',
    ORDERS: 'orders',
    CATEGORIES: 'categories',
    REVIEWS: 'reviews',
    COUPONS: 'coupons',
  }
};

export const ECOMMERCE_CONFIG = {
  CURRENCY: 'USD',
  CURRENCY_SYMBOL: '$',
  TAX_RATE: 0.18, // 18% ITBIS
  SHIPPING_COST: 5.99,
  FREE_SHIPPING_MIN: 50,
};

export const SERVICES_CONFIG = {
  TYPES: {
    PAQUETERIA: 'paqueteria',
    TURISMO: 'turismo',
    AUTOS: 'autos',
    HOTELES: 'hoteles',
    VUELOS: 'vuelos',
    VISAS: 'visas',
  },
  STATUS: {
    PENDING: 'pendiente',
    CONFIRMED: 'confirmado',
    IN_PROGRESS: 'en_progreso',
    COMPLETED: 'completado',
    CANCELLED: 'cancelado',
  }
};

export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    TIENDA: '/tienda',
    SERVICIOS: '/servicios',
    CART: '/cart',
    CONTACT: '/contact',
  },
  ADMIN: {
    DASHBOARD: '/admin',
    PRODUCTS: '/admin/products',
    SERVICES: '/admin/services',
    ORDERS: '/admin/orders',
    ANALYTICS: '/admin/analytics',
    USERS: '/admin/users',
  },
  AUTH: {
    LOGIN: '/admin/login',
    LOGOUT: '/logout',
  }
};
