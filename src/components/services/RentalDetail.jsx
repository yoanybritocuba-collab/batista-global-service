import React from 'react';
import { Car, MapPin, Phone, DollarSign, Users, Shield, CheckCircle } from 'lucide-react';

const RentalDetail = ({ data, service }) => {
  return (
    <div className="space-y-6">
      {/* Sucursales */}
      {data.sucursales && data.sucursales.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-amber-600" />
            Sucursales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.sucursales.map((sucursal, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-lg">{sucursal.ciudad}</h3>
                <p className="text-sm text-gray-600 mt-1">{sucursal.direccion}</p>
                <a href={`tel:${sucursal.telefono}`} className="flex items-center gap-2 mt-2 text-blue-600">
                  <Phone className="h-4 w-4" />
                  {sucursal.telefono}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Marcas y Modelos */}
      {data.marcas && data.marcas.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Car className="h-5 w-5 text-amber-600" />
            Flota Disponible
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.marcas.map((marca, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                <div>
                  <div className="font-semibold">{marca.nombre}</div>
                  <div className="text-sm text-gray-600">${marca.precio}/día</div>
                </div>
                {marca.disponible ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Disponible</span>
                ) : (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">No disponible</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tarifas */}
      {data.tarifas && data.tarifas.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-amber-600" />
            Tarifas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.tarifas.map((tarifa, idx) => (
              <div key={idx} className="p-4 bg-amber-50 rounded-lg text-center">
                <div className="font-semibold">{tarifa.tipo}</div>
                <div className="text-2xl font-bold text-green-600">${tarifa.precio}</div>
                <div className="text-sm text-gray-600 mt-1">{tarifa.descripcion}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Seguros */}
      {data.seguros && data.seguros.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-600" />
            Coberturas Incluidas
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.seguros.map((seguro, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {seguro}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Requisitos */}
      {data.requisitos && data.requisitos.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-amber-600" />
            Requisitos para Rentar
          </h2>
          <ul className="space-y-2">
            {data.requisitos.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RentalDetail;