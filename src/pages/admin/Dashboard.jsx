import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/productService';
import { getOrders } from '../../services/orderService';
import { getAnalytics } from '../../services/analyticsService';
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  Package, 
  TrendingUp, 
  Clock,
  CheckCircle,
  Truck,
  XCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalVisits: 12456,
    totalProducts: 0,
    pendingOrders: 0,
    completedOrders: 0,
    lowStockProducts: 0,
    revenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Cargar productos
      const productsResult = await getProducts();
      // Cargar órdenes
      const ordersResult = await getOrders();
      // Cargar analytics
      const analyticsResult = await getAnalytics();

      if (productsResult.success) {
        const products = productsResult.data;
        const lowStock = products.filter(p => p.stock < 10).length;
        
        setStats(prev => ({
          ...prev,
          totalProducts: products.length,
          lowStockProducts: lowStock
        }));
      }

      if (ordersResult.success) {
        const orders = ordersResult.data;
        const pending = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
        const completed = orders.filter(o => o.status === 'delivered' || o.status === 'completed').length;
        const total = orders.reduce((sum, o) => sum + (o.total || 0), 0);
        
        setStats(prev => ({
          ...prev,
          totalOrders: orders.length,
          pendingOrders: pending,
          completedOrders: completed,
          totalSales: total,
          revenue: total * 0.3 // 30% margen estimado
        }));

        // Últimas 5 órdenes
        setRecentOrders(orders.slice(0, 5));
      }

      if (analyticsResult.success) {
        setStats(prev => ({
          ...prev,
          totalVisits: analyticsResult.data.visits || 12456
        }));
      }

    } catch (error) {
      console.error('Error cargando dashboard:', error);
      toast.error('Error al cargar datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CU', {
      style: 'currency',
      currency: 'CUP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'Pendiente' },
      processing: { color: 'bg-blue-100 text-blue-800', icon: Package, text: 'Procesando' },
      shipped: { color: 'bg-purple-100 text-purple-800', icon: Truck, text: 'Enviado' },
      delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Entregado' },
      cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle, text: 'Cancelado' }
    };
    return statusMap[status] || statusMap.pending;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Bienvenido de nuevo, Administrador</p>
      </div>

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Ventas totales */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-3 py-1.5 rounded-full">
              +12.5%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Ventas Totales</h3>
          <div className="flex items-end justify-between">
            <span className="text-2xl lg:text-3xl font-bold text-gray-900">
              {formatCurrency(stats.totalSales)}
            </span>
            <span className="text-sm text-gray-500">último mes</span>
          </div>
        </div>

        {/* Órdenes totales */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-3 py-1.5 rounded-full">
              +8.2%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Órdenes Totales</h3>
          <div className="flex items-end justify-between">
            <span className="text-2xl lg:text-3xl font-bold text-gray-900">
              {stats.totalOrders}
            </span>
            <span className="text-sm text-gray-500">{stats.pendingOrders} pendientes</span>
          </div>
        </div>

        {/* Visitantes */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-medium text-purple-600 bg-purple-100 px-3 py-1.5 rounded-full">
              +5.3%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Visitantes</h3>
          <div className="flex items-end justify-between">
            <span className="text-2xl lg:text-3xl font-bold text-gray-900">
              {stats.totalVisits.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">este mes</span>
          </div>
        </div>

        {/* Productos */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-medium text-orange-600 bg-orange-100 px-3 py-1.5 rounded-full">
              {stats.lowStockProducts} bajo stock
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Productos</h3>
          <div className="flex items-end justify-between">
            <span className="text-2xl lg:text-3xl font-bold text-gray-900">
              {stats.totalProducts}
            </span>
            <span className="text-sm text-gray-500">en catálogo</span>
          </div>
        </div>
      </div>

      {/* Grid de 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Órdenes recientes */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Órdenes Recientes</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Ver todas
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orden</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order, index) => {
                    const status = getStatusBadge(order.status);
                    const StatusIcon = status.icon;
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">#{order.id?.slice(-6) || `ORD-${index + 1}`}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{order.customer?.name || 'Cliente'}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{formatDate(order.createdAt)}</td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{formatCurrency(order.total)}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${status.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.text}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      No hay órdenes recientes
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resumen de ventas */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Resumen de Ventas</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Ingresos totales</span>
              <span className="font-semibold text-gray-900">{formatCurrency(stats.totalSales)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Órdenes completadas</span>
              <span className="font-semibold text-gray-900">{stats.completedOrders}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Ticket promedio</span>
              <span className="font-semibold text-gray-900">
                {formatCurrency(stats.completedOrders > 0 ? stats.totalSales / stats.completedOrders : 0)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-sm font-medium text-gray-700">Margen estimado</span>
              <span className="font-semibold text-green-600">{formatCurrency(stats.revenue)}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Productos con stock bajo</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Necesitan reabastecimiento</span>
                <span className="font-semibold text-orange-600">{stats.lowStockProducts}</span>
              </div>
              <button className="w-full bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                Ver productos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => window.location.href = '/admin/products/new'}
            className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors group"
          >
            <div className="p-3 bg-white rounded-lg shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Nuevo Producto</span>
          </button>
          
          <button 
            onClick={() => window.location.href = '/admin/orders'}
            className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors group"
          >
            <div className="p-3 bg-white rounded-lg shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Ver Órdenes</span>
          </button>
          
          <button 
            onClick={() => window.location.href = '/admin/products?filter=low-stock'}
            className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors group"
          >
            <div className="p-3 bg-white rounded-lg shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Stock Bajo</span>
          </button>
          
          <button 
            onClick={() => window.location.href = '/admin/analytics'}
            className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors group"
          >
            <div className="p-3 bg-white rounded-lg shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Reportes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;