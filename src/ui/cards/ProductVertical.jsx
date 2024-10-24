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

function ProductVertical({
  product,
  className,
  setProducts,
  isShowAction = true,
}) {
  const { t } = useTranslation();
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const client = useSelector((state) => state.clientData.client);

  const queryClient = useQueryClient();

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    setProducts((prev) =>
      prev?.map((p) => {
        if (p.id === product.id) {
          return { ...p, is_favorite: !p.is_favorite };
        }
        return p;
      })
    );
    try {
      const res = await axiosInstance.post("/client/store-favorite", {
        product_id: product?.id,
      });
      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        queryClient.invalidateQueries({ queryKey: ["product"] });
        queryClient.invalidateQueries({ queryKey: ["products"] });
        queryClient.invalidateQueries({ queryKey: ["allProducts"] });
        queryClient.invalidateQueries({ queryKey: ["user-products"] });
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
        queryClient.invalidateQueries({ queryKey: ["user-products"] });
        queryClient.invalidateQueries({ queryKey: ["allProducts"] });
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
    <div className={`product_vertical ${className}`}>
      <Link to={`/product/${product.id}`} className="img">
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
        <span className="type">{t(`${product?.type}`)}</span>
      </Link>

      <div className="content">
        <Link to={`/product/${product.id}`} className="title">
          <h3>{product.name}</h3>
          {client?.id !== product?.user?.id ? (
            <span
              disabled={loading}
              onClick={handleFavorite}
              className={`favourite_btn dark ${
                product?.is_favorite ? "active" : ""
              }`}
            >
              <i className="fa-light fa-heart"></i>
            </span>
          ) : isShowAction ? (
            <div className="d-flex align-items-center gap-2">
              <Link
                to={`/profile?tab=addAd&product_id=${product?.id}`}
                className={`favourite_btn dark`}
                onClick={(e) => e.stopPropagation()}
              >
                <i className="fa-light fa-pen-to-square"></i>
              </Link>
              <span
                onClick={handleOpenDeleteModal}
                className={`favourite_btn dark`}
              >
                <i className="fa-light fa-trash"></i>
              </span>
            </div>
          ) : null}
        </Link>

        <h3 className="price">
          <span>{product?.price}</span> {product?.currency?.name}
        </h3>

        <ul>
          <li className="w-100">
            <i className="fa-light fa-location-dot"> </i>{" "}
            {product.country?.name}, {product.city?.name}
          </li>

          <li style={{ flex: 1 }}>
            <Link
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
      <ConfirmationModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        type="delete"
        eventFun={performDelete}
        loading={deleteLoading}
        buttonText={t("confirm")}
        text={t("ads.areYouSureYouWantToDelete")}
      />
    </div>
  );
}

export default ProductVertical;
