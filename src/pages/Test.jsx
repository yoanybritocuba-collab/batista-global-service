// src/pages/Tienda.jsx
import React from 'react';
import ProductCard from '../components/Tienda/ProductCard';

const Tienda = () => {
  // Datos de ejemplo de productos
  const products = [
    {
      id: 1,
      name: 'Camiseta Caribeña Azul',
      price: 24.99,
      originalPrice: 29.99,
      image: '/images/placeholder.jpg',
      rating: 4,
      reviews: 128,
      discount: 17,
      isNew: true
    },
    {
      id: 2,
      name: 'Sombrero de Paja Típico',
      price: 19.99,
      image: '/images/placeholder.jpg',
      rating: 5,
      reviews: 64,
      isNew: true
    },
    {
      id: 3,
      name: 'Pulsera de Conchas Marinas',
      price: 14.99,
      originalPrice: 19.99,
      image: '/images/placeholder.jpg',
      rating: 4,
      reviews: 89,
      discount: 25
    },
    {
      id: 4,
      name: 'Sandalias de Playa',
      price: 34.99,
      image: '/images/placeholder.jpg',
      rating: 4,
      reviews: 203
    },
    {
      id: 5,
      name: 'Bolso de Playa Tote',
      price: 29.99,
      originalPrice: 39.99,
      image: '/images/placeholder.jpg',
      rating: 3,
      reviews: 42,
      discount: 25
    },
    {
      id: 6,
      name: 'Llavero de Tortuga Marina',
      price: 8.99,
      image: '/images/placeholder.jpg',
      rating: 5,
      reviews: 156,
      isNew: true
    },
    {
      id: 7,
      name: 'Collar de Perlas Caribeñas',
      price: 49.99,
      originalPrice: 59.99,
      image: '/images/placeholder.jpg',
      rating: 4,
      reviews: 78,
      discount: 17
    },
    {
      id: 8,
      name: 'Gafas de Sol Polarizadas',
      price: 39.99,
      image: '/images/placeholder.jpg',
      rating: 4,
      reviews: 121
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
        Tienda Caribeña
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Descubre productos únicos inspirados en el Caribe
      </p>

      {/* Filtros (simplificados por ahora) */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
          Todos
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
          Ropa
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
          Accesorios
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
          Souvenirs
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
          Ofertas
        </button>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Banner de Ofertas */}
      <div className="mt-12 p-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl text-white">
        <h2 className="text-2xl font-bold mb-2">🚀 Ofertas Flash</h2>
        <p className="mb-4">Solo por tiempo limitado. ¡No te lo pierdas!</p>
        <div className="flex items-center gap-4">
          <div className="bg-white text-blue-600 px-3 py-1 rounded-lg font-bold">
            <div className="text-sm">Termina en</div>
            <div className="text-xl">02:15:30</div>
          </div>
          <button className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            Ver Ofertas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tienda;