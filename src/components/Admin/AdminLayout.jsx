import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-500">MiWebCaribe</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/admin/dashboard" className="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-gray-100">
            <span className="mr-3">📊</span> Dashboard
          </Link>
          <Link to="/admin/products" className="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-gray-100">
            <span className="mr-3">📦</span> Productos
          </Link>
          <Link to="/admin/orders" className="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-gray-100">
            <span className="mr-3">🛒</span> Órdenes
          </Link>
          <Link to="/admin/analytics" className="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-gray-100">
            <span className="mr-3">📈</span> Analíticas
          </Link>
          <Link to="/admin/customers" className="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-gray-100">
            <span className="mr-3">👥</span> Clientes
          </Link>
          <Link to="/admin/settings" className="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-gray-100">
            <span className="mr-3">⚙️</span> Configuración
          </Link>
        </nav>

        <div className="p-4 border-t space-y-2">
          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2.5 text-gray-600 rounded-lg hover:bg-gray-100 w-full"
          >
            <span className="mr-3">🌐</span> Ver Tienda
          </a>
          <button 
            onClick={logout}
            className="flex items-center px-4 py-2.5 text-red-600 rounded-lg hover:bg-red-50 w-full"
          >
            <span className="mr-3">🚪</span> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b px-8 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Panel de Administración</h2>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;