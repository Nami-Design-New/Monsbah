import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useGetUserProfile from "../hooks/users/useGetUserProfile";
import useGetAllProducts from "../hooks/products/useGetAllProducts";
import PageLoader from "../ui/loaders/PageLoader";
import ProductVertical from "../ui/cards/ProductVertical";
import ProductLoader from "../ui/loaders/ProductLoader";

function UserProfile() {
  const sectionRef = useRef(null);
  const { t } = useTranslation();
  const { isLoading: userLoading, data: user } = useGetUserProfile();

  const {
    data: products,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllProducts({ id: user?.id, enabled: true });

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
    <section className="company_profile_section">
      <div className="banner">
        <img src="/images/campany_banner.jpg" alt="banner" />
      </div>
      <div className="container mt-4">
        <div className="company_header">
          <div className="img">
            <img src={user?.image} alt="company" />
          </div>
          <div className="content">
            <div className="title">
              <h3>{user?.name || t("No Name Provided")}</h3>
              <div className="actions">
                <Link
                  aria-label="whatsapp"
                  target="_blank"
                  to={`https://wa.me/${user?.phone}`}
                  className="follow_btn"
                >
                  <img src="/images/icons/whats.svg" alt="" />
                </Link>
                <Link
                  aria-label="Profile"
                  to={`/chats?user_id=${user?.id}`}
                  className="follow_btn"
                >
                  <i className="fa-solid fa-comment-dots"></i>{" "}
                </Link>
                <div className="follow_btn" onClick={handleShare}>
                  <i className="fa-regular fa-share-nodes"></i>
                </div>
              </div>
            </div>
            <div className="stats">
              <div className="f_badge">
                <i className="fa-light fa-location-dot"></i> مكة ، السعودية
              </div>
              <div className="f_badge">
                <i className="fa-regular fa-user-check"></i>{" "}
                {user?.["followers-count"]} {t("Followers")}
              </div>
              <div className="f_badge">
                <i className="fa-light fa-user-group"></i>{" "}
                {user?.["following-count"]} {t("following")}
              </div>
              <div className="f_badge">
                <i className="fa-light fa-clothes-hanger"></i>{" "}
                {user?.["ads-count"]} {t("posts")}
              </div>
            </div>
          </div>
        </div>

        <div className="about_company">
          <p>{user?.about}</p>
        </div>

        <div className="products-section row mb-3 mt-3" ref={sectionRef}>
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
