import axios from "../utils/axios";

export async function getAdsByFilter(
  search,
  price_from,
  price_to,
  duration_from,
  duration_to,
  page,
  city_id,
  area_id,
  category_id,
  sub_category_id,
  ad_type,
  requestData
) {
  const requestBody = { ...requestData, random: 1 };

  if (search) requestBody.search = search;

  if (ad_type) requestBody.ad_type = ad_type;

  if (price_from) requestBody.price_from = price_from;

  if (price_to) requestBody.price_to = price_to;

  if (duration_from) requestBody.duration_from = duration_from;

  if (duration_to) requestBody.duration_to = duration_to;

  if (page) requestBody.page = page;

  if (city_id) requestBody.city_id = city_id;

  if (category_id && category_id.length) requestBody.category_ids = category_id;

  if (sub_category_id && sub_category_id.length)
    requestBody.sub_category_id = sub_category_id;

  try {
    const req = await axios.post("/get_ads", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching ads: ${err.message}`);
  }
}

export async function getuserAds(id) {
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
export async function getFavoriteAds() {
  try {
    const req = await axios.get("/user/get_ad_favorites");

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching ads: ${err.message}`);
  }
}
export async function getMostPopularAds() {
  try {
    const req = await axios.get("/get_most_popular_ads");

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

export async function getAdsVideos() {
  try {
    const req = await axios.post("/get_ads");

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching ads: ${err.message}`);
  }
}

export const getAdsComments = async (id) => {
  try {
    const res = await axios.post("/get_comments", { id: id });
    return res.data;
  } catch (error) {
    throw new Error(`Error fetching comments: ${error.message}`);
  }
};
