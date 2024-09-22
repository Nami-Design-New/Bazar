import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavorite as addToFavoriteApi } from "../services/apiFavorites";

function useAddToFavorite() {
  const queryClient = useQueryClient();

  const { mutate: addToFavorite, isLoading } = useMutation({
    mutationFn: (requestBody) => addToFavoriteApi(requestBody),

    onSuccess: () => {
      queryClient.invalidateQueries([
        "favoriteAds, adsByFilter, favoriteMarkets, marketsByFilter"
      ]);
    }
  });
  return { addToFavorite, isLoading };
}

export default useAddToFavorite;
