import {
  UtensilsCrossed,
  Package,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function CustomerBottomNavigation() {
  const linkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `
      flex
      flex-1
      flex-col
      items-center
      justify-center
      gap-1
      py-3
      text-xs
      font-medium
      transition
      ${
        isActive
          ? "text-indigo-600"
          : "text-slate-500"
      }
    `;

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-40
        border-t
        bg-white
        shadow-lg
      "
    >
      <div className="mx-auto flex max-w-4xl">
        <NavLink
          to="/customer/menu"
          className={linkClass}
        >
          <UtensilsCrossed size={22} />
          Menu
        </NavLink>

        <NavLink
          to="/customer/orders"
          className={linkClass}
        >
          <Package size={22} />
          Orders
        </NavLink>

        <NavLink
          to="/customer/profile"
          className={linkClass}
        >
          <User size={22} />
          Profile
        </NavLink>
      </div>
    </nav>
  );
}