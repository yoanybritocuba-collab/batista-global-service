import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  User, Mail, Phone, Calendar, ShoppingBag, 
  LogOut, Home, Settings, Heart, Package, 
  MapPin, Edit, Camera, Award, Star, Clock,
  Moon, Sun, ChevronRight, Menu, X, Bell,
  CreditCard, Gift, Shield, HelpCircle
} from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase/config';

const ClientePerfil = () => {
  const { user, userData, logout } = useClienteAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('resumen');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    ordersCount: 0,
    favoritesCount: 0,
    daysAsMember: 0,
    addressesCount: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  // ✅ Cargar estadísticas
  useEffect(() => {
    const loadUserStats = async () => {
      if (!user) return;

      try {
        console.log('📦 Cargando datos para usuario:', user.uid);

        const memberSince = userData?.createdAt 
          ? Math.floor((new Date() - new Date(userData.createdAt)) / (1000 * 60 * 60 * 24))
          : 0;

        let ordersCount = 0;
        let ordersData = [];
        
        try {
          const ordersQuery = query(
            collection(db, 'orders'), 
            where('userId', '==', user.uid)
          );
          const ordersSnapshot = await getDocs(ordersQuery);
          ordersCount = ordersSnapshot.size;
          
          ordersData = ordersSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);
        } catch (ordersError) {
          console.log('⚠️ No se pudieron cargar pedidos:', ordersError.message);
        }

        const favoritesCount = userData?.favorites?.length || 0;
        const addressesCount = userData?.addresses?.length || 0;

        setStats({
          ordersCount,
          favoritesCount,
          daysAsMember: memberSince,
          addressesCount
        });

        setRecentOrders(ordersData);

      } catch (error) {
        console.error('Error loading user stats:', error);
      }
    };

    loadUserStats();
  }, [user, userData]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const goToTienda = () => {
    navigate('/tienda');
  };

  const goToHome = () => {
    navigate('/');
  };

  // Menú de navegación lateral
  const menuItems = [
    { id: 'resumen', label: t('resumen'), icon: User, color: 'blue' },
    { id: 'pedidos', label: t('mis_pedidos'), icon: Package, color: 'green' },
    { id: 'favoritos', label: t('favoritos'), icon: Heart, color: 'red' },
    { id: 'direcciones', label: t('direcciones'), icon: MapPin, color: 'amber' },
    { id: 'ajustes', label: t('ajustes'), icon: Settings, color: 'gray' }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 pt-24 lg:pt-28">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 max-w-md w-full">
          <User className="h-20 w-20 text-amber-400 mx-auto mb-4" />
          <p className="text-white text-lg mb-6">{t('no_sesion')}</p>
          <button
            onClick={() => navigate('/cliente/login')}
            className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg"
          >
            {t('iniciar_sesion')}
          </button>
        </div>
      </div>
    );
  }

  const realStats = [
    { 
      label: t('pedidos'), 
      value: stats.ordersCount, 
      icon: Package, 
      color: 'blue',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400'
    },
    { 
      label: t('favoritos'), 
      value: stats.favoritesCount, 
      icon: Heart, 
      color: 'red',
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-600 dark:text-red-400'
    },
    { 
      label: t('miembro'), 
      value: `${stats.daysAsMember} ${t('dias')}`, 
      icon: Calendar, 
      color: 'green',
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-600 dark:text-green-400'
    },
    { 
      label: t('direcciones'), 
      value: stats.addressesCount, 
      icon: MapPin, 
      color: 'amber',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      text: 'text-amber-600 dark:text-amber-400'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 pt-20 lg:pt-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      
      {/* Header móvil */}
      <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-20 z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {sidebarOpen ? <X className="h-6 w-6 text-gray-600 dark:text-gray-300" /> : <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />}
          </button>
          <h1 className="text-lg font-bold text-gray-800 dark:text-white">{t('mi_perfil')}</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-gray-600" />}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-96px)]">
        
        {/* Sidebar - Móvil (deslizable) */}
        <div className={`
          fixed inset-0 z-40 lg:static lg:inset-auto lg:z-auto
          transform transition-transform duration-300 lg:transform-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Overlay oscuro */}
          <div 
            className={`absolute inset-0 bg-black/50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
            onClick={() => setSidebarOpen(false)}
          />
          
          {/* Sidebar content */}
          <div className="relative w-72 lg:w-80 bg-white dark:bg-gray-800 h-full overflow-y-auto shadow-xl lg:shadow-none border-r border-gray-200 dark:border-gray-700">
            
            {/* Perfil del usuario */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center text-white text-2xl font-bold">
                    {userData?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <button className="absolute bottom-0 right-0 p-1 bg-white dark:bg-gray-700 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <Camera className="h-3 w-3 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-gray-800 dark:text-white truncate">
                    {userData?.name || t('usuario')}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                  <p className="text-xs text-amber-500 mt-1 flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {t('miembro_desde')} {new Date(userData?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Menú de navegación */}
            <nav className="p-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
                      activeTab === item.id
                        ? `bg-${item.color}-50 dark:bg-${item.color}-900/20 text-${item.color}-600 dark:text-${item.color}-400`
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${
                      activeTab === item.id ? `text-${item.color}-500` : ''
                    }`} />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronRight className={`h-4 w-4 transition-transform ${
                      activeTab === item.id ? 'rotate-90' : ''
                    }`} />
                  </button>
                );
              })}

              <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="flex-1 text-left">{t('cerrar_sesion')}</span>
                </button>
              </div>
            </nav>

            {/* Badge de membresía */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="h-5 w-5" />
                  <span className="font-semibold">{t('beneficios')}</span>
                </div>
                <p className="text-xs text-amber-100">
                  {t('beneficios_texto')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Header PC */}
            <div className="hidden lg:flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('mi_perfil')}</h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  {t('inicio')}
                </button>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {darkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-gray-600" />}
                </button>
              </div>
            </div>

            {/* Contenido según pestaña activa */}
            {activeTab === 'resumen' && (
              <div className="space-y-6">
                {/* Tarjetas de estadísticas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {realStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={index}
                        className={`${stat.bg} rounded-2xl p-6 transition-all hover:scale-105 cursor-default border border-gray-200 dark:border-gray-700`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-xl ${stat.bg}`}>
                            <Icon className={`h-6 w-6 ${stat.text}`} />
                          </div>
                          <span className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Pedidos recientes */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <Package className="h-5 w-5 text-amber-500" />
                      {t('pedidos_recientes')}
                    </h2>
                    <button
                      onClick={() => setActiveTab('pedidos')}
                      className="text-amber-500 hover:text-amber-600 text-sm font-medium flex items-center gap-1"
                    >
                      {t('ver_todos')} <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {recentOrders.length > 0 ? (
                    <div className="space-y-3">
                      {recentOrders.map((order, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                              <Package className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 dark:text-white">{order.id}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">${order.total}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              order.status === 'entregado' ? 'bg-green-100 text-green-700' :
                              order.status === 'en_camino' ? 'bg-blue-100 text-blue-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {t(order.status)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 mb-4">{t('sin_pedidos')}</p>
                      <button
                        onClick={goToTienda}
                        className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors font-medium"
                      >
                        {t('comprar_ahora')}
                      </button>
                    </div>
                  )}
                </div>

                {/* Actividad reciente */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-500" />
                    {t('actividad_reciente')}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="flex-1">{t('bienvenida')}</p>
                      <span className="text-sm">{t('hace_un_momento')}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <p className="flex-1">{t('cuenta_creada')}</p>
                      <span className="text-sm">{stats.daysAsMember} {t('dias')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Otras pestañas (placeholder) */}
            {activeTab !== 'resumen' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center border border-gray-200 dark:border-gray-700">
                <div className="text-6xl mb-4">🚧</div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {t('en_construccion')}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {t('proximamente')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientePerfil;