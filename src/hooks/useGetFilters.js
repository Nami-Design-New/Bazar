import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getFilters } from "../services/apiFilters";

function useGetFilters() {
  const [searchParams] = useSearchParams();

  const sub_category_id = searchParams?.get("sub_category_id")
    ? Number(searchParams.get("sub_category_id"))
    : null;

  const { isLoading, data, error } = useQuery({
    queryKey: ["userAds", sub_category_id],
    queryFn: () => getFilters(sub_category_id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!sub_category_id,
  });

  return { isLoading, data, error };
}

export default useGetFilters;
