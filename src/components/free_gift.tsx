import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Props = {};

const FreeGift = (props: Props) => {
  const t = useTranslations("freeGift");

  return (
    <section className="w-full bg-white">
      {/* Image Section - Full Width on Desktop Only */}
      <div className="md:block w-full relative h-[300px] md:h-[600px] bg-gray-50">
        <Image
          src="/freegift.png"
          alt={t("title")}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="w-full bg-gray-50 py-5 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Layout - Title First, Image Below */}
          <div className="md:hidden flex flex-col text-center mb-8">
            {/* Title */}
            <h2
              style={{ fontSize: "16px" }}
              className="text-2xl font-bold text-purple-700 mb-2"
            >
              {t("title")}
            </h2>

            {/* Subtitle */}
            <p
              style={{ fontSize: "14px" }}
              className="text-base text-gray-800 mb-6 font-medium"
            >
              {t("subtitle")}
            </p>

            {/* Product Image */}
            <div className="w-full relative h-[300px] mb-6">
              <Image
                src="/freegift-2.png"
                alt={t("title")}
                fill
                className="object-contain"
              />
            </div>

            {/* Description */}
            <p
              style={{ fontSize: "12px" }}
              className="text-sm text-gray-600 mb-6 leading-relaxed px-4"
            >
              {t("description")}
            </p>

            {/* CTA Link */}
            <div>
              <a
                style={{ fontSize: "14px" }}
                href="#"
                className="inline-flex items-center text-purple-700 hover:text-purple-900 font-semibold text-base transition-colors duration-300"
              >
                {t("getGift")}
                <span className="ml-2">›</span>
              </a>
            </div>
          </div>

          {/* Desktop Layout - Image Left, Text Right */}
          <div className="hidden md:flex flex-row items-center gap-16">
            {/* Product Image - Left Side */}
            <div className="w-1/2 relative h-[400px]">
              <Image
                src="/freegift-2.png"
                alt={t("title")}
                fill
                className="object-contain"
              />
            </div>

            {/* Text Content - Right Side */}
            <div className="w-1/2 flex flex-col justify-center text-left">
              {/* Title */}
              <h2
                style={{ fontSize: "16px" }}
                className="text-5xl font-bold text-purple-700 mb-4"
              >
                {t("title")}
              </h2>

              {/* Subtitle */}
              <p
                style={{ fontSize: "14px" }}
                className="text-2xl text-gray-800 mb-8 font-medium"
              >
                {t("subtitle")}
              </p>

              {/* Description */}
              <p
                style={{ fontSize: "12px" }}
                className="text-lg text-gray-600 mb-10 leading-relaxed"
              >
                {t("description")}
              </p>

              {/* CTA Link */}
              <div>
                <a
                  href="#"
                  style={{ fontSize: "14px" }}
                  className="inline-flex items-center text-purple-700 hover:text-purple-900 font-semibold text-lg transition-colors duration-300"
                >
                  {t("getGift")}
                  <span className="ml-2">›</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeGift;
