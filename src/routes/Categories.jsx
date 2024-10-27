import { useEffect, useState } from "react";
import useGetCategories from "../hooks/settings/useGetCategories";
import useGetSubCategories from "../hooks/settings/useGetSubCategories";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import useGetCountries from "../hooks/settings/useGetCountries";
import useGetCities from "../hooks/settings/useGetCities";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import PageLoader from "../ui/loaders/PageLoader";
function Categories() {
  const { t } = useTranslation();
  const userCity = useSelector((state) => state.clientData.client.city);
  const userCountry = useSelector((state) => state.clientData.client.country);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { data: countries, isLoading: countriesLoading } = useGetCountries();
  const { data: cities, isLoading: citiesLoading } = useGetCities(
    selectedCountry?.id,
    selectedCountry?.id && searchParams.get("ask") ? true : false
  );
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const { data: subCategories, isLoading: subcategoriesLoading } =
    useGetSubCategories(selectedCategory, selectedCategory ? true : false);
  useEffect(() => {
    if (searchParams.get("category")) {
      setSelectedCategory(searchParams.get("category"));
    }
    if (searchParams.get("sub_category")) {
      setSelectedSubCategory(searchParams.get("sub_category"));
    }
    if (!searchParams.get("country")) {
      handleSetParams(6, "country");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, t]);
  useEffect(() => {
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
  useEffect(() => {
    if (
      !searchParams.get("category") &&
      !searchParams.get("ask") &&
      categories?.length > 0
    ) {
      searchParams.set("category", categories?.[0]?.id);
      setSearchParams(searchParams);
    }
  });
  useEffect(() => {
    if (countries?.length > 0 && searchParams.get("country")) {
      setSelectedCountry(
        countries?.filter((c) => c?.id === +searchParams.get("country"))[0]
      );
    }
  }, [countries, searchParams]);
  return (
    <div className="categories-page">
      <section className="explore_ads">
        <div className="container d-flex flex-column gap-3">
          {categoriesLoading ||
          countriesLoading ||
          subcategoriesLoading ||
          citiesLoading ? (
            <PageLoader />
          ) : (
            <>
              {selectedCountry ? (
                <Link
                  to={`/asks?country-id=${selectedCountry?.id}`}
                  className={`askCustomCountry ${
                    selectedCountry?.id ===
                      Number(searchParams.get("country")) &&
                    Number(searchParams.get("ask"))
                      ? "active"
                      : ""
                  }`}
                >
                  <div className="img">
                    <i className="fa-regular fa-comment-plus"></i>
                  </div>
                  <h6 className="selectedName">{`${t("ask")} ${
                    selectedCountry?.name
                  }`}</h6>

                  <div className="shapes">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </Link>
              ) : null}
              <div className="d-flex" style={{ position: "relative" }}>
                <div
                  className="col-lg-3 col-md-4 col-5 p-2"
                  style={{
                    height: "fit-content",
                    position: "sticky",
                    top: "74px",
                  }}
                >
                  <Swiper
                    slidesPerView="auto"
                    className="categories_slider column-direction"
                  >
                    {categoriesLoading || countriesLoading ? null : (
                      <>
                        {categories?.map((category) => (
                          <SwiperSlide key={category.id} className="p-1">
                            <buttton
                              onClick={() => {
                                searchParams.delete("sub_category");
                                setSearchParams(searchParams);
                                setSelectedSubCategory(null);
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
                </div>
                <div className="col-lg-9 col-md-8 col-7 p-2">
                  {subcategoriesLoading || citiesLoading
                    ? null
                    : (subCategories?.length > 0 || cities?.length > 0) && (
                        <div className="categories_slider subcategories_slider">
                          {subCategories?.map((sub) => (
                            <div
                              className="col-lg-4 col-md-6 col-12 p-1"
                              key={sub.id}
                            >
                              <Link
                                to={`/?category=${selectedCategory}&sub_category=${sub.id}`}
                                onClick={() =>
                                  handleSetParams(sub.id, "sub_category")
                                }
                                className={`category sub d-flex align-items-center flex-column gap-4 ${
                                  sub?.id === Number(selectedSubCategory)
                                    ? "active"
                                    : ""
                                }`}
                              >
                                <div className="image-wrapper">
                                  <img src={sub?.image} alt={sub?.name} />
                                </div>
                                <h6>{sub?.name}</h6>
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
export default Categories;
