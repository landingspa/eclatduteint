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
  const t = await getTranslations("signboardPage");
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

const SignboardPage = (props: Props) => {
  const t = useTranslations("signboardPage");

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative w-full py-24 md:py-32"
        style={{
          backgroundImage:
            "url(https://cdn.imweb.me/thumbnail/20231221/4b2deab422598.jpg)",
          backgroundColor: "rgba(221, 221, 221, 0)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-white text-xl md:text-2xl mb-6 leading-relaxed">
            {t("hero.notice")}
          </p>
          <p className="text-white text-base italic mb-6">{t("hero.label")}</p>
          <h1
            style={{ fontSize: "20px" }}
            className="text-white text-2xl md:text-3xl font-light mb-2"
          >
            {t("hero.title")}
          </h1>
          <p
            className="text-white text-sm mb-8"
            style={{ letterSpacing: "5px" }}
          >
            {t("hero.subtitle")}
          </p>
          <p className="text-white text-xs leading-relaxed max-w-2xl mx-auto">
            {t("hero.description")}
          </p>
        </div>
      </section>

      {/* Main Signboard Image Section */}
      <section
        className="relative w-full py-16"
        style={{
          backgroundImage:
            "url(https://cdn.imweb.me/thumbnail/20231221/4b2deab422598.jpg)",
          backgroundColor: "rgba(221, 221, 221, 0)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <img
              src="https://cdn.imweb.me/thumbnail/20231221/4733dd00e5eb7.png"
              alt="Official Membership Signboard"
              className="w-auto h-auto max-h-[707px]"
            />
          </div>
        </div>
      </section>

      {/* Detail Image Section */}
      <section
        className="relative w-full"
        style={{
          backgroundImage:
            "url(https://cdn.imweb.me/thumbnail/20231221/4b2deab422598.jpg)",
          backgroundColor: "rgba(221, 221, 221, 0)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      >
        <div className="py-24">
          <div className="w-full">
            <img
              src="https://cdn.imweb.me/thumbnail/20231221/2edc2307cd369.jpg"
              alt="Signboard Detail"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Two Column Images */}
        <div className="container mx-auto pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="h-[450px] overflow-hidden">
              <img
                src="https://cdn.imweb.me/thumbnail/20231221/6e75b00f2729e.jpg"
                alt="Signboard Detail 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-[450px] overflow-hidden">
              <img
                src="https://cdn.imweb.me/thumbnail/20231221/5e420089672cc.jpg"
                alt="Signboard Detail 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Mockup Section */}
      <section
        className="relative w-full py-24"
        style={{
          backgroundImage:
            "url(https://cdn.imweb.me/thumbnail/20231221/4b2deab422598.jpg)",
          backgroundColor: "rgba(221, 221, 221, 0)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex justify-center items-center">
              <img
                src="https://cdn.imweb.me/thumbnail/20230504/ea97eec10b82b.png"
                alt="Signboard Mockup 1"
                className="w-auto h-auto max-h-[489px]"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://cdn.imweb.me/thumbnail/20230504/6d3d626b97279.png"
                alt="Signboard Mockup 2"
                className="w-auto h-auto max-h-[505px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section
        className="relative w-full py-24"
        style={{
          backgroundImage:
            "url(https://cdn.imweb.me/thumbnail/20231221/4b2deab422598.jpg)",
          backgroundColor: "rgba(221, 221, 221, 0)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      >
        <div className="container mx-auto px-6">
          {/* Full Width Card */}
          <a
            href="/178"
            className="block mb-8 overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
          >
            <div
              className="relative h-64 md:h-80 flex items-center justify-center text-white"
              style={{
                backgroundImage:
                  "url(https://cdn.imweb.me/thumbnail/20231221/e7221c1a7e2f1.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-center">
                <p className="text-sm mb-2">The Purple Line_01</p>
                <h3 className="text-lg md:text-xl mb-1">
                  {t("relatedProducts.signboard")}
                </h3>
                <p className="text-xs tracking-widest mb-4">SIGNBOARD</p>
                <p className="text-sm">View More &gt;</p>
              </div>
            </div>
          </a>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Poster */}
            <a
              href="/179"
              className="block overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <div
                className="relative h-64 flex items-center justify-center text-white"
                style={{
                  backgroundImage:
                    "url(https://cdn.imweb.me/thumbnail/20231221/1a0fb951693a8.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="text-center">
                  <p className="text-sm mb-2">The Purple Line_02</p>
                  <h3 className="text-lg mb-1">
                    {t("relatedProducts.poster")}
                  </h3>
                  <p className="text-xs tracking-widest mb-4">POSTER</p>
                  <p className="text-sm">View More &gt;</p>
                </div>
              </div>
            </a>

            {/* X-Banner */}
            <a
              href="/182"
              className="block overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <div
                className="relative h-64 flex items-center justify-center text-white"
                style={{
                  backgroundImage:
                    "url(https://cdn.imweb.me/thumbnail/20231221/1accd894d1990.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="text-center">
                  <p className="text-sm mb-2">The Purple Line_03</p>
                  <h3 className="text-lg mb-1">
                    {t("relatedProducts.banner")}
                  </h3>
                  <p className="text-xs tracking-widest mb-4">
                    X-BANNER & MINI BANNER
                  </p>
                  <p className="text-sm">View More &gt;</p>
                </div>
              </div>
            </a>

            {/* Brochure */}
            <a
              href="/181"
              className="block overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <div
                className="relative h-64 flex items-center justify-center text-white"
                style={{
                  backgroundImage:
                    "url(https://cdn.imweb.me/thumbnail/20231221/1a0fb951693a8.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="text-center">
                  <p className="text-sm mb-2">The Purple Line_04</p>
                  <h3 className="text-lg mb-1">
                    {t("relatedProducts.brochure")}
                  </h3>
                  <p className="text-xs tracking-widest mb-4">BROCHURE</p>
                  <p className="text-sm">View More &gt;</p>
                </div>
              </div>
            </a>

            {/* Shopping Bag */}
            <a
              href="/183"
              className="block overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <div
                className="relative h-64 flex items-center justify-center text-white"
                style={{
                  backgroundImage:
                    "url(https://cdn.imweb.me/thumbnail/20231221/1a0fb951693a8.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="text-center">
                  <p className="text-sm mb-2">The Purple Line_05</p>
                  <h3 className="text-lg mb-1">
                    {t("relatedProducts.shoppingBag")}
                  </h3>
                  <p className="text-xs tracking-widest mb-4">SHOPPING BAG</p>
                  <p className="text-sm">View More &gt;</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="relative w-full py-24"
        style={{
          backgroundImage:
            "url(https://cdn.imweb.me/thumbnail/20231221/4e50521cbbc4f.jpg)",
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

export default SignboardPage;
