import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex h-12 items-center rounded-xl border bg-white px-4">

      <Search
        size={18}
        className="mr-3 text-slate-400"
      />

      <input
        placeholder="Search menu..."
        className="w-full outline-none"
      />

    </div>
  );
}