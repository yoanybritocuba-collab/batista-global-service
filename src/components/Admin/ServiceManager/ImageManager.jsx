import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ImageManager = ({ mainImage, gallery = [], onChange }) => {
  const [activeTab, setActiveTab] = useState('main');

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Por favor selecciona una imagen válida'); return; }
    if (file.size > 5 * 1024 * 1024) { alert('La imagen no debe superar los 5MB'); return; }

    const reader = new FileReader();
    reader.onloadend = () => onChange('mainImage', reader.result);
    reader.readAsDataURL(file);
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024);

    Promise.all(validFiles.map(file => new Promise(resolve => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    }))).then(results => {
      onChange('gallery', [...gallery, ...results]);
    });
  };

  const removeFromGallery = (index) => {
    onChange('gallery', gallery.filter((_, i) => i !== index));
  };

  const removeMainImage = () => {
    onChange('mainImage', '');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Imágenes</h3>
      <div className="flex gap-2 border-b">
        <button onClick={() => setActiveTab('main')} className={`px-4 py-2 font-medium transition-colors ${activeTab === 'main' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-500 hover:text-gray-700'}`}>Imagen Principal</button>
        <button onClick={() => setActiveTab('gallery')} className={`px-4 py-2 font-medium transition-colors ${activeTab === 'gallery' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-500 hover:text-gray-700'}`}>Galería ({gallery.length})</button>
      </div>

      {activeTab === 'main' && (
        <div className="p-4 bg-gray-50 rounded-xl">
          {mainImage ? (
            <div className="relative inline-block">
              <img src={mainImage} alt="Principal" className="w-64 h-64 object-cover rounded-lg border-2 border-gray-200" />
              <button onClick={removeMainImage} className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"><X className="h-4 w-4" /></button>
            </div>
          ) : (
            <label className="block cursor-pointer">
              <div className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-amber-400 hover:bg-amber-50 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium mb-2">Haz clic para subir la imagen principal</p>
                <p className="text-sm text-gray-500">Recomendado: 800x600px • Máximo 5MB</p>
              </div>
              <input type="file" accept="image/*" onChange={handleMainImageUpload} className="hidden" />
            </label>
          )}
        </div>
      )}

      {activeTab === 'gallery' && (
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {gallery.map((img, idx) => (
              <div key={idx} className="relative aspect-square group">
                <img src={img} alt={`Galería ${idx + 1}`} className="w-full h-full object-cover rounded-lg border-2 border-gray-200" />
                <button onClick={() => removeFromGallery(idx)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X className="h-3 w-3" /></button>
              </div>
            ))}
          </div>
          <label className="block cursor-pointer">
            <div className="border-3 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-amber-400 hover:bg-amber-50 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Agregar más imágenes a la galería</p>
              <p className="text-sm text-gray-500 mt-1">Puedes seleccionar múltiples imágenes</p>
            </div>
            <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageManager;
