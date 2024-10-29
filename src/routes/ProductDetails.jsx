import { useEffect, useState } from "react";
import ProductSlider from "../components/product-details/ProductSlider";
import useGetProduct from "../hooks/products/useGetProduct";
import UserCard from "../components/product-details/UserCard";
import ProductInfo from "../components/product-details/ProductInfo";
import Comments from "../components/product-details/Comments";
import PageLoader from "../ui/loaders/PageLoader";
import ErrorPage from "./ErrorPage";
import SectionHeader from "../components/layout/SectionHeader";

function ProductDetails() {
  const { data, isLoading } = useGetProduct();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  return isLoading ? (
    <PageLoader />
  ) : (
    <>
      {!product ? (
        <ErrorPage />
      ) : (
        <section className="product_details">
          <SectionHeader />
          <div className="container p-0">
            <div className="row m-0">
              <div className="col-lg-7 col-12 p-lg-3 p-2">
                <ProductSlider product={product} />
                <ProductInfo product={product} setProduct={setProduct} />
              </div>
              <div className="col-lg-5 col-12 p-lg-3 p-2 ">
                <div className="d-flex flex-column gap-4">
                  <UserCard product={product} setProduct={setProduct} />
                  <Comments product={product} setProduct={setProduct} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ProductDetails;
