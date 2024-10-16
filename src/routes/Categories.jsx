import { useEffect, useState } from "react";
import useGetCategories from "../hooks/settings/useGetCategories";
import useGetSubCategories from "../hooks/settings/useGetSubCategories";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryLoader from "../ui/loaders/CategoryLoader";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import DataLoader from "../ui/loaders/DataLoader";

function Categories() {
  const { t } = useTranslation();

  const userCity = useSelector((state) => state.clientData.client.city);
  const userCountry = useSelector((state) => state.clientData.client.country);

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

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
    if (!searchParams.get("category") && categories?.length > 0) {
      searchParams.set("category", categories?.[0]?.id);
      setSearchParams(searchParams);
    }
  });

  return (
    <div className="categories-page">
      <section className="explore_ads">
        <div className="container d-flex flex-column gap-4">
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
                {categories?.map((category) => (
                  <SwiperSlide key={category.id}>
                    <buttton
                      onClick={() => {
                        searchParams.delete("sub_category");
                        searchParams.delete("type");
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
                {/* <SwiperSlide key={"country"}>
                  <buttton
                    onClick={() => {
                      searchParams.delete("sub_category");
                      searchParams.delete("type");
                      setSearchParams(searchParams);
                      setSelectedSubCategory(null);
                      handleSetParams(userCountry?.id, "category");
                    }}
                    className={`category ${
                      category?.id === Number(selectedCategory) ? "active" : ""
                    }`}
                  >
                    <div className="img">
                      <img src={category?.image} alt="" />
                    </div>
                    <h6>{category?.name}</h6>
                  </buttton>
                </SwiperSlide> */}
              </>
            )}
          </Swiper>

          {subcategoriesLoading ? (
            <DataLoader minHeight="100px" maxHeight="100px" />
          ) : (
            subCategories?.length > 0 && (
              <Swiper
                slidesPerView="auto"
                className="categories_slider subcategories_slider"
              >
                {subCategories?.map((sub) => (
                  <SwiperSlide key={sub.id}>
                    <Link
                      to={`/?category=${selectedCategory}&country=${searchParams.get(
                        "country"
                      )}&sub_category=${sub.id}`}
                      onClick={() => handleSetParams(sub.id, "sub_category")}
                      className={`category sub d-flex align-items-center flex-column gap-4 ${
                        sub?.id === Number(selectedSubCategory) ? "active" : ""
                      }`}
                    >
                      <div className="image-wrapper">
                        <img src={sub?.image} alt={sub?.name} />
                      </div>
                      <h6>{sub?.name}</h6>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            )
          )}
        </div>
      </section>
    </div>
  );
}

export default Categories;
