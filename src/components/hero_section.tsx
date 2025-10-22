"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative w-full min-h-screen lg:h-[100vh] lg:min-h-[900px] overflow-hidden">
      {/* Image Background - Mobile only */}
      <div className="relative w-full h-[60vh] lg:hidden">
        <Image
          src="/hero.png"
          alt="Éclat du teint Hero"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
      </div>

      {/* Video Background - Desktop only */}
      <div className="hidden lg:block absolute inset-0 w-full h-full overflow-hidden bg-gray-100">
        {/* Option 1: Use HTML5 video for seamless loop (recommended) */}
        <video
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content Overlay - Mobile */}
      <div className="relative z-10 py-8 lg:hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              style={{
                color: "rgb(102, 45, 145)",
                fontSize: "16px",
                fontWeight: "500",
              }}
              className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 md:mb-6 tracking-wide"
            >
              {t("title")}
            </h1>
            <p
              style={{ fontSize: "14px", color: "rgb(102, 45, 145)" }}
              className="text-lg sm:text-xl md:text-2xl mb-3 md:mb-4 font-light"
            >
              {t("subtitle")}
            </p>
            <p
              style={{ fontSize: "10px", color: "#595757" }}
              className="text-sm sm:text-base md:text-lg mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto"
            >
              {t("description")}
            </p>
            <button
              style={{ color: "rgb(102, 45, 145)" }}
              className="cursor-pointer px-6 md:px-8 py-2.5 md:py-3"
            >
              {t("learnMore")}
            </button>
          </div>
        </div>
      </div>

      {/* Content Overlay - Desktop (Right Side) */}
      <div className="hidden lg:flex absolute inset-0 items-center justify-end z-10">
        <div className="w-1/2 pr-12 xl:pr-20">
          <div className="max-w-2xl ml-auto text-right">
            <h1
              style={{
                color: "rgb(102, 45, 145)",
                fontSize: "30px",
                fontWeight: "500",
              }}
              className="text-4xl xl:text-5xl 2xl:text-6xl font-light mb-6 tracking-wide"
            >
              {t("title")}
            </h1>
            <p
              style={{ color: "rgb(102, 45, 145)", fontSize: "20px" }}
              className="text-xl xl:text-2xl mb-5 font-light"
            >
              {t("subtitle")}
            </p>
            <p
              style={{ color: "#595757", fontSize: "14px" }}
              className="text-base xl:text-lg mb-8 leading-relaxed"
            >
              {t("description")}
            </p>
            <button
              style={{
                color: "rgb(102, 45, 145)",
                borderColor: "rgb(102, 45, 145)",
                fontSize: "16px",
                fontWeight: "500",
              }}
              className="cursor-pointer px-10 py-3 "
            >
              {t("learnMore")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
