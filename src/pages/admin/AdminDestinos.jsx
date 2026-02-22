import React, { useState, useEffect } from 'react';
import { useDestinos } from '../../contexts/DestinosContext';
import { 
  Plus, Edit, Trash2, Upload, X, Search,
  MapPin, DollarSign, Save,
  Eye, EyeOff, Image as ImageIcon, Loader, PlusCircle,
  Star, MoveUp, MoveDown
} from 'lucide-react';
import { uploadImage } from '../../services/firebase/storage';
import { toast } from 'react-hot-toast';

const AdminDestinos = () => {
  const { destinos, loading, loadDestinos, addDestino, updateDestino, deleteDestino } = useDestinos();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    imagenes: [],
    precioMin: '',
    precioMax: '',
    precioOfertaMin: '',
    precioOfertaMax: '',
    descripcion: '',
    activo: true,
    destacado: false,
    orden: 0
  });
  
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    loadDestinos();
  }, []);

  useEffect(() => {
    if (editingId && formData.imagenes && formData.imagenes.length > 0) {
      setImagePreviews(formData.imagenes);
    }
  }, [editingId, formData.imagenes]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageFileChange = async (e) => {
    const files = Array.from(e.target.files);
    
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} no es una imagen válida`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} no debe superar los 5MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setSelectedFiles(prev => [...prev, ...validFiles]);
    
    const newPreviews = [];
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === validFiles.length) {
          setImagePreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
    
    toast.success(`✅ ${validFiles.length} imagen(es) seleccionada(s)`);
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveImageUp = (index) => {
    if (index === 0) return;
    const newPreviews = [...imagePreviews];
    [newPreviews[index - 1], newPreviews[index]] = [newPreviews[index], newPreviews[index - 1]];
    setImagePreviews(newPreviews);
    
    if (selectedFiles.length > 0) {
      const newFiles = [...selectedFiles];
      [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
      setSelectedFiles(newFiles);
    }
  };

  const moveImageDown = (index) => {
    if (index === imagePreviews.length - 1) return;
    const newPreviews = [...imagePreviews];
    [newPreviews[index], newPreviews[index + 1]] = [newPreviews[index + 1], newPreviews[index]];
    setImagePreviews(newPreviews);
    
    if (selectedFiles.length > 0) {
      const newFiles = [...selectedFiles];
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
      setSelectedFiles(newFiles);
    }
  };

  const setAsPortada = (index) => {
    const newPreviews = [...imagePreviews];
    const [selectedImage] = newPreviews.splice(index, 1);
    newPreviews.unshift(selectedImage);
    setImagePreviews(newPreviews);
    
    if (selectedFiles.length > 0) {
      const newFiles = [...selectedFiles];
      const [selectedFile] = newFiles.splice(index, 1);
      newFiles.unshift(selectedFile);
      setSelectedFiles(newFiles);
    }
    
    toast.success('✅ Imagen establecida como portada');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre.trim()) {
      toast.error('El nombre del destino es obligatorio');
      return;
    }

    if (imagePreviews.length === 0) {
      toast.error('Debes seleccionar al menos una imagen');
      return;
    }

    setSaving(true);
    setUploading(true);

    try {
      let imagenesUrls = [];

      if (selectedFiles.length > 0) {
        toast.loading(`Subiendo ${selectedFiles.length} imágenes...`, { id: 'upload' });
        
        for (const file of selectedFiles) {
          const result = await uploadImage(file, 'destinos');
          if (result.success) {
            imagenesUrls.push(result.url);
          } else {
            toast.error('Error al subir una imagen');
            setSaving(false);
            setUploading(false);
            return;
          }
        }
        
        toast.dismiss('upload');
        toast.success('✅ Imágenes subidas correctamente');
      } else {
        imagenesUrls = formData.imagenes || [];
      }

      const destinoData = {
        ...formData,
        imagenes: imagenesUrls,
        precioMin: parseFloat(formData.precioMin) || 0,
        precioMax: parseFloat(formData.precioMax) || 0,
        precioOfertaMin: parseFloat(formData.precioOfertaMin) || 0,
        precioOfertaMax: parseFloat(formData.precioOfertaMax) || 0,
        orden: parseInt(formData.orden) || 0
      };

      if (editingId) {
        await updateDestino(editingId, destinoData);
        toast.success('✅ Destino actualizado');
      } else {
        await addDestino(destinoData);
        toast.success('✅ Destino agregado');
      }

      resetForm();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al guardar');
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  const handleEdit = (destino) => {
    setEditingId(destino.id);
    setFormData({
      nombre: destino.nombre || '',
      imagenes: destino.imagenes || (destino.imagen ? [destino.imagen] : []),
      precioMin: destino.precioMin || '',
      precioMax: destino.precioMax || '',
      precioOfertaMin: destino.precioOfertaMin || '',
      precioOfertaMax: destino.precioOfertaMax || '',
      descripcion: destino.descripcion || '',
      activo: destino.activo !== false,
      destacado: destino.destacado || false,
      orden: destino.orden || 0
    });
    setImagePreviews(destino.imagenes || (destino.imagen ? [destino.imagen] : []));
    setSelectedFiles([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este destino?')) {
      await deleteDestino(id);
    }
  };

  const handleToggleActivo = async (destino) => {
    await updateDestino(destino.id, {
      ...destino,
      activo: !destino.activo
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      nombre: '',
      imagenes: [],
      precioMin: '',
      precioMax: '',
      precioOfertaMin: '',
      precioOfertaMax: '',
      descripcion: '',
      activo: true,
      destacado: false,
      orden: 0
    });
    setImagePreviews([]);
    setSelectedFiles([]);
  };

  const filteredDestinos = destinos.filter(destino =>
    destino.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destino.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && destinos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando destinos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2">Gestión de Destinos Populares</h1>
        <p className="text-blue-100">Administra los destinos que se muestran en la página principal</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {editingId ? '✏️ Editar Destino' : '➕ Agregar Nuevo Destino'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Destino *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Punta Cana"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Breve descripción del destino"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio Mínimo ($)
                  </label>
                  <input
                    type="number"
                    name="precioMin"
                    value={formData.precioMin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="499"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio Máximo ($)
                  </label>
                  <input
                    type="number"
                    name="precioMax"
                    value={formData.precioMax}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="599"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio Oferta Mínimo ($)
                  </label>
                  <input
                    type="number"
                    name="precioOfertaMin"
                    value={formData.precioOfertaMin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="399"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio Oferta Máximo ($)
                  </label>
                  <input
                    type="number"
                    name="precioOfertaMax"
                    value={formData.precioOfertaMax}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="499"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imágenes del Destino * (Múltiples)
                </label>
                
                <div className="grid grid-cols-2 gap-2 mb-4 max-h-96 overflow-y-auto p-2 border rounded-lg">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => setAsPortada(index)}
                          className="p-1 bg-amber-500 text-white rounded-full hover:bg-amber-600"
                          title="Establecer como portada"
                        >
                          <Star className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImageUp(index)}
                          className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                          title="Mover arriba"
                          disabled={index === 0}
                        >
                          <MoveUp className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImageDown(index)}
                          className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                          title="Mover abajo"
                          disabled={index === imagePreviews.length - 1}
                        >
                          <MoveDown className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          title="Eliminar imagen"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      {index === 0 && (
                        <span className="absolute top-1 left-1 px-1 py-0.5 bg-amber-500 text-white text-xs rounded-full">
                          Portada
                        </span>
                      )}
                    </div>
                  ))}
                  
                  {imagePreviews.length === 0 && (
                    <div className="col-span-2 p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">No hay imágenes seleccionadas</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block w-full cursor-pointer">
                    <div className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      {uploading ? (
                        <Loader className="h-5 w-5 animate-spin" />
                      ) : (
                        <PlusCircle className="h-5 w-5" />
                      )}
                      <span>{uploading ? 'Subiendo...' : 'Agregar imágenes'}</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageFileChange}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    * Puedes seleccionar múltiples imágenes. La primera será la portada.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Orden de aparición
                </label>
                <input
                  type="number"
                  name="orden"
                  value={formData.orden}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="1"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="activo"
                    checked={formData.activo}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="text-gray-700">Destino activo</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="destacado"
                    checked={formData.destacado}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="text-gray-700">Destacado</span>
                </label>
              </div>
            </div>
          </div>

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
              disabled={saving || uploading}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {(saving || uploading) ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <Save className="h-5 w-5" />
              )}
              {saving || uploading ? 'Guardando...' : (editingId ? 'Actualizar' : 'Agregar')}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Destinos Creados</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinos.map((destino) => (
            <div
              key={destino.id}
              className={`border rounded-xl overflow-hidden hover:shadow-lg transition-shadow ${
                !destino.activo ? 'opacity-60' : ''
              }`}
            >
              <div className="relative h-48">
                <img
                  src={destino.imagenes?.[0] || destino.imagen || 'https://via.placeholder.com/400x200?text=Sin+Imagen'}
                  alt={destino.nombre}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x200?text=Error+Imagen';
                  }}
                />
                {destino.destacado && (
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
                      ⭐ Destacado
                    </span>
                  </div>
                )}
                {destino.imagenes?.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    +{destino.imagenes.length - 1} fotos
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{destino.nombre}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{destino.descripcion}</p>
                
                <div className="space-y-1 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Precio:</span>
                    <span className="font-semibold">${destino.precioMin} - ${destino.precioMax}</span>
                  </div>
                  {destino.precioOfertaMin > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="text-gray-600">Oferta:</span>
                      <span className="font-semibold">${destino.precioOfertaMin} - ${destino.precioOfertaMax}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-3 border-t">
                  <div className="text-xs text-gray-500">
                    Orden: {destino.orden}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(destino)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleToggleActivo(destino)} className={`p-2 rounded-lg ${
                      destino.activo ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'
                    }`}>
                      {destino.activo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button onClick={() => handleDelete(destino.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDestinos;