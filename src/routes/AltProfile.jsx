import { useSelector } from "react-redux";
import ProfileBanner from "../components/profile/ProfileBanner";
import ProfileTabs from "../components/profile/ProfileTabs";

function AltProfile() {
  const user = useSelector((state) => state.clientData.client);
  const lang = useSelector((state) => state.language.lang);

  console.log(user);

  return (
    <>
      <div className="profile-page">
        <div className="container ">
          <div className="row" style={{ gap: "40px" }}>
            <div className="col-12">
              <ProfileBanner user={user} lang={lang} />
            </div>

            <div className="col-12">
              <ProfileTabs user={user} lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AltProfile;
