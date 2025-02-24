import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select";
import CompanyCard from "../ui/cards/CompanyCard";
import CategoryLoader from "../ui/loaders/CategoryLoader";
import useGetCountries from "../hooks/settings/useGetCountries";
import useGetCompanyCategories from "../hooks/settings/useGetCompanyCategories";
import useGetCities from "../hooks/settings/useGetCities";
import useGetCompanies from "../hooks/companies/useGetCompanies";
import CompanyLoader from "../ui/loaders/CompanyLoader";
import ProductLoader from "../ui/loaders/ProductLoader";
import ProductVertical from "../ui/cards/ProductVertical";
import useGetCompanyProducts from "./../hooks/products/useGetCompanyProducts";

export default function Companies() {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const userCountry = useSelector((state) => state.clientData.client.country);

  const sectionRef = useRef(null);

  const [country, setCountry] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: countries, countriesLoading } = useGetCountries();
  const { data: cities } = useGetCities(country, country ? true : false);
  const { data: products } = useGetCompanyProducts();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCompanyCategories();

  const handleSetParams = (value, type) => {
    if (value) {
      if (value === "") {
        searchParams.delete(type);
        setSearchParams(searchParams);
        return;
      }
      if (type === "country") {
        searchParams.delete("city");
        setSearchParams(searchParams);
      }
      searchParams.set(type, value);
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    if (searchParams.get("category")) {
      setSelectedCategory(searchParams.get("category"));
    }

    if (searchParams.get("country")) {
      setCountry(searchParams.get("country"));
    }
    if (!searchParams.get("country")) {
      localStorage.getItem("country")
        ? handleSetParams(localStorage.getItem("country"), "country")
        : userCountry
        ? handleSetParams(userCountry.id, "country")
        : handleSetParams(6, "country");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries, searchParams, t]);

  const {
    data: companies,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCompanies();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const section = sectionRef.current;
      const sectionBottom = section.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;

      if (
        sectionBottom <= viewportHeight + 200 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <section className={`explore_ads mt-4`}>
        <div className="container d-flex flex-column gap-3">
          <Swiper slidesPerView="auto" className="categories_slider">
            {categoriesLoading ? (
              <>
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <SwiperSlide key={index} className="p-1">
                      <CategoryLoader />
                    </SwiperSlide>
                  ))}
              </>
            ) : (
              <>
                <SwiperSlide className="p-1">
                  <button
                    aria-label="Category"
                    className={`category ${
                      selectedCategory === null ? "active" : ""
                    }`}
                    onClick={() => {
                      searchParams.delete("category");
                      searchParams.delete("sub_category");
                      searchParams.delete("type");
                      setSearchParams(searchParams);
                      setSelectedCategory(null);
                    }}
                  >
                    <div className="img">
                      <img src="/images/icons/all.svg" alt="" />
                    </div>
                    <h6>{t("all")}</h6>
                  </button>
                </SwiperSlide>

                {categories?.map((category) => (
                  <SwiperSlide key={category.id} className="p-1">
                    <buttton
                      onClick={() => {
                        searchParams.delete("sub_category");
                        searchParams.delete("type");
                        setSearchParams(searchParams);
                        handleSetParams(category.id, "category");
                      }}
                      className={`category ${
                        category?.id === Number(selectedCategory)
                          ? "active"
                          : ""
                      }`}
                    >
                      <div className="img">
                        <img src={category?.image} alt="" />
                      </div>
                      <h6>{category?.name}</h6>
                    </buttton>
                  </SwiperSlide>
                ))}
              </>
            )}
          </Swiper>

          <div className="filter">
            <div className="selects">
              <Select
                aria-label="Country"
                className="basic-single"
                classNamePrefix="select"
                isLoading={countriesLoading}
                isRtl={lang === "ar"}
                isSearchable={false}
                placeholder={t("selectCountry")}
                value={
                  country
                    ? {
                        value: country,
                        label: countries?.find((c) => c?.id === Number(country))
                          ?.name,
                      }
                    : null
                }
                onChange={(e) => {
                  handleSetParams(e?.value, "country");
                  localStorage.setItem("country", e?.value);
                }}
                options={countries?.map(({ id, name }) => ({
                  value: id,
                  label: name,
                }))}
              />
            </div>

            <div className="grid_view">
              <Dropdown>
                <Dropdown.Toggle aria-label="Filter Country">
                  <i className="fa-sharp fa-light fa-filter"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      searchParams.delete("city");
                      setSearchParams(searchParams);
                    }}
                  >
                    {t("all")}
                  </Dropdown.Item>
                  {cities?.map(({ id, name }) => (
                    <Dropdown.Item
                      key={id}
                      onClick={() => handleSetParams(id, "city")}
                    >
                      {name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </section>

      <section className="companies_section">
        <div className="container p-1">
          {searchParams.get("category") ? (
            <div className="row">
              {companies?.map((company) => (
                <div className="col-lg-4 col-md-6 col-12 p-2" key={company?.id}>
                  <CompanyCard company={company} />
                </div>
              ))}
              {(isLoading || isFetchingNextPage) && (
                <>
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        className="col-lg-4 col-md-6 col-12 p-2"
                        key={`loader-${index}`}
                      >
                        <CompanyLoader />
                      </div>
                    ))}
                </>
              )}
            </div>
          ) : (
            <div className="row">
              {products?.map((product, index) => (
                <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
                  <ProductVertical product={product} isShowAction={false} />
                </div>
              ))}
              {(isLoading || isFetchingNextPage) && (
                <>
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        className="col-lg-4 col-md-6 col-12 p-2"
                        key={`loader-${index}`}
                      >
                        <ProductLoader />
                      </div>
                    ))}
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
