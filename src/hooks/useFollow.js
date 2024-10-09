import { useMutation, useQueryClient } from "@tanstack/react-query";
import { follow as followApi } from "../services/apiFollow";

function useFollow() {
  const queryClient = useQueryClient();

  const { mutate: follow, isLoading } = useMutation({
    mutationFn: (requestBody) => followApi(requestBody),

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
  return { follow, isLoading };
}

export default useFollow;
