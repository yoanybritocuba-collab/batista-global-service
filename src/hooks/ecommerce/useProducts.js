import { useState, useEffect } from 'react';
import { 
  getProducts, 
  getProductsByCategory, 
  getProductsOnSale,
  getNewProducts,
  addProduct,
  updateProduct,
  deleteProduct 
} from '../firebase/firestore';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // SOLO productos reales - SIN NADA DE DEMO
  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await getProducts();
      setProducts(productsData || []);
      setError(null);
    } catch (err) {
      console.error('Error:', err);
      setProducts([]); // VACÍO, sin demo
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadProductsByCategory = async (category) => {
    try {
      setLoading(true);
      const productsData = await getProductsByCategory(category);
      setProducts(productsData || []);
      setError(null);
    } catch (err) {
      setProducts([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadProductsOnSale = async () => {
    try {
      setLoading(true);
      const productsData = await getProductsOnSale();
      setProducts(productsData || []);
      setError(null);
    } catch (err) {
      setProducts([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadNewProducts = async () => {
    try {
      setLoading(true);
      const productsData = await getNewProducts();
      setProducts(productsData || []);
      setError(null);
    } catch (err) {
      setProducts([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addNewProduct = async (productData) => {
    try {
      setLoading(true);
      const newProduct = await addProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      setError(null);
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateExistingProduct = async (id, productData) => {
    try {
      setLoading(true);
      const updatedProduct = await updateProduct(id, productData);
      setProducts(prev => 
        prev.map(product => 
          product.id === id ? updatedProduct : product
        )
      );
      setError(null);
      return updatedProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      setProducts(prev => prev.filter(product => product.id !== id));
      setError(null);
      return id;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    error,
    loadProducts,
    loadProductsByCategory,
    loadProductsOnSale,
    loadNewProducts,
    addNewProduct,
    updateExistingProduct,
    removeProduct
  };
};
