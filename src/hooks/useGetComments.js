import { useQuery } from "@tanstack/react-query";
import { getComments } from "../services/apiComments";

function useGetComments(requestBody) {
  console.log(requestBody);

  const { isLoading, data, error } = useQuery({
    queryKey: ["comments", requestBody],
    queryFn: () => getComments(requestBody),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetComments;
