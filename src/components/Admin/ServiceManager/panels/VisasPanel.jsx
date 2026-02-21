import React, { useState } from 'react';
import { Globe, FileText, CheckCircle, Clock, DollarSign, Plus, X, Trash2 } from 'lucide-react';

const VisasPanel = ({ data, onChange }) => {
  const [newPais, setNewPais] = useState({ nombre: '', precioMin: '', precioMax: '', tiempo: '' });
  const [newRequisito, setNewRequisito] = useState('');

  const localData = {
    paises: data?.paises || [],
    requisitos: data?.requisitos || [],
    documentos: data?.documentos || [],
    tiempos: data?.tiempos || { minimo: '5 días', promedio: '15 días', maximo: '30 días' }
  };

  const addPais = () => {
    if (newPais.nombre) {
      onChange({
        ...localData,
        paises: [...localData.paises, {
          ...newPais,
          precioMin: parseFloat(newPais.precioMin) || 120,
          precioMax: parseFloat(newPais.precioMax) || 180
        }]
      });
      setNewPais({ nombre: '', precioMin: '', precioMax: '', tiempo: '' });
    }
  };

  const addRequisito = () => {
    if (newRequisito.trim()) {
      onChange({ ...localData, requisitos: [...localData.requisitos, newRequisito.trim()] });
      setNewRequisito('');
    }
  };

  const removeItem = (type, index) => {
    onChange({ ...localData, [type]: localData[type].filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2"><Globe className="h-5 w-5" /> Países</h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input type="text" placeholder="País" value={newPais.nombre} onChange={(e) => setNewPais({ ...newPais, nombre: e.target.value })} className="px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60" />
          <input type="number" placeholder="Mínimo $" value={newPais.precioMin} onChange={(e) => setNewPais({ ...newPais, precioMin: e.target.value })} className="px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60" />
          <input type="number" placeholder="Máximo $" value={newPais.precioMax} onChange={(e) => setNewPais({ ...newPais, precioMax: e.target.value })} className="px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60" />
          <input type="text" placeholder="Tiempo" value={newPais.tiempo} onChange={(e) => setNewPais({ ...newPais, tiempo: e.target.value })} className="px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60" />
          <button onClick={addPais} className="px-4 py-2 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50"><Plus className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold mb-4">Países Agregados</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {localData.paises.map((pais, idx) => (
            <div key={idx} className="relative bg-gray-50 rounded-lg p-4 border group">
              <button onClick={() => removeItem('paises', idx)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"><X className="h-4 w-4 text-red-500" /></button>
              <h5 className="font-bold">{pais.nombre}</h5>
              <p className="text-sm text-green-600">${pais.precioMin} - ${pais.precioMax}</p>
              {pais.tiempo && <p className="text-sm text-gray-600">{pais.tiempo}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2"><FileText className="h-5 w-5 text-amber-600" /> Requisitos</h4>
        <div className="flex gap-2 mb-4">
          <input type="text" value={newRequisito} onChange={(e) => setNewRequisito(e.target.value)} placeholder="Ej: Pasaporte vigente" className="flex-1 px-4 py-2 border rounded-lg" />
          <button onClick={addRequisito} className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"><Plus className="h-4 w-4" /></button>
        </div>
        <div className="space-y-2">
          {localData.requisitos.map((req, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span>{req}</span>
              <button onClick={() => removeItem('requisitos', idx)}><X className="h-4 w-4 text-red-500" /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2"><Clock className="h-5 w-5 text-purple-600" /> Tiempos</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Mínimo</label><input type="text" value={localData.tiempos.minimo} onChange={(e) => onChange({ ...localData, tiempos: { ...localData.tiempos, minimo: e.target.value } })} className="w-full px-4 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Promedio</label><input type="text" value={localData.tiempos.promedio} onChange={(e) => onChange({ ...localData, tiempos: { ...localData.tiempos, promedio: e.target.value } })} className="w-full px-4 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Máximo</label><input type="text" value={localData.tiempos.maximo} onChange={(e) => onChange({ ...localData, tiempos: { ...localData.tiempos, maximo: e.target.value } })} className="w-full px-4 py-2 border rounded-lg" /></div>
        </div>
      </div>
    </div>
  );
};

export default VisasPanel;
