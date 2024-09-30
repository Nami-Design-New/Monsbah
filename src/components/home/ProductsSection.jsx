import useGetProducts from "../../hooks/products/useGetProducts";
import ProductVertical from "../../ui/cards/ProductVertical";
import ProductLoader from "../../ui/loaders/ProductLoader";

export default function ProductsSection() {
  const { data: products, isLoading } = useGetProducts();
  return (
    <section className="products_section">
      <div className="container">
        <div className="row">
          {isLoading ? (
            <>
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
                    <ProductLoader />
                  </div>
                ))}
            </>
          ) : (
            <>
              {products?.map((product) => (
                <div className="col-lg-4 col-md-6 col-12 p-2" key={product.id}>
                  <ProductVertical product={product} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
