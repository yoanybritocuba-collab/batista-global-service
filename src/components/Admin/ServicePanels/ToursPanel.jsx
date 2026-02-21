import React, { useState } from 'react';
import { 
  MapPin, Calendar, DollarSign, Star, Clock, 
  Users, Sun, Camera, Coffee, Ship, TreePine,
  Plus, X, Trash2, TrendingUp, CheckCircle, XCircle,
  Edit, Save
} from 'lucide-react';

const ToursPanel = ({ data, onChange }) => {
  const [newDestino, setNewDestino] = useState('');
  const [newPaquete, setNewPaquete] = useState({ 
    nombre: '',
    duracion: '', 
    hotel: '', 
    precioMin: '', 
    precioMax: '', 
    descripcion: '',
    incluye: [] 
  });
  const [newIncluye, setNewIncluye] = useState('');
  const [selectedDestino, setSelectedDestino] = useState(null);
  const [editingPaquete, setEditingPaquete] = useState(null);

  // Estructura de datos para tours
  const localData = {
    // RANGOS DE PRECIOS GENERALES - ¡AHORA EDITABLES!
    rangosPrecios: {
      minimo: data?.rangosPrecios?.minimo || 79,
      maximo: data?.rangosPrecios?.maximo || 599,
    },
    // Destinos
    destinos: data?.destinos || [],
    // Paquetes generales
    paquetes: data?.paquetes || [],
    // Incluye general
    incluye: data?.incluye || [
      'Transporte ida y vuelta',
      'Guía profesional',
      'Almuerzo típico',
      'Seguro de viaje'
    ],
    noIncluye: data?.noIncluye || [
      'Bebidas alcohólicas',
      'Fotografías profesionales',
      'Propinas'
    ],
    // Recomendaciones
    recomendaciones: data?.recomendaciones || [
      'Ropa cómoda',
      'Bloqueador solar',
      'Cámara fotográfica'
    ]
  };

  // ===== FUNCIONES PARA RANGOS DE PRECIOS =====
  const handleRangoChange = (campo, valor) => {
    onChange({
      ...localData,
      rangosPrecios: {
        ...localData.rangosPrecios,
        [campo]: parseFloat(valor) || 0
      }
    });
  };

  // ===== FUNCIONES PARA DESTINOS =====
  const addDestino = () => {
    if (newDestino.trim()) {
      onChange({
        ...localData,
        destinos: [...localData.destinos, { 
          nombre: newDestino, 
          paquetes: [],
          descripcion: '',
          imagen: ''
        }]
      });
      setNewDestino('');
    }
  };

  const removeDestino = (idx) => {
    onChange({
      ...localData,
      destinos: localData.destinos.filter((_, i) => i !== idx)
    });
  };

  // ===== FUNCIONES PARA PAQUETES =====
  const addPaquete = () => {
    if (selectedDestino !== null && newPaquete.nombre && newPaquete.precioMin) {
      const newDestinos = [...localData.destinos];
      if (!newDestinos[selectedDestino].paquetes) {
        newDestinos[selectedDestino].paquetes = [];
      }
      
      newDestinos[selectedDestino].paquetes.push({
        ...newPaquete,
        precioMin: parseFloat(newPaquete.precioMin),
        precioMax: parseFloat(newPaquete.precioMax) || parseFloat(newPaquete.precioMin) * 1.5,
        incluye: newPaquete.incluye || []
      });
      
      onChange({ ...localData, destinos: newDestinos });
      resetPaqueteForm();
      setSelectedDestino(null);
    }
  };

  const updatePaquete = () => {
    if (selectedDestino !== null && editingPaquete !== null && newPaquete.nombre) {
      const newDestinos = [...localData.destinos];
      newDestinos[selectedDestino].paquetes[editingPaquete] = {
        ...newPaquete,
        precioMin: parseFloat(newPaquete.precioMin),
        precioMax: parseFloat(newPaquete.precioMax) || parseFloat(newPaquete.precioMin) * 1.5
      };
      
      onChange({ ...localData, destinos: newDestinos });
      resetPaqueteForm();
      setSelectedDestino(null);
      setEditingPaquete(null);
    }
  };

  const editPaquete = (destinoIdx, paqueteIdx) => {
    const paquete = localData.destinos[destinoIdx].paquetes[paqueteIdx];
    setNewPaquete({
      nombre: paquete.nombre || '',
      duracion: paquete.duracion || '',
      hotel: paquete.hotel || '',
      precioMin: paquete.precioMin || '',
      precioMax: paquete.precioMax || '',
      descripcion: paquete.descripcion || '',
      incluye: paquete.incluye || []
    });
    setSelectedDestino(destinoIdx);
    setEditingPaquete(paqueteIdx);
  };

  const removePaquete = (destinoIdx, paqueteIdx) => {
    const newDestinos = [...localData.destinos];
    newDestinos[destinoIdx].paquetes = newDestinos[destinoIdx].paquetes.filter((_, i) => i !== paqueteIdx);
    onChange({ ...localData, destinos: newDestinos });
  };

  const resetPaqueteForm = () => {
    setNewPaquete({ 
      nombre: '', duracion: '', hotel: '', 
      precioMin: '', precioMax: '', descripcion: '',
      incluye: [] 
    });
    setNewIncluye('');
  };

  // ===== FUNCIONES PARA INCLUYE =====
  const addIncluyeToPaquete = () => {
    if (newIncluye.trim()) {
      setNewPaquete({
        ...newPaquete,
        incluye: [...newPaquete.incluye, newIncluye.trim()]
      });
      setNewIncluye('');
    }
  };

  const removeIncluyeFromPaquete = (idx) => {
    setNewPaquete({
      ...newPaquete,
      incluye: newPaquete.incluye.filter((_, i) => i !== idx)
    });
  };

  // ===== FUNCIONES PARA LISTAS GENERALES =====
  const addToList = (lista, valor) => {
    if (valor.trim()) {
      onChange({
        ...localData,
        [lista]: [...localData[lista], valor.trim()]
      });
    }
  };

  const removeFromList = (lista, index) => {
    onChange({
      ...localData,
      [lista]: localData[lista].filter((_, i) => i !== index)
    });
  };

  const updateListItem = (lista, index, valor) => {
    const newList = [...localData[lista]];
    newList[index] = valor;
    onChange({
      ...localData,
      [lista]: newList
    });
  };

  return (
    <div className="space-y-6">
      {/* ===== SECCIÓN 1: RANGO DE PRECIOS GENERAL ===== */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          Rango de Precios
        </h3>
        <p className="text-sm text-amber-100 mb-4">
          Estos valores aparecerán en las tarjetas como "Desde $X hasta $Y"
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm opacity-90 block mb-1">Precio mínimo ($)</label>
            <input
              type="number"
              value={localData.rangosPrecios.minimo}
              onChange={(e) => handleRangoChange('minimo', e.target.value)}
              className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white"
              placeholder="79"
            />
          </div>
          <div>
            <label className="text-sm opacity-90 block mb-1">Precio máximo ($)</label>
            <input
              type="number"
              value={localData.rangosPrecios.maximo}
              onChange={(e) => handleRangoChange('maximo', e.target.value)}
              className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white"
              placeholder="599"
            />
          </div>
        </div>
      </div>

      {/* ===== SECCIÓN 2: DESTINOS TURÍSTICOS ===== */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-amber-600" />
            Destinos Turísticos
          </h3>
        </div>
        <div className="p-6">
          {/* Agregar nuevo destino */}
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
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Agregar Destino
            </button>
          </div>

          {/* Lista de destinos */}
          <div className="space-y-4">
            {localData.destinos.map((destino, dIdx) => (
              <div key={dIdx} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <h4 className="font-bold text-lg">{destino.nombre}</h4>
                  <button onClick={() => removeDestino(dIdx)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="p-4">
                  {/* Descripción del destino */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <input
                      type="text"
                      value={destino.descripcion || ''}
                      onChange={(e) => {
                        const newDestinos = [...localData.destinos];
                        newDestinos[dIdx].descripcion = e.target.value;
                        onChange({ ...localData, destinos: newDestinos });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Breve descripción del destino"
                    />
                  </div>

                  {/* Paquetes del destino */}
                  <div className="space-y-3 mb-4">
                    <h5 className="font-medium">Paquetes disponibles</h5>
                    {destino.paquetes?.map((paquete, pIdx) => (
                      <div key={pIdx} className="bg-amber-50 rounded-lg p-4 relative group">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <input
                                type="text"
                                value={paquete.nombre || ''}
                                onChange={(e) => {
                                  const newDestinos = [...localData.destinos];
                                  newDestinos[dIdx].paquetes[pIdx].nombre = e.target.value;
                                  onChange({ ...localData, destinos: newDestinos });
                                }}
                                className="font-bold text-lg bg-transparent border-b border-dashed border-gray-300 focus:outline-none focus:border-amber-500"
                                placeholder="Nombre del paquete"
                              />
                              <span className="text-sm text-gray-500">{paquete.duracion}</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mb-2">
                              <div>
                                <span className="text-xs text-gray-500">Precio mínimo</span>
                                <input
                                  type="number"
                                  value={paquete.precioMin || ''}
                                  onChange={(e) => {
                                    const newDestinos = [...localData.destinos];
                                    newDestinos[dIdx].paquetes[pIdx].precioMin = parseFloat(e.target.value);
                                    onChange({ ...localData, destinos: newDestinos });
                                  }}
                                  className="w-full px-2 py-1 border rounded text-sm"
                                  placeholder="Mínimo"
                                />
                              </div>
                              <div>
                                <span className="text-xs text-gray-500">Precio máximo</span>
                                <input
                                  type="number"
                                  value={paquete.precioMax || ''}
                                  onChange={(e) => {
                                    const newDestinos = [...localData.destinos];
                                    newDestinos[dIdx].paquetes[pIdx].precioMax = parseFloat(e.target.value);
                                    onChange({ ...localData, destinos: newDestinos });
                                  }}
                                  className="w-full px-2 py-1 border rounded text-sm"
                                  placeholder="Máximo"
                                />
                              </div>
                            </div>

                            <input
                              type="text"
                              value={paquete.hotel || ''}
                              onChange={(e) => {
                                const newDestinos = [...localData.destinos];
                                newDestinos[dIdx].paquetes[pIdx].hotel = e.target.value;
                                onChange({ ...localData, destinos: newDestinos });
                              }}
                              className="w-full px-2 py-1 border rounded text-sm mb-2"
                              placeholder="Hotel"
                            />

                            {/* Incluye del paquete */}
                            <div className="flex flex-wrap gap-1">
                              {(paquete.incluye || []).map((inc, i) => (
                                <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                                  {inc}
                                  <button onClick={() => {
                                    const newDestinos = [...localData.destinos];
                                    newDestinos[dIdx].paquetes[pIdx].incluye = paquete.incluye.filter((_, j) => j !== i);
                                    onChange({ ...localData, destinos: newDestinos });
                                  }}>
                                    <X className="h-3 w-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => editPaquete(dIdx, pIdx)} className="text-blue-600 hover:text-blue-800">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button onClick={() => removePaquete(dIdx, pIdx)} className="text-red-600 hover:text-red-800">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Formulario para agregar paquete */}
                  {selectedDestino === dIdx && (
                    <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                      <h5 className="font-medium mb-3">
                        {editingPaquete !== null ? 'Editar Paquete' : 'Nuevo Paquete'}
                      </h5>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Nombre del paquete"
                          value={newPaquete.nombre}
                          onChange={(e) => setNewPaquete({ ...newPaquete, nombre: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                        
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Duración"
                            value={newPaquete.duracion}
                            onChange={(e) => setNewPaquete({ ...newPaquete, duracion: e.target.value })}
                            className="px-3 py-2 border rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="Hotel"
                            value={newPaquete.hotel}
                            onChange={(e) => setNewPaquete({ ...newPaquete, hotel: e.target.value })}
                            className="px-3 py-2 border rounded-lg"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="number"
                            placeholder="Precio mínimo $"
                            value={newPaquete.precioMin}
                            onChange={(e) => setNewPaquete({ ...newPaquete, precioMin: e.target.value })}
                            className="px-3 py-2 border rounded-lg"
                          />
                          <input
                            type="number"
                            placeholder="Precio máximo $"
                            value={newPaquete.precioMax}
                            onChange={(e) => setNewPaquete({ ...newPaquete, precioMax: e.target.value })}
                            className="px-3 py-2 border rounded-lg"
                          />
                        </div>

                        <textarea
                          placeholder="Descripción"
                          value={newPaquete.descripcion}
                          onChange={(e) => setNewPaquete({ ...newPaquete, descripcion: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg"
                          rows="2"
                        />

                        {/* Incluye del paquete */}
                        <div>
                          <label className="block text-sm font-medium mb-1">Incluye</label>
                          <div className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={newIncluye}
                              onChange={(e) => setNewIncluye(e.target.value)}
                              className="flex-1 px-3 py-2 border rounded-lg"
                              placeholder="Ej: Transporte"
                            />
                            <button
                              onClick={addIncluyeToPaquete}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {newPaquete.incluye.map((inc, i) => (
                              <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                                {inc}
                                <button onClick={() => removeIncluyeFromPaquete(i)}>
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={editingPaquete !== null ? updatePaquete : addPaquete}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            {editingPaquete !== null ? 'Actualizar' : 'Guardar'} Paquete
                          </button>
                          <button
                            onClick={() => {
                              setSelectedDestino(null);
                              setEditingPaquete(null);
                              resetPaqueteForm();
                            }}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedDestino !== dIdx && (
                    <button
                      onClick={() => {
                        setSelectedDestino(dIdx);
                        setEditingPaquete(null);
                        resetPaqueteForm();
                      }}
                      className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Agregar paquete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToursPanel;
