import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmationModal from "../modals/ConfirmationModal";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

function CommentCard({ comment, setTargetComment, className, type }) {
  const { t } = useTranslation();
  const authedUser = useSelector((state) => state.clientData.client);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const deleteComment = async () => {
    setLoading(true);
    const requestBody = {
      id: comment?.id,
    };
    if (comment?.parent_id) {
      requestBody.parent_id = comment?.parent_id;
    }
    try {
      const res = await axiosInstance.post(
        `/client/${
          type === "question" ? "delete-question-comment" : "delete-comment"
        }`,
        requestBody
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        queryClient.invalidateQueries({ queryKey: ["ask-comments"] });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="CommentWrapper">
      <div className="CommentCard">
        <Link
          to={`${
            +comment?.user_id === +authedUser?.id
              ? "/profile"
              : `/profile/${comment?.user_id}`
          }`}
          className="img"
        >
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
              <button
                onClick={() => {
                  deleteComment();
                }}
              >
                {t("delete")}
              </button>
            )}
          </div>
        </div>
      </div>

      {comment?.replies?.length > 0 && (
        <div className={`replies ${className}`}>
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              deleteComment={deleteComment}
              setTargetComment={setTargetComment}
              type={type}
            />
          ))}
        </div>
      )}
      <ConfirmationModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        eventFun={deleteComment}
        loading={loading}
        type="delete"
        buttonText={t("chat.delete")}
        text={t("areYouSureYouWantDeleteThisComment")}
      />
    </div>
  );
}

export default CommentCard;
