import { useTranslation } from "react-i18next";
import SectionHeader from "../components/layout/SectionHeader";
import useGetUserProfile from "../hooks/users/useGetUserProfile";
import PageLoader from "../ui/loaders/PageLoader";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ProductVertical from "../ui/cards/ProductVertical";
import ProductLoader from "../ui/loaders/ProductLoader";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";
import useGetAllProducts from "../hooks/products/useGetAllProducts";
import { Tab, Tabs } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import RatesTab from "../components/profile/RatesTab";

function UserProfile() {
  const { t } = useTranslation();
  const [coverError, setCoverError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "main";
  const { isLoading: userLoading, data: user } = useGetUserProfile();

  const lang = useSelector((state) => state.language.lang);

  const sectionRef = useRef(null);
  const { data: products, isLoading } = useGetAllProducts();

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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SectionHeader />
      <div className="profile-page">
        <div className="container ">
          <div className="row m-0">
            {userLoading ? (
              <PageLoader />
            ) : (
              <div className="tabs-section">
                <Tabs
                  className="profileNavCol col-md-5 col-lg-4 col-xl-3 p-2"
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
                                    ? "/public/images/banner.png"
                                    : user?.cover
                                }
                                alt="user cover image"
                                onError={() => setCoverError(true)}
                              />
                            )}
                          </div>
                          <div className="Profile_info w-100">
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
                                  {lang === "en" ? user?.username : user?.name}{" "}
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
                              {/* {user?.about_en || user?.about_ar ? (
                <p>{lang === "en" ? user?.about_en : user?.about_ar}</p>
              ) : null} */}
                            </div>
                            <div className="actions-wrapper">
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
                            </div>
                          </div>
                        </div>

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
                          <div className="col-lg-3 col-md-6 col-12 p-2">
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
                          <div className="col-lg-3 col-md-6 col-12 p-2">
                            <div className="Box_rate">
                              <h2>{user?.["followers-count"]}</h2>

                              <div className="icon_rate">
                                <p>{t("Followers")}</p>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {user?.["rate-count"] || +user?.["rate-count"] === 0 ? (
                          <div className="col-lg-3 col-md-6 col-12 p-2">
                            <div className="Box_rate">
                              <h2>{user?.["rate-count"]}</h2>

                              <div className="icon_rate">
                                <p>{t("Rating")}</p>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {user?.["ads-count"] || +user?.["ads-count"] === 0 ? (
                          <div className="col-lg-3 col-md-6 col-12 p-2">
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
                    <section className="products_section" ref={sectionRef}>
                      <div className="row">
                        {products?.data?.data?.data?.map((product, index) =>
                          +product?.user?.id === +user?.id ? (
                            <div className="col-lg-6 col-12 p-2" key={index}>
                              <ProductVertical
                                product={product}
                                className="my-ad"
                              />
                            </div>
                          ) : null
                        )}

                        {isLoading && (
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
                        )}
                      </div>
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
                    <RatesTab user={user} />
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
