import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/cart/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { Search, ShoppingCart, User, Menu, X, Home, Shield, ArrowLeft } from 'lucide-react';
import SearchBar from '../search/SearchBar'; // Si implementaste el buscador

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { t, language, setLanguage } = useLanguage();
  const { user, isAuthenticated } = useClienteAuth();
  const navigate = useNavigate();

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
    <header className="bg-gradient-to-r from-black to-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <button onClick={goToHome} className="flex items-center gap-2 hover:opacity-80">
              <img src="/images/logo-icon.png" alt="Batista" className="h-8 lg:h-10" />
              <span className="font-bold text-lg lg:text-xl hidden sm:block">
                Batista <span className="text-amber-400">Global</span>
              </span>
            </button>
            <button onClick={goBack} className="ml-2 p-2 hover:bg-white/10 rounded-full lg:hidden">
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>

          {/* Buscador */}
          <div className="hidden lg:block flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Iconos */}
          <div className="flex items-center gap-2">
            {/* Idioma */}
            <button onClick={toggleLanguage} className="p-2 hover:bg-white/10 rounded-full">
              {language === 'es' ? (
                <img src="https://flagcdn.com/w40/es.png" alt="Español" className="w-6 h-6 rounded-full border border-white/30" />
              ) : (
                <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-6 h-6 rounded-full border border-white/30" />
              )}
            </button>

            {/* Admin */}
            <button onClick={goToAdmin} className="p-2 hover:bg-amber-600/20 rounded-full relative">
              <Shield className="h-5 w-5 text-amber-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            </button>

            {/* Usuario */}
            <Link to={isAuthenticated ? "/cliente/perfil" : "/cliente/login"} className="p-2 hover:bg-white/10 rounded-full relative">
              <User className="h-5 w-5" />
              {isAuthenticated && <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>}
            </Link>

            {/* Carrito */}
            <Link to="/cart" className="p-2 hover:bg-white/10 rounded-full relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-xs font-bold rounded-full min-w-[18px] h-4 px-1 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Menú móvil */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 hover:bg-white/10 rounded-full">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <div className="mb-4">
              <SearchBar onClose={() => setIsMenuOpen(false)} />
            </div>
            <nav className="flex flex-col space-y-2">
              <button onClick={goToHome} className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg">
                <Home className="h-5 w-5" /> <span>{t('inicio')}</span>
              </button>
              <button onClick={goBack} className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg">
                <ArrowLeft className="h-5 w-5" /> <span>{t('atras')}</span>
              </button>
              <button onClick={goToAdmin} className="flex items-center gap-3 px-4 py-3 hover:bg-amber-600/20 rounded-lg text-amber-400">
                <Shield className="h-5 w-5" /> <span>{t('admin')}</span>
              </button>
              <Link to="/tienda" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                <ShoppingCart className="h-5 w-5" /> <span>{t('tienda')}</span>
              </Link>
              <Link to="/servicios" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                <Globe className="h-5 w-5" /> <span>{t('servicios')}</span>
              </Link>
              <Link to={isAuthenticated ? "/cliente/perfil" : "/cliente/login"} className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg" onClick={() => setIsMenuOpen(false)}>
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