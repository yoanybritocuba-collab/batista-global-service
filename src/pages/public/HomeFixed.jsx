import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useServices } from '../../contexts/services/ServicesContext';
import { Star, MapPin, Clock, DollarSign, Package, Car, Globe, Plane, Hotel, Briefcase } from 'lucide-react';

const HomeFixed = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { services, loadServices } = useServices();
  const [serviciosDestacados, setServiciosDestacados] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      const activos = services.filter(s => s.isActive !== false);
      setServiciosDestacados(activos.slice(0, 6));
    }
  }, [services]);

  const handleServiceClick = (serviceId) => {
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

  return (
    <div className="m-0 p-0 bg-black">
      
      {/* HERO - CON MÁS MARGEN SUPERIOR PARA QUE NO TAPE LAS LETRAS */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-auto min-h-[500px] lg:min-h-[700px] flex items-end pb-16 lg:pb-24 -mt-[148px] lg:-mt-[116px] mt-16">
        
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src="/images/hero1.png" 
            alt="Batista Global Service" 
            className="w-full h-full object-contain lg:object-cover mx-auto"
            style={{
              transform: window.innerWidth < 768 
                ? 'translateY(-40px)'  // 👈 MENOS desplazamiento negativo
                : 'translateY(0px)',   // 👈 SIN desplazamiento negativo
            }}
          />
        </div>
        
        {/* Contenido - BAJADO PARA QUE NO SE TAPE */}
        <div className="container mx-auto px-4 relative z-20 w-full mb-16 lg:mb-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 lg:mb-6 leading-tight">
              Batista <span className="text-amber-400">Global Service</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center mt-4 lg:mt-8">
              <Link 
                to="/tienda" 
                className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 bg-[#00A8B5] text-white font-semibold rounded-xl text-center hover:shadow-[0_0_25px_rgba(255,184,0,0.6)] transition-all duration-300 text-sm lg:text-base"
              >
                {t('explorar_tienda')}
              </Link>
              <Link 
                to="/servicios" 
                className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold rounded-xl text-center hover:bg-white/20 hover:border-amber-400/60 transition-all duration-300 text-sm lg:text-base"
              >
                {t('nuestros_servicios')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS DESTACADOS */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {t('servicios_turisticos')}
            </h2>
            <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full"></div>
            <p className="text-sm lg:text-base text-gray-600 mt-4 max-w-2xl mx-auto">
              {t('descripcion_servicios')}
            </p>
          </div>

          {serviciosDestacados.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">{t('cargando')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviciosDestacados.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getImageUrl(service.mainImage)}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getServiceColor(service.type)}`}>
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
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-amber-500 text-white rounded-full text-xs flex items-center gap-1">
                          <Star className="h-3 w-3 fill-white" />
                          {t('destacado')}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {service.subtitle}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      {service.type === 'shipping' && service.content?.rangosPrecios && (
                        <>
                          <DollarSign className="h-3 w-3" />
                          <span>{t('desde')} ${service.content.rangosPrecios.minimo} {t('hasta')} ${service.content.rangosPrecios.maximo}</span>
                        </>
                      )}
                      {service.type === 'tours' && service.content?.destinos?.length > 0 && (
                        <>
                          <MapPin className="h-3 w-3" />
                          <span>{service.content.destinos.length} {t('destinos')}</span>
                        </>
                      )}
                      {service.type === 'rental' && service.content?.vehiculos?.length > 0 && (
                        <>
                          <Car className="h-3 w-3" />
                          <span>{service.content.vehiculos.length} {t('vehiculos')}</span>
                        </>
                      )}
                    </div>
                    
                    <div className="flex justify-end">
                      <span className="text-amber-500 text-sm group-hover:underline">
                        {t('ver_detalles')} →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link
              to="/servicios"
              className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              {t('ver_todos')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeFixed;