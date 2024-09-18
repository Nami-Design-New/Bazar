import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";

function useGetHomeBanners() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axios.get("/get_banners");
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

export default useGetHomeBanners;
