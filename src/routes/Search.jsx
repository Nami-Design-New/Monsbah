import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Route, Routes, useSearchParams } from "react-router-dom";
import Persons from "../components/search/Persons";
import Asks from "../components/search/Asks";
import Ads from "../components/search/Ads";

export default function Search() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [search, setSearch] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearch(searchParams.get("search"));
  }, [searchParams]);

  return (
    <>
      <section className="search_section" ref={sectionRef}>
        <div className="container">
          <form
            className="search_header"
            onSubmit={(e) => {
              e.preventDefault();
              setSearchParams({ search: search });
            }}
          >
            <input
              type="search"
              value={search}
              placeholder={t("searchPlaceholder")}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>
              <i className="fa-regular fa-magnifying-glass"></i>
            </button>
          </form>
          <nav className="search_nav">
            <NavLink end to={search ? `/search?search=${search}` : ""}>
              {t("advertisements")}
            </NavLink>
            <NavLink to={search ? `persons?search=${search}` : "persons"}>
              {t("persons")}
            </NavLink>
            <NavLink to={search ? `asks?search=${search}` : "asks"}>
              {t("asks")}
            </NavLink>
          </nav>

          <div className="row">
            <Routes>
              <Route path="" element={<Ads sectionRef={sectionRef} />} />
              <Route path="asks" element={<Asks sectionRef={sectionRef} />} />
              <Route
                path="persons"
                element={<Persons sectionRef={sectionRef} />}
              />
            </Routes>
          </div>
        </div>
      </section>
    </>
  );
}
