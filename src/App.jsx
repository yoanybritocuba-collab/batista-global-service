import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AuthProvider } from './contexts/auth/AuthContext';
import { CartProvider } from './contexts/cart/CartContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Importaciones admin - RUTA CORREGIDA
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

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdmin') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              
              {/* Rutas Públicas */}
              <Route path="/" element={<Layout><HomeFixed /></Layout>} />
              <Route path="/servicios" element={<Layout><ServiciosPage /></Layout>} />
              <Route path="/tienda" element={<Layout><Tienda /></Layout>} />
              <Route path="/cart" element={<Layout><Cart /></Layout>} />
              <Route path="/categoria/:category" element={<Layout><Tienda /></Layout>} />

              {/* Login */}
              <Route path="/login" element={<UserLogin />} />

              {/* Rutas Admin */}
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
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;