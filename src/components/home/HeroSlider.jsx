import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import useGetSliders from "../../hooks/settings/useGetSliders";

function HeroSlider() {
  const { data: sliders, isLoading } = useGetSliders();

  useEffect(() => {
    // This useEffect ensures the Swiper navigation gets initialized after the DOM is ready
  }, []);

  return (
    <section className="hero_section">
      <div className="container relative">
        <div className="swiper-wrapper">
          {!isLoading && (
            <div className="swiperControl">
              <div className="swiperBtns">
                <div
                  id="hero-swiper-button-next"
                  className="swiper-button-next"
                />
                <div
                  id="hero-swiper-button-prev"
                  className="swiper-button-prev"
                />
              </div>
            </div>
          )}

          <Swiper
            effect="fade"
            loop={true}
            spaceBetween={30}
            className="hero_swiper"
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: "#hero-swiper-button-next",
              prevEl: "#hero-swiper-button-prev",
            }}
            modules={[Pagination, EffectFade, Autoplay, Navigation]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            {isLoading ? (
              <>
                <SwiperSlide>
                  <div className="slider_loader"></div>
                </SwiperSlide>
              </>
            ) : (
              <>
                {sliders?.data?.data?.data &&
                  sliders?.data?.data?.data?.length > 0 &&
                  sliders?.data?.data?.data?.map((slider) => (
                    <SwiperSlide key={slider?.id}>
                      <Link>
                        <img src={slider?.image} alt="" />
                      </Link>
                    </SwiperSlide>
                  ))}
              </>
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default HeroSlider;
