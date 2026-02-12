import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const HomeFixed = () => {
  const { t } = useLanguage();

  return (
    <div className="m-0 p-0 bg-black">
      
      {/* HERO - VERSIÓN SIMPLE PARA MÓVIL */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[600px] lg:h-[700px] flex items-end pb-16 lg:pb-24">
        
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero1.png" 
            alt="Batista Global Service" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
        </div>
        
        {/* Contenido - SIEMPRE EN LA PARTE INFERIOR */}
        <div className="container mx-auto px-4 relative z-10 w-full">
          <div className="max-w-3xl mx-auto text-center">
            
            {/* SOLO EL NOMBRE, NADA MÁS */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Batista <span className="text-amber-400">Global Service</span>
            </h1>
            
            {/* BOTONES - BAJADOS AL BORDE INFERIOR */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 lg:mt-12">
              <Link 
                to="/tienda" 
                className="w-full sm:w-auto px-8 py-4 bg-[#00A8B5] text-white font-semibold rounded-xl text-center hover:shadow-[0_0_25px_rgba(255,184,0,0.6)] transition-all duration-300 text-base sm:text-lg"
              >
                {t('explorar_tienda')}
              </Link>
              <Link 
                to="/servicios" 
                className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold rounded-xl text-center hover:bg-white/20 hover:border-amber-400/60 transition-all duration-300 text-base sm:text-lg"
              >
                {t('nuestros_servicios')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
            {[
              { img: "Paqueteria.jpg", title: t('paqueteria_express'), desc: t('envios_internacionales') },
              { img: "paquetes-turisticos.jpg", title: t('paquetes_turisticos'), desc: t('viajes_incluido') },
              { img: "renta-de-autos.jpg", title: t('renta_autos'), desc: t('vehiculos_lujo') },
              { img: "reservas_de_hoteles.jpg", title: t('reservas_hoteles'), desc: t('mejores_tarifas') },
              { img: "reservas_de_vuelos.jpg", title: t('reservas_vuelos'), desc: t('aerolineas_internacionales') },
              { img: "visas.jpg", title: t('visas'), desc: t('tramite_profesional') }
            ].map((item, index) => (
              <Link 
                key={index} 
                to="/servicios" 
                className="group bg-white rounded-xl shadow-md hover:shadow-xl hover:shadow-amber-400/20 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={`/images/${item.img}`} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/Paqueteria.jpg";
                    }}
                  />
                </div>
                <div className="p-2 lg:p-3 text-center">
                  <h3 className="font-semibold text-gray-800 text-xs lg:text-sm group-hover:text-amber-600 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[10px] lg:text-xs text-gray-500 mt-1 hidden sm:block">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHATSAPP FLOTANTE */}
      <a 
        href="https://wa.me/17866583567?text=Hola%20Batista%20Global%20Service,%20quiero%20información"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-50 group"
      >
        <div className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-ping scale-150"></div>
        <div className="relative w-14 h-14 lg:w-20 lg:h-20 flex items-center justify-center animate-bounce hover:animate-none">
          <img 
            src="/iconos/whatsapp.png" 
            alt="WhatsApp" 
            className="w-12 h-12 lg:w-16 lg:h-16 object-contain drop-shadow-2xl"
          />
        </div>
      </a>

      {/* FOOTER */}
      <footer className="w-full bg-black border-t border-amber-400/20">
        <div className="w-full px-4 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            
            {/* LOGO CENTRAL */}
            <div className="flex justify-center mb-8 lg:mb-12">
              <Link to="/" className="flex items-center gap-3 lg:gap-4">
                <img 
                  src="/images/logo-icon.png" 
                  alt="Batista Global Service" 
                  className="h-10 lg:h-14 w-auto"
                />
                <img 
                  src="/images/logo-text.png" 
                  alt="Batista Global Service" 
                  className="h-8 lg:h-12 w-auto"
                />
              </Link>
            </div>

            {/* GRID FOOTER */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-8 lg:mb-12">
              
              {/* SOBRE NOSOTROS */}
              <div className="text-center lg:text-left">
                <h3 className="text-white font-semibold text-base lg:text-lg mb-3 flex items-center justify-center lg:justify-start gap-2">
                  <span className="text-amber-400">●</span> {t('sobre_nosotros')}
                </h3>
                <p className="text-white/60 text-xs lg:text-sm leading-relaxed">
                  {t('sobre_nosotros_texto')}
                </p>
              </div>

              {/* CONTACTO */}
              <div className="text-center lg:text-left">
                <h3 className="text-white font-semibold text-base lg:text-lg mb-3 flex items-center justify-center lg:justify-start gap-2">
                  <span className="text-amber-400">●</span> {t('contacto')}
                </h3>
                <div className="space-y-3">
                  <a 
                    href="tel:+17866583567" 
                    className="flex items-center justify-center lg:justify-start gap-2 text-white/70 hover:text-amber-400 text-xs lg:text-sm transition-colors"
                  >
                    <img src="/iconos/phone.png" alt={t('telefono')} className="w-4 h-4" />
                    <span>+1 (786) 658-3567</span>
                  </a>
                  <a 
                    href="mailto:batistaglobalservice25@gmail.com" 
                    className="flex items-center justify-center lg:justify-start gap-2 text-white/70 hover:text-amber-400 text-xs lg:text-sm transition-colors"
                  >
                    <img src="/iconos/email.png" alt={t('correo')} className="w-4 h-4" />
                    <span>batistaglobalservice25@gmail.com</span>
                  </a>
                  <a 
                    href="https://maps.google.com/?q=700+SW+57th+Ave+Miami+FL+33144" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center lg:justify-start gap-2 text-white/70 hover:text-amber-400 text-xs lg:text-sm transition-colors"
                  >
                    <img src="/iconos/location.png" alt={t('ubicacion')} className="w-4 h-4" />
                    <span>Miami, FL</span>
                  </a>
                </div>
              </div>

              {/* HORARIOS */}
              <div className="text-center lg:text-left">
                <h3 className="text-white font-semibold text-base lg:text-lg mb-3 flex items-center justify-center lg:justify-start gap-2">
                  <span className="text-amber-400">●</span> {t('horarios')}
                </h3>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3 justify-center lg:justify-start">
                    <img src="/iconos/clock.png" alt={t('horarios')} className="w-4 h-4" />
                    <span className="text-white/90 text-xs lg:text-sm font-medium">{t('atencion_cliente')}</span>
                  </div>
                  <div className="space-y-1 text-xs lg:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">{t('lun_vie')}</span>
                      <span className="text-white/90">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">{t('sabado')}</span>
                      <span className="text-white/90">10:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">{t('domingo')}</span>
                      <span className="text-white/90">10:00 - 14:00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* REDES SOCIALES */}
              <div className="text-center lg:text-left">
                <h3 className="text-white font-semibold text-base lg:text-lg mb-3 flex items-center justify-center lg:justify-start gap-2">
                  <span className="text-amber-400">●</span> {t('redes_sociales')}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <a 
                    href="https://facebook.com/BatistaGlobalServices" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-[#1877F2]/20 transition-all group"
                  >
                    <img src="/iconos/facebook.png" alt={t('facebook')} className="w-5 h-5" />
                    <div className="flex flex-col items-start">
                      <span className="text-white/90 text-xs font-medium group-hover:text-[#1877F2]">{t('facebook')}</span>
                      <span className="text-white/40 text-[10px]">@BatistaGlobal</span>
                    </div>
                  </a>
                  <a 
                    href="https://instagram.com/batistaglobalservice" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-[#E4405F]/20 transition-all group"
                  >
                    <img src="/iconos/instagram.png" alt={t('instagram')} className="w-5 h-5" />
                    <div className="flex flex-col items-start">
                      <span className="text-white/90 text-xs font-medium group-hover:text-[#E4405F]">{t('instagram')}</span>
                      <span className="text-white/40 text-[10px]">@batistaglobal</span>
                    </div>
                  </a>
                  <a 
                    href="https://tiktok.com/@batista.global" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-white/20 transition-all group col-span-2"
                  >
                    <img src="/iconos/tiktok.png" alt={t('tiktok')} className="w-5 h-5" />
                    <div className="flex flex-col items-start">
                      <span className="text-white/90 text-xs font-medium group-hover:text-white">{t('tiktok')}</span>
                      <span className="text-white/40 text-[10px]">@batista.global</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* COPYRIGHT */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-white/40 text-xs text-center">
                © 2026 Batista Global Service. {t('derechos')}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeFixed;