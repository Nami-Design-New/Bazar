import { useQuery } from "@tanstack/react-query";
import { getAvailableCoupons } from "../../services/apiCoupons";

function useAvailableCoupons() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["availableCoupons"],
    queryFn: getAvailableCoupons,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useAvailableCoupons;
