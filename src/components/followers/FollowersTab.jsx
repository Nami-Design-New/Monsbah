import PersonCard from "../../ui/cards/PersonCard";
import PersonLoader from "../../ui/loaders/PersonLoader";
import { useEffect } from "react";
import useGetFollowers from "../../hooks/follow/useGetFollowers";

function FollowersTab({ sectionRef }) {
  const {
    data: persons,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetFollowers();

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

export default FollowersTab;
