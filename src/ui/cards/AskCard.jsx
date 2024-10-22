import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CreateCountryAsk from "../modals/CreateCountryAsk";
import { useSelector } from "react-redux";
import ConfirmationModal from "../modals/ConfirmationModal";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";

export default function AskCard({
  ask,
  setShowModal,
  setTargetAsk,
  className,
}) {
  const { t } = useTranslation();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const user = useSelector((state) => state.clientData.client);

  console.log(ask);

  const queryClient = useQueryClient();

  const handleOpenDeleteModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const performDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await axiosInstance.post("/client/delete-question", {
        id: ask?.id,
      });
      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["allQuestions"],
        });
        queryClient.invalidateQueries({
          queryKey: ["asks"],
        });
      }
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className={`AskCard ${className}`}>
      <Link
        to={`/profile/${ask?.user_id}`}
        className="user_info"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="img">
          <img
            src={ask?.user_image}
            alt={ask?.user_name}
            onError={(e) => (e.target.src = "/images/icons/user_default.png")}
          />
        </div>
        <div className="title">
          <div className="info">
            <h6>{ask?.user_name}</h6>
            <span>{ask?.date}</span>
          </div>
          {ask?.user_id === user?.id ? (
            <div className="d-flex align-items-center gap-2">
              <span
                className={`favourite_btn dark`}
                style={{ display: "none" }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // setShowEditModal(true);
                }}
              >
                <i className="fa-light fa-pen-to-square"></i>
              </span>
              <span
                onClick={handleOpenDeleteModal}
                className={`favourite_btn dark`}
              >
                <i className="fa-light fa-trash"></i>
              </span>
            </div>
          ) : null}
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

      <CreateCountryAsk
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        targetedAsk={ask}
        country_id={user?.country?.id}
        city_id={user?.city?.id}
        title={`${t("editAsk")}`}
      />

      <ConfirmationModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        type="delete"
        eventFun={performDelete}
        loading={deleteLoading}
        buttonText={t("confirm")}
        text={t("areYouSureYouWantToDeleteAsk")}
      />
    </div>
  );
}
