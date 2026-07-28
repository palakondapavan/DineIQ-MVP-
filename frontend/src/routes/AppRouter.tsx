import { Navigate, Route, Routes } from "react-router-dom";

import WelcomePage from "@/pages/customer/welcome";
import MenuPage from "@/pages/customer/menu";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/table/1" replace />}
      />

      <Route
        path="/table/:tableId"
        element={<WelcomePage />}
      />

      <Route
        path="/menu/:tableId"
        element={<MenuPage />}
      />
    </Routes>
  );
}