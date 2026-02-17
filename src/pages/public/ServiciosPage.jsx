import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServices } from '../../contexts/services/ServicesContext';
import { Star, Clock, MapPin, Users, DollarSign, Camera } from 'lucide-react';

const ServiciosPage = () => {
  const navigate = useNavigate();
  const { services, loading, loadServices } = useServices();

  useEffect(() => {
    loadServices();
  }, []);

  const handleCardClick = (serviceId) => {
    navigate(`/servicio/${serviceId}`);
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return 'https://via.placeholder.com/400x300?text=Servicio';
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('/')) return imageUrl;
    if (imageUrl.startsWith('data:')) return imageUrl;
    return `/images/${imageUrl}`;
  };

  // Función para obtener el icono según el tipo
  const getTypeIcon = (type) => {
    switch(type) {
      case 'shipping': return '📦';
      case 'tours': return '🏝️';
      case 'rental': return '🚗';
      case 'hotels': return '🏨';
      case 'flights': return '✈️';
      case 'visas': return '🛂';
      default: return '✨';
    }
  };

  // Función para obtener el color según el tipo
  const getTypeColor = (type) => {
    switch(type) {
      case 'shipping': return 'bg-green-100 text-green-800';
      case 'tours': return 'bg-blue-100 text-blue-800';
      case 'rental': return 'bg-amber-100 text-amber-800';
      case 'hotels': return 'bg-purple-100 text-purple-800';
      case 'flights': return 'bg-sky-100 text-sky-800';
      case 'visas': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando servicios turísticos...</p>
        </div>
      </div>
    );
  }

  const activeServices = services.filter(service => service.isActive !== false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-600 to-amber-800 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
            Nuestros Servicios
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto text-center">
            Soluciones completas para tus viajes y envíos en el Caribe
          </p>
        </div>
      </div>

      {/* Grid de Servicios */}
      <div className="container mx-auto px-4 sm:px-6 py-16">
        {activeServices.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏝️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Próximamente</h2>
            <p className="text-gray-600">Estamos preparando servicios increíbles para ti</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeServices.map((service) => (
              <div
                key={service.id}
                onClick={() => handleCardClick(service.id)}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer"
              >
                {/* Contenedor de imagen con altura fija y manejo de errores */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={getImageUrl(service.mainImage || service.imageUrl)}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  
                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Badge de categoría */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium shadow-lg flex items-center gap-1 ${getTypeColor(service.type)}`}>
                      {getTypeIcon(service.type)} {service.type === 'shipping' ? 'Paquetería' :
                        service.type === 'tours' ? 'Tours' :
                        service.type === 'rental' ? 'Renta de Autos' :
                        service.type === 'hotels' ? 'Hoteles' :
                        service.type === 'flights' ? 'Vuelos' :
                        service.type === 'visas' ? 'Visas' : 'Servicio'}
                    </span>
                  </div>

                  {/* Badge de destacado */}
                  {service.isFeatured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-sm font-medium shadow-lg flex items-center gap-1">
                        <Star className="h-4 w-4 fill-white" />
                        Destacado
                      </span>
                    </div>
                  )}

                  {/* Título superpuesto en la imagen */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1 line-clamp-2">
                      {service.title}
                    </h3>
                    <p className="text-white/90 text-sm line-clamp-2">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                {/* Información del servicio */}
                <div className="p-5 bg-white">
                  {/* Métricas rápidas */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {service.content?.tarifasPorPeso?.[0] && (
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-600">
                          Desde ${service.content.tarifasPorPeso[0].precio}
                        </span>
                      </div>
                    )}
                    {service.content?.marcas?.[0] && (
                      <div className="flex items-center gap-2 text-sm">
                        <Car className="h-4 w-4 text-amber-600" />
                        <span className="text-gray-700">{service.content.marcas.length} modelos</span>
                      </div>
                    )}
                    {service.content?.destinos?.[0] && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-700">{service.content.destinos.length} destinos</span>
                      </div>
                    )}
                    {service.content?.paquetes?.[0] && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span className="text-gray-700">Paquetes disponibles</span>
                      </div>
                    )}
                  </div>

                  {/* Características destacadas */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.content?.productosPermitidos?.slice(0, 3).map((item, idx) => (
                      <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {item}
                      </span>
                    ))}
                    {service.content?.marcas?.slice(0, 2).map((item, idx) => (
                      <span key={idx} className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                        {item.nombre}
                      </span>
                    ))}
                    {service.content?.destinos?.slice(0, 2).map((item, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {item.pais || item.ciudad}
                      </span>
                    ))}
                  </div>

                  {/* Botón ver más */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-amber-600 font-medium text-sm group-hover:underline">
                      Ver detalles completos
                    </span>
                    <span className="text-amber-600 group-hover:translate-x-2 transition-transform text-xl">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiciosPage;