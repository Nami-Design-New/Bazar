import { useMutation, useQueryClient } from "@tanstack/react-query";
import { follow as followApi } from "../services/apiFollow";

function useFollow() {
  const queryClient = useQueryClient();

  const { mutate: follow, isLoading } = useMutation({
    mutationFn: (requestBody) => followApi(requestBody),

    onSuccess: () => {
      queryClient.invalidateQueries([
        "marketDetails",
        "favoriteMarkets",
        "marketsByFilter",
        "profile",
      ]);
    },
  });
  return { follow, isLoading };
}

export default useFollow;
