import { useEffect } from "react";
import useGetProducts from "../../hooks/products/useGetProducts";
import ProductVertical from "../../ui/cards/ProductVertical";
import ProductLoader from "../../ui/loaders/ProductLoader";

export default function ProductsSection() {
  const {
    data: products,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetProducts();

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll = window.innerHeight + window.pageYOffset;

      if (
        scrollHeight - currentScroll < 100 &&
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
    <section className="products_section">
      <div className="container">
        <div className="row">
          {products?.map((product, index) => (
            <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
              <ProductVertical product={product} />
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
  );
}
