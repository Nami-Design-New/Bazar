import axios from "../utils/axios";

export async function getUserInterests() {
  try {
    const req = await axios.get("/user/get_my_interests");

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching orders: ${err.message}`);
  }
}
