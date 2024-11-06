import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useGetCategories from "../../hooks/settings/useGetCategories";

export default function Footer() {
  const { t } = useTranslation();
  const { data: categories } = useGetCategories();

  return (
    <footer>
      <div className="container">
        <div className="row m-0">
          <div className="col-lg-4 col-12 p-2">
            <div className="about_company">
              <div className="logo">
                <Link aria-label="Home" to="/">
                  <img
                    loading="lazy"
                    alt="logo"
                    src="/images/branding/icon.svg"
                  />
                </Link>
              </div>
              <div className="text">
                <p>{t("aboutApp")}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-6 p-2">
            <div className="col">
              <h3>{t("importantLinks")}</h3>
              <ul>
                <li>
                  <Link aria-label="About" to="/about-us">
                    <span>
                      <i className="fa-sharp fa-light fa-arrow-right"></i>
                    </span>
                    {t("aboutUs")}
                  </Link>
                </li>
                <li>
                  <Link aria-label="Asks" to="/asks">
                    <span>
                      <i className="fa-sharp fa-light fa-arrow-right"></i>
                    </span>
                    {t("header.asks")}
                  </Link>
                </li>
                <li>
                  <Link aria-label="Contact Us" to="/contact-us">
                    <span>
                      <i className="fa-sharp fa-light fa-arrow-right"></i>
                    </span>
                    {t("contactUs")}
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="Terms and Conditions"
                    to="/terms-and-conditions"
                  >
                    <span>
                      <i className="fa-sharp fa-light fa-arrow-right"></i>
                    </span>
                    {t("tearmsAndConditions")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-6 p-2">
            <div className="col">
              <h3>{t("popularCategories")}</h3>
              <ul>
                {categories?.map((category) => (
                  <li key={category.id}>
                    <Link
                      aria-label="Category"
                      to={`/?category=${category.id}`}
                    >
                      <span>
                        <i className="fa-sharp fa-light fa-arrow-right"></i>
                      </span>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-12 p-2">
            <div className="col">
              <h3>{t("downloadApp")}</h3>
              <div className="btns">
                <Link
                  aria-label="Apple App"
                  to="https://apps.apple.com/kw/app/%D9%85%D9%86%D8%A7%D8%B3%D8%A8%D8%A9/id1589937521?l=ar"
                  target="_blank"
                >
                  <img src="/images/icons/appStore.svg" alt="" />
                </Link>
                <Link
                  aria-label="Android App"
                  target="_blank"
                  to="https://play.google.com/store/apps/details?id=com.app.monasba&pcampaignid=web_share"
                >
                  <img src="/images/icons/playStore.svg" alt="" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="copy_rights">
              <p>
                {t("copyRights")} &copy;
                {new Date().getFullYear()}. {t("allRights")}{" "}
                <Link aria-label="Home" to="/">
                  {t("appName")}
                </Link>
              </p>
              <div className="social_media">
                <ul>
                  <li>
                    <Link
                      aria-label="You Tube"
                      to="https://youtube.com/@monsbah?si=GoCRIgXYQgJqiGRl"
                      target="_blank"
                    >
                      <i className="fa-brands fa-youtube"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      aria-label="Instagram"
                      to="https://www.instagram.com/monsbah/profilecard/?igsh=eGhycjkydHBlcmky"
                      target="_blank"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      aria-label="Tiktok"
                      to="https://www.tiktok.com/@monsbah?_t=8qmq24madhi&_r=1"
                      target="_blank"
                    >
                      <i className="fa-brands fa-tiktok"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      aria-label="Twitter"
                      to="https://x.com/monsbah?s=11"
                      target="_blank"
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
