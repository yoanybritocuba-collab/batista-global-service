import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import { X, Package, DollarSign, Tag, Hash, Box, Truck, Globe } from 'lucide-react';

const ProductFormModal = ({ isOpen, onClose, product = null }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category || 'electronics',
    price: product?.price || '',
    comparePrice: product?.comparePrice || '',
    sku: product?.sku || '',
    stock: product?.stock || '',
    weight: product?.weight || '',
    dimensions: product?.dimensions || '',
    shippingCost: product?.shippingCost || '',
    seoTitle: product?.seoTitle || '',
    seoDescription: product?.seoDescription || '',
    status: product?.status || 'active'
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'electronics', label: 'Electrónica' },
    { value: 'fashion', label: 'Moda' },
    { value: 'home', label: 'Hogar' },
    { value: 'sports', label: 'Deportes' },
    { value: 'beauty', label: 'Belleza' },
    { value: 'tourism', label: 'Servicios Turísticos' },
    { value: 'others', label: 'Otros' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simular envío
    setTimeout(() => {
      console.log('Producto guardado:', { ...formData, images });
      setLoading(false);
      onClose();
      alert(product ? 'Producto actualizado' : 'Producto creado');
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b px-8 py-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {product ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <p className="text-gray-600">
                {product ? 'Actualiza la información del producto' : 'Completa todos los campos para agregar un nuevo producto'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Formulario */}
          <div className="overflow-y-auto max-h-[70vh] px-8 py-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Sección 1: Imágenes */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Galería de Imágenes</h3>
                    <p className="text-sm text-gray-500">Sube las imágenes del producto (Máx. 5)</p>
                  </div>
                </div>
                <ImageUploader
                  onImagesChange={setImages}
                  maxFiles={5}
                />
              </div>

              {/* Sección 2: Información básica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <Tag className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold">Información Básica</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre del Producto *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: Smartphone X Pro"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                      </label>
                      <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe el producto en detalle..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoría *
                      </label>
                      <select
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Sección 3: Precios */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-green-100 rounded-lg mr-3">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold">Precios e Inventario</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Precio de Venta *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            name="price"
                            required
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Precio Comparación
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            name="comparePrice"
                            min="0"
                            step="0.01"
                            value={formData.comparePrice}
                            onChange={handleChange}
                            className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          SKU *
                        </label>
                        <div className="relative">
                          <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            name="sku"
                            required
                            value={formData.sku}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="SKU-001"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stock Disponible *
                        </label>
                        <div className="relative">
                          <Box className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            name="stock"
                            required
                            min="0"
                            value={formData.stock}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado del Producto
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                        <option value="draft">Borrador</option>
                        <option value="out_of_stock">Agotado</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 4: Envío y Dimensiones */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <Truck className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Envío y Dimensiones</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Peso (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      min="0"
                      step="0.01"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dimensiones (L x A x A)
                    </label>
                    <input
                      type="text"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ej: 20x15x10 cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Costo de Envío
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        name="shippingCost"
                        min="0"
                        step="0.01"
                        value={formData.shippingCost}
                        onChange={handleChange}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 5: SEO */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg mr-3">
                    <Globe className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Optimización SEO</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título SEO
                    </label>
                    <input
                      type="text"
                      name="seoTitle"
                      value={formData.seoTitle}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Título para motores de búsqueda"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción SEO
                    </label>
                    <textarea
                      name="seoDescription"
                      rows="3"
                      value={formData.seoDescription}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Descripción para motores de búsqueda (máx. 160 caracteres)"
                      maxLength="160"
                    />
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {formData.seoDescription.length}/160 caracteres
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="sticky bottom-0 bg-white pt-6 border-t flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${
                    loading
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Guardando...
                    </span>
                  ) : (
                    product ? 'Actualizar Producto' : 'Crear Producto'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
