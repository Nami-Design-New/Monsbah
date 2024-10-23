import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CommentCard({ comment, deleteComment, setTargetComment }) {
  const { t } = useTranslation();
  const authedUser = useSelector((state) => state.clientData.client);

  return (
    <div className="CommentWrapper">
      <div className="CommentCard">
        <Link to={`${
            +comment?.user_id === +authedUser?.id
              ? "/profile"
              : `/profile/${comment?.user_id}`
          }`} className="img">
          <img
            src={comment?.user_image}
            alt={comment?.user_name}
            onError={(e) => (e.target.src = "/images/icons/user_default.png")}
          />
        </Link>
        <div className="content">
          <h6>{comment?.user_name}</h6>
          <div className="comment">
            <p>{comment?.comment}</p>
          </div>
          <div className="actions">
            <span>{comment?.date}</span>

            <button onClick={() => setTargetComment(comment)}>
              {t("reply")}
            </button>

            {comment?.user_id === authedUser?.id && (
              <button onClick={() => deleteComment(comment?.id)}>
                {t("delete")}
              </button>
            )}
          </div>
        </div>
      </div>

      {comment?.replies?.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              setTargetComment={setTargetComment}
              deleteComment={deleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentCard;
