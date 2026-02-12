import React from 'react';
import { MessageCircle } from 'lucide-react';
import { companyConfig as company } from '@/config/company';

const WhatsAppFloat = () => {
  return (
    <a
      href={`https://wa.me/${company.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none"
      aria-label="Chatea con nosotros por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-1 rounded-full animate-bounce">
        Ã‚Â¡Hola!
      </span>
    </a>
  );
};

export default WhatsAppFloat;

