import { Link } from "react-router-dom";

function NotificationCard({ item, onClick, bgColor }) {
  return (
    <Link
      aria-label="Notification"
      to={item?.type === "product" ? `/product/${item?.product_id}` : `/chats`}
      className={`notificationCard ${bgColor}`}
      key={item.id}
      onClick={() => onClick?.()}
    >
      <div className="img">
        <img src={item?.image} alt={item?.name} />
      </div>
      <div className="notify">
        <h6>{item?.name}</h6>
        <p>{item?.date}</p>
      </div>
    </Link>
  );
}

export default NotificationCard;
