import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useServices } from '../../contexts/services/ServicesContext';
import { ArrowLeft, Share2, Heart } from 'lucide-react';

// Importar componentes específicos por tipo de servicio - CON S MAYÚSCULA
import ShippingDetail from '../../components/Services/ShippingDetail';
import ToursDetail from '../../components/Services/ToursDetail';
import RentalDetail from '../../components/Services/RentalDetail';
import HotelsDetail from '../../components/Services/HotelsDetail';
import FlightsDetail from '../../components/Services/FlightsDetail';
import VisasDetail from '../../components/Services/VisasDetail';

const ServicioDetallePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, loadServices } = useServices();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const loadService = async () => {
      setLoading(true);
      await loadServices();
      setLoading(false);
    };
    loadService();
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      const found = services.find(s => s.id === id);
      setService(found || null);
    }
  }, [services, id]);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/images/default-service.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('/')) return imageUrl;
    return `/images/${imageUrl}`;
  };

  const images = service?.gallery?.length > 0 ? service.gallery : 
                 service?.mainImage ? [service.mainImage] : [];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: service.title,
        text: service.subtitle,
        url: window.location.href,
      });
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('✅ Enlace copiado al portapapeles');
    setShowShareMenu(false);
  };

  const handleWhatsApp = () => {
    const message = `Hola, estoy interesado en el servicio: ${service.title} - ${window.location.href}`;
    window.open(`https://wa.me/17866583567?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Renderizar el componente específico según el tipo de servicio
  const renderServiceDetail = () => {
    if (!service || !service.type) return null;

    switch (service.type) {
      case 'shipping':
        return <ShippingDetail data={service.content || {}} service={service} />;
      case 'tours':
        return <ToursDetail data={service.content || {}} service={service} />;
      case 'rental':
        return <RentalDetail data={service.content || {}} service={service} />;
      case 'hotels':
        return <HotelsDetail data={service.content || {}} service={service} />;
      case 'flights':
        return <FlightsDetail data={service.content || {}} service={service} />;
      case 'visas':
        return <VisasDetail data={service.content || {}} service={service} />;
      default:
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Información del Servicio</h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando detalles del servicio...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Servicio no encontrado</h1>
          <p className="text-gray-600 mb-6">El servicio que buscas no existe o ha sido eliminado</p>
          <button
            onClick={() => navigate('/servicios')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a servicios
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/servicios')}
              className="flex items-center gap-2 text-gray-600 hover:text-amber-500 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Volver a servicios</span>
            </button>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
                
                {showShareMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border py-2 z-20">
                    <button
                      onClick={copyToClipboard}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      Copiar enlace
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-green-600"
                    >
                      Compartir por WhatsApp
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna izquierda - Galería */}
          <div className="space-y-4">
            {/* Imagen principal */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative aspect-square lg:aspect-auto lg:h-[500px]">
                <img
                  src={getImageUrl(images[selectedImage])}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                {service.isFeatured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-medium shadow-lg">
                      ⭐ Destacado
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Miniaturas */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-amber-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={getImageUrl(img)}
                      alt={`${service.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Columna derecha - Información dinámica según tipo */}
          <div className="space-y-6">
            {/* Título y categoría */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                {service.title}
              </h1>
              <p className="text-xl text-gray-600">
                {service.subtitle}
              </p>
            </div>

            {/* Renderizado del detalle específico */}
            {renderServiceDetail()}

            {/* Contacto rápido */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-lg mb-4">¿Necesitas ayuda?</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 14.12 2.91 16.2 4.3 17.82L2.44 21.94L6.7 20.11C8.24 20.93 10 21.4 11.82 21.4H11.84C17.3 21.4 21.75 16.95 21.75 11.49C21.75 6.03 17.3 2 12.04 2ZM12.05 19.56C10.54 19.56 9.07 19.15 7.79 18.38L7.47 18.19L4.96 19.07L5.86 16.64L5.65 16.31C4.78 14.97 4.31 13.44 4.31 11.86C4.31 7.54 7.79 4.06 12.11 4.06C16.43 4.06 19.91 7.54 19.91 11.86C19.91 16.18 16.43 19.56 12.05 19.56Z"/>
                  </svg>
                  WhatsApp
                </button>
                <a
                  href={`tel:+17866583567`}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Llamar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicioDetallePage;