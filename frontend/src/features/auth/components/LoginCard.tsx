import type { ReactNode } from "react";

type LoginCardProps = {
  children: ReactNode;
};

export function LoginCard({ children }: LoginCardProps) {
  return (
    <div
      className="
        w-full
        max-w-md
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-xl
      "
    >
      {children}
    </div>
  );
}