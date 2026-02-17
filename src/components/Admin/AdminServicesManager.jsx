import React, { useState, useEffect } from 'react';
import {
  Plus, Edit, Trash2, Upload,
  Image as ImageIcon, X, Search,
  CheckCircle, Star,
  Clock, Users, MapPin, DollarSign,
  Package, Plane, Hotel, Car,
  Ship, Briefcase, ChevronDown, ChevronUp
} from 'lucide-react';
import { useServices } from '../../contexts/services/ServicesContext';
import { toast } from 'react-hot-toast';

// Importar los paneles específicos
import ShippingPanel from './ServicePanels/ShippingPanel';
import ToursPanel from './ServicePanels/ToursPanel';
import RentalPanel from './ServicePanels/RentalPanel';
import HotelsPanel from './ServicePanels/HotelsPanel';
import FlightsPanel from './ServicePanels/FlightsPanel';
import VisasPanel from './ServicePanels/VisasPanel';

const AdminServicesManager = () => {
  const { services, loading, addService, updateService, deleteService } = useServices();

  // Estado para formulario
  const [editingService, setEditingService] = useState(null);
  const [selectedType, setSelectedType] = useState('shipping');
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    images: true,
    content: true
  });

  // Estructura base del servicio
  const [formData, setFormData] = useState({
    type: 'shipping',
    title: '',
    subtitle: '',
    mainImage: '',
    gallery: [],
    content: {},
    isActive: true,
    isFeatured: false
  });

  // Estados para imágenes
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  
  // Estados para búsqueda y filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [saving, setSaving] = useState(false);

  // Tipos de servicios
  const serviceTypes = [
    { value: 'shipping', label: '📦 Paquetería', icon: Package },
    { value: 'tours', label: '🏝️ Tours', icon: Ship },
    { value: 'rental', label: '🚗 Renta de Autos', icon: Car },
    { value: 'hotels', label: '🏨 Hoteles', icon: Hotel },
    { value: 'flights', label: '✈️ Vuelos', icon: Plane },
    { value: 'visas', label: '🛂 Visas', icon: Briefcase }
  ];

  // Filtrar servicios
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.subtitle?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || service.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Manejar cambio de tipo
  const handleTypeChange = (type) => {
    setSelectedType(type);
    setFormData(prev => ({
      ...prev,
      type: type,
      content: {}
    }));
  };

  // Manejar cambio de imagen principal
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
        setFormData(prev => ({ ...prev, mainImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Guardar servicio
  const handleSaveService = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const serviceData = {
        ...formData,
        updatedAt: new Date().toISOString()
      };

      if (editingService) {
        await updateService(editingService.id, serviceData);
        toast.success('✅ Servicio actualizado');
      } else {
        await addService(serviceData);
        toast.success('✅ Servicio creado');
      }

      resetForm();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  // Editar servicio
  const handleEdit = (service) => {
    setEditingService(service);
    setSelectedType(service.type);
    setFormData({
      type: service.type,
      title: service.title || '',
      subtitle: service.subtitle || '',
      mainImage: service.mainImage || '',
      gallery: service.gallery || [],
      content: service.content || {},
      isActive: service.isActive !== false,
      isFeatured: service.isFeatured || false
    });
    setMainImagePreview(service.mainImage || '');
    setGalleryPreviews(service.gallery || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Eliminar servicio
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

  // Resetear formulario
  const resetForm = () => {
    setEditingService(null);
    setSelectedType('shipping');
    setFormData({
      type: 'shipping',
      title: '',
      subtitle: '',
      mainImage: '',
      gallery: [],
      content: {},
      isActive: true,
      isFeatured: false
    });
    setMainImagePreview('');
    setGalleryPreviews([]);
  };

  // Renderizar panel según tipo
  const renderContentPanel = () => {
    const props = {
      data: formData.content,
      onChange: (newContent) => setFormData({ ...formData, content: newContent })
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
        <p className="text-gray-600">Crea y edita servicios con información detallada</p>
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-bold">
            {editingService ? '✏️ Editar Servicio' : '➕ Nuevo Servicio'}
          </h2>
          {editingService && (
            <button onClick={resetForm} className="text-gray-600 hover:text-gray-800">
              Cancelar
            </button>
          )}
        </div>

        <form onSubmit={handleSaveService} className="space-y-6">
          {/* Tipo de Servicio */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block font-medium mb-3">Tipo de Servicio</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {serviceTypes.map(type => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleTypeChange(type.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedType === type.value
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-200'
                    }`}
                  >
                    <Icon className="h-6 w-6 mx-auto mb-1" />
                    <span className="text-xs">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Información Básica */}
          <div className="border rounded-xl overflow-hidden">
            <div className="p-4 bg-gray-50 font-semibold">📋 Información Básica</div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Título del servicio"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                required
              />
              <input
                type="text"
                placeholder="Subtítulo"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Imagen Principal */}
          <div className="border rounded-xl overflow-hidden">
            <div className="p-4 bg-gray-50 font-semibold">📸 Imagen Principal</div>
            <div className="p-6">
              {mainImagePreview ? (
                <div className="relative w-64 h-64">
                  <img src={mainImagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => {
                      setMainImagePreview('');
                      setFormData({ ...formData, mainImage: '' });
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="block cursor-pointer">
                  <div className="border-3 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-amber-400 w-64">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Seleccionar imagen</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleMainImageChange} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Panel de Contenido Específico */}
          <div className="border rounded-xl overflow-hidden">
            <div className="p-4 bg-gray-50 font-semibold">📊 Información del Servicio</div>
            <div className="p-6">
              {renderContentPanel()}
            </div>
          </div>

          {/* Opciones */}
          <div className="flex gap-6 p-4 bg-gray-50 rounded-lg">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5"
              />
              <span>Servicio Activo</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-5 h-5"
              />
              <span>Destacado</span>
            </label>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4">
            <button type="button" onClick={resetForm} className="px-6 py-3 border rounded-lg">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50"
            >
              {saving ? 'Guardando...' : (editingService ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Servicios */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">📋 Servicios</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">Todos</option>
              {serviceTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div key={service.id} className="border rounded-xl overflow-hidden">
              <img
                src={service.mainImage || '/images/default-service.jpg'}
                alt={service.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold">{service.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{service.subtitle}</p>
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => handleEdit(service)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(service.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
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

export default AdminServicesManager;