// src/components/Admin/AdminStats.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const AdminStats = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: t("admin.stats.totalProducts"), value: "24", color: "blue" },
          { label: t("admin.stats.totalSales"), value: "$4,820", color: "green" },
          { label: t("admin.stats.totalUsers"), value: "1,254", color: "purple" },
          { label: t("admin.stats.totalOrders"), value: "324", color: "orange" },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border">
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-6 rounded-xl border">
        <h3 className="font-semibold text-lg mb-4">{t("admin.stats.salesByMonth")}</h3>
        <p className="text-gray-600">{t("admin.stats.last7Days")}</p>
      </div>
    </div>
  );
};

export default AdminStats;
