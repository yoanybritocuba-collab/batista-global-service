import React from 'react';
import { Package, Scale, Clock, MapPin, DollarSign, CheckCircle, XCircle, Truck, Globe, TrendingUp } from 'lucide-react';

const ShippingDetail = ({ data, service }) => {
  // Asegurar que data existe
  const shippingData = data || {};
  
  // Extraer datos con valores por defecto
  const productosPermitidos = shippingData.productosPermitidos || [];
  const productosRestringidos = shippingData.productosRestringidos || [];
  const tarifas = shippingData.tarifas || [];
  const destinos = shippingData.destinos || [];
  const rangosPrecios = shippingData.rangosPrecios || { minimo: 15, maximo: 250 };
  const tiempos = shippingData.tiempos || { nacional: '2-4 días', internacional: '5-10 días', express: '24-48h' };
  const seguros = shippingData.seguros || [];

  return (
    <div className="space-y-8">
      {/* Rango de precios general */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          Rango de Precios
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm opacity-90">Desde</p>
            <p className="text-3xl font-bold">${rangosPrecios.minimo}</p>
          </div>
          <div className="text-center">
            <p className="text-sm opacity-90">Hasta</p>
            <p className="text-3xl font-bold">${rangosPrecios.maximo}</p>
          </div>
        </div>
      </div>

      {/* Productos Permitidos */}
      {productosPermitidos.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-green-600" />
            Productos Permitidos
          </h3>
          <div className="flex flex-wrap gap-2">
            {productosPermitidos.map((item, index) => (
              <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Productos Restringidos */}
      {productosRestringidos.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            Productos Restringidos
          </h3>
          <div className="flex flex-wrap gap-2">
            {productosRestringidos.map((item, index) => (
              <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tarifas por Peso */}
      {tarifas.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-amber-600" />
            Tarifas por Peso
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Peso</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Precio</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tiempo</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {tarifas.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{item.peso || 'N/A'}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">
                      ${item.precioMin || item.precio || 0} - ${item.precioMax || item.precio || 0}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{item.tiempo || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Destinos */}
      {destinos.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Destinos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {destinos.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-bold text-lg mb-2">{item.pais || 'N/A'}</h4>
                <div className="space-y-1 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Tarifa:</span>
                    <span className="font-semibold text-green-600">
                      ${item.precioMin || item.tarifaBase || 0} - ${item.precioMax || item.tarifaBase || 0}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Tiempo:</span>
                    <span>{item.tiempo || item.tiempoEstimado || 'N/A'}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tiempos de entrega */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <Clock className="h-6 w-6 text-blue-500 mb-2" />
          <h4 className="font-semibold">Nacional</h4>
          <p className="text-lg font-bold">{tiempos.nacional}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <Globe className="h-6 w-6 text-green-500 mb-2" />
          <h4 className="font-semibold">Internacional</h4>
          <p className="text-lg font-bold">{tiempos.internacional}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <Truck className="h-6 w-6 text-amber-500 mb-2" />
          <h4 className="font-semibold">Express</h4>
          <p className="text-lg font-bold">{tiempos.express}</p>
        </div>
      </div>

      {/* Seguros */}
      {seguros.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Seguros disponibles
          </h3>
          <div className="space-y-2">
            {seguros.map((seguro, index) => (
              <div key={index} className="bg-white rounded-lg p-3">
                <p className="font-medium">{seguro.nombre || seguro}</p>
                {seguro.descripcion && <p className="text-sm text-gray-600">{seguro.descripcion}</p>}
                {seguro.precio && <p className="text-xs text-green-600 mt-1">+${seguro.precio}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingDetail;