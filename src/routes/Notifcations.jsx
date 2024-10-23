import useGetNotifications from "../hooks/notifications/useGetNotifications";
import NotificationCard from "../ui/cards/NotificationCard";
import PageLoader from "../ui/loaders/PageLoader";

const Notifcations = () => {
  const { isLoading, data: notifications } = useGetNotifications();

  return (
    <>
      <div className="notifications_section">
        <div className="container">
          <div className="row justify-content-center">
            {isLoading ? (
              <PageLoader />
            ) : (
              <div className="col-12 d-flex flex-column gap-3">
                {notifications?.map((notification) => (
                  <NotificationCard key={notification.id} item={notification} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifcations;
