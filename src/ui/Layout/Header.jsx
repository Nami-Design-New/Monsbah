import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../redux/slices/language";
import i18next from "i18next";
import GetApp from "../modals/GetApp";
import AuthModal from "../../components/auth/AuthModal";

export default function Header() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [showGetAppModal, setShowGetAppModal] = useState(false);

  const handleLang = (newLang) => {
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

            <button
              className="link"
              onClick={() => {
                setShowAuthModal(true);
                setAuthType("login");
              }}
            >
              <img src="images/icons/user.svg" alt="" />
            </button>
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
