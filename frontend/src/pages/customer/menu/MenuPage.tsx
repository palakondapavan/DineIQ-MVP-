import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { useCustomerMenu } from "@/hooks/useCustomerMenu";

import MenuCard from "@/components/customer/menu/MenuCard";
import FloatingCart from "@/components/customer/cart/FloatingCart";
import CartDrawer from "@/components/customer/cart/CartDrawer";
import TableStatusBanner from "@/components/customer/status/TableStatusBanner";



import { toast } from "sonner";
import { useTableRequestStatus } from "@/hooks/useTableRequest";


export default function MenuPage() {
  const { tableId } = useParams();

  const { data, isLoading, isError } = useCustomerMenu();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const storedRequest = localStorage.getItem("tableRequest");

  const requestId = storedRequest
    ? JSON.parse(storedRequest).request_id
    : undefined;

  const { data: tableRequest } = useTableRequestStatus(requestId);


  useEffect(() => {
    if (!tableRequest) return;

    if (
      tableRequest.status === "ACCEPTED" &&
      !localStorage.getItem(`toast-${tableRequest.request_id}`)
    ) {
      toast.success(
        "🎉 Your table has been activated. You can now place your order."
      );

      localStorage.setItem(
        `toast-${tableRequest.request_id}`,
        "shown"
      );
    }
  }, [tableRequest]);


  const filteredCategories = useMemo(() => {
    if (!data) return [];

    return data.categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          const query = search.toLowerCase();

          return (
            item.item_name.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query)
          );
        }),
      }))
      .filter((category) => {
        const matchesCategory =
          selectedCategory === null ||
          category.category_id === selectedCategory;

        return matchesCategory && category.items.length > 0;
      });
  }, [data, search, selectedCategory]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-lg font-semibold">
          Loading menu...
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Failed to load menu
          </h2>

          <p className="mt-2 text-slate-500">
            Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50">

        {/* Header */}

        <div className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">

          <div className="mx-auto max-w-7xl px-5 py-5">

            <h1 className="text-3xl font-bold">
              DineIQ
            </h1>

            <p className="mt-1 text-slate-500">
              Table #{tableId}
            </p>

            {/* Search */}

            <div className="relative mt-5">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search dishes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border bg-slate-100 py-3 pl-11 pr-4 outline-none transition focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Categories */}

            <div className="mt-5 flex gap-3 overflow-x-auto pb-2">

              <button
                onClick={() => setSelectedCategory(null)}
                className={`whitespace-nowrap rounded-full px-5 py-2 transition ${
                  selectedCategory === null
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 hover:bg-slate-300"
                }`}
              >
                All
              </button>

              {data.categories.map((category) => (

                <button
                  key={category.category_id}
                  onClick={() =>
                    setSelectedCategory(category.category_id)
                  }
                  className={`whitespace-nowrap rounded-full px-5 py-2 transition ${
                    selectedCategory === category.category_id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 hover:bg-slate-300"
                  }`}
                >
                  {category.category_name}
                </button>

              ))}

            </div>

          </div>

        </div>

        {/* Main Content */}

        <div className="mx-auto max-w-7xl px-5 py-8">

          {/* Table Activation Status */}

          {tableRequest?.status === "PENDING" && (
            <TableStatusBanner status="PENDING" />
          )}

          {tableRequest?.status === "REJECTED" && (
            <TableStatusBanner status="REJECTED" />
          )}

          {/* Menu */}

          {filteredCategories.length === 0 ? (

            <div className="py-20 text-center">

              <h2 className="text-2xl font-semibold">
                No dishes found
              </h2>

              <p className="mt-2 text-slate-500">
                Try searching with another keyword.
              </p>

            </div>

          ) : (

            filteredCategories.map((category) => (

              <section
                key={category.category_id}
                className="mb-12"
              >

                <h2 className="mb-6 text-2xl font-bold">
                  {category.category_name}
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                  {category.items.map((item) => (

                    <motion.div
                      key={item.item_id}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <MenuCard item={item} />
                    </motion.div>

                  ))}

                </div>

              </section>

            ))

          )}

        </div>

      </div>

      {/* Floating Cart */}

      <FloatingCart
        onOpen={() => setCartOpen(true)}
      />

      {/* Cart Drawer */}

      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        tableId={Number(tableId)}
        canPlaceOrder={
          tableRequest?.status === "ACCEPTED"
        }
      />

    </>
  );
}