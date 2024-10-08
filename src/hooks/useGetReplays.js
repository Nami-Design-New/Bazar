import { useQuery } from "@tanstack/react-query";
import { getReplays } from "../services/apiComments";

function useGetReplays(requestBody) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["replays", requestBody],
    queryFn: () => getReplays(requestBody),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetReplays;
