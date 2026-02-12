import React from 'react';
import { Link } from 'react-router-dom';

const ServiciosPage = () => {
  const servicios = [
    { img: "Paqueteria.jpg", title: "Paquetería Express", desc: "Envíos internacionales" },
    { img: "paquetes-turisticos.jpg", title: "Paquetes Turísticos", desc: "Viajes todo incluido" },
    { img: "renta-de-autos.jpg", title: "Renta de Autos", desc: "Vehículos de lujo" },
    { img: "reservas_de_hoteles.jpg", title: "Reservas de Hoteles", desc: "Mejores tarifas" },
    { img: "reservas_de_vuelos.jpg", title: "Reservas de Vuelos", desc: "Aerolíneas internacionales" },
    { img: "visas.jpg", title: "Visas", desc: "Trámite profesional" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Servicios</h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Soluciones completas para tus viajes y envíos en el Caribe
          </p>
        </div>
      </div>

      {/* Grid de Servicios */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((item, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-amber-400/20 overflow-hidden transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={`/images/${item.img}`}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/Paqueteria.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-white/90 text-sm">{item.desc}</p>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="text-gray-600">Más información</span>
                <span className="text-amber-400 group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiciosPage;