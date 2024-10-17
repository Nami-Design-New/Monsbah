import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
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

  return (
    <Swiper
      effect="fade"
      loop={true}
      className="product_swiper"
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Autoplay, Pagination]}
      autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
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
          <a
            href={image}
            data-fancybox="gallery"
            data-caption={isValidVideoExtension(image) ? "Video" : "Image"}
          >
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
              <img
                className="blurde_bg"
                src={image}
                alt={"product image #" + index}
              />
            )}
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
