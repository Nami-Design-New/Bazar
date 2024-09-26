import axios from "../utils/axios";

export async function deleteAccount() {
  try {
    const req = await axios.post("/user/delete_account");
    return req.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
