import {
  BarChart3,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

import AuthLayout from "@/shared/components/layout/AuthLayout";
import Logo from "@/shared/components/ui/Logo";

import LoginFooter from "../components/LoginFooter";
import LoginForm from "../components/LoginForm";

const features = [
  {
    icon: ClipboardList,
    title: "Smart Order Management",
    description:
      "Track orders from placement to delivery with real-time updates.",
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    description:
      "Monitor restaurant performance with detailed insights and reports.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Staff Access",
    description:
      "Protect your restaurant with role-based authentication and permissions.",
  },
];

export default function LoginPage() {
  return (
    <AuthLayout
      badge="Restaurant Operating System"
      heading="Run your restaurant smarter."
      description="Manage tables, orders, kitchen operations and staff from one unified platform."
      features={features}
      cardClassName="max-w-md"
    >
      <div className="space-y-8">
        <div className="flex justify-center">
          <Logo
            size="md"
            showSubtitle={false}
          />
        </div>

        <LoginForm />

        <LoginFooter appVersion="v1.0.0" />
      </div>
    </AuthLayout>
  );
}