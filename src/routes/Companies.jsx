import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import CompanyCard from "../ui/cards/CompanyCard";
import CompanyLoader from "../ui/loaders/CompanyLoader";
import ProductLoader from "../ui/loaders/ProductLoader";
import ProductVertical from "../ui/cards/ProductVertical";
import FilterBox from "../components/filter/FilterBox";
import useGetCompanies from "../hooks/companies/useGetCompanies";
import useGetCompanyProducts from "../hooks/products/useGetCompanyProducts";

export default function Companies() {
  const sectionRef = useRef(null);
  const [searchParams] = useSearchParams();
  const hasCategory = !!searchParams.get("category");
  const hasSubcategory = !!searchParams.get("sub_category");
  const shouldShowCompanies = hasCategory && !hasSubcategory;

  const {
    data: products,
    isLoading: isLoadingProducts,
    fetchNextPage: fetchNextPageProducts,
    hasNextPage: hasNextPageProducts,
    isFetchingNextPage: isFetchingNextPageProducts,
  } = useGetCompanyProducts();

  const {
    data: companies,
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
      <FilterBox className="mt-4" page="companies" />

      <section className="companies_section" ref={sectionRef}>
        <div className="container p-1">
          {shouldShowCompanies ? (
            <div className="row">
              {companies?.map((company) => (
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
              {products?.map((product, index) => (
                <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
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
