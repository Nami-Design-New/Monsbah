import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../redux/slices/language";
import i18next from "i18next";
import GetApp from "../modals/GetApp";
import useGetCategories from "../../hooks/useGetCategories";

export default function Header() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [showGetAppModal, setShowGetAppModal] = useState(false);
  const { data: categories } = useGetCategories();

  console.log(categories);
  

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

          <Link to="/addPost" className="link text">
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
              <Dropdown.Item>
                <Link to="/login">
                  <i className="fa-light fa-arrow-right-to-bracket"></i>
                  {t("header.login")}
                </Link>
              </Dropdown.Item>

              <Dropdown.Item>
                <Link to="/register">
                  <i className="fa-light fa-user-plus"></i>
                  {t("header.register")}
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <section className="headerCategoriesWithSub">
        <div className="singleCategory more">
          <a href="#" className="link">
            <img src="img/categories/more.svg" alt="" />
            Categories
          </a>
          <div className="menu"></div>
        </div>

        <div className="singleCategory">
          <a href="listing.html" className="link">
            <img src="img/categories/icon (1).svg" alt="" />
            Mobile & Tablets
          </a>
          <div className="menu">
            <a href="listing.html" className="sub">
              Mobile
            </a>
            <a href="listing.html" className="sub">
              Tablets
            </a>
            <a href="listing.html" className="sub">
              Laptops
            </a>
            <a href="listing.html" className="sub">
              Cameras
            </a>
            <a href="listing.html" className="sub">
              Speakers
            </a>
            <a href="listing.html" className="sub">
              Others
            </a>
          </div>
        </div>

        <div className="singleCategory">
          <a href="listing.html" className="link">
            <img src="img/categories/icon (2).svg" alt="" />
            Vehicles
          </a>
          <div className="menu">
            <a href="listing.html" className="sub">
              Mobile
            </a>
            <a href="listing.html" className="sub">
              Tablets
            </a>
            <a href="listing.html" className="sub">
              Laptops
            </a>
            <a href="listing.html" className="sub">
              Cameras
            </a>
            <a href="listing.html" className="sub">
              Speakers
            </a>
            <a href="listing.html" className="sub">
              Others
            </a>
          </div>
        </div>

        <div className="singleCategory">
          <a href="listing.html" className="link">
            <img src="img/categories/icon (3).svg" alt="" />
            Properties
          </a>
          <div className="menu">
            <a href="listing.html" className="sub">
              Mobile
            </a>
            <a href="listing.html" className="sub">
              Tablets
            </a>
            <a href="listing.html" className="sub">
              Laptops
            </a>
            <a href="listing.html" className="sub">
              Cameras
            </a>
            <a href="listing.html" className="sub">
              Speakers
            </a>
            <a href="listing.html" className="sub">
              Others
            </a>
          </div>
        </div>

        <div className="singleCategory">
          <a href="listing.html" className="link">
            <img src="img/categories/icon (4).svg" alt="" />
            Jobs
          </a>
          <div className="menu">
            <a href="listing.html" className="sub">
              Mobile
            </a>
            <a href="listing.html" className="sub">
              Tablets
            </a>
            <a href="listing.html" className="sub">
              Laptops
            </a>
            <a href="listing.html" className="sub">
              Cameras
            </a>
            <a href="listing.html" className="sub">
              Speakers
            </a>
            <a href="listing.html" className="sub">
              Others
            </a>
          </div>
        </div>

        <div className="singleCategory">
          <a href="listing.html" className="link">
            <img src="img/categories/icon (5).svg" alt="" />
            Kids & Babies
          </a>
          <div className="menu">
            <a href="listing.html" className="sub">
              Mobile
            </a>
            <a href="listing.html" className="sub">
              Tablets
            </a>
            <a href="listing.html" className="sub">
              Laptops
            </a>
            <a href="listing.html" className="sub">
              Cameras
            </a>
            <a href="listing.html" className="sub">
              Speakers
            </a>
            <a href="listing.html" className="sub">
              Others
            </a>
          </div>
        </div>

        <div className="singleCategory">
          <a href="listing.html" className="link">
            <img src="img/categories/icon (6).svg" alt="" />
            Hoppies
          </a>
          <div className="menu">
            <a href="listing.html" className="sub">
              Mobile
            </a>
            <a href="listing.html" className="sub">
              Tablets
            </a>
            <a href="listing.html" className="sub">
              Laptops
            </a>
            <a href="listing.html" className="sub">
              Cameras
            </a>
            <a href="listing.html" className="sub">
              Speakers
            </a>
            <a href="listing.html" className="sub">
              Others
            </a>
          </div>
        </div>

        <div className="singleCategory">
          <a href="listing.html" className="link">
            <img src="img/categories/icon (7).svg" alt="" />
            Pets
          </a>
          <div className="menu">
            <a href="listing.html" className="sub">
              Mobile
            </a>
            <a href="listing.html" className="sub">
              Tablets
            </a>
            <a href="listing.html" className="sub">
              Laptops
            </a>
            <a href="listing.html" className="sub">
              Cameras
            </a>
            <a href="listing.html" className="sub">
              Speakers
            </a>
            <a href="listing.html" className="sub">
              Others
            </a>
          </div>
        </div>

        <div className="singleCategory">
          <a href="listing.html" className="link">
            <img src="img/categories/icon (8).svg" alt="" />
            Furniture & Decor
          </a>
          <div className="menu">
            <a href="listing.html" className="sub">
              Mobile
            </a>
            <a href="listing.html" className="sub">
              Tablets
            </a>
            <a href="listing.html" className="sub">
              Laptops
            </a>
            <a href="listing.html" className="sub">
              Laptops
            </a>
            <a href="listing.html" className="sub">
              Laptops
            </a>
            <a href="listing.html" className="sub">
              Laptops
            </a>
            <a href="listing.html" className="sub">
              Cameras
            </a>
            <a href="listing.html" className="sub">
              Speakers
            </a>
            <a href="listing.html" className="sub">
              Others
            </a>
          </div>
        </div>
      </section>
      <GetApp show={showGetAppModal} setShow={setShowGetAppModal} />
    </header>
  );
}
