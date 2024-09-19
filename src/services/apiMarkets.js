import axios from "../utils/axios";

export async function getMarketsByFilter(
  search,
  page,
  type,
  city_id,
  area_id,
  category_id,
  sub_category_id
) {
  const requestBody = {};

  if (search) requestBody.search = search;

  if (page) requestBody.page = +page;

  if (type) requestBody.type = type;

  if (city_id) requestBody.city_id = +city_id;

  if (area_id) requestBody.area_id = +area_id;

  if (category_id && category_id.length) requestBody.category_ids = category_id;

  if (sub_category_id && sub_category_id.length)
    requestBody.sub_category_id = sub_category_id;

  try {
    const req = await axios.post("/get_markets", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching markets: ${err.message}`);
  }
}

export async function getFavoriteMarkets() {
  try {
    const req = await axios.get("/user/favorites_markets");

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching favorite markets: ${err.message}`);
  }
}

export async function getMarketDetails(id) {
  const requestBody = {};

  if (id) {
    requestBody.id = +id;
  }

  try {
    const req = await axios.post("/get_market_details", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching market details: ${err.message}`);
  }
}

export async function getMarketCoupons(id) {
  const requestBody = {};

  if (id) {
    requestBody.id = +id;
  }

  try {
    const req = await axios.post("/get_market_coupons", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching market coupons: ${err.message}`);
  }
}

export async function getMarketRates(id) {
  const requestBody = {};

  if (id) {
    requestBody.id = +id;
  }

  try {
    const req = await axios.post("/get_market_rates", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching rates: ${err.message}`);
  }
}

export async function getMarketSections(id) {
  const requestBody = {};

  if (id) {
    requestBody.id = +id;
  }

  try {
    const req = await axios.post("/get_market_sections", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching sections: ${err.message}`);
  }
}

export async function getSectionProducts(id) {
  const requestBody = {};

  if (id) {
    requestBody.id = +id;
  }

  try {
    const req = await axios.post("/get_market_products", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching section products: ${err.message}`);
  }
}
