import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useServices } from '../../contexts/services/ServicesContext';
import { useDestinos } from '../../contexts/DestinosContext';
import { 
  Star, MapPin, Clock, DollarSign, Package, Car, 
  Globe, Plane, Hotel, Briefcase, Sparkles, Zap,
  ChevronRight, Phone, Mail, Shield, Award,
  TrendingUp, Users, ThumbsUp, Truck, Heart,
  Camera, Coffee, Sun, Moon, Wind,
  Anchor, Ship, Mountain, TreePine, Umbrella,
  Wifi, CreditCard, Lock, Clock3, Calendar,
  Gift, Gem, Rocket, Crown, Diamond,
  ChevronLeft, ChevronRight as ChevronRightIcon,
  Play, Pause, X, Facebook, Instagram, Twitter,
  Youtube, Linkedin, MessageCircle,
  Headphones, Smartphone, Laptop, Tablet,
  Watch, Speaker, Tv, Gamepad, Headset,
  Printer, Monitor, Cpu, HardDrive,
  Battery, Flashlight, Thermometer, Droplet,
  Cloud, Snowflake, Flame, Book,
  Dog, Cat, Bird, Fish
} from 'lucide-react';

// Componente de WhatsApp flotante
import WhatsAppButton from '../../components/ui/WhatsAppButton';

