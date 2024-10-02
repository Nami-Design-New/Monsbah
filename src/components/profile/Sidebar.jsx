import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <aside>
      <ul className="side_list">
        <li className="side_item ">
          <NavLink to="/dashpoard" className="side_link">
            <i className="fa-duotone fa-solid fa-grid-horizontal"></i>
            {t("Dashboard")}
          </NavLink>
        </li>

        <li className="side_item">
          <NavLink to="/my-order" className="side_link">
            <i className="fa-regular fa-hammer-crash"></i>
            {t("MyOrder")}
          </NavLink>
        </li>

        <li className="side_item">
          <NavLink to="My-Payments" className="side_link">
            <i className="fa-solid fa-money-check"></i>
            {t("MyPayments")}
          </NavLink>
        </li>
        <li className="side_item">
          <NavLink to="Settings" className="side_link">
            <i className="fa-solid fa-gear"></i>
            {t("Settings")}
          </NavLink>
        </li>

        <li className="side_item">
          <NavLink to="Changed-Password" className="side_link">
            <i className="fa-solid fa-lock"></i>
            {t("ChangedPassword")}
          </NavLink>
        </li>

        <li className="side_item">
          <NavLink to="Log-out" className="side_link">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            {t("Logout")}
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
