import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/cart/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { Search, ShoppingCart, Menu, X, Globe, Home, Shield, User } from 'lucide-react';
import SearchBar from '../search/SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();
  const { t, language, setLanguage } = useLanguage();
  const { user, isAuthenticated } = useClienteAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const goToHome = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const goToAdmin = () => {
    navigate('/admin-login');
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Espaciador para que el contenido no quede debajo del header */}
      <div className="h-24 lg:h-28"></div>
      
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gradient-to-r from-gray-900 to-black shadow-lg py-6' 
          : 'bg-gradient-to-r from-black to-gray-900 py-8'
      }`}>
        <div className="w-full px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LADO IZQUIERDO: Logo + Texto + Admin */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Logo icono */}
              <button 
                onClick={goToHome}
                className="flex items-center h-14 lg:h-16"
                aria-label="Ir al inicio"
              >
                <img src="/images/logo-icon.png" alt="Batista" className="h-full w-auto" />
              </button>

              {/* Logo texto - visible en móvil y PC */}
              <button 
                onClick={goToHome}
                className="flex items-center"
              >
                <img 
                  src="/images/logo-text.png" 
                  alt="Batista Global Service" 
                  className="h-8 lg:h-12 w-auto" 
                />
              </button>

              {/* Icono de ADMIN - visible en móvil y PC */}
              <button 
                onClick={goToAdmin}
                className="p-2 lg:p-3 hover:bg-amber-600/20 rounded-full transition-colors relative group"
                aria-label="Panel de Administración"
                title="Acceso Administrativo"
              >
                <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-amber-400 group-hover:text-amber-300" />
                <span className="absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-amber-500 rounded-full animate-pulse"></span>
              </button>
            </div>

            {/* Search Bar - Desktop (CENTRADO) */}
            <div className="hidden lg:block flex-1 max-w-2xl mx-8">
              <SearchBar />
            </div>

            {/* LADO DERECHO: Idioma + Hamburguesa (SIN CARRITO EN MÓVIL) */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Language Toggle */}
              <button 
                onClick={toggleLanguage} 
                className="p-2 lg:p-3 hover:bg-white/10 rounded-full transition-colors"
              >
                {language === 'es' ? (
                  <img src="https://flagcdn.com/w40/es.png" alt="Español" className="w-6 h-6 lg:w-7 lg:h-7 rounded-full border border-white/30" />
                ) : (
                  <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-6 h-6 lg:w-7 lg:h-7 rounded-full border border-white/30" />
                )}
              </button>

              {/* Cart - SOLO EN PC */}
              <Link to="/cart" className="hidden lg:block p-3 hover:bg-white/10 rounded-full transition-colors relative">
                <ShoppingCart className="h-6 w-6 text-white/80" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center border-2 border-black">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu (Cliente) - SOLO EN PC */}
              <Link 
                to={isAuthenticated ? "/cliente/perfil" : "/cliente/login"} 
                className="hidden lg:block p-3 hover:bg-white/10 rounded-full transition-colors relative"
              >
                <User className="h-6 w-6 text-white/80" />
                {isAuthenticated && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-white/10 mt-4">
              <div className="mb-4">
                <SearchBar onClose={() => setIsMenuOpen(false)} />
              </div>
              <nav className="flex flex-col space-y-2">
                <button onClick={goToHome} className="flex items-center gap-3 px-4 py-4 hover:bg-white/10 rounded-lg text-white/80 hover:text-amber-400 text-lg">
                  <Home className="h-6 w-6" /> <span>{t('inicio')}</span>
                </button>
                <Link to="/tienda" className="flex items-center gap-3 px-4 py-4 hover:bg-white/10 rounded-lg text-white/80 hover:text-amber-400 text-lg" onClick={() => setIsMenuOpen(false)}>
                  <ShoppingCart className="h-6 w-6" /> <span>{t('tienda')}</span>
                </Link>
                <Link to="/servicios" className="flex items-center gap-3 px-4 py-4 hover:bg-white/10 rounded-lg text-white/80 hover:text-amber-400 text-lg" onClick={() => setIsMenuOpen(false)}>
                  <Globe className="h-6 w-6" /> <span>{t('servicios')}</span>
                </Link>
                <Link to={isAuthenticated ? "/cliente/perfil" : "/cliente/login"} className="flex items-center gap-3 px-4 py-4 hover:bg-white/10 rounded-lg text-white/80 hover:text-amber-400 text-lg" onClick={() => setIsMenuOpen(false)}>
                  <User className="h-6 w-6" /> <span>{isAuthenticated ? t('perfil') : t('ingresar')}</span>
                </Link>
                
                {/* Admin en menú móvil */}
                <button onClick={goToAdmin} className="flex items-center gap-3 px-4 py-4 hover:bg-amber-600/20 rounded-lg text-amber-400 text-lg">
                  <Shield className="h-6 w-6" /> <span>Admin</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;