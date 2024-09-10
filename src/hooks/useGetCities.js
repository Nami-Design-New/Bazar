import { useQuery } from "@tanstack/react-query";
import axios from "./../utils/axios";

function useGetCities() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const res = await axios.get("/get_cities");
      if (res.status === 200) {
        return res.data;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { isLoading, data, error };
}

export default useGetCities;
