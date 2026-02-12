import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import { 
  X, Package, DollarSign, Tag, Hash, Box, Truck, Globe, 
  AlertCircle, CheckCircle, Upload
} from 'lucide-react';
import { 
  createProduct, 
  updateProduct, 
  uploadMultipleImages,
  uploadProductImage 
} from '../../services/productService';
import { toast } from 'react-hot-toast';

const ProductFormModal = ({ isOpen, onClose, product = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'electronics',
    price: '',
    originalPrice: '',
    discount: '0',
    sku: '',
    stock: '',
    specifications: '',
    weight: '',
    dimensions: '',
    shippingCost: '',
    seoTitle: '',
    seoDescription: '',
    isFeatured: false,
    isNew: true,
    status: 'active'
  });

  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = [
    { value: 'electronics', label: 'Electrónica' },
    { value: 'fashion', label: 'Moda' },
    { value: 'home', label: 'Hogar' },
    { value: 'sports', label: 'Deportes' },
    { value: 'beauty', label: 'Belleza' },
    { value: 'tourism', label: 'Servicios Turísticos' },
    { value: 'others', label: 'Otros' }
  ];

  // Cargar datos del producto si estamos editando
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        category: product.category || 'electronics',
        price: product.price || '',
        originalPrice: product.originalPrice || '',
        discount: product.discount || '0',
        sku: product.sku || '',
        stock: product.stock || '',
        specifications: product.specifications || '',
        weight: product.weight || '',
        dimensions: product.dimensions || '',
        shippingCost: product.shippingCost || '',
        seoTitle: product.seoTitle || '',
        seoDescription: product.seoDescription || '',
        isFeatured: product.isFeatured || false,
        isNew: product.isNew || true,
        status: product.status || 'active'
      });

      if (product.imageUrl) {
        setUploadedImages([{
          id: 'existing',
          preview: product.imageUrl,
          url: product.imageUrl,
          isExisting: true
        }]);
      }
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress(10);

    try {
      let imageUrls = [...uploadedImages.map(img => img.url)];

      // Subir nuevas imágenes si hay
      if (images.length > 0) {
        setUploadProgress(30);
        const files = images.map(img => img.file);
        
        const uploadResult = await uploadMultipleImages(files);
        
        if (uploadResult.success) {
          const newUrls = uploadResult.images.map(img => img.url);
          imageUrls = [...imageUrls, ...newUrls];
          setUploadProgress(70);
        } else {
          throw new Error('Error al subir imágenes');
        }
      }

      // Preparar datos para Firebase
      const productData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        discount: parseInt(formData.discount) || 0,
        stock: parseInt(formData.stock) || 0,
        imageUrl: imageUrls[0] || null,
        additionalImages: imageUrls.slice(1) || [],
        specifications: formData.specifications || '',
        weight: formData.weight || '',
        dimensions: formData.dimensions || '',
        shippingCost: formData.shippingCost ? parseFloat(formData.shippingCost) : 0,
        isFeatured: formData.isFeatured,
        isNew: formData.isNew,
        status: formData.status
      };

      setUploadProgress(90);

      // Guardar en Firestore
      let result;
      if (product) {
        // Actualizar producto existente
        result = await updateProduct(product.id, productData);
      } else {
        // Crear nuevo producto
        result = await createProduct(productData);
      }

      setUploadProgress(100);

      if (result.success) {
        toast.success(result.message || (product ? 'Producto actualizado' : 'Producto creado'));
        if (onSuccess) onSuccess();
        onClose();
        resetForm();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'electronics',
      price: '',
      originalPrice: '',
      discount: '0',
      sku: '',
      stock: '',
      specifications: '',
      weight: '',
      dimensions: '',
      shippingCost: '',
      seoTitle: '',
      seoDescription: '',
      isFeatured: false,
      isNew: true,
      status: 'active'
    });
    setImages([]);
    setUploadedImages([]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleImageUpload = (newImages) => {
    setImages(newImages);
  };

  const calculateDiscount = () => {
    const price = parseFloat(formData.price) || 0;
    const original = parseFloat(formData.originalPrice) || 0;
    
    if (original > 0 && price > 0) {
      const discount = ((original - price) / original) * 100;
      return Math.round(discount);
    }
    return 0;
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
          <div className="sticky top-0 z-10 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">
                  {product ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
                </h2>
                <p className="text-gray-300">
                  {product ? 'Actualiza la información del producto' : 'Completa todos los campos para agregar un nuevo producto'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                disabled={loading}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Barra de progreso */}
            {loading && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Guardando producto...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Formulario */}
          <div className="overflow-y-auto max-h-[70vh] px-8 py-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Sección 1: Imágenes */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-4 shadow">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Galería de Imágenes</h3>
                    <p className="text-gray-600">Sube las imágenes del producto (Máx. 5)</p>
                  </div>
                </div>
                
                {uploadedImages.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-700">Imágenes existentes:</h4>
                      <span className="text-sm text-gray-500">
                        {uploadedImages.length} imagen(es)
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {uploadedImages.map((img, index) => (
                        <div key={index} className="relative group rounded-lg overflow-hidden border-2 border-blue-200 bg-white">
                          <div className="aspect-square overflow-hidden bg-gray-100">
                            <img
                              src={img.preview || img.url}
                              alt={`Producto ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {index === 0 && (
                            <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full shadow">
                              Principal
                            </div>
                          )}
                          {img.isExisting && (
                            <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                              <CheckCircle className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <ImageUploader
                  onImagesChange={handleImageUpload}
                  maxFiles={5}
                  existingImagesCount={uploadedImages.length}
                />
              </div>

              {/* Sección 2: Información básica */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl mr-4 shadow">
                        <Tag className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Información Básica</h3>
                        <p className="text-gray-600">Datos principales del producto</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Nombre del Producto *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                          placeholder="Ej: Smartphone X Pro 256GB"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Descripción *
                        </label>
                        <textarea
                          name="description"
                          rows="5"
                          required
                          value={formData.description}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                          placeholder="Describe el producto en detalle, incluyendo características, beneficios, etc..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Categoría *
                        </label>
                        <select
                          name="category"
                          required
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all appearance-none bg-white"
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
                </div>

                {/* Sección 3: Precios e Inventario */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl mr-4 shadow">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Precios e Inventario</h3>
                        <p className="text-gray-600">Gestión de precios y stock</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">
                            Precio Actual *
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
                              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="99.99"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">
                            Precio Original
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                            <input
                              type="number"
                              name="originalPrice"
                              min="0"
                              step="0.01"
                              value={formData.originalPrice}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="129.99"
                            />
                          </div>
                        </div>
                      </div>

                      {formData.originalPrice && formData.price && (
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border border-orange-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
                              <span className="text-orange-800 font-medium">
                                Descuento aplicado:
                              </span>
                            </div>
                            <span className="text-2xl font-bold text-red-600">
                              {calculateDiscount()}%
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">
                            SKU *
                          </label>
                          <div className="relative">
                            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              name="sku"
                              required
                              value={formData.sku}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="SKU-001-2024"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">
                            Stock Disponible *
                          </label>
                          <div className="relative">
                            <Box className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="number"
                              name="stock"
                              required
                              min="0"
                              value={formData.stock}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="100"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Especificaciones Técnicas
                        </label>
                        <textarea
                          name="specifications"
                          rows="3"
                          value={formData.specifications}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Color: Rojo, Material: Plástico, Dimensiones: 10x5x2cm..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 4: Opciones adicionales */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl mr-4 shadow">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Opciones Adicionales</h3>
                    <p className="text-gray-600">Configuración avanzada del producto</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Peso (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      min="0"
                      step="0.01"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Dimensiones
                    </label>
                    <input
                      type="text"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="20x15x10 cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
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
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="5.99"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isFeatured" className="text-gray-700 font-medium">
                      Producto Destacado
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="isNew"
                      name="isNew"
                      checked={formData.isNew}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isNew" className="text-gray-700 font-medium">
                      Marcar como Nuevo
                    </label>
                  </div>

                  <div>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">🟢 Activo</option>
                      <option value="inactive">⚫ Inactivo</option>
                      <option value="draft">📝 Borrador</option>
                      <option value="out_of_stock">🔴 Agotado</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="sticky bottom-0 bg-white pt-6 border-t border-gray-200 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="px-8 py-3 border-2 border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-8 py-3 rounded-xl font-medium text-white transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                    loading 
                      ? 'bg-gradient-to-r from-blue-400 to-blue-500' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Guardando...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      {product ? '💾 Actualizar Producto' : '🚀 Crear Producto'}
                    </span>
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