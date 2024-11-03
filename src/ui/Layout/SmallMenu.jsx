import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function SmallMenu() {
  const { t } = useTranslation();
  return (
    <div className="small_menu">
      <Link to="/" className="menu_item">
        <i className="fa-solid fa-house-chimney"></i>
        <span>{t("home")}</span>
      </Link>

      <Link to="/categories" className="menu_item">
        <i className="fa-solid fa-grid-2"></i>
        <span>{t("header.categories")}</span>
      </Link>

      <div className="menu_item" style={{ paddingTop: "4px" }}>
        <Link className="center" to="/profile?tab=addAd">
          <i className="fa-regular fa-plus"></i>
        </Link>
      </div>

      {/* <Link to="/search" className="menu_item">
        <i className="fa-solid fa-magnifying-glass"></i>
        <span>{t("search")}</span>
      </Link> */}

      <Link to="/asks" className="menu_item">
        <i className="fa-solid fa-comments-question"></i>
        <span> {t("header.asks")}</span>
      </Link>

      <Link to="/chats" className="menu_item">
        <i className="fa-solid fa-message"></i>
        <span>{t("chats")}</span>
      </Link>
    </div>
  );
}

export default SmallMenu;
