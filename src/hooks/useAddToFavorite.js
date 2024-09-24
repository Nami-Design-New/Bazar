import { useMutation } from "@tanstack/react-query";
import { addToFavorite as addToFavoriteApi } from "../services/apiFavorites";

function useAddToFavorite() {

  const { mutate: addToFavorite, isLoading } = useMutation({
    mutationFn: (requestBody) => addToFavoriteApi(requestBody),
  });
  return { addToFavorite, isLoading };
}

export default useAddToFavorite;
