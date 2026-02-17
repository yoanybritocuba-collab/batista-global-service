import React, { useState } from 'react';
import { Plus, X, Globe, FileText, DollarSign, Clock } from 'lucide-react';

const VisasPanel = ({ data, onChange }) => {
  const [newPais, setNewPais] = useState({ nombre: '', precio: '', tiempoTramite: '' });
  const [newRequisito, setNewRequisito] = useState('');

  const localData = {
    paises: data?.paises || [],
    requisitosGenerales: data?.requisitosGenerales || []
  };

  const addPais = () => {
    if (newPais.nombre) {
      onChange({
        ...localData,
        paises: [...localData.paises, { 
          ...newPais, 
          precio: parseFloat(newPais.precio) || 150 
        }]
      });
      setNewPais({ nombre: '', precio: '', tiempoTramite: '' });
    }
  };

  const addRequisito = () => {
    if (newRequisito.trim()) {
      onChange({
        ...localData,
        requisitosGenerales: [...localData.requisitosGenerales, newRequisito.trim()]
      });
      setNewRequisito('');
    }
  };

  const removeItem = (type, index) => {
    onChange({
      ...localData,
      [type]: localData[type].filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-8">
      {/* PAÍSES */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-600" />
            Países
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <input
              type="text"
              placeholder="País"
              value={newPais.nombre}
              onChange={(e) => setNewPais({ ...newPais, nombre: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="number"
              placeholder="Precio $"
              value={newPais.precio}
              onChange={(e) => setNewPais({ ...newPais, precio: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="text"
              placeholder="Tiempo de trámite"
              value={newPais.tiempoTramite}
              onChange={(e) => setNewPais({ ...newPais, tiempoTramite: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={addPais}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Agregar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localData.paises.map((pais, idx) => (
              <div key={idx} className="relative group bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                <button
                  onClick={() => removeItem('paises', idx)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4 text-red-600 hover:text-red-800" />
                </button>
                <h4 className="font-semibold text-lg mb-2">{pais.nombre}</h4>
                <div className="space-y-1 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Precio:</span>
                    <span className="font-semibold text-green-600">${pais.precio}</span>
                  </p>
                  {pais.tiempoTramite && (
                    <p className="flex justify-between">
                      <span className="text-gray-600">Tiempo:</span>
                      <span>{pais.tiempoTramite}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {localData.paises.length === 0 && (
            <p className="text-center text-gray-400 py-4">No hay países configurados</p>
          )}
        </div>
      </div>

      {/* REQUISITOS GENERALES */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <FileText className="h-5 w-5 text-amber-600" />
            Requisitos Generales
          </h3>
        </div>
        <div className="p-6">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newRequisito}
              onChange={(e) => setNewRequisito(e.target.value)}
              placeholder="Ej: Pasaporte vigente, fotos, etc."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              onKeyPress={(e) => e.key === 'Enter' && addRequisito()}
            />
            <button
              onClick={addRequisito}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Agregar
            </button>
          </div>

          <div className="space-y-2">
            {localData.requisitosGenerales.map((req, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg group">
                <span className="text-gray-700">{req}</span>
                <button
                  onClick={() => removeItem('requisitosGenerales', idx)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4 text-red-600 hover:text-red-800" />
                </button>
              </div>
            ))}
            {localData.requisitosGenerales.length === 0 && (
              <p className="text-gray-400 text-sm">No hay requisitos generales</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisasPanel;