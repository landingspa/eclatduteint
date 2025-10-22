"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCreative } from "swiper/modules";
import { useTranslations } from "next-intl";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

export default function SlideSection() {
  const t = useTranslations("slide2");
  const slides = [
    {
      id: 1,
      image: "/slide-1.png",
      hasContent: false,
    },
    {
      id: 2,
      image: "/slide-2.jpg",
      hasContent: true,
      contentImage: "/content-slide-2.png",
    },
    {
      id: 3,
      image: "/slide-3.jpg",
      mobileImage: "/slide-3-mobile.png",
      hasContent: false,
    },
  ];

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectCreative]}
        effect="creative"
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
            opacity: 0.5,
          },
          next: {
            translate: ["100%", 0, 0],
            opacity: 0,
          },
        }}
        speed={1200}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass:
            "swiper-pagination-bullet-active custom-bullet-active",
        }}
        loop={true}
        className="w-full h-full"
        grabCursor={true}
        touchRatio={1}
        allowTouchMove={true}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Background Image - Desktop */}
            <div className="absolute inset-0 w-full h-full lg:block hidden">
              <Image
                src={slide.image}
                alt={`Slide ${slide.id}`}
                fill
                className="object-cover"
                quality={100}
                priority={slide.id === 1}
              />
            </div>

            {/* Background Image - Mobile */}
            <div className="absolute inset-0 w-full h-full lg:hidden">
              <Image
                src={slide.mobileImage || slide.image}
                alt={`Slide ${slide.id}`}
                fill
                className="object-cover"
                quality={100}
                priority={slide.id === 1}
              />
            </div>

            {/* Content Image for Slide 2 */}
            {slide.hasContent && slide.contentImage && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 py-8">
                {/* Title - Above image */}
                <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-light mb-3 md:mb-4 text-center">
                  {t("title")}
                </h2>
                <p className="text-white text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-center">
                  {t("subtitle")}
                </p>

                {/* Content Image - Smaller size */}
                <div className="relative w-full max-w-[280px] md:max-w-[320px] lg:max-w-[380px] mb-6 md:mb-8">
                  <Image
                    src={slide.contentImage}
                    alt="Slide content"
                    width={400}
                    height={500}
                    className="w-full h-auto drop-shadow-2xl"
                    quality={100}
                  />
                </div>

                {/* Description - Below image */}
                <p className="text-white text-xs md:text-sm lg:text-base text-center max-w-xl mb-4 leading-relaxed px-4">
                  {t("description")}
                </p>

                {/* Learn More Link */}
                <button className="text-white text-xs md:text-sm underline hover:no-underline transition-all">
                  {t("learnMore")}
                </button>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination {
          bottom: 32px !important;
        }

        .custom-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .custom-bullet-active {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 1);
        }

        .swiper-pagination-bullet:hover {
          background: rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </section>
  );
}
