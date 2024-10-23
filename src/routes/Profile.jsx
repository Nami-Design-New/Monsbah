
import ProfileTabs from "../components/profile/ProfileTabs";
import useAuth from "../hooks/useAuth";
import PageLoader from "../ui/loaders/PageLoader";

const Profile = () => {
  const { loading } = useAuth();
  return (
    <>
      <div className="profile-page">
        <div className="container ">
          <div className="row m-0">
            {loading ? <PageLoader /> : <ProfileTabs />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
