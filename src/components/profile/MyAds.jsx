import useGetUserProducts from "../../hooks/products/useGetUserProducts";

export default function MyAds() {
  const { data: products } = useGetUserProducts();
  return <div className="row m-0"></div>;
}
