import React from 'react';
import { 
  MapPin, Calendar, DollarSign, Star, Clock, 
  Users, Sun, Camera, Coffee, Ship, TreePine,
  CheckCircle, XCircle, TrendingUp, Globe
} from 'lucide-react';

const ToursDetail = ({ data, service }) => {
  // Asegurar que data existe
  const toursData = data || {};
  
  // Extraer datos con valores por defecto
  const destinos = toursData.destinos || [];
  const paquetes = toursData.paquetes || [];
  const ofertas = toursData.ofertas || [];
  const incluye = toursData.incluye || [
    'Transporte ida y vuelta',
    'Guía profesional',
    'Almuerzo típico',
    'Seguro de viaje'
  ];
  const noIncluye = toursData.noIncluye || [
    'Bebidas alcohólicas',
    'Fotografías profesionales',
    'Propinas'
  ];
  const recomendaciones = toursData.recomendaciones || [
    'Ropa cómoda',
    'Bloqueador solar',
    'Cámara fotográfica'
  ];
  const rangosPrecios = toursData.rangosPrecios || {
    minimo: 79,
    maximo: 599
  };

  return (
    <div className="space-y-8">
      {/* Rango de precios general */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl p-6 shadow-lg">
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

      {/* Destinos Turísticos */}
      {destinos.length > 0 && (
        <div className="space-y-6">
          {destinos.map((destino, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              {/* Header del destino */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <MapPin className="h-6 w-6" />
                  {destino.nombre || 'Destino'}
                </h3>
                {destino.descripcion && (
                  <p className="text-amber-100 mt-1">{destino.descripcion}</p>
                )}
              </div>

              {/* Imagen del destino (si existe) */}
              {destino.imagen && (
                <div className="h-64 overflow-hidden">
                  <img 
                    src={destino.imagen} 
                    alt={destino.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Paquetes del destino */}
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-4">Paquetes disponibles</h4>
                <div className="space-y-4">
                  {(destino.paquetes || []).map((paquete, i) => (
                    <div key={i} className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                      <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                        <div>
                          <h5 className="font-bold text-xl text-gray-800">{paquete.nombre || 'Paquete'}</h5>
                          <p className="text-sm text-gray-600">{paquete.duracion}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">{paquete.precio}</p>
                          {paquete.precioRegular && (
                            <p className="text-sm text-gray-400 line-through">{paquete.precioRegular}</p>
                          )}
                        </div>
                      </div>

                      {paquete.descripcion && (
                        <p className="text-gray-700 mb-3">{paquete.descripcion}</p>
                      )}

                      {paquete.hotel && (
                        <p className="text-sm mb-2">
                          <span className="font-medium">Hotel:</span> {paquete.hotel}
                        </p>
                      )}

                      {/* Incluye del paquete */}
                      {paquete.incluye && paquete.incluye.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-2">Incluye:</p>
                          <div className="flex flex-wrap gap-2">
                            {paquete.incluye.map((inc, j) => (
                              <span key={j} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                {inc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Itinerario */}
                      {paquete.itinerario && paquete.itinerario.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-amber-200">
                          <p className="text-sm font-medium mb-2">Itinerario:</p>
                          <div className="space-y-2">
                            {paquete.itinerario.map((item, j) => (
                              <div key={j} className="flex gap-3 text-sm">
                                <span className="font-medium w-16">{item.hora}</span>
                                <span className="text-gray-700">{item.descripcion}</span>
                              </div>
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

      {/* Si no hay destinos pero hay paquetes generales */}
      {destinos.length === 0 && paquetes.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold mb-4">Paquetes disponibles</h3>
          <div className="space-y-4">
            {paquetes.map((paquete, idx) => (
              <div key={idx} className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-lg">{paquete.nombre || 'Paquete'}</h4>
                  <span className="text-xl font-bold text-green-600">{paquete.precio}</span>
                </div>
                <p className="text-gray-700 mb-3">{paquete.descripcion}</p>
                <p className="text-sm text-gray-600">{paquete.duracion}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Qué incluye / No incluye */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Incluye
          </h3>
          <ul className="space-y-3">
            {incluye.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            No incluye
          </h3>
          <ul className="space-y-3">
            {noIncluye.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recomendaciones */}
      {recomendaciones.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
            <Sun className="h-5 w-5" />
            Recomendaciones
          </h3>
          <div className="flex flex-wrap gap-2">
            {recomendaciones.map((rec, idx) => (
              <span key={idx} className="px-3 py-2 bg-white text-blue-700 rounded-lg text-sm shadow-sm">
                {rec}
              </span>
            ))}
          </div>
        </div>
      )}

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
                <p className="text-amber-100">{oferta.descripcion || oferta.texto}</p>
                {oferta.condiciones && (
                  <p className="text-xs text-amber-200 mt-2">{oferta.condiciones}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToursDetail;
