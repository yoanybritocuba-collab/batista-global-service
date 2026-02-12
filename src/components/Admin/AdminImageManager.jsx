// src/components/Admin/AdminImageManager.jsx
import React, { useState } from 'react';
import { Upload, Image as ImageIcon, X, Trash2, Search, Folder, Check, Copy } from 'lucide-react';

const AdminImageManager = () => {
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  // Imágenes de ejemplo
  const [images, setImages] = useState([
    { id: 1, name: 'hero1.png', url: '/images/hero1.png', size: '2.4 MB', uploaded: '2024-01-15' },
    { id: 2, name: 'logo-icon.png', url: '/images/logo-icon.png', size: '156 KB', uploaded: '2024-01-14' },
    { id: 3, name: 'logo-text.png', url: '/images/logo-text.png', size: '89 KB', uploaded: '2024-01-14' },
    { id: 4, name: 'Paqueteria.jpg', url: '/images/Paqueteria.jpg', size: '1.8 MB', uploaded: '2024-01-13' },
    { id: 5, name: 'paquetes-turisticos.jpg', url: '/images/paquetes-turisticos.jpg', size: '2.1 MB', uploaded: '2024-01-13' },
    { id: 6, name: 'reservas_de_hoteles.jpg', url: '/images/reservas_de_hotels.jpg', size: '1.9 MB', uploaded: '2024-01-12' },
    { id: 7, name: 'reservas_de_vuelos.jpg', url: '/images/reservas_de_vuelos.jpg', size: '2.3 MB', uploaded: '2024-01-12' },
    { id: 8, name: 'renta-de-autos.jpg', url: '/images/renta-de-autos.jpg', size: '1.7 MB', uploaded: '2024-01-11' },
  ]);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    
    // Simular subida de imágenes
    setTimeout(() => {
      const newImages = files.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        url: URL.createObjectURL(file),
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploaded: new Date().toLocaleDateString()
      }));
      
      setImages(prev => [...newImages, ...prev]);
      setUploading(false);
      alert(`✅ ${files.length} imagen(es) subida(s) correctamente`);
    }, 2000);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta imagen?')) {
      setImages(prev => prev.filter(img => img.id !== id));
      setSelectedImages(prev => prev.filter(imgId => imgId !== id));
    }
  };

  const handleSelectImage = (id) => {
    setSelectedImages(prev => 
      prev.includes(id) 
        ? prev.filter(imgId => imgId !== id)
        : [...prev, id]
    );
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert('URL copiada al portapapeles');
  };

  const filteredImages = images.filter(img => 
    img.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestor de Imágenes</h2>
          <p className="text-gray-600">Sube y gestiona las imágenes de tu tienda</p>
        </div>
        <div className="flex items-center gap-4">
          {selectedImages.length > 0 && (
            <button
              onClick={() => {
                setImages(prev => prev.filter(img => !selectedImages.includes(img.id)));
                setSelectedImages([]);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 inline mr-2" />
              Eliminar seleccionadas ({selectedImages.length})
            </button>
          )}
        </div>
      </div>

      {/* Área de subida */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-dashed border-blue-200">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Upload className="h-10 w-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Subir nuevas imágenes</h3>
          <p className="text-gray-600 mb-6">
            Arrastra imágenes o haz clic para seleccionar
          </p>
          
          <label className="cursor-pointer">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg">
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Subiendo...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  Seleccionar imágenes
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
          
          <p className="mt-4 text-sm text-gray-500">
            PNG, JPG, WEBP hasta 5MB cada una
          </p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border">
          <div className="text-2xl font-bold text-blue-600">{images.length}</div>
          <div className="text-sm text-gray-600">Imágenes totales</div>
        </div>
        <div className="bg-white p-4 rounded-xl border">
          <div className="text-2xl font-bold text-green-600">
            {(images.reduce((acc, img) => {
              const size = parseFloat(img.size);
              return acc + (isNaN(size) ? 0 : size);
            }, 0)).toFixed(1)} MB
          </div>
          <div className="text-sm text-gray-600">Espacio usado</div>
        </div>
        <div className="bg-white p-4 rounded-xl border">
          <div className="text-2xl font-bold text-purple-600">{selectedImages.length}</div>
          <div className="text-sm text-gray-600">Seleccionadas</div>
        </div>
        <div className="bg-white p-4 rounded-xl border">
          <div className="text-2xl font-bold text-orange-600">
            {images.filter(img => img.name.includes('.png')).length}
          </div>
          <div className="text-sm text-gray-600">Imágenes PNG</div>
        </div>
      </div>

      {/* Búsqueda y filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar imágenes por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg"
          />
        </div>
        <select className="px-4 py-3 border rounded-lg">
          <option>Todas las categorías</option>
          <option>Productos</option>
          <option>Servicios</option>
          <option>Logos</option>
          <option>Hero images</option>
        </select>
      </div>

      {/* Grid de imágenes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <div 
            key={image.id} 
            className={`bg-white rounded-xl border overflow-hidden transition-all ${
              selectedImages.includes(image.id) 
                ? 'ring-2 ring-blue-500 border-blue-500' 
                : 'hover:shadow-lg'
            }`}
          >
            {/* Checkbox de selección */}
            <div className="absolute top-3 left-3 z-10">
              <button
                onClick={() => handleSelectImage(image.id)}
                className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                  selectedImages.includes(image.id)
                    ? 'bg-blue-500 border-blue-500'
                    : 'bg-white border-gray-300'
                }`}
              >
                {selectedImages.includes(image.id) && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </button>
            </div>

            {/* Imagen */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="text-white text-sm font-medium truncate">{image.name}</div>
              </div>
            </div>

            {/* Información de la imagen */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{image.size}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Folder className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">/images/</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mb-4">
                Subida: {image.uploaded}
              </div>

              {/* Acciones */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopyUrl(image.url)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
                >
                  <Copy className="h-3 w-3" />
                  Copiar URL
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  title="Eliminar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje sin imágenes */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border">
          <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No hay imágenes</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm 
              ? 'No se encontraron imágenes que coincidan con tu búsqueda'
              : 'Sube tu primera imagen usando el área de arriba'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminImageManager;