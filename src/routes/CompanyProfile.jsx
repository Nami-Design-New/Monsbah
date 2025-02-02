import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { isValidVideoExtension } from "../utils/helpers";
import StarsRate from "./../ui/StarsRate";
import useGetCompanyProfile from "../hooks/companies/useGetCompanyProfile";
import useGetCompanyProducts from "../hooks/products/useGetCompanyProducts";
import PageLoader from "../ui/loaders/PageLoader";
import axiosInstance from "../utils/axiosInstance";
import ImageLoad from "../ui/loaders/ImageLoad";

export default function CompanyProfile() {
  const sectionRef = useRef(null);
  const queryClient = useQueryClient();

  const [isImageLoaded, setIsImageLoaded] = useState(true);

  const { t } = useTranslation();
  const { data: profile, isLoading: profileLoading } =
    useGetCompanyProfile(true);
  const { client } = useSelector((state) => state.clientData);

  const handleImageLoad = () => {
    setIsImageLoaded(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: profile?.client?.name,
          text: profile?.client?.about,
          url: window.location.href,
        })
        .then(() => t("Shared successfully"))
        .catch((error) => t("Error sharing:", error));
    } else {
      alert(t("share_not_supported"));
    }
  };

  const {
    data: products,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCompanyProducts();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionBottom = section.getBoundingClientRect().bottom;
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

  const handleFollow = async () => {
    try {
      const res = await axiosInstance.post(
        `/${localStorage.getItem("userType")}/${
          profile?.client?.is_follow ? "delete" : "store"
        }-follower`,
        {
          company_id: profile?.client?.id,
        }
      );
      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["company-profile"],
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    }
  };

  return profileLoading ? (
    <PageLoader />
  ) : (
    <section className="company_profile_section">
      <div className="banner">
        <img src="/images/banner.png" alt="banner" />
      </div>

      <div className="container mt-4 p-0">
        <div className="row">
          <div className="company_header">
            <div className="img">
              <img src={profile?.client?.image} alt="company" />
              {profile?.client?.id !== client?.id && (
                <button
                  aria-label="Toggle following"
                  className="follow_btn"
                  onClick={handleFollow}
                >
                  <i
                    className={`fa-light fa-${
                      profile?.client?.is_follow ? "check" : "plus"
                    }`}
                  ></i>
                </button>
              )}
            </div>

            <div className="content">
              <div className="title">
                <h3>{profile?.client?.name}</h3>
                <div className="actions">
                  <Link
                    aria-label="whatsapp"
                    target="_blank"
                    to={`https://wa.me/${profile?.client?.whats_number}`}
                    className=" follow_btn"
                  >
                    <img src="/images/icons/whats.svg" alt="" />
                  </Link>

                  <Link
                    aria-label="Profile"
                    className=" follow_btn"
                    to={`/chats?user_id=${profile?.client?.id}`}
                  >
                    <i className="fa-solid fa-comment-dots"></i>
                  </Link>

                  <div className="follow_btn" onClick={handleShare}>
                    <i className="fa-regular fa-share-nodes"></i>
                  </div>
                </div>
              </div>

              <div className="stats">
                <div className="f_badge">
                  <i className="fa-light fa-location-dot"></i>{" "}
                  {profile?.client?.city?.name} ،{" "}
                  {profile?.client?.country?.name}
                </div>
                <div className="f_badge">
                  <i className="fa-regular fa-user-check"></i>{" "}
                  {profile?.client?.followers} {t("Followers")}
                </div>
                <div className="f_badge">
                  <i className="fa-light fa-user-group"></i>{" "}
                  {profile?.client?.following} {t("following")}
                </div>
                <div className="f_badge">
                  <i className="fa-light fa-clothes-hanger"></i>{" "}
                  {profile?.client?.products_count} {t("posts")}
                </div>
              </div>

              <StarsRate
                rate={profile?.client?.rate}
                reviewsCount={profile?.client?.rate_count}
                showbtn={true}
                company={profile?.client}
              />
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="about_company">
              <p>{profile?.client?.about}</p>
            </div>
          </div>
          <div className="col-12 p-2">
            <Swiper
              slidesPerView="auto"
              spaceBetween={10}
              className="categories"
            >
              <SwiperSlide>
                <button className="active">{t("all")}</button>
              </SwiperSlide>

              {profile?.client?.categories?.map((category) => (
                <SwiperSlide key={category.id}>
                  <button>{category.name}</button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="row mb-5" ref={sectionRef}>
          <div className="company_products_grid">
            {products?.map((product, index) => (
              <Link
                className="product_img"
                key={index}
                to={`/product/${product?.id}`}
              >
                {isValidVideoExtension(product?.image) ? (
                  <video
                    src={product.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedMetadata={handleImageLoad}
                  />
                ) : (
                  <img src={product.image} onLoad={handleImageLoad} alt="" />
                )}
                <ImageLoad isImageLoaded={isImageLoaded} />
              </Link>
            ))}

            {(isLoading || isFetchingNextPage) && (
              <>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div className="product_img skeleton" key={index}></div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
