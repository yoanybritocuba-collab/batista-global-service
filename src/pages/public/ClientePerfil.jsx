import React from 'react';
import { Link } from 'react-router-dom';
import { useClienteAuth } from '../../contexts/auth/ClienteAuthContext';
import { User, Package, Heart, LogOut, Settings, ShoppingBag, MapPin, CreditCard } from 'lucide-react';

const ClientePerfil = () => {
  const { user, logout } = useClienteAuth();

  const stats = [
    { label: 'Pedidos', value: 0, icon: Package, color: 'blue', link: '/cliente/pedidos' },
    { label: 'Favoritos', value: 0, icon: Heart, color: 'red', link: '/cliente/favoritos' },
    { label: 'Carritos', value: 0, icon: ShoppingBag, color: 'green', link: '/cart' },
  ];

  const menuItems = [
    { icon: Package, label: 'Mis pedidos', description: 'Ver historial de compras', link: '/cliente/pedidos' },
    { icon: Heart, label: 'Mis favoritos', description: 'Productos que te gustan', link: '/cliente/favoritos' },
    { icon: MapPin, label: 'Direcciones', description: 'Gestiona tus direcciones', link: '/cliente/direcciones' },
    { icon: CreditCard, label: 'Métodos de pago', description: 'Tarjetas y formas de pago', link: '/cliente/pagos' },
    { icon: Settings, label: 'Configuración', description: 'Ajustes de cuenta', link: '/cliente/configuracion' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header del perfil */}
        <div className="bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{user?.name || 'Cliente'}</h1>
              <p className="text-white/90 text-sm">{user?.email || 'correo@ejemplo.com'}</p>
              <p className="text-white/70 text-xs mt-1">Miembro desde {new Date(user?.createdAt).toLocaleDateString() || 'hoy'}</p>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colors = {
              blue: 'bg-blue-100 text-blue-600',
              red: 'bg-red-100 text-red-600',
              green: 'bg-green-100 text-green-600'
            };
            return (
              <Link
                key={index}
                to={stat.link}
                className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 ${colors[stat.color]} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </Link>
            );
          })}
        </div>

        {/* Menú principal */}
        <div className="bg-white rounded-xl shadow-sm divide-y mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.link}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </Link>
            );
          })}
        </div>

        {/* Botón cerrar sesión */}
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 p-4 bg-white rounded-xl shadow-sm hover:bg-red-50 transition-colors text-red-600 font-medium"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>

        {/* Volver a la tienda */}
        <div className="mt-4 text-center">
          <Link
            to="/tienda"
            className="text-sm text-gray-500 hover:text-amber-400 transition-colors"
          >
            ← Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientePerfil;