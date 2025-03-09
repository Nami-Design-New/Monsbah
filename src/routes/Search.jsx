import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Route, Routes, useSearchParams } from "react-router-dom";
import Persons from "../components/search/Persons";
import Ads from "../components/search/Ads";
import Companies from "../components/search/Companies";
import CompaniesAds from "./CompaniesAds";

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
              if (search) {
                setSearchParams({ search: search });
              }
            }}
          >
            <input
              type="search"
              value={search}
              placeholder={t("searchPlaceholder")}
              onChange={(e) => {
                setSearch(e.target.value);
                if (!e.target.value) {
                  searchParams.delete("search");
                  setSearchParams(searchParams);
                }
              }}
            />
            <button aria-label="Search">
              <i className="fa-regular fa-magnifying-glass"></i>
            </button>
          </form>
          <nav className="search_nav">
            {localStorage.getItem("userType") !== "company" && (
              <NavLink end to={search ? `/search?search=${search}` : ""}>
                {t("advertisements")}
              </NavLink>
            )}

            {localStorage.getItem("userType") !== "company" && (
              <NavLink to={search ? `persons?search=${search}` : "persons"}>
                {t("persons")}
              </NavLink>
            )}

            <NavLink to={search ? `companies?search=${search}` : "companies"}>
              {t("companies")}
            </NavLink>

            <NavLink
              to={search ? `companies-ads?search=${search}` : "companies-ads"}
            >
              {t("companiesAds")}
            </NavLink>
          </nav>

          <div className="row">
            <Routes>
              <Route path="" element={<Ads sectionRef={sectionRef} />} />
              <Route
                path="persons"
                element={<Persons sectionRef={sectionRef} />}
              />
              <Route
                path="companies"
                element={<Companies sectionRef={sectionRef} />}
              />
              <Route
                path="companies-ads"
                element={<CompaniesAds sectionRef={sectionRef} />}
              />
            </Routes>
          </div>
        </div>
      </section>
    </>
  );
}
