import React from 'react';
import { Package, Scale, Clock, MapPin, DollarSign, CheckCircle, XCircle } from 'lucide-react';

const ShippingDetail = ({ data, service }) => {
  const shippingData = data || {
    productosPermitidos: [],
    productosRestringidos: [],
    tarifasPorPeso: [],
    tarifasExpress: [],
    destinos: []
  };

  return (
    <div className="space-y-6">
      {shippingData.productosPermitidos?.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-green-600" />
            Productos Permitidos
          </h2>
          <div className="flex flex-wrap gap-2">
            {shippingData.productosPermitidos.map((item, index) => (
              <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {shippingData.productosRestringidos?.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            Productos Restringidos
          </h2>
          <div className="flex flex-wrap gap-2">
            {shippingData.productosRestringidos.map((item, index) => (
              <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {shippingData.tarifasPorPeso?.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-amber-600" />
            Tarifas por Peso
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Peso</th>
                  <th className="text-left py-2">Precio</th>
                  <th className="text-left py-2">Tiempo</th>
                </tr>
              </thead>
              <tbody>
                {shippingData.tarifasPorPeso.map((item, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3">{item.peso}</td>
                    <td className="py-3 font-semibold text-green-600"></td>
                    <td className="py-3 text-gray-600">{item.tiempo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {shippingData.tarifasExpress?.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-600" />
            Servicio Express
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Peso</th>
                  <th className="text-left py-2">Precio</th>
                </tr>
              </thead>
              <tbody>
                {shippingData.tarifasExpress.map((item, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3">{item.peso}</td>
                    <td className="py-3 font-semibold text-green-600"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {shippingData.destinos?.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-amber-600" />
            Destinos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {shippingData.destinos.map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-semibold">{item.pais}</div>
                <div className="text-sm text-gray-600">Tarifa base: </div>
                <div className="text-sm text-gray-600">Tiempo: {item.tiempoEstimado}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingDetail;
