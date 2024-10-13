import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setClientData, logout } from "../../redux/slices/clientData";
import { useNavigate } from "react-router-dom";

import ConfirmationModal from "../../ui/modals/ConfirmationModal";
import { Dropdown } from "react-bootstrap";

function MainInfoTab({ user, lang }) {
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

  return (
    <>
      <div className="Dashpoard_section w-100">
        <div className="row m-0">
          <div className="cover-logo-wrapper col-12 p-2 mb-4 d-flex flex-column justify-content-between align-items-between">
            <div className="cover-wrapper">
              {coverError ? null : (
                <img
                  src={coverError ? "/public/images/banner.png" : user?.cover}
                  alt="user cover image"
                  onError={() => setCoverError(true)}
                />
              )}
            </div>
            <div className="user-dropdown d-flex algin-items-center justify-content-end">
              <Dropdown>
                <Dropdown.Toggle className="butn" id="dropdown-basic">
                  <i className="fa-regular fa-ellipsis-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {isMyAccount ? (
                    <Dropdown.Item onClick={() => setShowDeleteModal(true)}>
                      {t("profile.deleteAccount")}
                    </Dropdown.Item>
                  ) : null}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="Profile_info">
              <div className="logo-wrapper">
                <img
                  src={avatarError ? "/images/icons/user.svg" : user?.image}
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
                {/* {user?.about_en || user?.about_ar ? (
                <p>{lang === "en" ? user?.about_en : user?.about_ar}</p>
              ) : null} */}
              </div>
            </div>
          </div>

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

          <div className="col-lg-6 col-12 p-2">
            <div className="user-details-box">
              <span className="title">{t("profile.city")}</span>
              <span className="value">
                {lang === "en" ? user?.city?.name_en : user?.city?.name_ar}
              </span>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 p-2">
            <div className="Box_rate">
              <h2>{user?.["following-count"]}</h2>

              <div className="icon_rate">
                <p>{t("Followings")}</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 p-2">
            <div className="Box_rate">
              <h2>{user?.["followers-count"]}</h2>

              <div className="icon_rate">
                <p>{t("Followers")}</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 p-2">
            <div className="Box_rate">
              <h2>{user?.["rate-count"]}</h2>

              <div className="icon_rate">
                <p>{t("Rating")}</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 p-2">
            <div className="Box_rate">
              <h2>{user?.["ads-count"]}</h2>

              <div className="icon_rate">
                <p>{t("Ad")}</p>
              </div>
            </div>
          </div>
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
