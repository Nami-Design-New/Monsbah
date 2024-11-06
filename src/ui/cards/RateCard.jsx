import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ConfirmationModal from "../modals/ConfirmationModal";

function RateCard({ rate, className }) {
  const { t } = useTranslation();
  const authedUser = useSelector((state) => state.clientData.client);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();

  const deleteRate = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/client/delete-rate", {
        id: rate?.id,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["allRates"] });
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
      <div className={`CommentCard ${className}`}>
        <Link
          aria-label="Profile"
          to={`${
            +rate?.user_id === +authedUser?.id
              ? "/profile"
              : `/profile/${rate?.user_id}`
          }`}
          className="img"
        >
          <img
            src={rate?.user_image}
            alt={rate?.user_name}
            onError={(e) => (e.target.src = "/images/icons/user_default.png")}
          />
        </Link>
        <div className="content">
          <h6>{rate?.user_name}</h6>
          <div className="comment">
            <p>{rate?.comment}</p>
          </div>
          <div className="actions">
            <span>{rate?.date}</span>

            {rate?.user_id === authedUser?.id && (
              <button aria-label="Delete" onClick={() => setShowModal(true)}>
                {t("delete")}
              </button>
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        eventFun={deleteRate}
        loading={loading}
        type="delete"
        buttonText={t("chat.delete")}
        text={t("areYouSureYouWantDeleteThisRate")}
      />
    </div>
  );
}

export default RateCard;
