import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <aside>
      <ul className="side_list">
        <li className="side_item ">
          <NavLink to="" className="side_link" end>
            <i className="fa-duotone fa-solid fa-grid-horizontal" />
            {t("ProfileFile")}
          </NavLink>
        </li>

        <li className="side_item">
          <NavLink to="AddAdditional-announcement" className="side_link">
            <i className="fa-solid fa-plus" /> {t("AddAdditional-announcement")}
          </NavLink>
        </li>

        <li className="side_item">
          <NavLink to="Favorite" className="side_link">
            <i className="fa-regular fa-heart" /> {t("Favorite")}
          </NavLink>
        </li>
        <li className="side_item">
          <NavLink to="My-Ads" className="side_link">
            <i className="fa-regular fa-microphone-stand" /> {t("My-Ads")}
          </NavLink>
        </li>

        <li className="side_item">
          <NavLink to="Settings" className="side_link">
            <i className="fa-solid fa-gear" />
            {t("Settings")}
          </NavLink>
        </li>

        <li className="side_item">
          <NavLink to="Account-verification" className="side_link">
            <i className="fa-light fa-badge-check" />
            {t("Account-verification")}
          </NavLink>
        </li>

        <li className="side_item">
          <NavLink to="change-password" className="side_link">
            <i className="fa-solid fa-lock" />
            {t("ChangedPassword")}
          </NavLink>
        </li>

        <li className="side_item">
          <NavLink to="Log-out" className="side_link">
            <i className="fa-solid fa-arrow-right-from-bracket" />
            {t("Logout")}
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
