import { useQuery } from "@tanstack/react-query";
import { getAdsByFilter } from "../../services/apiAds";
import { useSearchParams } from "react-router-dom";

function useAdsByFilter(requestData) {
  const [searchParams] = useSearchParams();
  const ad_type = searchParams.get("ad_type") || "";

  const search = searchParams.get("search") || "";
  const price_from = Number(searchParams.get("price_from")) || null;
  const price_to = Number(searchParams.get("price_to")) || null;
  const duration_from = Number(searchParams.get("duration_from")) || null;
  const duration_to = Number(searchParams.get("duration_to")) || null;
  const page = Number(searchParams.get("page")) || null;
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
        .map((subcategory) => Number(subcategory))
    : [];

  const { isLoading, data, error } = useQuery({
    queryKey: [
      "adsByFilter",
      search,
      price_from,
      price_to,
      duration_from,
      duration_to,
      page,
      city_id,
      area_id,
      category_id,
      sub_category_id,
      ad_type,
      requestData,
    ],
    queryFn: () =>
      getAdsByFilter(
        search,
        price_from,
        price_to,
        duration_from,
        duration_to,
        page,
        city_id,
        area_id,
        category_id,
        sub_category_id,
        ad_type,
        requestData
      ),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useAdsByFilter;
