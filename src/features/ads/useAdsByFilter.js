import { useQuery } from "@tanstack/react-query";
import { getAdsByFilter } from "../../services/apiAds";
import { useSearchParams } from "react-router-dom";

function useAdsByFilter() {
  const [searchParams] = useSearchParams();

  const ad_type = searchParams.get("ad_type") || "";

  const { isLoading, data, error } = useQuery({
    queryKey: ["adsByFilter", ad_type],
    queryFn: () => getAdsByFilter(ad_type),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useAdsByFilter;
