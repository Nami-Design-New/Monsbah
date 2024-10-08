import { useLayoutEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import axiosInstance from "./utils/axiosInstance";

const setupAxiosInterceptors = (setCookie, user) => {
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;

      if (err.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          delete axiosInstance.defaults.headers.common.Authorization;

          const res = await axiosInstance.post("/client/auth/refresh-token", {
            country_code: user?.country_code,
            phone: user?.phone,
          });

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
  const [, setCookie] = useCookies();
  const user = useSelector((state) => state.clientData.client);

  useLayoutEffect(() => {
    setupAxiosInterceptors(setCookie, user);
  }, [setCookie, user]);

  return <>{children}</>;
};

export default InterceptorProvider;
