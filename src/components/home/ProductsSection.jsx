import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import CategoryLoader from "../../ui/loaders/CategoryLoader";
import useGetProducts from "../../hooks/products/useGetProducts";
import ProductVertical from "../../ui/cards/ProductVertical";
import ProductLoader from "../../ui/loaders/ProductLoader";
import useGetCategories from "./../../hooks/settings/useGetCategories";
import useGetSubCategories from "../../hooks/settings/useGetSubCategories";
import useGetCountries from "./../../hooks/settings/useGetCountries";
import useGetCities from "./../../hooks/settings/useGetCities";

export default function ProductsSection() {
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  const lang = useSelector((state) => state.language.lang);
  const userCity = useSelector((state) => state.clientData.client.city);
  const userCountry = useSelector((state) => state.clientData.client.country);

  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState();
  const [country, setCountry] = useState(null);
  const [productType, setProductType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetProducts();
  const { data: countries, countriesLoading } = useGetCountries();
  const { data: cities } = useGetCities(country, country ? true : false);
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const { data: subCategories } = useGetSubCategories(
    selectedCategory,
    selectedCategory ? true : false
  );

  const [selectedCountry, setSelectedCountry] = useState("");

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

  useEffect(() => {
    if (!data?.pages) return;
    setProducts((prevProducts) => {
      const newProducts = data.pages.flatMap((page) => page.data);

      const mergedProducts = newProducts.map((newProduct) => {
        const existingProduct = prevProducts?.find(
          (p) => p.id === newProduct.id
        );
        return existingProduct
          ? { ...newProduct, ...existingProduct }
          : newProduct;
      });
      return mergedProducts;
    });
  }, [data]);

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
      setProducts([]);
    }
  };

  useEffect(() => {
    if (countries?.length > 0 && searchParams.get("country")) {
      setSelectedCountry(
        countries?.filter((c) => c?.id === +searchParams.get("country"))[0]
      );
    }
  }, [countries, searchParams]);

  return (
    <>
      {/* filter */}
      <section className="explore_ads">
        <div className="container d-flex flex-column gap-3">
          {/* ask button */}
          {selectedCountry ? (
            <Link
              to={`/asks?country-id=${selectedCountry?.id}`}
              className={`askCustomCountry ${
                selectedCountry?.id === Number(searchParams.get("country")) &&
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
          ) : (
            <button className={`askCustomCountry skeleton`}>
              <h6></h6>
              <div className="shapes">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          )}

          {/* categories slider */}
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
                  <SwiperSlide key={category.id} className="p-1">
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
          {selectedCategory && subCategories?.length > 0 && (
            <Swiper slidesPerView="auto" className="categories_slider">
              <SwiperSlide className="p-1">
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
                <SwiperSlide key={sub.id} className="p-1">
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

      {/* products */}
      <section className="products_section" ref={sectionRef}>
        <div className="container p-1">
          <div className="row">
            {products?.map((product, index) => (
              <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
                <ProductVertical
                  product={product}
                  isShowAction={false}
                  setProducts={setProducts}
                />
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
        </div>
      </section>
    </>
  );
}
