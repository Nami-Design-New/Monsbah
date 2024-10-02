import ProductSlider from "../components/product-details/ProductSlider";
import useGetProduct from "../hooks/products/useGetProduct";
import UserCard from "../components/product-details/UserCard";

function ProductDetails() {
  const { data: product } = useGetProduct();

  return (
    <section className="product_details">
      <div className="container">
        <div className="row m-0">
          <div className="col-lg-7 col-12 p-lg-3 p-2">
            <ProductSlider product={product} />
          </div>
          <div className="col-lg-5 col-12 p-lg-3 p-2 ">
            <div className="d-flex flex-column gap-3">
              <UserCard product={product} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
