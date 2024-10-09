import { useQuery } from "@tanstack/react-query";
import { getFollowings } from "../../services/apiFollow";

function useGetFollowings() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["followings"],
    queryFn: () => getFollowings(),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetFollowings;
