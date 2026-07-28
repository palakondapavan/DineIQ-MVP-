import { Bell, ShoppingCart, Star } from "lucide-react";

interface MenuHeaderProps {
  restaurantName: string;
  rating?: number;
  isOpen?: boolean;
  cartCount?: number;
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function MenuHeader({
  restaurantName,
  rating = 4.8,
  isOpen = true,
  cartCount = 0,
}: MenuHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
      <div className="mx-auto max-w-md px-5 py-4">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">
              👋 {getGreeting()}
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
              {restaurantName}
            </h1>

            <div className="mt-2 flex items-center gap-3">

              <div className="flex items-center gap-1">

                <Star
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="text-sm font-medium">
                  {rating}
                </span>

              </div>

              <div className="h-1 w-1 rounded-full bg-gray-300" />

              <div className="flex items-center gap-2">

                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    isOpen
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />

                <span className="text-sm font-medium">
                  {isOpen ? "Open Now" : "Closed"}
                </span>

              </div>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <button className="rounded-full bg-gray-100 p-3 transition hover:bg-gray-200">
              <Bell size={20} />
            </button>

            <button className="relative rounded-full bg-orange-500 p-3 text-white shadow-lg transition hover:bg-orange-600">

              <ShoppingCart size={20} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}

            </button>

          </div>

        </div>

      </div>
    </header>
  );
}