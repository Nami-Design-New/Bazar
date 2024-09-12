import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMarketSections } from "../../services/apiMarkets";

function useMarketSections() {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ["marketSections", id],
    queryFn: () => getMarketSections(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useMarketSections;
