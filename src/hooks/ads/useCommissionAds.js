import { useQuery } from "@tanstack/react-query";
import { getCommissionAds } from "../../services/apiAds";

function useCommissionAds() {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["commissionAds"],
    queryFn: () => getCommissionAds(),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error, refetch };
}

export default useCommissionAds;
