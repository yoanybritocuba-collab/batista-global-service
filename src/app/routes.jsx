import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const Home = lazy(() => import("../pages/public/Home"));
const Tienda = lazy(() => import("../pages/public/Tienda"));
const Servicios = lazy(() => import("../pages/public/Servicios"));
const Cart = lazy(() => import("../pages/public/Cart"));
const AdminPro = lazy(() => import("../pages/admin/AdminPro"));
const UserLogin = lazy(() => import("../pages/public/UserLogin"));

export const AppRoutes = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tienda" element={<Tienda />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/admin" element={<AdminPro />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="*" element={<div>404 - Página no encontrada</div>} />
    </Routes>
  </Suspense>
);