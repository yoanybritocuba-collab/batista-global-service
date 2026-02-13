import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MobileBottomBar from './components/layout/MobileBottomBar';
import { AuthProvider } from './contexts/auth/AuthContext';
import { ClienteAuthProvider } from './contexts/auth/ClienteAuthContext';
import { CartProvider } from './contexts/cart/CartContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Importaciones admin
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminAnalytics from './pages/admin/Analytics';
import ProductEdit from './pages/admin/ProductEdit';

// Importaciones públicas
import HomeFixed from './pages/public/HomeFixed';
import ServiciosPage from './pages/public/ServiciosPage';
import Tienda from './pages/public/Tienda';
import Cart from './pages/public/Cart';
import UserLogin from './pages/public/UserLogin';

// Importaciones cliente
import ClienteLogin from './pages/public/ClienteLogin';
import ClientePerfil from './pages/public/ClientePerfil';
import { useClienteAuth } from './contexts/auth/ClienteAuthContext';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Middleware para proteger rutas admin
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdmin') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Middleware para proteger rutas de cliente
const ProtectedClienteRoute = ({ children }) => {
  const { isAuthenticated } = useClienteAuth();
  return isAuthenticated ? children : <Navigate to="/cliente/login" />;
};

const App = () => {
  return (
    <LanguageProvider>
      <CartProvider> {/* ← Primero CartProvider */}
        <ClienteAuthProvider> {/* ← Luego ClienteAuthProvider */}
          <AuthProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                
                {/* Rutas Públicas con MobileBottomBar */}
                <Route path="/" element={<><Layout><HomeFixed /></Layout><MobileBottomBar /></>} />
                <Route path="/servicios" element={<><Layout><ServiciosPage /></Layout><MobileBottomBar /></>} />
                <Route path="/tienda" element={<><Layout><Tienda /></Layout><MobileBottomBar /></>} />
                <Route path="/cart" element={<><Layout><Cart /></Layout><MobileBottomBar /></>} />
                <Route path="/categoria/:category" element={<><Layout><Tienda /></Layout><MobileBottomBar /></>} />

                {/* Login de Admin */}
                <Route path="/login" element={<UserLogin />} />

                {/* Rutas de Cliente */}
                <Route path="/cliente/login" element={<ClienteLogin />} />
                <Route path="/cliente/perfil" element={
                  <ProtectedClienteRoute>
                    <ClientePerfil />
                  </ProtectedClienteRoute>
                } />
                <Route path="/cliente/pedidos" element={
                  <ProtectedClienteRoute>
                    <div className="min-h-screen bg-gray-50 py-8">
                      <div className="max-w-7xl mx-auto px-4">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mis Pedidos</h1>
                        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                          <p className="text-gray-500">No tienes pedidos aún</p>
                          <a href="/tienda" className="inline-block mt-4 text-amber-400 hover:text-amber-500">Ir a la tienda</a>
                        </div>
                      </div>
                    </div>
                  </ProtectedClienteRoute>
                } />
                <Route path="/cliente/favoritos" element={
                  <ProtectedClienteRoute>
                    <div className="min-h-screen bg-gray-50 py-8">
                      <div className="max-w-7xl mx-auto px-4">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mis Favoritos</h1>
                        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                          <p className="text-gray-500">No tienes favoritos guardados</p>
                          <a href="/tienda" className="inline-block mt-4 text-amber-400 hover:text-amber-500">Explorar productos</a>
                        </div>
                      </div>
                    </div>
                  </ProtectedClienteRoute>
                } />

                {/* Rutas Admin - SIN MobileBottomBar */}
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="products/edit/:id" element={<ProductEdit />} />
                  <Route path="products/new" element={<ProductEdit />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={
                  <Layout>
                    <div className="text-center py-20">
                      <h1 className="text-4xl font-bold mb-4">404</h1>
                      <p className="text-xl mb-8">Página no encontrada</p>
                      <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                        Volver al inicio
                      </a>
                    </div>
                  </Layout>
                } />
              </Routes>
            </Suspense>
          </AuthProvider>
        </ClienteAuthProvider>
      </CartProvider>
    </LanguageProvider>
  );
};

export default App;