import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import ConfirmationModal from "../../ui/modals/ConfirmationModal";
import ReportModal from "../../ui/modals/ReportModal";
import useAuth from "../../hooks/useAuth";
import AuthModal from "../auth/AuthModal";

function ProductInfo({ product, setProduct }) {
  const { t } = useTranslation();
  const { client } = useSelector((state) => state.clientData);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [showAuthModal, setShowAuthModal] = useState(false);

  const { isAuthed } = useAuth();

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product?.name,
          text: product?.description,
          url: window.location.href,
        })
        .then(() => t("Shared successfully"))
        .catch((error) => t("Error sharing:", error));
    } else {
      alert(t("share_not_supported"));
    }
  };

  const handleFavorite = async () => {
    setProduct((prev) => ({
      ...prev,
      is_favorite: prev?.is_favorite === 1 ? 0 : 1,
    }));
    try {
      const res = await axiosInstance.post(
        `/${localStorage.getItem("userType")}/store-favorite`,
        {
          product_id: product?.id,
        }
      );
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["product"] });
        queryClient.invalidateQueries({ queryKey: ["products"] });
        queryClient.invalidateQueries({ queryKey: ["allProducts"] });
        queryClient.invalidateQueries({ queryKey: ["user-favorites"] });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    }
  };

  const handleOpenDeleteModal = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const performDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await axiosInstance.post("/client/delete-product", {
        product_id: product?.id,
      });
      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        navigate("/");
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
    <>
      <div className="priceInfo mt-3">
        <h4 className="price">
          <span>{product?.price}</span> {product?.currency?.name}
        </h4>

        {client?.id !== product?.user?.id ? (
          <button
            aria-label="Toggle Favorite"
            onClick={handleFavorite}
            className={`favorite ${product?.is_favorite ? "active" : ""}`}
          >
            <i className="fa-light fa-heart"></i>
          </button>
        ) : (
          <Dropdown
            onClick={(e) => e.stopPropagation()}
            className="favorite dropdown-icon"
          >
            <Dropdown.Toggle
              aria-label="Product Actions"
              id="dropdown-basic"
              className="upload-btn"
            >
              <i className="fa-regular fa-ellipsis-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profile?tab=addAd&product_id=${product?.id}`}
              >
                <i className="fa-regular fa-pen-to-square"></i>
                {t("edit")}
              </Dropdown.Item>
              <Dropdown.Item onClick={handleOpenDeleteModal}>
                <i className="fa-regular fa-trash"></i>
                {t("delete")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}

        <div className="actions">
          <span className="action-btn report" onClick={handleShare}>
            <i className="fa-sharp fa-light fa-share-nodes"></i> {t("share")}
          </span>
          {client?.id !== product?.user?.id && (
            <span
              className="action-btn report"
              onClick={() => {
                isAuthed ? setShowReportModal(true) : setShowAuthModal(true);
              }}
            >
              <i className="fa-regular fa-flag"></i> {t("report")}
            </span>
          )}
        </div>
      </div>

      <div className="itemInfo mt-3">
        <h3 className="title">{product?.name}</h3>

        <div className="itemBottom">
          <div className="location">
            <i className="fa-light fa-location-dot"></i>
            <span>
              {product?.country?.name}, {product?.city?.name}
            </span>
          </div>
          <div className="time">
            <i className="fa-light fa-clock"></i> {product?.create_at}
          </div>
        </div>
        <p className="description">{product?.description}</p>
      </div>
      <ConfirmationModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        type="delete"
        eventFun={performDelete}
        loading={deleteLoading}
        buttonText={t("confirm")}
        text={t("ads.areYouSureYouWantToDelete")}
      />
      <ReportModal
        id={product?.id}
        type="product"
        showModal={showReportModal}
        setShowModal={setShowReportModal}
      />
      <AuthModal
        type={"login"}
        show={showAuthModal}
        setShow={setShowAuthModal}
      />
    </>
  );
}

export default ProductInfo;
