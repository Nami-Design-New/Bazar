import axios from "../utils/axios";

export async function getProductDetails(id) {
  const requestBody = {};

  if (id) {
    requestBody.id = +id;
  }

  try {
    const req = await axios.post("/get_product_details", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching product details: ${err.message}`);
  }
}
