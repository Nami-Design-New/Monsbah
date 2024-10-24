import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useGetAds from "../../hooks/search/useGetAds";
import ProductVertical from "../../ui/cards/ProductVertical";
import ProductLoader from "../../ui/loaders/ProductLoader";

export default function Ads({ sectionRef }) {
  const { t } = useTranslation();
  const [products, setProducts] = useState();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAds();

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
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, sectionRef]);

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

  return (
    <>
      <div className="col-12 p-2">
        <h6 className="title">{t("popularAds")}</h6>
        <p className="desc">{t("popularAdsDesc")}</p>
      </div>

      {products?.map((ad, index) => (
        <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
          <ProductVertical
            product={ad}
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
              <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
                <ProductLoader />
              </div>
            ))}
        </>
      )}
    </>
  );
}
