import { useEffect, useRef } from "react";
import ProductLoader from "../../ui/loaders/ProductLoader";

import ProductVertical from "../../ui/cards/ProductVertical";
import useGetProducts from "../../hooks/products/useGetProducts";

function AdsTab({ user }) {
  const sectionRef = useRef(null);
  const {
    data: products,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetProducts();

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
    <section className="products_section" ref={sectionRef}>
        <div className="row">
          {products?.map((product, index) => (
            <div className="col-lg-6 col-12 p-2" key={index}>
              {+product?.user?.id === +user?.id ? (
                <ProductVertical product={product} className="my-ad" />
              ) : null}
            </div>
          ))}

          {(isLoading || isFetchingNextPage) && (
            <>
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div className="col-lg-6 col-12 p-2" key={`loader-${index}`}>
                    <ProductLoader />
                  </div>
                ))}
            </>
          )}
        </div>
    </section>
  );
}

export default AdsTab;
