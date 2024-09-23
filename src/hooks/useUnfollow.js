import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfollow as unfollowApi } from "../services/apiFollow";

function useUnfollow() {
  const queryClient = useQueryClient();

  const { mutate: unfollow, isLoading } = useMutation({
    mutationFn: (requestBody) => unfollowApi(requestBody),

    onSuccess: () => {
      queryClient.invalidateQueries([
        "marketDetails",
        "favoriteMarkets",
        "marketsByFilter",
        "profile",
      ]);
    },
  });
  return { unfollow, isLoading };
}

export default useUnfollow;
