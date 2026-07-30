import { Link } from "react-router-dom";

interface LoginFooterProps {
  appVersion?: string;
}

export default function LoginFooter({
  appVersion = "v1.0.0",
}: LoginFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-8 border-t border-slate-200 pt-6">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm">
          <Link
            to="/forgot-password"
            className="font-medium text-slate-600 transition-colors hover:text-indigo-600"
          >
            Forgot Password?
          </Link>

          <span className="text-slate-300">•</span>

          <Link
            to="/help"
            className="font-medium text-slate-600 transition-colors hover:text-indigo-600"
          >
            Help Center
          </Link>

          <span className="text-slate-300">•</span>

          <Link
            to="/privacy"
            className="font-medium text-slate-600 transition-colors hover:text-indigo-600"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Version */}
        <p className="text-xs text-slate-400">
          DineIQ {appVersion}
        </p>

        {/* Copyright */}
        <p className="text-xs text-slate-400">
          © {currentYear} DineIQ. All rights reserved.
        </p>
      </div>
    </div>
  );
}