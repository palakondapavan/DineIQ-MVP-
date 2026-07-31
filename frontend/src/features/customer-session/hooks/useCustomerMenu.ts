import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { customerMenuService } from "../services/customerMenu.service";

export function useCustomerMenu() {
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const query = useQuery({
    queryKey: ["customer-menu"],

    queryFn: customerMenuService.getMenu,
  });

  const categories = useMemo(() => {
    if (!query.data) return ["All"];

    return [
      "All",
      ...query.data.categories.map(
        (category) => category.category_name
      ),
    ];
  }, [query.data]);

  const menuItems = useMemo(() => {
    if (!query.data) return [];

    return query.data.categories
      .filter((category) =>
        selectedCategory === "All"
          ? true
          : category.category_name ===
            selectedCategory
      )
      .flatMap((category) => category.items)
      .filter((item) =>
        item.item_name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
  }, [
    query.data,
    selectedCategory,
    search,
  ]);

  return {
    categories,

    menuItems,

    search,

    setSearch,

    selectedCategory,

    setSelectedCategory,

    isLoading: query.isLoading,

    isError: query.isError,
  };
}