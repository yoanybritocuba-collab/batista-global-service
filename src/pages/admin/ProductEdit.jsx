import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ImageUploader from '../../components/Admin/ImageUploader'; // ← RUTA CORREGIDA (Admin con mayúscula)
import { getProductById, createProduct, updateProduct } from '../../services/productService';
import { toast } from 'react-hot-toast';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'electronics',
    price: '',
    stock: '',
    specifications: '',
    isFeatured: false,
    isNew: true,
    status: 'active'
  });

  useEffect(() => {
    if (isEditing) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);
    const result = await getProductById(id);
    if (result.success) {
      setFormData(result.data);
      if (result.data.imageUrl) {
        setExistingImages([{ url: result.data.imageUrl, isExisting: true }]);
      }
    } else {
      toast.error('Error al cargar el producto');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        imageUrl: imageUrls.length > 0 ? imageUrls[0] : (existingImages[0]?.url || null),
        additionalImages: imageUrls.slice(1)
      };

      let result;
      if (isEditing) {
        result = await updateProduct(id, productData);
      } else {
        result = await createProduct(productData);
      }

      if (result.success) {
        toast.success(isEditing ? 'Producto actualizado' : 'Producto creado');
        navigate('/admin/products');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error('Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <Link to="/admin/products" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
          ← Volver a productos
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECCIÓN DE IMÁGENES */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
              Imágenes del Producto
            </h2>
            <ImageUploader
              onImagesChange={setImageUrls}
              maxFiles={5}
              existingImages={existingImages}
            />
          </div>

          {/* INFORMACIÓN BÁSICA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Ej: Smartphone X Pro"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  name="category"
                  value={formData.category || 'electronics'}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                >
                  <option value="electronics">Electrónica</option>
                  <option value="fashion">Moda</option>
                  <option value="home">Hogar</option>
                  <option value="sports">Deportes</option>
                  <option value="beauty">Belleza</option>
                  <option value="tourism">Turismo</option>
                  <option value="others">Otros</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Precio *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stock *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock || ''}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Describe las características del producto..."
            />
          </div>

          {/* ESPECIFICACIONES */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Especificaciones Técnicas
            </label>
            <textarea
              name="specifications"
              value={formData.specifications || ''}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Color: Rojo, Material: Plástico, Dimensiones: 10x5x2cm..."
            />
          </div>

          {/* OPCIONES ADICIONALES */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-xl">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured || false}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Producto Destacado</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew || false}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Marcar como Nuevo</span>
            </label>

            <div>
              <select
                name="status"
                value={formData.status || 'active'}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              >
                <option value="active">🟢 Activo</option>
                <option value="inactive">⚫ Inactivo</option>
                <option value="draft">📝 Borrador</option>
              </select>
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-100">
            <Link
              to="/admin/products"
              className="px-6 py-3 border-2 border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-xl font-medium text-white transition-all ${
                loading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:scale-105'
              }`}
            >
              {loading ? 'Guardando...' : isEditing ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;