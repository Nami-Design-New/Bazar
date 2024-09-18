import { useQuery } from "@tanstack/react-query";
import { getBanks } from "../../services/apiBanks";

function useBanksList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["banksList"],
    queryFn: () => getBanks(),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useBanksList