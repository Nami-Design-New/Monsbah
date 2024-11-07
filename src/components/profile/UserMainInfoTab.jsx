import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

function UserMainInfoTab({ user, lang }) {
  const { t } = useTranslation();

  const [coverError, setCoverError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleFollow = async (type) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        type === "follow"
          ? "/client/store-follower"
          : "/client/delete-follower",
        {
          profile_id: user?.id,
        }
      );
      if (res.status === 200) {
        setLoading(false);
        queryClient.invalidateQueries(["user-profile", user?.id]);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  <div className="Dashpoard_section w-100">
    <div className="row m-0">
      <div className="cover-logo-wrapper col-12 p-2 mb-4 d-flex flex-column justify-content-end align-items-start">
        <div className="cover-wrapper">
          {coverError ? null : (
            <img
              src={
                coverError || !user?.cover ? "/images/banner.webp" : user?.cover
              }
              alt="user cover image"
              onError={() => setCoverError(true)}
            />
          )}
        </div>
        <div className="actions-wrapper d-flex justify-content-end mb-auto w-100">
          {user?.is_follow ? (
            <div
              className="action-btn follow_btn"
              onClick={() => handleFollow("unfollow")}
              disabled={loading}
            >
              <i className="fa-light fa-user-minus"></i>{" "}
              <span>{t("unfollow")}</span>
            </div>
          ) : (
            <div
              className="action-btn follow_btn"
              onClick={() => handleFollow("follow")}
              disabled={loading}
            >
              <i className="fa-regular fa-user-plus"></i>{" "}
              <span>{t("follow")}</span>
            </div>
          )}
        </div>
        <div className="Profile_info w-100 flex-wrap">
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
                {user?.name}{" "}
                <span>
                  ({" "}
                  {lang === "en" ? user?.state?.name_en : user?.state?.name_ar}{" "}
                  )
                </span>
              </h1>
            ) : null}
            {user?.email ? <p>{user?.email}</p> : null}
          </div>
        </div>
      </div>

      {user?.about_en || user?.about_ar ? (
        <div className="col-12 p-2">
          <p>{lang === "en" ? user?.about_en : user?.about_ar}</p>
        </div>
      ) : null}

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
        <div className="col-lg-3 col-6 p-2">
          <div className="Box_rate">
            <h2>{user?.["following-count"]}</h2>

            <div className="icon_rate">
              <p>{t("Followings")}</p>
            </div>
          </div>
        </div>
      ) : null}

      {user?.["followers-count"] || +user?.["followers-count"] === 0 ? (
        <div className="col-lg-3 col-6 p-2">
          <div className="Box_rate">
            <h2>{user?.["followers-count"]}</h2>

            <div className="icon_rate">
              <p>{t("Followers")}</p>
            </div>
          </div>
        </div>
      ) : null}

      {user?.["rate-count"] || +user?.["rate-count"] === 0 ? (
        <div className="col-lg-3 col-6 p-2">
          <div className="Box_rate">
            <h2>{user?.["rate-count"]}</h2>

            <div className="icon_rate">
              <p>{t("Rating")}</p>
            </div>
          </div>
        </div>
      ) : null}

      {user?.["ads-count"] || +user?.["ads-count"] === 0 ? (
        <div className="col-lg-3 col-6 p-2">
          <div className="Box_rate">
            <h2>{user?.["ads-count"]}</h2>

            <div className="icon_rate">
              <p>{t("Ad")}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  </div>;
}

export default UserMainInfoTab;
