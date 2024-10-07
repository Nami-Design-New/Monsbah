import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CommentCard({ comment, deleteComment }) {
  const { t } = useTranslation();
  const authedUser = useSelector((state) => state.clientData.client);

  return (
    <div className="CommentCard">
      <Link to={`/profile/${comment?.user_id}`} className="user_info">
        <div className="img">
          <img
            src={comment?.user_image}
            alt={comment?.user_name}
            onError={(e) => (e.target.src = "/images/icons/user_default.png")}
          />
        </div>
        <div className="info">
          <h6>{comment?.user_name}</h6>
          <span>{comment?.date}</span>
        </div>
      </Link>
      <p>{comment?.comment}</p>
      <div className="btns">
        <button>
          <i className="fa-solid fa-reply-all"></i> {t("reply")}
        </button>
        {comment?.user_id === authedUser?.id && (
          <button onClick={() => deleteComment(comment?.id)}>
            <i className="fa-solid fa-trash"></i> {t("delete")}
          </button>
        )}
        <button>
          <i className="fa-solid fa-flag"></i> {t("report")}
        </button>
      </div>
    </div>
  );
}

export default CommentCard;
