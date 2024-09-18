import axios from "../utils/axios";

export async function getBanks() {
  try {
    const req = await axios.get("/user/get_banks");
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createWithdraw(requestBody, queryClient) {
  try {
    await axios.post("/user/create_withdraw_balance_request", requestBody);
    queryClient.invalidateQueries(["profile"]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteBank(id, queryClient) {
  try {
    await axios.post("/user/delete_bank", {
      id,
    });
    queryClient.invalidateQueries(["banksList"]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addBank(requestBody, querClinet) {
  try {
    const req = await axios.post("/user/create_bank", requestBody);
    querClinet.invalidateQueries(["banksList"]);
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function editBank(requestBody, querClinet) {
  try {
    const req = await axios.post("/user/update_bank", requestBody);
    querClinet.invalidateQueries(["banksList"]);
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
