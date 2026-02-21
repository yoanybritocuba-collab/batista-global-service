import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/productService';
import { toast } from 'react-hot-toast';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const result = await getProducts();
    if (result.success) {
      setProducts(result.data);
    } else {
      toast.error('Error al cargar productos');
    }
    setLoading(false);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`¿Eliminar "${name}"?`)) {
      const result = await deleteProduct(id);
      if (result.success) {
        toast.success('Producto eliminado');
        loadProducts();
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Productos</h1>
        <Link
          to="/admin/products/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + Nuevo Producto
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 text-lg mb-4">No hay productos disponibles</p>
          <Link
            to="/admin/products/new"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Crear el primer producto →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-10 h-10 rounded object-cover mr-3"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded mr-3"></div>
                      )}
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.category || 'Sin categoría'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ${product.price || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.stock > 10 
                        ? 'bg-green-100 text-green-800' 
                        : product.stock > 0 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock || 0} unidades
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4 font-medium"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="text-red-600 hover:text-red-900 font-medium"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
