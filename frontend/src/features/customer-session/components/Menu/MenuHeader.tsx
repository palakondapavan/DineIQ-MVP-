import { UtensilsCrossed } from "lucide-react";

interface MenuHeaderProps {
  customerName: string;
  tableId: number;
}

export default function MenuHeader({
  customerName,
  tableId,
}: MenuHeaderProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-indigo-100">
            Welcome
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            {customerName}
          </h1>

          <p className="mt-3 text-indigo-100">
            Table #{tableId}
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
          <UtensilsCrossed size={30} />
        </div>
      </div>
    </div>
  );
}