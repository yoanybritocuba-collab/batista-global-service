import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Home,
  Tag,
  Globe,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // ← false en móvil
  const [userDropdown, setUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Cerrar sidebar al cambiar de ruta en móvil
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location]);

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/admin/dashboard', description: 'Resumen del negocio' },
    { icon: <Package className="w-5 h-5" />, label: 'Productos', path: '/admin/products', description: 'Gestión de catálogo' },
    { icon: <ShoppingCart className="w-5 h-5" />, label: 'Órdenes', path: '/admin/orders', description: 'Pedidos y ventas' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Analíticas', path: '/admin/analytics', description: 'Métricas y reportes' },
    { icon: <Users className="w-5 h-5" />, label: 'Clientes', path: '/admin/customers', description: 'Gestión de usuarios' },
    { icon: <Tag className="w-5 h-5" />, label: 'Categorías', path: '/admin/categories', description: 'Organizar productos' },
    { icon: <Globe className="w-5 h-5" />, label: 'Marketing', path: '/admin/marketing', description: 'Cupones y promociones' },
    { icon: <Settings className="w-5 h-5" />, label: 'Configuración', path: '/admin/settings', description: 'Ajustes del sistema' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Overlay para móvil cuando el sidebar está abierto */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Responsive */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo y botón cerrar */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Admin Panel</h1>
              <p className="text-xs text-gray-400">Batista Global</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Perfil de usuario */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">A</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-800 rounded-full"></div>
            </div>
            <div>
              <p className="font-semibold text-white">Administrador</p>
              <p className="text-sm text-gray-400">admin@batista.com</p>
              <span className="inline-flex items-center mt-1 px-2 py-0.5 bg-blue-600/30 text-blue-300 text-xs rounded-full">
                Super Admin
              </span>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto h-[calc(100vh-200px)]">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`flex items-center w-full px-3 py-3 rounded-xl transition-all mb-1 ${
                  active 
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-l-4 border-blue-500' 
                    : 'hover:bg-gray-700/50'
                }`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                  active 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'bg-gray-800 text-gray-300'
                }`}>
                  {item.icon}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`font-medium ${active ? 'text-white' : 'text-gray-200'}`}>
                      {item.label}
                    </p>
                    {active && <ChevronRight className="w-4 h-4 text-blue-400" />}
                  </div>
                  <p className="text-xs text-gray-400 truncate">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer del sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center w-full px-3 py-3 rounded-xl hover:bg-gray-700/50 transition-colors mb-1"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-300">
              <Home className="w-5 h-5" />
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-200">Ver Tienda</p>
              <p className="text-xs text-gray-400">Abrir sitio web</p>
            </div>
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-3 rounded-xl hover:bg-red-900/30 text-red-300 hover:text-red-200 transition-colors"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-900/20 flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="ml-3 font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className={`lg:pl-72 transition-all duration-300`}>
        {/* Barra superior */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-lg border-b shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6 lg:py-4">
            <div className="flex items-center space-x-3">
              {/* Botón menú móvil */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Abrir menú"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                  {menuItems.find(item => isActive(item.path))?.label || 'Dashboard'}
                </h1>
                <p className="text-xs lg:text-sm text-gray-500 hidden sm:block">
                  {menuItems.find(item => isActive(item.path))?.description || 'Panel de administración'}
                </p>
              </div>
            </div>

            {/* Acciones de usuario */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Menú de usuario */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center space-x-2 lg:space-x-3 p-1.5 lg:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow">
                    <span className="font-bold text-sm lg:text-base">A</span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">Administrador</p>
                    <p className="text-xs text-gray-500">En línea</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    userDropdown ? 'rotate-180' : ''
                  }`} />
                </button>

                {userDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setUserDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Administrador</p>
                        <p className="text-xs text-gray-500">admin@batista.com</p>
                      </div>
                      <div className="py-1">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          Mi perfil
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          Configuración
                        </button>
                      </div>
                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Cerrar sesión
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Contenido dinámico */}
        <main className="p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;