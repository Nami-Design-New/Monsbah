import { useEffect, useRef } from "react";
import AskLoader from "../../ui/loaders/AskLoader";
import useGetRates from "../../hooks/rates/useGetRates";
import RateCard from "../../ui/cards/RateCard";

function RatesTab({ user }) {
  const sectionRef = useRef(null);
  const {
    data: rates,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetRates(user?.id);

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
    <section className="products_section" ref={sectionRef}>
      <div className="container">
        <div className="row">
          {rates?.map((rate, index) => (
            <div className="col-lg-6 col-12 p-2" key={index}>
              <RateCard rate={rate} className="my-ad" />
            </div>
          ))}

          {(isLoading || isFetchingNextPage) && (
            <>
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div className="col-lg-6 col-12 p-2" key={`loader-${index}`}>
                    <AskLoader />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default RatesTab;
