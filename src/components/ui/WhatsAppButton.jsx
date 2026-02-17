import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Número de WhatsApp
  const phoneNumber = '17866583567';
  const message = 'Hola%20Batista%20Global%20Service%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios.%20%F0%9F%8C%9F';

  useEffect(() => {
    // Mostrar tooltip por 5 segundos
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Detectar cambios de ruta
  useEffect(() => {
    const checkPath = () => {
      const path = window.location.pathname;
      // Ocultar en tienda y categorías
      if (path === '/tienda' || path.startsWith('/categoria/')) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    checkPath();

    const handleRouteChange = () => {
      checkPath();
    };

    window.addEventListener('popstate', handleRouteChange);
    
    const observer = new MutationObserver(() => {
      checkPath();
    });
    
    observer.observe(document.querySelector('main') || document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      observer.disconnect();
    };
  }, []);

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setIsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Tooltip de bienvenida */}
      {showTooltip && (
        <div className="mb-3 relative animate-fade-in-up">
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-3 rounded-2xl shadow-2xl">
            <p className="text-sm font-medium flex items-center gap-2">
              <span className="text-xl">👋</span>
              ¿Necesitas ayuda? ¡Chatea con nosotros!
            </p>
            <div className="absolute -bottom-1 right-6 w-3 h-3 bg-green-500 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* Botón principal con efectos */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group outline-none"
        aria-label="Chatear por WhatsApp"
      >
        {/* Círculos de pulso múltiples */}
        <span className="absolute inset-0 rounded-full bg-green-400/30 animate-ping-slow"></span>
        <span className="absolute inset-0 rounded-full bg-green-400/20 animate-ping-slower"></span>
        <span className="absolute inset-0 rounded-full bg-green-400/10 animate-ping-slowest"></span>
        
        {/* Botón principal con gradiente y animación */}
        <div className={`
          relative w-16 h-16 lg:w-20 lg:h-20
          bg-gradient-to-br from-green-400 via-green-500 to-green-600
          rounded-full
          flex items-center justify-center
          shadow-2xl
          transition-all duration-500 ease-out
          ${isHovered ? 'scale-110 rotate-6 shadow-[0_0_40px_rgba(74,222,128,0.7)]' : 'scale-100 rotate-0'}
          hover:shadow-[0_0_50px_rgba(74,222,128,0.8)]
          cursor-pointer
          animate-float
        `}>
          {/* Icono de WhatsApp */}
          <MessageCircle 
            className={`
              w-8 h-8 lg:w-10 lg:h-10 text-white
              transition-all duration-500
              ${isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
            `} 
            strokeWidth={2}
          />
          
          {/* Mini indicador "Online" */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 border-4 border-white rounded-full animate-pulse shadow-lg"></span>
        </div>
      </button>

      {/* Mensaje flotante al hover */}
      {isHovered && (
        <div className="absolute bottom-20 right-0 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-xl whitespace-nowrap animate-fade-in">
          <p className="text-sm font-semibold flex items-center gap-2">
            <span className="text-green-500">●</span>
            Chatea con nosotros
          </p>
          <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white transform rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppButton;