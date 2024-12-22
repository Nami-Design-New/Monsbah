import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function ResponsiveNav() {
  const { t } = useTranslation();
  return (
    <div className="small_menu">
      <Link aria-label="Home" to="/" className="menu_item">
        <i className="fa-solid fa-house-chimney"></i>
        <span>{t("home")}</span>
      </Link>

      <Link aria-label="Categories" to="/categories" className="menu_item">
        <i className="fa-solid fa-grid-2"></i>
        <span>{t("header.categories")}</span>
      </Link>

      <div className="menu_item" style={{ paddingTop: "4px" }}>
        <Link aria-label="Add AD" className="center" to="/profile?tab=addAd">
          <i className="fa-regular fa-plus"></i>
        </Link>
      </div>

      <Link aria-label="Asks" to="/companies" className="menu_item">
        <i className="fa-solid fa-store"></i>
        <span> {t("header.companies")}</span>
      </Link>

      <Link aria-label="Chats" to="/chats" className="menu_item">
        <i className="fa-solid fa-message"></i>
        <span>{t("chats")}</span>
      </Link>
    </div>
  );
}

export default ResponsiveNav;
