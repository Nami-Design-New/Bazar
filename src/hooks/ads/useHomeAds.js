import { useQuery } from "@tanstack/react-query";
import { getAdsByFilter } from "../../services/apiAds";

function useHomeAds(requestData) {
  const categoryId = requestData?.category_ids?.[0]; // Extract category ID for simplicity

  const { isLoading, data, error } = useQuery({
    queryKey: [`homeAds-${categoryId}`, categoryId], // Ensure the query key is unique for each category
    queryFn: () => getAdsByFilter({ requestData }),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!categoryId, // Only run if category ID is present
  });

  return { isLoading, data, error };
}

export default useHomeAds;
