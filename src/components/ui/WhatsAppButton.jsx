import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const phoneNumber = '17866583567';
  const message = 'Hola%20Batista%20Global%20Service%2C%20necesito%20informaci%C3%B3n';

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 left-6 z-50 group"
      aria-label="Chatear por WhatsApp"
    >
      {/* Efecto de anillos expansivos */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></span>
      <span className="absolute inset-0 rounded-full bg-green-300 animate-ping opacity-25" style={{ animationDelay: '1s' }}></span>
      
      {/* Botón principal */}
      <div className={`
        relative bg-gradient-to-r from-green-500 to-green-600 
        text-white rounded-full p-4 shadow-lg
        transition-all duration-300 transform
        ${isHovered ? 'scale-110 rotate-12 shadow-2xl' : 'scale-100'}
      `}>
        <MessageCircle className="h-8 w-8" />
      </div>

      {/* Texto flotante */}
      {isHovered && (
        <div className="absolute bottom-16 left-0 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
          <p className="text-sm font-medium">¡Chatea con nosotros!</p>
          <div className="absolute bottom-0 left-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-gray-800"></div>
        </div>
      )}
    </button>
  );
};

export default WhatsAppButton;
