import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../services/apiProducts";

function useProductDetails() {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => getProductDetails(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useProductDetails;
