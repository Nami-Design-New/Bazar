import { useQuery } from "@tanstack/react-query";
import { getFavoriteAds } from "../../services/apiAds";

function useFavoriteAds() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["favoriteAds"],
    queryFn: getFavoriteAds,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useFavoriteAds;
