import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/cart/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { Search, ShoppingCart, User, Menu, X, Globe, Home, Shield, ArrowLeft } from 'lucide-react';
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

  const goBack = () => {
    navigate(-1);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gradient-to-r from-gray-900 to-black shadow-lg py-2' 
        : 'bg-gradient-to-r from-black to-gray-900 py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* LOGO Y ADMIN JUNTOS A LA IZQUIERDA */}
          <div className="flex items-center gap-2">
            {/* Logo */}
            <button 
              onClick={goToHome}
              className="flex items-center gap-2"
              aria-label="Ir al inicio"
            >
              <img src="/images/logo-icon.png" alt="Batista" className="h-8 lg:h-10 w-auto" />
              <img src="/images/logo-text.png" alt="Batista Global Service" className="h-6 lg:h-8 w-auto hidden sm:block" />
            </button>

            {/* Icono de ADMIN - SEPARADO DEL LOGO Y ANTES DEL BUSCADOR */}
            <button 
              onClick={goToAdmin}
              className="ml-2 p-2 hover:bg-amber-600/20 rounded-full transition-colors relative group"
              aria-label="Panel de Administración"
              title="Acceso Administrativo"
            >
              <Shield className="h-5 w-5 text-amber-400 group-hover:text-amber-300" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            </button>
          </div>

          {/* Search Bar - Desktop (CENTRADO) */}
          <div className="hidden lg:block flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage} 
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {language === 'es' ? (
                <img src="https://flagcdn.com/w40/es.png" alt="Español" className="w-6 h-6 rounded-full border border-white/30" />
              ) : (
                <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-6 h-6 rounded-full border border-white/30" />
              )}
            </button>

            {/* User Menu (Cliente) */}
            <Link to={isAuthenticated ? "/cliente/perfil" : "/cliente/login"} className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
              <User className="h-5 w-5 text-white/80" />
              {isAuthenticated && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
              <ShoppingCart className="h-5 w-5 text-white/80" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full min-w-[18px] h-4 px-1 flex items-center justify-center">
                  {cartCount}
                </span>
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
          <div className="lg:hidden py-4 border-t border-white/10">
            <div className="mb-4">
              <SearchBar onClose={() => setIsMenuOpen(false)} />
            </div>
            <nav className="flex flex-col space-y-2">
              <button onClick={goToHome} className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg text-white/80 hover:text-amber-400">
                <Home className="h-5 w-5" /> <span>{t('inicio')}</span>
              </button>
              <button onClick={goBack} className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg text-white/80 hover:text-amber-400">
                <ArrowLeft className="h-5 w-5" /> <span>{t('atras')}</span>
              </button>
              <button onClick={goToAdmin} className="flex items-center gap-3 px-4 py-3 hover:bg-amber-600/20 rounded-lg text-amber-400">
                <Shield className="h-5 w-5" /> <span>Admin</span>
              </button>
              <Link to="/tienda" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg text-white/80 hover:text-amber-400" onClick={() => setIsMenuOpen(false)}>
                <ShoppingCart className="h-5 w-5" /> <span>{t('tienda')}</span>
              </Link>
              <Link to="/servicios" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg text-white/80 hover:text-amber-400" onClick={() => setIsMenuOpen(false)}>
                <Globe className="h-5 w-5" /> <span>{t('servicios')}</span>
              </Link>
              <Link to={isAuthenticated ? "/cliente/perfil" : "/cliente/login"} className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg text-white/80 hover:text-amber-400" onClick={() => setIsMenuOpen(false)}>
                <User className="h-5 w-5" /> <span>{isAuthenticated ? t('perfil') : t('ingresar')}</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
