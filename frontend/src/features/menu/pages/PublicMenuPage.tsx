import MenuGrid from "../components/MenuGrid";
import MenuHeader from "../components/MenuHeader";
import MenuSearch from "../components/MenuSearch";
import CategoryTabs from "../components/CategoryTabs";
import OfferCarousel from "../components/OfferCarousel";

import { useMenu } from "../hooks/useMenu";

export default function PublicMenuPage() {
  const {
    categories,
    items,
    offers,

    search,
    setSearch,

    selectedCategoryId,
    setSelectedCategoryId,

    isLoading,
  } = useMenu();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <MenuHeader
          restaurantName="DineIQ Restaurant"
          restaurantAddress="Hyderabad"
          isOpen
          rating={4.8}
        />

        <OfferCarousel
          offers={offers}
        />

        <MenuSearch
          value={search}
          onChange={setSearch}
        />

        <CategoryTabs
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={setSelectedCategoryId}
        />

        <MenuGrid
          items={items}
          isLoading={isLoading}
        />

      </div>
    </main>
  );
}