import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ onImagesChange, maxFiles = 5 }) => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setUploading(true);
    
    // Simular subida de archivos
    setTimeout(() => {
      const newImages = acceptedFiles.map(file => ({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
      }));
      
      const updatedImages = [...images, ...newImages].slice(0, maxFiles);
      setImages(updatedImages);
      if (onImagesChange) onImagesChange(updatedImages);
      setUploading(false);
    }, 1000);
  }, [images, maxFiles, onImagesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: maxFiles - images.length
  });

  const removeImage = (id) => {
    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
    if (onImagesChange) onImagesChange(updatedImages);
  };

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
    if (onImagesChange) onImagesChange(updatedImages);
  };

  return (
    <div className="space-y-6">
      {/* Zona de Drag & Drop */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} disabled={uploading} />
        
        <div className="space-y-3">
          <div className="flex justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
          </div>
          
          {isDragActive ? (
            <p className="text-lg font-medium text-blue-600">Suelta las imágenes aquí...</p>
          ) : (
            <>
              <p className="text-lg font-medium text-gray-700">
                Arrastra y suelta imágenes aquí
              </p>
              <p className="text-sm text-gray-500">o haz clic para seleccionar</p>
            </>
          )}
          
          <p className="text-xs text-gray-400 mt-2">
            Formatos: JPG, PNG, GIF, WebP (Máx. 5MB cada una)
          </p>
          <p className="text-xs text-gray-400">
            Límite: {maxFiles} imágenes ({images.length}/{maxFiles} usadas)
          </p>
        </div>
      </div>

      {/* Estado de carga */}
      {uploading && (
        <div className="flex items-center justify-center space-x-2 text-blue-600">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Subiendo imágenes...</span>
        </div>
      )}

      {/* Previsualización de imágenes */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-700">
              Imágenes ({images.length})
              <span className="text-sm font-normal text-gray-500 ml-2">
                Arrastra para cambiar el orden
              </span>
            </h3>
            <button
              type="button"
              onClick={() => {
                setImages([]);
                if (onImagesChange) onImagesChange([]);
              }}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Eliminar todas
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {images.map((img, index) => (
              <div
                key={img.id}
                className="relative group rounded-lg overflow-hidden border border-gray-200 bg-white"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                  moveImage(fromIndex, index);
                }}
              >
                {/* Imagen principal */}
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={img.preview}
                    alt={img.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Overlay con controles */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                      title="Eliminar"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Indicador de orden */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Principal
                  </div>
                )}

                {/* Información de la imagen */}
                <div className="p-2 bg-white">
                  <p className="text-xs font-medium text-gray-700 truncate" title={img.name}>
                    {img.name}
                  </p>
                  <p className="text-xs text-gray-500">{img.size}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Instrucciones */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div className="text-sm text-blue-800">
                <p className="font-medium">Recomendaciones:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>La primera imagen será la principal del producto</li>
                  <li>Usa imágenes de alta calidad (mín. 800x800px)</li>
                  <li>Formato recomendado: WebP o JPG comprimido</li>
                  <li>Máximo 5 imágenes por producto</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;