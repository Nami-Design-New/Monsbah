import { useEffect, useRef } from "react";
import useGetUserProducts from "../../hooks/products/useGetUserProducts";
import ProductVertical from "../../ui/cards/ProductVertical";
import ProductLoader from "../../ui/loaders/ProductLoader";
import EmptyData from "../../ui/EmptyData";
import { useTranslation } from "react-i18next";

export default function MyAds({ handleChangeTab, isActive }) {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const {
    data: products,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUserProducts(isActive);

  console.log(products?.length);

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
    <section className="products_section w-100" ref={sectionRef}>
      <div className="row">
        <div className="col-12 p-2 d-flex justify-content-end">
          <span
            className="customBtn d-flex align-items-center gap-2 justify-content-center m-0"
            style={{ cursor: "pointer" }}
            onClick={() => handleChangeTab("addAd")}
          >
            <i className="fa-regular fa-circle-plus"></i>
            <h6 className="m-0" style={{ lineHeight: 1 }}>
              {t("header.addPost")}
            </h6>
          </span>
        </div>
        {products?.map((product, index) => (
          <div className="col-lg-6 col-12 p-2" key={index}>
            <ProductVertical product={product} className="my-ad" />
          </div>
        ))}

        {(isLoading || isFetchingNextPage) && (
          <>
            {Array(2)
              .fill(0)
              .map((_, index) => (
                <div className="col-lg-6 col-12 p-2" key={`loader-${index}`}>
                  <ProductLoader className="my-ad" />
                </div>
              ))}
          </>
        )}
      </div>
      {!isLoading &&
        !isFetchingNextPage &&
        products?.length === 0 &&
        !hasNextPage && (
          <EmptyData minHeight="200px">
            <p>{t("ads.noAdsForMe")}</p>
          </EmptyData>
        )}
    </section>
  );
}
