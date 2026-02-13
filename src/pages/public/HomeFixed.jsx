import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const HomeFixed = () => {
  const { t } = useLanguage();

  return (
    <div className="m-0 p-0 bg-black">
      
      {/* HERO */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-auto min-h-[500px] lg:min-h-[700px] flex items-end pb-16 lg:pb-24 -mt-[148px] lg:-mt-[116px]">
        
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src="/images/hero1.png" 
            alt="Batista Global Service" 
            className="w-full h-full object-contain lg:object-cover mx-auto"
            style={{
              transform: window.innerWidth < 768 
                ? 'translateY(-60px)'
                : 'translateY(-20px)',
            }}
          />
        </div>
        
        {/* Contenido */}
        <div className="container mx-auto px-4 relative z-20 w-full">
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

      {/* WHATSAPP FLOTANTE - SUBIDO 2cm (bottom-20) */}
      <a 
        href="https://wa.me/17866583567?text=Hola%20Batista%20Global%20Service%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios.%20%F0%9F%8C%9F"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 group"
      >
        <div className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-ping scale-150"></div>
        <div className="relative w-14 h-14 lg:w-20 lg:h-20 flex items-center justify-center animate-bounce hover:animate-none bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-2xl hover:shadow-[0_0_30px_rgba(37,211,102,0.7)] transition-shadow">
          <img 
            src="/iconos/whatsapp.png" 
            alt="WhatsApp" 
            className="w-8 h-8 lg:w-12 lg:h-12 object-contain drop-shadow-2xl"
          />
        </div>
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] lg:text-xs font-bold px-2 py-1 rounded-full animate-pulse shadow-lg">
          1:1
        </div>
      </a>

      {/* FOOTER */}
      <footer className="w-full bg-black border-t border-amber-400/20">
        <div className="w-full px-4 py-6 lg:py-8">
          <div className="max-w-7xl mx-auto">
            
            {/* LOGO CENTRAL */}
            <div className="flex justify-center mb-4 lg:mb-6">
              <Link to="/" className="flex items-center gap-3 lg:gap-6 hover:scale-105 transition-transform">
                <img 
                  src="/images/logo-icon.png" 
                  alt="Batista Global Service" 
                  className="h-10 lg:h-16 w-auto"
                />
                <img 
                  src="/images/logo-text.png" 
                  alt="Batista Global Service" 
                  className="h-8 lg:h-14 w-auto"
                />
              </Link>
            </div>

            {/* GRID DE CONTACTO */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
              
              {/* COLUMNA IZQUIERDA */}
              <div className="space-y-4">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 text-center lg:text-left">
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                    Contáctanos
                  </span>
                </h3>
                
                {/* TELÉFONO */}
                <a 
                  href="tel:+17866583567" 
                  className="group flex flex-col lg:flex-row items-center lg:items-start gap-3 p-3 bg-white/5 rounded-xl hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-blue-700/20 transition-all duration-300 border border-white/10 hover:border-blue-500/30"
                >
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <img src="/iconos/phone.png" alt="Teléfono" className="w-5 h-5 lg:w-8 lg:h-8" />
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-xs text-blue-400 font-medium mb-1">LLÁMANOS AHORA</p>
                    <p className="text-base lg:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      +1 (786) 658-3567
                    </p>
                  </div>
                </a>

                {/* CORREO */}
                <a 
                  href="mailto:batistaglobalservice25@gmail.com" 
                  className="group flex flex-col lg:flex-row items-center lg:items-start gap-3 p-3 bg-white/5 rounded-xl hover:bg-gradient-to-r hover:from-yellow-600/20 hover:to-amber-600/20 transition-all duration-300 border border-white/10 hover:border-amber-500/30"
                >
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <img src="/iconos/email.png" alt="Email" className="w-5 h-5 lg:w-8 lg:h-8" />
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-xs text-amber-400 font-medium mb-1">ESCRÍBENOS</p>
                    <p className="text-sm lg:text-lg font-bold text-white group-hover:text-amber-400 transition-colors break-all">
                      batistaglobalservice25@gmail.com
                    </p>
                  </div>
                </a>

                {/* UBICACIÓN */}
                <a 
                  href="https://maps.google.com/?q=700+SW+57th+Ave+Miami+FL+33144" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col lg:flex-row items-center lg:items-start gap-3 p-3 bg-white/5 rounded-xl hover:bg-gradient-to-r hover:from-red-600/20 hover:to-pink-600/20 transition-all duration-300 border border-white/10 hover:border-red-500/30"
                >
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <img src="/iconos/location.png" alt="Ubicación" className="w-5 h-5 lg:w-8 lg:h-8" />
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-xs text-red-400 font-medium mb-1">VISÍTANOS</p>
                    <p className="text-sm lg:text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      700 SW 57th Ave, Miami FL
                    </p>
                  </div>
                </a>
              </div>
              
              {/* COLUMNA DERECHA */}
              <div className="space-y-4">
                
                {/* HORARIOS */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 border border-amber-400/20 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 justify-center lg:justify-start">
                    <div className="w-8 h-8 bg-amber-400/20 rounded-lg flex items-center justify-center">
                      <img src="/iconos/clock.png" alt="Horarios" className="w-4 h-4" />
                    </div>
                    <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                      {t('horarios')}
                    </span>
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg text-xs lg:text-sm">
                      <span className="text-white/70">{t('lun_vie')}</span>
                      <span className="text-white font-semibold">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg text-xs lg:text-sm">
                      <span className="text-white/70">{t('sabado')}</span>
                      <span className="text-white font-semibold">10:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg text-xs lg:text-sm">
                      <span className="text-white/70">{t('domingo')}</span>
                      <span className="text-white font-semibold">10:00 - 14:00</span>
                    </div>
                  </div>
                </div>

                {/* REDES SOCIALES */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 border border-amber-400/20 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 justify-center lg:justify-start">
                    <div className="w-8 h-8 bg-amber-400/20 rounded-lg flex items-center justify-center">
                      <span className="text-amber-400 text-base">🌐</span>
                    </div>
                    <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                      {t('redes_sociales')}
                    </span>
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {/* FACEBOOK */}
                    <a 
                      href="https://facebook.com/BatistaGlobalServices" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-2 bg-white/5 rounded-lg hover:bg-[#1877F2]/20 transition-all"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-[#1877F2] to-[#0e5a9c] rounded-lg flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                        <img src="/iconos/facebook.png" alt="Facebook" className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm group-hover:text-[#1877F2] transition-colors">Facebook</p>
                        <p className="text-gray-400 text-xs">@BatistaGlobalServices</p>
                      </div>
                      <span className="text-white/40 group-hover:text-[#1877F2]">→</span>
                    </a>

                    {/* INSTAGRAM */}
                    <a 
                      href="https://instagram.com/batistaglobalservice" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-2 bg-white/5 rounded-lg hover:bg-[#E4405F]/20 transition-all"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-[#E4405F] to-[#bc2a8d] rounded-lg flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                        <img src="/iconos/instagram.png" alt="Instagram" className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm group-hover:text-[#E4405F] transition-colors">Instagram</p>
                        <p className="text-gray-400 text-xs">@batistaglobalservice</p>
                      </div>
                      <span className="text-white/40 group-hover:text-[#E4405F]">→</span>
                    </a>

                    {/* TIKTOK */}
                    <a 
                      href="https://tiktok.com/@batista.global" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-2 bg-white/5 rounded-lg hover:bg-white/20 transition-all"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                        <img src="/iconos/tiktok.png" alt="TikTok" className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm group-hover:text-white transition-colors">TikTok</p>
                        <p className="text-gray-400 text-xs">@batista.global</p>
                      </div>
                      <span className="text-white/40 group-hover:text-white">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* COPYRIGHT */}
            <div className="border-t border-white/10 mt-6 pt-4">
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