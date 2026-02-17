import React, { useState } from 'react';
import { Package, Scale, MapPin, Clock, DollarSign, Plus, X, Trash2, TrendingUp } from 'lucide-react';

const ShippingPanel = ({ data, onChange }) => {
  const [newProduct, setNewProduct] = useState('');
  const [newTarifa, setNewTarifa] = useState({ peso: '', precioMin: '', precioMax: '', tiempo: '' });
  const [newDestino, setNewDestino] = useState({ pais: '', precioMin: '', precioMax: '', tiempo: '' });

  const localData = {
    rangosPrecios: data?.rangosPrecios || { minimo: 15, maximo: 250 },
    productosPermitidos: data?.productosPermitidos || [],
    productosRestringidos: data?.productosRestringidos || [],
    tarifas: data?.tarifas || [],
    destinos: data?.destinos || [],
    tiempos: data?.tiempos || { nacional: '2-4 días', internacional: '5-10 días', express: '24-48h' }
  };

  const addProducto = () => {
    if (newProduct.trim()) {
      onChange({ ...localData, productosPermitidos: [...localData.productosPermitidos, newProduct.trim()] });
      setNewProduct('');
    }
  };

  const addTarifa = () => {
    if (newTarifa.peso && newTarifa.precioMin) {
      onChange({
        ...localData,
        tarifas: [...localData.tarifas, { ...newTarifa, precioMin: parseFloat(newTarifa.precioMin), precioMax: parseFloat(newTarifa.precioMax) || parseFloat(newTarifa.precioMin) * 1.5 }]
      });
      setNewTarifa({ peso: '', precioMin: '', precioMax: '', tiempo: '' });
    }
  };

  const addDestino = () => {
    if (newDestino.pais) {
      onChange({
        ...localData,
        destinos: [...localData.destinos, { ...newDestino, precioMin: parseFloat(newDestino.precioMin) || 25, precioMax: parseFloat(newDestino.precioMax) || 50 }]
      });
      setNewDestino({ pais: '', precioMin: '', precioMax: '', tiempo: '' });
    }
  };

  const removeItem = (type, index) => {
    onChange({ ...localData, [type]: localData[type].filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2"><TrendingUp className="h-5 w-5" /> Rango de Precios</h4>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-sm opacity-90 block mb-1">Mínimo ($)</label><input type="number" value={localData.rangosPrecios.minimo} onChange={(e) => onChange({ ...localData, rangosPrecios: { ...localData.rangosPrecios, minimo: parseFloat(e.target.value) } })} className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white" /></div>
          <div><label className="text-sm opacity-90 block mb-1">Máximo ($)</label><input type="number" value={localData.rangosPrecios.maximo} onChange={(e) => onChange({ ...localData, rangosPrecios: { ...localData.rangosPrecios, maximo: parseFloat(e.target.value) } })} className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white" /></div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2"><Package className="h-5 w-5 text-green-600" /> Productos Permitidos</h4>
        <div className="flex gap-2 mb-4">
          <input type="text" value={newProduct} onChange={(e) => setNewProduct(e.target.value)} placeholder="Ej: Electrónicos, Ropa..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" />
          <button onClick={addProducto} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"><Plus className="h-4 w-4" /></button>
        </div>
        <div className="flex flex-wrap gap-2">
          {localData.productosPermitidos.map((item, idx) => (
            <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2">
              {item} <button onClick={() => removeItem('productosPermitidos', idx)}><X className="h-3 w-3 text-red-500" /></button>
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2"><Scale className="h-5 w-5 text-amber-600" /> Tarifas por Peso</h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
          <input type="text" placeholder="Peso" value={newTarifa.peso} onChange={(e) => setNewTarifa({ ...newTarifa, peso: e.target.value })} className="px-3 py-2 border rounded-lg" />
          <input type="number" placeholder="Mínimo $" value={newTarifa.precioMin} onChange={(e) => setNewTarifa({ ...newTarifa, precioMin: e.target.value })} className="px-3 py-2 border rounded-lg" />
          <input type="number" placeholder="Máximo $" value={newTarifa.precioMax} onChange={(e) => setNewTarifa({ ...newTarifa, precioMax: e.target.value })} className="px-3 py-2 border rounded-lg" />
          <input type="text" placeholder="Tiempo" value={newTarifa.tiempo} onChange={(e) => setNewTarifa({ ...newTarifa, tiempo: e.target.value })} className="px-3 py-2 border rounded-lg" />
          <button onClick={addTarifa} className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"><Plus className="h-4 w-4" /></button>
        </div>
        <div className="space-y-2">
          {localData.tarifas.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium w-24">{item.peso}</span>
              <span className="text-green-600 font-semibold w-32">${item.precioMin} - ${item.precioMax}</span>
              <span className="text-gray-600 w-32">{item.tiempo}</span>
              <button onClick={() => removeItem('tarifas', idx)}><Trash2 className="h-4 w-4 text-red-500" /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2"><MapPin className="h-5 w-5 text-blue-600" /> Destinos</h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
          <input type="text" placeholder="País" value={newDestino.pais} onChange={(e) => setNewDestino({ ...newDestino, pais: e.target.value })} className="px-3 py-2 border rounded-lg" />
          <input type="number" placeholder="Mínimo $" value={newDestino.precioMin} onChange={(e) => setNewDestino({ ...newDestino, precioMin: e.target.value })} className="px-3 py-2 border rounded-lg" />
          <input type="number" placeholder="Máximo $" value={newDestino.precioMax} onChange={(e) => setNewDestino({ ...newDestino, precioMax: e.target.value })} className="px-3 py-2 border rounded-lg" />
          <input type="text" placeholder="Tiempo" value={newDestino.tiempo} onChange={(e) => setNewDestino({ ...newDestino, tiempo: e.target.value })} className="px-3 py-2 border rounded-lg" />
          <button onClick={addDestino} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Plus className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {localData.destinos.map((item, idx) => (
            <div key={idx} className="relative bg-gray-50 rounded-lg p-4 border group">
              <button onClick={() => removeItem('destinos', idx)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"><X className="h-4 w-4 text-red-500" /></button>
              <h5 className="font-bold">{item.pais}</h5>
              <p className="text-sm text-green-600">${item.precioMin} - ${item.precioMax}</p>
              <p className="text-sm text-gray-600">{item.tiempo}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2"><Clock className="h-5 w-5 text-purple-600" /> Tiempos de Entrega</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Nacional</label><input type="text" value={localData.tiempos.nacional} onChange={(e) => onChange({ ...localData, tiempos: { ...localData.tiempos, nacional: e.target.value } })} className="w-full px-4 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Internacional</label><input type="text" value={localData.tiempos.internacional} onChange={(e) => onChange({ ...localData, tiempos: { ...localData.tiempos, internacional: e.target.value } })} className="w-full px-4 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Express</label><input type="text" value={localData.tiempos.express} onChange={(e) => onChange({ ...localData, tiempos: { ...localData.tiempos, express: e.target.value } })} className="w-full px-4 py-2 border rounded-lg" /></div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPanel;