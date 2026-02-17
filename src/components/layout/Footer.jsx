import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

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
              Tu mejor opción para viajes y envíos en el Caribe. Servicios confiables y profesionales.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-amber-400">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/tienda" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Tienda
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-amber-400">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">+1 (786) 658-3567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">batistaglobalservice25@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">700 SW 57th Ave, Miami FL</span>
              </li>
            </ul>
          </div>

          {/* Horarios y redes */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-amber-400">Horarios</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-amber-400" />
                <div>
                  <p className="text-gray-400">Lun-Vie: 9:00 - 18:00</p>
                  <p className="text-gray-400">Sáb: 10:00 - 16:00</p>
                  <p className="text-gray-400">Dom: 10:00 - 14:00</p>
                </div>
              </div>
            </div>
            
            <h3 className="font-bold text-lg mb-4 text-amber-400">Síguenos</h3>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-amber-500/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-amber-500/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-amber-500/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Batista Global Service. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;