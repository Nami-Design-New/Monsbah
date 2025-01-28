import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import StarsRate from "../ui/StarsRate";
import useGetCompanyProducts from "../hooks/products/useGetCompanyProducts";
import CompanyProductCard from "../ui/cards/CompanyProductCard";
import CompanyProductLoader from "../ui/loaders/CompanyProductLoader";

export default function CompanyAccount() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const profile = useSelector((state) => state.clientData.client);

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
  } = useGetCompanyProducts(true);

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

  return (
    <section className="company_profile_section">
      <div className="banner">
        <img src="/images/banner.png" alt="banner" />
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="company_header">
            <div className="img">
              <img src={profile?.image} alt="company" />
            </div>

            <div className="content">
              <div className="title">
                <h3>{profile?.name}</h3>
                <div className="actions">
                  <Link className="add_product" to="/add-company-product">
                    <i className="fa-regular fa-plus"></i> {t("profile.addAd")}
                  </Link>

                  <Link className="follow_btn" to="/edit-company-profile">
                    <i className="fa-light fa-pencil"></i>
                  </Link>

                  <div className="follow_btn" onClick={handleShare}>
                    <i className="fa-regular fa-share-nodes"></i>
                  </div>
                </div>
              </div>

              <div className="stats">
                <div className="f_badge">
                  <i className="fa-light fa-location-dot"></i>{" "}
                  {profile?.city?.name} ، {profile?.country?.name}
                </div>
                <div className="f_badge">
                  <i className="fa-regular fa-user-check"></i>{" "}
                  {profile?.followers} {t("Followers")}
                </div>
                <div className="f_badge">
                  <i className="fa-light fa-user-group"></i>{" "}
                  {profile?.following} {t("following")}
                </div>
                <div className="f_badge">
                  <i className="fa-light fa-clothes-hanger"></i>{" "}
                  {profile?.products_count} {t("posts")}
                </div>
              </div>

              <StarsRate
                rate={profile?.rate}
                reviewsCount={100}
                showbtn={true}
                company={profile}
                isMyCompany={true}
              />
            </div>
          </div>

          <div className="col-12 p-2">
            <div className="about_company">
              <p>{profile?.about}</p>
            </div>
          </div>
        </div>

        <div className="row mb-5" ref={sectionRef}>
          <div className="col-12 p-2">
            <Swiper
              slidesPerView="auto"
              spaceBetween={10}
              className="categories"
            >
              <SwiperSlide>
                <button className="active">{t("all")}</button>
              </SwiperSlide>

              {profile?.categories?.map((category) => (
                <SwiperSlide key={category.id}>
                  <button>{category.name}</button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {products?.map((product, index) => (
            <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
              <CompanyProductCard product={product} isShowAction={true} />
            </div>
          ))}
          
          {(isLoading || isFetchingNextPage) && (
            <>
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    className="col-lg-4 col-md-6 col-12 p-2"
                    key={`loader-${index}`}
                  >
                    <CompanyProductLoader />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
