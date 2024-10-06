import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { setClientData } from "./redux/slices/clientData";
import Footer from "./ui/Layout/Footer";
import Header from "./ui/Layout/Header";
import routerConfig from "./RouterConfig";
import i18n from "./utils/i18n";
import axiosInstance from "./utils/axiosInstance";
import useGetAuthedUser from "./hooks/users/useGetAuthedUser";
import SmallMenu from "./ui/Layout/SmallMenu";
import BackToTop from "./ui/Layout/BackToTop";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const lang = useSelector((state) => state.language.lang);

  const [loading, setLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

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
    refetch
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
    removeCookie
  ]);

  useEffect(() => {
    sessionStorage.setItem("lang", lang);
    const body = document.querySelector("body");
    lang === "en" ? body.classList.add("en") : body.classList.remove("en");
    i18n.changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    return () => {
      window.onscroll = null;
    };
  }, []);

  return loading ? null : (
    <>
      <Header />
      <main>
        <Routes>
          {routerConfig.map((route, index) => {
            return (
              <Route path={route.path} element={route.element} key={index} />
            );
          })}
        </Routes>
      </main>
      <Footer />
      <SmallMenu />
      <BackToTop show={showBackToTop} />
    </>
  );
}

export default App;
