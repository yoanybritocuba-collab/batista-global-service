import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const HomeFixed = () => {
  const { t } = useLanguage();

  return (
    <div className="m-0 p-0 bg-black">
      
      {/* HERO - SIN MARGEN SUPERIOR */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-auto min-h-[500px] lg:min-h-[700px] flex items-end pb-16 lg:pb-24"> {/* 👈 QUITADO mt-4 */}
        
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
    </div>
  );
};

export default HomeFixed;