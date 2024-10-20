import { Link } from "react-router-dom";

function NotificationCard({ item }) {
  console.log(item);

  return (
    <Link
      to={item?.type === "product" ? `/product/${item?.product_id}` : `/chats`}
      className="notificationCard"
      key={item.id}
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
