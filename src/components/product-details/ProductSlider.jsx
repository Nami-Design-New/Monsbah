import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import { isValidVideoExtension } from "../../utils/helpers";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function ProductSlider({ product }) {
  const [images, setImages] = useState([]);
  const [autoplayDelay, setAutoplayDelay] = useState(3000);
  const videoRef = useRef(null);

  useEffect(() => {
    const srcs = product?.images?.map((image) => image?.image);
    if (srcs) {
      setImages([product?.image, ...srcs]);
    }
  }, [product]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        const videoDuration = videoRef.current.duration * 1000;
        setAutoplayDelay(videoDuration);
      };
    }
  }, [videoRef]);

  // Initialize Fancybox on mount
  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {});
  }, []);

  const slidesCount = images.length;

  return (
    <div className="swiper_wrapper">
      {/* Conditionally show navigation controls if there are more than 1 slide */}
      {slidesCount > 1 && (
        <div className="swiperControl d-none d-md-block">
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      )}

      <Swiper
        effect="fade"
        loop={slidesCount > 1}
        className="product_swiper"
        pagination={slidesCount > 1 ? { clickable: true } : false}
        navigation={
          slidesCount > 1
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        modules={[Navigation, EffectFade, Autoplay, Pagination]}
        autoplay={
          slidesCount > 1
            ? { delay: autoplayDelay, disableOnInteraction: false }
            : false
        }
        onSlideChange={(swiper) => {
          if (swiper.realIndex === 0 && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setAutoplayDelay(videoRef.current.duration * 1000);
          } else {
            setAutoplayDelay(3000);
          }
        }}
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index}>
            {isValidVideoExtension(image) ? (
              <video
                className="blurde_bg"
                src={image}
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img className="blurde_bg" src={image} alt="bluer_image" />
            )}
            <a href={image} data-fancybox="gallery">
              {isValidVideoExtension(image) ? (
                <video
                  src={image}
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img src={image} alt={image} />
              )}
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
