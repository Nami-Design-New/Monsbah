import React from "react";
import SectionHeader from "../components/layout/SectionHeader";
import Sidebar from "../components/profile/Sidebar";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <section className="Profile_section">
      <SectionHeader />
      <div className="container">
        <div className="Profile_Dashpoard">
          <div className="Sidebar">
            <Sidebar />
          </div>
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
