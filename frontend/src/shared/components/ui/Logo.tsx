import { UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  clickable?: boolean;
  logoSrc?: string;
}

const sizes = {
  sm: {
    icon: "h-10 w-10",
    text: "text-xl",
    subtitle: "text-xs",
  },
  md: {
    icon: "h-14 w-14",
    text: "text-2xl",
    subtitle: "text-sm",
  },
  lg: {
    icon: "h-16 w-16",
    text: "text-3xl",
    subtitle: "text-base",
  },
};

export default function Logo({
  size = "md",
  showSubtitle = true,
  clickable = false,
  logoSrc,
}: LogoProps) {
  const content = (
    <div className="inline-flex items-center gap-4">
      <div
        className={`
          ${sizes[size].icon}
          flex
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-indigo-600
          via-blue-600
          to-cyan-500
          text-white
          shadow-lg
        `}
      >
        {logoSrc ? (
          <img
            src={logoSrc}
            alt="DineIQ Logo"
            className="h-full w-full rounded-2xl object-cover"
          />
        ) : (
          <UtensilsCrossed size={30} />
        )}
      </div>

      <div>
        <h1
          className={`
            ${sizes[size].text}
            font-extrabold
            tracking-tight
            text-slate-900
          `}
        >
          Dine
          <span className="text-indigo-600">IQ</span>
        </h1>

        {showSubtitle && (
          <p
            className={`
              ${sizes[size].subtitle}
              font-medium
              text-slate-500
            `}
          >
            Restaurant Operating System
          </p>
        )}
      </div>
    </div>
  );

  if (!clickable) {
    return content;
  }

  return (
    <Link
      to="/"
      className="inline-flex transition-opacity hover:opacity-90"
    >
      {content}
    </Link>
  );
}