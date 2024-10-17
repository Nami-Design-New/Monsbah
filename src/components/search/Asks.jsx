import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AskCard from "../../ui/cards/AskCard";
import useGetAsks from "../../hooks/search/useGetAsks";
import AskLoader from "../../ui/loaders/AskLoader";
import ViewAsk from "../../ui/modals/ViewAsk";

export default function Asks({ sectionRef }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [targetAsk, setTargetAsk] = useState({});

  const {
    data: aks,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAsks();

  console.log(aks);

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
        <h6 className="title">{t("popularAsks")}</h6>
        <p className="desc">{t("popularAsksDesc")}</p>
      </div>

      {aks?.map((ask, index) => (
        <div className="col-lg-6 col-12 p-2" key={index}>
          <AskCard
            ask={ask}
            setShowModal={setShowModal}
            setTargetAsk={setTargetAsk}
          />
        </div>
      ))}

      {(isLoading || isFetchingNextPage) && (
        <>
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <div className="col-lg-6 col-12 p-2" key={index}>
                <AskLoader />
              </div>
            ))}
        </>
      )}

      <ViewAsk
        showModal={showModal}
        setShowModal={setShowModal}
        ask={targetAsk}
      />
    </>
  );
}
