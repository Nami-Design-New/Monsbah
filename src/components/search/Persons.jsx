import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import PersonCard from "../../ui/cards/PersonCard";
import PersonLoader from "../../ui/loaders/PersonLoader";
import useGetPersons from "../../hooks/search/useGetPersons";

export default function Persons({ sectionRef }) {
  const { t } = useTranslation();
  const {
    data: persons,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPersons();

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
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, sectionRef]);

  return (
    <>
      <div className="col-12 p-2">
        <h6 className="title">{t("popularPersons")}</h6>
        <p className="desc">{t("popularPersonsDesc")}</p>
      </div>

      {persons?.map((person, index) => (
        <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
          <PersonCard person={person} />
        </div>
      ))}

      {(isLoading || isFetchingNextPage) && (
        <>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
                <PersonLoader />
              </div>
            ))}
        </>
      )}
    </>
  );
}
