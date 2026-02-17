import React, { useState } from 'react';
import { Plus, X, Plane, MapPin, DollarSign } from 'lucide-react';

const FlightsPanel = ({ data, onChange }) => {
  const [newRuta, setNewRuta] = useState({ origen: '', destino: '' });
  const [newVuelo, setNewVuelo] = useState({ aerolinea: '', precio: '', clase: 'Económica' });
  const [selectedRuta, setSelectedRuta] = useState(null);

  const localData = {
    destinos: data?.destinos || [],
    tarifasPorClase: data?.tarifasPorClase || []
  };

  const addRuta = () => {
    if (newRuta.origen && newRuta.destino) {
      onChange({
        ...localData,
        destinos: [...localData.destinos, { ...newRuta, vuelos: [] }]
      });
      setNewRuta({ origen: '', destino: '' });
    }
  };

  const addVuelo = () => {
    if (selectedRuta !== null && newVuelo.aerolinea && newVuelo.precio) {
      const newDestinos = [...localData.destinos];
      newDestinos[selectedRuta].vuelos.push({
        ...newVuelo,
        precio: parseFloat(newVuelo.precio)
      });
      onChange({ ...localData, destinos: newDestinos });
      setNewVuelo({ aerolinea: '', precio: '', clase: 'Económica' });
      setSelectedRuta(null);
    }
  };

  const removeRuta = (idx) => {
    onChange({
      ...localData,
      destinos: localData.destinos.filter((_, i) => i !== idx)
    });
  };

  const removeVuelo = (rutaIdx, vueloIdx) => {
    const newDestinos = [...localData.destinos];
    newDestinos[rutaIdx].vuelos = newDestinos[rutaIdx].vuelos.filter((_, i) => i !== vueloIdx);
    onChange({ ...localData, destinos: newDestinos });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Plane className="h-5 w-5 text-sky-600" />
            Rutas Aéreas
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <input
              type="text"
              placeholder="Origen (ej: Miami - MIA)"
              value={newRuta.origen}
              onChange={(e) => setNewRuta({ ...newRuta, origen: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
            />
            <input
              type="text"
              placeholder="Destino (ej: La Habana - HAV)"
              value={newRuta.destino}
              onChange={(e) => setNewRuta({ ...newRuta, destino: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
            />
            <button
              onClick={addRuta}
              className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Agregar Ruta
            </button>
          </div>

          <div className="space-y-4">
            {localData.destinos.map((ruta, rIdx) => (
              <div key={rIdx} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <h4 className="font-semibold text-lg">{ruta.origen} → {ruta.destino}</h4>
                  <button
                    onClick={() => removeRuta(rIdx)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="p-4">
                  {/* Vuelos existentes */}
                  <div className="space-y-2 mb-4">
                    {ruta.vuelos.map((vuelo, vIdx) => (
                      <div key={vIdx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{vuelo.aerolinea}</div>
                          <div className="text-sm text-gray-600">{vuelo.clase}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-green-600">${vuelo.precio}</span>
                          <button
                            onClick={() => removeVuelo(rIdx, vIdx)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {ruta.vuelos.length === 0 && (
                      <p className="text-gray-400 text-sm">No hay vuelos en esta ruta</p>
                    )}
                  </div>

                  {/* Agregar nuevo vuelo */}
                  {selectedRuta === rIdx && (
                    <div className="mt-4 p-4 bg-sky-50 rounded-lg">
                      <h5 className="font-medium mb-3">Nuevo Vuelo</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <input
                          type="text"
                          placeholder="Aerolínea"
                          value={newVuelo.aerolinea}
                          onChange={(e) => setNewVuelo({ ...newVuelo, aerolinea: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="number"
                          placeholder="Precio $"
                          value={newVuelo.precio}
                          onChange={(e) => setNewVuelo({ ...newVuelo, precio: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <select
                          value={newVuelo.clase}
                          onChange={(e) => setNewVuelo({ ...newVuelo, clase: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="Económica">Económica</option>
                          <option value="Ejecutiva">Ejecutiva</option>
                          <option value="Primera Clase">Primera Clase</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={addVuelo}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Guardar Vuelo
                        </button>
                        <button
                          onClick={() => setSelectedRuta(null)}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedRuta !== rIdx && (
                    <button
                      onClick={() => setSelectedRuta(rIdx)}
                      className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Agregar vuelo
                    </button>
                  )}
                </div>
              </div>
            ))}
            {localData.destinos.length === 0 && (
              <p className="text-center text-gray-400 py-4">No hay rutas configuradas</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightsPanel;