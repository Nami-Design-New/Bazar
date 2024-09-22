import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";

function useGetAddresses() {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const res = await axios.get("/user/get_address");
      if (res.status === 200) {
        return res.data;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error, refetch };
}

export default useGetAddresses;
