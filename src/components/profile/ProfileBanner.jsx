import { useState } from "react";

function ProfileBanner({ user, lang }) {
  const [avatarError, setAvatarError] = useState(false);
  const [coverError, setCoverError] = useState(false);
  return (
    <div className="page-header">
      <div className="cover-wrapper">
        {!coverError && (
          <img
            src={coverError ? "" : user?.cover}
            alt="user cover image"
            onError={() => setCoverError(true)}
          />
        )}
        <div className="user">
          <div className="top-wrapper">
            <div className="logo-follow-wrapper">
              <div className="logo-wrapper">
                <img
                  src={avatarError ? "/images/icons/user.svg" : user?.image}
                  alt="user logo image"
                  onError={() => setAvatarError(true)}
                />
              </div>
              <div className="user-details-info d-flex flex-column">
                <h3>{user?.name}</h3>
                <p>{lang === "en" ? user?.about_en : user?.about_ar}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBanner;
