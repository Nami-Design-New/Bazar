import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";

function useGetAreas(city_id, enabled) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["areas", city_id],
    queryFn: async () => {
      const res = await axios.post("/get_areas", { city_id });
      if (res.status === 200) {
        return res.data;
      }
    },
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { isLoading, data, error };
}

export default useGetAreas;
