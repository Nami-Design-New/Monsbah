import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function AskCard({
  ask,
  setShowModal,
  setTargetAsk,
  className,
}) {
  const { t } = useTranslation();

  return (
    <div className={`AskCard ${className}`}>
      <Link to={`/profile/${ask?.user_id}`} className="user_info">
        <div className="img">
          <img
            src={ask?.user_image}
            alt={ask?.user_name}
            onError={(e) => (e.target.src = "/images/icons/user_default.png")}
          />
        </div>
        <div className="info">
          <h6>{ask?.user_name}</h6>
          <span>{ask?.date}</span>
        </div>
      </Link>
      <div className="content">
        <p>{ask?.description}</p>
        <button
          onClick={() => {
            setShowModal(true);
            setTargetAsk(ask);
          }}
        >
          <i className="fa-regular fa-eye"></i>
          {t("viewComments")} ({ask?.count_comments})
        </button>
      </div>
    </div>
  );
}
