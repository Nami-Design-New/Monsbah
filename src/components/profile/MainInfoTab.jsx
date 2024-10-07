import { useState } from "react";
import { useTranslation } from "react-i18next";

function MainInfoTab({ user, lang }) {
  const { t } = useTranslation();
  const [avatarError, setAvatarError] = useState("");

  console.log(user);

  return (
    <div className="Dashpoard_section w-100">
      <div className="row m-0">
        <div className="col-lg-12 col-md-12 col-12 p-2 mb-4">
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
  );
}

export default MainInfoTab;
