import axios from "./../utils/axios";
export async function getChats() {
  try {
    const res = await axios.post("/user/get_chats");
    if (res.data.code === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }
}

export async function getTargetChat(data) {
  try {
    const res = await axios.post("/user/get_chat_details", {
      ...data,
      orderBy: "asc"
    });
    if (res.data.code === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }
}

export const createMessage = async (data) => {
  try {
    const res = await axios.post("/user/create_message", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    if (res.data.code === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }
};
