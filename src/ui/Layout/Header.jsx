import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../redux/slices/language";
import { useCookies } from "react-cookie";
import i18next from "i18next";
import GetApp from "../modals/GetApp";
import AuthModal from "../../components/auth/AuthModal";
import axiosInstance from "../../utils/axiosInstance";
import { setClientData } from "../../redux/slices/clientData";
import { toast } from "react-toastify";

export default function Header() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [, , removeCookie] = useCookies(["token", "id"]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [showGetAppModal, setShowGetAppModal] = useState(false);

  const user = useSelector((state) => state.clientData.client);

  const handleLang = (newLang) => {
    dispatch(setLanguage(newLang));
    i18next.changeLanguage(newLang);
    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.classList.toggle("en", newLang === "en");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.get("/client/auth/logout");
      if (res.status === 200) {
        removeCookie("token", { path: "/" });
        removeCookie("id", { path: "/" });
        dispatch(setClientData({}));
        toast.success(res.data?.message);
      }
    } catch (error) {
      console.error("Error logging out:", error.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <header>
      <div className="container">
        <div className="mainLinks">
          <Link to="/" className="navbar-brand">
            <img src="/images/branding/logo.svg" loading="lazy" alt="" />
          </Link>

          <nav className="navbar navbar-expand-lg">
            <button className="navbar-toggler">
              <span className="navbar-toggler-icon"></span>
            </button>

            <ul className="navbar-nav">
              <Link className="logo" to="/">
                <img src="/images/branding/logo.svg" loading="lazy" alt="" />
              </Link>

              <NavLink className="navLink" to="/">
                {t("header.home")}
              </NavLink>
              <NavLink className="navLink" to="/categories">
                {t("header.categories")}
              </NavLink>
              <NavLink className="navLink" to="/listing">
                {t("header.listing")}
              </NavLink>
              <NavLink className="navLink" to="/chats">
                {t("header.chats")}
              </NavLink>
              <NavLink className="navLink" to="/contact">
                {t("header.contact")}
              </NavLink>
            </ul>
          </nav>

          <div className="moreActions">
            <button
              className="customBtn"
              onClick={() => setShowGetAppModal(true)}
            >
              {t("header.getApp")}
            </button>

            <Link to="/add-ad" className="link text">
              <img src="images/icons/plus.svg" alt="" />
              {t("header.addPost")}
            </Link>

            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" className="link">
                <img src="images/icons/bell.svg" alt="" />
                <span className="count"> 10 </span>
              </Dropdown.Toggle>

              <Dropdown.Menu></Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" className="link">
                <img src="images/icons/lang.svg" alt="" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleLang("ar")}>
                  العربية
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleLang("en")}>
                  English
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" className="link">
                <img src="images/icons/user.svg" alt="" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {user?.id ? (
                  <>
                    <Dropdown.Item>
                      <Link onClick={() => handleLogout()}>
                        <i className="fa-light fa-arrow-right-to-bracket"></i>
                        {t("header.logout")}
                      </Link>
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item>
                      <Link
                        onClick={() => {
                          setShowAuthModal(true);
                          setAuthType("login");
                        }}
                      >
                        <i className="fa-light fa-arrow-right-to-bracket"></i>
                        {t("header.login")}
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item>
                      <Link
                        onClick={() => {
                          setShowAuthModal(true);
                          setAuthType("register");
                        }}
                      >
                        <i className="fa-light fa-user-plus"></i>
                        {t("header.register")}
                      </Link>
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
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
