import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import useGetComments from "../../hooks/products/useGetComments";
import AddCommentForm from "../AddCommentForm";
import CommentCard from "../../ui/cards/CommentCard";
import axiosInstance from "../../utils/axiosInstance";

export default function Comments({ product }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data: comments } = useGetComments();
  const [targetComment, setTargetComment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e, comment, setValue) => {
    e.preventDefault();
    setLoading(true);
    const payLoad = {
      product_id: product?.id,
      comment: comment,
    };

    if (targetComment) {
      payLoad.parent_id = targetComment.id;
    }

    try {
      const res = await axiosInstance.post("/client/store-comment", payLoad);
      if (res.status === 200) {
        toast.success(res.data.message);
        setValue("");
        queryClient.invalidateQueries({ queryKey: ["comments"] });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (id) => {
    setTargetComment(null);
    try {
      const res = await axiosInstance.post("/client/delete-comment", {
        id: id,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["comments"] });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    }
  };

  return (
    <div className="comments_container">
      <div className="header">
        <h5>
          {t("comments")} <span>( {product?.count_comments} )</span>
        </h5>
      </div>

      <div className="comments_wrapper">
        {comments?.data?.length === 0 ? (
          <h6 className="noComments">{t("noComments")}</h6>
        ) : (
          <>
            {comments?.data?.map((comment) => (
              <CommentCard
                key={comment?.id}
                comment={comment}
                deleteComment={deleteComment}
                className="fromComments"
                setTargetComment={setTargetComment}
              />
            ))}
          </>
        )}
      </div>

      <AddCommentForm
        loading={loading}
        handleSubmit={handleSubmit}
        targetComment={targetComment}
        setTargetComment={setTargetComment}
      />
    </div>
  );
}
