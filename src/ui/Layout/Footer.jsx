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
                <Link to="/">
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
          <div className="col-lg-3 col-md-6 col-12 p-2">
            <div className="col">
              <h3>{t("importantLinks")}</h3>
              <ul>
                <li>
                  <Link to="/about-us">
                    <span>
                      <i className="fa-sharp fa-light fa-arrow-right"></i>
                    </span>
                    {t("aboutUs")}
                  </Link>
                </li>
                <li>
                  <Link to="/faqs">
                    <span>
                      <i className="fa-sharp fa-light fa-arrow-right"></i>
                    </span>
                    {t("faqs")}
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us">
                    <span>
                      <i className="fa-sharp fa-light fa-arrow-right"></i>
                    </span>
                    {t("contactUs")}
                  </Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions">
                    <span>
                      <i className="fa-sharp fa-light fa-arrow-right"></i>
                    </span>
                    {t("tearmsAndConditions")}
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy">
                    <span>
                      <i className="fa-sharp fa-light fa-arrow-right"></i>
                    </span>
                    {t("privacyPolicy")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12 p-2">
            <div className="col">
              <h3>{t("popularCategories")}</h3>
              <ul>
                {categories?.map((category) => (
                  <li key={category.id}>
                    <Link to={`/categories/${category.id}`}>
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
              <ul className="download-app">
                <li>
                  <Link to="" target="_blank">
                    <div className="icon">
                      <i className="fa-brands fa-apple"></i>
                    </div>
                    <div className="text">
                      <p>App Store</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="" target="_blank">
                    <div className="icon">
                      <i className="fa-brands fa-google-play"></i>
                    </div>
                    <div className="text">
                      <p>Google Play</p>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="copy_rights">
              <p>
                {t("copyRights")} &copy;
                {new Date().getFullYear()}. {t("allRights")}{" "}
                <Link to="/">{t("appName")}</Link>
              </p>
              <div className="social_media">
                <ul>
                  <li>
                    <Link to="" target="_blank">
                      <i className="fa-brands fa-facebook-f"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="" target="_blank">
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="" target="_blank">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="" target="_blank">
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
