import React, { useState, useEffect } from 'react';
import {
  Plus, Edit, Trash2, Search,
  CheckCircle, Save, X
} from 'lucide-react';
import { useServices } from '../../contexts/services/ServicesContext';
import { toast } from 'react-hot-toast';

// Importar paneles específicos
import ShippingPanel from './ServicePanels/ShippingPanel';
import ToursPanel from './ServicePanels/ToursPanel';
import RentalPanel from './ServicePanels/RentalPanel';
import HotelsPanel from './ServicePanels/HotelsPanel';
import FlightsPanel from './ServicePanels/FlightsPanel';
import VisasPanel from './ServicePanels/VisasPanel';
import ImageUploader from './ImageUploader';

// Tipos de servicios
const SERVICE_TYPES = [
  { id: 'shipping', name: '📦 Paquetería', component: ShippingPanel, color: 'green' },
  { id: 'tours', name: '🏝️ Tours', component: ToursPanel, color: 'blue' },
  { id: 'rental', name: '🚗 Renta de Autos', component: RentalPanel, color: 'amber' },
  { id: 'hotels', name: '🏨 Hoteles', component: HotelsPanel, color: 'purple' },
  { id: 'flights', name: '✈️ Vuelos', component: FlightsPanel, color: 'sky' },
  { id: 'visas', name: '🛂 Visas', component: VisasPanel, color: 'emerald' }
];

// Estructura inicial para cada tipo de servicio
const getInitialContent = (type) => {
  switch(type) {
    case 'shipping':
      return {
        rangosPrecios: { minimo: 15, maximo: 250 },
        productosPermitidos: [],
        productosRestringidos: [],
        tarifas: [],
        destinos: [],
        tiempos: { nacional: '2-4 días', internacional: '5-10 días', express: '24-48h' }
      };
    case 'tours':
      return {
        destinos: [],
        incluye: [],
        noIncluye: [],
        recomendaciones: []
      };
    case 'rental':
      return {
        sucursales: [],
        vehiculos: [],
        seguros: [],
        requisitos: []
      };
    case 'hotels':
      return {
        destinos: [],
        servicios: [],
        politicas: { checkIn: '15:00', checkOut: '12:00' }
      };
    case 'flights':
      return {
        rutas: [],
        clases: [],
        aerolineas: []
      };
    case 'visas':
      return {
        paises: [],
        requisitos: [],
        documentos: [],
        tiempos: { minimo: '5 días', promedio: '15 días', maximo: '30 días' }
      };
    default:
      return {};
  }
};

const AdminServicesManager = () => {
  const { services, loading, addService, updateService, deleteService } = useServices();
  
  const [editingId, setEditingId] = useState(null);
  const [selectedType, setSelectedType] = useState('shipping');
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    mainImage: '',
    gallery: [],
    content: getInitialContent('shipping'),
    isActive: true,
    isFeatured: false
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [saving, setSaving] = useState(false);

  // Resetear formulario cuando cambia el tipo
  useEffect(() => {
    if (!editingId) {
      setFormData({
        title: '',
        subtitle: '',
        mainImage: '',
        gallery: [],
        content: getInitialContent(selectedType),
        isActive: true,
        isFeatured: false
      });
    }
  }, [selectedType, editingId]);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.subtitle?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || service.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setEditingId(null);
  };

  const handleMainImageChange = (imageUrl) => {
    setFormData(prev => ({ ...prev, mainImage: imageUrl }));
  };

  const handleGalleryChange = (galleryUrls) => {
    setFormData(prev => ({ ...prev, gallery: galleryUrls }));
  };

  const handleContentChange = (newContent) => {
    setFormData(prev => ({ ...prev, content: newContent }));
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('El título es obligatorio');
      return;
    }

    setSaving(true);

    try {
      const serviceData = {
        ...formData,
        type: selectedType,
        updatedAt: new Date().toISOString()
      };

      if (editingId) {
        await updateService(editingId, serviceData);
        toast.success('✅ Servicio actualizado');
      } else {
        await addService(serviceData);
        toast.success('✅ Servicio creado');
      }

      // Resetear formulario
      setEditingId(null);
      setFormData({
        title: '',
        subtitle: '',
        mainImage: '',
        gallery: [],
        content: getInitialContent(selectedType),
        isActive: true,
        isFeatured: false
      });
    } catch (error) {
      console.error('Error:', error);
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
      content: service.content || getInitialContent(service.type),
      isActive: service.isActive !== false,
      isFeatured: service.isFeatured || false
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este servicio?')) {
      try {
        await deleteService(id);
        toast.success('✅ Servicio eliminado');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: '',
      subtitle: '',
      mainImage: '',
      gallery: [],
      content: getInitialContent(selectedType),
      isActive: true,
      isFeatured: false
    });
  };

  const SelectedPanel = SERVICE_TYPES.find(t => t.id === selectedType)?.component;

  if (loading && services.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando servicios...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Servicios</h1>
        <p className="text-gray-600">Cada servicio tiene su propia configuración</p>
      </div>

      {/* Selector de Tipo */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Tipo de Servicio</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {SERVICE_TYPES.map(type => (
            <button
              key={type.id}
              onClick={() => handleTypeChange(type.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedType === type.id
                  ? `border-${type.color}-500 bg-${type.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">{type.name.split(' ')[0]}</div>
              <div className="text-sm font-medium">{type.name.split(' ')[1]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {editingId ? '✏️ Editar Servicio' : '➕ Nuevo Servicio'}
          </h2>
          {editingId && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancelar edición
            </button>
          )}
        </div>

        <form onSubmit={handleSaveService} className="space-y-6">
          {/* Campos básicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título del Servicio *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                placeholder="Ej: Paquetería Express"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtítulo
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                placeholder="Breve descripción"
              />
            </div>
          </div>

          {/* Imagen Principal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen Principal
            </label>
            <ImageUploader
              value={formData.mainImage}
              onChange={handleMainImageChange}
              folder={`services/${selectedType}`}
            />
          </div>

          {/* Panel específico del servicio */}
          {SelectedPanel && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Configuración específica</h3>
              <SelectedPanel
                data={formData.content}
                onChange={handleContentChange}
              />
            </div>
          )}

          {/* Opciones */}
          <div className="flex gap-6 pt-4 border-t">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-amber-500"
              />
              <span className="text-sm text-gray-700">Servicio activo</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 text-amber-500"
              />
              <span className="text-sm text-gray-700">Destacar servicio</span>
            </label>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3">
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
              className="px-8 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="h-5 w-5" />
              {saving ? 'Guardando...' : (editingId ? 'Actualizar' : 'Crear Servicio')}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Servicios */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">📋 Servicios Creados</h2>
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
              {SERVICE_TYPES.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => {
            const typeInfo = SERVICE_TYPES.find(t => t.id === service.type);
            return (
              <div
                key={service.id}
                className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40 bg-gray-100">
                  {service.mainImage ? (
                    <img
                      src={service.mainImage}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Sin imagen
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 bg-${typeInfo?.color}-100 text-${typeInfo?.color}-800 rounded-full text-xs font-medium`}>
                      {typeInfo?.name}
                    </span>
                  </div>
                  {service.isFeatured && (
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-amber-500 text-white rounded-full text-xs">
                        ⭐ Destacado
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{service.subtitle}</p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminServicesManager;