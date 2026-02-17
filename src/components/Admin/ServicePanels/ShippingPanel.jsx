import React, { useState } from 'react';
import { 
  Package, X, Scale, Clock, MapPin, DollarSign, 
  Plus, Trash2, Edit, Save, AlertCircle 
} from 'lucide-react';

const ShippingPanel = ({ data, onChange }) => {
  const [newProduct, setNewProduct] = useState('');
  const [newTarifa, setNewTarifa] = useState({ peso: '', precio: '', tiempo: '' });
  const [newDestino, setNewDestino] = useState({ pais: '', tarifaBase: '', tiempoEstimado: '' });

  const localData = {
    productosPermitidos: data?.productosPermitidos || [],
    productosRestringidos: data?.productosRestringidos || [],
    tarifasPorPeso: data?.tarifasPorPeso || [],
    tarifasExpress: data?.tarifasExpress || [],
    destinos: data?.destinos || []
  };

  const addProductoPermitido = () => {
    if (newProduct.trim()) {
      onChange({
        ...localData,
        productosPermitidos: [...localData.productosPermitidos, newProduct.trim()]
      });
      setNewProduct('');
    }
  };

  const addTarifa = () => {
    if (newTarifa.peso && newTarifa.precio) {
      onChange({
        ...localData,
        tarifasPorPeso: [...localData.tarifasPorPeso, { 
          ...newTarifa, 
          precio: parseFloat(newTarifa.precio) 
        }]
      });
      setNewTarifa({ peso: '', precio: '', tiempo: '' });
    }
  };

  const addDestino = () => {
    if (newDestino.pais) {
      onChange({
        ...localData,
        destinos: [...localData.destinos, { 
          ...newDestino, 
          tarifaBase: parseFloat(newDestino.tarifaBase) || 0 
        }]
      });
      setNewDestino({ pais: '', tarifaBase: '', tiempoEstimado: '' });
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
      {/* PRODUCTOS PERMITIDOS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Package className="h-5 w-5 text-green-600" />
            Productos Permitidos
          </h3>
        </div>
        <div className="p-6">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              placeholder="Ej: Electrónicos, Ropa, Documentos..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && addProductoPermitido()}
            />
            <button
              onClick={addProductoPermitido}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Agregar
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {localData.productosPermitidos.map((item, idx) => (
              <div key={idx} className="group relative">
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm flex items-center gap-2 pr-10">
                  {item}
                  <button
                    onClick={() => removeItem('productosPermitidos', idx)}
                    className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4 text-red-600 hover:text-red-800" />
                  </button>
                </span>
              </div>
            ))}
            {localData.productosPermitidos.length === 0 && (
              <p className="text-gray-400 text-sm">No hay productos permitidos</p>
            )}
          </div>
        </div>
      </div>

      {/* TARIFAS POR PESO */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Scale className="h-5 w-5 text-amber-600" />
            Tarifas por Peso
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <input
              type="text"
              placeholder="Peso (ej: 0-2 kg)"
              value={newTarifa.peso}
              onChange={(e) => setNewTarifa({ ...newTarifa, peso: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="number"
              placeholder="Precio $"
              value={newTarifa.precio}
              onChange={(e) => setNewTarifa({ ...newTarifa, precio: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="text"
              placeholder="Tiempo (ej: 3-5 días)"
              value={newTarifa.tiempo}
              onChange={(e) => setNewTarifa({ ...newTarifa, tiempo: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={addTarifa}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Agregar
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Peso</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Precio</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tiempo</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {localData.tarifasPorPeso.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{item.peso}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">${item.precio}</td>
                    <td className="px-4 py-3 text-gray-600">{item.tiempo}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => removeItem('tarifasPorPeso', idx)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {localData.tarifasPorPeso.length === 0 && (
              <p className="text-center text-gray-400 py-4">No hay tarifas configuradas</p>
            )}
          </div>
        </div>
      </div>

      {/* DESTINOS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Destinos
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <input
              type="text"
              placeholder="País"
              value={newDestino.pais}
              onChange={(e) => setNewDestino({ ...newDestino, pais: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Tarifa base $"
              value={newDestino.tarifaBase}
              onChange={(e) => setNewDestino({ ...newDestino, tarifaBase: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Tiempo estimado"
              value={newDestino.tiempoEstimado}
              onChange={(e) => setNewDestino({ ...newDestino, tiempoEstimado: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addDestino}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Agregar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localData.destinos.map((item, idx) => (
              <div key={idx} className="relative group bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                <button
                  onClick={() => removeItem('destinos', idx)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4 text-red-600 hover:text-red-800" />
                </button>
                <h4 className="font-semibold text-lg mb-2">{item.pais}</h4>
                <div className="space-y-1 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Tarifa base:</span>
                    <span className="font-semibold text-green-600">${item.tarifaBase}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Tiempo:</span>
                    <span>{item.tiempoEstimado}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          {localData.destinos.length === 0 && (
            <p className="text-center text-gray-400 py-4">No hay destinos configurados</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingPanel;