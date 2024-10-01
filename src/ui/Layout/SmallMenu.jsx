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

      <Link to="/profile" className="menu_item">
        <i className="fa-solid fa-user"></i>
        <span>{t("myAccount")}</span>
      </Link>

      <div className="menu_item">
        <Link className="center" to="/add-post">
          <i className="fa-regular fa-plus"></i>
        </Link>
      </div>

      <Link to="/notifications" className="menu_item">
        <i className="fa-solid fa-bell"></i>
        <span>{t("notifications")}</span>
      </Link>

      <Link to="/chats" className="menu_item">
        <i className="fa-solid fa-message"></i>
        <span>{t("chats")}</span>
      </Link>
    </div>
  );
}

export default SmallMenu;
