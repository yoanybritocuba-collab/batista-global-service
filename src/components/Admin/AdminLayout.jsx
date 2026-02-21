import React from 'react';
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
  X,
  Truck,
  Users,
  Home,
  ArrowLeft,
  MapPin // 👈 AGREGAR ESTE ICONO
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Productos' },
    { path: '/admin/services', icon: Truck, label: 'Servicios' },
    { path: '/admin/destinos', icon: MapPin, label: 'Destinos Populares' }, // 👈 NUEVO
    { path: '/admin/orders', icon: ShoppingBag, label: 'Pedidos' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analíticas' },
    { path: '/admin/users', icon: Users, label: 'Usuarios' },
    { path: '/admin/settings', icon: Settings, label: 'Configuración' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const goToHome = () => {
    navigate('/');
  };

  const goBack = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header superior */}
      <div className="bg-white shadow-sm sticky top-0 z-30 border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <button
              onClick={goToHome}
              className="flex items-center gap-2 px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Inicio</span>
            </button>

            <button
              onClick={goBack}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors sm:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>

          <h1 className="text-base lg:text-lg font-bold text-gray-800">
            Panel Administrativo
          </h1>

          <div className="hidden md:block text-sm text-gray-600 truncate max-w-[200px]">
            {user?.email || 'admin@batista.com'}
          </div>
          <div className="w-10 md:hidden"></div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Header del sidebar */}
          <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-amber-50 to-orange-50">
            <h1 className="text-xl font-bold text-gray-800">Batista Admin</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-white/50 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Botón de inicio */}
          <button
            onClick={() => {
              navigate('/');
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-3 mx-4 mt-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-md"
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Volver al sitio web</span>
          </button>

          {/* Separador */}
          <div className="px-4 mt-4 mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Menú de Administración
            </p>
          </div>

          {/* Menú de navegación */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                              (item.path === '/admin/services' && location.pathname.includes('/admin/services'));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-amber-50 text-amber-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer del sidebar */}
          <div className="p-4 border-t bg-gray-50">
            <div className="mb-4 px-4 py-3 bg-white rounded-lg shadow-sm">
              <p className="text-xs text-gray-500">Administrador</p>
              <p className="text-sm font-medium truncate text-gray-800">{user?.email || 'admin@batista.com'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="lg:pl-64">
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
