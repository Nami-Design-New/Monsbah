import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import Select from "react-select";
import useGetCategories from "./../../hooks/useGetCategories";
import useGetSubCategories from "../../hooks/useGetSubCategories";
import useGetCountries from "./../../hooks/settings/useGetCountries";
import useGetCities from "./../../hooks/settings/useGetCities";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

function HeroSection() {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const [searchParams, setSearchParams] = useSearchParams();

  const [country, setCountry] = useState(null);
  const [productType, setProductType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const { data: countries, isLoading } = useGetCountries();
  const { data: cities } = useGetCities(country, country ? true : false);
  const { data: categories } = useGetCategories();
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

    if (searchParams.get("type") === "sale") {
      setProductType({ value: "sale", label: t("sale") });
    } else if (searchParams.get("type") === "rent") {
      setProductType({ value: "rent", label: t("rent") });
    } else {
      setProductType({ value: "", label: t("all") });
    }
  }, [searchParams, t]);

  const handleSetParams = (value, type) => {
    if (value === "") {
      searchParams.delete(type);
      setSearchParams(searchParams);
      return;
    }
    searchParams.set(type, value);
    setSearchParams(searchParams);
  };

  return (
    <>
      {/* hero slider */}
      <section className="hero_section">
        <div className="container">
          <Swiper
            effect="fade"
            loop={true}
            spaceBetween={30}
            className="hero_swiper"
            pagination={{
              clickable: true
            }}
            modules={[Pagination, EffectFade, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            <SwiperSlide>
              <Link>
                <img src="/images/s1.webp" alt="" />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link>
                <img src="/images/s2.jpg" alt="" />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link>
                <img src="/images/s1.jpg" alt="" />
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* explore ads */}
      <section className="explore_ads">
        <div className="container d-flex flex-column gap-3">
          {/* categories slider */}
          <Swiper slidesPerView="auto" className="categories_slider">
            <SwiperSlide>
              <button
                className={`category ${
                  selectedCategory === null ? "active" : ""
                }`}
                onClick={() => {
                  searchParams.delete("category");
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
              <SwiperSlide key={category.id}>
                <buttton
                  onClick={() => handleSetParams(category.id, "category")}
                  className={`category ${
                    category?.id === Number(selectedCategory) ? "active" : ""
                  }`}
                >
                  <div className="img">
                    <img src={category?.image} alt="" />
                  </div>
                  <h6>{category?.name}</h6>
                </buttton>
              </SwiperSlide>
            ))}
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
                          ?.name
                      }
                    : null
                }
                onChange={(e) => handleSetParams(e?.value, "country")}
                options={countries?.map(({ id, name }) => ({
                  value: id,
                  label: name
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
                    { value: "rent", label: t("rent") }
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
