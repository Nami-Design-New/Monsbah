import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

function HeroSlider() {
  return (
    <section className="hero_section">
      <div className="container">
        <Swiper
          effect="fade"
          loop={true}
          spaceBetween={30}
          className="hero_swiper"
          pagination={{
            clickable: true
          }}
          modules={[Pagination, EffectFade, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <Link>
              <img src="/images/s1.webp" alt="" />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link>
              <img src="/images/banner.jpg" alt="" />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link>
              <img src="/images/s1.jpg" alt="" />
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default HeroSlider;
