import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMarketCoupons } from "../../services/apiMarkets";

function useMarketCoupons() {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ["marketCoupons", id],
    queryFn: () => getMarketCoupons(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useMarketCoupons;
