import { useQuery } from "@tanstack/react-query";
import { getMarketsByFilter } from "../../services/apiMarkets";
import { useSearchParams } from "react-router-dom";

function useMarketsByFilter() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || null;
  const type = Number(searchParams.get("type")) || "";
  const city_id = Number(searchParams.get("city_id")) || "";
  const area_id = Number(searchParams.get("area_id")) || "";
  const category_id = searchParams.get("category_id")
    ? searchParams
        .get("category_id")
        .split("-")
        .map((category) => Number(category))
    : [];
  const sub_category_id = searchParams.get("sub_category_id")
    ? searchParams
        .get("sub_category_id")
        .split("-")
        .map((category) => Number(category))
    : [];

  const { isLoading, data, error } = useQuery({
    queryKey: ["marketsByFilter", search, page, type, city_id, area_id, category_id, sub_category_id],
    queryFn: () => getMarketsByFilter(search, page, type, city_id, area_id, category_id, sub_category_id ),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useMarketsByFilter;
