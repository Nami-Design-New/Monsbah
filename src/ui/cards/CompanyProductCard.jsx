import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isValidVideoExtension } from "../../utils/helpers";
import axiosInstance from "../../utils/axiosInstance";
import ImageLoad from "../loaders/ImageLoad";
import ConfirmationModal from "../modals/ConfirmationModal";

export default function CompanyProductCard({ product }) {
  const { t } = useTranslation();
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const lang = useSelector((state) => state.language.lang);
  const queryClient = useQueryClient();

  const handleOpenDeleteModal = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const performDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await axiosInstance.post("/company/delete-product", {
        product_id: product?.id,
      });
      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        queryClient.invalidateQueries({ queryKey: ["product"] });
        queryClient.invalidateQueries({ queryKey: ["allProducts"] });
        queryClient.invalidateQueries({ queryKey: ["company-products"] });
      }
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(false);
  };

  return (
    <>
      <Link
        aria-label="Product"
        to={`/product/${product.id}`}
        className="product_vertical"
      >
        <Link
          aria-label="Product"
          to={`/product/${product.id}`}
          className="img"
        >
          {isValidVideoExtension(product?.image) ? (
            <video
              src={product.image}
              autoPlay
              loop
              muted
              playsInline
              onLoadedMetadata={handleImageLoad}
            />
          ) : (
            <img src={product.image} onLoad={handleImageLoad} alt="" />
          )}
          <ImageLoad isImageLoaded={isImageLoaded} />
          <div className="thums_pro">
            <span className="type">{t(`${product?.type}`)}</span>
            {product?.is_popular ? (
              <span className="popular">
                <img src="/images/icons/crown.svg" alt="" /> {t("popular")}
              </span>
            ) : null}
          </div>
        </Link>

        <div className="content">
          <Link
            aria-label="Product"
            to={`/product/${product.id}`}
            className="title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{product.name}</h3>

            <div className="d-flex align-items-center gap-2">
              <Link
                aria-label="Profile"
                to={`/edit-product/${product.id}`}
                className={`favourite_btn dark`}
                onClick={(e) => e.stopPropagation()}
              >
                <i className="fa-light fa-pen-to-square"></i>
              </Link>
              <span
                onClick={handleOpenDeleteModal}
                className={`favourite_btn dark delete`}
              >
                <i className="fa-light fa-trash"></i>
              </span>
            </div>
          </Link>

          <h3 className="price">
            <span>{product?.price}</span> {product?.currency?.name}
          </h3>

          <ul>
            <li className="w-100">
              <i className="fa-light fa-location-dot"> </i>{" "}
              {product.country?.name}
              {lang === "ar" ? "،" : ","} {product.city?.name}
            </li>

            <li style={{ flex: 1 }}>
              <Link aria-label="Profile">
                <i className="fa-light fa-user"></i> {product.user?.username}
              </Link>
            </li>

            <li>
              <i className="fa-light fa-clock"></i> {product.date}
            </li>
          </ul>
        </div>
      </Link>

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
