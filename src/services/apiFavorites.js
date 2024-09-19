import axios from "../utils/axios";

export async function addToFavorite(requestBody) {
  try {
    const req = await axios.post("/user/add_to_favorite", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching adding to favorite: ${err.message}`);
  }
}

export async function removeFromFavorite(requestBody) {
  try {
    const req = await axios.post("/user/remove_from_favorite", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching removing from favorite: ${err.message}`);
  }
}
