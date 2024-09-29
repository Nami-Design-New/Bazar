import { useQuery } from "@tanstack/react-query";
import { getVerificationFaqs } from "../../services/apiApp";

function useVerificationFAQ() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["verificationFAQ"],
    queryFn: getVerificationFaqs,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useVerificationFAQ;
