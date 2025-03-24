import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import StarsRate from "../ui/StarsRate";
import useGetCompanyProducts from "../hooks/products/useGetCompanyProducts";
import ProductLoader from "../ui/loaders/ProductLoader";
import CompanyProductCard from "../ui/cards/CompanyProductCard";

export default function CompanyAccount() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const profile = useSelector((state) => state.clientData.client);
  let currentUrl = window.location.href;
  const currentPageLink = currentUrl.replace(
    "/company-profile",
    `/companies/${profile?.id}`
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: profile?.client?.name,
          text: profile?.client?.about,
          url: currentPageLink,
        })
        .then(() => t("Shared successfully"))
        .catch((error) => t("Error sharing:", error));
    } else {
      alert(t("share_not_supported"));
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.content}
    </Tooltip>
  );

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentPageLink);
    setShowTooltip(true);
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

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  const handleSearch = (categoryId) => {
    if (categoryId) {
      setSearchParams({ sub_category: categoryId });
    } else {
      setSearchParams({});
    }
  };

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
                  <div className="d-flex flex-column">
                    <span className="d-flex gap-2">
                      <i className="fa-regular fa-user-check"></i>{" "}
                      {profile?.["followers-count"]}
                    </span>
                    <span>{t("Followers")}</span>
                  </div>
                </div>
                <div className="f_badge">
                  <div className="d-flex flex-column">
                    <span className="d-flex gap-2">
                      <i className="fa-light fa-user-group"></i>{" "}
                      {profile?.["following-count"]}
                    </span>
                    <span>{t("following")}</span>
                  </div>
                </div>
                <div className="f_badge">
                  <div className="d-flex flex-column">
                    <span className="d-flex gap-2">
                      <i className="fa-light fa-clothes-hanger"></i>{" "}
                      {profile?.["ads-count"]}
                    </span>
                    <span> {t("posts")}</span>
                  </div>
                </div>
                <div className="f_badge">
                  <div className="d-flex flex-column">
                    <span className="d-flex gap-2">
                      <i className="fa-light fa-location-dot"></i>{" "}
                      {t("loaction")}
                    </span>
                    <span>
                      {profile?.city?.name} ، {profile?.country?.name}
                    </span>
                  </div>
                </div>
              </div>

              <StarsRate
                rate={profile?.rate}
                reviewsCount={profile?.["rate-count"]}
                showbtn={true}
                company={profile}
                isMyCompany={true}
              />

              <OverlayTrigger
                placement="bottom"
                show={showTooltip}
                overlay={renderTooltip({
                  content: t("services.linkCopied"),
                })}
              >
                <button className="share_link" onClick={handleCopy}>
                  <i className="fa-regular fa-copy"></i> {t("copyLink")}
                </button>
              </OverlayTrigger>
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
                <button
                  className={
                    Number(searchParams.get("sub_category")) === 0
                      ? "active"
                      : ""
                  }
                  onClick={() => handleSearch(null)}
                >
                  {t("all")}
                </button>
              </SwiperSlide>

              {profile?.categories?.map((category) => (
                <SwiperSlide key={category.id}>
                  <button
                    className={
                      Number(searchParams.get("sub_category")) === category?.id
                        ? "active"
                        : ""
                    }
                    onClick={() => handleSearch(category.id)}
                  >
                    {category.name}
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {products?.map((product, index) => (
            <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
              <CompanyProductCard product={product} />
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
