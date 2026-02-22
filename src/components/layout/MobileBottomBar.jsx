import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/cart/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { Home, Search, User, X, LogOut, UserCircle, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';

const MobileBottomBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { cartCount } = useCart();
  const { t } = useLanguage();
  const { user, logout, isAuthenticated } = useClienteAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/tienda?buscar=${encodeURIComponent(searchTerm)}`);
      setShowSearch(false);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    toast.success('Sesión cerrada correctamente');
    navigate('/');
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate('/cliente/login');
    }
  };

  const goToHome = () => {
    navigate('/');
    setShowUserMenu(false);
  };

  return (
    <>
      {/* BARRA INFERIOR FLOTANTE - SIN CARRITO */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-t border-amber-400/20 shadow-2xl">
        <div className="flex items-center justify-around px-2 py-2">

          {/* HOME */}
          <button
            onClick={goToHome}
            className="flex flex-col items-center justify-center p-2 text-white/80 hover:text-amber-400 transition-colors" 
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{t('inicio')}</span>
          </button>

          {/* BUSCADOR */}
          <button
            onClick={() => setShowSearch(true)}
            className="flex flex-col items-center justify-center p-2 text-white/80 hover:text-amber-400 transition-colors" 
          >
            <Search className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{t('buscar')}</span>
          </button>

          {/* USUARIO */}
          <div className="relative">
            <button
              onClick={handleUserClick}
              className="flex flex-col items-center justify-center p-2 text-white/80 hover:text-amber-400 transition-colors"
            >
              {isAuthenticated ? (
                <UserCircle className="w-5 h-5" />
              ) : (
                <User className="w-5 h-5" />
              )}
              <span className="text-[10px] mt-0.5">
                {isAuthenticated ? t('mi_cuenta') : t('ingresar')}
              </span>
            </button>

            {/* MENÚ DE USUARIO */}
            {showUserMenu && isAuthenticated && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-gray-900 rounded-xl shadow-2xl border border-amber-400/20 overflow-hidden z-50">
                  <div className="p-3 border-b border-amber-400/20">
                    <p className="text-white font-medium text-sm truncate">{user?.name || t('usuario')}</p>
                    <p className="text-white/60 text-xs truncate">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/cliente/perfil"
                      className="block px-4 py-2 text-sm text-white/80 hover:text-amber-400 hover:bg-white/5 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      {t('mi_perfil')}
                    </Link>
                    <Link
                      to="/cliente/pedidos"
                      className="block px-4 py-2 text-sm text-white/80 hover:text-amber-400 hover:bg-white/5 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      {t('mis_pedidos')}
                    </Link>
                    <Link
                      to="/cliente/favoritos"
                      className="block px-4 py-2 text-sm text-white/80 hover:text-amber-400 hover:bg-white/5 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        {t('favoritos')}
                      </div>
                    </Link>
                    <div className="border-t border-amber-400/20 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('cerrar_sesion')}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE BÚSQUEDA */}
      {showSearch && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm">
          <div className="flex items-start justify-center min-h-screen pt-20 px-4">
            <div className="w-full max-w-md bg-gray-900 rounded-2xl p-6 border border-amber-400/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{t('buscar_productos')}</h3>
                <button
                  onClick={() => setShowSearch(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white/80" />
                </button>
              </div>

              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('escribe_lo_que_buscas')}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 mb-4"
                  autoFocus
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold py-3 px-4 rounded-xl hover:shadow-lg transition-all"
                >
                  {t('buscar')}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ESPACIO RESERVADO */}
      <div className="lg:hidden h-16"></div>
    </>
  );
};

export default MobileBottomBar;