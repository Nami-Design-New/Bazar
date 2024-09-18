import { useQuery } from "@tanstack/react-query";
import { getMarketsByFilter } from "../../services/apiMarkets";

function useMarketsByFilter() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["marketsByFilter"],
    queryFn: getMarketsByFilter,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useMarketsByFilter;
