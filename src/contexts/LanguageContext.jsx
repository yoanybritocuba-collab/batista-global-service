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
  const [translations, setTranslations] = useState({});

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

  // Traducciones
  const t = (key) => {
    const dict = {
      es: {
        // Header
        'inicio': 'Inicio',
        'servicios': 'Servicios',
        'tienda': 'Tienda',
        'productos': 'Productos',
        'panelAdmin': 'Panel Admin',
        'carrito': 'Carrito',
        'buscar': 'Buscar productos...',
        
        // Hero
        'titulo': 'Batista Global Service',
        'subtitulo': 'Productos y servicios turísticos premium en el Caribe',
        'explorar': 'Explorar Tienda',
        'nuestrosServicios': 'Nuestros Servicios',
        
        // Servicios
        'serviciosTuristicos': 'Servicios Turísticos',
        'descripcionServicios': 'Ofrecemos soluciones completas para tus viajes y envíos en el Caribe',
        'paqueteria': 'Paquetería Express',
        'paquetes': 'Paquetes Turísticos',
        'autos': 'Renta de Autos',
        'hoteles': 'Reservas de Hoteles',
        'vuelos': 'Reservas de Vuelos',
        'visas': 'Visas',
        
        // Footer
        'sobreNosotros': 'Sobre Nosotros',
        'contacto': 'Contacto',
        'horarios': 'Horarios',
        'redes': 'Redes Sociales',
        'telefono': 'Teléfono',
        'correo': 'Correo',
        'ubicacion': 'Oficina',
        'atencion': 'Atención al cliente',
        'derechos': 'Todos los derechos reservados',
      },
      en: {
        // Header
        'inicio': 'Home',
        'servicios': 'Services',
        'tienda': 'Store',
        'productos': 'Products',
        'panelAdmin': 'Admin Panel',
        'carrito': 'Cart',
        'buscar': 'Search products...',
        
        // Hero
        'titulo': 'Batista Global Service',
        'subtitulo': 'Premium tourism products and services in the Caribbean',
        'explorar': 'Explore Store',
        'nuestrosServicios': 'Our Services',
        
        // Servicios
        'serviciosTuristicos': 'Tourism Services',
        'descripcionServicios': 'We offer complete solutions for your trips and shipments in the Caribbean',
        'paqueteria': 'Express Shipping',
        'paquetes': 'Tour Packages',
        'autos': 'Car Rental',
        'hoteles': 'Hotel Reservations',
        'vuelos': 'Flight Reservations',
        'visas': 'Visas',
        
        // Footer
        'sobreNosotros': 'About Us',
        'contacto': 'Contact',
        'horarios': 'Hours',
        'redes': 'Social Media',
        'telefono': 'Phone',
        'correo': 'Email',
        'ubicacion': 'Office',
        'atencion': 'Customer Service',
        'derechos': 'All rights reserved',
      }
    };

    return dict[language]?.[key] || key;
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