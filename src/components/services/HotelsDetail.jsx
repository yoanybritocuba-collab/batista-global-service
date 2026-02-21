import React from 'react';
import { 
  Hotel, MapPin, Star, Wifi, Coffee, Users, 
  Calendar, DollarSign, Sparkles, CheckCircle,
  Waves, Utensils, Car, Dumbbell, Briefcase,
  TrendingUp, Sun, Moon
} from 'lucide-react';

const HotelsDetail = ({ data, service }) => {
  const hotelsData = {
    destinos: data?.destinos || [],
    hoteles: data?.hoteles || [],
    ofertas: data?.ofertas || [],
    rangosPrecios: {
      economico: data?.rangosPrecios?.economico || 80,
      intermedio: data?.rangosPrecios?.intermedio || 150,
      premium: data?.rangosPrecios?.premium || 280,
      lujo: data?.rangosPrecios?.lujo || 500
    },
    categorias: data?.categorias || [
      'Económico',
      '3 Estrellas',
      '4 Estrellas',
      '5 Estrellas',
      'Boutique',
      'Todo incluido'
    ],
    servicios: data?.servicios || [
      'WiFi gratis',
      'Desayuno incluido',
      'Piscina',
      'Gimnasio',
      'Spa',
      'Restaurante',
      'Estacionamiento',
      'Recepción 24h'
    ],
    politicas: {
      checkIn: data?.politicas?.checkIn || '15:00',
      checkOut: data?.politicas?.checkOut || '12:00',
      cancelacion: data?.politicas?.cancelacion || '24 horas antes sin cargo'
    }
  };

  return (
    <div className="space-y-8">
      {/* Header con rango de precios */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8 shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-2">{service?.title || 'Reservas de Hoteles'}</h2>
            <p className="text-purple-100 text-lg">{service?.subtitle || 'Los mejores hoteles del Caribe'}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 text-center">
            <p className="text-sm opacity-90">Desde</p>
            <p className="text-3xl font-bold">${hotelsData.rangosPrecios.economico}</p>
            <p className="text-sm opacity-90">Hasta ${hotelsData.rangosPrecios.lujo}</p>
          </div>
        </div>
      </div>

      {/* Rango de precios por categoría */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-purple-600" />
          Precios por noche según categoría
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <Hotel className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <h4 className="font-semibold">Económico</h4>
            <p className="text-2xl font-bold text-green-600">$${hotelsData.rangosPrecios.economico}</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-center">
            <Hotel className="h-8 w-8 mx-auto text-amber-600 mb-2" />
            <h4 className="font-semibold">3 Estrellas</h4>
            <p className="text-2xl font-bold text-amber-600">$${hotelsData.rangosPrecios.intermedio}</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <Hotel className="h-8 w-8 mx-auto text-orange-600 mb-2" />
            <h4 className="font-semibold">4 Estrellas</h4>
            <p className="text-2xl font-bold text-orange-600">$${hotelsData.rangosPrecios.premium}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <Hotel className="h-8 w-8 mx-auto text-purple-600 mb-2" />
            <h4 className="font-semibold">5 Estrellas</h4>
            <p className="text-2xl font-bold text-purple-600">$${hotelsData.rangosPrecios.lujo}</p>
          </div>
        </div>
      </div>

      {/* Destinos y Hoteles */}
      {hotelsData.destinos.length > 0 && (
        <div className="space-y-6">
          {hotelsData.destinos.map((destino, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  {destino.ciudad}, {destino.pais}
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {destino.hoteles?.map((hotel, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-lg text-gray-800">{hotel.nombre}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, s) => (
                            <Star key={s} className={`h-4 w-4 ${s < hotel.estrellas ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-2xl font-bold text-green-600 mb-3">
                        ${hotel.precio}
                        <span className="text-sm text-gray-500 font-normal">/noche</span>
                      </p>

                      {hotel.precioRango && (
                        <p className="text-sm text-gray-600 mb-2">
                          Rango: ${hotel.precioRango.min} - ${hotel.precioRango.max}
                        </p>
                      )}

                      {/* Servicios del hotel */}
                      {hotel.servicios?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {hotel.servicios.slice(0, 4).map((serv, j) => (
                            <span key={j} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full flex items-center gap-1">
                              {serv === 'WiFi' && <Wifi className="h-3 w-3" />}
                              {serv === 'Desayuno' && <Coffee className="h-3 w-3" />}
                              {serv === 'Piscina' && <Waves className="h-3 w-3" />}
                              {serv === 'Restaurante' && <Utensils className="h-3 w-3" />}
                              {serv}
                            </span>
                          ))}
                          {hotel.servicios.length > 4 && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                              +{hotel.servicios.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      <button className="w-full mt-2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                        Ver disponibilidad
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Servicios generales */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Servicios disponibles en nuestros hoteles</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {hotelsData.servicios.map((servicio, idx) => (
            <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              {servicio === 'WiFi gratis' && <Wifi className="h-4 w-4 text-blue-500" />}
              {servicio === 'Desayuno incluido' && <Coffee className="h-4 w-4 text-amber-500" />}
              {servicio === 'Piscina' && <Waves className="h-4 w-4 text-blue-500" />}
              {servicio === 'Gimnasio' && <Dumbbell className="h-4 w-4 text-green-500" />}
              {servicio === 'Spa' && <Sparkles className="h-4 w-4 text-purple-500" />}
              {servicio === 'Restaurante' && <Utensils className="h-4 w-4 text-orange-500" />}
              {servicio === 'Estacionamiento' && <Car className="h-4 w-4 text-gray-500" />}
              {servicio === 'Recepción 24h' && <Clock className="h-4 w-4 text-blue-500" />}
              <span className="text-sm">{servicio}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Políticas del hotel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <Sun className="h-8 w-8 text-amber-500 mb-3" />
          <h4 className="font-bold text-gray-800">Check-in</h4>
          <p className="text-2xl font-bold text-gray-900">{hotelsData.politicas.checkIn}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <Moon className="h-8 w-8 text-indigo-500 mb-3" />
          <h4 className="font-bold text-gray-800">Check-out</h4>
          <p className="text-2xl font-bold text-gray-900">{hotelsData.politicas.checkOut}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <Calendar className="h-8 w-8 text-red-500 mb-3" />
          <h4 className="font-bold text-gray-800">Cancelación</h4>
          <p className="text-sm text-gray-900">{hotelsData.politicas.cancelacion}</p>
        </div>
      </div>

      {/* Ofertas */}
      {hotelsData.ofertas.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Ofertas Especiales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotelsData.ofertas.map((oferta, idx) => (
              <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <h4 className="font-bold text-lg">{oferta.titulo}</h4>
                <p className="text-amber-100 text-sm">{oferta.descripcion}</p>
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

export default HotelsDetail;
