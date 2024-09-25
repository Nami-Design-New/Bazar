import axios from "../utils/axios";

export async function getAvailableCoupons() {
  try {
    const req = await axios.get("/user/get_available_coupons");

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching coupons: ${err.message}`);
  }
}
