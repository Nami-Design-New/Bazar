import { useQuery } from "@tanstack/react-query";
import { getFaqs } from "../services/apiApp";

function useFaq() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["faqs"],
    queryFn: getFaqs,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useFaq