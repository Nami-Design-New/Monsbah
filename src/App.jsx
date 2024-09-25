import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Footer from "./ui/Layout/Footer";
import Header from "./ui/Layout/Header";
import routerConfig from "./RouterConfig";
import i18n from "./utils/i18n";

function App() {
  const lang = useSelector((state) => state.language.lang);

  useEffect(() => {
    sessionStorage.setItem("lang", lang);
    const body = document.querySelector("body");
    lang === "en" ? body.classList.add("en") : body.classList.remove("en");
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
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
    </>
  );
}

export default App;
