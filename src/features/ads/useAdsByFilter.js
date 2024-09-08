import { useQuery } from "@tanstack/react-query";
import { getAdsByFilter } from "../../services/apiAds";

function useAdsByFilter(sub_category_id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["adsByFilter", sub_category_id],
    queryFn: () => getAdsByFilter(sub_category_id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useAdsByFilter;

