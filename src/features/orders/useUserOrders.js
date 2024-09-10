import { useQuery } from "@tanstack/react-query";
import { getuserOrders } from "../../services/apiOrders";

function useUserOrders(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["userOrders", id],
    queryFn: () => getuserOrders(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!id,
  });

  return { isLoading, data, error };
}

export default useUserOrders;
