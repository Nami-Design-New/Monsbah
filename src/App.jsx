import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import i18n from "./utils/i18n";
import Footer from "./ui/Layout/Footer";
import Header from "./ui/Layout/Header";
import SmallMenu from "./ui/Layout/SmallMenu";
import router from "./router";
import BackToTop from "./ui/Layout/BackToTop";
import useAuth from "./hooks/useAuth";
import ProtectionProvider from "./providers/ProtectionProvider";
import AppLoader from "./ui/loaders/AppLoader";

function App() {
  const { loading } = useAuth();
  const location = useLocation();
  const lang = useSelector((state) => state.language.lang);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showDownloadApp, setShowDownloadApp] = useState(true);
  const [appLink, setAppLink] = useState("");

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
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isAppDownloaded = localStorage.getItem("appDownloaded");
    if (isAppDownloaded) {
      setShowDownloadApp(false);
    } else {
      detectMobileTypeAndAppLink();
    }
  }, []);

  const detectMobileTypeAndAppLink = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setAppLink(
        "https://apps.apple.com/eg/app/%D9%85%D9%86%D8%A7%D8%B3%D8%A8%D8%A9/id1589937521"
      );
    } else if (/android/i.test(userAgent)) {
      setAppLink(
        "https://play.google.com/store/apps/details?id=com.app.monasba&pcampaignid=web_share"
      );
    }
  };

  const handleAppDownload = () => {
    localStorage.setItem("appDownloaded", "true");
    setShowDownloadApp(false);
  };

  return loading ? (
    <AppLoader />
  ) : (
    <>
      <Header />
      <main>
        <Routes>
          {router.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.protected ? (
                  <ProtectionProvider>{route.element}</ProtectionProvider>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Routes>
      </main>
      <Footer />
      <SmallMenu />
      <BackToTop show={showBackToTop} />

      {showDownloadApp && (
        <div className="download_app">
          <div className="inner">
            <div className="d-flex align-items-center gap-2">
              <button
                className="d-flex"
                onClick={() => setShowDownloadApp(false)}
              >
                <i className="fa-solid fa-times"></i>
              </button>
              <div className="icon">
                <img src="/images/branding/storeicon.svg" alt="store" />
              </div>
              <div className="text">
                <h6>Monasbah.com App</h6>
                <p>Get it on</p>
              </div>
            </div>
            <a href={appLink} className="get_app" onClick={handleAppDownload}>
              Get
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
