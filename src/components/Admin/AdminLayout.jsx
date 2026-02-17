import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/AuthContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Truck,
  Users,
  Home
} from 'lucide-react';

const AdminLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Productos' },
    { path: '/admin/services', icon: Truck, label: 'Servicios' },
    { path: '/admin/orders', icon: ShoppingBag, label: 'Pedidos' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analíticas' },
    { path: '/admin/users', icon: Users, label: 'Usuarios' },
    { path: '/admin/settings', icon: Settings, label: 'Configuración' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header superior */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
          
          <button
            onClick={() => navigate('/')}
            className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg"
          >
            <Home className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Menú lateral */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMenuOpen(false)}
          />
          
          {/* Menú */}
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-xl z-50 overflow-y-auto">
            <div className="p-4 border-b">
              <h2 className="font-bold text-lg">Batista Admin</h2>
              <p className="text-sm text-gray-600 truncate mt-1">{user?.email}</p>
            </div>
            
            <nav className="p-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
                      isActive ? 'bg-amber-50 text-amber-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg mt-4"
              >
                <LogOut className="h-5 w-5" />
                <span>Cerrar Sesión</span>
              </button>
            </nav>
          </div>
        </>
      )}

      {/* Contenido principal */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;