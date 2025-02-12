import { useLayoutEffect } from "react";
import { useCookies } from "react-cookie";
import axiosInstance from "../utils/axiosInstance";

const setupAxiosInterceptors = (setCookie, token) => {
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;

      if (err.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!token) {
          return Promise.reject(err);
        }

        try {
          delete axiosInstance.defaults.headers.common.Authorization;
          const res = await axiosInstance.post(
            `/${localStorage.getItem("userType")}/auth/refresh-token`,
            {
              token: token,
            }
          );

          if (res.status === 200) {
            const newToken = res.data.data.token;

            setCookie("token", newToken, {
              path: "/",
              secure: true,
              sameSite: "Strict",
            });

            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

            return axiosInstance(originalRequest);
          } else {
            throw new Error("Token refresh failed");
          }
        } catch (error) {
          console.error("Token refresh error:", error);
          return Promise.reject(err);
        }
      }

      return Promise.reject(err);
    }
  );
};

const InterceptorProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(["token"]);
  const { token } = cookies;

  useLayoutEffect(() => {
    setupAxiosInterceptors(setCookie, token);
  }, [setCookie, token]);

  return <>{children}</>;
};

export default InterceptorProvider;
