import axios from "../utils/axios";

export async function getuserOrders(id) {
  const requestBody = {};

  if (id) {
    requestBody.user_id = +id;
  }

  requestBody.ad_type = "sell";

  try {
    const req = await axios.post("/get_user_ads", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching ads: ${err.message}`);
  }
}
