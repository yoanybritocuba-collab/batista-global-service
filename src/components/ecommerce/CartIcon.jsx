import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

const CartIcon = () => {
  const { itemCount, setIsCartOpen } = useCart();

  return (
    <button 
      onClick={() => setIsCartOpen(true)}
      className="relative p-2 hover:bg-gray-800 rounded-lg transition"
    >
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
