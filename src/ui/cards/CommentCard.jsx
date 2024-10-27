import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmationModal from "../modals/ConfirmationModal";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

function CommentCard({ comment, targetComment, setTargetComment, className }) {
  const { t } = useTranslation();
  const authedUser = useSelector((state) => state.clientData.client);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const deleteComment = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/client/delete-comment", {
        id: targetComment?.id,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        setTargetComment(null);
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
                  setShowDeleteModal(true);
                  setTargetComment(comment);
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
              setTargetComment={setTargetComment}
              deleteComment={deleteComment}
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
