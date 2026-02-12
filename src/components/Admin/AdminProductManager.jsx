/ src/components/Admin/AdminProductManager.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, Edit, Trash2, Eye, Upload, 
  Image as ImageIcon, X, Search, Filter,
  CheckCircle, AlertCircle
} from 'lucide-react';
import { addProduct, updateProduct, deleteProduct } from '@/services/firebase/firestore';
import { uploadProductImage } from '@/firebase/storage';

const AdminProductManager = () => {
  const { t } = useTranslation();
  
  // Estado para productos
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Estado para formulario
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'electronics',
    stock: 10,
    discount: 0,
    isNew: false,
    isFeatured: false,
    specifications: '',
    imageUrl: ''
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Cargar productos (simulado por ahora)
  useEffect(() => {
    setTimeout(() => {
      const sampleProducts = [
        {
          id: '1',
          name: 'Ventilador CaribeÃ±o Turbo',
          description: 'Ventilador de torre con control remoto y temporizador',
          price: 89.99,
          originalPrice: 109.99,
          category: 'electronics',
          stock: 15,
          discount: 18,
          isNew: true,
          isFeatured: true,
          specifications: 'Velocidad: 3 niveles\nPotencia: 45W\nAltura: 120cm',
          imageUrl: '/images/placeholder.jpg',
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          name: 'Licuadora Professional 800W',
          description: 'Licuadora de alta potencia con vaso de vidrio',
          price: 129.99,
          originalPrice: 149.99,
          category: 'electronics',
          stock: 8,
          discount: 13,
          isNew: true,
          isFeatured: false,
          specifications: 'Potencia: 800W\nVaso: 1.5L\nVelocidades: 5',
          imageUrl: '/images/placeholder.jpg',
          createdAt: '2024-01-14'
        },
        {
          id: '3',
          name: 'LÃ¡mpara Solar para JardÃ­n',
          description: 'LÃ¡mpara solar con sensor de movimiento',
          price: 34.99,
          originalPrice: '',
          category: 'electronics',
          stock: 25,
          discount: 0,
          isNew: false,
          isFeatured: true,
          specifications: 'BaterÃ­a: 2000mAh\nAutonomÃ­a: 10 horas\nIP65',
          imageUrl: '/images/placeholder.jpg',
          createdAt: '2024-01-10'
        },
        {
          id: '4',
          name: 'Termo de Acero Inoxidable',
          description: 'Termo que mantiene temperatura por 24 horas',
          price: 24.99,
          originalPrice: 29.99,
          category: 'home',
          stock: 40,
          discount: 17,
          isNew: true,
          isFeatured: false,
          specifications: 'Capacidad: 1L\nMaterial: Acero inoxidable\nTapa: hermÃ©tica',
          imageUrl: '/images/placeholder.jpg',
          createdAt: '2024-01-08'
        },
        {
          id: '5',
          name: 'Set de Cuchillos Profesional',
          description: 'Set de 6 cuchillos con bloque de madera',
          price: 79.99,
          originalPrice: 99.99,
          category: 'home',
          stock: 12,
          discount: 20,
          isNew: false,
          isFeatured: true,
          specifications: 'Material: Acero alemÃ¡n\nIncluye: 6 cuchillos + bloque',
          imageUrl: '/images/placeholder.jpg',
          createdAt: '2024-01-05'
        }
      ];
      
      setProducts(sampleProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Manejar cambio en formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Manejar cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Guardar producto
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Subir imagen si hay archivo nuevo
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        const productId = editingProduct?.id || Date.now().toString();
        imageUrl = await uploadProductImage(imageFile, productId);
      }
      
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        discount: parseInt(formData.discount),
        stock: parseInt(formData.stock),
        imageUrl: imageUrl,
        category: formData.category || 'electronics',
        isNew: Boolean(formData.isNew),
        isFeatured: Boolean(formData.isFeatured),
        specifications: formData.specifications || ''
      };
      
      if (editingProduct) {
        // Actualizar producto existente en Firestore
        const updatedProduct = await updateProduct(editingProduct.id, productData);
        setProducts(prev => 
          prev.map(p => p.id === editingProduct.id ? updatedProduct : p)
        );
        alert('âœ… Producto actualizado correctamente en Firestore');
      } else {
        // Crear nuevo producto en Firestore
        const newProduct = await addProduct(productData);
        setProducts(prev => [newProduct, ...prev]);
        alert('âœ… Producto creado correctamente en Firestore');
      }
      
      // Resetear formulario
      resetForm();
      
    } catch (err) {
      console.error('Error guardando producto:', err);
      setError('Error al guardar el producto: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Editar producto
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || '',
      category: product.category,
      stock: product.stock,
      discount: product.discount || 0,
      isNew: product.isNew || false,
      isFeatured: product.isFeatured || false,
      specifications: product.specifications || '',
      imageUrl: product.imageUrl || ''
    });
    setImagePreview(product.imageUrl || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    if (window.confirm('Â¿EstÃ¡s seguro de eliminar este producto?')) {
      try {
        await deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
        alert('ðŸ—‘ï¸ Producto eliminado de Firestore');
      } catch (err) {
        console.error('Error eliminando producto:', err);
        alert('Error al eliminar el producto: ' + err.message);
      }
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: 'electronics',
      stock: 10,
      discount: 0,
      isNew: false,
      isFeatured: false,
      specifications: '',
      imageUrl: ''
    });
    setImageFile(null);
    setImagePreview('');
  };

  // CategorÃ­as disponibles
  const categories = [
    { value: 'electronics', label: 'ElectrÃ³nica', color: 'bg-blue-100 text-blue-800' },
    { value: 'clothing', label: 'Ropa', color: 'bg-green-100 text-green-800' },
    { value: 'accessories', label: 'Accesorios', color: 'bg-purple-100 text-purple-800' },
    { value: 'home', label: 'Hogar', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'souvenirs', label: 'Souvenirs', color: 'bg-pink-100 text-pink-800' },
    { value: 'other', label: 'Otros', color: 'bg-gray-100 text-gray-800' }
  ];

  if (loading && products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header y estadÃ­sticas */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">GestiÃ³n de Productos</h1>
            <p className="text-gray-600">Administra tu catÃ¡logo de productos</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{products.length}</div>
              <div className="text-sm text-gray-500">Productos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {products.filter(p => p.stock < 10).length}
              </div>
              <div className="text-sm text-gray-500">Bajo stock</div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario de producto */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            {editingProduct ? 'âœï¸ Editar Producto' : 'âž• Agregar Nuevo Producto'}
          </h2>
          {editingProduct && (
            <button
              onClick={resetForm}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar ediciÃ³n
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <div>
              <p className="text-red-600 font-medium">Error</p>
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSaveProduct} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Columna izquierda - InformaciÃ³n bÃ¡sica */}
            <div className="space-y-6">
              {/* Nombre y categorÃ­a */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nombre del Producto *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Ventilador Turbo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    CategorÃ­a *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* DescripciÃ³n */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  DescripciÃ³n *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe el producto en detalle..."
                />
              </div>

              {/* Especificaciones */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Especificaciones TÃ©cnicas
                </label>
                <textarea
                  name="specifications"
                  value={formData.specifications}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="Potencia: 800W\nMaterial: Acero\nColor: Negro"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Usa saltos de lÃ­nea para cada especificaciÃ³n
                </p>
              </div>
            </div>

            {/* Columna derecha - Precios e imagen */}
            <div className="space-y-6">
              {/* Precios */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Precio Actual ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="89.99"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Precio Original ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="109.99"
                  />
                </div>
              </div>

              {/* Descuento y stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Descuento (%)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      name="discount"
                      value={formData.discount}
                      onChange={handleInputChange}
                      min="0"
                      max="90"
                      step="5"
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm">
                      <span>0%</span>
                      <span className="font-bold text-blue-600">{formData.discount}%</span>
                      <span>90%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Stock Disponible *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <div className={`mt-1 text-sm ${
                    formData.stock > 20 ? 'text-green-600' :
                    formData.stock > 10 ? 'text-yellow-600' :
                    formData.stock > 0 ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {formData.stock > 20 ? 'âœ… Stock suficiente' :
                     formData.stock > 10 ? 'âš ï¸ Stock moderado' :
                     formData.stock > 0 ? 'âš ï¸ Stock bajo' : 'âŒ Sin stock'}
                  </div>
                </div>
              </div>

              {/* Imagen del producto */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Imagen del Producto
                </label>
                
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Vista previa"
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setImageFile(null);
                        setFormData(prev => ({ ...prev, imageUrl: '' }));
                      }}
                      className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="mt-2 text-center">
                      <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                        <Upload className="h-4 w-4" />
                        Cambiar Imagen
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="block cursor-pointer">
                    <div className="border-3 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
                      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600 mb-2">
                        Arrastra una imagen o haz clic para seleccionar
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        PNG, JPG o WEBP (Max. 5MB)
                      </p>
                      <span className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Upload className="h-4 w-4" />
                        Seleccionar Imagen
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Opciones adicionales */}
          <div className="flex flex-wrap gap-6 p-4 bg-gray-50 rounded-lg">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  formData.isNew ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    formData.isNew ? 'transform translate-x-5' : 'transform translate-x-1'
                  }`}></div>
                </div>
              </div>
              <div>
                <span className="font-medium">Producto Nuevo</span>
                <p className="text-sm text-gray-500">Mostrar etiqueta "Nuevo"</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  formData.isFeatured ? 'bg-purple-500' : 'bg-gray-300'
                }`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    formData.isFeatured ? 'transform translate-x-5' : 'transform translate-x-1'
                  }`}></div>
                </div>
              </div>
              <div>
                <span className="font-medium">Destacado</span>
                <p className="text-sm text-gray-500">Mostrar en secciÃ³n destacados</p>
              </div>
            </label>
          </div>

          {/* Botones de acciÃ³n */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-3 px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  {editingProduct ? 'Actualizar Producto' : 'Crear Producto'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de productos existentes */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-xl font-bold">ðŸ“¦ Productos Existentes</h2>
          
          {/* Filtros y bÃºsqueda */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">Todas las categorÃ­as</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CategorÃ­a</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 flex-shrink-0">
                        <img
                          src={product.imageUrl || '/images/placeholder.jpg'}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categories.find(c => c.value === product.category)?.color}`}>
                      {categories.find(c => c.value === product.category)?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold">${product.price.toFixed(2)}</div>
                    {product.discount > 0 && (
                      <div className="text-sm">
                        <span className="text-gray-500 line-through mr-2">
                          ${product.originalPrice?.toFixed(2)}
                        </span>
                        <span className="text-red-600 font-medium">-{product.discount}%</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`font-medium ${
                      product.stock > 20 ? 'text-green-600' :
                      product.stock > 10 ? 'text-yellow-600' :
                      product.stock > 0 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {product.stock} unidades
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {product.isNew && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Nuevo
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          Destacado
                        </span>
                      )}
                      {product.discount > 0 && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                          Oferta
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => window.open(`/producto/${product.id}`, '_blank')}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                        title="Vista previa"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">ðŸ“¦</div>
              <h3 className="text-lg font-medium mb-2">No hay productos</h3>
              <p className="text-gray-600">Crea tu primer producto usando el formulario de arriba</p>
            </div>
          )}
        </div>

        {/* EstadÃ­sticas del listado */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{filteredProducts.length}</div>
            <div className="text-sm text-gray-600">Productos encontrados</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {filteredProducts.filter(p => p.isNew).length}
            </div>
            <div className="text-sm text-gray-600">Productos nuevos</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {filteredProducts.filter(p => p.stock < 10).length}
            </div>
            <div className="text-sm text-gray-600">Stock bajo</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {filteredProducts.filter(p => p.discount > 0).length}
            </div>
            <div className="text-sm text-gray-600">En oferta</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductManager;
