import { Route, Routes } from "react-router-dom";
import SectionHeader from "../components/layout/SectionHeader";
import Sidebar from "../components/profile/Sidebar";
import MyOrders from "../components/profile/MyOrders";
import Payments from "../components/profile/Payments";
import ChangePassword from "../components/profile/ChangePassword";
import ProfileFile from "../components/profile/ProfileFile";
import AddAd from "./AddAd";
import MyAds from "../components/profile/MyAds";

const Profile = () => {
  return (
    <>
      <SectionHeader />
      <section className="Profile_section">
        <div className="container">
          <div className="row m-0">
            <div className="col-lg-3 col-12 p-2">
              <Sidebar />
            </div>
            <div className="col-lg-9 col-12 p-2">
              <div className="content">
                <Routes>
                  <Route path="/" element={<ProfileFile />} />
                  <Route path="/add-ad" element={<AddAd />} />
                  <Route path="/my-ads" element={<MyAds />} />
                  <Route path="/my-orders" element={<MyOrders />} />
                  <Route path="/my-payments" element={<Payments />} />
                  <Route path="/settings" element={<></>} />
                  <Route path="/change-password" element={<ChangePassword />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
