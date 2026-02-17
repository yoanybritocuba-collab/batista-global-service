import React from 'react';
import { Globe, FileText, CheckCircle } from 'lucide-react';

const VisasDetail = ({ data, service }) => {
  const visasData = data || {
    paises: [],
    requisitosGenerales: []
  };

  return (
    <div className="space-y-6">
      {visasData.paises?.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-amber-600" />
            Trámites de Visas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visasData.paises.map((pais, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-lg mb-2">{pais.nombre}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Precio:</span>
                    <span className="font-bold text-green-600"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisasDetail;
