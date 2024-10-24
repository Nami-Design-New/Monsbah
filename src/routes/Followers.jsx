import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Route, Routes } from "react-router-dom";
import FollowersTab from "../components/followers/FollowersTab";
import FollowingsTab from "../components/followers/FollowingsTab";

function Followers() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  return (
    <section className="search_section" ref={sectionRef}>
      <div className="container">
        <nav className="search_nav">
          <NavLink end to="">
            {t("profile.followers")}
          </NavLink>

          <NavLink to="followings">{t("profile.followings")}</NavLink>
        </nav>
        <div className="row">
          <Routes>
            <Route path="" element={<FollowersTab sectionRef={sectionRef} />} />
            <Route
              path="followings"
              element={<FollowingsTab sectionRef={sectionRef} />}
            />
          </Routes>
        </div>
      </div>
    </section>
  );
}

export default Followers;
