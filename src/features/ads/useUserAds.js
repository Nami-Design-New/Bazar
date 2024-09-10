import { useQuery } from "@tanstack/react-query";
import { getuserAds } from "../../services/apiAds";

function useUserAds(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["userAds", id],
    queryFn: () => getuserAds(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!id,
  });

  return { isLoading, data, error };
}

export default useUserAds;
