import React from 'react';
import { 
  Plane, MapPin, Clock, DollarSign, Calendar, 
  Users, Briefcase, Award, TrendingUp, Globe,
  Luggage, Coffee, Wifi, Battery, Film,
  CheckCircle, XCircle, Star
} from 'lucide-react';

const FlightsDetail = ({ data, service }) => {
  // Asegurar que data existe
  const flightsData = data || {};
  
  // Extraer datos con valores por defecto
  const rutas = flightsData.rutas || [];
  const clases = flightsData.clases || [];
  const aerolineas = flightsData.aerolineas || [];
  const ofertas = flightsData.ofertas || [];
  const destinosPopulares = flightsData.destinosPopulares || [
    { ciudad: 'Miami', precio: '$250 - $450', vuelos: 12 },
    { ciudad: 'Madrid', precio: '$650 - $950', vuelos: 8 },
    { ciudad: 'Cancún', precio: '$320 - $550', vuelos: 15 }
  ];
  const rangosPrecios = flightsData.rangosPrecios || {
    minimo: 150,
    maximo: 950
  };
  const equipaje = flightsData.equipaje || {
    cabina: '10 kg',
    bodega: '23 kg',
    precioExtra: 35
  };

  return (
    <div className="space-y-8">
      {/* Rango de precios general */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl p-6 shadow-lg">
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

      {/* Rutas aéreas */}
      {rutas.length > 0 && (
        <div className="space-y-6">
          {rutas.map((ruta, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              {/* Header de la ruta */}
              <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white px-6 py-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Plane className="h-6 w-6" />
                  {ruta.origen || 'Origen'} → {ruta.destino || 'Destino'}
                </h3>
                {ruta.duracion && (
                  <p className="text-sky-100 mt-1 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Duración: {ruta.duracion}
                  </p>
                )}
              </div>

              {/* Vuelos de esta ruta */}
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-4">Vuelos disponibles</h4>
                <div className="space-y-4">
                  {(ruta.vuelos || []).map((vuelo, i) => (
                    <div key={i} className="bg-sky-50 rounded-xl p-5 border border-sky-200 hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap justify-between items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h5 className="font-bold text-xl text-gray-800">{vuelo.aerolinea}</h5>
                            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">
                              {vuelo.clase || 'Económica'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            {vuelo.horario && (
                              <div className="flex items-center gap-1 text-gray-600">
                                <Clock className="h-4 w-4" />
                                <span>{vuelo.horario}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1 text-gray-600">
                              <Luggage className="h-4 w-4" />
                              <span>{vuelo.equipaje || equipaje.bodega}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Coffee className="h-4 w-4" />
                              <span>{vuelo.comida || 'Incluida'}</span>
                            </div>
                            {vuelo.escalas && (
                              <div className="flex items-center gap-1 text-gray-600">
                                <span className="font-medium">Escalas:</span>
                                <span>{vuelo.escalas}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">
                            ${vuelo.precioMin || vuelo.precio || 0}
                          </p>
                          {vuelo.precioMax && (
                            <p className="text-sm text-gray-500">
                              hasta ${vuelo.precioMax}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Beneficios adicionales */}
                      {vuelo.beneficios && vuelo.beneficios.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-sky-200">
                          <div className="flex flex-wrap gap-2">
                            {vuelo.beneficios.map((ben, j) => (
                              <span key={j} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                {ben}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Clases y tarifas */}
      {clases.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award className="h-6 w-6 text-amber-600" />
            Clases y Tarifas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {clases.map((clase, idx) => (
              <div key={idx} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
                <h4 className="font-bold text-lg text-gray-800 mb-2">{clase.nombre}</h4>
                <p className="text-2xl font-bold text-green-600 mb-2">{clase.precio}</p>
                <p className="text-sm text-gray-600 mb-3">{clase.descripcion}</p>
                {clase.beneficios && clase.beneficios.length > 0 && (
                  <ul className="space-y-2 text-sm">
                    {clase.beneficios.map((ben, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Destinos populares */}
      {destinosPopulares.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Globe className="h-6 w-6 text-amber-600" />
            Destinos Populares
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {destinosPopulares.map((dest, idx) => (
              <div key={idx} className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-4 border border-sky-200">
                <h4 className="font-bold text-lg text-gray-800 mb-1">{dest.ciudad}</h4>
                <p className="text-green-600 font-bold">{dest.precio}</p>
                {dest.vuelos && (
                  <p className="text-xs text-gray-500 mt-1">{dest.vuelos} vuelos diarios</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Aerolíneas */}
      {aerolineas.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold mb-3">Aerolíneas disponibles</h3>
          <div className="flex flex-wrap gap-2">
            {aerolineas.map((aero, idx) => (
              <span key={idx} className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
                {aero}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Políticas de equipaje */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Política de Equipaje
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4">
            <p className="text-sm text-gray-600">Equipaje de cabina</p>
            <p className="text-xl font-bold">{equipaje.cabina}</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <p className="text-sm text-gray-600">Equipaje en bodega</p>
            <p className="text-xl font-bold">{equipaje.bodega}</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <p className="text-sm text-gray-600">Kg extra</p>
            <p className="text-xl font-bold">${equipaje.precioExtra}</p>
          </div>
        </div>
      </div>

      {/* Ofertas especiales */}
      {ofertas.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Star className="h-5 w-5" />
            Ofertas Especiales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ofertas.map((oferta, idx) => (
              <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <h4 className="font-bold text-lg">{oferta.nombre || 'Oferta'}</h4>
                <p className="text-amber-100">{oferta.descripcion}</p>
                {oferta.vigencia && (
                  <p className="text-xs text-amber-200 mt-2">Válido: {oferta.vigencia}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightsDetail;