import { useTranslation } from "react-i18next";

const ProfileFile = () => {
  const { t } = useTranslation();


  return (
    <div className="Dashpoard_section">
      <div className="row m-0">
        <div className="col-lg-12 col-md-12 col-12 p-2 mb-5">
          <div className="Profile_info">
            <div className="img">
              <img src="/images/icons/ava.jpg" alt="profile" />
            </div>
            <div className="name">
              <h1>{t("Name")}</h1>
              <p>{t("descreption")}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-12 p-2">
          <div className="Box_rate">
            <h2>280</h2>

            <div className="icon_rate">
              <p>{t("Followings")}</p>
              <p>{t("Followings")}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-12 p-2">
          <div className="Box_rate">
            <h2>200</h2>

            <div className="icon_rate">
              <p>{t("Followers")}</p>
              <p>{t("Followers")}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-12 p-2">
          <div className="Box_rate">
            <h2>12</h2>

            <div className="icon_rate">
              <p>{t("Rating")}</p>
              <p>{t("Rating")}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-12 p-2">
          <div className="Box_rate">
            <h2>12</h2>

            <div className="icon_rate">
              <p>{t("Ad")}</p>
              <p>{t("Ad")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFile;
