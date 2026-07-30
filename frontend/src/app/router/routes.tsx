import type { RouteObject } from "react-router-dom";

import LoginPage from "@/features/auth/pages/LoginPage";
import WelcomePage from "@/pages/WelcomePage";
import NotFoundPage from "@/pages/NotFoundPage";

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
    path: "*",
    element: <NotFoundPage />,
  },
];