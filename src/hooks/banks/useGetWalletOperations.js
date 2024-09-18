import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";

function useGetWalletOperations() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["wallet-operations"],

    queryFn: async () => {
      try {
        const res = await axios.get("/user/get_wallet_operations");
        return {
          data: res.data.data,
          total: res.data.total,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}

export default useGetWalletOperations;
