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
      <div className="profile-page">
        <div className="container ">
          <div className="row m-0">
            <ProfileTabs />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
