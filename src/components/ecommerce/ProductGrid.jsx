import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filtros y Orden */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tienda Virtual</h1>
          <p className="text-gray-600">{products.length} productos disponibles</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white">
            <option>Todas las categorías</option>
            <option>Electrónica</option>
            <option>Misceláneos</option>
          </select>
          
          <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white">
            <option>Ordenar por: Destacados</option>
            <option>Precio: Menor a Mayor</option>
            <option>Precio: Mayor a Menor</option>
            <option>Nombre: A-Z</option>
            <option>Calificación</option>
          </select>
          
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            🔍 Filtros Avanzados
          </button>
        </div>
      </div>

      {/* Ofertas Flash */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">⚡ OFERTAS FLASH</h2>
            <p className="opacity-90">Termina en: <span className="font-bold">02:15:47</span></p>
          </div>
          <button className="px-6 py-3 bg-white text-red-600 rounded-lg font-bold hover:bg-gray-100 transition">
            Ver Todas las Ofertas
          </button>
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id || index} product={product} />
        ))}
      </div>

      {/* Paginación */}
      <div className="mt-12 flex justify-center">
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">⟨</button>
          <button className="px-4 py-2 bg-black text-white rounded-lg">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
          <span className="px-2">...</span>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">10</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">⟩</button>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
