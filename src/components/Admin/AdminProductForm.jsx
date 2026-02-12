// src/components/Admin/AdminProductForm.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Image as ImageIcon, X } from "lucide-react";

const AdminProductForm = ({ product = null, onSuccess = () => {} }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    originalPrice: product?.originalPrice || "",
    category: product?.category || "electronics",
    stock: product?.stock || 10,
    discount: product?.discount || 0,
    isNew: product?.isNew || false,
    isFeatured: product?.isFeatured || false,
    image: product?.image || "",
  });
  
  const [imagePreview, setImagePreview] = useState(product?.image || "");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      console.log("Guardar producto:", formData);
      setSuccess(product ? t("admin.products.updated") : t("admin.products.created"));
      onSuccess();
      
    } catch (err) {
      setError(err.message || t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: "electronics", label: t("admin.categories.electronics") },
    { value: "clothing", label: t("admin.categories.clothing") },
    { value: "accessories", label: t("admin.categories.accessories") },
    { value: "souvenirs", label: t("admin.categories.souvenirs") },
    { value: "home", label: t("admin.categories.home") },
    { value: "other", label: t("admin.categories.other") },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {product ? t("admin.products.edit") : t("admin.products.create")}
        </h3>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-lg">
          {success}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("admin.products.name")} *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={t("admin.products.namePlaceholder")}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("admin.products.description")}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={t("admin.products.descriptionPlaceholder")}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("admin.products.category")} *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("admin.products.stock")} *
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("admin.products.price")} *
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("admin.products.originalPrice")}
              </label>
              <input
                type="number"
                step="0.01"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("admin.products.discount")} (%)
            </label>
            <input
              type="range"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              min="0"
              max="90"
              step="5"
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>0%</span>
              <span className="font-semibold">{formData.discount}%</span>
              <span>90%</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("admin.products.image")}
            </label>
            <div className="space-y-3">
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("");
                      setFormData(prev => ({ ...prev, image: "" }));
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 mb-3">
                    {t("admin.products.imageUpload")}
                  </p>
                  <label className="cursor-pointer">
                    <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      {t("admin.products.selectImage")}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isNew"
            checked={formData.isNew}
            onChange={handleInputChange}
            className="rounded"
          />
          <span>{t("admin.products.isNew")}</span>
        </label>
        
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleInputChange}
            className="rounded"
          />
          <span>{t("admin.products.isFeatured")}</span>
        </label>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              {t("common.loading")}
            </>
          ) : (
            <>
              <Plus className="h-5 w-5" />
              {product ? t("admin.products.update") : t("admin.products.create")}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;
