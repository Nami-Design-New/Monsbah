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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e, comment, setValue) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/client/store-comment", {
        product_id: product?.id,
        comment: comment,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        setValue("");
        queryClient.invalidateQueries({ queryKey: ["comments"] });
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
      const res = await axiosInstance.post("/client/delete-comment", {
        id: id,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["comments"] });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="comments_container">
      <div className="header">
        <h5>
          {t("comments")} <span>( 0 )</span>
        </h5>
      </div>

      <div className="comments_wrapper">
        {comments?.data?.length === 0 ? (
          <h6 className="noComments">{t("noComments")}</h6>
        ) : (
          <>
            {comments?.data?.map((comment) => (
              <CommentCard
                comment={comment}
                key={comment?.id}
                deleteComment={deleteComment}
              />
            ))}
          </>
        )}
      </div>

      <AddCommentForm loading={loading} handleSubmit={handleSubmit} />
    </div>
  );
}
