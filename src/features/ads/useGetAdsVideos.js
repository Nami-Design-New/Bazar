import { useQuery } from "@tanstack/react-query";
import { getAdsVideos } from "../../services/apiAds";

function useGetAdsVideos() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["ads-videos"],
    queryFn: () => getAdsVideos(),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { isLoading, data, error };
}

export default useGetAdsVideos;
