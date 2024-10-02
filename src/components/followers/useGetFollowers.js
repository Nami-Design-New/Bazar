import { useQuery } from "@tanstack/react-query";
import { getFollowers } from "../../services/apiFollow";

function useGetFollowers() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["followers"],
    queryFn: getFollowers,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetFollowers;
