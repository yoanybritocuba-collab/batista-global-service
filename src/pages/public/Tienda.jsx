import React from "react";
import { useCart } from "../../contexts/cart/CartContext";

const Tienda = () => {
  const { addToCart } = useCart();

  const products = [
    { 
      id: 1, 
      name: "Ventilador Caribeño", 
      price: 89.99, 
      image: "/images/placeholder-product.jpg",
      category: "electronics"
    },
    { 
      id: 2, 
      name: "Licuadora 800W", 
      price: 129.99, 
      image: "/images/placeholder-product.jpg",
      category: "electronics" 
    },
    { 
      id: 3, 
      name: "Lámpara Solar", 
      price: 34.99, 
      image: "/images/placeholder-product.jpg",
      category: "electronics" 
    },
    { 
      id: 4, 
      name: "Termo Acero", 
      price: 24.99, 
      image: "/images/placeholder-product.jpg",
      category: "miscellaneous" 
    },
  ];

  const handleAddToCart = (product) => {
    console.log("Agregando producto:", product);
    addToCart(product);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">🛒 Tienda Virtual</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg p-4">
            <div className="h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-400">🖼️ Imagen</span>
            </div>
            <h3 className="font-bold text-lg mb-2">{product.name}</h3>
            <p className="text-blue-600 font-bold text-xl mb-4">${product.price}</p>
            <button 
              onClick={() => handleAddToCart(product)}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tienda;