import React, { useState } from 'react';
import { Plus, X, Hotel, MapPin, Star, DollarSign } from 'lucide-react';

const HotelsPanel = ({ data, onChange }) => {
  const [newDestino, setNewDestino] = useState({ ciudad: '', pais: '' });
  const [newHotel, setNewHotel] = useState({ nombre: '', precio: '', estrellas: 4 });
  const [selectedDestino, setSelectedDestino] = useState(null);

  const localData = {
    destinos: data?.destinos || []
  };

  const addDestino = () => {
    if (newDestino.ciudad) {
      onChange({
        ...localData,
        destinos: [...localData.destinos, { ...newDestino, hoteles: [] }]
      });
      setNewDestino({ ciudad: '', pais: '' });
    }
  };

  const addHotel = () => {
    if (selectedDestino !== null && newHotel.nombre && newHotel.precio) {
      const newDestinos = [...localData.destinos];
      newDestinos[selectedDestino].hoteles.push({
        ...newHotel,
        precio: parseFloat(newHotel.precio)
      });
      onChange({ ...localData, destinos: newDestinos });
      setNewHotel({ nombre: '', precio: '', estrellas: 4 });
      setSelectedDestino(null);
    }
  };

  const removeDestino = (idx) => {
    onChange({
      ...localData,
      destinos: localData.destinos.filter((_, i) => i !== idx)
    });
  };

  const removeHotel = (destinoIdx, hotelIdx) => {
    const newDestinos = [...localData.destinos];
    newDestinos[destinoIdx].hoteles = newDestinos[destinoIdx].hoteles.filter((_, i) => i !== hotelIdx);
    onChange({ ...localData, destinos: newDestinos });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-purple-600" />
            Destinos Hoteleros
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <input
              type="text"
              placeholder="Ciudad"
              value={newDestino.ciudad}
              onChange={(e) => setNewDestino({ ...newDestino, ciudad: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="País"
              value={newDestino.pais}
              onChange={(e) => setNewDestino({ ...newDestino, pais: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={addDestino}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Agregar Destino
            </button>
          </div>

          <div className="space-y-4">
            {localData.destinos.map((destino, dIdx) => (
              <div key={dIdx} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <h4 className="font-semibold text-lg">{destino.ciudad}, {destino.pais}</h4>
                  <button
                    onClick={() => removeDestino(dIdx)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="p-4">
                  {/* Hoteles existentes */}
                  <div className="space-y-2 mb-4">
                    {destino.hoteles.map((hotel, hIdx) => (
                      <div key={hIdx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{hotel.nombre}</div>
                          <div className="flex items-center gap-1 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < hotel.estrellas ? 'fill-yellow-500' : 'fill-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-green-600">${hotel.precio}/noche</span>
                          <button
                            onClick={() => removeHotel(dIdx, hIdx)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {destino.hoteles.length === 0 && (
                      <p className="text-gray-400 text-sm">No hay hoteles en este destino</p>
                    )}
                  </div>

                  {/* Agregar nuevo hotel */}
                  {selectedDestino === dIdx && (
                    <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                      <h5 className="font-medium mb-3">Nuevo Hotel</h5>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                        <input
                          type="text"
                          placeholder="Nombre del hotel"
                          value={newHotel.nombre}
                          onChange={(e) => setNewHotel({ ...newHotel, nombre: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="number"
                          placeholder="Precio por noche $"
                          value={newHotel.precio}
                          onChange={(e) => setNewHotel({ ...newHotel, precio: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <select
                          value={newHotel.estrellas}
                          onChange={(e) => setNewHotel({ ...newHotel, estrellas: parseInt(e.target.value) })}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="5">5 Estrellas</option>
                          <option value="4">4 Estrellas</option>
                          <option value="3">3 Estrellas</option>
                          <option value="2">2 Estrellas</option>
                          <option value="1">1 Estrella</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={addHotel}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Guardar Hotel
                        </button>
                        <button
                          onClick={() => setSelectedDestino(null)}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedDestino !== dIdx && (
                    <button
                      onClick={() => setSelectedDestino(dIdx)}
                      className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Agregar hotel
                    </button>
                  )}
                </div>
              </div>
            ))}
            {localData.destinos.length === 0 && (
              <p className="text-center text-gray-400 py-4">No hay destinos configurados</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelsPanel;