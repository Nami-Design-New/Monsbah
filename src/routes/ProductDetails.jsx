import ProductSlider from "../components/product-details/ProductSlider";
import useGetProduct from "../hooks/products/useGetProduct";
import UserCard from "../components/product-details/UserCard";
import ProductInfo from "../components/product-details/ProductInfo";
import Comments from "../components/product-details/Comments";
import PageLoader from "../ui/loaders/PageLoader";

function ProductDetails() {
  const { data: product, isLoading } = useGetProduct();

  return isLoading ? (
    <PageLoader />
  ) : (
    <section className="product_details">
      <div className="container p-0">
        <div className="row m-0">
          <div className="col-lg-7 col-12 p-lg-3 p-2">
            <ProductSlider product={product} />
            <ProductInfo product={product} />
          </div>
          <div className="col-lg-5 col-12 p-lg-3 p-2 ">
            <div className="d-flex flex-column gap-4">
              <UserCard product={product} />
              <Comments product={product} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
