import type { RouteObject } from "react-router-dom";

import LoginPage from "@/features/auth/pages/LoginPage";
import CustomerEntryPage from "@/features/customer/pages/CustomerEntryPage";
import NotFoundPage from "@/pages/NotFoundPage";
import WelcomePage from "@/pages/WelcomePage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/welcome",
    element: <WelcomePage />,
  },
  {
    path: "/table/:tableId",
    element: <CustomerEntryPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];