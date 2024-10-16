import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import "./SwpierAddProduct.css";
import { EffectCreative } from "swiper/modules";
import { useRef, useEffect } from "react";


export default function SwiperProduct({
  previews,
  onImageChange,
  setImages,
  onDeleteImage,
}) {
  const swiperRef = useRef(null);

  const handleDeleteImage = (index) => {
    URL.revokeObjectURL(previews[index]);
    const updatedImages = previews.filter((_, imgIndex) => imgIndex !== index);
    console.log("Updated images:", updatedImages);
    setImages(updatedImages);
  };

  //   const handleSlideChange = () => {
  //     if (swiperRef.current && swiperRef.current.swiper) {
  //       onImageChange(swiperRef.current.swiper.activeIndex);
  //     }
  //   };

  return (
    <>
      <Swiper
        className="mySwiper3"
        ref={swiperRef}
        // onSlideChange={handleSlideChange}
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-120%", 0, -500],
          },
          next: {
            shadow: true,
            translate: ["120%", 0, -500],
          },
        }}
        modules={[EffectCreative]}
      >
        {previews.length !== 0 ? (
          previews?.map((preview, index) => (
            <SwiperSlide key={index}>
              <img src={preview} alt="preview" className="slider-images" />
              <button
                className="delete-button"
                onClick={() => onDeleteImage(index)}
              >
                Delete
              </button>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <h3>Drag & drop l’image png du produit</h3>
            <h4>Drag ou télécharger </h4>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
}
