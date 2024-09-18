import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiCategories";

function useCategoriesList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["categoryList"],
    queryFn: getCategories,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useCategoriesList;
