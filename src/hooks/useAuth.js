import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setClientData } from "../redux/slices/clientData";
import axiosInstance from "../utils/axiosInstance";
import useGetAuthedUser from "../hooks/users/useGetAuthedUser";

export default function useAuth() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cookies, , removeCookie] = useCookies(["token", "id"]);
  const token = cookies?.token;
  const id = cookies?.id;
  let decodedToken = null;
  let isExpired = false;

  if (token) {
    try {
      decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      isExpired = decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
    axiosInstance.defaults.headers.common["Authorization"] = `bearer ${token}`;
  }

  const {
    data: profile,
    isFetched,
    refetch,
  } = useGetAuthedUser(Boolean(token && id && !isExpired));

  useEffect(() => {
    if (isExpired) {
      return;
    }

    if (Number(decodedToken?.sub) !== id || isExpired) {
      dispatch(setClientData({}));
      removeCookie("token");
      removeCookie("id");
      return;
    }

    if (isFetched) {
      if (profile) {
        dispatch(setClientData(profile));
        setLoading(false);
      } else {
        console.log("Profile data not available, refetching...");
        refetch().then(() => setLoading(false));
      }
    } else {
      refetch().then(() => setLoading(false));
    }
  }, [
    decodedToken?.sub,
    dispatch,
    id,
    isExpired,
    isFetched,
    profile,
    refetch,
    removeCookie,
  ]);

  return { loading, profile };
}
