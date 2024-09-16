import axios from "../utils/axios";

export async function getuserOrders() {
  try {
    const req = await axios.get("/user/get_orders");

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching orders: ${err.message}`);
  }
}

export async function getOrderDetails(id) {
  const requestBody = {};

  if (id) {
    requestBody.id = +id;
  }

  try {
    const req = await axios.post("/user/get_order_details", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error fetching order details: ${err.message}`);
  }
}
