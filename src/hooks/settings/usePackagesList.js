import { useQuery } from "@tanstack/react-query";
import { getPackagesList } from "../../services/apiPackages";


function usePackagesList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["packagesList"],
    queryFn: getPackagesList,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,

  });

  return { isLoading, data, error };
}

export default usePackagesList