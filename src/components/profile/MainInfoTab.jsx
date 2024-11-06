import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setClientData, logout } from "../../redux/slices/clientData";
import axiosInstance from "../../utils/axiosInstance";
import ConfirmationModal from "../../ui/modals/ConfirmationModal";

function MainInfoTab({ user, lang, handleChangeTab }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const [coverError, setCoverError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMyAccount = !id || Number(id) === Number(user?.id);

  const handleDeleteAccount = async () => {
    try {
      setDeleteLoading(true);
      const res = await axiosInstance.post("/client/auth/delete-account");
      if (res.data.code === 200) {
        delete axiosInstance.defaults.headers.common["Authorization"];
        toast.success(t("cart.orderSuccess"));
        dispatch(setClientData({}));
        dispatch(logout());
        navigate("/");
      } else {
        toast.error(res.message);
        console.error(res.message);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: user?.name,
          url: window.location.href + "/" + user?.id,
        })
        .then(() => t("Shared successfully"))
        .catch((error) => t("Error sharing:", error));
    } else {
      alert(t("share_not_supported"));
    }
  };

  return (
    <>
      <div className="Dashpoard_section w-100">
        <div className="row m-0">
          <div className="cover-logo-wrapper col-12 p-2 mb-4 d-flex flex-column justify-content-end align-items-start">
            <div className="cover-wrapper">
              {coverError ? null : (
                <img
                  src={
                    coverError || !user?.cover
                      ? "/images/banner.png"
                      : user?.cover
                  }
                  alt="user cover image"
                  onError={() => setCoverError(true)}
                />
              )}
            </div>
            <div className="actions-wrapper d-flex justify-content-end mb-auto w-100">
              <div className="share_btn" onClick={handleShare}>
                <i className="fa-regular fa-share-nodes"></i>
              </div>
            </div>
            <div className="Profile_info">
              <div className="logo-wrapper">
                <img
                  src={
                    avatarError || !user?.image
                      ? "/images/icons/user.svg"
                      : user?.image
                  }
                  alt="user logo image"
                  onError={() => setAvatarError(true)}
                />
              </div>
              <div className="name">
                {user?.name ? (
                  <h1>
                    {lang === "en" ? user?.username : user?.name}{" "}
                    <span>
                      ({" "}
                      {lang === "en"
                        ? user?.state?.name_en
                        : user?.state?.name_ar}{" "}
                      )
                    </span>
                  </h1>
                ) : null}
                {user?.email ? <p>{user?.email}</p> : null}
              </div>
            </div>
          </div>

          <div className="col-12 p-2">
            {user?.about_en || user?.about_ar ? (
              <p>{lang === "en" ? user?.about_en : user?.about_ar}</p>
            ) : null}
          </div>

          {user?.country ? (
            <div className="col-lg-6 col-12 p-2">
              <div className="user-details-box">
                <span className="title">{t("profile.country")}</span>
                <span className="value">
                  <div className="img-wrapper">
                    <img src={user?.country?.image} alt="user logo image" />
                  </div>
                  {user?.country?.name}
                </span>
              </div>
            </div>
          ) : null}

          {user?.city ? (
            <div className="col-lg-6 col-12 p-2">
              <div className="user-details-box">
                <span className="title">{t("profile.city")}</span>
                <span className="value">
                  {lang === "en" ? user?.city?.name_en : user?.city?.name_ar}
                </span>
              </div>
            </div>
          ) : null}

          {user?.["following-count"] || +user?.["following-count"] === 0 ? (
            <Link
              aria-label="Followings"
              to="/followers/followings"
              className="col-lg-3 col-md-6 col-6 p-2"
            >
              <div className="Box_rate">
                <h2>{user?.["following-count"]}</h2>

                <div className="icon_rate">
                  <p>{t("Followings")}</p>
                </div>
              </div>
            </Link>
          ) : null}

          {user?.["followers-count"] || +user?.["followers-count"] === 0 ? (
            <Link
              aria-label="Followers"
              to="/followers"
              className="col-lg-3 col-md-6 col-6 p-2"
            >
              <div className="Box_rate">
                <h2>{user?.["followers-count"]}</h2>

                <div className="icon_rate">
                  <p>{t("Followers")}</p>
                </div>
              </div>
            </Link>
          ) : null}

          {user?.["ads-count"] || +user?.["ads-count"] === 0 ? (
            <div className="col-lg-3 col-md-6 col-6 p-2">
              <div
                className="Box_rate"
                style={{ cursor: "pointer" }}
                onClick={() => handleChangeTab("ads")}
              >
                <h2>{user?.["ads-count"]}</h2>

                <div className="icon_rate">
                  <p>{t("Ad")}</p>
                </div>
              </div>
            </div>
          ) : null}

          {user?.["rate-count"] || +user?.["rate-count"] === 0 ? (
            <div className="col-lg-3 col-md-6 col-6 p-2">
              <div className="Box_rate">
                <h2>{user?.["rate-count"]}</h2>

                <div className="icon_rate">
                  <p>{t("rates")}</p>
                </div>
              </div>
            </div>
          ) : null}

          {isMyAccount ? (
            <div className="col-12 d-flex mt-4 align-items-center justify-content-end">
              <span
                className="delete-account"
                onClick={() => setShowDeleteModal(true)}
              >
                {t("profile.deleteAccount")}
              </span>
            </div>
          ) : null}
        </div>
      </div>
      <ConfirmationModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        type="delete"
        eventFun={handleDeleteAccount}
        loading={deleteLoading}
        buttonText={t("delete")}
        text={t("auth.areYouSureYouWantToDeleteAccount")}
      />
    </>
  );
}

export default MainInfoTab;
