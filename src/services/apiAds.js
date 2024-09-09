import axios from "../utils/axios";

export async function getAdsByFilter(ad_type) {
  const requestBody = {};

  if (ad_type) {
    requestBody.ad_type = ad_type;
  }

  try {
    const req = await axios.post("/get_ads", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching ads: ${err.message}`);
  }
}

export async function getAdById(id) {
  const requestBody = {};

  if (id) {
    requestBody.id = +id;
  }

  try {
    const req = await axios.post("/get_ad_details", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching ads: ${err.message}`);
  }
}