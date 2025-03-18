import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import useGetProducts from "../../hooks/products/useGetProducts";
import ProductVertical from "../../ui/cards/ProductVertical";
import ProductLoader from "../../ui/loaders/ProductLoader";
import FilterBox from "../filter/FilterBox";
import CompanyLoader from "../../ui/loaders/CompanyLoader";
import CompanyCard from "../../ui/cards/CompanyCard";
import useGetCompanies from "../../hooks/companies/useGetCompanies";

export default function ProductsSection() {
  const sectionRef = useRef(null);
  const [searchParams] = useSearchParams();
  const hasCategory = searchParams.get("category");
  const hasSubcategory = searchParams.get("sub_category");

  const shouldShowCompanies =
    !hasSubcategory && hasCategory && localStorage.getItem("userType") === "company";

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    fetchNextPage: fetchNextPageProducts,
    hasNextPage: hasNextPageProducts,
    isFetchingNextPage: isFetchingNextPageProducts,
  } = useGetProducts();

  const {
    data: companiesData,
    isLoading: isLoadingCompanies,
    fetchNextPage: fetchNextPageCompanies,
    hasNextPage: hasNextPageCompanies,
    isFetchingNextPage: isFetchingNextPageCompanies,
  } = useGetCompanies();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const section = sectionRef.current;
      const sectionBottom = section.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;

      if (sectionBottom <= viewportHeight + 200) {
        if (shouldShowCompanies) {
          if (hasNextPageCompanies && !isFetchingNextPageCompanies) {
            fetchNextPageCompanies();
          }
        } else {
          if (hasNextPageProducts && !isFetchingNextPageProducts) {
            fetchNextPageProducts();
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    shouldShowCompanies,
    hasNextPageCompanies,
    isFetchingNextPageCompanies,
    fetchNextPageCompanies,
    hasNextPageProducts,
    isFetchingNextPageProducts,
    fetchNextPageProducts,
  ]);

  return (
    <>
      <FilterBox showAsk={true} />

      <section className="products_section" ref={sectionRef}>
        <div className="container p-1">
          {shouldShowCompanies ? (
            <div className="row">
              {companiesData?.map((company) => (
                <div className="col-lg-4 col-md-6 col-12 p-2" key={company?.id}>
                  <CompanyCard company={company} />
                </div>
              ))}
              {(isLoadingCompanies || isFetchingNextPageCompanies) && (
                <>
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        className="col-lg-4 col-md-6 col-12 p-2"
                        key={`loader-${index}`}
                      >
                        <CompanyLoader />
                      </div>
                    ))}
                </>
              )}
            </div>
          ) : (
            <div className="row">
              {productsData?.map((product, index) => (
                <div
                  className="col-lg-4 col-md-6 col-12 p-2"
                  key={product?.id || index}
                >
                  <ProductVertical product={product} isShowAction={false} />
                </div>
              ))}
              {(isLoadingProducts || isFetchingNextPageProducts) && (
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
          )}
        </div>
      </section>
    </>
  );
}
