// src/components/Admin/AdminCategories.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Edit, Trash2, Tag } from "lucide-react";

const AdminCategories = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "📦"
  });

  const icons = ["📦", "👕", "👟", "🎒", "🛍️", "📱", "💻", "🛋️", "🍽️", "🎨"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Guardar categoría:", formData);
    setShowForm(false);
    setFormData({ name: "", slug: "", description: "", icon: "📦" });
  };

  // Datos de ejemplo
  const categories = [
    { id: 1, name: "Electrónica", slug: "electronics", productCount: 12, icon: "📱" },
    { id: 2, name: "Ropa", slug: "clothing", productCount: 8, icon: "👕" },
    { id: 3, name: "Accesorios", slug: "accessories", productCount: 15, icon: "🎒" },
    { id: 4, name: "Hogar", slug: "home", productCount: 6, icon: "🛋️" },
    { id: 5, name: "Souvenirs", slug: "souvenirs", productCount: 20, icon: "🛍️" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{t("admin.categories.title")}</h3>
          <p className="text-gray-600">{t("admin.categories.subtitle")}</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          {t("admin.categories.add")}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl border space-y-4">
          <h4 className="font-semibold">{t("admin.categories.newCategory")}</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("admin.categories.name")} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("admin.categories.slug")} *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-")})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("admin.categories.description")}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t("admin.categories.icon")}
              </label>
              <div className="flex flex-wrap gap-2">
                {icons.map((icon, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setFormData({...formData, icon})}
                    className={`text-2xl p-2 rounded-lg ${formData.icon === icon ? "bg-blue-100 border-2 border-blue-500" : "bg-gray-100"}`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {t("admin.categories.save")}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {t("admin.categories.cancel")}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white border rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{category.icon}</div>
                <div>
                  <h4 className="font-semibold">{category.name}</h4>
                  <p className="text-sm text-gray-500">{category.slug}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1 text-blue-600 hover:text-blue-800">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-1 text-red-600 hover:text-red-800">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              {category.description || t("admin.categories.noDescription")}
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                {category.productCount} {t("admin.categories.products")}
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {t("admin.categories.active")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border">
          <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="font-semibold mb-2">{t("admin.categories.noCategories")}</h4>
          <p className="text-gray-600 mb-4">{t("admin.categories.noCategoriesDesc")}</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {t("admin.categories.createFirst")}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
