import useGetProducts from "../../hooks/products/useGetProducts";
import ProductVertical from "../../ui/cards/ProductVertical";

export default function ProductsSection() {
  const { data: products, isLoading } = useGetProducts();
  return (
    <section className="products_section">
      <div className="container">
        <div className="row">
          {products?.map((product) => (
            <div className="col-lg-4 col-md-6 col-12 p-2" key={product.id}>
              <ProductVertical product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
