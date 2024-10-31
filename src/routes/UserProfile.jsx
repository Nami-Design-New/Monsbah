import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useGetUserProfile from "../hooks/users/useGetUserProfile";
import PageLoader from "../ui/loaders/PageLoader";
import ProductVertical from "../ui/cards/ProductVertical";
import ProductLoader from "../ui/loaders/ProductLoader";
import axiosInstance from "../utils/axiosInstance";
import useGetAllProducts from "../hooks/products/useGetAllProducts";
import RatesTab from "../components/profile/RatesTab";
import EmptyData from "../ui/EmptyData";

function UserProfile() {
  const { t } = useTranslation();
  const [coverError, setCoverError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "main";
  const { isLoading: userLoading, data: user } = useGetUserProfile();

  const lang = useSelector((state) => state.language.lang);

  const sectionRef = useRef(null);
  const { data: products, isLoading } = useGetAllProducts({
    id: user?.id,
    enabled: activeTab === "ads",
  });

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  function handleTabChange(tab) {
    setSearchParams({ tab });
  }

  const handleFollow = async (type) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        type === "follow"
          ? "/client/store-follower"
          : "/client/delete-follower",
        {
          profile_id: user?.id,
        }
      );
      if (res.status === 200) {
        setLoading(false);
        queryClient.invalidateQueries(["user-profile", user?.id]);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: user?.name,
          url: window.location.href,
        })
        .then(() => t("Shared successfully"))
        .catch((error) => t("Error sharing:", error));
    } else {
      alert(t("share_not_supported"));
    }
  };

  return (
    <>
      <div className="profile-page">
        <div className="container ">
          <div className="row m-0">
            {userLoading ? (
              <PageLoader />
            ) : (
              <div className="tabs-section">
                <Tabs
                  className="profileNavCol col-md-4 col-xl-3 p-2"
                  activeKey={activeTab}
                  onSelect={(tab) => handleTabChange(tab)}
                  id="uncontrolled-tab-example"
                >
                  {/* main info */}
                  <Tab
                    eventKey="main"
                    title={
                      <>
                        <i className="fa-regular fa-user" />
                        {t("profile.mainInfo")}
                      </>
                    }
                    className="tab_item"
                  >
                    <div className="Dashpoard_section w-100">
                      <div className="row m-0">
                        <div className="cover-logo-wrapper col-12 p-2 mb-4 d-flex flex-column justify-content-end align-items-start">
                          <div className="cover-wrapper">
                            {coverError ? null : (
                              <img
                                src={
                                  coverError || !user?.cover
                                    ? "/images/banner.png"
                                    : user?.cover
                                }
                                alt="user cover image"
                                onError={() => setCoverError(true)}
                              />
                            )}
                          </div>
                          <div className="actions-wrapper d-flex justify-content-end mb-auto w-100">
                            {user?.is_follow ? (
                              <div
                                className="action-btn follow_btn"
                                onClick={() => handleFollow("unfollow")}
                                disabled={loading}
                              >
                                <i className="fa-light fa-user-minus"></i>{" "}
                                <span>{t("unfollow")}</span>
                              </div>
                            ) : (
                              <div
                                className="action-btn follow_btn"
                                onClick={() => handleFollow("follow")}
                                disabled={loading}
                              >
                                <i className="fa-regular fa-user-plus"></i>{" "}
                                <span>{t("follow")}</span>
                              </div>
                            )}
                            <Link
                              to={`/chats?user_id=${user?.id}`}
                              className="action-btn follow_btn"
                            >
                              <i className="fa-solid fa-comment-dots"></i>{" "}
                              {t("ads.chat")}
                            </Link>
                            <div className="share_btn" onClick={handleShare}>
                              <i className="fa-regular fa-share-nodes"></i>
                            </div>
                          </div>
                          <div className="Profile_info w-100 flex-wrap">
                            <div className="logo-wrapper">
                              <img
                                src={
                                  avatarError || !user?.image
                                    ? "/images/icons/user.svg"
                                    : user?.image
                                }
                                alt="user logo image"
                                onError={() => setAvatarError(true)}
                              />
                            </div>
                            <div className="name">
                              {user?.name ? (
                                <h1>
                                  {user?.name}{" "}
                                  <span>
                                    ({" "}
                                    {lang === "en"
                                      ? user?.state?.name_en
                                      : user?.state?.name_ar}{" "}
                                    )
                                  </span>
                                </h1>
                              ) : null}
                              {user?.email ? <p>{user?.email}</p> : null}
                            </div>
                          </div>
                        </div>

                        {user?.about_en || user?.about_ar ? (
                          <div className="col-12 p-2">
                            <p>
                              {lang === "en" ? user?.about_en : user?.about_ar}
                            </p>
                          </div>
                        ) : null}

                        {user?.country ? (
                          <div className="col-lg-6 col-12 p-2">
                            <div className="user-details-box">
                              <span className="title">
                                {t("profile.country")}
                              </span>
                              <span className="value">
                                <div className="img-wrapper">
                                  <img
                                    src={user?.country?.image}
                                    alt="user logo image"
                                  />
                                </div>
                                {user?.country?.name}
                              </span>
                            </div>
                          </div>
                        ) : null}

                        {user?.city ? (
                          <div className="col-lg-6 col-12 p-2">
                            <div className="user-details-box">
                              <span className="title">{t("profile.city")}</span>
                              <span className="value">
                                {lang === "en"
                                  ? user?.city?.name_en
                                  : user?.city?.name_ar}
                              </span>
                            </div>
                          </div>
                        ) : null}

                        {user?.["following-count"] ||
                        +user?.["following-count"] === 0 ? (
                          <div className="col-lg-4 col-6 p-2">
                            <div className="Box_rate">
                              <h2>{user?.["following-count"]}</h2>

                              <div className="icon_rate">
                                <p>{t("Followings")}</p>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {user?.["followers-count"] ||
                        +user?.["followers-count"] === 0 ? (
                          <div className="col-lg-4 col-6 p-2">
                            <div className="Box_rate">
                              <h2>{user?.["followers-count"]}</h2>

                              <div className="icon_rate">
                                <p>{t("Followers")}</p>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {user?.["ads-count"] || +user?.["ads-count"] === 0 ? (
                          <div className="col-lg-4 col-6 p-2">
                            <div className="Box_rate">
                              <h2>{user?.["ads-count"]}</h2>

                              <div className="icon_rate">
                                <p>{t("Ad")}</p>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </Tab>

                  {/* ads */}
                  <Tab
                    eventKey="ads"
                    title={
                      <>
                        <i className="fa-regular fa-bullhorn"></i>
                        {t("profile.ads")}
                      </>
                    }
                    className="tab_item"
                  >
                    <section
                      className="products_section w-100"
                      ref={sectionRef}
                    >
                      <>
                        <div className="row">
                          {isLoading ? (
                            <>
                              {Array(3)
                                .fill(0)
                                .map((_, index) => (
                                  <div
                                    className="col-lg-6 col-12 p-2"
                                    key={`loader-${index}`}
                                  >
                                    <ProductLoader />
                                  </div>
                                ))}
                            </>
                          ) : products?.data?.data?.data?.length > 0 ? (
                            products?.data?.data?.data?.map((product) => (
                              <div
                                className="col-lg-6 col-12 p-2"
                                key={product?.id}
                              >
                                <ProductVertical
                                  product={product}
                                  className="my-ad"
                                />
                              </div>
                            ))
                          ) : (
                            <EmptyData minHeight="200px">
                              <p>{t("ads.userNoAds")}</p>
                            </EmptyData>
                          )}
                        </div>
                      </>

                      {/* <EmptyData minHeight="200px">
                          <p>{t("ads.userNoAds")}</p>
                        </EmptyData> */}
                    </section>
                  </Tab>

                  {/* rates */}
                  <Tab
                    eventKey="rates"
                    title={
                      <>
                        <i className="fa-regular fa-stars"></i>
                        {t("profile.rates")}
                      </>
                    }
                    className="tab_item"
                  >
                    <RatesTab user={user} isActive={activeTab === "rates"} />
                  </Tab>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
