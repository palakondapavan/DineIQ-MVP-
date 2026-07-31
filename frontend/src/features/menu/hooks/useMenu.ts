import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { menuService } from "../services/menu.service";
import type { Category, MenuItem } from "../types";

const MENU_QUERY_KEY = ["menu"] as const;

export const useMenu = () => {
  const [search, setSearch] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | null
  >(null);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: MENU_QUERY_KEY,
    queryFn: menuService.getMenu,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const categories: Category[] = data?.categories ?? [];

  const items: MenuItem[] = data?.items ?? [];

  const filteredItems = useMemo(() => {
    let filtered = items;

    // Filter by category
    if (selectedCategoryId !== null) {
      filtered = filtered.filter(
        (item) => item.category_id === selectedCategoryId
      );
    }

    // Filter by search
    if (search.trim()) {
      const keyword = search.toLowerCase();

      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          item.description?.toLowerCase().includes(keyword)
      );
    }

    return filtered;
  }, [items, selectedCategoryId, search]);

  return {
    categories,

    items: filteredItems,

    offers: data?.offers ?? [],

    search,

    setSearch,

    selectedCategoryId,

    setSelectedCategoryId,

    isLoading,

    isFetching,

    isError,

    error,

    refetch,
  };
};