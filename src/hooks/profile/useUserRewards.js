import { useQuery } from "@tanstack/react-query";
import { getUserRewards } from "../../services/apiRewards";


function useUserRewards() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["userRewards"],
    queryFn: getUserRewards,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,

  });

  return { isLoading, data, error };
}

export default useUserRewards