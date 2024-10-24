import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Pagination, Autoplay } from "swiper/modules";
import useGetSliders from "../../hooks/settings/useGetSliders";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

function HeroSlider() {
  const { data: sliders, isLoading } = useGetSliders();

  const sliderData = sliders?.data?.data?.data || [];
  const slidesCount = sliderData.length;

  return (
    <section className="hero_section">
      <div className="container">
        <div className="swiper_wrapper">
          {slidesCount > 1 && (
            <div className="swiperControl d-none d-md-block">
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </div>
          )}

          <Swiper
            speed={1000}
            effect="fade"
            loop={slidesCount > 1}
            modules={[Navigation, EffectFade, Autoplay, Pagination]}
            navigation={
              slidesCount > 1
                ? {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }
                : false
            }
            pagination={
              slidesCount > 1
                ? {
                    clickable: true,
                  }
                : false
            }
            spaceBetween={30}
            className="hero_swiper"
            autoplay={
              slidesCount > 1
                ? { delay: 3000, disableOnInteraction: false }
                : false
            }
          >
            {isLoading ? (
              <>
                <SwiperSlide>
                  <div className="slider_loader"></div>
                </SwiperSlide>
              </>
            ) : (
              <>
                {sliderData.map((slider) => (
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
