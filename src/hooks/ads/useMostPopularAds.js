import { useQuery } from '@tanstack/react-query';
import { getMostPopularAds } from '../../services/apiAds';

function useMostPopularAds() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["mostPopularAds"],
    queryFn: getMostPopularAds,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useMostPopularAds