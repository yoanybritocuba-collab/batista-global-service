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
  Dog, Cat, Bird, Fish, Send, ThumbsDown, Reply, Flag, MoreHorizontal
} from 'lucide-react';

import WhatsAppButton from '../../components/ui/WhatsAppButton';

const ComentariosSection = () => {
  const { t } = useLanguage();
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [rating, setRating] = useState(5);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [cargando, setCargando] = useState(false);
  const [respuestaA, setRespuestaA] = useState(null);
  const [respuestaTexto, setRespuestaTexto] = useState('');
  
  useEffect(() => {
    const comentariosEjemplo = [
      {
        id: 1,
        nombre: 'María González',
        email: 'maria@email.com',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        fecha: '2026-02-20',
        comentario: 'Excelente servicio, mis envíos siempre llegan a tiempo. Muy profesionales y atentos a los detalles.',
        likes: 24,
        dislikes: 2,
        respuestas: [
          {
            id: 11,
            nombre: 'Batista Global Service',
            avatar: '/images/logo-icon.png',
            fecha: '2026-02-21',
            comentario: '¡Gracias María! Nos alegra mucho que estés satisfecha con nuestro servicio. 😊',
            likes: 8,
            esAdmin: true
          }
        ]
      },
      {
        id: 2,
        nombre: 'Carlos Rodríguez',
        email: 'carlos@email.com',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        fecha: '2026-02-18',
        comentario: 'Los tours son increíbles, conocí lugares maravillosos en República Dominicana. Volveré a reservar sin duda.',
        likes: 18,
        dislikes: 1,
        respuestas: []
      },
      {
        id: 3,
        nombre: 'Ana Martínez',
        email: 'ana@email.com',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        rating: 4,
        fecha: '2026-02-15',
        comentario: 'La renta de autos fue perfecta, el vehículo impecable y el precio justo. Muy recomendable.',
        likes: 12,
        dislikes: 0,
        respuestas: []
      }
    ];
    setComentarios(comentariosEjemplo);
  }, []);

  const handleSubmitComentario = (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim() || !nombre.trim() || !email.trim()) return;
    
    setCargando(true);
    
    setTimeout(() => {
      const nuevo = {
        id: Date.now(),
        nombre,
        email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}&background=random`,
        rating,
        fecha: new Date().toISOString().split('T')[0],
        comentario: nuevoComentario,
        likes: 0,
        dislikes: 0,
        respuestas: []
      };
      
      setComentarios([nuevo, ...comentarios]);
      setNuevoComentario('');
      setNombre('');
      setEmail('');
      setRating(5);
      setCargando(false);
      alert('✅ Comentario enviado correctamente');
    }, 1000);
  };

  const handleRespuesta = (comentarioId) => {
    if (!respuestaTexto.trim()) return;
    
    const nuevaRespuesta = {
      id: Date.now(),
      nombre: 'Batista Global Service',
      avatar: '/images/logo-icon.png',
      fecha: new Date().toISOString().split('T')[0],
      comentario: respuestaTexto,
      likes: 0,
      esAdmin: true
    };
    
    setComentarios(comentarios.map(c => 
      c.id === comentarioId 
        ? { ...c, respuestas: [...c.respuestas, nuevaRespuesta] }
        : c
    ));
    
    setRespuestaA(null);
    setRespuestaTexto('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('comentariosClientes')}</h2>
      
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{t('dejaTuComentario')}</h3>
        <form onSubmit={handleSubmitComentario} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder={t('tuNombre')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('tuEmail')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{t('tuCalificacion')}</span>
            <div className="flex gap-1">
              {[1,2,3,4,5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star className={`h-6 w-6 ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>
          </div>
          
          <textarea
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            placeholder="Escribe tu comentario..."
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            required
          />
          
          <button
            type="submit"
            disabled={cargando}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50"
          >
            {cargando ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t('enviando')}</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>{t('enviarComentario')}</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="border-b border-gray-200 pb-6 last:border-0">
            <div className="flex gap-4">
              <img
                src={comentario.avatar}
                alt={comentario.nombre}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <h4 className="font-bold text-gray-900">{comentario.nombre}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{new Date(comentario.fecha).toLocaleDateString()}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < comentario.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <MoreHorizontal className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                
                <p className="text-gray-700 mb-3">{comentario.comentario}</p>
                
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-amber-500">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{comentario.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-amber-500">
                    <ThumbsDown className="h-4 w-4" />
                    <span>{comentario.dislikes}</span>
                  </button>
                  <button
                    onClick={() => setRespuestaA(respuestaA === comentario.id ? null : comentario.id)}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-amber-500"
                  >
                    <Reply className="h-4 w-4" />
                    <span>{t('responder')}</span>
                  </button>
                </div>

                {respuestaA === comentario.id && (
                  <div className="mt-4 pl-12">
                    <div className="flex gap-3">
                      <img
                        src="/images/logo-icon.png"
                        alt="Batista"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <textarea
                          value={respuestaTexto}
                          onChange={(e) => setRespuestaTexto(e.target.value)}
                          placeholder="Escribe tu respuesta..."
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm"
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            onClick={() => setRespuestaA(null)}
                            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                          >
                            {t('cancelar')}
                          </button>
                          <button
                            onClick={() => handleRespuesta(comentario.id)}
                            className="px-3 py-1 text-sm bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                          >
                            {t('responder')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {comentario.respuestas.length > 0 && (
                  <div className="mt-4 pl-12 space-y-4">
                    {comentario.respuestas.map((respuesta) => (
                      <div key={respuesta.id} className="flex gap-3">
                        <img
                          src={respuesta.avatar}
                          alt={respuesta.nombre}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1 bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm text-gray-900">{respuesta.nombre}</span>
                            {respuesta.esAdmin && (
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">
                                {t('administrador')}
                              </span>
                            )}
                            <span className="text-xs text-gray-500">{new Date(respuesta.fecha).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-gray-700">{respuesta.comentario}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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
      setDestinosActivos(activos);
      
      const slides = {};
      activos.forEach(destino => {
        slides[destino.id] = 0;
      });
      setDestinoSlides(slides);
    }
  }, [destinos]);

  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }, 5000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay, heroImages.length]);

  useEffect(() => {
    Object.values(destinoAutoPlayRef.current).forEach(clearInterval);
    
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
    sectionRefs.current.services?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      navigate(`/servicio/${serviceId}`);
    }, 300);
  };

  const handleDestinoClick = (destinoId, e) => {
    sectionRefs.current.destinos?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getServiceImageUrl = (service) => {
    const imageUrl = service.mainImage || service.imageUrl;
    if (!imageUrl) return 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg';
    if (imageUrl.startsWith('http') || imageUrl.startsWith('data:')) return imageUrl;
    if (imageUrl.startsWith('/')) return imageUrl;
    return `/images/${imageUrl}`;
  };

  const getDestinoImages = (destino) => {
    if (destino.imagenes && Array.isArray(destino.imagenes) && destino.imagenes.length > 0) {
      return destino.imagenes;
    }
    if (destino.imagen) return [destino.imagen];
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
    { icon: Users, value: '15K+', label: t('clientes'), color: 'blue' },
    { icon: Package, value: '25K+', label: t('envios'), color: 'green' },
    { icon: Globe, value: '25+', label: t('paises'), color: 'amber' },
    { icon: Award, value: '10 años', label: t('experiencia'), color: 'purple' },
    { icon: Star, value: '4.9/5', label: t('calificacion'), color: 'yellow' },
    { icon: Heart, value: '98%', label: t('recomendacion'), color: 'red' },
    { icon: Truck, value: '5K+', label: t('entregas'), color: 'orange' },
    { icon: Plane, value: '3K+', label: t('vuelos'), color: 'sky' }
  ];

  const beneficios = [
    { icon: Shield, titulo: t('seguridad'), desc: t('seguridad') },
    { icon: Clock3, titulo: t('atencion247'), desc: t('atencion247') },
    { icon: CreditCard, titulo: t('pagos'), desc: t('pagos') },
    { icon: Wifi, titulo: t('seguimiento'), desc: t('seguimiento') },
    { icon: Gem, titulo: t('precios'), desc: t('precios') },
    { icon: Crown, titulo: t('premium'), desc: t('premium') },
    { icon: Rocket, titulo: t('enviosRapidos'), desc: t('enviosRapidos') },
    { icon: Gift, titulo: t('ofertasExclusivas'), desc: t('ofertasExclusivas') }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden pt-20">
      
      <div className="fixed z-50" style={{ bottom: '96px', right: '24px' }}>
        <WhatsAppButton />
      </div>
      
      <section className="relative h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden -mt-16 md:-mt-20 lg:-mt-24">
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
          </div>
        </div>
      </section>

      <section id="destinos" ref={el => sectionRefs.current.destinos = el} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">{t('destinosPopulares')}</h2>
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
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/800x600?text=Error+Imagen';
                          }}
                        />
                      ))}
                    </div>
                    
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
                              {t('oferta')}
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
                          ⭐ {t('destacado')}
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
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('sinDestinos')}</h3>
              <p className="text-gray-600">{t('proximamente')}</p>
            </div>
          )}
        </div>
      </section>

      <section id="services" ref={el => sectionRefs.current.services = el} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">{t('nuestrosServicios')}</h2>
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

      <section id="tienda" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">{t('tienda')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Package className="h-16 w-16 text-amber-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">{t('productosDestacados')}</h3>
              <p className="text-gray-600 mb-4">{t('exploraTienda')}</p>
              <Link to="/tienda" className="inline-block px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
                {t('verTodos')}
              </Link>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Sparkles className="h-16 w-16 text-amber-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">{t('ofertasEspeciales')}</h3>
              <p className="text-gray-600 mb-4">{t('descuentosExclusivos')}</p>
              <Link to="/tienda?ofertas=true" className="inline-block px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
                {t('verTodos')}
              </Link>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Truck className="h-16 w-16 text-amber-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">{t('enviosGratis')}</h3>
              <p className="text-gray-600 mb-4">{t('enviosGratisDesc')}</p>
              <Link to="/tienda" className="inline-block px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
                {t('comprarAhora')}
              </Link>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Heart className="h-16 w-16 text-amber-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">{t('favoritos')}</h3>
              <p className="text-gray-600 mb-4">{t('productosPopulares')}</p>
              <Link to="/tienda?favoritos=true" className="inline-block px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
                {t('verTodos')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" ref={el => sectionRefs.current.stats = el} className="py-16 bg-gradient-to-br from-amber-50 via-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">{t('estadisticas')}</h2>
          </div>
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

      <section id="beneficios" ref={el => sectionRefs.current.beneficios = el} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">{t('beneficios')}</h2>
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

      <section id="comentarios" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ComentariosSection />
        </div>
      </section>
    </div>
  );
};

export default HomeFixed;