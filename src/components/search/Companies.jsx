import { useEffect, useRef } from "react";
import CompanyCard from "../../ui/cards/CompanyCard";
import CompanyLoader from "../../ui/loaders/CompanyLoader";
import useGetCompanies from "../../hooks/search/useGetCompanies";

export default function Companies() {
  const sectionRef = useRef(null);
  const {
    data: companies,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCompanies();

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

  return (
    <section className="companies_section" ref={sectionRef}>
      <div className="container p-1">
        <div className="row">
          {companies?.map((company) => (
            <div className="col-lg-4 col-md-6 col-12 p-2" key={company?.id}>
              <CompanyCard company={company} />
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
                    <CompanyLoader />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
