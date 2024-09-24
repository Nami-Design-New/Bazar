import { useMutation } from "@tanstack/react-query";
import { removeFromFavorite as removeFromFavoriteApi } from "../services/apiFavorites";

function useRemoveFromFavorite() {
  const { mutate: removeFromFavorite, isLoading } = useMutation({
    mutationFn: (requestBody) => removeFromFavoriteApi(requestBody),
  });
  return { removeFromFavorite, isLoading };
}

export default useRemoveFromFavorite;
