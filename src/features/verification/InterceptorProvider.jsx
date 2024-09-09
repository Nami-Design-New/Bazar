import { useLayoutEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const setupAxiosInterceptors = (setCookie) => {
  axios.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;

      if (err.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const cookies = document.cookie;
          const listOfCookies = cookies.split(";");

          let token = "";
          listOfCookies.forEach((e) => {
            if (e.includes("token")) {
              token = e.split("=")[1];
            }
          });

          delete axios.defaults.headers.common.Authorization;

          const res = await axios.post("/user/refresh_token", {
            token: token,
          });

          if (res.data.code === 200 && res.data.data) {
            const newToken = res.data.token;
            setCookie("token", newToken, {
              path: "/",
              secure: true,
              sameSite: "Strict",
            });
            axios.defaults.headers.common["Authorization"] = newToken;
            originalRequest.headers["Authorization"] = newToken;
          }

          return axios(originalRequest);
        } catch (error) {
          console.log("Token refresh error:", error);
          return Promise.reject(err);
        }
      }
      return Promise.reject(err);
    }
  );
};

const InterceptorProvider = ({ children }) => {
  const [, setCookie] = useCookies();

  useLayoutEffect(() => {
    setupAxiosInterceptors(setCookie);
  }, [setCookie]);

  return <>{children}</>;
};

export default InterceptorProvider;
