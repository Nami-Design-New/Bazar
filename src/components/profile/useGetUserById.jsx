import { useQuery } from "@tanstack/react-query";
import { getUserProfileById } from "../../services/apiProfile";
import { useParams } from "react-router-dom";

export default function useGetUserById() {
  const { id } = useParams();

  const { isLoading, data, error, refetch, isFetched } = useQuery({
    queryKey: ["userById", id],
    queryFn: () => getUserProfileById(+id),
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error, refetch, isFetched };
}
