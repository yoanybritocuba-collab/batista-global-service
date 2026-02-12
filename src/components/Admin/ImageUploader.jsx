import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { uploadProductImage } from '../../services/productService';

const ImageUploader = ({ onImagesChange, maxFiles = 5, existingImages = [] }) => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  const onDrop = useCallback(async (acceptedFiles) => {
    setError('');
    setUploading(true);
    setUploadProgress(10);

    try {
      const newImages = [];
      
      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];
        
        // Validar tamaño (máx 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setError(`La imagen ${file.name} es demasiado grande. Máximo 5MB.`);
          continue;
        }

        // Validar tipo
        if (!file.type.startsWith('image/')) {
          setError(`El archivo ${file.name} no es una imagen válida.`);
          continue;
        }

        // Crear preview
        const preview = URL.createObjectURL(file);
        
        // Subir a Firebase Storage
        const uploadResult = await uploadProductImage(file);
        
        setUploadProgress(30 + (i / acceptedFiles.length) * 60);

        if (uploadResult.success) {
          newImages.push({
            id: Date.now() + i + Math.random(),
            file,
            preview,
            url: uploadResult.url,
            path: uploadResult.path,
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            status: 'success'
          });
        } else {
          newImages.push({
            id: Date.now() + i + Math.random(),
            file,
            preview,
            url: null,
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            status: 'error',
            error: uploadResult.error
          });
        }
      }

      const updatedImages = [...images, ...newImages].slice(0, maxFiles);
      setImages(updatedImages);
      setUploadProgress(100);
      
      // Enviar las URLs al componente padre
      const imageUrls = updatedImages.map(img => img.url).filter(url => url);
      if (onImagesChange) onImagesChange(imageUrls);
      
    } catch (err) {
      setError('Error al subir las imágenes: ' + err.message);
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  }, [images, maxFiles, onImagesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: maxFiles - images.length - existingImages.length,
    disabled: uploading
  });

  const removeImage = (id) => {
    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
    const imageUrls = updatedImages.map(img => img.url).filter(url => url);
    if (onImagesChange) onImagesChange(imageUrls);
  };

  return (
    <div className="space-y-6">
      {/* Zona de Drag & Drop */}
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          isDragActive
            ? 'border-blue-500 bg-blue-50/50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50/50'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Upload className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div>
            {isDragActive ? (
              <p className="text-lg font-medium text-blue-600">Suelta las imágenes aquí...</p>
            ) : (
              <>
                <p className="text-lg font-medium text-gray-900">
                  Arrastra y suelta tus imágenes
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  o haz clic para seleccionar archivos
                </p>
              </>
            )}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span className="px-3 py-1 bg-gray-100 rounded-full">JPG, PNG, GIF, WebP</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">Máx 5MB</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">
              {images.length + existingImages.length}/{maxFiles} usadas
            </span>
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Subiendo imágenes...</span>
            <span className="font-medium text-blue-600">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800">Error al subir</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Imágenes existentes */}
      {existingImages.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Imágenes actuales</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {existingImages.map((img, idx) => (
              <div key={idx} className="relative group rounded-xl overflow-hidden border-2 border-gray-200 bg-white">
                <div className="aspect-square">
                  <img 
                    src={img.url} 
                    alt={`Producto ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {idx === 0 && (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                    Principal
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Imágenes nuevas */}
      {images.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Imágenes nuevas</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {images.map((img) => (
              <div key={img.id} className="relative group rounded-xl overflow-hidden border-2 border-gray-200 bg-white">
                <div className="aspect-square">
                  <img 
                    src={img.preview} 
                    alt={img.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Badge de estado */}
                <div className={`absolute top-2 left-2 ${
                  img.status === 'success' ? 'bg-green-600' : 'bg-red-600'
                } text-white text-xs px-2 py-1 rounded-full shadow-lg flex items-center gap-1`}>
                  {img.status === 'success' ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                  {img.status === 'success' ? 'Subida' : 'Error'}
                </div>

                {/* Botón eliminar */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => removeImage(img.id)}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Información de la imagen */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <p className="text-xs text-white truncate">{img.name}</p>
                  <p className="text-[10px] text-white/80">{img.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;