import React, { useState, useEffect } from 'react';
import { useServices } from '../../../contexts/services/ServicesContext';
import { toast } from 'react-hot-toast';
import ServiceTypeSelector from './ServiceTypeSelector';
import BasicInfoForm from './BasicInfoForm';
import ImageManager from './ImageManager';
import ShippingPanel from './panels/ShippingPanel';
import ToursPanel from './panels/ToursPanel';
import RentalPanel from './panels/RentalPanel';
import HotelsPanel from './panels/HotelsPanel';
import FlightsPanel from './panels/FlightsPanel';
import VisasPanel from './panels/VisasPanel';
import { Save, X, Edit, Trash2, Search } from 'lucide-react';

// Estructura inicial para cada tipo
const getInitialStructure = (type) => {
  const base = {
    title: '',
    subtitle: '',
    mainImage: '',
    gallery: [],
    isActive: true,
    isFeatured: false
  };

  const contentByType = {
    shipping: {
      rangosPrecios: { minimo: 15, maximo: 250 },
      productosPermitidos: [],
      productosRestringidos: [],
      tarifas: [],
      destinos: [],
      tiempos: { nacional: '2-4 días', internacional: '5-10 días', express: '24-48h' }
    },
    tours: {
      destinos: [],
      incluye: [],
      noIncluye: [],
      recomendaciones: []
    },
    rental: {
      sucursales: [],
      vehiculos: [],
      seguros: [],
      requisitos: []
    },
    hotels: {
      destinos: [],
      serviciosGenerales: ['WiFi', 'Desayuno', 'Piscina'],
      politicas: { checkIn: '15:00', checkOut: '12:00' }
    },
    flights: {
      rutas: [],
      clases: [
        { nombre: 'Económica', beneficios: ['Asiento estándar', 'Comida incluida'] },
        { nombre: 'Ejecutiva', beneficios: ['Asiento reclinable', 'Sala VIP'] }
      ],
      aerolineas: []
    },
    visas: {
      paises: [],
      requisitos: [],
      documentos: [],
      tiempos: { minimo: '5 días', promedio: '15 días', maximo: '30 días' }
    }
  };

  return {
    ...base,
    type,
    content: contentByType[type] || {}
  };
};

const ServiceManager = () => {
  const { services, loading, addService, updateService, deleteService } = useServices();
  
  const [selectedType, setSelectedType] = useState('shipping');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(getInitialStructure('shipping'));
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editingId) {
      setFormData(getInitialStructure(selectedType));
    }
  }, [selectedType]);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.subtitle?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || service.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContentChange = (newContent) => {
    setFormData(prev => ({ ...prev, content: newContent }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('El título es obligatorio');
      return;
    }

    setSaving(true);
    try {
      const serviceData = {
        ...formData,
        updatedAt: new Date().toISOString()
      };

      if (editingId) {
        await updateService(editingId, serviceData);
        toast.success('✅ Servicio actualizado');
      } else {
        await addService(serviceData);
        toast.success('✅ Servicio creado');
      }

      setEditingId(null);
      setFormData(getInitialStructure(selectedType));
    } catch (error) {
      toast.error('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setSelectedType(service.type);
    setFormData({
      title: service.title || '',
      subtitle: service.subtitle || '',
      mainImage: service.mainImage || '',
      gallery: service.gallery || [],
      content: service.content || getInitialStructure(service.type).content,
      isActive: service.isActive !== false,
      isFeatured: service.isFeatured || false,
      type: service.type
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este servicio?')) {
      await deleteService(id);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(getInitialStructure(selectedType));
  };

  const renderPanel = () => {
    const props = {
      data: formData.content,
      onChange: handleContentChange
    };

    switch(selectedType) {
      case 'shipping': return <ShippingPanel {...props} />;
      case 'tours': return <ToursPanel {...props} />;
      case 'rental': return <RentalPanel {...props} />;
      case 'hotels': return <HotelsPanel {...props} />;
      case 'flights': return <FlightsPanel {...props} />;
      case 'visas': return <VisasPanel {...props} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Gestión de Servicios</h1>
        <p className="text-amber-100">Administra todos tus servicios turísticos</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingId ? '✏️ Editar Servicio' : '➕ Nuevo Servicio'}
          </h2>
          {editingId && (
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-4 w-4" />
              Cancelar
            </button>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          <ServiceTypeSelector
            selected={selectedType}
            onChange={setSelectedType}
            disabled={!!editingId}
          />

          <BasicInfoForm
            title={formData.title}
            subtitle={formData.subtitle}
            onChange={handleInputChange}
          />

          <ImageManager
            mainImage={formData.mainImage}
            gallery={formData.gallery}
            onChange={(field, value) => handleInputChange(field, value)}
          />

          <div className="border-t pt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Configuración Específica
            </h3>
            {renderPanel()}
          </div>

          <div className="flex gap-6 pt-4 border-t">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                className="w-5 h-5 text-amber-500 rounded"
              />
              <span className="text-gray-700">Servicio activo</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                className="w-5 h-5 text-amber-500 rounded"
              />
              <span className="text-gray-700">Destacar en inicio</span>
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 disabled:opacity-50"
            >
              <Save className="h-5 w-5" />
              {saving ? 'Guardando...' : (editingId ? 'Actualizar' : 'Crear Servicio')}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Servicios Creados</h2>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">Todos</option>
              <option value="shipping">📦 Paquetería</option>
              <option value="tours">🏝️ Tours</option>
              <option value="rental">🚗 Autos</option>
              <option value="hotels">🏨 Hoteles</option>
              <option value="flights">✈️ Vuelos</option>
              <option value="visas">🛂 Visas</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div key={service.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-40 bg-gray-100">
                {service.mainImage ? (
                  <img src={service.mainImage} alt={service.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">Sin imagen</div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
                    {service.type === 'shipping' && '📦'}
                    {service.type === 'tours' && '🏝️'}
                    {service.type === 'rental' && '🚗'}
                    {service.type === 'hotels' && '🏨'}
                    {service.type === 'flights' && '✈️'}
                    {service.type === 'visas' && '🛂'}
                  </span>
                </div>
                {service.isFeatured && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-amber-500 text-white rounded-full text-xs">⭐ Destacado</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{service.subtitle}</p>
                <div className="flex justify-end gap-2">
                  <button onClick={() => handleEdit(service)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(service.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceManager;