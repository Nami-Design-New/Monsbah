import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import PageLoader from "../loaders/PageLoader";
import useGetComments from "../../hooks/companies/useGetComments";
import CommentCard from "../cards/CommentCard";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import AddRateAndCommentForm from "../../components/search/AddRateAndCommentForm";
import { useSelector } from "react-redux";

export default function CommentsReviewsModal({
  showModal,
  setShowModal,
  company,
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [targetComment, setTargetComment] = useState(null);
  const { data: comments, isLoading } = useGetComments(company?.id);

  const clientData = useSelector((state) => state.clientData.client);
  const handleSubmit = async (e, formData, setFormData) => {
    e.preventDefault();
    setLoading(true);
    const payLoad = {
      profile_id: clientData?.id,
      ...formData,
    };
    if (targetComment) {
      payLoad.parent_id = targetComment.id;
    }
    try {
      const res = await axiosInstance.post("/client/store-rate", payLoad);
      if (res.status === 200) {
        toast.success(res.data.message);
        setFormData({
          comment: "",
          rate: "",
        });
        setTargetComment(null);
        queryClient.invalidateQueries({ queryKey: ["company-comments"] });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      centered
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setTargetComment(null);
      }}
      className="viewAskModal"
    >
      <Modal.Header className="pb-0" closeButton />
      <Modal.Body>
        <div className="comments">
          <h6 className="mb-2">{t("comments")}</h6>
          <div className="wrapper">
            {isLoading ? (
              <PageLoader minHeight={"50vh"} />
            ) : (
              <>
                {comments?.length === 0 ? (
                  <h6 className="noComments">{t("noComments")}</h6>
                ) : (
                  <>
                    {comments?.map((comment) => (
                      <CommentCard
                        comment={comment}
                        key={comment?.id}
                        setTargetComment={setTargetComment}
                        type="question"
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <AddRateAndCommentForm
          loading={loading}
          handleSubmitRate={handleSubmit}
          setTargetComment={setTargetComment}
          targetComment={targetComment}
        />
      </Modal.Body>
    </Modal>
  );
}
