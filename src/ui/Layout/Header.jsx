import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../redux/slices/language";
import { useQueryClient } from "@tanstack/react-query";
import { setClientData } from "../../redux/slices/clientData";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import i18next from "i18next";
import GetApp from "../modals/GetApp";
import AuthModal from "../../components/auth/AuthModal";
import useGetNotifications from "../../hooks/notifications/useGetNotifications";
import NotificationCard from "../cards/NotificationCard";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../utils/axiosInstance";

export default function Header() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.clientData.client);

  const [, , deleteCookie] = useCookies();
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token;

  const [avatarError, setAvatarError] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [showGetAppModal, setShowGetAppModal] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [unreadNotificationsLength, setUnreadNotificationsLength] = useState(0);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);

  const { data: notifications, isLoading: notififcationsLoading } =
    useGetNotifications();

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

  const performLogout = async () => {
    try {
      const deleteToken = await axiosInstance.get("company/auth/logout", {
        token: token,
      });

      if (deleteToken.data.status === 200) {
        deleteCookie("token");
        deleteCookie("id");
        delete axiosInstance.defaults.headers.common["Authorization"];
        dispatch(setClientData({}));
        navigate("/", { replace: true });
        queryClient.clear();
        localStorage.setItem("userType", "client");
        toast.success(deleteToken.data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      throw new Error(error.message);
    }
  };

  return (
    <header>
      <div className="container">
        <div className="mainLinks">
          <Link aria-label="Home" to="/" className="navbar-brand">
            <img src="/images/branding/icon.svg" loading="lazy" alt="" />
          </Link>

          <nav className="navbar navbar-expand-lg d-none d-lg-flex">
            <div className="navbar-nav">
              <Link aria-label="Home" className="logo" to="/">
                <img src="/images/branding/logo.svg" loading="lazy" alt="" />
              </Link>

              <NavLink className="navLink" to="/">
                {t("header.home")}
              </NavLink>

              {localStorage.getItem("userType") === "client" && (
                <NavLink className="navLink" to="/categories">
                  {t("header.categories")}
                </NavLink>
              )}

              <NavLink className="navLink" to="/companies">
                {t("header.companies")}
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
              to={`${
                localStorage.getItem("userType") === "client"
                  ? "/profile?tab=addAd"
                  : "/add-company-product"
              }`}
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
              <>
                {localStorage.getItem("userType") === "client" ? (
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
                  <Dropdown>
                    <Dropdown.Toggle
                      aria-label="Notifications"
                      id="dropdown-basic"
                      className="link profile-link"
                    >
                      <img
                        src={
                          avatarError ? "/images/icons/user.svg" : user?.image
                        }
                        alt="user"
                        onError={() => setAvatarError(true)}
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => navigate("/company-profile")}
                      >
                        {t("routes.profile")}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={performLogout}>
                        {t("header.logout")}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </>
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
