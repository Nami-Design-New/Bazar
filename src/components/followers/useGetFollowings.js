import { useQuery } from "@tanstack/react-query";
import { getFollowings } from "../../services/apiFollow";

function useGetFollowings(requestBody) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["followings", requestBody],
    queryFn: () => getFollowings(requestBody),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetFollowings;
