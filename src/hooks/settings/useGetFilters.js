import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getFilters } from "../../services/apiFilters";

function useGetFilters(id) {
  const [searchParams] = useSearchParams();

  const sub_category_id = searchParams?.get("sub_category_id")
    ? Number(searchParams.get("sub_category_id"))
    : null;

  const { isLoading, data, error } = useQuery({
    queryKey: ["userAds", sub_category_id, id],
    queryFn: () => getFilters(id || sub_category_id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!sub_category_id || !!id,
  });

  return { isLoading, data, error };
}

export default useGetFilters;
