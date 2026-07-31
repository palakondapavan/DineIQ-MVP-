import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import AppCard from "@/shared/components/ui/AppCard";
import AppButton from "@/shared/components/ui/AppButton";

interface SessionStatusCardProps {
  title: string;
  description: string;

  icon: LucideIcon;

  iconColor?: string;
  iconBackground?: string;

  children?: ReactNode;

  actionLabel?: string;
  onAction?: () => void;
}

export default function SessionStatusCard({
  title,
  description,

  icon: Icon,

  iconColor = "text-indigo-600",
  iconBackground = "bg-indigo-100",

  children,

  actionLabel,
  onAction,
}: SessionStatusCardProps) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-4">
      <AppCard
        hover={false}
        className="w-full text-center"
      >
        <div className="flex flex-col items-center">
          <div
            className={`
              mb-6
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              ${iconBackground}
            `}
          >
            <Icon
              size={44}
              className={iconColor}
            />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            {title}
          </h1>

          <p className="mt-4 max-w-md leading-7 text-slate-500">
            {description}
          </p>

          {children && (
            <div className="mt-8 w-full">
              {children}
            </div>
          )}

          {actionLabel && onAction && (
            <div className="mt-8 w-full">
              <AppButton
                onClick={onAction}
              >
                {actionLabel}
              </AppButton>
            </div>
          )}
        </div>
      </AppCard>
    </div>
  );
}