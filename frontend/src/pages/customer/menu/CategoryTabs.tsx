export default function CategoryTabs() {
  return (
    <div className="flex gap-3 overflow-x-auto">

      <button className="rounded-full bg-blue-600 px-5 py-2 text-white">
        All
      </button>

      <button className="rounded-full border px-5 py-2">
        Veg
      </button>

      <button className="rounded-full border px-5 py-2">
        Non Veg
      </button>

      <button className="rounded-full border px-5 py-2">
        Drinks
      </button>

    </div>
  );
}