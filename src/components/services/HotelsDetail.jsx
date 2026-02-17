import React from 'react';
import { Hotel, MapPin, Star, Wifi, Coffee, Users, Calendar, DollarSign } from 'lucide-react';

const HotelsDetail = ({ data, service }) => {
  return (
    <div className="space-y-6">
      {/* Destinos Hoteleros */}
      {data.destinos && data.destinos.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-amber-600" />
            Destinos Hoteleros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.destinos.map((destino, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden">
                {destino.imagen && (
                  <img src={destino.imagen} alt={destino.ciudad} className="w-full h-40 object-cover" />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg">{destino.ciudad}, {destino.pais}</h3>
                  <div className="space-y-3 mt-3">
                    {destino.hoteles?.map((hotel, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold">{hotel.nombre}</div>
                            <div className="flex items-center gap-1 text-yellow-500">
                              {[...Array(5)].map((_, s) => (
                                <Star key={s} className={`h-4 w-4 ${s < hotel.estrellas ? 'fill-yellow-500' : 'fill-gray-300'}`} />
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">${hotel.precio}</div>
                            <div className="text-xs text-gray-500">por noche</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {hotel.servicios?.map((serv, s) => (
                            <span key={s} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              {serv}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ofertas */}
      {data.ofertas && data.ofertas.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 shadow-lg text-white">
          <h2 className="text-lg font-bold mb-4">🔥 Ofertas Especiales</h2>
          <div className="space-y-3">
            {data.ofertas.map((oferta, idx) => (
              <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="font-semibold">{oferta.titulo}</div>
                <div className="text-sm opacity-90">{oferta.descripcion}</div>
                <div className="text-xs opacity-75 mt-1">Válido: {oferta.vigencia}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelsDetail;