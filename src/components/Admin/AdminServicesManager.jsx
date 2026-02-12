import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Upload, 
  Image as ImageIcon, X, Search,
  CheckCircle, Star,
  Clock, Users, MapPin, DollarSign
} from 'lucide-react';

const AdminServicesManager = () => {
  // Estado para servicios
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para formulario
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: 'tours',
    price: '',
    duration: '',
    location: '',
    capacity: '',
    rating: 5,
    features: ['Incluye guía', 'Transporte', 'Alimentación'],
    imageUrl: '',
    isActive: true,
    isFeatured: false
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [newFeature, setNewFeature] = useState('');

  // Cargar servicios (simulado)
  useEffect(() => {
    setTimeout(() => {
      const sampleServices = [
        {
          id: '1',
          title: 'Tour Isla Saona Premium',
          subtitle: 'Experiencia todo incluido en paraíso caribeño',
          description: 'Excursión de día completo a la Isla Saona con transporte, alimentación premium, bebidas ilimitadas y actividades acuáticas.',
          category: 'tours',
          price: 129,
          duration: '10 horas',
          location: 'Isla Saona, La Romana',
          capacity: '20 personas',
          rating: 4.9,
          features: ['Transporte ida y vuelta', 'Almuerzo buffet', 'Bebidas ilimitadas', 'Snorkeling', 'Fotos profesionales'],
          imageUrl: '/images/paquetes-turisticos.jpg',
          isActive: true,
          isFeatured: true,
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          title: 'Paquetería Express Caribe',
          subtitle: 'Envíos rápidos a todo el Caribe',
          description: 'Servicio de paquetería express con entrega en 24-48 horas a todas las islas del Caribe. Seguimiento en tiempo real y seguro incluido.',
          category: 'shipping',
          price: 25,
          duration: '24-48 horas',
          location: 'Todo el Caribe',
          capacity: 'Hasta 50kg',
          rating: 4.7,
          features: ['Entrega express', 'Seguimiento en vivo', 'Seguro incluido', 'Embalaje profesional', 'Recogida a domicilio'],
          imageUrl: '/images/Paqueteria.jpg',
          isActive: true,
          isFeatured: false,
          createdAt: '2024-01-14'
        },
        {
          id: '3',
          title: 'Resort Luxury Bahía',
          subtitle: 'Todo incluido 5 estrellas',
          description: 'Paquete todo incluido en resort 5 estrellas con spa, múltiples piscinas, restaurantes gourmet y actividades diarias.',
          category: 'hotels',
          price: 320,
          duration: '3 noches',
          location: 'Punta Cana',
          capacity: '2 adultos + 2 niños',
          rating: 4.8,
          features: ['Todo incluido', 'Habitación suite', 'Spa acceso ilimitado', 'Restaurantes gourmet', 'Actividades diarias'],
          imageUrl: '/images/reservas_de_hoteles.jpg',
          isActive: true,
          isFeatured: true,
          createdAt: '2024-01-12'
        },
        {
          id: '4',
          title: 'Vuelos Caribe Express',
          subtitle: 'Las mejores tarifas aéreas',
          description: 'Reserva de vuelos a destinos caribeños con las mejores tarifas del mercado. Flexibilidad de cambios y millas acumulables.',
          category: 'flights',
          price: 189,
          duration: 'Variable',
          location: 'Todos los destinos',
          capacity: 'Grupos hasta 50',
          rating: 4.6,
          features: ['Tarifas exclusivas', 'Cambios flexibles', 'Millas acumulables', 'Asistencia 24/7', 'Equipaje incluido'],
          imageUrl: '/images/reservas_de_vuelos.jpg',
          isActive: true,
          isFeatured: false,
          createdAt: '2024-01-10'
        },
        {
          id: '5',
          title: 'Renta de Jeep 4x4',
          subtitle: 'Aventura todo terreno',
          description: 'Renta de Jeep 4x4 para explorar la isla a tu ritmo. Incluye seguro completo, kilometraje ilimitado y entrega en aeropuerto.',
          category: 'rental',
          price: 89,
          duration: '24 horas',
          location: 'Aeropuerto PUJ',
          capacity: '5 personas',
          rating: 4.5,
          features: ['Seguro completo', 'Kilometraje ilimitado', 'Entrega en aeropuerto', 'GPS incluido', 'Asistencia en ruta'],
          imageUrl: '/images/renta-de-autos.jpg',
          isActive: true,
          isFeatured: true,
          createdAt: '2024-01-08'
        }
      ];
      
      setServices(sampleServices);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar servicios
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Manejar cambio en formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Manejar cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Agregar característica
  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  // Eliminar característica
  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  // Guardar servicio
  const handleSaveService = (e) => {
    e.preventDefault();
    
    const serviceData = {
      ...formData,
      id: editingService?.id || Date.now().toString(),
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      imageUrl: imagePreview || formData.imageUrl,
      updatedAt: new Date().toISOString(),
      createdAt: editingService?.createdAt || new Date().toISOString()
    };
    
    if (editingService) {
      // Actualizar servicio existente
      setServices(prev => 
        prev.map(s => s.id === editingService.id ? serviceData : s)
      );
      alert('✅ Servicio actualizado correctamente');
    } else {
      // Crear nuevo servicio
      setServices(prev => [serviceData, ...prev]);
      alert('✅ Servicio creado correctamente');
    }
    
    // Resetear formulario
    resetForm();
  };

  // Editar servicio
  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      subtitle: service.subtitle,
      description: service.description,
      category: service.category,
      price: service.price,
      duration: service.duration,
      location: service.location,
      capacity: service.capacity,
      rating: service.rating,
      features: [...service.features],
      imageUrl: service.imageUrl,
      isActive: service.isActive,
      isFeatured: service.isFeatured
    });
    setImagePreview(service.imageUrl || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Eliminar servicio
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este servicio?')) {
      setServices(prev => prev.filter(s => s.id !== id));
      alert('🗑️ Servicio eliminado');
    }
  };

  // Toggle estado activo
  const handleToggleActive = (id) => {
    setServices(prev => 
      prev.map(service => 
        service.id === id 
          ? { ...service, isActive: !service.isActive }
          : service
      )
    );
  };

  // Resetear formulario
  const resetForm = () => {
    setEditingService(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      category: 'tours',
      price: '',
      duration: '',
      location: '',
      capacity: '',
      rating: 5,
      features: ['Incluye guía', 'Transporte', 'Alimentación'],
      imageUrl: '',
      isActive: true,
      isFeatured: false
    });
    setImageFile(null);
    setImagePreview('');
    setNewFeature('');
  };

  // Categorías de servicios
  const categories = [
    { value: 'tours', label: 'Tours y Excursiones', icon: '🏝️', color: 'bg-blue-100 text-blue-800' },
    { value: 'shipping', label: 'Paquetería', icon: '📦', color: 'bg-green-100 text-green-800' },
    { value: 'hotels', label: 'Hoteles', icon: '🏨', color: 'bg-purple-100 text-purple-800' },
    { value: 'flights', label: 'Vuelos', icon: '✈️', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'rental', label: 'Renta de Autos', icon: '🚗', color: 'bg-red-100 text-red-800' },
    { value: 'other', label: 'Otros Servicios', icon: '⭐', color: 'bg-gray-100 text-gray-800' }
  ];

  // Obtener icono de categoría
  const getCategoryIcon = (category) => {
    return categories.find(c => c.value === category)?.icon || '⭐';
  };

  if (loading && services.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando servicios...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gestión de Servicios Turísticos</h1>
            <p className="text-gray-600">Administra tus paquetes y servicios turísticos</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{services.length}</div>
              <div className="text-sm text-gray-500">Servicios activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {services.filter(s => s.isFeatured).length}
              </div>
              <div className="text-sm text-gray-500">Destacados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario de servicio */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            {editingService ? '✏️ Editar Servicio' : '➕ Agregar Nuevo Servicio'}
          </h2>
          {editingService && (
            <button
              onClick={resetForm}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar edición
            </button>
          )}
        </div>

        <form onSubmit={handleSaveService} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Columna izquierda - Información básica */}
            <div className="space-y-6">
              {/* Título y categoría */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Título del Servicio *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Ej: Tour Isla Saona Premium"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Categoría *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subtítulo */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subtítulo
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Breve descripción que aparecerá en la tarjeta"
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Descripción Completa *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Describe el servicio en detalle, incluyendo todas las características importantes..."
                />
              </div>

              {/* Características */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Características Incluidas
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Agregar una característica..."
                      className="flex-1 px-4 py-2 border rounded-lg"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="text-gray-500 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha - Detalles e imagen */}
            <div className="space-y-6">
              {/* Detalles del servicio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <DollarSign className="inline h-4 w-4 mr-1" />
                    Precio por persona ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="129.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Duración
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Ej: 10 horas, 3 días, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Ubicación
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Ej: Punta Cana, Isla Saona"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Users className="inline h-4 w-4 mr-1" />
                    Capacidad
                  </label>
                  <input
                    type="text"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Ej: 20 personas, Grupo familiar"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Star className="inline h-4 w-4 mr-1" />
                  Calificación (1-5)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    step="0.1"
                    className="flex-1"
                  />
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold">{formData.rating}</span>
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 ⭐</span>
                  <span>5 ⭐⭐⭐⭐⭐</span>
                </div>
              </div>

              {/* Imagen del servicio */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Imagen del Servicio
                </label>
                
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Vista previa"
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setImageFile(null);
                        setFormData(prev => ({ ...prev, imageUrl: '' }));
                      }}
                      className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="mt-2 text-center">
                      <label className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
                        <Upload className="h-4 w-4" />
                        Cambiar Imagen
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="block cursor-pointer">
                    <div className="border-3 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-green-400 hover:bg-green-50 transition-colors">
                      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600 mb-2">
                        Arrastra una imagen o haz clic para seleccionar
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        PNG, JPG o WEBP (Max. 5MB)
                      </p>
                      <span className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Upload className="h-4 w-4" />
                        Seleccionar Imagen
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Opciones adicionales */}
          <div className="flex flex-wrap gap-6 p-4 bg-gray-50 rounded-lg">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  formData.isActive ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    formData.isActive ? 'transform translate-x-5' : 'transform translate-x-1'
                  }`}></div>
                </div>
              </div>
              <div>
                <span className="font-medium">Servicio Activo</span>
                <p className="text-sm text-gray-500">Visible para los clientes</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  formData.isFeatured ? 'bg-purple-500' : 'bg-gray-300'
                }`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    formData.isFeatured ? 'transform translate-x-5' : 'transform translate-x-1'
                  }`}></div>
                </div>
              </div>
              <div>
                <span className="font-medium">Destacado</span>
                <p className="text-sm text-gray-500">Mostrar en sección principal</p>
              </div>
            </label>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-3 px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
            >
              <CheckCircle className="h-5 w-5" />
              {editingService ? 'Actualizar Servicio' : 'Crear Servicio'}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de servicios existentes */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-xl font-bold">🏝️ Servicios Existentes</h2>
          
          {/* Filtros y búsqueda */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar servicios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tarjetas de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className={`border rounded-2xl overflow-hidden transition-all hover:shadow-lg ${
              !service.isActive ? 'opacity-60' : ''
            }`}>
              {/* Imagen y categoría */}
              <div className="relative h-48">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${categories.find(c => c.value === service.category)?.color}`}>
                    {getCategoryIcon(service.category)} {categories.find(c => c.value === service.category)?.label}
                  </span>
                </div>
                {service.isFeatured && (
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-medium">
                      ⭐ Destacado
                    </span>
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{service.title}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold">{service.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.subtitle}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-bold">${service.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-600" />
                    <span className="truncate">{service.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span>{service.capacity}</span>
                  </div>
                </div>

                {/* Características */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Incluye:</div>
                  <div className="flex flex-wrap gap-1">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                        +{service.features.length - 3} más
                      </span>
                    )}
                  </div>
                </div>

                {/* Estado y acciones */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${service.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">{service.isActive ? 'Activo' : 'Inactivo'}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleToggleActive(service.id)}
                      className={`p-2 rounded-lg ${service.isActive ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'}`}
                      title={service.isActive ? 'Desactivar' : 'Activar'}
                    >
                      {service.isActive ? '🚫' : '✅'}
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🏝️</div>
            <h3 className="text-lg font-medium mb-2">No hay servicios</h3>
            <p className="text-gray-600">Crea tu primer servicio usando el formulario de arriba</p>
          </div>
        )}

        {/* Estadísticas */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{filteredServices.length}</div>
            <div className="text-sm text-gray-600">Servicios totales</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {filteredServices.filter(s => s.category === 'tours').length}
            </div>
            <div className="text-sm text-gray-600">Tours</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {filteredServices.filter(s => s.isFeatured).length}
            </div>
            <div className="text-sm text-gray-600">Destacados</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {filteredServices.filter(s => !s.isActive).length}
            </div>
            <div className="text-sm text-gray-600">Inactivos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminServicesManager;