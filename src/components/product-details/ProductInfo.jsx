import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../ui/modals/ConfirmationModal";

function ProductInfo({ product }) {
  const { t } = useTranslation();
  const { client } = useSelector((state) => state.clientData);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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
    setLoading(true);
    try {
      const res = await axiosInstance.post("/client/store-favorite", {
        product_id: product?.id,
      });
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["product"] });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    } finally {
      setLoading(false);
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
        queryClient.invalidateQueries({ queryKey: ["product"] });
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
            onClick={handleFavorite}
            disabled={loading}
            className={`favorite ${product?.is_favorite ? "active" : ""}`}
          >
            <i className="fa-light fa-heart"></i>
          </button>
        ) : (
          <Dropdown
            onClick={(e) => e.stopPropagation()}
            className="favorite dropdown-icon"
          >
            <Dropdown.Toggle id="dropdown-basic" className="upload-btn">
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
            <span className="action-btn report">
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
    </>
  );
}

export default ProductInfo;
