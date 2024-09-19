import { useQuery } from "@tanstack/react-query";
import { getAdsComments } from "../../services/apiAds";

function useGetCommnets(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["ad-comments", id],
    queryFn: () => getAdsComments(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!id
  });

  return { isLoading, data, error };
}

export default useGetCommnets;
