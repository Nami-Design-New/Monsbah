import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import ResponsiveNav from "./ResponsiveNav";
import BackToTop from "./BackToTop";
import useAuth from "../../hooks/useAuth";
import i18n from "../../utils/i18n";
import AppLoader from "../loaders/AppLoader";
import DownloadApp from "./DownloadApp";

export default function RootLayout() {
  const { loading } = useAuth();
  const location = useLocation();
  const lang = useSelector((state) => state.language.lang);

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showDownloadApp, setShowDownloadApp] = useState(true);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    const body = document.querySelector("body");
    lang === "en" ? body.classList.add("en") : body.classList.remove("en");
    i18n.changeLanguage(lang);
  }, [lang]);

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
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return loading ? (
    <AppLoader />
  ) : (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ResponsiveNav />
      <BackToTop show={showBackToTop} />
      {showDownloadApp && (
        <DownloadApp setShowDownloadApp={setShowDownloadApp} />
      )}
    </>
  );
}
