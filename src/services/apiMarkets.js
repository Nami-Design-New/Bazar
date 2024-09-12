import axios from "../utils/axios";

export async function getMarketsByFilter() {
  try {
    const req = await axios.post("/get_markets");

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
