import React from 'react';
import { Link } from 'react-router-dom';

const HomeFixed = () => {
  return (
    <div className="m-0 p-0 bg-black">
      
      {/* HERO */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[500px] lg:min-h-[600px] flex items-start pt-0 mt-0">
        <div className="absolute inset-0 z-0 -top-[88px] lg:-top-[116px] h-[calc(100%+88px)] lg:h-[calc(100%+116px)]">
          <img 
            src="/images/hero1.png" 
            alt="Batista Global Service" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 flex items-center h-full w-full">
          <div className="w-full max-w-2xl mt-16 sm:mt-20 md:mt-24 lg:mt-32">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-3 leading-tight">
              Batista <span className="text-amber-400">Global Service</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-5 max-w-xl">
              Productos y servicios turísticos premium en el Caribe
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/tienda" className="w-full sm:w-auto px-6 py-4 bg-[#00A8B5] text-white font-medium rounded-xl text-center hover:shadow-[0_0_20px_rgba(255,184,0,0.5)]">
                Explorar Tienda
              </Link>
              <Link to="/servicios" className="w-full sm:w-auto px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium rounded-xl text-center hover:bg-white/20">
                Nuestros Servicios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Servicios Turísticos</h2>
            <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full"></div>
            <p className="text-sm lg:text-base text-gray-600 mt-4 max-w-2xl mx-auto">
              Ofrecemos soluciones completas para tus viajes y envíos en el Caribe
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
            {[
              { img: "Paqueteria.jpg", title: "Paquetería Express", desc: "Envíos internacionales" },
              { img: "paquetes-turisticos.jpg", title: "Paquetes Turísticos", desc: "Viajes todo incluido" },
              { img: "renta-de-autos.jpg", title: "Renta de Autos", desc: "Vehículos de lujo" },
              { img: "reservas_de_hoteles.jpg", title: "Reservas de Hoteles", desc: "Mejores tarifas" },
              { img: "reservas_de_vuelos.jpg", title: "Reservas de Vuelos", desc: "Aerolíneas internacionales" },
              { img: "visas.jpg", title: "Visas", desc: "Trámite profesional" }
            ].map((item, index) => (
              <Link key={index} to="/servicios" className="group bg-white rounded-xl shadow-md hover:shadow-xl hover:shadow-amber-400/20 overflow-hidden hover:-translate-y-1 transition-all">
                <div className="relative aspect-square overflow-hidden">
                  <img src={`/images/${item.img}`} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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
          <img src="/iconos/whatsapp.png" alt="WhatsApp" className="w-12 h-12 lg:w-16 lg:h-16 object-contain drop-shadow-2xl" />
        </div>
      </a>

      {/* FOOTER */}
      <footer className="w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-black border-t border-amber-400/20 pt-12 lg:pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8 lg:mb-12">
            <Link to="/" className="flex items-center gap-3 lg:gap-4">
              <img src="/images/logo-icon.png" alt="Batista Global Service" className="h-10 lg:h-14 w-auto" />
              <img src="/images/logo-text.png" alt="Batista Global Service" className="h-8 lg:h-12 w-auto" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-8 lg:mb-12">
            <div className="text-center lg:text-left">
              <h3 className="text-white font-semibold text-base lg:text-lg mb-3">Sobre Nosotros</h3>
              <p className="text-white/60 text-xs lg:text-sm">Somos una empresa líder en servicios turísticos y de paquetería en el Caribe.</p>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-white font-semibold text-base lg:text-lg mb-3">Contacto</h3>
              <a href="tel:+17866583567" className="flex items-center justify-center lg:justify-start gap-2 text-white/70 hover:text-amber-400 text-xs lg:text-sm mb-2">
                📞 +1 (786) 658-3567
              </a>
              <a href="mailto:batistaglobalservice25@gmail.com" className="flex items-center justify-center lg:justify-start gap-2 text-white/70 hover:text-amber-400 text-xs lg:text-sm">
                ✉️ batistaglobalservice25
              </a>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-white font-semibold text-base lg:text-lg mb-3">Horarios</h3>
              <p className="text-white/60 text-xs lg:text-sm">Lun-Vie: 9:00-18:00</p>
              <p className="text-white/60 text-xs lg:text-sm">Sáb: 10:00-16:00</p>
              <p className="text-white/60 text-xs lg:text-sm">Dom: 10:00-14:00</p>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-white font-semibold text-base lg:text-lg mb-3">Redes</h3>
              <div className="flex justify-center lg:justify-start gap-3">
                <a href="https://facebook.com/BatistaGlobalServices" target="_blank" className="p-2 bg-white/5 rounded-lg hover:bg-[#1877F2]/20">
                  <img src="/iconos/facebook.png" alt="Facebook" className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/batistaglobalservice" target="_blank" className="p-2 bg-white/5 rounded-lg hover:bg-[#E4405F]/20">
                  <img src="/iconos/icon-instagram.png" alt="Instagram" className="w-5 h-5" />
                </a>
                <a href="https://tiktok.com/@batista.global" target="_blank" className="p-2 bg-white/5 rounded-lg hover:bg-white/20">
                  <img src="/iconos/tiktok.png" alt="TikTok" className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-white/40 text-xs text-center">© 2026 Batista Global Service. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeFixed;