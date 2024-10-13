import SectionHeader from "../components/layout/SectionHeader";
import ProfileTabs from "../components/profile/ProfileTabs";

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
