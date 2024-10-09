import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfollow as unfollowApi } from "../services/apiFollow";

function useUnfollow() {
  const queryClient = useQueryClient();

  const { mutate: unfollow, isLoading } = useMutation({
    mutationFn: (requestBody) => unfollowApi(requestBody),

    onSuccess: () => {
      queryClient.invalidateQueries([
        "marketDetails",
        "followers",
        "followings",
        "profile",
        "adById",
        "userById",
        "ads-videos",
        "adById",
      ]);
    },
  });
  return { unfollow, isLoading };
}

export default useUnfollow;
