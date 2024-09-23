import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axios";


function useGetNotifications() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["userNotification"],
    queryFn: async () => {
      const res = await axios.get("/get_user_notification");
      if (res.status === 200) {
        return res.data;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetNotifications;
