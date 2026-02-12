// src/components/Admin/AdminOrders.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const AdminOrders = ({ compact = false }) => {
  const { t } = useTranslation();

  const orders = [
    { id: "ORD-001", customer: "Juan Pérez", total: 89.99, status: "completed", date: "2024-01-15" },
    { id: "ORD-002", customer: "María García", total: 129.99, status: "processing", date: "2024-01-14" },
    { id: "ORD-003", customer: "Carlos López", total: 45.50, status: "pending", date: "2024-01-13" },
  ];

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("admin.orders.orderId")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("admin.orders.customer")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("admin.orders.date")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("admin.orders.total")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("admin.orders.status")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 font-medium text-blue-600">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4 font-semibold">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    order.status === "completed" ? "bg-green-100 text-green-800" :
                    order.status === "processing" ? "bg-blue-100 text-blue-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {t(`admin.orders.${order.status}`)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
