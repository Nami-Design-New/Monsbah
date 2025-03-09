import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { isValidVideoExtension } from "../../utils/helpers";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import ImageLoad from "../loaders/ImageLoad";
import axiosInstance from "../../utils/axiosInstance";
import ConfirmationModal from "../modals/ConfirmationModal";
import useAuth from "../../hooks/useAuth";

function ProductVertical({
  product,
  className,
  setProducts,
  isShowAction = true,
  removeItem = false,
}) {
  const { t } = useTranslation();
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const client = useSelector((state) => state.clientData.client);

  const lang = useSelector((state) => state.language.lang);

  const queryClient = useQueryClient();

  const { isAuthed } = useAuth();

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    if (removeItem) {
      setProducts((prev) => prev?.filter((p) => p.id !== product.id));
    }

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
        queryClient.invalidateQueries({ queryKey: ["user-products"] });
        queryClient.invalidateQueries({ queryKey: ["user-favorites"] });
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
        queryClient.invalidateQueries({ queryKey: ["allProducts"] });
        queryClient.invalidateQueries({ queryKey: ["user-products"] });
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
        className={`product_vertical ${className}`}
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
            {isAuthed &&
              (client?.id !== product?.user?.id && removeItem ? (
                <span
                  disabled={loading}
                  onClick={handleFavorite}
                  className={"favourite_btn  active"}
                >
                  <i className="fa-light fa-heart"></i>
                </span>
              ) : isShowAction ? (
                <div className="d-flex align-items-center gap-2">
                  <Link
                    aria-label="Profile"
                    to={`/profile?tab=addAd&product_id=${product?.id}`}
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
              ) : null)}
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
              <Link
                aria-label="Profile"
                to={`${
                  +product?.user?.id === +client?.id
                    ? "/profile"
                    : `/profile/${product?.user?.id}`
                }`}
              >
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

export default ProductVertical;
