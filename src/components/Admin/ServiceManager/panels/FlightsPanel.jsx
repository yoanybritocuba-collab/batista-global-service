import React, { useState } from 'react';
import { 
  Plane, MapPin, Clock, DollarSign, Calendar, 
  Users, Briefcase, Award, TrendingUp, Globe,
  Luggage, Coffee, Wifi, Battery, Film,
  Plus, X, Trash2, Edit, Save, CheckCircle
} from 'lucide-react';

const FlightsPanel = ({ data, onChange }) => {
  const [newRuta, setNewRuta] = useState({ origen: '', destino: '' });
  const [newVuelo, setNewVuelo] = useState({ 
    aerolinea: '', 
    precioMin: '', 
    precioMax: '', 
    clase: 'Económica',
    equipaje: '23kg',
    comida: 'Incluida',
    horario: '',
    beneficios: []
  });
  const [newBeneficio, setNewBeneficio] = useState('');
  const [selectedRuta, setSelectedRuta] = useState(null);
  const [editingVuelo, setEditingVuelo] = useState(null);

  // Estructura de datos para vuelos
  const localData = {
    // RANGOS DE PRECIOS GENERALES
    rangosPrecios: {
      minimo: data?.rangosPrecios?.minimo || 150,
      maximo: data?.rangosPrecios?.maximo || 950,
      promedio: data?.rangosPrecios?.promedio || 450
    },
    // Rutas
    rutas: data?.rutas || [],
    // Clases
    clases: data?.clases || [],
    // Aerolíneas
    aerolineas: data?.aerolineas || [],
    // Ofertas
    ofertas: data?.ofertas || [],
    // Destinos populares
    destinosPopulares: data?.destinosPopulares || [],
    // Equipaje
    equipaje: data?.equipaje || {
      cabina: '10 kg',
      bodega: '23 kg',
      precioExtra: 35
    }
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

  // ===== FUNCIONES PARA RUTAS =====
  const addRuta = () => {
    if (newRuta.origen && newRuta.destino) {
      onChange({
        ...localData,
        rutas: [...localData.rutas, { ...newRuta, vuelos: [] }]
      });
      setNewRuta({ origen: '', destino: '' });
    }
  };

  const removeRuta = (idx) => {
    onChange({
      ...localData,
      rutas: localData.rutas.filter((_, i) => i !== idx)
    });
  };

  // ===== FUNCIONES PARA VUELOS =====
  const addVuelo = () => {
    if (selectedRuta !== null && newVuelo.aerolinea && newVuelo.precioMin) {
      const newRutas = [...localData.rutas];
      if (!newRutas[selectedRuta].vuelos) {
        newRutas[selectedRuta].vuelos = [];
      }
      
      newRutas[selectedRuta].vuelos.push({
        ...newVuelo,
        precioMin: parseFloat(newVuelo.precioMin),
        precioMax: parseFloat(newVuelo.precioMax) || parseFloat(newVuelo.precioMin) * 2,
        beneficios: newVuelo.beneficios || []
      });
      
      onChange({ ...localData, rutas: newRutas });
      resetVueloForm();
      setSelectedRuta(null);
    }
  };

  const updateVuelo = () => {
    if (selectedRuta !== null && editingVuelo !== null && newVuelo.aerolinea) {
      const newRutas = [...localData.rutas];
      newRutas[selectedRuta].vuelos[editingVuelo] = {
        ...newVuelo,
        precioMin: parseFloat(newVuelo.precioMin),
        precioMax: parseFloat(newVuelo.precioMax) || parseFloat(newVuelo.precioMin) * 2
      };
      
      onChange({ ...localData, rutas: newRutas });
      resetVueloForm();
      setSelectedRuta(null);
      setEditingVuelo(null);
    }
  };

  const editVuelo = (rutaIdx, vueloIdx) => {
    const vuelo = localData.rutas[rutaIdx].vuelos[vueloIdx];
    setNewVuelo({
      aerolinea: vuelo.aerolinea || '',
      precioMin: vuelo.precioMin || '',
      precioMax: vuelo.precioMax || '',
      clase: vuelo.clase || 'Económica',
      equipaje: vuelo.equipaje || '23kg',
      comida: vuelo.comida || 'Incluida',
      horario: vuelo.horario || '',
      beneficios: vuelo.beneficios || []
    });
    setSelectedRuta(rutaIdx);
    setEditingVuelo(vueloIdx);
  };

  const removeVuelo = (rutaIdx, vueloIdx) => {
    const newRutas = [...localData.rutas];
    newRutas[rutaIdx].vuelos = newRutas[rutaIdx].vuelos.filter((_, i) => i !== vueloIdx);
    onChange({ ...localData, rutas: newRutas });
  };

  const resetVueloForm = () => {
    setNewVuelo({ 
      aerolinea: '', precioMin: '', precioMax: '', 
      clase: 'Económica', equipaje: '23kg', 
      comida: 'Incluida', horario: '', beneficios: [] 
    });
    setNewBeneficio('');
  };

  // ===== FUNCIONES PARA BENEFICIOS =====
  const addBeneficio = () => {
    if (newBeneficio.trim()) {
      setNewVuelo({
        ...newVuelo,
        beneficios: [...newVuelo.beneficios, newBeneficio.trim()]
      });
      setNewBeneficio('');
    }
  };

  const removeBeneficio = (idx) => {
    setNewVuelo({
      ...newVuelo,
      beneficios: newVuelo.beneficios.filter((_, i) => i !== idx)
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
    if (typeof newList[index] === 'string') {
      newList[index] = valor;
    } else {
      newList[index] = { ...newList[index], ...valor };
    }
    onChange({
      ...localData,
      [lista]: newList
    });
  };

  return (
    <div className="space-y-8">
      {/* ===== SECCIÓN 1: RANGO DE PRECIOS GENERAL ===== */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          Rango General de Precios
        </h3>
        <p className="text-sm text-sky-100 mb-4">
          Estos valores aparecerán en las tarjetas como "Desde $X hasta $Y"
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm opacity-90 block mb-1">Precio mínimo ($)</label>
            <input
              type="number"
              value={localData.rangosPrecios.minimo}
              onChange={(e) => handleRangoChange('minimo', e.target.value)}
              className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60"
              placeholder="150"
            />
          </div>
          <div>
            <label className="text-sm opacity-90 block mb-1">Precio máximo ($)</label>
            <input
              type="number"
              value={localData.rangosPrecios.maximo}
              onChange={(e) => handleRangoChange('maximo', e.target.value)}
              className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60"
              placeholder="950"
            />
          </div>
          <div>
            <label className="text-sm opacity-90 block mb-1">Precio promedio ($)</label>
            <input
              type="number"
              value={localData.rangosPrecios.promedio}
              onChange={(e) => handleRangoChange('promedio', e.target.value)}
              className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60"
              placeholder="450"
            />
          </div>
        </div>
      </div>

      {/* ===== SECCIÓN 2: RUTAS AÉREAS ===== */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Plane className="h-5 w-5 text-sky-600" />
            Rutas Aéreas
          </h3>
        </div>
        <div className="p-6">
          {/* Agregar nueva ruta */}
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
              placeholder="Destino (ej: Madrid - MAD)"
              value={newRuta.destino}
              onChange={(e) => setNewRuta({ ...newRuta, destino: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
            />
            <button
              onClick={addRuta}
              className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Agregar Ruta
            </button>
          </div>

          {/* Lista de rutas */}
          <div className="space-y-4">
            {localData.rutas.map((ruta, rIdx) => (
              <div key={rIdx} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <h4 className="font-bold text-lg">{ruta.origen} → {ruta.destino}</h4>
                  <button onClick={() => removeRuta(rIdx)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="p-4">
                  {/* Duración de la ruta */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duración del vuelo</label>
                    <input
                      type="text"
                      value={ruta.duracion || ''}
                      onChange={(e) => {
                        const newRutas = [...localData.rutas];
                        newRutas[rIdx].duracion = e.target.value;
                        onChange({ ...localData, rutas: newRutas });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Ej: 8h 30m"
                    />
                  </div>

                  {/* Vuelos de esta ruta */}
                  <div className="space-y-3 mb-4">
                    <h5 className="font-medium">Vuelos disponibles</h5>
                    {(ruta.vuelos || []).map((vuelo, vIdx) => (
                      <div key={vIdx} className="bg-sky-50 rounded-lg p-4 relative group">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <input
                                type="text"
                                value={vuelo.aerolinea || ''}
                                onChange={(e) => {
                                  const newRutas = [...localData.rutas];
                                  newRutas[rIdx].vuelos[vIdx].aerolinea = e.target.value;
                                  onChange({ ...localData, rutas: newRutas });
                                }}
                                className="font-bold text-lg bg-transparent border-b border-dashed border-gray-300 focus:outline-none focus:border-sky-500"
                                placeholder="Aerolínea"
                              />
                              <select
                                value={vuelo.clase || 'Económica'}
                                onChange={(e) => {
                                  const newRutas = [...localData.rutas];
                                  newRutas[rIdx].vuelos[vIdx].clase = e.target.value;
                                  onChange({ ...localData, rutas: newRutas });
                                }}
                                className="px-2 py-1 border rounded text-sm"
                              >
                                <option value="Económica">Económica</option>
                                <option value="Ejecutiva">Ejecutiva</option>
                                <option value="Primera Clase">Primera Clase</option>
                              </select>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mb-2">
                              <div>
                                <span className="text-xs text-gray-500">Precio mínimo</span>
                                <input
                                  type="number"
                                  value={vuelo.precioMin || ''}
                                  onChange={(e) => {
                                    const newRutas = [...localData.rutas];
                                    newRutas[rIdx].vuelos[vIdx].precioMin = parseFloat(e.target.value);
                                    onChange({ ...localData, rutas: newRutas });
                                  }}
                                  className="w-full px-2 py-1 border rounded text-sm"
                                  placeholder="Mínimo"
                                />
                              </div>
                              <div>
                                <span className="text-xs text-gray-500">Precio máximo</span>
                                <input
                                  type="number"
                                  value={vuelo.precioMax || ''}
                                  onChange={(e) => {
                                    const newRutas = [...localData.rutas];
                                    newRutas[rIdx].vuelos[vIdx].precioMax = parseFloat(e.target.value);
                                    onChange({ ...localData, rutas: newRutas });
                                  }}
                                  className="w-full px-2 py-1 border rounded text-sm"
                                  placeholder="Máximo"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-2">
                              <input
                                type="text"
                                value={vuelo.horario || ''}
                                onChange={(e) => {
                                  const newRutas = [...localData.rutas];
                                  newRutas[rIdx].vuelos[vIdx].horario = e.target.value;
                                  onChange({ ...localData, rutas: newRutas });
                                }}
                                className="px-2 py-1 border rounded text-sm"
                                placeholder="Horario"
                              />
                              <input
                                type="text"
                                value={vuelo.equipaje || '23kg'}
                                onChange={(e) => {
                                  const newRutas = [...localData.rutas];
                                  newRutas[rIdx].vuelos[vIdx].equipaje = e.target.value;
                                  onChange({ ...localData, rutas: newRutas });
                                }}
                                className="px-2 py-1 border rounded text-sm"
                                placeholder="Equipaje"
                              />
                              <input
                                type="text"
                                value={vuelo.comida || 'Incluida'}
                                onChange={(e) => {
                                  const newRutas = [...localData.rutas];
                                  newRutas[rIdx].vuelos[vIdx].comida = e.target.value;
                                  onChange({ ...localData, rutas: newRutas });
                                }}
                                className="px-2 py-1 border rounded text-sm"
                                placeholder="Comida"
                              />
                            </div>

                            {/* Beneficios */}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {(vuelo.beneficios || []).map((ben, i) => (
                                <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                                  {ben}
                                  <button onClick={() => {
                                    const newRutas = [...localData.rutas];
                                    newRutas[rIdx].vuelos[vIdx].beneficios = vuelo.beneficios.filter((_, j) => j !== i);
                                    onChange({ ...localData, rutas: newRutas });
                                  }}>
                                    <X className="h-3 w-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => editVuelo(rIdx, vIdx)} className="text-blue-600 hover:text-blue-800">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button onClick={() => removeVuelo(rIdx, vIdx)} className="text-red-600 hover:text-red-800">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Formulario para agregar vuelo */}
                  {selectedRuta === rIdx && (
                    <div className="mt-4 p-4 bg-sky-50 rounded-lg">
                      <h5 className="font-medium mb-3">
                        {editingVuelo !== null ? 'Editar Vuelo' : 'Nuevo Vuelo'}
                      </h5>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Aerolínea"
                          value={newVuelo.aerolinea}
                          onChange={(e) => setNewVuelo({ ...newVuelo, aerolinea: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg"
                        />

                        <div className="grid grid-cols-2 gap-3">
                          <select
                            value={newVuelo.clase}
                            onChange={(e) => setNewVuelo({ ...newVuelo, clase: e.target.value })}
                            className="px-3 py-2 border rounded-lg"
                          >
                            <option value="Económica">Económica</option>
                            <option value="Ejecutiva">Ejecutiva</option>
                            <option value="Primera Clase">Primera Clase</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Horario"
                            value={newVuelo.horario}
                            onChange={(e) => setNewVuelo({ ...newVuelo, horario: e.target.value })}
                            className="px-3 py-2 border rounded-lg"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="number"
                            placeholder="Precio mínimo $"
                            value={newVuelo.precioMin}
                            onChange={(e) => setNewVuelo({ ...newVuelo, precioMin: e.target.value })}
                            className="px-3 py-2 border rounded-lg"
                          />
                          <input
                            type="number"
                            placeholder="Precio máximo $"
                            value={newVuelo.precioMax}
                            onChange={(e) => setNewVuelo({ ...newVuelo, precioMax: e.target.value })}
                            className="px-3 py-2 border rounded-lg"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Equipaje"
                            value={newVuelo.equipaje}
                            onChange={(e) => setNewVuelo({ ...newVuelo, equipaje: e.target.value })}
                            className="px-3 py-2 border rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="Comida"
                            value={newVuelo.comida}
                            onChange={(e) => setNewVuelo({ ...newVuelo, comida: e.target.value })}
                            className="px-3 py-2 border rounded-lg"
                          />
                        </div>

                        {/* Beneficios */}
                        <div>
                          <label className="block text-sm font-medium mb-1">Beneficios</label>
                          <div className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={newBeneficio}
                              onChange={(e) => setNewBeneficio(e.target.value)}
                              className="flex-1 px-3 py-2 border rounded-lg"
                              placeholder="Ej: Sala VIP"
                            />
                            <button
                              onClick={addBeneficio}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {newVuelo.beneficios.map((ben, i) => (
                              <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                                {ben}
                                <button onClick={() => removeBeneficio(i)}>
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={editingVuelo !== null ? updateVuelo : addVuelo}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            {editingVuelo !== null ? 'Actualizar' : 'Guardar'} Vuelo
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRuta(null);
                              setEditingVuelo(null);
                              resetVueloForm();
                            }}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedRuta !== rIdx && (
                    <button
                      onClick={() => {
                        setSelectedRuta(rIdx);
                        setEditingVuelo(null);
                        resetVueloForm();
                      }}
                      className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Agregar vuelo
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== SECCIÓN 3: CLASES Y TARIFAS ===== */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-600" />
          Clases y Tarifas
        </h3>
        <div className="space-y-4">
          {localData.clases.map((clase, idx) => (
            <div key={idx} className="bg-amber-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  value={clase.nombre || ''}
                  onChange={(e) => {
                    const newClases = [...localData.clases];
                    newClases[idx].nombre = e.target.value;
                    onChange({ ...localData, clases: newClases });
                  }}
                  placeholder="Nombre de la clase"
                  className="px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  value={clase.precio || ''}
                  onChange={(e) => {
                    const newClases = [...localData.clases];
                    newClases[idx].precio = e.target.value;
                    onChange({ ...localData, clases: newClases });
                  }}
                  placeholder="Precio (ej: $350-750)"
                  className="px-3 py-2 border rounded-lg"
                />
              </div>
              <textarea
                value={clase.descripcion || ''}
                onChange={(e) => {
                  const newClases = [...localData.clases];
                  newClases[idx].descripcion = e.target.value;
                  onChange({ ...localData, clases: newClases });
                }}
                placeholder="Descripción"
                className="w-full px-3 py-2 border rounded-lg mb-2"
                rows="2"
              />
              <div className="space-y-2">
                <h6 className="text-sm font-medium">Beneficios</h6>
                {clase.beneficios?.map((ben, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={ben}
                      onChange={(e) => {
                        const newClases = [...localData.clases];
                        newClases[idx].beneficios[i] = e.target.value;
                        onChange({ ...localData, clases: newClases });
                      }}
                      className="flex-1 px-3 py-2 border rounded-lg"
                    />
                    <button onClick={() => {
                      const newClases = [...localData.clases];
                      newClases[idx].beneficios = clase.beneficios.filter((_, j) => j !== i);
                      onChange({ ...localData, clases: newClases });
                    }} className="text-red-500">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newClases = [...localData.clases];
                    if (!newClases[idx].beneficios) newClases[idx].beneficios = [];
                    newClases[idx].beneficios.push('');
                    onChange({ ...localData, clases: newClases });
                  }}
                  className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Agregar beneficio
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              const newClases = [...localData.clases, { nombre: '', precio: '', descripcion: '', beneficios: [] }];
              onChange({ ...localData, clases: newClases });
            }}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Agregar Clase
          </button>
        </div>
      </div>

      {/* ===== SECCIÓN 4: AEROLÍNEAS ===== */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold mb-3">Aerolíneas</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {localData.aerolineas.map((aero, idx) => (
            <span key={idx} className="flex items-center gap-2 px-3 py-2 bg-sky-100 text-sky-700 rounded-lg">
              <input
                type="text"
                value={aero}
                onChange={(e) => {
                  const newAerolineas = [...localData.aerolineas];
                  newAerolineas[idx] = e.target.value;
                  onChange({ ...localData, aerolineas: newAerolineas });
                }}
                className="bg-transparent border-none focus:outline-none w-auto"
              />
              <button onClick={() => removeFromList('aerolineas', idx)}>
                <X className="h-4 w-4 text-red-500" />
              </button>
            </span>
          ))}
        </div>
        <button
          onClick={() => addToList('aerolineas', '')}
          className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Agregar Aerolínea
        </button>
      </div>

      {/* ===== SECCIÓN 5: POLÍTICAS DE EQUIPAJE ===== */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-blue-600" />
          Políticas de Equipaje
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Equipaje de cabina</label>
            <input
              type="text"
              value={localData.equipaje.cabina}
              onChange={(e) => onChange({
                ...localData,
                equipaje: { ...localData.equipaje, cabina: e.target.value }
              })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Equipaje en bodega</label>
            <input
              type="text"
              value={localData.equipaje.bodega}
              onChange={(e) => onChange({
                ...localData,
                equipaje: { ...localData.equipaje, bodega: e.target.value }
              })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio por kg extra ($)</label>
            <input
              type="number"
              value={localData.equipaje.precioExtra}
              onChange={(e) => onChange({
                ...localData,
                equipaje: { ...localData.equipaje, precioExtra: parseFloat(e.target.value) }
              })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* ===== SECCIÓN 6: DESTINOS POPULARES ===== */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold mb-4">Destinos Populares</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {localData.destinosPopulares.map((dest, idx) => (
            <div key={idx} className="flex gap-2 p-3 bg-gray-50 rounded-lg">
              <input
                type="text"
                value={dest.ciudad || ''}
                onChange={(e) => {
                  const newDestinos = [...localData.destinosPopulares];
                  newDestinos[idx].ciudad = e.target.value;
                  onChange({ ...localData, destinosPopulares: newDestinos });
                }}
                placeholder="Ciudad"
                className="flex-1 px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                value={dest.precio || ''}
                onChange={(e) => {
                  const newDestinos = [...localData.destinosPopulares];
                  newDestinos[idx].precio = e.target.value;
                  onChange({ ...localData, destinosPopulares: newDestinos });
                }}
                placeholder="Precio"
                className="w-24 px-3 py-2 border rounded-lg"
              />
              <input
                type="number"
                value={dest.vuelos || ''}
                onChange={(e) => {
                  const newDestinos = [...localData.destinosPopulares];
                  newDestinos[idx].vuelos = parseInt(e.target.value);
                  onChange({ ...localData, destinosPopulares: newDestinos });
                }}
                placeholder="Vuelos"
                className="w-20 px-3 py-2 border rounded-lg"
              />
              <button onClick={() => removeFromList('destinosPopulares', idx)}>
                <Trash2 className="h-5 w-5 text-red-500" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => addToList('destinosPopulares', { ciudad: '', precio: '', vuelos: 0 })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Agregar Destino Popular
        </button>
      </div>
    </div>
  );
};

export default FlightsPanel;