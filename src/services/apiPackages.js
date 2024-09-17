
import axios from "../utils/axios";

export async function getPackagesList() {
  try {
    const req = await axios.get("/get_packages");

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching packages: ${err.message}`);
  }
}