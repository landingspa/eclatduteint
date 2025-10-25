"use client";

import React from "react";
import { useTranslations } from "next-intl";

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
            <em>{t("shoppingBagPage.hero.notice")}</em>
          </p>
          <p className="text-2xl mb-1">{t("shoppingBagPage.hero.title")}</p>
          <p className="text-sm mb-6" style={{ letterSpacing: "5px" }}>
            {t("shoppingBagPage.hero.subtitle")}
          </p>
          <p className="text-xs">{t("shoppingBagPage.hero.description")}</p>
        </div>

        {/* Main Image */}
        <div className="w-full flex justify-center mt-8">
          <img
            src="https://cdn.imweb.me/thumbnail/20231220/30bc071bac80d.png"
            alt="Shopping Bag"
            className="w-auto"
            style={{ height: "707px" }}
          />
        </div>
      </section>

      {/* Desktop Showcase Section */}
      <section
        className="hidden md:block relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/34828d46ffd36.jpg')",
        }}
      >
        <div className="py-48">
          <div className="w-full">
            <img
              src="https://cdn.imweb.me/thumbnail/20231221/ce5c5d9c187fc.jpg"
              alt="Shopping Bag Display"
              className="w-full"
              style={{ height: "853px", objectFit: "cover" }}
            />
          </div>

          <div className="grid grid-cols-2 mt-12">
            {/* Left Placeholder */}
            <div style={{ height: "550px" }}></div>

            {/* Right Image - Top placeholder + Bottom image */}
            <div className="flex flex-col">
              <div style={{ height: "550px" }}></div>
              <div
                className="w-full overflow-hidden flex items-center justify-center"
                style={{ height: "900px" }}
              >
                <img
                  src="https://cdn.imweb.me/thumbnail/20231221/5689852c12654.jpg"
                  alt="Shopping Bag Detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 mt-12 px-12">
            {/* Left - Empty space at top, image at bottom */}
            <div className="flex flex-col">
              <div style={{ height: "550px" }}></div>
              <div
                className="w-full overflow-hidden flex items-center justify-center"
                style={{ height: "900px" }}
              >
                <img
                  src="https://cdn.imweb.me/thumbnail/20231221/5689852c12654.jpg"
                  alt="Shopping Bag Usage"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Image */}
            <div className="flex items-start justify-center">
              <div
                className="w-full overflow-hidden flex items-center justify-center"
                style={{ height: "550px" }}
              >
                <img
                  src="https://cdn.imweb.me/thumbnail/20231221/aec655521170d.jpg"
                  alt="Shopping Bag Close-up"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
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
              <p className="text-sm mb-2">
                {t("shoppingBagPage.relatedProducts.signboard.notice")}
              </p>
              <p className="text-lg mb-1">
                {t("shoppingBagPage.relatedProducts.signboard.title")}
              </p>
              <p className="text-xs mb-4" style={{ letterSpacing: "5px" }}>
                {t("shoppingBagPage.relatedProducts.signboard.subtitle")}
              </p>
              <p className="text-xs">{t("purpleLine.signboard.button")}</p>
            </div>
          </a>

          {/* Second Row - 2x2 Grid */}
          <div className="grid grid-cols-2 gap-8">
            {/* Poster */}
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
                  {t("shoppingBagPage.relatedProducts.poster.notice")}
                </p>
                <p className="text-lg mb-1">
                  {t("shoppingBagPage.relatedProducts.poster.title")}
                </p>
                <p className="text-xs mb-4" style={{ letterSpacing: "5px" }}>
                  {t("shoppingBagPage.relatedProducts.poster.subtitle")}
                </p>
                <p className="text-xs">{t("purpleLine.poster.button")}</p>
              </div>
            </a>

            {/* Banner */}
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
                  {t("shoppingBagPage.relatedProducts.banner.notice")}
                </p>
                <p className="text-lg mb-1">
                  {t("shoppingBagPage.relatedProducts.banner.title")}
                </p>
                <p className="text-xs mb-4" style={{ letterSpacing: "5px" }}>
                  {t("shoppingBagPage.relatedProducts.banner.subtitle")}
                </p>
                <p className="text-xs">{t("purpleLine.banner.button")}</p>
              </div>
            </a>

            {/* Brochure */}
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
                  {t("shoppingBagPage.relatedProducts.brochure.notice")}
                </p>
                <p className="text-lg mb-1">
                  {t("shoppingBagPage.relatedProducts.brochure.title")}
                </p>
                <p className="text-xs mb-4" style={{ letterSpacing: "5px" }}>
                  {t("shoppingBagPage.relatedProducts.brochure.subtitle")}
                </p>
                <p className="text-xs">{t("purpleLine.brochure.button")}</p>
              </div>
            </a>

            {/* Shopping Bag (Current Page) */}
            <a
              href="/183"
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
                  {t("shoppingBagPage.relatedProducts.shoppingBag.notice")}
                </p>
                <p className="text-lg mb-1">
                  {t("shoppingBagPage.relatedProducts.shoppingBag.title")}
                </p>
                <p className="text-xs mb-4" style={{ letterSpacing: "5px" }}>
                  {t("shoppingBagPage.relatedProducts.shoppingBag.subtitle")}
                </p>
                <p className="text-xs">{t("purpleLine.shoppingBag.button")}</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Desktop Contact Section */}
      <section
        className="hidden md:block relative bg-cover bg-center bg-no-repeat py-24"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/30829ed3380bb.jpg')",
        }}
      >
        <div className="text-center text-white mb-8">
          <p className="text-2xl mb-2">{t("shoppingBagPage.contact.title")}</p>
          <p className="text-sm mb-6" style={{ letterSpacing: "5px" }}>
            {t("shoppingBagPage.contact.subtitle")}
          </p>
          <p className="text-xs mb-1">
            {t("shoppingBagPage.contact.description")}
          </p>
          <p className="text-xs">
            {t("shoppingBagPage.contact.descriptionLine2")}
          </p>
        </div>

        <div className="flex justify-center">
          <a
            href="http://pf.kakao.com/_hnkCxj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition-colors text-lg font-medium"
          >
            <svg
              className="w-6 h-6 mr-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413 1.428 2.033a.472.472 0 1 0 .773-.543l-1.514-2.155zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 1 0 0-.944zm-5.857-1.092l.696-1.707.638 1.707H9.092zm2.523.488l.002-.016a.469.469 0 0 0-.127-.32l-1.046-2.8a.69.69 0 0 0-.627-.474.696.696 0 0 0-.653.447l-1.661 4.075a.472.472 0 0 0 .874.357l.33-.813h2.07l.299.8a.472.472 0 1 0 .884-.33l-.345-.926zM8.293 9.302a.472.472 0 0 0-.471-.472H4.577a.472.472 0 1 0 0 .944h1.16v3.736a.472.472 0 0 0 .944 0V9.774h1.14c.261 0 .472-.212.472-.472z" />
            </svg>
            {t("purpleLine.contact.button")}
          </a>
        </div>

        <div className="py-12"></div>
      </section>

      {/* Mobile Hero Section */}
      <section
        className="md:hidden min-h-screen flex flex-col items-center justify-center relative bg-cover bg-center bg-no-repeat px-4 py-12"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/34828d46ffd36.jpg')",
        }}
      >
        <div className="text-center text-white mb-6">
          <p className="text-xs mb-2">
            <em>{t("shoppingBagPage.hero.notice")}</em>
          </p>
          <p className="text-lg mb-1">{t("shoppingBagPage.hero.title")}</p>
          <p className="text-[10px] mb-4" style={{ letterSpacing: "3px" }}>
            {t("shoppingBagPage.hero.subtitle")}
          </p>
          <p className="text-[10px]">{t("shoppingBagPage.hero.description")}</p>
        </div>

        <div className="w-full flex justify-center">
          <img
            src="https://cdn.imweb.me/thumbnail/20231220/30bc071bac80d.png"
            alt="Shopping Bag"
            className="w-auto max-w-full"
            style={{ maxHeight: "400px" }}
          />
        </div>
      </section>

      {/* Mobile Showcase Section */}
      <section
        className="md:hidden relative bg-cover bg-center bg-no-repeat py-12 px-4"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/34828d46ffd36.jpg')",
        }}
      >
        <div className="mb-8">
          <img
            src="https://cdn.imweb.me/thumbnail/20231221/ce5c5d9c187fc.jpg"
            alt="Shopping Bag Display"
            className="w-full"
          />
        </div>

        <div className="mb-8">
          <img
            src="https://cdn.imweb.me/thumbnail/20231221/5689852c12654.jpg"
            alt="Shopping Bag Detail"
            className="w-full"
          />
        </div>

        <div className="mb-8">
          <img
            src="https://cdn.imweb.me/thumbnail/20231221/aec655521170d.jpg"
            alt="Shopping Bag Close-up"
            className="w-full"
          />
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
        <div className="text-center text-white mb-6">
          <p className="text-lg mb-2">{t("shoppingBagPage.contact.title")}</p>
          <p className="text-[10px] mb-4" style={{ letterSpacing: "3px" }}>
            {t("shoppingBagPage.contact.subtitle")}
          </p>
          <p className="text-[10px] mb-1">
            {t("shoppingBagPage.contact.description")}
          </p>
          <p className="text-[10px]">
            {t("shoppingBagPage.contact.descriptionLine2")}
          </p>
        </div>

        <div className="flex justify-center">
          <a
            href="http://pf.kakao.com/_hnkCxj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition-colors text-sm font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413 1.428 2.033a.472.472 0 1 0 .773-.543l-1.514-2.155zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 1 0 0-.944zm-5.857-1.092l.696-1.707.638 1.707H9.092zm2.523.488l.002-.016a.469.469 0 0 0-.127-.32l-1.046-2.8a.69.69 0 0 0-.627-.474.696.696 0 0 0-.653.447l-1.661 4.075a.472.472 0 0 0 .874.357l.33-.813h2.07l.299.8a.472.472 0 1 0 .884-.33l-.345-.926zM8.293 9.302a.472.472 0 0 0-.471-.472H4.577a.472.472 0 1 0 0 .944h1.16v3.736a.472.472 0 0 0 .944 0V9.774h1.14c.261 0 .472-.212.472-.472z" />
            </svg>
            {t("purpleLine.contact.button")}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Page;
