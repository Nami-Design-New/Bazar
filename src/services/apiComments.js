import axios from "../utils/axios";

export async function getReplays(requestBody) {
  try {
    const req = await axios.post("/get_replays", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching comment replays: ${err.message}`);
  }
}

export async function getComments(requestBody) {
  try {
    const req = await axios.post("/get_comments", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching comment comments: ${err.message}`);
  }
}

export async function getRates(requestBody) {
  try {
    const req = await axios.post("/get_rates", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching comment rates: ${err.message}`);
  }
}
