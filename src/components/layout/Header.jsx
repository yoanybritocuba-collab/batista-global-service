import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/cart/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { cartCount } = useCart();

  return (
    <header className="bg-black sticky top-0 z-50 border-0">
      <div className="container mx-auto px-3 lg:px-8 py-3 lg:py-10">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 lg:gap-4">
            <img 
              src="/images/logo-icon.png" 
              alt="Batista Global Service" 
              className="h-8 w-auto lg:h-16"
            />
            <img 
              src="/images/logo-text.png" 
              alt="Batista Global Service" 
              className="h-6 w-auto lg:h-14"
            />
          </Link>

          {/* NAVEGACIÓN ESCRITORIO */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Link to="/" className="px-5 py-4 text-white/90 hover:text-amber-400 text-base font-medium rounded-lg hover:bg-white/5">
              {t('inicio')}
            </Link>
            <Link to="/servicios" className="px-5 py-4 text-white/90 hover:text-amber-400 text-base font-medium rounded-lg hover:bg-white/5">
              {t('servicios')}
            </Link>
            <Link to="/tienda" className="px-5 py-4 text-white/90 hover:text-amber-400 text-base font-medium rounded-lg hover:bg-white/5">
              {t('tienda')}
            </Link>
            <Link to="/productos" className="px-5 py-4 text-white/90 hover:text-amber-400 text-base font-medium rounded-lg hover:bg-white/5">
              {t('productos')}
            </Link>
            <Link 
              to="/admin/dashboard" 
              className="flex items-center gap-2 px-6 py-4 ml-2 bg-[#00A8B5] hover:bg-[#00909B] text-white text-base font-medium rounded-lg transition-all hover:shadow-[0_0_20px_rgba(255,184,0,0.5)]"
            >
              <span>{t('panel_admin')}</span>
            </Link>
          </nav>

          {/* ACCIONES - SIN BOTONES TIENDA/SERVICIOS */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            
            {/* IDIOMA */}
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 lg:px-4 lg:py-3 text-white/80 hover:text-amber-400 text-xs lg:text-sm font-medium rounded-lg hover:bg-white/5 flex items-center gap-1"
            >
              <span className="text-base lg:text-lg">{language === 'es' ? '🇪🇸' : '🇺🇸'}</span>
              <span className="uppercase hidden sm:inline">{language}</span>
            </button>

            {/* CARRITO */}
            <Link to="/cart" className="relative p-1.5 lg:p-3 rounded-lg hover:bg-white/5 group">
              <svg className="w-5 h-5 lg:w-7 lg:h-7 text-white/80 group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-xs font-bold rounded-full min-w-[18px] h-4 lg:min-w-[24px] lg:h-6 lg:px-1.5 flex items-center justify-center shadow-lg">
                {cartCount}
              </span>
            </Link>

            {/* MENÚ HAMBURGUESA */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-8 h-8 flex items-center justify-center text-white/80 hover:text-amber-400 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Menú"
            >
              <div className="absolute w-5 h-5 flex flex-col items-center justify-center">
                <span className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
                <span className={`absolute block w-5 h-0.5 bg-current transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-black border-t border-amber-400/20 px-4 py-4">
          <nav className="space-y-2">
            <Link to="/" className="block py-3 px-4 text-white/90 hover:text-amber-400 text-base rounded-lg hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>
              {t('inicio')}
            </Link>
            <Link to="/servicios" className="block py-3 px-4 text-white/90 hover:text-amber-400 text-base rounded-lg hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>
              {t('servicios')}
            </Link>
            <Link to="/tienda" className="block py-3 px-4 text-white/90 hover:text-amber-400 text-base rounded-lg hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>
              {t('tienda')}
            </Link>
            <Link to="/productos" className="block py-3 px-4 text-white/90 hover:text-amber-400 text-base rounded-lg hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>
              {t('productos')}
            </Link>
            <div className="border-t border-amber-400/20 my-2"></div>
            <Link to="/admin/dashboard" className="block py-3 px-4 bg-[#00A8B5]/10 text-[#00A8B5] text-base font-medium rounded-lg hover:bg-[#00A8B5]/20" onClick={() => setIsMenuOpen(false)}>
              {t('panel_admin')}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;