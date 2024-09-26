import axios from "../utils/axios";

export async function createTransfer(requestBody, queryClient) {
  try {
    await axios.post("/user/create_transfer", requestBody);
    queryClient.invalidateQueries(["commissionAds"]);
  } catch (error) {
    throw new Error(error.message);
  }
}
