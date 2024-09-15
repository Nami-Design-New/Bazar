import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../services/apiCart";

function useGetCart() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { isLoading, data, error };
}

export default useGetCart;
