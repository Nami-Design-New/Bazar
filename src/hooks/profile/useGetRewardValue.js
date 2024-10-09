import { useQuery } from "@tanstack/react-query";
import { getRewardValue } from "../../services/apiRewards";

function useGetRewardValue() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["rewardValue"],
    queryFn: getRewardValue,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetRewardValue;
