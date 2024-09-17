import { useQuery } from "@tanstack/react-query";
import { getAdById } from "../../services/apiAds";
import { useParams } from "react-router-dom";

function useGetAdById() {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ["adById", id],
    queryFn: () => getAdById(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!id,
  });

  return { isLoading, data, error };
}

export default useGetAdById;
