import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import useGetAskComments from "../../hooks/comments/useGetAskComments";
import CommentCard from "../cards/CommentCard";
import AddCommentForm from "../../components/AddCommentForm";
import axiosInstance from "../../utils/axiosInstance";
import PageLoader from "./../loaders/PageLoader";

function ViewAsk({ showModal, setShowModal, ask }) {
  const { t } = useTranslation();
  const { data: comments, isLoading } = useGetAskComments(ask?.id);

  const queryClient = useQueryClient();

  const [targetComment, setTargetComment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e, comment, setValue) => {
    e.preventDefault();
    setLoading(true);

    const payLoad = {
      question_id: ask?.id,
      comment: comment,
    };

    if (targetComment) {
      payLoad.parent_id = targetComment.id;
    }

    try {
      const res = await axiosInstance.post(
        "/client/store-question-comment",
        payLoad
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        setValue("");
        setTargetComment(null);
        queryClient.invalidateQueries({ queryKey: ["ask-comments"] });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (id) => {
    try {
      const res = await axiosInstance.post("/client/delete-question-comment", {
        id: id,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["ask-comments"] });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <Modal
      centered
      show={showModal}
      onHide={() => setShowModal(false)}
      className="viewAskModal"
    >
      <Modal.Header className="pb-0" closeButton />
      <Modal.Body>
        <Link to={`/profile/${ask?.user?.id}`} className="user_info">
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
        <p>{ask?.description}</p>
        <div className="comments">
          <h6 className="mb-2">
            {t("comments")} ({ask?.count_comments})
          </h6>
          <div className="wrapper">
            {isLoading ? (
              <PageLoader minHeight={"50vh"} />
            ) : (
              <>
                {comments?.map((comment) => (
                  <CommentCard
                    comment={comment}
                    key={comment?.id}
                    setTargetComment={setTargetComment}
                    deleteComment={deleteComment}
                  />
                ))}
              </>
            )}
          </div>
        </div>
        <AddCommentForm
          loading={loading}
          handleSubmit={handleSubmit}
          targetComment={targetComment}
        />
      </Modal.Body>
    </Modal>
  );
}

export default ViewAsk;
