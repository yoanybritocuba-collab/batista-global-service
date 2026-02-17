import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/cart/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { Search, ShoppingCart, User, Menu, X, Globe, Home, Shield, ArrowLeft } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { cartCount } = useCart();
  const { t, language, setLanguage } = useLanguage();
  const { user, isAuthenticated } = useClienteAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/tienda?buscar=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setIsMenuOpen(false);
    }
  };

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
          {/* Logo y botón de inicio */}
          <div className="flex items-center gap-2">
            <button 
              onClick={goToHome}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="Ir al inicio"
            >
              <img src="/images/logo-icon.png" alt="Batista" className="h-8 lg:h-10" />
              <span className="font-bold text-lg lg:text-xl hidden sm:block">
                Batista <span className="text-amber-400">Global</span>
              </span>
            </button>
            
            {/* Botón de retroceso para móvil */}
            <button 
              onClick={goBack}
              className="ml-2 p-2 hover:bg-white/10 rounded-full transition-colors lg:hidden"
              aria-label="Atrás"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('buscar_productos')}
                className="w-full px-4 py-2 pl-10 pr-12 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                {t('buscar')}
              </button>
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            {/* Botón de ADMIN */}
            <button 
              onClick={goToAdmin}
              className="p-2 hover:bg-amber-600/20 rounded-full transition-colors relative group"
              aria-label="Panel de Administración"
              title="Acceso Administrativo"
            >
              <Shield className="h-5 w-5 text-amber-400 group-hover:text-amber-300" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            </button>

            {/* Language Toggle */}
            <button onClick={toggleLanguage} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Globe className="h-5 w-5" />
              <span className="sr-only">{language === 'es' ? 'Español' : 'English'}</span>
            </button>

            {/* User Menu */}
            <Link to={isAuthenticated ? "/cliente/perfil" : "/cliente/login"} className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
              <User className="h-5 w-5" />
              {isAuthenticated && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-xs font-bold rounded-full min-w-[18px] h-4 px-1 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 animate-slideDown">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('buscar_productos')}
                  className="w-full px-4 py-2 pl-10 pr-12 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                  {t('buscar')}
                </button>
              </div>
            </form>
            <nav className="flex flex-col space-y-2">
              <button
                onClick={goToHome}
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors w-full text-left"
              >
                <Home className="h-5 w-5" />
                <span>Inicio</span>
              </button>
              
              <button
                onClick={goBack}
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors w-full text-left"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Atrás</span>
              </button>
              
              <button
                onClick={goToAdmin}
                className="flex items-center gap-3 px-4 py-3 hover:bg-amber-600/20 rounded-lg transition-colors w-full text-left text-amber-400"
              >
                <Shield className="h-5 w-5" />
                <span>Panel Admin</span>
              </button>

              <Link 
                to="/tienda" 
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>{t('tienda')}</span>
              </Link>
              <Link 
                to="/servicios" 
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Globe className="h-5 w-5" />
                <span>{t('servicios')}</span>
              </Link>
              <Link 
                to={isAuthenticated ? "/cliente/perfil" : "/cliente/login"} 
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>{isAuthenticated ? 'Mi Perfil' : t('ingresar')}</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;