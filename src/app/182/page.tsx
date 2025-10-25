"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { XBannerGallery } from "@/components/xbanner_gallery";
import { MiniBannerGallery } from "@/components/minibanner_gallery";

type Props = {};

const Page = (props: Props) => {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Hero Section */}
      <section
        className="hidden md:flex min-h-screen flex-col items-center justify-start pt-24 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/34828d46ffd36.jpg')",
        }}
      >
        <div className="text-center text-white z-10 mb-6">
          <p className="text-sm mb-2">
            <em>{t("bannerPage.hero.notice")}</em>
          </p>
          <p className="text-lg mb-1">{t("bannerPage.hero.title")}</p>
          <p className="text-xs mb-6" style={{ letterSpacing: "5px" }}>
            {t("bannerPage.hero.subtitle")}
          </p>
          <p className="text-xs">{t("bannerPage.hero.description")}</p>
        </div>

        {/* Main Image */}
        <div className="w-full flex justify-center">
          <img
            src="https://cdn.imweb.me/thumbnail/20231220/487dfa5bb82fe.png"
            alt="X-Banner & Mini Banner"
            className="w-auto"
            style={{ height: "500px" }}
          />
        </div>
      </section>

      {/* Desktop Double Image Section */}
      <section
        className="hidden md:block relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/34828d46ffd36.jpg')",
        }}
      >
        <div className="py-48">
          <div className="grid grid-cols-2">
            {/* Left Image */}
            <div className="flex items-center justify-center">
              <div
                className="w-full overflow-hidden flex items-center justify-center"
                style={{ height: "600px" }}
              >
                <img
                  src="https://cdn.imweb.me/thumbnail/20231220/dc30086009759.jpg"
                  alt="Banner Display"
                  className="h-full w-auto object-cover"
                />
              </div>
            </div>

            {/* Right Placeholder */}
            <div className="grid grid-rows-2">
              <div style={{ height: "600px" }}></div>
              <div
                className="w-full overflow-hidden flex items-center justify-center"
                style={{ height: "700px" }}
              >
                <img
                  src="https://cdn.imweb.me/thumbnail/20231220/c17248ea1937d.jpg"
                  alt="Banner Display 2"
                  className="h-full w-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop X-Banner Gallery Section */}
      <section
        className="hidden md:block relative bg-cover bg-center bg-no-repeat py-24"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/34828d46ffd36.jpg')",
        }}
      >
        <div className="text-center text-white mb-12">
          <p className="text-base mb-4">{t("bannerPage.galleryInfo.title")}</p>
          <p className="text-xs mb-1">
            {t("bannerPage.galleryInfo.description")}
          </p>
          <p className="text-xs">
            {t("bannerPage.galleryInfo.descriptionLine2")}
          </p>
        </div>

        <div className="text-center text-white mb-12 mt-24">
          <p className="text-base">
            {t("bannerPage.galleryInfo.xBannerTitle")}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <XBannerGallery />
          </div>
        </div>

        <div className="text-center text-white mb-12 mt-24">
          <p className="text-base">
            {t("bannerPage.galleryInfo.miniBannerTitle")}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <MiniBannerGallery />
          </div>
        </div>

        <div className="py-48"></div>
      </section>

      {/* Desktop Related Products Section */}
      <section
        className="hidden md:block relative bg-cover bg-center bg-no-repeat py-24"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/34828d46ffd36.jpg')",
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* First Row - Full Width */}
          <a
            href="/178"
            className="block mb-8 relative overflow-hidden group"
            style={{
              backgroundImage:
                "url('https://cdn.imweb.me/thumbnail/20231220/73408acde3817.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "400px",
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <p className="text-sm mb-2">The Purple Line_01</p>
              <p className="text-lg mb-1">에끌라뒤땅 공식 인증점 현판</p>
              <p className="text-xs mb-4" style={{ letterSpacing: "5px" }}>
                SIGNBOARD
              </p>
              <p className="text-xs">View More &gt;</p>
            </div>
          </a>

          {/* Second Row - Two Columns */}
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="grid grid-rows-2 gap-8">
              <a
                href="/178"
                className="block relative overflow-hidden group"
                style={{
                  backgroundImage:
                    "url('https://cdn.imweb.me/thumbnail/20231220/73408acde3817.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "400px",
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <p className="text-sm mb-2">
                    {t("bannerPage.relatedProducts.signboard.notice")}
                  </p>
                  <p className="text-lg mb-1">
                    {t("bannerPage.relatedProducts.signboard.title")}
                  </p>
                  <p className="text-xs mb-4" style={{ letterSpacing: "5px" }}>
                    {t("bannerPage.relatedProducts.signboard.subtitle")}
                  </p>
                  <p className="text-xs">{t("purpleLine.signboard.button")}</p>
                </div>
              </a>

              <a
                href="/179"
                className="block relative overflow-hidden group"
                style={{
                  backgroundImage:
                    "url('https://cdn.imweb.me/thumbnail/20231220/fe26d18dff3c9.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "400px",
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <p className="text-sm mb-2">
                    {t("bannerPage.relatedProducts.poster.notice")}
                  </p>
                  <p className="text-lg mb-1">
                    {t("bannerPage.relatedProducts.poster.title")}
                  </p>
                  <p className="text-xs mb-4" style={{ letterSpacing: "5px" }}>
                    {t("bannerPage.relatedProducts.poster.subtitle")}
                  </p>
                  <p className="text-xs">{t("purpleLine.poster.button")}</p>
                </div>
              </a>
            </div>

            {/* Right Column */}
            <div className="grid grid-rows-2 gap-8">
              <a
                href="/182"
                className="block relative overflow-hidden group"
                style={{
                  backgroundImage:
                    "url('https://cdn.imweb.me/thumbnail/20231220/76f6bed2ad228.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "400px",
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <p className="text-sm mb-2">
                    {t("bannerPage.relatedProducts.banner.notice")}
                  </p>
                  <p className="text-lg mb-1">
                    {t("bannerPage.relatedProducts.banner.title")}
                  </p>
                  <p className="text-xs mb-4" style={{ letterSpacing: "5px" }}>
                    {t("bannerPage.relatedProducts.banner.subtitle")}
                  </p>
                  <p className="text-xs">{t("purpleLine.banner.button")}</p>
                </div>
              </a>

              <a
                href="/181"
                className="block relative overflow-hidden group"
                style={{
                  backgroundImage:
                    "url('https://cdn.imweb.me/thumbnail/20231220/fe26d18dff3c9.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "400px",
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <p className="text-sm mb-2">
                    {t("bannerPage.relatedProducts.brochure.notice")}
                  </p>
                  <p className="text-lg mb-1">
                    {t("bannerPage.relatedProducts.brochure.title")}
                  </p>
                  <p className="text-xs mb-4" style={{ letterSpacing: "5px" }}>
                    {t("bannerPage.relatedProducts.brochure.subtitle")}
                  </p>
                  <p className="text-xs">{t("purpleLine.brochure.button")}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="py-24"></div>
      </section>

      {/* Desktop Contact Section */}
      <section
        className="hidden md:block relative bg-cover bg-center bg-no-repeat py-24"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/30829ed3380bb.jpg')",
        }}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-2xl mb-4">{t("bannerPage.contact.title")}</h2>
          <p className="text-sm mb-6" style={{ letterSpacing: "5px" }}>
            {t("bannerPage.contact.subtitle")}
          </p>
          <p className="text-xs mb-1">{t("bannerPage.contact.description")}</p>
          <p className="text-xs mb-8">
            {t("bannerPage.contact.descriptionLine2")}
          </p>
          <a
            href="http://pf.kakao.com/_hnkCxj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition-colors"
          >
            <span className="mr-2">💬</span>
            {t("bannerPage.contact.title")}
          </a>
        </div>

        <div className="py-24"></div>
      </section>

      {/* Mobile Hero Section */}
      <section
        className="md:hidden min-h-screen flex flex-col items-center justify-center relative bg-cover bg-center bg-no-repeat px-4 py-12"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/34828d46ffd36.jpg')",
        }}
      >
        <div className="text-center text-white z-10 mb-8">
          <p className="text-xs mb-2">
            <em>{t("bannerPage.hero.notice")}</em>
          </p>
          <p className="text-base mb-2">{t("bannerPage.hero.title")}</p>
          <p className="text-[10px] mb-4" style={{ letterSpacing: "3px" }}>
            {t("bannerPage.hero.subtitle")}
          </p>
          <p className="text-[10px] leading-relaxed">
            {t("bannerPage.hero.description")}
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full flex justify-center px-4">
          <img
            src="https://cdn.imweb.me/thumbnail/20231220/487dfa5bb82fe.png"
            alt="X-Banner & Mini Banner"
            className="w-full max-w-sm h-auto"
          />
        </div>
      </section>

      {/* Mobile Gallery Info Section */}
      <section
        className="md:hidden relative bg-cover bg-center bg-no-repeat py-12 px-4"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/34828d46ffd36.jpg')",
        }}
      >
        <div className="text-center text-white mb-8">
          <p className="text-sm mb-3">{t("bannerPage.galleryInfo.title")}</p>
          <p className="text-[10px] mb-1">
            {t("bannerPage.galleryInfo.description")}
          </p>
          <p className="text-[10px]">
            {t("bannerPage.galleryInfo.descriptionLine2")}
          </p>
        </div>

        {/* X-Banner Title */}
        <div className="text-center text-white mb-6 mt-12">
          <p className="text-sm">{t("bannerPage.galleryInfo.xBannerTitle")}</p>
        </div>

        {/* X-Banner Mobile Gallery - Show 4 images in 2x2 grid */}
        <div className="mb-12">
          <XBannerGallery />
        </div>

        {/* Mini Banner Title */}
        <div className="text-center text-white mb-6 mt-12">
          <p className="text-sm">
            {t("bannerPage.galleryInfo.miniBannerTitle")}
          </p>
        </div>

        {/* Mini Banner Mobile Gallery */}
        <div className="mb-12">
          <MiniBannerGallery />
        </div>
      </section>

      {/* Mobile Contact Section */}
      <section
        className="md:hidden relative bg-cover bg-center bg-no-repeat py-12 px-4"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/30829ed3380bb.jpg')",
        }}
      >
        <div className="text-center text-white">
          <h2 className="text-xl mb-3">{t("bannerPage.contact.title")}</h2>
          <p className="text-xs mb-4" style={{ letterSpacing: "3px" }}>
            {t("bannerPage.contact.subtitle")}
          </p>
          <p className="text-[10px] mb-1 leading-relaxed">
            {t("bannerPage.contact.description")}
          </p>
          <p className="text-[10px] mb-6 leading-relaxed">
            {t("bannerPage.contact.descriptionLine2")}
          </p>
          <a
            href="http://pf.kakao.com/_hnkCxj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-2 bg-yellow-400 text-gray-900 text-sm rounded hover:bg-yellow-500 transition-colors"
          >
            <span className="mr-2">💬</span>
            {t("bannerPage.contact.title")}
          </a>
        </div>

        <div className="py-12"></div>
      </section>
    </div>
  );
};

export default Page;
