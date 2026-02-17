import React, { useState } from 'react';
import { Hotel, MapPin, Star, Wifi, Coffee, Plus, X, Trash2 } from 'lucide-react';

const HotelsPanel = ({ data, onChange }) => {
  const [newDestino, setNewDestino] = useState({ ciudad: '', pais: '' });
  const [newHotel, setNewHotel] = useState({ nombre: '', precioMin: '', precioMax: '', estrellas: 4 });
  const [selectedDestino, setSelectedDestino] = useState(null);

  const localData = {
    destinos: data?.destinos || [],
    serviciosGenerales: data?.serviciosGenerales || ['WiFi', 'Desayuno', 'Piscina'],
    politicas: data?.politicas || { checkIn: '15:00', checkOut: '12:00' }
  };

  const addDestino = () => {
    if (newDestino.ciudad) {
      onChange({ ...localData, destinos: [...localData.destinos, { ...newDestino, hoteles: [] }] });
      setNewDestino({ ciudad: '', pais: '' });
    }
  };

  const addHotel = () => {
    if (selectedDestino !== null && newHotel.nombre && newHotel.precioMin) {
      const newDestinos = [...localData.destinos];
      newDestinos[selectedDestino].hoteles.push({
        ...newHotel,
        precioMin: parseFloat(newHotel.precioMin),
        precioMax: parseFloat(newHotel.precioMax) || parseFloat(newHotel.precioMin) * 1.5
      });
      onChange({ ...localData, destinos: newDestinos });
      setNewHotel({ nombre: '', precioMin: '', precioMax: '', estrellas: 4 });
      setSelectedDestino(null);
    }
  };

  const removeDestino = (idx) => {
    onChange({ ...localData, destinos: localData.destinos.filter((_, i) => i !== idx) });
  };

  const removeHotel = (destinoIdx, hotelIdx) => {
    const newDestinos = [...localData.destinos];
    newDestinos[destinoIdx].hoteles = newDestinos[destinoIdx].hoteles.filter((_, i) => i !== hotelIdx);
    onChange({ ...localData, destinos: newDestinos });
  };

  const removeItem = (type, index) => {
    onChange({ ...localData, [type]: localData[type].filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2"><Hotel className="h-5 w-5" /> Destinos Hoteleros</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input type="text" placeholder="Ciudad" value={newDestino.ciudad} onChange={(e) => setNewDestino({ ...newDestino, ciudad: e.target.value })} className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60" />
          <input type="text" placeholder="País" value={newDestino.pais} onChange={(e) => setNewDestino({ ...newDestino, pais: e.target.value })} className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60" />
          <button onClick={addDestino} className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50"><Plus className="h-4 w-4" /></button>
        </div>
      </div>

      {localData.destinos.map((destino, dIdx) => (
        <div key={dIdx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
            <h4 className="font-bold text-lg"><MapPin className="h-4 w-4 inline mr-2 text-purple-600" /> {destino.ciudad}, {destino.pais}</h4>
            <button onClick={() => removeDestino(dIdx)}><Trash2 className="h-4 w-4 text-red-500" /></button>
          </div>
          <div className="p-4">
            {destino.hoteles.map((hotel, hIdx) => (
              <div key={hIdx} className="bg-purple-50 rounded-lg p-4 mb-3 flex justify-between items-center">
                <div>
                  <span className="font-semibold">{hotel.nombre}</span>
                  <span className="ml-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (<Star key={i} className={`h-4 w-4 ${i < hotel.estrellas ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />))}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-600 font-bold">${hotel.precioMin} - ${hotel.precioMax}</span>
                  <button onClick={() => removeHotel(dIdx, hIdx)}><X className="h-4 w-4 text-red-500" /></button>
                </div>
              </div>
            ))}
            {selectedDestino === dIdx ? (
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                  <input type="text" placeholder="Nombre" value={newHotel.nombre} onChange={(e) => setNewHotel({ ...newHotel, nombre: e.target.value })} className="px-3 py-2 border rounded-lg" />
                  <input type="number" placeholder="Mínimo $" value={newHotel.precioMin} onChange={(e) => setNewHotel({ ...newHotel, precioMin: e.target.value })} className="px-3 py-2 border rounded-lg" />
                  <input type="number" placeholder="Máximo $" value={newHotel.precioMax} onChange={(e) => setNewHotel({ ...newHotel, precioMax: e.target.value })} className="px-3 py-2 border rounded-lg" />
                  <select value={newHotel.estrellas} onChange={(e) => setNewHotel({ ...newHotel, estrellas: parseInt(e.target.value) })} className="px-3 py-2 border rounded-lg">
                    <option value="5">5 Estrellas</option><option value="4">4 Estrellas</option><option value="3">3 Estrellas</option><option value="2">2 Estrellas</option><option value="1">1 Estrella</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button onClick={addHotel} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Guardar</button>
                  <button onClick={() => setSelectedDestino(null)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Cancelar</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setSelectedDestino(dIdx)} className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"><Plus className="h-4 w-4" /> Agregar hotel</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelsPanel;