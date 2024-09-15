import { useQuery } from "@tanstack/react-query";
import { getCommentReplays } from "../../services/apiComments";

function useGetReplays(id) {

  const { isLoading, data, error } = useQuery({
    queryKey: ["marketSections", id],
    queryFn: () => getCommentReplays(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetReplays;
