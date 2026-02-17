import React from 'react';
import { Plane, MapPin, Clock, DollarSign } from 'lucide-react';  // ✅ Eliminamos Seat

const FlightsDetail = ({ data, service }) => {
  const flightsData = data || {
    destinos: [],
    tarifasPorClase: []
  };

  return (
    <div className="space-y-6">
      {/* Destinos */}
      {flightsData.destinos?.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Plane className="h-5 w-5 text-amber-600" />
            Destinos Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flightsData.destinos.map((destino, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold">{destino.origen} → {destino.destino}</h3>
                {destino.vuelos?.map((vuelo, i) => (
                  <div key={i} className="mt-2 flex justify-between">
                    <span>{vuelo.aerolinea}</span>
                    <span className="font-bold text-green-600">${vuelo.precio}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tarifas por Clase */}
      {flightsData.tarifasPorClase?.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Tarifas por Clase</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {flightsData.tarifasPorClase.map((item, idx) => (
              <div key={idx} className="p-4 bg-amber-50 rounded-lg text-center">
                <div className="font-semibold">{item.clase}</div>
                <div className="text-2xl font-bold text-green-600">${item.precio}</div>
                <div className="text-sm text-gray-600">Desde ${item.desde}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightsDetail;