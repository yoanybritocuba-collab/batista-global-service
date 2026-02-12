import React, { useState } from 'react';
import { Search, Filter, Download, Eye, CheckCircle, XCircle, Truck } from 'lucide-react';

const AdminOrders = () => {
  const [orders] = useState([
    { id: 'ORD-001', customer: 'Juan Pérez', email: 'juan@email.com', total: 149.99, date: '2024-02-10', status: 'Completado', payment: 'Tarjeta' },
    { id: 'ORD-002', customer: 'María García', email: 'maria@email.com', total: 89.50, date: '2024-02-10', status: 'Pendiente', payment: 'PayPal' },
    { id: 'ORD-003', customer: 'Carlos López', email: 'carlos@email.com', total: 299.99, date: '2024-02-09', status: 'Enviado', payment: 'Tarjeta' },
    { id: 'ORD-004', customer: 'Ana Rodríguez', email: 'ana@email.com', total: 45.99, date: '2024-02-09', status: 'Completado', payment: 'Transferencia' },
    { id: 'ORD-005', customer: 'Pedro Martínez', email: 'pedro@email.com', total: 189.99, date: '2024-02-08', status: 'Cancelado', payment: 'Tarjeta' },
    { id: 'ORD-006', customer: 'Laura Sánchez', email: 'laura@email.com', total: 75.25, date: '2024-02-08', status: 'Procesando', payment: 'PayPal' },
    { id: 'ORD-007', customer: 'Roberto Díaz', email: 'roberto@email.com', total: 320.00, date: '2024-02-07', status: 'Enviado', payment: 'Tarjeta' },
    { id: 'ORD-008', customer: 'Sofía Ruiz', email: 'sofia@email.com', total: 55.50, date: '2024-02-07', status: 'Completado', payment: 'PayPal' },
  ]);

  const statusColors = {
    'Completado': 'bg-green-100 text-green-800',
    'Pendiente': 'bg-yellow-100 text-yellow-800',
    'Enviado': 'bg-blue-100 text-blue-800',
    'Procesando': 'bg-purple-100 text-purple-800',
    'Cancelado': 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Órdenes</h1>
        <p className="text-gray-600">Administra y procesa las órdenes de los clientes</p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Órdenes</p>
          <p className="text-2xl font-bold">156</p>
          <p className="text-sm text-green-500">+12% este mes</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Ventas Totales</p>
          <p className="text-2xl font-bold">$12,450</p>
          <p className="text-sm text-green-500">+8% este mes</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Órdenes Pendientes</p>
          <p className="text-2xl font-bold">8</p>
          <p className="text-sm text-yellow-500">Necesitan atención</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Ticket Promedio</p>
          <p className="text-2xl font-bold">$79.81</p>
          <p className="text-sm text-green-500">+5% este mes</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar órdenes..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border rounded-lg">
            <option>Todos los estados</option>
            <option>Completado</option>
            <option>Pendiente</option>
            <option>Enviado</option>
            <option>Cancelado</option>
          </select>
          <input type="date" className="px-4 py-2 border rounded-lg" />
          <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5 mr-2" />
            Filtros
          </button>
        </div>
      </div>

      {/* Tabla de órdenes */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Órdenes Recientes</h2>
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <Download className="w-5 h-5 mr-2" />
            Exportar CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Orden</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pago</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4 font-bold">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{order.payment}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Ver detalles">
                        <Eye className="w-4 h-4" />
                      </button>
                      {order.status === 'Pendiente' && (
                        <>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded" title="Aprobar">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded" title="Rechazar">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {order.status === 'Procesando' && (
                        <button className="p-2 text-purple-600 hover:bg-purple-50 rounded" title="Marcar como enviado">
                          <Truck className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;