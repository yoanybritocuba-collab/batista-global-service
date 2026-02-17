import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServices } from '../../contexts/services/ServicesContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Star, MapPin, Clock, DollarSign, Package, Car, Globe, Plane, Hotel, Briefcase } from 'lucide-react';

const ServiciosPage = () => {
  const navigate = useNavigate();
  const { services, loading, loadServices } = useServices();
  const { t } = useLanguage();

  useEffect(() => {
    loadServices();
  }, []);

  const handleCardClick = (serviceId) => {
    navigate(`/servicio/${serviceId}`);
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('/')) return imageUrl;
    if (imageUrl.startsWith('data:')) return imageUrl;
    return `/images/${imageUrl}`;
  };

  const getServiceIcon = (type) => {
    switch(type) {
      case 'shipping': return <Package className="h-5 w-5" />;
      case 'tours': return <Globe className="h-5 w-5" />;
      case 'rental': return <Car className="h-5 w-5" />;
      case 'hotels': return <Hotel className="h-5 w-5" />;
      case 'flights': return <Plane className="h-5 w-5" />;
      case 'visas': return <Briefcase className="h-5 w-5" />;
      default: return <Star className="h-5 w-5" />;
    }
  };

  const getServiceColor = (type) => {
    switch(type) {
      case 'shipping': return 'bg-green-100 text-green-700';
      case 'tours': return 'bg-blue-100 text-blue-700';
      case 'rental': return 'bg-amber-100 text-amber-700';
      case 'hotels': return 'bg-purple-100 text-purple-700';
      case 'flights': return 'bg-sky-100 text-sky-700';
      case 'visas': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">{t('cargando')}</p>
        </div>
      </div>
    );
  }

  const activeServices = services.filter(service => service.isActive !== false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
            {t('nuestros_servicios')}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto text-center">
            {t('descripcion_servicios')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-16">
        {activeServices.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏝️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('proximamente')}</h2>
            <p className="text-gray-600">{t('preparando_servicios')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeServices.map((service) => (
              <div
                key={service.id}
                onClick={() => handleCardClick(service.id)}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={getImageUrl(service.mainImage)}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium shadow-lg flex items-center gap-1 ${getServiceColor(service.type)}`}>
                      {getServiceIcon(service.type)}
                      {service.type === 'shipping' ? t('paqueteria_express') :
                       service.type === 'tours' ? t('paquetes_turisticos') :
                       service.type === 'rental' ? t('renta_autos') :
                       service.type === 'hotels' ? t('reservas_hoteles') :
                       service.type === 'flights' ? t('reservas_vuelos') :
                       service.type === 'visas' ? t('visas') : t('servicios')}
                    </span>
                  </div>
                  {service.isFeatured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-sm font-medium shadow-lg flex items-center gap-1">
                        <Star className="h-4 w-4 fill-white" />
                        {t('destacado')}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1 line-clamp-2">{service.title}</h3>
                    <p className="text-white/90 text-sm line-clamp-2">{service.subtitle}</p>
                  </div>
                </div>
                <div className="p-5 bg-white">
                  <div className="flex justify-between items-center">
                    <span className="text-amber-600 font-medium text-sm group-hover:underline">
                      {t('ver_detalles')}
                    </span>
                    <span className="text-amber-600 group-hover:translate-x-2 transition-transform text-xl">→</span>
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