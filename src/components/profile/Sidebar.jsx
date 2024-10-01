import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("");
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <aside>
      <ul className="side_list">
        <li className="side_item ">
          <Link
            to=""
            className="side_link"
            onClick={() => handleLinkClick("/")}
            style={{ color: activeLink === "/" ? "blue" : "black" }}
          >
            <i className="fa-duotone fa-solid fa-grid-horizontal"></i>
            Dashboard
          </Link>
        </li>

        <li className="side_item">
          <Link to="" className="side_link">
            <i className="fa-regular fa-hammer-crash"></i> My Order
          </Link>
        </li>

        <li className="side_item">
          <Link to="" className="side_link">
            <i className="fa-solid fa-money-check"></i>
            My Payments
          </Link>
        </li>
        <li className="side_item">
          <Link to="" className="side_link">
            <i className="fa-solid fa-gear"></i> Settings
          </Link>
        </li>

        <li className="side_item">
          <Link to="" className="side_link">
            <i className="fa-solid fa-lock"></i>
            Changed Password
          </Link>
        </li>

        <li className="side_item">
          <Link to="" className="side_link">
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
