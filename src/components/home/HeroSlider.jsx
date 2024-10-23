import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import useGetSliders from "../../hooks/settings/useGetSliders";

function HeroSlider() {
  const { data: sliders } = useGetSliders();

  return (
    <section className="hero_section">
      <div className="container">
        <Swiper
          effect="fade"
          loop={true}
          spaceBetween={30}
          className="hero_swiper"
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, EffectFade, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {sliders?.data?.data?.data &&
            sliders?.data?.data?.data?.length > 0 &&
            sliders?.data?.data?.data?.map((slider) => (
              <SwiperSlide key={slider?.id}>
                <Link>
                  <img src={slider?.image} alt="" />
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
}

export default HeroSlider;
