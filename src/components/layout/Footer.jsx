import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white border-t border-amber-500/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo y descripción */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src="/images/logo-icon.png" alt="Batista Global" className="h-10 w-auto" />
              <span className="font-bold text-xl">
                Batista <span className="text-amber-400">Global</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              {t('descripcion_servicios')}
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-amber-400">{t('enlaces_rapidos')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-amber-400">{t('inicio')}</Link></li>
              <li><Link to="/tienda" className="text-gray-400 hover:text-amber-400">{t('tienda')}</Link></li>
              <li><Link to="/servicios" className="text-gray-400 hover:text-amber-400">{t('servicios')}</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-amber-400">{t('carrito')}</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-amber-400">{t('contactanos')}</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+17866583567" className="flex items-start gap-3 group hover:bg-white/5 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 group-hover:text-white">+1 (786) 658-3567</span>
                </a>
              </li>
              <li>
                <a href="mailto:batistaglobalservice25@gmail.com" className="flex items-start gap-3 group hover:bg-white/5 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 group-hover:text-white break-all">batistaglobalservice25@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="https://www.google.com/maps/search/?api=1&query=700+SW+57th+Ave+Miami+FL+33144" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group hover:bg-white/5 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 group-hover:text-white">700 SW 57th Ave, Miami FL</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Horarios y redes */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-amber-400">{t('horarios')}</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-amber-400" />
                <div>
                  <p className="text-gray-400">{t('lun_vie')}: 9:00 - 18:00</p>
                  <p className="text-gray-400">{t('sabado')}: 10:00 - 16:00</p>
                  <p className="text-gray-400">{t('domingo')}: 10:00 - 14:00</p>
                </div>
              </div>
            </div>
            
            <h3 className="font-bold text-lg mb-4 text-amber-400">{t('siguenos')}</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com/BatistaGlobalServices" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com/batistaglobalservice" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-br from-[#833AB4] via-[#E4405F] to-[#FDC830] rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
              <a href="https://tiktok.com/@batista.global" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform border border-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            {t('copyright', { year: currentYear, rights: t('derechos') })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
