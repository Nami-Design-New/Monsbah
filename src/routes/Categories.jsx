import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
import useGetCategories from "../hooks/settings/useGetCategories";
import useGetSubCategories from "../hooks/settings/useGetSubCategories";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import CategoryLoader from "./../ui/loaders/CategoryLoader";
import SubCategoriesLoader from "./../ui/loaders/SubCategoriesLoader";

function Categories() {
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
  }, [searchParams]);

  const handleSetParams = (value, type) => {
    if (value) {
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
    <section className="categories-page explore_ads">
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-md-3 col-4 p-lg-2 p-1">
            <div className="categories_sidebar">
              {categoriesLoading ? (
                <>
                  {[...Array(5)].map((_, index) => (
                    <CategoryLoader key={index} />
                  ))}
                </>
              ) : (
                <>
                  {categories?.map((category) => (
                    <buttton
                      key={category.id}
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
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="col-lg-10 col-md-9 col-8 p-lg-2 p-1">
            <div className="categories_slider subcategories_slider">
              {subcategoriesLoading ? (
                <>
                  {[...Array(3)].map((_, index) => (
                    <div className=" col-xl-3 col-md-4 col-6 p-1" key={index}>
                      <SubCategoriesLoader />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {subCategories?.map((sub) => (
                    <div className=" col-xl-3 col-md-4 col-6 p-1" key={sub.id}>
                      <Link
                        to={`/?category=${selectedCategory}&sub_category=${sub.id}`}
                        onClick={() => handleSetParams(sub.id, "sub_category")}
                        className={`category sub d-flex align-items-center flex-column gap-2 ${
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Categories;
