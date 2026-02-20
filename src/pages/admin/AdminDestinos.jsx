import React, { useState, useEffect } from 'react';
import { useDestinos } from '../../contexts/DestinosContext';
import { 
  Plus, Edit, Trash2, Upload, X, Search,
  MapPin, DollarSign, Save,
  Eye, EyeOff, Image as ImageIcon, Loader
} from 'lucide-react';
import { uploadImage } from '../../services/firebase/storage';
import { toast } from 'react-hot-toast';

const AdminDestinos = () => {
  const { destinos, loading, loadDestinos, addDestino, updateDestino, deleteDestino } = useDestinos();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    imagen: '',
    precioMin: '',
    precioMax: '',
    precioOfertaMin: '',
    precioOfertaMax: '',
    descripcion: '',
    activo: true,
    destacado: false,
    orden: 0
  });
  
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    loadDestinos();
  }, []);

  useEffect(() => {
    if (editingId && formData.imagen) {
      setImagePreview(formData.imagen);
    }
  }, [editingId, formData.imagen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona una imagen válida');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen no debe superar los 5MB');
      return;
    }

    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    
    toast.success('✅ Imagen seleccionada. Guarda el destino para subirla.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre.trim()) {
      toast.error('El nombre del destino es obligatorio');
      return;
    }

    setSaving(true);
    setUploading(true);

    try {
      let imageUrl = formData.imagen;

      if (selectedFile) {
        toast.loading('Subiendo imagen...', { id: 'upload' });
        const result = await uploadImage(selectedFile, 'destinos');
        toast.dismiss('upload');
        
        if (result.success) {
          imageUrl = result.url;
          toast.success('✅ Imagen subida correctamente');
        } else {
          toast.error('Error al subir la imagen');
          setSaving(false);
          setUploading(false);
          return;
        }
      }

      const destinoData = {
        ...formData,
        imagen: imageUrl,
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
      imagen: destino.imagen || '',
      precioMin: destino.precioMin || '',
      precioMax: destino.precioMax || '',
      precioOfertaMin: destino.precioOfertaMin || '',
      precioOfertaMax: destino.precioOfertaMax || '',
      descripcion: destino.descripcion || '',
      activo: destino.activo !== false,
      destacado: destino.destacado || false,
      orden: destino.orden || 0
    });
    setImagePreview(destino.imagen || '');
    setSelectedFile(null);
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
      imagen: '',
      precioMin: '',
      precioMax: '',
      precioOfertaMin: '',
      precioOfertaMax: '',
      descripcion: '',
      activo: true,
      destacado: false,
      orden: 0
    });
    setImagePreview('');
    setSelectedFile(null);
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    setFormData(prev => ({ ...prev, imagen: '' }));
    setSelectedFile(null);
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
                  Imagen del Destino *
                </label>
                
                {imagePreview ? (
                  <div className="relative mb-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="mb-4 p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-center">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No hay imagen seleccionada</p>
                  </div>
                )}

                <div>
                  <label className="block w-full cursor-pointer">
                    <div className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      {uploading ? (
                        <Loader className="h-5 w-5 animate-spin" />
                      ) : (
                        <Upload className="h-5 w-5" />
                      )}
                      <span>{uploading ? 'Subiendo...' : 'Seleccionar imagen'}</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
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
                  src={destino.imagen || 'https://via.placeholder.com/400x200'}
                  alt={destino.nombre}
                  className="w-full h-full object-cover"
                />
                {destino.destacado && (
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
                      ⭐ Destacado
                    </span>
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