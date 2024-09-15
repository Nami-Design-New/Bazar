import axios from "../utils/axios";

export async function getCommentReplays(id) {
  const requestBody = {};

  if (id) {
    requestBody.id = +id;
  }

  try {
    const req = await axios.post("/get_replays", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching comment replays: ${err.message}`);
  }
}