const HomeFixed = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { services, loadServices } = useServices();
  const { destinos, loadDestinos } = useDestinos();
  const [serviciosDestacados, setServiciosDestacados] = useState([]);
  const [destinosActivos, setDestinosActivos] = useState([]);
  const [visibleSections, setVisibleSections] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [destinoSlides, setDestinoSlides] = useState({});
  const sectionRefs = useRef({});
  const autoPlayRef = useRef();
  const destinoAutoPlayRef = useRef({});

  // ===== TUS IMÁGENES LOCALES PARA EL CARRUSEL PRINCIPAL =====
  const heroImages = [
    { url: "/images/imagen1.png", nombre: "Imagen 1" },
    { url: "/images/imagen2.png", nombre: "Imagen 2" },
    { url: "/images/imagen3.png", nombre: "Imagen 3" },
    { url: "/images/imagen4.png", nombre: "Imagen 4" },
    { url: "/images/hero1.png", nombre: "Hero original" }
  ];

  useEffect(() => {
    loadServices();
    loadDestinos();
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      const activos = services.filter(s => s.isActive !== false);
      setServiciosDestacados(activos.slice(0, 12));
    }
  }, [services]);

  useEffect(() => {
    if (destinos.length > 0) {
      const activos = destinos
        .filter(d => d.activo !== false)
        .sort((a, b) => (a.orden || 0) - (b.orden || 0));
      console.log('Destinos activos cargados:', activos);
      setDestinosActivos(activos);
      
      const slides = {};
      activos.forEach(destino => {
        slides[destino.id] = 0;
      });
      setDestinoSlides(slides);
    }
  }, [destinos]);

  // Auto-play para el carrusel principal
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }, 5000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay, heroImages.length]);

  // Auto-play para cada destino
  useEffect(() => {
    // Limpiar intervalos anteriores
    Object.values(destinoAutoPlayRef.current).forEach(clearInterval);
    
    // Crear nuevos intervalos para cada destino
    destinosActivos.forEach(destino => {
      const imagenes = getDestinoImages(destino);
      if (imagenes.length > 1) {
        const interval = setInterval(() => {
          setDestinoSlides(prev => {
            const currentSlide = prev[destino.id] || 0;
            return {
              ...prev,
              [destino.id]: (currentSlide + 1) % imagenes.length
            };
          });
        }, 4000);
        
        destinoAutoPlayRef.current[destino.id] = interval;
      }
    });
    
    return () => {
      Object.values(destinoAutoPlayRef.current).forEach(clearInterval);
    };
  }, [destinosActivos]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleServiceClick = (serviceId) => {
    // Scroll suave al inicio de la sección de servicios
    sectionRefs.current.services?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Navegar después de un pequeño delay
    setTimeout(() => {
      navigate(`/servicio/${serviceId}`);
    }, 300);
  };

  const handleDestinoClick = (destinoId, e) => {
    // Scroll suave al inicio de la sección de destinos
    sectionRefs.current.destinos?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getServiceImageUrl = (service) => {
    const imageUrl = service.mainImage || service.imageUrl;
    
    if (!imageUrl) {
      return 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg';
    }
    
    if (imageUrl.startsWith('http') || imageUrl.startsWith('data:')) {
      return imageUrl;
    }
    
    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }
    
    return `/images/${imageUrl}`;
  };

  // ✅ NUEVA FUNCIÓN: SOLO USA IMÁGENES REALES, SIN RESPALDO
  const getDestinoImages = (destino) => {
    // Si el destino tiene un array de imágenes, úsalo
    if (destino.imagenes && Array.isArray(destino.imagenes) && destino.imagenes.length > 0) {
      return destino.imagenes;
    }
    
    // Si tiene una sola imagen, úsala como única imagen
    if (destino.imagen) {
      return [destino.imagen];
    }
    
    // Si no tiene imagen, mostrar un placeholder
    return ['https://via.placeholder.com/800x600?text=Sin+Imagen'];
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setIsAutoPlay(false);
  };

  const stats = [
    { icon: Users, value: '15K+', label: 'Clientes', color: 'blue' },
    { icon: Package, value: '25K+', label: 'Envíos', color: 'green' },
    { icon: Globe, value: '25+', label: 'Países', color: 'amber' },
    { icon: Award, value: '10 años', label: 'Experiencia', color: 'purple' },
    { icon: Star, value: '4.9/5', label: 'Calificación', color: 'yellow' },
    { icon: Heart, value: '98%', label: 'Recomendación', color: 'red' },
    { icon: Truck, value: '5K+', label: 'Entregas', color: 'orange' },
    { icon: Plane, value: '3K+', label: 'Vuelos', color: 'sky' }
  ];

  const testimonios = [
    { nombre: 'María González', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', texto: 'Excelente servicio, mis envíos siempre llegan a tiempo. Muy profesionales.', rating: 5, pais: 'España' },
    { nombre: 'Carlos Rodríguez', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', texto: 'Los tours son increíbles, conocí lugares maravillosos. Volveré a reservar.', rating: 5, pais: 'México' },
    { nombre: 'Ana Martínez', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', texto: 'La renta de autos fue perfecta, el vehículo impecable y el precio justo.', rating: 5, pais: 'Colombia' },
    { nombre: 'Javier López', avatar: 'https://randomuser.me/api/portraits/men/75.jpg', texto: 'Me ayudaron con todos los trámites de visa, súper recomendados.', rating: 5, pais: 'Argentina' },
    { nombre: 'Laura Sánchez', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', texto: 'Increíble experiencia, volveré a contratar sus servicios sin duda.', rating: 5, pais: 'Chile' },
    { nombre: 'Pedro Gómez', avatar: 'https://randomuser.me/api/portraits/men/46.jpg', texto: 'Profesionales y confiables, 100% recomendados.', rating: 5, pais: 'Perú' }
  ];

  const beneficios = [
    { icon: Shield, titulo: 'Seguridad Total', desc: 'Tus datos y pagos protegidos' },
    { icon: Clock3, titulo: 'Atención 24/7', desc: 'Soporte las 24 horas' },
    { icon: CreditCard, titulo: 'Múltiples pagos', desc: 'Aceptamos todas las tarjetas' },
    { icon: Wifi, titulo: 'Seguimiento online', desc: 'Rastrea tus envíos' },
    { icon: Gem, titulo: 'Mejores precios', desc: 'Tarifas competitivas' },
    { icon: Crown, titulo: 'Servicio premium', desc: 'Atención personalizada' },
    { icon: Rocket, titulo: 'Envíos rápidos', desc: 'Entrega exprés' },
    { icon: Gift, titulo: 'Ofertas exclusivas', desc: 'Promociones especiales' }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden pt-20">
      
      {/* ===== WHATSAPP BUTTON ===== */}
      <div className="fixed z-50" style={{ bottom: '96px', right: '24px' }}>
        <WhatsAppButton />
      </div>
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image.url} 
                alt={image.nombre} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log('Error cargando imagen:', image.url);
                  e.target.onerror = null;
                  e.target.src = '/images/hero1.png';
                }}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
        </div>

        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20">
          <ChevronRightIcon className="h-6 w-6" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => { setCurrentSlide(index); setIsAutoPlay(false); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-6 bg-amber-500' : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="absolute bottom-8 right-8 z-20 w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20"
        >
          {isAutoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              Batista Global Service
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Soluciones completas para tus viajes y envíos en el Caribe
            </p>
          </div>
        </div>
      </section>

      {/* ===== SERVICIOS DESTACADOS ===== */}
      <section id="services" ref={el => sectionRefs.current.services = el} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Nuestros Servicios</h2>
            <p className="text-lg text-gray-600">Descubre todo lo que tenemos para ti</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviciosDestacados.slice(0, 12).map((service, index) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className={`group cursor-pointer transform transition-all duration-500 hover:-translate-y-2 ${
                  visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl">
                  <img 
                    src={getServiceImageUrl(service)} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-semibold text-white mb-1">{service.title}</h3>
                    <p className="text-white/80 text-sm line-clamp-2">{service.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ESTADÍSTICAS ===== */}
      <section id="stats" ref={el => sectionRefs.current.stats = el} className="py-16 bg-gradient-to-br from-amber-50 via-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className={`text-center ${visibleSections.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className={`w-16 h-16 bg-${stat.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`h-8 w-8 text-${stat.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== DESTINOS POPULARES CON CARRUSEL AUTOMÁTICO ===== */}
      <section id="destinos" ref={el => sectionRefs.current.destinos = el} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Destinos Populares</h2>
            <p className="text-lg text-gray-600">Los lugares más visitados por nuestros clientes</p>
          </div>

          {destinosActivos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinosActivos.map((destino, index) => {
                const imagenes = getDestinoImages(destino);
                const slideIndex = destinoSlides[destino.id] || 0;
                
                return (
                  <div
                    key={destino.id}
                    onClick={(e) => handleDestinoClick(destino.id, e)}
                    className={`group relative h-96 rounded-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:-translate-y-2 ${
                      visibleSections.destinos ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="absolute inset-0">
                      {imagenes.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt={`${destino.nombre} - Imagen ${imgIndex + 1}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                            imgIndex === slideIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                          onError={(e) => {
                            console.log('Error cargando imagen:', img);
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/800x600?text=Error+Imagen';
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* ✅ SIN BOTONES DE NAVEGACIÓN - SOLO INDICADORES SUTILES */}
                    {imagenes.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1">
                        {imagenes.map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-full transition-all duration-300 ${
                              i === slideIndex 
                                ? 'w-2 h-0.5 bg-amber-400/70' 
                                : 'w-1 h-0.5 bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{destino.nombre}</h3>
                      <p className="text-white/80 text-sm mb-3 line-clamp-2">{destino.descripcion}</p>
                      
                      <div className="space-y-1">
                        {(destino.precioOfertaMin > 0 || destino.precioOfertaMax > 0) && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-300 line-through text-sm">
                              ${destino.precioMin} - ${destino.precioMax}
                            </span>
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                              OFERTA
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-amber-400">
                            ${destino.precioOfertaMin || destino.precioMin}
                          </span>
                          <span className="text-white/60">-</span>
                          <span className="text-2xl font-bold text-amber-400">
                            ${destino.precioOfertaMax || destino.precioMax}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {destino.destacado && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-bold shadow-lg">
                          ⭐ Destacado
                        </span>
                      </div>
                    )}
                    
                    {(destino.precioOfertaMin > 0 || destino.precioOfertaMax > 0) && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        -{Math.round(100 - ((destino.precioOfertaMin || destino.precioMin) / (destino.precioMin || 1) * 100))}%
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">No hay destinos disponibles</h3>
              <p className="text-gray-600">Pronto agregaremos nuevos destinos para ti</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== BENEFICIOS ===== */}
      <section id="beneficios" ref={el => sectionRefs.current.beneficios = el} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">¿Por qué elegirnos?</h2>
            <p className="text-lg text-gray-600">Beneficios exclusivos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beneficios.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={`bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${visibleSections.beneficios ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.titulo}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIOS ===== */}
      <section id="testimonios" ref={el => sectionRefs.current.testimonios = el} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Lo que dicen nuestros clientes</h2>
            <p className="text-lg text-gray-600">Experiencias reales</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonios.map((testimonio, index) => (
              <div key={index} className={`bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${visibleSections.testimonios ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="flex items-center gap-3 mb-4">
                  <img src={testimonio.avatar} alt={testimonio.nombre} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonio.nombre}</h4>
                    <p className="text-sm text-gray-500">{testimonio.pais}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">"{testimonio.texto}"</p>
                <div className="flex items-center gap-1">
                  {[...Array(testimonio.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeFixed;