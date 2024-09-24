import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../../services/apiOrders";

function useOrderDetails() {
  const { id } = useParams();

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["marketDetails", id],
    queryFn: () => getOrderDetails(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error, refetch };
}

export default useOrderDetails;
