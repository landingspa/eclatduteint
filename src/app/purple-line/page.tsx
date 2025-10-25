import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

type Props = {};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const t = await getTranslations("purpleLine");
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

const page = (props: Props) => {
  const t = useTranslations("purpleLine");

  return (
    <div>
      <section
        className="relative w-full h-[431px] md:h-screen"
        style={{
          backgroundImage:
            "url(https://cdn.imweb.me/thumbnail/20231218/6667073ccdab3.jpg)",
          backgroundColor: "rgba(221, 221, 221, 0)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      ></section>
      <section className="relative w-full">
        {/* Desktop layout - Text overlay on image */}
        <div className="hidden md:block">
          <div
            className="relative w-full h-screen"
            style={{
              backgroundImage:
                "url(https://cdn.imweb.me/thumbnail/20231218/b93b2778611bf.jpg)",
              backgroundColor: "rgba(221, 221, 221, 0)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-start px-12 lg:px-24">
              <div className="max-w-xl text-left">
                <h1
                  style={{ fontSize: "30px", color: "rgb(102, 45, 145)" }}
                  className="text-4xl lg:text-5xl font-light mb-4 text-purple-700 italic"
                >
                  {t("hero.title")}
                </h1>
                <h2
                  style={{ fontSize: "20px", color: "rgb(102, 45, 145)" }}
                  className="text-2xl lg:text-3xl font-light mb-6 text-purple-600"
                >
                  {t("hero.subtitle")}
                </h2>
                <p
                  style={{ fontSize: "20px" }}
                  className="text-base lg:text-lg text-gray-700 leading-relaxed"
                >
                  {t("intro.description")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile layout - Image on top, text below */}
        <div className="block md:hidden">
          <div
            className="relative w-full h-[431px]"
            style={{
              backgroundImage:
                "url(https://cdn.imweb.me/thumbnail/20231218/b93b2778611bf.jpg)",
              backgroundColor: "rgba(221, 221, 221, 0)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
            }}
          ></div>
          <div className="bg-white px-6 py-12">
            <h1
              style={{ fontSize: "20px" }}
              className="text-3xl font-light mb-3 text-purple-700 italic"
            >
              {t("hero.title")}
            </h1>
            <h2
              style={{ fontSize: "16px" }}
              className="text-xl font-light mb-4 text-purple-600"
            >
              {t("hero.subtitle")}
            </h2>
            <p
              style={{ fontSize: "14px" }}
              className="text-base text-gray-700 leading-relaxed"
            >
              {t("intro.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Membership Package Category Section */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <h2
            style={{ fontSize: "20px", color: "rgb(102, 45, 145)" }}
            className="text-3xl md:text-4xl font-light mb-4 text-purple-700"
          >
            {t("membership.title")}
          </h2>
          <p
            style={{ fontSize: "16px" }}
            className="text-lg md:text-xl  font-light"
          >
            {t("membership.subtitle")}
          </p>
        </div>
      </section>

      {/* Purple Line 01 - Signboard Section */}
      <section
        className="relative w-full"
        style={{
          backgroundImage:
            "url(https://cdn.imweb.me/thumbnail/20231219/30829ed3380bb.jpg)",
          backgroundColor: "rgba(221, 221, 221, 0)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      >
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="container mx-auto py-12">
            <div className="grid grid-cols-12 gap-0 items-center min-h-[605px]">
              <div className="col-span-6">
                <img
                  src="https://cdn.imweb.me/thumbnail/20231219/127d65c749824.png"
                  alt="Official Membership Signboard"
                  className="w-full h-auto"
                />
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-5 text-left px-8">
                <p className="text-white text-base italic mb-6">
                  {t("signboard.label")}
                </p>
                <p className="text-white mb-4 leading-relaxed">
                  {t("signboard.notice")}
                </p>
                <h3 className="text-white text-2xl font-light mb-2">
                  {t("signboard.title")}
                </h3>
                <p
                  className="text-white text-sm mb-6"
                  style={{ letterSpacing: "5px" }}
                >
                  {t("signboard.subtitle")}
                </p>
                <p className="text-white text-xs leading-relaxed mb-8">
                  {t("signboard.description")}
                </p>
                <a
                  href="/178"
                  className="inline-flex items-center px-6 py-2 border border-white text-white rounded hover:bg-white hover:text-purple-700 transition-colors"
                >
                  <i className="mr-2">→</i> {t("signboard.button")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="py-12 px-6">
            <div className="mb-8">
              <img
                src="https://cdn.imweb.me/thumbnail/20231219/127d65c749824.png"
                alt="Official Membership Signboard"
                className="w-full h-auto"
              />
            </div>
            <div className="text-center">
              <p className="text-white text-sm italic mb-4">
                {t("signboard.label")}
              </p>
              <p className="text-white text-base mb-4 leading-relaxed">
                {t("signboard.notice")}
              </p>
              <h3 className="text-white text-xl font-light mb-2">
                {t("signboard.title")}
              </h3>
              <p
                className="text-white text-xs mb-6"
                style={{ letterSpacing: "3px" }}
              >
                {t("signboard.subtitle")}
              </p>
              <p className="text-white text-xs leading-relaxed mb-6">
                {t("signboard.description")}
              </p>
              <a
                href="/178"
                className="inline-flex items-center px-6 py-2 border border-white text-white rounded hover:bg-white hover:text-purple-700 transition-colors"
              >
                <i className="mr-2">→</i> {t("signboard.button")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Purple Line 02 - Poster Section */}
      <section
        className="relative w-full"
        style={{
          backgroundImage:
            "url(https://cdn.imweb.me/thumbnail/20231219/30829ed3380bb.jpg)",
          backgroundColor: "rgba(221, 221, 221, 0)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      >
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="container mx-auto py-12">
            <div className="grid grid-cols-12 gap-0 items-center min-h-[583px]">
              <div className="col-span-2"></div>
              <div className="col-span-4 text-left px-8">
                <p className="text-white text-base italic mb-6">
                  {t("poster.label")}
                </p>
                <h3 className="text-white text-2xl font-light mb-2">
                  {t("poster.title")}
                </h3>
                <p
                  className="text-white text-sm mb-6"
                  style={{ letterSpacing: "5px" }}
                >
                  {t("poster.subtitle")}
                </p>
                <p className="text-white text-xs leading-relaxed mb-8">
                  {t("poster.description")}
                </p>
                <a
                  href="/179"
                  className="inline-flex items-center px-6 py-2 border border-white text-white rounded hover:bg-white hover:text-purple-700 transition-colors"
                >
                  <i className="mr-2">→</i> {t("poster.button")}
                </a>
              </div>
              <div className="col-span-6">
                <img
                  src="https://cdn.imweb.me/thumbnail/20231219/368b1b6ee7647.png"
                  alt="Poster"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="py-12 px-6">
            <div className="mb-8">
              <img
                src="https://cdn.imweb.me/thumbnail/20231219/368b1b6ee7647.png"
                alt="Poster"
                className="w-full h-auto"
              />
            </div>
            <div className="text-center">
              <p className="text-white text-sm italic mb-4">
                {t("poster.label")}
              </p>
              <h3 className="text-white text-xl font-light mb-2">
                {t("poster.title")}
              </h3>
              <p
                className="text-white text-xs mb-6"
                style={{ letterSpacing: "3px" }}
              >
                {t("poster.subtitle")}
              </p>
              <p className="text-white text-xs leading-relaxed mb-6">
                {t("poster.description")}
              </p>
              <a
                href="/179"
                className="inline-flex items-center px-6 py-2 border border-white text-white rounded hover:bg-white hover:text-purple-700 transition-colors"
              >
                <i className="mr-2">→</i> {t("poster.button")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Purple Line 03 - X-Banner & Mini Banner Section */}
      <section
        className="relative w-full"
        style={{
          backgroundImage:
            "url(https://cdn.imweb.me/thumbnail/20231219/30829ed3380bb.jpg)",
          backgroundColor: "rgba(221, 221, 221, 0)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      >
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="container mx-auto py-12">
            <div className="grid grid-cols-12 gap-0 items-center min-h-[728px]">
              <div className="col-span-6">
                <img
                  src="https://cdn.imweb.me/thumbnail/20231219/74ac5087f251c.png"
                  alt="X-Banner & Mini Banner"
                  className="w-full h-[728px] object-cover"
                />
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-5 text-left px-8">
                <p className="text-white text-base italic mb-6">
                  {t("banner.label")}
                </p>
                <h3 className="text-white text-2xl font-light mb-2">
                  {t("banner.title")}
                </h3>
                <p
                  className="text-white text-sm mb-6"
                  style={{ letterSpacing: "5px" }}
                >
                  {t("banner.subtitle")}
                </p>
                <p className="text-white text-xs leading-relaxed mb-8">
                  {t("banner.description")}
                </p>
                <a
                  href="/182"
                  className="inline-flex items-center px-6 py-2 border border-white text-white rounded hover:bg-white hover:text-purple-700 transition-colors"
                >
                  <i className="mr-2">→</i> {t("banner.button")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="py-12 px-6">
            <div className="mb-8">
              <img
                src="https://cdn.imweb.me/thumbnail/20231219/74ac5087f251c.png"
                alt="X-Banner & Mini Banner"
                className="w-full h-auto"
              />
            </div>
            <div className="text-center">
              <p className="text-white text-sm italic mb-4">
                {t("banner.label")}
              </p>
              <h3 className="text-white text-xl font-light mb-2">
                {t("banner.title")}
              </h3>
              <p
                className="text-white text-xs mb-6"
                style={{ letterSpacing: "3px" }}
              >
                {t("banner.subtitle")}
              </p>
              <p className="text-white text-xs leading-relaxed mb-6">
                {t("banner.description")}
              </p>
              <a
                href="/182"
                className="inline-flex items-center px-6 py-2 border border-white text-white rounded hover:bg-white hover:text-purple-700 transition-colors"
              >
                <i className="mr-2">→</i> {t("banner.button")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Purple Line 04 - Brochure Section */}
      <section
        className="relative w-full"
        style={{
          backgroundImage:
            "url(https://cdn.imweb.me/thumbnail/20231219/30829ed3380bb.jpg)",
          backgroundColor: "rgba(221, 221, 221, 0)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      >
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="container mx-auto py-12">
            <div className="grid grid-cols-12 gap-0 items-center min-h-[695px]">
              <div className="col-span-2"></div>
              <div className="col-span-4 text-left px-8">
                <p className="text-white text-base italic mb-6">
                  {t("brochure.label")}
                </p>
                <h3 className="text-white text-2xl font-light mb-2">
                  {t("brochure.title")}
                </h3>
                <p
                  className="text-white text-sm mb-6"
                  style={{ letterSpacing: "5px" }}
                >
                  {t("brochure.subtitle")}
                </p>
                <p className="text-white text-xs leading-relaxed mb-8">
                  {t("brochure.description")}
                </p>
                <a
                  href="/181"
                  className="inline-flex items-center px-6 py-2 border border-white text-white rounded hover:bg-white hover:text-purple-700 transition-colors"
                >
                  <i className="mr-2">→</i> {t("brochure.button")}
                </a>
              </div>
              <div className="col-span-6">
                <img
                  src="https://cdn.imweb.me/thumbnail/20231219/7a8e9b13beba9.png"
                  alt="Brochure"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="py-12 px-6">
            <div className="mb-8">
              <img
                src="https://cdn.imweb.me/thumbnail/20231219/7a8e9b13beba9.png"
                alt="Brochure"
                className="w-full h-auto"
              />
            </div>
            <div className="text-center">
              <p className="text-white text-sm italic mb-4">
                {t("brochure.label")}
              </p>
              <h3 className="text-white text-xl font-light mb-2">
                {t("brochure.title")}
              </h3>
              <p
                className="text-white text-xs mb-6"
                style={{ letterSpacing: "3px" }}
              >
                {t("brochure.subtitle")}
              </p>
              <p className="text-white text-xs leading-relaxed mb-6">
                {t("brochure.description")}
              </p>
              <a
                href="/181"
                className="inline-flex items-center px-6 py-2 border border-white text-white rounded hover:bg-white hover:text-purple-700 transition-colors"
              >
                <i className="mr-2">→</i> {t("brochure.button")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Purple Line 05 - Shopping Bag Section */}
      <section
        className="relative w-full"
        style={{
          backgroundImage:
            "url(https://cdn.imweb.me/thumbnail/20231219/30829ed3380bb.jpg)",
          backgroundColor: "rgba(221, 221, 221, 0)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      >
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="container mx-auto py-12">
            <div className="grid grid-cols-12 gap-0 items-center min-h-[518px]">
              <div className="col-span-6">
                <img
                  src="https://cdn.imweb.me/thumbnail/20231219/4e12317704c96.png"
                  alt="Shopping Bag"
                  className="w-full h-auto"
                />
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-5 text-left px-8">
                <p className="text-white text-base italic mb-6">
                  {t("shoppingBag.label")}
                </p>
                <h3 className="text-white text-2xl font-light mb-2">
                  {t("shoppingBag.title")}
                </h3>
                <p
                  className="text-white text-sm mb-6"
                  style={{ letterSpacing: "5px" }}
                >
                  {t("shoppingBag.subtitle")}
                </p>
                <p className="text-white text-xs leading-relaxed mb-8">
                  {t("shoppingBag.description")}
                </p>
                <a
                  href="/183"
                  className="inline-flex items-center px-6 py-2 border border-white text-white rounded hover:bg-white hover:text-purple-700 transition-colors"
                >
                  <i className="mr-2">→</i> {t("shoppingBag.button")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="py-12 px-6">
            <div className="mb-8">
              <img
                src="https://cdn.imweb.me/thumbnail/20231219/4e12317704c96.png"
                alt="Shopping Bag"
                className="w-full h-auto"
              />
            </div>
            <div className="text-center">
              <p className="text-white text-sm italic mb-4">
                {t("shoppingBag.label")}
              </p>
              <h3 className="text-white text-xl font-light mb-2">
                {t("shoppingBag.title")}
              </h3>
              <p
                className="text-white text-xs mb-6"
                style={{ letterSpacing: "3px" }}
              >
                {t("shoppingBag.subtitle")}
              </p>
              <p className="text-white text-xs leading-relaxed mb-6">
                {t("shoppingBag.description")}
              </p>
              <a
                href="/183"
                className="inline-flex items-center px-6 py-2 border border-white text-white rounded hover:bg-white hover:text-purple-700 transition-colors"
              >
                <i className="mr-2">→</i> {t("shoppingBag.button")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section
        className="relative w-full py-24"
        style={{
          backgroundImage:
            "url(https://cdn.imweb.me/thumbnail/20231219/30829ed3380bb.jpg)",
          backgroundColor: "rgba(221, 221, 221, 0)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-light mb-2">
            {t("contact.title")}
          </h2>
          <p
            className="text-white text-sm md:text-base mb-8"
            style={{ letterSpacing: "5px" }}
          >
            {t("contact.subtitle")}
          </p>
          <p className="text-white text-xs md:text-sm leading-relaxed mb-8 max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
          <a
            href="http://pf.kakao.com/_hnkCxj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 border border-white text-white text-lg rounded hover:bg-white hover:text-purple-700 transition-colors"
          >
            <i className="mr-3">💬</i> {t("contact.button")}
          </a>
        </div>
      </section>
    </div>
  );
};

export default page;
