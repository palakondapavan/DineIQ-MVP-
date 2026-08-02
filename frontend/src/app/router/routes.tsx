import type { RouteObject } from "react-router-dom";

import LoginPage from "@/features/auth/pages/LoginPage";

import CustomerEntryPage from "@/features/customer-session/pages/CustomerEntryPage";
import CustomerMenuPage from "@/features/customer-session/pages/CustomerMenuPage";
import PendingPage from "@/features/customer-session/pages/PendingPage";
import ResumeSessionPage from "@/features/customer-session/pages/ResumeSessionPage";
import SessionBootstrapPage from "@/features/customer-session/pages/SessionBootstrapPage";
import CustomerLayout from "@/features/customer-session/layouts/CustomerLayout";

import WelcomePage from "@/pages/WelcomePage";
import NotFoundPage from "@/pages/NotFoundPage";


import CustomerOrdersPage from "@/features/orders/pages/CustomerOrdersPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/welcome",
    element: <WelcomePage />,
  },

  /**
   * Customer QR Bootstrap
   */
  {
    path: "/table/:tableId",
    element: <SessionBootstrapPage />,
  },

  /**
   * Customer Entry
   */
  {
    path: "/table/:tableId/request",
    element: <CustomerEntryPage />,
  },

  /**
   * Customer Module
   */
  {
    element: <CustomerLayout />,
    children: [
      {
        path: "/customer/menu/:requestId",
        element: <CustomerMenuPage />,
      },
      {
        path: "/customer/orders",
        element: <CustomerOrdersPage />,
      },
    ],
  },

  /**
   * Resume Existing Session
   */
  {
    path: "/table/:tableId/resume",
    element: <ResumeSessionPage />,
  },

  /**
   * Another customer already has a pending request
   */
  {
    path: "/table/:tableId/pending",
    element: <PendingPage />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },


];