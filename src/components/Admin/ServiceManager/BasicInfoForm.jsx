import React from 'react';

const BasicInfoForm = ({ title, subtitle, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Información Básica</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Título del Servicio *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => onChange('title', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Ej: Paquetería Express Internacional"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Nombre principal que verán los clientes</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => onChange('subtitle', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Ej: Envíos rápidos y seguros a todo el mundo"
          />
          <p className="text-xs text-gray-500 mt-1">Breve descripción que acompaña al título</p>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
