import axios from "../utils/axios";

export async function getFilters(sub_category_id) {
  const requestBody = {};

  if (sub_category_id) {
    requestBody.sub_category_id = sub_category_id;
  }

  try {
    const req = await axios.post("/get_filters", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching filters: ${err.message}`);
  }
}
