import { useEffect, useRef } from "react";
import useGetNotifications from "../hooks/notifications/useGetNotifications";
import NotificationCard from "../ui/cards/NotificationCard";
import NotificationLoader from "../ui/loaders/NotificationLoader";

const Notifcations = ({ bgColor }) => {
  const {
    isLoading,
    data: notifications,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetNotifications();
  const sectionRef = useRef(null);

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
    <>
      <div className="notifications_section" ref={sectionRef}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 d-flex flex-column gap-3">
              {notifications?.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  item={notification}
                  bgColor={bgColor}
                />
              ))}
              {(isLoading || isFetchingNextPage) && (
                <>
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <NotificationLoader key={index} />
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifcations;
