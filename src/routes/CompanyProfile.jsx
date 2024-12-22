import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetProducts from "../hooks/products/useGetProducts";
import ProductVertical from "../ui/cards/ProductVertical";
import ProductLoader from "../ui/loaders/ProductLoader";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CompanyProfile() {
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "WebShare API Demo",
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
  } = useGetProducts();

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
        <img src="/images/campany_banner.jpg" alt="banner" />
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 p-2">
            <div className="company_header">
              <div className="img">
                <img src="/images/company.png" alt="company" />
              </div>
              <div className="content">
                <div className="title">
                  <h3>قمر للعبايات الخليجي</h3>
                  <div className="actions">
                    <Link
                      aria-label="Profile"
                      className="action-btn follow_btn"
                    >
                      <i className="fa-solid fa-comment-dots"></i>{" "}
                    </Link>
                    <div className="share_btn" onClick={handleShare}>
                      <i className="fa-regular fa-share-nodes"></i>
                    </div>
                  </div>
                </div>
                <div className="stats">
                  <div className="f_badge">
                    <i className="fa-light fa-location-dot"></i> مكة ، السعودية
                  </div>
                  <div className="f_badge">
                    <i className="fa-regular fa-user-check"></i> 1000{" "}
                    {t("Followers")}
                  </div>
                  <div className="f_badge">
                    <i className="fa-light fa-user-group"></i> 100{" "}
                    {t("following")}
                  </div>
                  <div className="f_badge">
                    <i className="fa-light fa-clothes-hanger"></i> 100{" "}
                    {t("posts")}
                  </div>
                </div>
              </div>
            </div>
            <div className="about_company">
              <p>
                متجر عبايات القمر , نحن متجر مختص ببيع العبايات النسائية بأقل
                الأسعار وافخم الموديلات واجود انواع الأقمشة
              </p>
            </div>
          </div>
          <div className="col-12 p-2">
            <Swiper
              slidesPerView="auto"
              spaceBetween={10}
              className="categories"
            >
              <SwiperSlide>
                <button className="active">الكل</button>
              </SwiperSlide>
              <SwiperSlide>
                <button>عبايات خليجية</button>
              </SwiperSlide>
              <SwiperSlide>
                <button>عبايات تركية</button>
              </SwiperSlide>
              <SwiperSlide>
                <button>عبايات سعودية</button>
              </SwiperSlide>
              <SwiperSlide>
                <button>عبايات مصرية</button>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div className="row mb-5" ref={sectionRef}>
          {products?.map((product, index) => (
            <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
              <ProductVertical product={product} isShowAction={false} />
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
                    <ProductLoader />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
