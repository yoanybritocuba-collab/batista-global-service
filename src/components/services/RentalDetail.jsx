import React from 'react';
import { 
  Car, MapPin, Phone, DollarSign, Users, 
  Shield, CheckCircle, XCircle, Clock, 
  Fuel, Settings, Calendar, Star, TrendingUp,
  Wrench, BadgePercent, CreditCard,
  Plus, X, Trash2  // 👈 IMPORTAMOS PLUS AQUÍ
} from 'lucide-react';

const RentalDetail = ({ data, service }) => {
  const rentalData = {
    sucursales: data?.sucursales || [],
    vehiculos: data?.vehiculos || [],
    tarifas: data?.tarifas || [],
    seguros: data?.seguros || [],
    requisitos: data?.requisitos || [],
    rangosPrecios: {
      economico: data?.rangosPrecios?.economico || 35,
      intermedio: data?.rangosPrecios?.intermedio || 65,
      premium: data?.rangosPrecios?.premium || 120,
      lujo: data?.rangosPrecios?.lujo || 250
    },
    tiposVehiculo: data?.tiposVehiculo || [
      'Económico',
      'Compacto',
      'Sedán',
      'SUV',
      'Camioneta',
      'Deportivo',
      'Lujo'
    ],
    combustibles: data?.combustibles || [
      'Gasolina',
      'Diesel',
      'Híbrido',
      'Eléctrico'
    ],
    extras: data?.extras || [
      'GPS',
      'Silla para niños',
      'Cobertura adicional',
      'Conductor adicional'
    ]
  };

  return (
    <div className="space-y-8">
      {/* Header con rango de precios */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-2">{service?.title || 'Renta de Autos'}</h2>
            <p className="text-blue-100 text-lg">{service?.subtitle || 'La mejor flota del Caribe'}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 text-center">
            <p className="text-sm opacity-90">Desde</p>
            <p className="text-3xl font-bold">${rentalData.rangosPrecios.economico}</p>
            <p className="text-sm opacity-90">Hasta ${rentalData.rangosPrecios.lujo}</p>
          </div>
        </div>
      </div>

      {/* Rango de precios por categoría */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          Tarifas por categoría
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <Car className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <h4 className="font-semibold">Económico</h4>
            <p className="text-2xl font-bold text-green-600">${rentalData.rangosPrecios.economico}</p>
            <p className="text-xs text-gray-500">por día</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-center">
            <Car className="h-8 w-8 mx-auto text-amber-600 mb-2" />
            <h4 className="font-semibold">Intermedio</h4>
            <p className="text-2xl font-bold text-amber-600">${rentalData.rangosPrecios.intermedio}</p>
            <p className="text-xs text-gray-500">por día</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <Car className="h-8 w-8 mx-auto text-orange-600 mb-2" />
            <h4 className="font-semibold">Premium</h4>
            <p className="text-2xl font-bold text-orange-600">${rentalData.rangosPrecios.premium}</p>
            <p className="text-xs text-gray-500">por día</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <Car className="h-8 w-8 mx-auto text-purple-600 mb-2" />
            <h4 className="font-semibold">Lujo</h4>
            <p className="text-2xl font-bold text-purple-600">${rentalData.rangosPrecios.lujo}</p>
            <p className="text-xs text-gray-500">por día</p>
          </div>
        </div>
      </div>

      {/* FLOTA DE VEHÍCULOS CON FOTOS */}
      {rentalData.vehiculos.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Car className="h-6 w-6 text-amber-600" />
            Nuestra Flota - Modelos Disponibles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentalData.vehiculos.map((vehiculo, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow group">
                {/* IMAGEN DEL VEHÍCULO */}
                <div className="relative h-48 bg-gray-100">
                  {vehiculo.imagen ? (
                    <img 
                      src={vehiculo.imagen} 
                      alt={vehiculo.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <Car className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  
                  {/* BADGE DE DISPONIBILIDAD */}
                  <div className="absolute top-3 right-3">
                    {vehiculo.disponible ? (
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                        DISPONIBLE
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                        NO DISPONIBLE
                      </span>
                    )}
                  </div>

                  {/* BADGE DE CATEGORÍA */}
                  {vehiculo.categoria && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
                        {vehiculo.categoria}
                      </span>
                    </div>
                  )}
                </div>

                {/* INFORMACIÓN DEL VEHÍCULO */}
                <div className="p-5">
                  <h4 className="font-bold text-xl text-gray-800 mb-2">{vehiculo.nombre}</h4>
                  
                  {/* PRECIOS */}
                  <div className="mb-3">
                    <p className="text-2xl font-bold text-green-600">
                      ${vehiculo.precioMin} 
                      {vehiculo.precioMax && vehiculo.precioMax > vehiculo.precioMin && (
                        <span className="text-lg text-gray-500 font-normal"> - ${vehiculo.precioMax}</span>
                      )}
                      <span className="text-sm text-gray-500 font-normal ml-1">/día</span>
                    </p>
                  </div>

                  {/* CARACTERÍSTICAS */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    {vehiculo.transmision && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <Settings className="h-4 w-4" />
                        <span>{vehiculo.transmision}</span>
                      </div>
                    )}
                    {vehiculo.combustible && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <Fuel className="h-4 w-4" />
                        <span>{vehiculo.combustible}</span>
                      </div>
                    )}
                    {vehiculo.pasajeros && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{vehiculo.pasajeros} pasajeros</span>
                      </div>
                    )}
                    {vehiculo.aireAcondicionado && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <span>❄️ A/C</span>
                      </div>
                    )}
                  </div>

                  {/* BOTÓN DE RESERVA */}
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Reservar ahora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sucursales */}
      {rentalData.sucursales.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-blue-600" />
            Nuestras Sucursales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rentalData.sucursales.map((suc, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-lg text-gray-800 mb-2">{suc.ciudad}</h4>
                <p className="text-gray-600 text-sm mb-3">{suc.direccion}</p>
                {suc.telefono && (
                  <a href={`tel:${suc.telefono}`} className="text-blue-600 text-sm flex items-center gap-1 hover:underline">
                    <Phone className="h-4 w-4" />
                    {suc.telefono}
                  </a>
                )}
                {suc.horario && (
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {suc.horario}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tarifas por período */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <Clock className="h-8 w-8 text-blue-500 mb-3" />
          <h4 className="font-bold text-gray-800">Tarifa diaria</h4>
          <p className="text-2xl font-bold text-gray-900">${rentalData.rangosPrecios.economico} - ${rentalData.rangosPrecios.lujo}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <Calendar className="h-8 w-8 text-green-500 mb-3" />
          <h4 className="font-bold text-gray-800">Tarifa semanal</h4>
          <p className="text-2xl font-bold text-gray-900">${rentalData.rangosPrecios.economico * 6} - ${rentalData.rangosPrecios.lujo * 6}</p>
          <p className="text-xs text-green-600 mt-1">15% descuento</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <Calendar className="h-8 w-8 text-purple-500 mb-3" />
          <h4 className="font-bold text-gray-800">Tarifa mensual</h4>
          <p className="text-2xl font-bold text-gray-900">${rentalData.rangosPrecios.economico * 25} - ${rentalData.rangosPrecios.lujo * 25}</p>
          <p className="text-xs text-purple-600 mt-1">30% descuento</p>
        </div>
      </div>

      {/* Seguros y Requisitos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rentalData.seguros.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Coberturas disponibles
            </h3>
            <div className="space-y-3">
              {rentalData.seguros.map((seguro, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">{seguro.nombre}</p>
                    {seguro.descripcion && (
                      <p className="text-sm text-gray-600">{seguro.descripcion}</p>
                    )}
                    {seguro.precio && (
                      <p className="text-xs text-green-600 mt-1">+${seguro.precio}/día</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {rentalData.requisitos.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Requisitos para rentar</h3>
            <ul className="space-y-3">
              {rentalData.requisitos.map((req, idx) => (
                <li key={idx} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-amber-600" />
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Extras disponibles */}
      {rentalData.extras.length > 0 && (
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
          <h3 className="text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
            <BadgePercent className="h-5 w-5" />
            Extras disponibles
          </h3>
          <div className="flex flex-wrap gap-2">
            {rentalData.extras.map((extra, idx) => (
              <span key={idx} className="px-3 py-2 bg-white text-amber-700 rounded-lg text-sm shadow-sm flex items-center gap-1">
                <Plus className="h-3 w-3" />
                {extra}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalDetail;