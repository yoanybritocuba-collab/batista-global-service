import React from 'react';
import { 
  Globe, FileText, CheckCircle, Clock, 
  DollarSign, AlertCircle, Briefcase, 
  Camera, Fingerprint, Plane, Phone,
  Mail, Calendar, TrendingUp, Shield
} from 'lucide-react';

const VisasDetail = ({ data, service }) => {
  // Asegurarnos de que data existe
  const visaData = {
    paises: data?.paises || [],
    tiposVisa: data?.tiposVisa || [],
    requisitos: data?.requisitos || [],
    documentos: data?.documentos || [],
    tiempos: data?.tiempos || {
      minimo: '5 días',
      promedio: '15 días',
      maximo: '30 días'
    },
    rangosPrecios: {
      minima: data?.rangosPrecios?.minima || 120,
      promedio: data?.rangosPrecios?.promedio || 185,
      maxima: data?.rangosPrecios?.maxima || 350
    },
    procesos: data?.procesos || [
      'Completar formulario en línea',
      'Pagar arancel consular',
      'Agendar cita',
      'Entrevista personal',
      'Esperar aprobación'
    ],
    advertencias: data?.advertencias || [
      'Los tiempos pueden variar según la temporada',
      'No se garantiza la aprobación de la visa',
      'Recomendamos iniciar con 2 meses de anticipación'
    ]
  };

  return (
    <div className="space-y-8">
      {/* Header con rango de precios */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-2">{service?.title || 'Trámites de Visas'}</h2>
            <p className="text-indigo-100 text-lg">{service?.subtitle || 'Asesoría profesional'}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 text-center">
            <p className="text-sm opacity-90">Desde</p>
            <p className="text-3xl font-bold">${visaData.rangosPrecios.minima}</p>
            <p className="text-sm opacity-90">Hasta ${visaData.rangosPrecios.maxima}</p>
          </div>
        </div>
      </div>

      {/* Rango de precios visual */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-indigo-600" />
          Rangos de precios por tipo de visa
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-xl p-5 text-center">
            <h4 className="font-bold text-lg mb-2">Turista</h4>
            <p className="text-3xl font-bold text-green-600 mb-2">${visaData.rangosPrecios.minima}</p>
            <p className="text-sm text-gray-600">Estadía corta</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-5 text-center">
            <h4 className="font-bold text-lg mb-2">Negocios</h4>
            <p className="text-3xl font-bold text-amber-600 mb-2">${visaData.rangosPrecios.promedio}</p>
            <p className="text-sm text-gray-600">Múltiples entradas</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-5 text-center">
            <h4 className="font-bold text-lg mb-2">Residencia</h4>
            <p className="text-3xl font-bold text-purple-600 mb-2">${visaData.rangosPrecios.maxima}</p>
            <p className="text-sm text-gray-600">Largo plazo</p>
          </div>
        </div>
      </div>

      {/* Países con trámite disponible */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Globe className="h-6 w-6 text-indigo-600" />
          Países con trámite disponible
        </h3>
        
        {visaData.paises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visaData.paises.map((pais, idx) => {
              // Determinar si el país es un string simple o un objeto
              const nombrePais = typeof pais === 'string' ? pais : pais.nombre || 'País';
              const precioPais = typeof pais === 'object' && pais.precio ? pais.precio : 130;
              const tipoPais = typeof pais === 'object' && pais.tipo ? pais.tipo : 'Turista';
              
              return (
                <div key={idx} className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-5 border border-indigo-100 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-gray-800 mb-3">{nombrePais}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Precio:</span>
                      <span className="text-2xl font-bold text-green-600">${precioPais}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tipo:</span>
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                        {tipoPais}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tiempo:</span>
                      <span className="text-gray-800">15-20 días</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay países configurados</p>
          </div>
        )}
      </div>

      {/* Tiempos de procesamiento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <Clock className="h-8 w-8 text-green-500 mb-3" />
          <h4 className="font-bold text-gray-800">Mínimo</h4>
          <p className="text-2xl font-bold text-gray-900">{visaData.tiempos.minimo}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <Calendar className="h-8 w-8 text-amber-500 mb-3" />
          <h4 className="font-bold text-gray-800">Promedio</h4>
          <p className="text-2xl font-bold text-gray-900">{visaData.tiempos.promedio}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <AlertCircle className="h-8 w-8 text-red-500 mb-3" />
          <h4 className="font-bold text-gray-800">Máximo</h4>
          <p className="text-2xl font-bold text-gray-900">{visaData.tiempos.maximo}</p>
        </div>
      </div>

      {/* Requisitos */}
      {visaData.requisitos.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Requisitos generales
          </h3>
          <ul className="space-y-3">
            {visaData.requisitos.map((req, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Proceso */}
      {visaData.procesos.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-amber-600" />
            Proceso de solicitud
          </h3>
          <div className="space-y-4">
            {visaData.procesos.map((paso, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-800">{paso}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Advertencias */}
      {visaData.advertencias.length > 0 && (
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
          <h3 className="text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Información importante
          </h3>
          <ul className="space-y-2">
            {visaData.advertencias.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-2 text-amber-700">
                <span className="text-lg font-bold">•</span>
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VisasDetail;