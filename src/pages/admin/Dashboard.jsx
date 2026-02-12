import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign,
  Package,
  Clock,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  // Datos de ejemplo para métricas
  const metrics = [
    { 
      title: 'Ventas Hoy', 
      value: '$2,850', 
      change: '+12.5%', 
      icon: <DollarSign className="w-6 h-6" />, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Órdenes', 
      value: '48', 
      change: '+8.2%', 
      icon: <ShoppingCart className="w-6 h-6" />, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Visitas', 
      value: '1,240', 
      change: '+5.7%', 
      icon: <Users className="w-6 h-6" />, 
      color: 'bg-purple-500' 
    },
    { 
      title: 'Productos', 
      value: '156', 
      change: '+3.4%', 
      icon: <Package className="w-6 h-6" />, 
      color: 'bg-orange-500' 
    },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'Juan Pérez', amount: '$149.99', status: 'Completado', date: 'Hoy, 10:30' },
    { id: '#ORD-002', customer: 'María García', amount: '$89.50', status: 'Pendiente', date: 'Hoy, 09:15' },
    { id: '#ORD-003', customer: 'Carlos López', amount: '$299.99', status: 'Enviado', date: 'Ayer, 16:45' },
    { id: '#ORD-004', customer: 'Ana Rodríguez', amount: '$45.99', status: 'Completado', date: 'Ayer, 14:20' },
    { id: '#ORD-005', customer: 'Pedro Martínez', amount: '$189.99', status: 'Cancelado', date: '10 Feb' },
  ];

  const lowStockProducts = [
    { name: 'Smartphone X', stock: 3, minStock: 10 },
    { name: 'Audífonos Bluetooth', stock: 5, minStock: 15 },
    { name: 'Cargador USB-C', stock: 2, minStock: 20 },
    { name: 'Fundas iPhone', stock: 8, minStock: 25 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Resumen general y métricas de tu tienda</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{metric.title}</p>
                <p className="text-2xl font-bold mt-2">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">{metric.change}</span>
                  <span className="text-sm text-gray-500 ml-1">vs ayer</span>
                </div>
              </div>
              <div className={`${metric.color} p-3 rounded-lg`}>
                {metric.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dos columnas principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Órdenes recientes */}
        <div className="bg-white rounded-xl shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Órdenes Recientes</h2>
            <p className="text-sm text-gray-500">Últimas 5 órdenes</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{order.amount}</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Completado' ? 'bg-green-100 text-green-800' :
                      order.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Enviado' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-blue-600 hover:bg-blue-50 rounded-lg font-medium">
              Ver todas las órdenes
            </button>
          </div>
        </div>

        {/* Stock bajo y actividad */}
        <div className="space-y-6">
          {/* Alertas de stock */}
          <div className="bg-white rounded-xl shadow">
            <div className="p-6 border-b">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <h2 className="text-lg font-semibold">Stock Bajo</h2>
              </div>
              <p className="text-sm text-gray-500">Productos que necesitan reabastecimiento</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {lowStockProducts.map((product, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">Mínimo: {product.minStock} unidades</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        product.stock < 5 ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {product.stock} unidades
                      </p>
                      <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                        Reabastecer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actividad reciente */}
          <div className="bg-white rounded-xl shadow">
            <div className="p-6 border-b">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-500 mr-2" />
                <h2 className="text-lg font-semibold">Actividad Reciente</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Package className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Nuevo producto agregado</p>
                    <p className="text-sm text-gray-500">"Smart Watch Pro" fue añadido al catálogo</p>
                    <p className="text-xs text-gray-400">Hace 2 horas</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <ShoppingCart className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Orden completada</p>
                    <p className="text-sm text-gray-500">Orden #ORD-001 marcada como completada</p>
                    <p className="text-xs text-gray-400">Hace 4 horas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
            <Package className="w-6 h-6 mx-auto text-gray-600" />
            <p className="mt-2 font-medium">Agregar Producto</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
            <ShoppingCart className="w-6 h-6 mx-auto text-gray-600" />
            <p className="mt-2 font-medium">Crear Orden</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
            <TrendingUp className="w-6 h-6 mx-auto text-gray-600" />
            <p className="mt-2 font-medium">Generar Reporte</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
            <Users className="w-6 h-6 mx-auto text-gray-600" />
            <p className="mt-2 font-medium">Ver Clientes</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;