import axios from "../utils/axios";

export async function getSettings() {
  try {
    const req = await axios.get("/get_settings");

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching settings: ${err.message}`);
  }
}

export async function getFaqs() {
  try {
    const req = await axios.get("/faq_categories");

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching faqs: ${err.message}`);
  }
}
