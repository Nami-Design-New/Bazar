import { useMutation, useQueryClient } from "@tanstack/react-query";
import { follow as followApi } from "../services/apiFollow";

function useFollow() {
  const queryClient = useQueryClient();

  const { mutate: follow, isLoading } = useMutation({
    mutationFn: (requestBody) => followApi(requestBody),

    onSuccess: (res) => {
      if (res?.code !== 200 || res?.data?.code !== 201)
        throw new Error(res?.message);
      else {
        queryClient.invalidateQueries([
          "marketDetails",
          "favoriteMarkets",
          "marketsByFilter",
          "profile",
        ]);
      }
    },
  });
  return { follow, isLoading };
}

export default useFollow;
