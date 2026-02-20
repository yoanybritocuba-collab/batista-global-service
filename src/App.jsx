import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { AuthProvider } from './contexts/auth/AuthContext';
import { ClienteAuthProvider } from './contexts/auth/ClienteAuthContext';
import { CartProvider } from './contexts/cart/CartContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ServicesProvider } from './contexts/services/ServicesContext';
import { SearchProvider } from './contexts/SearchContext';
import { DestinosProvider } from './contexts/DestinosContext';
import { useAuth } from './contexts/auth/AuthContext';
import { useClienteAuth } from './contexts/auth/ClienteAuthContext';
import WhatsAppButton from './components/ui/WhatsAppButton';

// Importaciones admin
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminAnalytics from './pages/admin/Analytics';
import AdminServices from './pages/admin/AdminServices';
import AdminDestinos from './pages/admin/AdminDestinos';
import ProductEdit from './pages/admin/ProductEdit';
import AdminLogin from './pages/admin/AdminLogin';

// Importaciones públicas
import HomeFixed from './pages/public/HomeFixed';
import ServiciosPage from './pages/public/ServiciosPage';
import ServicioDetallePage from './pages/public/ServicioDetallePage';
import Tienda from './pages/public/Tienda';
import Cart from './pages/public/Cart';
import ClienteLogin from './pages/public/ClienteLogin';
import ClientePerfil from './pages/public/ClientePerfil';
import SearchResultsPage from './pages/public/SearchResultsPage';
import VerificacionPendiente from './pages/public/VerificacionPendiente'; // 👈 NUEVO

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
  </div>
);

// Middleware para proteger rutas admin
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin-login" />;
};

// Middleware para proteger rutas de cliente
const ProtectedClienteRoute = ({ children }) => {
  const { isAuthenticated } = useClienteAuth();
  return isAuthenticated ? children : <Navigate to="/cliente/login" />;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* RUTAS PÚBLICAS - Todas con MainLayout */}
        <Route path="/" element={
          <MainLayout>
            <HomeFixed />
          </MainLayout>
        } />
        
        <Route path="/servicios" element={
          <MainLayout>
            <ServiciosPage />
          </MainLayout>
        } />
        
        {/* Ruta dinámica para cada servicio individual */}
        <Route path="/servicio/:id" element={
          <MainLayout>
            <ServicioDetallePage />
          </MainLayout>
        } />
        
        <Route path="/tienda" element={
          <MainLayout>
            <Tienda />
          </MainLayout>
        } />
        
        <Route path="/cart" element={
          <MainLayout>
            <Cart />
          </MainLayout>
        } />
        
        <Route path="/categoria/:category" element={
          <MainLayout>
            <Tienda />
          </MainLayout>
        } />

        {/* Ruta de búsqueda */}
        <Route path="/buscar" element={
          <MainLayout>
            <SearchResultsPage />
          </MainLayout>
        } />

        {/* LOGIN ADMIN - Sin layout (página completa) */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* RUTAS DE CLIENTE */}
        <Route path="/cliente/login" element={<ClienteLogin />} />
        <Route path="/verificacion-pendiente" element={<VerificacionPendiente />} /> {/* 👈 NUEVA RUTA */}
        
        <Route path="/cliente/perfil" element={
          <ProtectedClienteRoute>
            <MainLayout>
              <ClientePerfil />
            </MainLayout>
          </ProtectedClienteRoute>
        } />
        
        <Route path="/cliente/pedidos" element={
          <ProtectedClienteRoute>
            <MainLayout>
              <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4">
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Mis Pedidos</h1>
                  <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <p className="text-gray-500">No tienes pedidos aún</p>
                    <a href="/tienda" className="inline-block mt-4 text-amber-500 hover:text-amber-600">Ir a la tienda</a>
                  </div>
                </div>
              </div>
            </MainLayout>
          </ProtectedClienteRoute>
        } />
        
        <Route path="/cliente/favoritos" element={
          <ProtectedClienteRoute>
            <MainLayout>
              <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4">
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Mis Favoritos</h1>
                  <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <p className="text-gray-500">No tienes favoritos guardados</p>
                    <a href="/tienda" className="inline-block mt-4 text-amber-500 hover:text-amber-600">Explorar productos</a>
                  </div>
                </div>
              </div>
            </MainLayout>
          </ProtectedClienteRoute>
        } />

        {/* RUTAS ADMIN - Con AdminLayout */}
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
          <Route path="services" element={<AdminServices />} />
          <Route path="destinos" element={<AdminDestinos />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>

        {/* 404 - Con MainLayout */}
        <Route path="*" element={
          <MainLayout>
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold mb-4">404</h1>
              <p className="text-xl mb-8">Página no encontrada</p>
              <a href="/" className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600">
                Volver al inicio
              </a>
            </div>
          </MainLayout>
        } />
      </Routes>
      
      {/* WhatsApp Button - visible en todas partes */}
      <WhatsAppButton />
    </Suspense>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <ClienteAuthProvider>
        <AuthProvider>
          <ServicesProvider>
            <DestinosProvider>
              <SearchProvider>
                <CartProvider>
                  <AppRoutes />
                </CartProvider>
              </SearchProvider>
            </DestinosProvider>
          </ServicesProvider>
        </AuthProvider>
      </ClienteAuthProvider>
    </LanguageProvider>
  );
};

export default App;