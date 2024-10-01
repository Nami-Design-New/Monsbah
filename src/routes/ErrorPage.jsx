import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ErrorPage() {
  const { t } = useTranslation();
  return (
    <section className="error-section">
      <img src="/images/icons/error.svg" alt="error image" />
      <h2>{t("error.pageNotFound")}</h2>
      <Link to="/" className="backhome">
        <i className="fa-solid fa-home"></i>
        <span>{t("error.goHome")}</span>
      </Link>
    </section>
  );
}

export default ErrorPage;
