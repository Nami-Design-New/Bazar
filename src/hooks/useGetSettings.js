import { useQuery } from "@tanstack/react-query";
import axios from "./../utils/axios";

function useGetSettings() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const res = await axios.get("/get_settings");
      if (res.status === 200) {
        return res?.data?.data;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { isLoading, data, error };
}

export default useGetSettings;
