import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  User, Mail, Phone, Calendar, ShoppingBag, 
  LogOut, Home, Settings, Heart, Package, 
  MapPin, Edit, Camera, Award, Star, Clock,
  Moon, Sun
} from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase/config';

const ClientePerfil = () => {
  const { user, userData, logout, updateUser } = useClienteAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('resumen');
  const [darkMode, setDarkMode] = useState(false);
  const [editing, setEditing] = useState(false);
  const [stats, setStats] = useState({
    ordersCount: 0,
    favoritesCount: 0,
    daysAsMember: 0,
    addressesCount: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [editForm, setEditForm] = useState({
    name: userData?.name || '',
    phone: userData?.phone || ''
  });

  useEffect(() => {
    const loadUserStats = async () => {
      if (!user) return;

      try {
        const memberSince = userData?.createdAt 
          ? Math.floor((new Date() - new Date(userData.createdAt)) / (1000 * 60 * 60 * 24))
          : 0;

        const ordersQuery = query(collection(db, 'orders'), where('userId', '==', user.uid));
        const ordersSnapshot = await getDocs(ordersQuery);
        
        const favoritesCount = userData?.favorites?.length || 0;
        const addressesCount = userData?.addresses?.length || 0;

        setStats({
          ordersCount: ordersSnapshot.size,
          favoritesCount: favoritesCount,
          daysAsMember: memberSince,
          addressesCount: addressesCount
        });

        const recentOrdersData = ordersSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);

        setRecentOrders(recentOrdersData);

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

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20">
          <User className="h-16 w-16 text-amber-400 mx-auto mb-4" />
          <p className="text-white text-lg mb-6">{t('no_sesion')}</p>
          <button
            onClick={() => navigate('/cliente/login')}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg"
          >
            {t('iniciar_sesion')}
          </button>
        </div>
      </div>
    );
  }

  const realStats = [
    { 
      label: t('pedidos_realizados'), 
      value: stats.ordersCount, 
      icon: Package, 
      color: 'blue',
      description: stats.ordersCount === 0 ? t('sin_pedidos') : `${stats.ordersCount} ${t('pedidos')}`
    },
    { 
      label: t('productos_favoritos'), 
      value: stats.favoritesCount, 
      icon: Heart, 
      color: 'red',
      description: stats.favoritesCount === 0 ? t('sin_favoritos') : `${stats.favoritesCount} ${t('productos')}`
    },
    { 
      label: t('dias_como_miembro'), 
      value: stats.daysAsMember, 
      icon: Calendar, 
      color: 'green',
      description: `${t('miembro_desde')} ${new Date(userData?.createdAt).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}`
    },
    { 
      label: t('direcciones_guardadas'), 
      value: stats.addressesCount, 
      icon: MapPin, 
      color: 'amber',
      description: stats.addressesCount === 0 ? t('sin_direcciones') : `${stats.addressesCount} ${t('direcciones')}`
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={goToHome} className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30">
              <Home className="h-4 w-4" />
              <span>{t('inicio')}</span>
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 backdrop-blur-sm rounded-2xl border-4 border-white/30 flex items-center justify-center">
                <User className="h-12 w-12 md:h-16 md:w-16 text-white" />
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-amber-400 text-gray-900 rounded-full hover:bg-amber-300 shadow-lg">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {userData?.name || user.displayName || t('usuario')}
              </h1>
              <p className="text-amber-100 text-lg mb-4">
                {userData?.role === 'admin' ? t('administrador') : t('cliente')}
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {user.email}
                </span>
                {userData?.phone && (
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {userData.phone}
                  </span>
                )}
                <span className="px-3 py-1 bg-amber-400 text-gray-900 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  {t('miembro_desde')} {new Date(userData?.createdAt).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}
                </span>
              </div>
            </div>

            <button
              onClick={goToTienda}
              className="px-6 py-3 bg-white text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 whitespace-nowrap"
            >
              <ShoppingBag className="h-5 w-5" />
              {t('ir_tienda')}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
          {['resumen', 'pedidos', 'favoritos', 'direcciones', 'configuracion'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-t-lg font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400'
              }`}
            >
              {t(tab)}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'resumen' && (
          <div className="space-y-8">
            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {realStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-${stat.color}-500`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-xl`}>
                        <Icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                      </div>
                      <span className="text-3xl font-bold text-gray-800 dark:text-white">{stat.value}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{stat.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Pedidos recientes */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <Package className="h-5 w-5 text-amber-500" />
                {t('pedidos_recientes')}
              </h2>
              
              {recentOrders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 text-gray-600 dark:text-gray-400">{t('id_pedido')}</th>
                        <th className="text-left py-3 text-gray-600 dark:text-gray-400">{t('fecha')}</th>
                        <th className="text-left py-3 text-gray-600 dark:text-gray-400">{t('total')}</th>
                        <th className="text-left py-3 text-gray-600 dark:text-gray-400">{t('estado')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, index) => (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="py-3 font-medium text-gray-800 dark:text-white">{order.id}</td>
                          <td className="py-3 text-gray-600 dark:text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}
                          </td>
                          <td className="py-3 font-semibold text-green-600">${order.total}</td>
                          <td className="py-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === 'entregado' ? 'bg-green-100 text-green-700' :
                              order.status === 'en camino' ? 'bg-blue-100 text-blue-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {t(order.status)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">{t('sin_pedidos')}</p>
                  <button onClick={goToTienda} className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
                    {t('comprar_ahora')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'configuracion' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <Settings className="h-5 w-5 text-amber-500" />
              {t('configuracion')}
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">{t('informacion_personal')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{t('nombre_completo')}</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="flex-1 px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white"
                      />
                      <button className="p-2 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{t('telefono')}</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="flex-1 px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white"
                      />
                      <button className="p-2 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleLogout}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="h-5 w-5" />
                  {t('cerrar_sesion')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientePerfil;