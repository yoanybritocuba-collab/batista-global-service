import React from 'react';
import { Link } from 'react-router-dom';

const HomeFixed = () => {
  return (
    <div className="m-0 p-0 bg-black">
      
      {/* HERO */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[600px] lg:min-h-[600px] md:min-h-[500px] sm:min-h-[450px] flex items-start pt-0 mt-0">
        <div className="absolute inset-0 z-0 -top-[116px] h-[calc(100%+116px)]">
          <img 
            src="/images/hero1.png" 
            alt="Batista Global Service" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex items-start h-full w-full pt-64 lg:pt-72 md:pt-64 sm:pt-56">
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Batista <span className="text-amber-400">Global Service</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 sm:mb-6 max-w-xl">
              Productos y servicios turísticos premium en el Caribe
            </p>
            <div className="flex flex-row flex-wrap gap-3 sm:gap-4 mt-8">
              <Link to="/tienda" className="inline-flex px-5 sm:px-6 py-2.5 sm:py-3 bg-[#00A8B5] text-white font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,184,0,0.5)] focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black text-sm sm:text-base">
                Explorar Tienda
              </Link>
              <Link to="/servicios" className="inline-flex px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium rounded-lg hover:bg-white/20 hover:border-amber-400/50 transition-all duration-300 text-sm sm:text-base">
                Nuestros Servicios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS - 6 TARJETAS */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Servicios Turísticos</h2>
            <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Ofrecemos soluciones completas para tus viajes y envíos en el Caribe</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { img: "Paqueteria.jpg", title: "Paquetería Express", desc: "Envíos internacionales" },
              { img: "paquetes-turisticos.jpg", title: "Paquetes Turísticos", desc: "Viajes todo incluido" },
              { img: "renta-de-autos.jpg", title: "Renta de Autos", desc: "Vehículos de lujo" },
              { img: "reservas_de_hoteles.jpg", title: "Reservas de Hoteles", desc: "Mejores tarifas" },
              { img: "reservas_de_vuelos.jpg", title: "Reservas de Vuelos", desc: "Aerolíneas internacionales" },
              { img: "visas.jpg", title: "Visas", desc: "Trámite profesional" }
            ].map((item, index) => (
              <Link key={index} to="/servicios" className="group bg-white rounded-xl shadow-md hover:shadow-xl hover:shadow-amber-400/20 overflow-hidden transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-32 sm:h-36 overflow-hidden">
                  <img src={`/images/${item.img}`} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base group-hover:text-amber-600">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER ÚNICO - ANCHO COMPLETO */}
      <footer className="w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-black border-t border-amber-400/20 pt-16 pb-8 relative">
        
        {/* WHATSAPP FLOTANTE - UNA SOLA ONDA GRANDE + SALTO */}
        <a 
          href="https://wa.me/17866583567?text=Hola%20Batista%20Global%20Service,%20quiero%20información"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 group"
        >
          {/* ÚNICA ONDA EXPANSIVA - GRANDE */}
          <div className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-ping scale-150"></div>
          
          {/* SOLO EL ICONO CON EFECTO DE SALTO */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center animate-bounce hover:animate-none">
            <img 
              src="/iconos/whatsapp.png" 
              alt="WhatsApp" 
              className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-lg hover:scale-110 transition-transform"
            />
          </div>
        </a>

        <div className="container mx-auto px-6">
          
          {/* LOGO CENTRAL */}
          <div className="flex justify-center mb-12">
            <Link to="/" className="flex items-center gap-4">
              <img src="/images/logo-icon.png" alt="Batista Global Service" className="h-14 w-auto" />
              <img src="/images/logo-text.png" alt="Batista Global Service" className="h-12 w-auto" />
            </Link>
          </div>

          {/* GRID PRINCIPAL - 4 COLUMNAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* COLUMNA 1 - SOBRE NOSOTROS */}
            <div className="text-center lg:text-left">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center justify-center lg:justify-start gap-2">
                <span className="text-amber-400">●</span> Sobre Nosotros
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Somos una empresa líder en servicios turísticos y de paquetería en el Caribe, comprometidos con la excelencia y la satisfacción de nuestros clientes.
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="w-10 h-10 bg-amber-400/10 rounded-lg flex items-center justify-center">
                  <span className="text-amber-400 text-xl">⭐</span>
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium">+5 años de experiencia</p>
                  <p className="text-white/40 text-xs">Clientes satisfechos</p>
                </div>
              </div>
            </div>

            {/* COLUMNA 2 - CONTACTO DIRECTO */}
            <div className="text-center lg:text-left">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center justify-center lg:justify-start gap-2">
                <span className="text-amber-400">●</span> Contacto Directo
              </h3>
              <div className="space-y-4">
                <a href="tel:+17866583567" className="flex items-center justify-center lg:justify-start gap-3 text-white/70 hover:text-amber-400 transition-colors group">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-amber-400/20">
                    <img src="/iconos/phone.png" alt="Teléfono" className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-white/40">Teléfono</span>
                    <span className="text-sm font-medium">+1 (786) 658-3567</span>
                  </div>
                </a>
                <a href="mailto:batistaglobalservice25@gmail.com" className="flex items-center justify-center lg:justify-start gap-3 text-white/70 hover:text-amber-400 transition-colors group">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-amber-400/20">
                    <img src="/iconos/email.png" alt="Email" className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-white/40">Correo</span>
                    <span className="text-sm font-medium">batistaglobalservice25@gmail.com</span>
                  </div>
                </a>
                <a href="https://maps.google.com/?q=700+SW+57th+Ave+Miami+FL+33144" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center lg:justify-start gap-3 text-white/70 hover:text-amber-400 transition-colors group">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-amber-400/20">
                    <img src="/iconos/location.png" alt="Ubicación" className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-white/40">Oficina</span>
                    <span className="text-sm font-medium">Miami, FL</span>
                  </div>
                </a>
              </div>
            </div>

            {/* COLUMNA 3 - HORARIOS */}
            <div className="text-center lg:text-left">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center justify-center lg:justify-start gap-2">
                <span className="text-amber-400">●</span> Horarios
              </h3>
              <div className="bg-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
                  <img src="/iconos/clock.png" alt="Horario" className="w-5 h-5" />
                  <span className="text-white/90 text-sm font-medium">Atención al cliente</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Lun - Vie</span>
                    <span className="text-white/90 font-medium">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Sábado</span>
                    <span className="text-white/90 font-medium">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Domingo</span>
                    <span className="text-white/90 font-medium">10:00 - 14:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMNA 4 - REDES SOCIALES */}
            <div className="text-center lg:text-left">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center justify-center lg:justify-start gap-2">
                <span className="text-amber-400">●</span> Redes Sociales
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <a href="https://facebook.com/BatistaGlobalServices" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-[#1877F2]/20 transition-all group">
                  <img src="/iconos/facebook.png" alt="Facebook" className="w-5 h-5" />
                  <div className="flex flex-col items-start">
                    <span className="text-white/90 text-xs font-medium group-hover:text-[#1877F2]">Facebook</span>
                    <span className="text-white/40 text-[10px]">@BatistaGlobal</span>
                  </div>
                </a>
                <a href="https://instagram.com/batistaglobalservice" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-[#E4405F]/20 transition-all group">
                  <img src="/iconos/icon-instagram.png" alt="Instagram" className="w-5 h-5" />
                  <div className="flex flex-col items-start">
                    <span className="text-white/90 text-xs font-medium group-hover:text-[#E4405F]">Instagram</span>
                    <span className="text-white/40 text-[10px]">@batistaglobal</span>
                  </div>
                </a>
                <a href="https://tiktok.com/@batista.global" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/20 transition-all group col-span-2">
                  <img src="/iconos/tiktok.png" alt="TikTok" className="w-5 h-5" />
                  <div className="flex flex-col items-start">
                    <span className="text-white/90 text-xs font-medium group-hover:text-white">TikTok</span>
                    <span className="text-white/40 text-[10px]">@batista.global</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="max-w-2xl mx-auto mb-12 p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-white font-medium mb-1">¿Listo para viajar?</h4>
                <p className="text-white/60 text-sm">Suscríbete y recibe ofertas exclusivas</p>
              </div>
              <div className="flex-1 flex w-full gap-2">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white/90 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button className="px-6 py-3 bg-amber-400 text-black font-medium rounded-lg hover:bg-amber-500 transition-colors text-sm whitespace-nowrap">
                  Suscribirme
                </button>
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/40 text-xs">
                © 2026 Batista Global Service. Todos los derechos reservados.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-white/40 hover:text-amber-400 text-xs transition-colors">Términos</a>
                <a href="#" className="text-white/40 hover:text-amber-400 text-xs transition-colors">Privacidad</a>
                <a href="#" className="text-white/40 hover:text-amber-400 text-xs transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeFixed;