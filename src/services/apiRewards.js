import axios from "../utils/axios";

export async function getUserRewards() {
  try {
    const req = await axios.get("/user/get_reward_ads");

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching rewards: ${err.message}`);
  }
}
