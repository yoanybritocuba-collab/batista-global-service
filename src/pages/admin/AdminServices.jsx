// src/pages/admin/AdminServices.jsx
import React, { useState, useEffect } from 'react';
import AdminServicesManager from '../../components/Admin/AdminServicesManager';
import { useServices } from '../../contexts/services/ServicesContext';
import { toast } from 'react-hot-toast';

const AdminServices = () => {
  const { services, loading, loadServices } = useServices();

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Gestión de Servicios</h1>
        <p className="text-gray-600">
          Administra todos los servicios turísticos que se muestran en la página
        </p>
      </div>
      
      <AdminServicesManager />
    </div>
  );
};

export default AdminServices;