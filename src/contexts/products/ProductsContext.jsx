import React, { createContext, useContext, useState } from "react";
const ProductsContext = createContext();
export const useProducts = () => useContext(ProductsContext);
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  return <ProductsContext.Provider value={{ products, loading, setProducts }}>{children}</ProductsContext.Provider>;
};

