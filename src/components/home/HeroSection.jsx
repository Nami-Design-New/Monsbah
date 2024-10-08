import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import Select from "react-select";
import HeroSlider from "./HeroSlider";
import useGetCategories from "./../../hooks/settings/useGetCategories";
import useGetSubCategories from "../../hooks/settings/useGetSubCategories";
import useGetCountries from "./../../hooks/settings/useGetCountries";
import useGetCities from "./../../hooks/settings/useGetCities";
import CategoryLoader from "../../ui/loaders/CategoryLoader";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

function HeroSection() {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const userCity = useSelector((state) => state.clientData.client.city);
  const userCountry = useSelector((state) => state.clientData.client.country);

  const [searchParams, setSearchParams] = useSearchParams();

  const [country, setCountry] = useState(null);
  const [productType, setProductType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const { data: countries, isLoading } = useGetCountries();
  const { data: cities } = useGetCities(country, country ? true : false);
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const { data: subCategories } = useGetSubCategories(
    selectedCategory,
    selectedCategory ? true : false
  );

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
      handleSetParams(6, "country");
    }

    if (searchParams.get("type") === "sale") {
      setProductType({ value: "sale", label: t("sale") });
    } else if (searchParams.get("type") === "rent") {
      setProductType({ value: "rent", label: t("rent") });
    } else {
      setProductType({ value: "", label: t("all") });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries, searchParams, t]);

  useEffect(() => {
    if (userCity) {
      handleSetParams(userCity?.id, "city");
    }
    if (userCountry) {
      handleSetParams(userCountry?.id, "country");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCity, userCountry]);

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
    <>
      <HeroSlider />

      {/* explore ads */}
      <section className="explore_ads">
        <div className="container d-flex flex-column gap-3">
          {/* categories slider */}
          <Swiper slidesPerView="auto" className="categories_slider">
            {categoriesLoading ? (
              <>
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <SwiperSlide key={index}>
                      <CategoryLoader />
                    </SwiperSlide>
                  ))}
              </>
            ) : (
              <>
                <SwiperSlide>
                  <button
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

                {categories?.map((category) => (
                  <SwiperSlide key={category.id}>
                    <buttton
                      onClick={() => {
                        searchParams.delete("sub_category");
                        searchParams.delete("type");
                        setSearchParams(searchParams);
                        setSelectedSubCategory(null);
                        setProductType(null);
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

          {/* sub categories */}
          {subCategories?.length > 0 && (
            <Swiper slidesPerView="auto" className="categories_slider">
              <SwiperSlide>
                <button
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
                <SwiperSlide key={sub.id}>
                  <buttton
                    onClick={() => handleSetParams(sub.id, "sub_category")}
                    className={`category sub ${
                      sub?.id === Number(selectedSubCategory) ? "active" : ""
                    }`}
                  >
                    <h6>{sub?.name}</h6>
                  </buttton>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* filter */}
          <div className="filter">
            <div className="selects">
              <Select
                className="basic-single"
                classNamePrefix="select"
                isLoading={isLoading}
                isRtl={lang === "ar"}
                isSearchable={true}
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
                onChange={(e) => handleSetParams(e?.value, "country")}
                options={countries?.map(({ id, name }) => ({
                  value: id,
                  label: name,
                }))}
              />
              {selectedCategory === "1" && (
                <Select
                  className="basic-single"
                  classNamePrefix="select"
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
                <Dropdown.Toggle>
                  <i className="fa-regular fa-arrow-up-wide-short"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleSetParams("near", "sort")}
                  >
                    {t("near")}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSetParams("new", "sort")}>
                    {t("new")}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleSetParams("low_price", "sort")}
                  >
                    {t("low_price")}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleSetParams("high_price", "sort")}
                  >
                    {t("high_price")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle>
                  <i className="fa-sharp fa-light fa-filter"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
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
    </>
  );
}

export default HeroSection;
