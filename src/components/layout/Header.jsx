import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("es");

  return (
    <header className="bg-black sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 lg:py-6">
        <div className="flex items-center justify-between">
          
          {/* LOGO DOBLE - más pequeño en móvil */}
          <Link to="/" className="flex items-center gap-2 lg:gap-3">
            <img 
              src="/images/logo-icon.png" 
              alt="Batista Global Service" 
              className="h-8 w-auto lg:h-12"
            />
            <img 
              src="/images/logo-text.png" 
              alt="Batista Global Service" 
              className="h-6 w-auto lg:h-10"
            />
          </Link>

          {/* ACCIONES - visibles siempre */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="px-2 py-1.5 lg:px-4 lg:py-2.5 text-white/80 hover:text-amber-400 text-xs lg:text-sm font-medium rounded-lg hover:bg-white/5"
            >
              {language === "es" ? "ES" : "EN"}
            </button>
            <Link to="/cart" className="relative p-1.5 lg:p-2.5 rounded-lg hover:bg-white/5">
              <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-xs font-bold rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            
            {/* Botón menú hamburguesa */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 text-white/80 hover:text-amber-400 rounded-lg hover:bg-white/5"
              aria-label="Menú"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black border-t border-amber-400/20 animate-slideDown">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-3">
              <Link 
                to="/" 
                className="block py-3 px-4 text-white/90 hover:text-amber-400 text-base font-medium rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/servicios" 
                className="block py-3 px-4 text-white/90 hover:text-amber-400 text-base font-medium rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link 
                to="/tienda" 
                className="block py-3 px-4 text-white/90 hover:text-amber-400 text-base font-medium rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tienda
              </Link>
              <Link 
                to="/productos" 
                className="block py-3 px-4 text-white/90 hover:text-amber-400 text-base font-medium rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
              <div className="border-t border-amber-400/20 my-2"></div>
              <Link 
                to="/admin/dashboard" 
                className="block py-3 px-4 bg-[#00A8B5]/10 text-[#00A8B5] text-base font-medium rounded-lg hover:bg-[#00A8B5]/20 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Panel Admin
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;