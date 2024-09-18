import { useQuery } from "@tanstack/react-query";
import { getSectionProducts } from "../../services/apiMarkets";

function useSectionProducts(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["marketSectionProducts", id],
    queryFn: () => getSectionProducts(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!id,
  });

  return { isLoading, data, error };
}

export default useSectionProducts;
