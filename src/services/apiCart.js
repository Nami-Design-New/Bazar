import axios from "./../utils/axios";

export const getCart = async () => {
  try {
    const res = await axios.get("/user/get_cart");
    return res.data.data;
  } catch (err) {
    throw new Error(`Error fetching cart: ${err.message}`);
  }
};

export const deleteProductFromCart = async (id) => {
  try {
    const res = await axios.post("user/delete_cart_product", {
      id
    });
    return res;
  } catch (error) {
    throw new Error(`Error deleting product from cart: ${error.message}`);
  }
};

export const changeProductQuantity = async (endPoint, id) => {
  try {
    const res = await axios.post(endPoint, {
      id
    });
    return res;
  } catch (error) {
    throw new Error(`Error increasing product quantity: ${error.message}`);
  }
};

export async function deleteCart(querClient) {
  try {
    await axios.post("/user/delete_cart");
    querClient.invalidateQueries("cart");
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
