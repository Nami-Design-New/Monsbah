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

  return (
    <section className="hero_section">
      <div className="container">
        <div className="swiper_wrapper">
          <div className="swiperControl">
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>

          <Swiper
            speed={1000}
            effect="fade"
            loop={true}
            modules={[Navigation, EffectFade, Autoplay, Pagination]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
            }}
            spaceBetween={30}
            className="hero_swiper"
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
