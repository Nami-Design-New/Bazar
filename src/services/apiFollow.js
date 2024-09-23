import axios from "./../utils/axios";

export const handleFollow = async (type, id, setVideos, endpoint) => {
  try {
    const res = await axios.post(endpoint, { type, id });

    if (res?.data?.code === 200) {
      setVideos((prevVideos) =>
        prevVideos.map((video) => {
          if (video?.user?.id === id) {
            return {
              ...video,
              user: {
                ...video.user,
                is_follow: !video.user.is_follow,
              },
            };
          }
          return video;
        })
      );
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const handleFavourite = async (type, id, setVideos, endpoint) => {
  try {
    const res = await axios.post(endpoint, { type, id });
    if (res?.data?.code === 200) {
      setVideos((prevVideos) =>
        prevVideos.map((video) => {
          if (video.id === id) {
            return {
              ...video,
              is_favorite: !video.is_favorite,
              favorites_count: video.is_favorite
                ? video.favorites_count - 1
                : video.favorites_count + 1,
            };
          }
          return video;
        })
      );
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};


export async function follow(requestBody) {
  try {
    const req = await axios.post("/user/follow", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error to follow: ${err.message}`);
  }
}

export async function unfollow(requestBody) {
  try {
    const req = await axios.post("/user/un_follow", requestBody);

    return req.data;
  } catch (err) {
    throw new Error(`Error to follow: ${err.message}`);
  }
}
