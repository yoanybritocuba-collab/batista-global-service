import React from 'react';
import { Package, Ship, Car, Hotel, Plane, Briefcase } from 'lucide-react';

const types = [
  { id: 'shipping', name: 'Paquetería', icon: Package, color: 'green', desc: 'Envíos nacionales e internacionales' },
  { id: 'tours', name: 'Tours', icon: Ship, color: 'blue', desc: 'Excursiones y paquetes turísticos' },
  { id: 'rental', name: 'Renta de Autos', icon: Car, color: 'amber', desc: 'Vehículos de todo tipo' },
  { id: 'hotels', name: 'Hoteles', icon: Hotel, color: 'purple', desc: 'Alojamientos y resorts' },
  { id: 'flights', name: 'Vuelos', icon: Plane, color: 'sky', desc: 'Reservas de vuelos' },
  { id: 'visas', name: 'Visas', icon: Briefcase, color: 'emerald', desc: 'Trámites migratorios' }
];

const ServiceTypeSelector = ({ selected, onChange, disabled }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">Tipo de Servicio</label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {types.map(type => {
          const Icon = type.icon;
          const isSelected = selected === type.id;
          
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => !disabled && onChange(type.id)}
              disabled={disabled}
              className={`
                relative p-6 rounded-xl border-2 transition-all text-left
                ${isSelected ? `border-${type.color}-500 bg-${type.color}-50 shadow-lg` : 'border-gray-200 hover:border-gray-300 bg-white'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${isSelected ? `bg-${type.color}-500 text-white` : `bg-${type.color}-100 text-${type.color}-600`}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={`font-semibold ${isSelected ? `text-${type.color}-700` : 'text-gray-700'}`}>{type.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{type.desc}</p>
                </div>
              </div>
              {isSelected && <div className="absolute top-2 right-2"><span className="text-2xl">✓</span></div>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceTypeSelector;
