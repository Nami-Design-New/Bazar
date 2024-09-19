import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromFavorite as removeFromFavoriteApi } from "../services/apiFAvorites";

function useRemoveFromFavorite() {
  const queryClient = useQueryClient();

  const { mutate: removeFromFavorite, isLoading } = useMutation({
    mutationFn: (requestBody) => removeFromFavoriteApi(requestBody),

    onSuccess: () => {
      queryClient.invalidateQueries([
        "favoriteAds, adsByFilter, favoriteMarkets, marketsByFilter",
      ]);
    },
  });
  return { removeFromFavorite, isLoading };
}

export default useRemoveFromFavorite;
