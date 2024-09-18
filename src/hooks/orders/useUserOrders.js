import { useQuery } from "@tanstack/react-query";
import { getuserOrders } from "../../services/apiOrders";

function useUserOrders() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["userOrders"],
    queryFn: getuserOrders,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,

  });

  return { isLoading, data, error };
}

export default useUserOrders;
