import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromFavorite as removeFromFavoriteApi } from "../services/apiFavorites";

function useRemoveFromFavorite() {
  const queryClient = useQueryClient();
  const { mutate: removeFromFavorite, isLoading } = useMutation({
    mutationFn: (requestBody) => removeFromFavoriteApi(requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteMarkets"] });
      queryClient.invalidateQueries({ queryKey: ["favoriteAds"] });
      queryClient.invalidateQueries({ queryKey: ["marketDetails"] });
      queryClient.invalidateQueries({ queryKey: ["adById"] });
    },
  });
  return { removeFromFavorite, isLoading };
}

export default useRemoveFromFavorite;
