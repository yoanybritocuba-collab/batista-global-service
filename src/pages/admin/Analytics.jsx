import React from 'react';
import { TrendingUp, Users, DollarSign, ShoppingCart, Calendar, Download } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analíticas y Reportes</h1>
          <p className="text-gray-600">Métricas y análisis de rendimiento de tu tienda</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="px-4 py-2 border rounded-lg">
            <option>Últimos 7 días</option>
            <option>Últimos 30 días</option>
            <option>Últimos 3 meses</option>
            <option>Este año</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-5 h-5 mr-2" />
            Exportar Reporte
          </button>
        </div>
      </div>

      {/* Resumen principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Ingresos Totales</p>
              <p className="text-2xl font-bold mt-2">$12,450</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+18.2%</span>
                <span className="text-sm text-gray-500 ml-1">vs mes pasado</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Órdenes Totales</p>
              <p className="text-2xl font-bold mt-2">156</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+12.5%</span>
                <span className="text-sm text-gray-500 ml-1">vs mes pasado</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Clientes Nuevos</p>
              <p className="text-2xl font-bold mt-2">48</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+8.7%</span>
                <span className="text-sm text-gray-500 ml-1">vs mes pasado</span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Ticket Promedio</p>
              <p className="text-2xl font-bold mt-2">$79.81</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+5.4%</span>
                <span className="text-sm text-gray-500 ml-1">vs mes pasado</span>
              </div>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos y datos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de ventas */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Ventas por Día</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-end space-x-2">
            {[40, 65, 80, 60, 75, 90, 85].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Productos más vendidos */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-6">Productos Más Vendidos</h2>
          <div className="space-y-4">
            {[
              { name: 'Smartphone X', sales: 45, revenue: '$13,500' },
              { name: 'Audífonos Bluetooth', sales: 32, revenue: '$2,880' },
              { name: 'Smart Watch Pro', sales: 28, revenue: '$5,600' },
              { name: 'Camiseta Casual', sales: 25, revenue: '$625' },
              { name: 'Zapatos Deportivos', sales: 18, revenue: '$1,440' },
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded mr-3"></div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} unidades</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{product.revenue}</p>
                  <p className="text-sm text-green-500">+{Math.floor(Math.random() * 20) + 5}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Métricas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Dispositivos de Acceso</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span>Móvil</span>
                <span className="font-medium">62%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Desktop</span>
                <span className="font-medium">32%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Tablet</span>
                <span className="font-medium">6%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '6%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Fuentes de Tráfico</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Búsqueda Orgánica</span>
              <span className="font-medium">42%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Redes Sociales</span>
              <span className="font-medium">28%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Marketing por Email</span>
              <span className="font-medium">18%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Directo</span>
              <span className="font-medium">12%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Tasa de Conversión</h3>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-blue-500 mb-4">
              <div className="text-center">
                <p className="text-3xl font-bold">4.2%</p>
                <p className="text-sm text-gray-500">Conversión</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              +0.8% respecto al mes anterior
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;