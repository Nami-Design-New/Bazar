import { useQuery } from "@tanstack/react-query";
import { getRates } from "../services/apiComments";

function useGetRates(requestBody) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["rates", requestBody],
    queryFn: () => getRates(requestBody),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetRates;
