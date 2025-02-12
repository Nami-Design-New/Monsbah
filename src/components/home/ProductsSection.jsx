import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { isValidVideoExtension } from "../../utils/helpers";
import useGetProducts from "../../hooks/products/useGetProducts";
import ProductVertical from "../../ui/cards/ProductVertical";
import ProductLoader from "../../ui/loaders/ProductLoader";
import FilterBox from "../filter/FilterBox";
import ImageLoad from "../../ui/loaders/ImageLoad";

export default function ProductsSection() {
  const sectionRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoaded(false);
  };

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
    <>
      <FilterBox showAsk={true} />
      {localStorage.getItem("userType") === "client" ? (
        <section className="ction" ref={sectionRef}>
          <div className="container p-1">
            <div className="row">
              {products?.map((product, index) => (
                <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
                  <ProductVertical product={product} isShowAction={false} />
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
      ) : (
        <div className="home_products_grid">
          <div className="container">
            <div className="row mb-5" ref={sectionRef}>
              <div className="company_products_grid">
                {products?.map((product, index) => (
                  <Link
                    className="product_img"
                    key={index}
                    to={`/product/${product?.id}`}
                  >
                    {isValidVideoExtension(product?.image) ? (
                      <video
                        src={product.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        onLoadedMetadata={handleImageLoad}
                      />
                    ) : (
                      <img
                        src={product.image}
                        onLoad={handleImageLoad}
                        alt=""
                      />
                    )}
                    <Link to={`/companies/${product?.user?.id}`} className="company">
                      <div className="img">
                        <img src={product?.user?.image} alt="" />
                      </div>
                      <h6>{product?.user?.name}</h6>
                    </Link>
                    <ImageLoad isImageLoaded={isImageLoaded} />
                  </Link>
                ))}

                {(isLoading || isFetchingNextPage) && (
                  <>
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <div className="product_img skeleton" key={index}></div>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
