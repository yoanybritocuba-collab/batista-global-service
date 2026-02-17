import React from 'react';
import { MapPin, DollarSign, Calendar, Star } from 'lucide-react';

const ToursDetail = ({ data, service }) => {
  const toursData = data || {
    destinos: [],
    ofertas: []
  };

  return (
    <div className="space-y-6">
      {toursData.destinos?.length > 0 && (
        <div className="space-y-4">
          {toursData.destinos.map((destino, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-amber-500" />
                {destino.nombre}
              </h2>
              <div className="space-y-3">
                {destino.paquetes?.map((paquete, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">{paquete.duracion}</span>
                      <span className="text-lg font-bold text-green-600">{paquete.precio}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">Hotel: {paquete.hotel}</div>
                    <div className="flex flex-wrap gap-2">
                      {paquete.incluye?.map((inc, j) => (
                        <span key={j} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          {inc}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {toursData.ofertas?.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 shadow-lg text-white">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Star className="h-5 w-5" />
            Ofertas Especiales
          </h2>
          <div className="space-y-3">
            {toursData.ofertas.map((oferta, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="font-semibold">{oferta.nombre}</div>
                <div className="text-sm opacity-90">Descuento: {oferta.descuento}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToursDetail;
