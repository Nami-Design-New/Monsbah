import { useEffect, useRef, useState } from "react";
import AskCard from "../../ui/cards/AskCard";
import AskLoader from "../../ui/loaders/AskLoader";
import ViewAsk from "../../ui/modals/ViewAsk";
import useGetAsks from "../../hooks/search/useGetAsks";
import { useSelector } from "react-redux";

function QuestionsTab() {
  const [showModal, setShowModal] = useState(false);
  const [targetAsk, setTargetAsk] = useState({});
  const sectionRef = useRef();

  const user = useSelector((state) => state.clientData.client);

  const {
    data: aks,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAsks();

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
    <section className="search_section px-2 w-100" ref={sectionRef}>
      <div className="row px-2">
        {aks?.map((ask, index) =>
          ask?.user_id === user?.id ? (
            <div className="col-lg-6 col-12 p-2" key={index}>
              <AskCard
                ask={ask}
                setShowModal={setShowModal}
                setTargetAsk={setTargetAsk}
                className="my-ask"
              />
            </div>
          ) : null
        )}
      </div>

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
    </section>
  );
}

export default QuestionsTab;
