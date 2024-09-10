import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMarketDetails } from "../../services/apiMarkets";

function useMarketDetails() {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ["marketDetails", id],
    queryFn: () => getMarketDetails(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useMarketDetails;
