import { useQuery } from "@tanstack/react-query";
import { getRates } from "../services/apiComments";

function useGetRates(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["rates", id],
    queryFn: () => getRates(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!id,
  });

  return { isLoading, data, error };
}

export default useGetRates;
