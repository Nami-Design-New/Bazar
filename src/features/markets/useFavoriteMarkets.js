import { useQuery } from "@tanstack/react-query";
import { getFavoriteMarkets } from "../../services/apiMarkets.js";

function useFavoriteMarkets() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["favoriteMarkets"],
    queryFn: getFavoriteMarkets,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useFavoriteMarkets;
