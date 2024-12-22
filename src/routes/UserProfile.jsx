import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useGetUserProfile from "../hooks/users/useGetUserProfile";
import useGetAllProducts from "../hooks/products/useGetAllProducts";
import PageLoader from "../ui/loaders/PageLoader";
import ProductVertical from "../ui/cards/ProductVertical";
import ProductLoader from "../ui/loaders/ProductLoader";

function UserProfile() {
  const { t } = useTranslation();
  const { isLoading: userLoading, data: user } = useGetUserProfile();
  const sectionRef = useRef(null);

  const {
    data: products,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllProducts({ id: user?.id });

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionBottom = sectionRef.current.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;

      if (
        sectionBottom <= viewportHeight + 200 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({ title: user?.name, url: window.location.href })
        .then(() => alert(t("Shared successfully")))
        .catch((error) => alert(t("Error sharing:", error)));
    } else {
      alert(t("share_not_supported"));
    }
  };

  if (userLoading) {
    return <PageLoader />;
  }

  return (
    <section className="user-profile-section">
      <div className="banner">
        <img src="/images/company_banner.jpg" alt="User Banner" />
      </div>
      <div className="container mt-4">
        <div className="profile-header row">
          <div className="col-12 p-2 d-flex">
            <div className="profile-image">
              <img src={user?.image || "/images/company.png"} alt="User" />
            </div>
            <div className="profile-info">
              <h3>{user?.name || t("No Name Provided")}</h3>
              <div className="profile-stats">
                <span>
                  {user?.["followers-count"]} {t("Followers")}
                </span>
                <span>
                  {user?.["following-count"]} {t("Following")}
                </span>
                <span>
                  {user?.["ads-count"]} {t("Posts")}
                </span>
              </div>
              <div className="profile-actions">
                <Link to={`/chats?user_id=${user?.id}`} className="action-btn">
                  <i className="fa-solid fa-comment-dots"></i> {t("Chat")}
                </Link>
                <button className="action-btn" onClick={handleShare}>
                  <i className="fa-regular fa-share-nodes"></i> {t("Share")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {user?.about && (
          <div className="about-section row">
            <div className="col-12">
              <p>{user?.about}</p>
            </div>
          </div>
        )}

        <div className="products-section row" ref={sectionRef}>
          {products?.map((product, index) => (
            <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
              <ProductVertical product={product} isShowAction={false} />
            </div>
          ))}

          {(isLoading || isFetchingNextPage) &&
            Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  className="col-lg-4 col-md-6 col-12 p-2"
                  key={`loader-${index}`}
                >
                  <ProductLoader />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
