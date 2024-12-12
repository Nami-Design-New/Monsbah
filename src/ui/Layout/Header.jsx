import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../redux/slices/language";
import i18next from "i18next";
import GetApp from "../modals/GetApp";
import AuthModal from "../../components/auth/AuthModal";
import useGetNotifications from "../../hooks/notifications/useGetNotifications";
import NotificationCard from "../cards/NotificationCard";
import useAuth from "../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const { t } = useTranslation();
  const [avatarError, setAvatarError] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.clientData.client);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [showGetAppModal, setShowGetAppModal] = useState(false);
  const { data: notifications, isLoading: notififcationsLoading } =
    useGetNotifications();

  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const [unreadNotificationsLength, setUnreadNotificationsLength] = useState(0);

  const { isAuthed } = useAuth();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (notifications && !notififcationsLoading) {
      const unreadNotifications = notifications?.filter(
        (notification) => +notification.is_read === 0
      );
      setUnreadNotificationsLength(unreadNotifications.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notififcationsLoading]);

  const handleLang = (newLang) => {
    queryClient.invalidateQueries();
    dispatch(setLanguage(newLang));
    i18next.changeLanguage(newLang);
    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.classList.toggle("en", newLang === "en");
    }
  };

  return (
    <header>
      <div className="container">
        <div className="mainLinks">
          <Link aria-label="Home" to="/" className="navbar-brand">
            <img src="/images/branding/icon.svg" loading="lazy" alt="" />
          </Link>

          <nav className="navbar navbar-expand-lg">
            <div className="navbar-nav">
              <Link aria-label="Home" className="logo" to="/">
                <img src="/images/branding/logo.svg" loading="lazy" alt="" />
              </Link>

              <NavLink className="navLink" to="/">
                {t("header.home")}
              </NavLink>
              <NavLink className="navLink" to="/categories">
                {t("header.categories")}
              </NavLink>
              <NavLink className="navLink" to="/asks">
                {t("header.asks")}
              </NavLink>
              <NavLink className="navLink" to="/about-us">
                {t("aboutUs")}
              </NavLink>
              <NavLink className="navLink" to="/blogs">
                {t("header.blogs")}
              </NavLink>
              <NavLink className="navLink" to="/chats">
                {t("header.chats")}
              </NavLink>
              <NavLink className="navLink" to="/contact-us">
                {t("header.contact")}
              </NavLink>
            </div>
          </nav>

          <div className="moreActions">
            <button
              aria-label="Get App"
              className="customBtn"
              onClick={() => setShowGetAppModal(true)}
            >
              {t("header.getApp")}
            </button>

            <Link
              aria-label="Add AD"
              to="/profile?tab=addAd"
              className="link text d-lg-flex d-none"
            >
              <img src="/images/icons/plus.svg" alt="" />
              {t("header.addPost")}
            </Link>

            {isAuthed ? (
              <Dropdown
                show={showNotificationDropdown}
                onToggle={() => {
                  setShowNotificationDropdown(!showNotificationDropdown);
                  setUnreadNotificationsLength(0);
                }}
              >
                <Dropdown.Toggle
                  aria-label="Notifications"
                  id="dropdown-basic"
                  className="link"
                >
                  <img src="/images/icons/bell.svg" alt="" />
                  {unreadNotificationsLength ? (
                    <span className="count">
                      {unreadNotificationsLength < 100
                        ? unreadNotificationsLength
                        : "99+"}{" "}
                    </span>
                  ) : null}
                </Dropdown.Toggle>
                <Dropdown.Menu className="drop_Message_Menu">
                  <div className="scroll_menu">
                    {notifications?.map((item) => (
                      <NotificationCard
                        key={item.id}
                        item={item}
                        onClick={() => setShowNotificationDropdown(false)}
                      />
                    ))}
                  </div>
                  <Link
                    aria-label="Show All"
                    className="showall"
                    to="/profile?tab=notifications"
                    style={{ textDecoration: "none" }}
                    onClick={() => setShowNotificationDropdown(false)}
                  >
                    {t("viewAllNotifications")}
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            ) : null}

            <Dropdown
              show={showLangDropdown}
              onToggle={() => setShowLangDropdown(!showLangDropdown)}
            >
              <Dropdown.Toggle
                aria-label="Language"
                id="dropdown-basic"
                className="link"
              >
                <img src="/images/icons/lang.svg" alt="" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    handleLang("ar");
                    setShowLangDropdown(false);
                  }}
                >
                  العربية
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    handleLang("en");
                    setShowLangDropdown(false);
                  }}
                >
                  English
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Link aria-label="Search" to="/search" className="link">
              <img src="/images/icons/search.svg" alt="" />
            </Link>

            {user?.id ? (
              <Link
                aria-label="Profile"
                to="/profile"
                className="link profile-link"
              >
                <img
                  src={avatarError ? "/images/icons/user.svg" : user?.image}
                  alt="user"
                  onError={() => setAvatarError(true)}
                />
              </Link>
            ) : (
              <button
                aria-label="Login"
                className="link"
                onClick={() => {
                  setShowAuthModal(true);
                  setAuthType("login");
                }}
              >
                <img src="/images/icons/user.svg" alt="user" />
              </button>
            )}
          </div>
        </div>
      </div>

      <GetApp show={showGetAppModal} setShow={setShowGetAppModal} />
      <AuthModal
        type={authType}
        show={showAuthModal}
        setShow={setShowAuthModal}
      />
    </header>
  );
}
