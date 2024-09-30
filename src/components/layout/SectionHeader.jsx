import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SectionHeader({ title, backLinks }) {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="section-head">
      <div className="container">
        <div className="small_nav">
          <div className="Arrow_icon" onClick={() => navigate(-1)}>
            <i className="fa-light fa-arrow-left"></i>
          </div>

          <div className="text">
            <h1>{t("header.AboutUs")}</h1>
            <div className="page_name">
              <Link to="/">{t("header.home")}</Link>

              <i className="fa-solid fa-chevron-right"></i>

              {backLinks?.map((link, index) => (
                <Fragment key={index}>
                  <Link to={`/${link}`} key={index}>
                    {t(`routes.${link}`)}
                  </Link>
                  <span className=""> / </span>
                </Fragment>
              ))}

              <h6 className="m-0">
                {title
                  ? ` ${title}`
                  : ` ${t(`routes.${location.pathname.split("/")[1]}`)}`}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionHeader;
