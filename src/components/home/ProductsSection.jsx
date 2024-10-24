import { useEffect, useRef, useState } from "react";
import useGetProducts from "../../hooks/products/useGetProducts";
import ProductVertical from "../../ui/cards/ProductVertical";
import ProductLoader from "../../ui/loaders/ProductLoader";

export default function ProductsSection() {
  const sectionRef = useRef(null);
  const [products, setProducts] = useState();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetProducts();

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
  }, [data?.pages]);

  return (
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
  );
}
