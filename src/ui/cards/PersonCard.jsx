import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function PersonCard({ person }) {
  const { t } = useTranslation();
  return (
    <Link to={`/profile/${person?.id}`} className="PersonCard">
      <div className="img_info">
        <div className="img">
          <img
            src={person?.image}
            onError={(e) => (e.target.src = "/images/icons/user_default.png")}
            alt="person"
          />
        </div>
        <div className="info">
          <h4>{person?.name}</h4>
          <p>{person?.city?.name}</p>
        </div>
      </div>
      {person?.is_follow ? (
        <button className="follow_btn">
          <i className="fa-light fa-user-minus"></i>{" "}
          <span>{t("unfollow")}</span>
        </button>
      ) : (
        <button className="follow_btn">
          <i className="fa-regular fa-user-plus"></i> <span>{t("follow")}</span>
        </button>
      )}
    </Link>
  );
}

export default PersonCard;
