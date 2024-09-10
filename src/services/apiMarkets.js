import axios from "../utils/axios";

export async function getMarketsByFilter() {
  try {
    const req = await axios.post("/get_markets");

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching ads: ${err.message}`);
  }
}

export async function getFavoriteMarkets() {
  try {
    const req = await axios.get("/user/favorites_markets");

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching ads: ${err.message}`);
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
    throw new Error(`Error fetching ads: ${err.message}`);
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
    throw new Error(`Error fetching ads: ${err.message}`);
  }
}
