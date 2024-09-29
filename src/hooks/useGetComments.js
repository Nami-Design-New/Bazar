import { useQuery } from "@tanstack/react-query";
import { getComments } from "../services/apiComments";

function useGetComments(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!id,
  });

  return { isLoading, data, error };
}

export default useGetComments;
