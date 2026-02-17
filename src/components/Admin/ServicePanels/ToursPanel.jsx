import React, { useState } from 'react';
import { MapPin, Calendar, DollarSign, Plus, X, Trash2, Star } from 'lucide-react';

const ToursPanel = ({ data, onChange }) => {
  const [newDestino, setNewDestino] = useState('');
  const [newPaquete, setNewPaquete] = useState({ duracion: '', hotel: '', precio: '' });
  const [selectedDestino, setSelectedDestino] = useState(null);

  const localData = {
    destinos: data?.destinos || [],
    ofertas: data?.ofertas || []
  };

  const addDestino = () => {
    if (newDestino.trim()) {
      onChange({
        ...localData,
        destinos: [...localData.destinos, { nombre: newDestino.trim(), paquetes: [] }]
      });
      setNewDestino('');
    }
  };

  const addPaquete = () => {
    if (selectedDestino !== null && newPaquete.duracion && newPaquete.precio) {
      const newDestinos = [...localData.destinos];
      newDestinos[selectedDestino].paquetes.push({
        duracion: newPaquete.duracion,
        hotel: newPaquete.hotel || 'No especificado',
        precio: newPaquete.precio
      });
      onChange({ ...localData, destinos: newDestinos });
      setNewPaquete({ duracion: '', hotel: '', precio: '' });
      setSelectedDestino(null);
    }
  };

  const removeDestino = (idx) => {
    onChange({
      ...localData,
      destinos: localData.destinos.filter((_, i) => i !== idx)
    });
  };

  const removePaquete = (destinoIdx, paqueteIdx) => {
    const newDestinos = [...localData.destinos];
    newDestinos[destinoIdx].paquetes = newDestinos[destinoIdx].paquetes.filter((_, i) => i !== paqueteIdx);
    onChange({ ...localData, destinos: newDestinos });
  };

  return (
    <div className="space-y-8">
      {/* DESTINOS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-amber-600" />
            Destinos Turísticos
          </h3>
        </div>
        <div className="p-6">
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newDestino}
              onChange={(e) => setNewDestino(e.target.value)}
              placeholder="Nombre del destino (ej: Punta Cana)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={addDestino}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Agregar Destino
            </button>
          </div>

          <div className="space-y-4">
            {localData.destinos.map((destino, dIdx) => (
              <div key={dIdx} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <h4 className="font-semibold text-lg">{destino.nombre}</h4>
                  <button
                    onClick={() => removeDestino(dIdx)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="p-4">
                  {/* Paquetes existentes */}
                  <div className="space-y-2 mb-4">
                    {destino.paquetes.map((paquete, pIdx) => (
                      <div key={pIdx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{paquete.duracion}</div>
                          <div className="text-sm text-gray-600">{paquete.hotel}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-green-600">{paquete.precio}</span>
                          <button
                            onClick={() => removePaquete(dIdx, pIdx)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {destino.paquetes.length === 0 && (
                      <p className="text-gray-400 text-sm">No hay paquetes para este destino</p>
                    )}
                  </div>

                  {/* Agregar nuevo paquete */}
                  {selectedDestino === dIdx && (
                    <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                      <h5 className="font-medium mb-3">Nuevo Paquete</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <input
                          type="text"
                          placeholder="Duración (ej: 3 días/2 noches)"
                          value={newPaquete.duracion}
                          onChange={(e) => setNewPaquete({ ...newPaquete, duracion: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Hotel"
                          value={newPaquete.hotel}
                          onChange={(e) => setNewPaquete({ ...newPaquete, hotel: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Precio (ej: $450)"
                          value={newPaquete.precio}
                          onChange={(e) => setNewPaquete({ ...newPaquete, precio: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={addPaquete}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Guardar Paquete
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
                      className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Agregar paquete
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

export default ToursPanel;