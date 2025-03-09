import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSearchParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select";
import CategoryLoader from "../../ui/loaders/CategoryLoader";
import useGetCities from "../../hooks/settings/useGetCities";
import useGetCountries from "../../hooks/settings/useGetCountries";
import useGetCategories from "../../hooks/settings/useGetCategories";
import useGetSubCategories from "../../hooks/settings/useGetSubCategories";
import useGetCompanyCategories from "./../../hooks/settings/useGetCompanyCategories";
import useGetCurrentLocation from "./../../hooks/settings/useGetCurrentLocation";

export default function FilterBox({ className, page = "products" }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const userCountry = useSelector((state) => state.clientData.client.country);

  const [searchParams, setSearchParams] = useSearchParams();
  const [country, setCountry] = useState(null);
  const [productType, setProductType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const { data: userLocation } = useGetCurrentLocation();
  const { data: countries, countriesLoading } = useGetCountries();
  const { data: cities } = useGetCities(country, country ? true : false);
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const { data: companyCategories, isLoading: companyCategoriesLoading } =
    useGetCompanyCategories();

  const { data: subCategories } = useGetSubCategories(
    selectedCategory,
    selectedCategory ? true : false
  );

  const categoryList = useMemo(() => {
    if (page === "companies") {
      return companyCategories;
    } else {
      if (localStorage.getItem("userType") === "client") {
        return categories;
      } else {
        return companyCategories;
      }
    }
  }, [categories, companyCategories, page]);

  useEffect(() => {
    if (searchParams.get("category")) {
      setSelectedCategory(searchParams.get("category"));
    }
    if (searchParams.get("sub_category")) {
      setSelectedSubCategory(searchParams.get("sub_category"));
    }
    if (searchParams.get("country")) {
      setCountry(searchParams.get("country"));
    }
    if (!searchParams.get("country")) {
      if (userLocation?.country?.id) {
        handleSetParams(userLocation.country.id, "country");
      } else if (userCountry) {
        handleSetParams(userCountry.id, "country");
      } else {
        handleSetParams(6, "country");
      }
    }

    if (searchParams.get("type") === "sale") {
      setProductType({ value: "sale", label: t("sale") });
    } else if (searchParams.get("type") === "rent") {
      setProductType({ value: "rent", label: t("rent") });
    } else {
      setProductType({ value: "", label: t("all") });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries, searchParams, t, userLocation]);

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

  return (
    <section className={`explore_ads ${className}`}>
      <div className="container d-flex flex-column gap-3">
        <Swiper slidesPerView="auto" className="categories_slider">
          {categoriesLoading || companyCategoriesLoading ? (
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
                    setSelectedSubCategory(null);
                    setProductType(null);
                  }}
                >
                  <div className="img">
                    <img src="/images/icons/all.svg" alt="" />
                  </div>
                  <h6>{t("all")}</h6>
                </button>
              </SwiperSlide>

              {categoryList?.map((category) => (
                <SwiperSlide key={category.id} className="p-1">
                  <button
                    onClick={() => {
                      searchParams.delete("sub_category");
                      searchParams.delete("type");
                      setSearchParams(searchParams);
                      setSelectedSubCategory(null);
                      setProductType(null);
                      handleSetParams(category.id, "category");
                    }}
                    className={`category ${
                      category?.id === Number(selectedCategory) ? "active" : ""
                    }`}
                  >
                    <div className="img">
                      <img src={category?.image} alt="" />
                    </div>
                    <h6>{category?.name}</h6>
                  </button>
                </SwiperSlide>
              ))}
            </>
          )}
        </Swiper>

        {selectedCategory && subCategories?.length > 0 && (
          <Swiper slidesPerView="auto" className="categories_slider">
            <SwiperSlide className="p-1">
              <button
                aria-label="Subcategory"
                className={`category sub ${
                  selectedSubCategory === null ? "active" : ""
                }`}
                onClick={() => {
                  searchParams.delete("sub_category");
                  setSearchParams(searchParams);
                  setSelectedSubCategory(null);
                }}
              >
                <h6>{t("all")}</h6>
              </button>
            </SwiperSlide>

            {subCategories?.map((sub) => (
              <SwiperSlide key={sub.id} className="p-1">
                <button
                  onClick={() => handleSetParams(sub.id, "sub_category")}
                  className={`category sub ${
                    sub?.id === Number(selectedSubCategory) ? "active" : ""
                  }`}
                >
                  <h6>{sub?.name}</h6>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

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
              }}
              options={countries?.map(({ id, name }) => ({
                value: id,
                label: name,
              }))}
            />
            {selectedCategory === "1" && (
              <Select
                aria-label="Product Type"
                className="basic-single"
                classNamePrefix="select"
                isSearchable={false}
                isRtl={lang === "ar"}
                placeholder={t("productType")}
                onChange={(e) => handleSetParams(e?.value, "type")}
                value={productType}
                options={[
                  { value: "", label: t("all") },
                  { value: "sale", label: t("sale") },
                  { value: "rent", label: t("rent") },
                ]}
              />
            )}
          </div>

          <div className="grid_view">
            <Dropdown>
              <Dropdown.Toggle aria-label="Filter">
                <i className="fa-regular fa-arrow-up-wide-short"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSetParams("near", "sort")}>
                  <i className="fa-regular fa-calendar"></i>
                  <span>{t("latest")}</span>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSetParams("new", "sort")}>
                  <i className="fa-regular fa-location-dot"></i>
                  <span>{t("fromNearest")}</span>
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => handleSetParams("highest_rated", "sort")}
                >
                  <i className="fa-regular fa-star"></i>
                  <span>{t("highestRate")}</span>
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => handleSetParams("high_price", "sort")}
                >
                  <i className="fa-regular fa-arrow-up-wide-short"></i>
                  <span>{t("high_price")}</span>
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => handleSetParams("low_price", "sort")}
                >
                  <i className="fa-regular fa-arrow-down-wide-short"></i>
                  <span>{t("low_price")}</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

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
  );
}
