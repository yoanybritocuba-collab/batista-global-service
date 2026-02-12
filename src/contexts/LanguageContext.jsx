import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  // Cargar idioma desde localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('batistaLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Guardar idioma en localStorage
  useEffect(() => {
    localStorage.setItem('batistaLanguage', language);
  }, [language]);

  // 📚 DICCIONARIO COMPLETO - FÁCIL DE EXPANDIR
  const translations = {
    es: {
      // 🌐 Generales
      'cargando': 'Cargando...',
      'error': 'Error',
      'guardar': 'Guardar',
      'cancelar': 'Cancelar',
      'eliminar': 'Eliminar',
      'editar': 'Editar',
      'ver': 'Ver',
      'volver': 'Volver',
      'cerrar': 'Cerrar',
      'buscar': 'Buscar',
      'filtros': 'Filtros',
      'limpiar': 'Limpiar',
      'aplicar': 'Aplicar',
      'cargando_productos': 'Cargando productos...',
      'error_cargar_productos': 'Error al cargar productos',

      // 🏠 Header/Navegación
      'inicio': 'Inicio',
      'servicios': 'Servicios',
      'tienda': 'Tienda',
      'productos': 'Productos',
      'panel_admin': 'Panel Admin',
      'carrito': 'Carrito',
      'buscar_productos': 'Buscar productos...',
      'idioma': 'Idioma',
      'español': 'Español',
      'ingles': 'Inglés',

      // 🎯 Hero/Banner
      'titulo_hero': 'Batista Global Service',
      'subtitulo_hero': 'Productos y servicios turísticos premium en el Caribe',
      'explorar_tienda': 'Explorar Tienda',
      'nuestros_servicios': 'Nuestros Servicios',

      // 🛍️ Tienda
      'nuestra_tienda': 'Nuestra Tienda',
      'descripcion_tienda': 'Descubre nuestra selección de productos y servicios turísticos premium',
      'todas_categorias': 'Todas las categorías',
      'producto_encontrado': 'producto encontrado',
      'productos_encontrados': 'productos encontrados',
      'limpiar_filtros': 'Limpiar filtros',
      'no_productos': 'No se encontraron productos',
      'intentar_otros_filtros': 'Intenta con otros términos de búsqueda o categorías',
      'ver_todos': 'Ver todos los productos',
      'nuevo': 'Nuevo',
      'ver_detalles': 'Ver detalles',
      'caracteristicas': 'Características',
      'general': 'General',
      'en_stock': 'En stock',
      'ultimas_unidades': '¡Últimas {count} unidades!',
      'agotado': 'Agotado',
      'agregar': 'Agregar',
      'agregar_carrito': 'Agregar al carrito',
      'seguir_comprando': 'Seguir comprando',
      'descripcion': 'Descripción',
      'especificaciones': 'Especificaciones técnicas',
      'categoria': 'Categoría',
      'disponibilidad': 'Disponibilidad',

      // 🛒 Carrito
      'carrito_vacio': 'Tu carrito está vacío',
      'carrito_vacio_desc': 'Parece que aún no has agregado productos a tu carrito.',
      'ir_tienda': 'Ir a la tienda',
      'carrito_compras': 'Carrito de Compras',
      'producto': 'producto',
      'productos_carrito': 'productos',
      'sin_categoria': 'Sin categoría',
      'cada_uno': 'c/u',
      'disminuir_cantidad': 'Disminuir cantidad',
      'aumentar_cantidad': 'Aumentar cantidad',
      'vaciar_carrito': 'Vaciar carrito',
      'resumen_compra': 'Resumen de compra',
      'subtotal': 'Subtotal',
      'envio': 'Envío',
      'gratis': 'Gratis',
      'total': 'Total',
      'proceder_pago': 'Proceder al pago',
      'seguir_comprando_carrito': 'Seguir comprando',
      'actualizado': '✓ {producto} - Cantidad actualizada',
      'agregado': '✓ {producto} agregado al carrito',
      'eliminado': '✗ {producto} eliminado del carrito',
      'carrito_vaciado': '🛒 Carrito vaciado',

      // 👤 Admin Panel
      'dashboard': 'Dashboard',
      'gestion_productos': 'Gestión de Productos',
      'gestion_catalogo': 'Gestión de catálogo',
      'ordenes': 'Órdenes',
      'pedidos_ventas': 'Pedidos y ventas',
      'analiticas': 'Analíticas',
      'metricas_reportes': 'Métricas y reportes',
      'clientes': 'Clientes',
      'gestion_usuarios': 'Gestión de usuarios',
      'categorias_admin': 'Categorías',
      'organizar_productos': 'Organizar productos',
      'marketing': 'Marketing',
      'cupones_promociones': 'Cupones y promociones',
      'configuracion': 'Configuración',
      'ajustes_sistema': 'Ajustes del sistema',
      'ver_tienda': 'Ver Tienda',
      'cerrar_sesion': 'Cerrar Sesión',
      'perfil': 'Mi perfil',
      'en_linea': 'En línea',
      'super_admin': 'Super Admin',

      // 📝 Productos Admin
      'nuevo_producto': 'Nuevo Producto',
      'editar_producto': 'Editar Producto',
      'nombre_producto': 'Nombre del Producto',
      'precio': 'Precio',
      'stock': 'Stock',
      'descripcion_producto': 'Descripción',
      'especificaciones_tecnicas': 'Especificaciones Técnicas',
      'imagenes_producto': 'Imágenes del Producto',
      'subir_imagenes': 'Subir imágenes',
      'arrastrar_imagenes': 'Arrastra y suelta tus imágenes',
      'seleccionar_archivos': 'o haz clic para seleccionar archivos',
      'formatos_imagen': 'JPG, PNG, GIF, WebP',
      'max_5mb': 'Máx 5MB',
      'imagen_principal': 'Principal',
      'producto_destacado': 'Producto Destacado',
      'marcar_nuevo': 'Marcar como Nuevo',
      'activo': 'Activo',
      'inactivo': 'Inactivo',
      'borrador': 'Borrador',
      'crear_producto': 'Crear Producto',
      'actualizar_producto': 'Actualizar Producto',
      'guardando': 'Guardando...',

      // 📱 Footer
      'sobre_nosotros': 'Sobre Nosotros',
      'sobre_nosotros_texto': 'Somos una empresa líder en servicios turísticos y de paquetería en el Caribe. Excelencia y confianza desde 2024.',
      'contacto': 'Contacto',
      'telefono': 'Teléfono',
      'correo': 'Correo',
      'ubicacion': 'Oficina',
      'horarios': 'Horarios',
      'atencion_cliente': 'Atención al cliente',
      'lun_vie': 'Lun - Vie',
      'sabado': 'Sábado',
      'domingo': 'Domingo',
      'redes_sociales': 'Redes Sociales',
      'facebook': 'Facebook',
      'instagram': 'Instagram',
      'tiktok': 'TikTok',
      'whatsapp': 'WhatsApp',
      'terminos': 'Términos',
      'privacidad': 'Privacidad',
      'cookies': 'Cookies',
      'derechos': 'Todos los derechos reservados',

      // 🏝️ Servicios Turísticos
      'servicios_turisticos': 'Servicios Turísticos',
      'descripcion_servicios': 'Ofrecemos soluciones completas para tus viajes y envíos en el Caribe',
      'paqueteria_express': 'Paquetería Express',
      'paquetes_turisticos': 'Paquetes Turísticos',
      'renta_autos': 'Renta de Autos',
      'reservas_hoteles': 'Reservas de Hoteles',
      'reservas_vuelos': 'Reservas de Vuelos',
      'visas': 'Visas',
      'envios_internacionales': 'Envíos internacionales',
      'viajes_incluido': 'Viajes todo incluido',
      'vehiculos_lujo': 'Vehículos de lujo',
      'mejores_tarifas': 'Mejores tarifas',
      'aerolineas_internacionales': 'Aerolíneas internacionales',
      'tramite_profesional': 'Trámite profesional',

      // ✅ Login
      'acceso_sistema': 'Acceso al Sistema',
      'ingresar_contraseña': 'Ingresa la contraseña de administrador',
      'contraseña': 'Contraseña',
      'ingresar': 'Ingresar',
      'verificando': 'Verificando...',
      'contraseña_incorrecta': 'Contraseña incorrecta',
      'acceso_restringido': 'Acceso restringido',
      'contactar_admin': 'Si eres administrador y no recuerdas la contraseña, contacta al desarrollador.',
      'volver_inicio': 'Volver al inicio',

      // ⚠️ 404
      'pagina_no_encontrada': 'Página no encontrada',
      'error_404': '404',
    },
    en: {
      // 🌐 General
      'cargando': 'Loading...',
      'error': 'Error',
      'guardar': 'Save',
      'cancelar': 'Cancel',
      'eliminar': 'Delete',
      'editar': 'Edit',
      'ver': 'View',
      'volver': 'Back',
      'cerrar': 'Close',
      'buscar': 'Search',
      'filtros': 'Filters',
      'limpiar': 'Clear',
      'aplicar': 'Apply',
      'cargando_productos': 'Loading products...',
      'error_cargar_productos': 'Error loading products',

      // 🏠 Header/Navigation
      'inicio': 'Home',
      'servicios': 'Services',
      'tienda': 'Store',
      'productos': 'Products',
      'panel_admin': 'Admin Panel',
      'carrito': 'Cart',
      'buscar_productos': 'Search products...',
      'idioma': 'Language',
      'español': 'Spanish',
      'ingles': 'English',

      // 🎯 Hero/Banner
      'titulo_hero': 'Batista Global Service',
      'subtitulo_hero': 'Premium tourism products and services in the Caribbean',
      'explorar_tienda': 'Explore Store',
      'nuestros_servicios': 'Our Services',

      // 🛍️ Store
      'nuestra_tienda': 'Our Store',
      'descripcion_tienda': 'Discover our selection of premium tourism products and services',
      'todas_categorias': 'All categories',
      'producto_encontrado': 'product found',
      'productos_encontrados': 'products found',
      'limpiar_filtros': 'Clear filters',
      'no_productos': 'No products found',
      'intentar_otros_filtros': 'Try other search terms or categories',
      'ver_todos': 'View all products',
      'nuevo': 'New',
      'ver_detalles': 'View details',
      'caracteristicas': 'Features',
      'general': 'General',
      'en_stock': 'In stock',
      'ultimas_unidades': 'Last {count} units!',
      'agotado': 'Out of stock',
      'agregar': 'Add',
      'agregar_carrito': 'Add to cart',
      'seguir_comprando': 'Continue shopping',
      'descripcion': 'Description',
      'especificaciones': 'Technical specifications',
      'categoria': 'Category',
      'disponibilidad': 'Availability',

      // 🛒 Cart
      'carrito_vacio': 'Your cart is empty',
      'carrito_vacio_desc': 'It seems you haven\'t added any products to your cart yet.',
      'ir_tienda': 'Go to store',
      'carrito_compras': 'Shopping Cart',
      'producto': 'product',
      'productos_carrito': 'products',
      'sin_categoria': 'Uncategorized',
      'cada_uno': 'each',
      'disminuir_cantidad': 'Decrease quantity',
      'aumentar_cantidad': 'Increase quantity',
      'vaciar_carrito': 'Empty cart',
      'resumen_compra': 'Order summary',
      'subtotal': 'Subtotal',
      'envio': 'Shipping',
      'gratis': 'Free',
      'total': 'Total',
      'proceder_pago': 'Checkout',
      'seguir_comprando_carrito': 'Continue shopping',
      'actualizado': '✓ {product} - Quantity updated',
      'agregado': '✓ {product} added to cart',
      'eliminado': '✗ {product} removed from cart',
      'carrito_vaciado': '🛒 Cart emptied',

      // 👤 Admin Panel
      'dashboard': 'Dashboard',
      'gestion_productos': 'Product Management',
      'gestion_catalogo': 'Catalog management',
      'ordenes': 'Orders',
      'pedidos_ventas': 'Orders and sales',
      'analiticas': 'Analytics',
      'metricas_reportes': 'Metrics and reports',
      'clientes': 'Customers',
      'gestion_usuarios': 'User management',
      'categorias_admin': 'Categories',
      'organizar_productos': 'Organize products',
      'marketing': 'Marketing',
      'cupones_promociones': 'Coupons and promotions',
      'configuracion': 'Settings',
      'ajustes_sistema': 'System settings',
      'ver_tienda': 'View Store',
      'cerrar_sesion': 'Logout',
      'perfil': 'My profile',
      'en_linea': 'Online',
      'super_admin': 'Super Admin',

      // 📝 Products Admin
      'nuevo_producto': 'New Product',
      'editar_producto': 'Edit Product',
      'nombre_producto': 'Product Name',
      'precio': 'Price',
      'stock': 'Stock',
      'descripcion_producto': 'Description',
      'especificaciones_tecnicas': 'Technical Specifications',
      'imagenes_producto': 'Product Images',
      'subir_imagenes': 'Upload images',
      'arrastrar_imagenes': 'Drag and drop your images',
      'seleccionar_archivos': 'or click to select files',
      'formatos_imagen': 'JPG, PNG, GIF, WebP',
      'max_5mb': 'Max 5MB',
      'imagen_principal': 'Main',
      'producto_destacado': 'Featured Product',
      'marcar_nuevo': 'Mark as New',
      'activo': 'Active',
      'inactivo': 'Inactive',
      'borrador': 'Draft',
      'crear_producto': 'Create Product',
      'actualizar_producto': 'Update Product',
      'guardando': 'Saving...',

      // 📱 Footer
      'sobre_nosotros': 'About Us',
      'sobre_nosotros_texto': 'We are a leading company in tourism and shipping services in the Caribbean. Excellence and trust since 2024.',
      'contacto': 'Contact',
      'telefono': 'Phone',
      'correo': 'Email',
      'ubicacion': 'Office',
      'horarios': 'Hours',
      'atencion_cliente': 'Customer service',
      'lun_vie': 'Mon - Fri',
      'sabado': 'Saturday',
      'domingo': 'Sunday',
      'redes_sociales': 'Social Media',
      'facebook': 'Facebook',
      'instagram': 'Instagram',
      'tiktok': 'TikTok',
      'whatsapp': 'WhatsApp',
      'terminos': 'Terms',
      'privacidad': 'Privacy',
      'cookies': 'Cookies',
      'derechos': 'All rights reserved',

      // 🏝️ Tourism Services
      'servicios_turisticos': 'Tourism Services',
      'descripcion_servicios': 'We offer complete solutions for your trips and shipments in the Caribbean',
      'paqueteria_express': 'Express Shipping',
      'paquetes_turisticos': 'Tour Packages',
      'renta_autos': 'Car Rental',
      'reservas_hoteles': 'Hotel Reservations',
      'reservas_vuelos': 'Flight Reservations',
      'visas': 'Visas',
      'envios_internacionales': 'International shipping',
      'viajes_incluido': 'All-inclusive trips',
      'vehiculos_lujo': 'Luxury vehicles',
      'mejores_tarifas': 'Best rates',
      'aerolineas_internacionales': 'International airlines',
      'tramite_profesional': 'Professional processing',

      // ✅ Login
      'acceso_sistema': 'System Access',
      'ingresar_contraseña': 'Enter administrator password',
      'contraseña': 'Password',
      'ingresar': 'Login',
      'verificando': 'Verifying...',
      'contraseña_incorrecta': 'Incorrect password',
      'acceso_restringido': 'Restricted access',
      'contactar_admin': 'If you are an administrator and don\'t remember the password, contact the developer.',
      'volver_inicio': 'Back to home',

      // ⚠️ 404
      'pagina_no_encontrada': 'Page not found',
      'error_404': '404',
    }
  };

  const t = (key, params = {}) => {
    let translation = translations[language]?.[key] || key;
    
    // Reemplazar parámetros {count}, {product}, etc.
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param]);
    });
    
    return translation;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      toggleLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};