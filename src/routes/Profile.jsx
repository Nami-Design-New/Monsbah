import React from "react";
import SectionHeader from "../components/layout/SectionHeader";
import Sidebar from "../components/profile/Sidebar";
import Dashpoard from "../components/profile/Dashpoard";
import { Routes, Route } from "react-router-dom";

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
            <Routes>
              <Route path="/Dashpoard" element={<Dashpoard />} />
            </Routes>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
