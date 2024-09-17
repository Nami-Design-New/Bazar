import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiApp";

function useSettings() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["appSettings"],
    queryFn: () => getSettings(),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useSettings;
