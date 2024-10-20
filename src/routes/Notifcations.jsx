import SectionHeader from "../components/layout/SectionHeader";
import useGetNotifications from "../hooks/notifications/useGetNotifications";
import NotificationCard from "../ui/cards/NotificationCard";
import DataLoader from "../ui/loaders/DataLoader";

const Notifcations = () => {
  const { isLoading, data: notifications } = useGetNotifications();

  return (
    <>
      <SectionHeader />
      <div className="notifications_section">
        <div className="container">
          <div className="row justify-content-center">
            {isLoading ? (
              <DataLoader minHeight="200px" />
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
