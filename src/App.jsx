import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import i18n from "./utils/i18n";
import Footer from "./ui/Layout/Footer";
import Header from "./ui/Layout/Header";
import SmallMenu from "./ui/Layout/SmallMenu";
import routerConfig from "./RouterConfig";
import BackToTop from "./ui/Layout/BackToTop";
import useAuth from "./hooks/useAuth";

function App() {
  const { loading } = useAuth();
  const location = useLocation();
  const lang = useSelector((state) => state.language.lang);
  const [showBackToTop, setShowBackToTop] = useState(false);

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
