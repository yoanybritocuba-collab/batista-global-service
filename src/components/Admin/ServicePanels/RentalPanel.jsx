import React, { useState } from 'react';
import { Car, MapPin, Phone, DollarSign, Plus, X, Trash2, CheckCircle, XCircle } from 'lucide-react';

const RentalPanel = ({ data, onChange }) => {
  const [newSucursal, setNewSucursal] = useState({ ciudad: '', direccion: '', telefono: '' });
  const [newMarca, setNewMarca] = useState({ nombre: '', precio: '', disponible: true });

  const localData = {
    sucursales: data?.sucursales || [],
    marcas: data?.marcas || [],
    seguros: data?.seguros || []
  };

  const addSucursal = () => {
    if (newSucursal.ciudad && newSucursal.direccion) {
      onChange({
        ...localData,
        sucursales: [...localData.sucursales, newSucursal]
      });
      setNewSucursal({ ciudad: '', direccion: '', telefono: '' });
    }
  };

  const addMarca = () => {
    if (newMarca.nombre && newMarca.precio) {
      onChange({
        ...localData,
        marcas: [...localData.marcas, { ...newMarca, precio: parseFloat(newMarca.precio) }]
      });
      setNewMarca({ nombre: '', precio: '', disponible: true });
    }
  };

  const removeItem = (type, index) => {
    onChange({
      ...localData,
      [type]: localData[type].filter((_, i) => i !== index)
    });
  };

  const toggleDisponible = (index) => {
    const newMarcas = [...localData.marcas];
    newMarcas[index].disponible = !newMarcas[index].disponible;
    onChange({ ...localData, marcas: newMarcas });
  };

  return (
    <div className="space-y-8">
      {/* SUCURSALES */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Sucursales
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <input
              type="text"
              placeholder="Ciudad"
              value={newSucursal.ciudad}
              onChange={(e) => setNewSucursal({ ...newSucursal, ciudad: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Dirección"
              value={newSucursal.direccion}
              onChange={(e) => setNewSucursal({ ...newSucursal, direccion: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={newSucursal.telefono}
              onChange={(e) => setNewSucursal({ ...newSucursal, telefono: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addSucursal}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Agregar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localData.sucursales.map((suc, idx) => (
              <div key={idx} className="relative group bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                <button
                  onClick={() => removeItem('sucursales', idx)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4 text-red-600 hover:text-red-800" />
                </button>
                <h4 className="font-semibold text-lg">{suc.ciudad}</h4>
                <p className="text-gray-600 text-sm mt-1">{suc.direccion}</p>
                {suc.telefono && (
                  <p className="text-blue-600 text-sm mt-2 flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {suc.telefono}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VEHÍCULOS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Car className="h-5 w-5 text-green-600" />
            Flota de Vehículos
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <input
              type="text"
              placeholder="Modelo"
              value={newMarca.nombre}
              onChange={(e) => setNewMarca({ ...newMarca, nombre: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              placeholder="Precio por día $"
              value={newMarca.precio}
              onChange={(e) => setNewMarca({ ...newMarca, precio: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
              <input
                type="checkbox"
                checked={newMarca.disponible}
                onChange={(e) => setNewMarca({ ...newMarca, disponible: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-600">Disponible</span>
            </div>
            <button
              onClick={addMarca}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Agregar
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Modelo</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Precio/día</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Estado</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {localData.marcas.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{item.nombre}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">${item.precio}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleDisponible(idx)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                          item.disponible 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        {item.disponible ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        {item.disponible ? 'Disponible' : 'No disponible'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => removeItem('marcas', idx)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalPanel;