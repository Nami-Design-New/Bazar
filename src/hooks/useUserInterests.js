import { useQuery } from "@tanstack/react-query";
import { getUserInterests } from "../services/apiInterests";

function useUserInterests() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["userInterests"],
    queryFn: getUserInterests,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,

  });

  return { isLoading, data, error };
}

export default useUserInterests