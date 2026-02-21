import React, { useState } from 'react';
import { 
  Car, MapPin, Phone, DollarSign, Users, 
  Shield, CheckCircle, XCircle, Clock, 
  Fuel, Settings, Calendar, Star, TrendingUp,
  Wrench, BadgePercent, CreditCard,
  Plus, X, Trash2, Upload, Image as ImageIcon
} from 'lucide-react';

const RentalPanel = ({ data, onChange }) => {
  const [newSucursal, setNewSucursal] = useState({ ciudad: '', direccion: '', telefono: '' });
  const [newVehiculo, setNewVehiculo] = useState({ 
    nombre: '', 
    categoria: '', 
    precioMin: '', 
    precioMax: '', 
    disponible: true,
    transmision: 'Automático',
    combustible: 'Gasolina',
    pasajeros: 5,
    imagen: ''  // 👈 NUEVO CAMPO PARA IMAGEN
  });
  const [imagePreview, setImagePreview] = useState('');

  const localData = {
    rangosPrecios: {
      economicoMin: data?.rangosPrecios?.economicoMin || 35,
      economicoMax: data?.rangosPrecios?.economicoMax || 65,
      intermedioMin: data?.rangosPrecios?.intermedioMin || 65,
      intermedioMax: data?.rangosPrecios?.intermedioMax || 120,
      premiumMin: data?.rangosPrecios?.premiumMin || 120,
      premiumMax: data?.rangosPrecios?.premiumMax || 250
    },
    sucursales: data?.sucursales || [],
    vehiculos: data?.vehiculos || [],
    tarifas: data?.tarifas || [
      { tipo: 'Diaria', descuento: 0 },
      { tipo: 'Semanal', descuento: 15 },
      { tipo: 'Mensual', descuento: 30 }
    ],
    seguros: data?.seguros || [],
    requisitos: data?.requisitos || [
      'Licencia de conducir vigente',
      'Tarjeta de crédito',
      'Edad mínima 25 años',
      'Pasaporte'
    ],
    extras: data?.extras || []
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe superar los 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setNewVehiculo({ ...newVehiculo, imagen: reader.result });
    };
    reader.readAsDataURL(file);
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

  const addVehiculo = () => {
    if (newVehiculo.nombre && newVehiculo.precioMin) {
      onChange({
        ...localData,
        vehiculos: [...localData.vehiculos, {
          ...newVehiculo,
          precioMin: parseFloat(newVehiculo.precioMin),
          precioMax: parseFloat(newVehiculo.precioMax) || parseFloat(newVehiculo.precioMin) * 1.5
        }]
      });
      setNewVehiculo({ 
        nombre: '', categoria: '', precioMin: '', precioMax: '', 
        disponible: true, transmision: 'Automático', 
        combustible: 'Gasolina', pasajeros: 5, imagen: '' 
      });
      setImagePreview('');
    }
  };

  const removeItem = (type, index) => {
    onChange({
      ...localData,
      [type]: localData[type].filter((_, i) => i !== index)
    });
  };

  const toggleDisponible = (index) => {
    const newVehiculos = [...localData.vehiculos];
    newVehiculos[index].disponible = !newVehiculos[index].disponible;
    onChange({ ...localData, vehiculos: newVehiculos });
  };

  return (
    <div className="space-y-8">
      {/* RANGOS DE PRECIOS */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          Rangos de Precios por Categoría
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm opacity-90 block mb-1">Económico ($)</label>
            <div className="flex gap-2">
              <input type="number" value={localData.rangosPrecios.economicoMin} onChange={(e) => onChange({ ...localData, rangosPrecios: { ...localData.rangosPrecios, economicoMin: parseFloat(e.target.value) } })} className="w-1/2 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white" />
              <input type="number" value={localData.rangosPrecios.economicoMax} onChange={(e) => onChange({ ...localData, rangosPrecios: { ...localData.rangosPrecios, economicoMax: parseFloat(e.target.value) } })} className="w-1/2 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white" />
            </div>
          </div>
          <div>
            <label className="text-sm opacity-90 block mb-1">Intermedio ($)</label>
            <div className="flex gap-2">
              <input type="number" value={localData.rangosPrecios.intermedioMin} onChange={(e) => onChange({ ...localData, rangosPrecios: { ...localData.rangosPrecios, intermedioMin: parseFloat(e.target.value) } })} className="w-1/2 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white" />
              <input type="number" value={localData.rangosPrecios.intermedioMax} onChange={(e) => onChange({ ...localData, rangosPrecios: { ...localData.rangosPrecios, intermedioMax: parseFloat(e.target.value) } })} className="w-1/2 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white" />
            </div>
          </div>
          <div>
            <label className="text-sm opacity-90 block mb-1">Premium ($)</label>
            <div className="flex gap-2">
              <input type="number" value={localData.rangosPrecios.premiumMin} onChange={(e) => onChange({ ...localData, rangosPrecios: { ...localData.rangosPrecios, premiumMin: parseFloat(e.target.value) } })} className="w-1/2 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white" />
              <input type="number" value={localData.rangosPrecios.premiumMax} onChange={(e) => onChange({ ...localData, rangosPrecios: { ...localData.rangosPrecios, premiumMax: parseFloat(e.target.value) } })} className="w-1/2 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* FORMULARIO PARA AGREGAR VEHÍCULOS CON IMAGEN */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Car className="h-5 w-5 text-blue-600" />
          Agregar Nuevo Vehículo
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna izquierda - Datos del vehículo */}
          <div className="space-y-4">
            <input type="text" placeholder="Modelo del vehículo" value={newVehiculo.nombre} onChange={(e) => setNewVehiculo({ ...newVehiculo, nombre: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Categoría" value={newVehiculo.categoria} onChange={(e) => setNewVehiculo({ ...newVehiculo, categoria: e.target.value })} className="px-4 py-2 border rounded-lg" />
              <select value={newVehiculo.transmision} onChange={(e) => setNewVehiculo({ ...newVehiculo, transmision: e.target.value })} className="px-4 py-2 border rounded-lg">
                <option value="Automático">Automático</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <select value={newVehiculo.combustible} onChange={(e) => setNewVehiculo({ ...newVehiculo, combustible: e.target.value })} className="px-4 py-2 border rounded-lg">
                <option value="Gasolina">Gasolina</option>
                <option value="Diesel">Diesel</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Eléctrico">Eléctrico</option>
              </select>
              <input type="number" placeholder="Pasajeros" value={newVehiculo.pasajeros} onChange={(e) => setNewVehiculo({ ...newVehiculo, pasajeros: parseInt(e.target.value) })} className="px-4 py-2 border rounded-lg" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Precio mínimo $" value={newVehiculo.precioMin} onChange={(e) => setNewVehiculo({ ...newVehiculo, precioMin: e.target.value })} className="px-4 py-2 border rounded-lg" />
              <input type="number" placeholder="Precio máximo $" value={newVehiculo.precioMax} onChange={(e) => setNewVehiculo({ ...newVehiculo, precioMax: e.target.value })} className="px-4 py-2 border rounded-lg" />
            </div>

            <label className="flex items-center gap-2">
              <input type="checkbox" checked={newVehiculo.disponible} onChange={(e) => setNewVehiculo({ ...newVehiculo, disponible: e.target.checked })} className="w-4 h-4" />
              <span>Vehículo disponible inmediatamente</span>
            </label>
          </div>

          {/* Columna derecha - Imagen del vehículo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto del vehículo
            </label>
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg border-2 border-gray-200" />
                <button onClick={() => { setImagePreview(''); setNewVehiculo({ ...newVehiculo, imagen: '' }); }} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div className="border-3 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Haz clic para subir imagen</p>
                  <p className="text-xs text-gray-400 mt-1">Máximo 5MB</p>
                </div>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            )}
          </div>
        </div>

        <button onClick={addVehiculo} className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Agregar Vehículo
        </button>
      </div>

      {/* LISTA DE VEHÍCULOS */}
      {localData.vehiculos.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Vehículos en Flota ({localData.vehiculos.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localData.vehiculos.map((vehiculo, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                <div className="h-32 bg-gray-100 overflow-hidden">
                  {vehiculo.imagen ? (
                    <img src={vehiculo.imagen} alt={vehiculo.nombre} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <Car className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">{vehiculo.nombre}</h4>
                      <p className="text-xs text-gray-600">{vehiculo.categoria}</p>
                    </div>
                    <button onClick={() => toggleDisponible(idx)} className={`text-xs px-2 py-1 rounded ${vehiculo.disponible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {vehiculo.disponible ? 'Disponible' : 'No disponible'}
                    </button>
                  </div>
                  <p className="text-green-600 font-bold text-sm mt-1">${vehiculo.precioMin} - ${vehiculo.precioMax}/día</p>
                  <div className="flex justify-end mt-2">
                    <button onClick={() => removeItem('vehiculos', idx)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sucursales */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Sucursales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
          <input type="text" placeholder="Ciudad" value={newSucursal.ciudad} onChange={(e) => setNewSucursal({ ...newSucursal, ciudad: e.target.value })} className="px-3 py-2 border rounded-lg" />
          <input type="text" placeholder="Dirección" value={newSucursal.direccion} onChange={(e) => setNewSucursal({ ...newSucursal, direccion: e.target.value })} className="px-3 py-2 border rounded-lg" />
          <input type="text" placeholder="Teléfono" value={newSucursal.telefono} onChange={(e) => setNewSucursal({ ...newSucursal, telefono: e.target.value })} className="px-3 py-2 border rounded-lg" />
          <button onClick={addSucursal} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Plus className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {localData.sucursales.map((suc, idx) => (
            <div key={idx} className="relative bg-gray-50 rounded-lg p-3 border group">
              <button onClick={() => removeItem('sucursales', idx)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"><X className="h-4 w-4 text-red-500" /></button>
              <h4 className="font-bold">{suc.ciudad}</h4>
              <p className="text-sm text-gray-600">{suc.direccion}</p>
              {suc.telefono && <p className="text-sm text-blue-600 mt-1">{suc.telefono}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentalPanel;
