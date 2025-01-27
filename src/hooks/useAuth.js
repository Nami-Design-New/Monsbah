import { useEffect, useState, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setClientData } from "../redux/slices/clientData";
import axiosInstance from "../utils/axiosInstance";
import useGetAuthedUser from "../hooks/users/useGetAuthedUser";

export default function useAuth() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [cookies, , removeCookie] = useCookies(["token", "id"]);
  const { token, id } = cookies;

  const { decodedToken, isExpired } = useMemo(() => {
    if (!token) return { decodedToken: null, isExpired: true };

    try {
      const decoded = jwtDecode(token);
      console.log(decoded);

      const currentTime = Date.now() / 1000;
      const expired = decoded.exp < currentTime;
      console.log(expired);

      return { decodedToken: decoded, isExpired: expired };
    } catch (error) {
      console.error("Error decoding token:", error);
      return { decodedToken: null, isExpired: true };
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `bearer ${token}`;
    }
  }, [token]);

  const {
    data: profile,
    isFetched,
    refetch,
  } = useGetAuthedUser(Boolean(token && id && !isExpired));

  useEffect(() => {
    if (isExpired || Number(decodedToken?.sub) !== Number(id)) {
      dispatch(setClientData({}));
      removeCookie("token");
      removeCookie("id");
      setLoading(false);
      setIsAuthed(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        if (isFetched) {
          if (profile) {
            let type = localStorage.getItem("userType");
            dispatch(
              setClientData(type === "client" ? profile : profile?.client)
            );
            setIsAuthed(true);
          } else {
            console.log("Profile data not available, refetching...");
            await refetch();
          }
        } else {
          await refetch();
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsAuthed(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
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

  return { loading, isAuthed };
}
