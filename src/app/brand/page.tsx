import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

type Props = {};

export async function generateMetadata() {
  const t = await getTranslations("brand");
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

const BrandPage = (props: Props) => {
  const t = useTranslations("brand");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[90vh] w-full bg-cover bg-center bg-no-repeat">
        {/* Mobile Background */}
        <div
          className="absolute inset-0 md:hidden bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://cdn.imweb.me/thumbnail/20231212/e5c12ea15aca8.png')",
          }}
        />
        {/* Desktop Background */}
        <div
          className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://cdn.imweb.me/thumbnail/20231122/03040fb96d23d.png')",
          }}
        />
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Introduction Section */}
        <section className="mb-20  py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1
              className="text-3xl md:text-4xl font-bold text-purple-800 mb-4"
              style={{ fontSize: "20px", fontWeight: "500", color: "#662D91" }}
            >
              {t("intro.title")}
            </h1>
            <p
              style={{ fontSize: "16px", fontWeight: "500", color: "#662D91" }}
              className="text-xl md:text-2xl text-gray-800 mb-8"
            >
              {t("intro.subtitle")}
            </p>

            <div
              style={{ fontSize: "14px" }}
              className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed"
            >
              <p>{t("intro.paragraph1")}</p>
              <p>{t("intro.paragraph2")}</p>
              <p>{t("intro.paragraph3")}</p>
            </div>
          </div>
        </section>

        {/* Four Info Sections */}
        <section className="mb-20">
          {/* Section 1 - Image Left, Text Right */}
          <div className="grid md:grid-cols-[610px_1fr] gap-8 mb-16 items-end">
            <div className="order-1">
              <img
                src="https://cdn.imweb.me/thumbnail/20231122/32bf19d71636d.png"
                alt="Professional Choice"
                className="object-cover"
                style={{ width: "610px", height: "940px" }}
              />
            </div>
            <div className="space-y-4 order-2">
              <h2
                className="font-bold text-purple-800 mb-4"
                style={{ fontSize: "16px", color: "#662D91" }}
              >
                {t("sections.professionals.title")}
              </h2>
              <p
                className="text-gray-700 leading-relaxed"
                style={{ fontSize: "14px" }}
              >
                {t("sections.professionals.description")}
              </p>
            </div>
          </div>

          {/* Section 2 - Image Right, Text Left */}
          <div className="grid md:grid-cols-[1fr_610px] gap-8 mb-16 items-end">
            <div className="space-y-4 order-2 md:order-1">
              <h2
                className="font-bold text-purple-800 mb-4"
                style={{ fontSize: "16px", color: "#662D91" }}
              >
                {t("sections.postTreatment.title")}
              </h2>
              <p
                className="text-gray-700 leading-relaxed"
                style={{ fontSize: "14px" }}
              >
                {t("sections.postTreatment.description")}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://cdn.imweb.me/thumbnail/20230405/feecbc5fd18ff.jpg"
                alt="Post-Treatment Specialist"
                className="object-cover"
                style={{ width: "610px", height: "940px" }}
              />
            </div>
          </div>

          {/* Section 3 - Image Left, Text Right */}
          <div className="grid md:grid-cols-[610px_1fr] gap-8 mb-16 items-end">
            <div className="order-1">
              <img
                src="https://cdn.imweb.me/thumbnail/20231122/a155a5b00b2a1.png"
                alt="Partnership"
                className="object-cover"
                style={{ width: "610px", height: "940px" }}
              />
            </div>
            <div className="space-y-4 order-2">
              <h2
                className="font-bold text-purple-800 mb-4"
                style={{ fontSize: "16px", color: "#662D91" }}
              >
                {t("sections.partnership.title")}
              </h2>
              <p
                className="text-gray-700 leading-relaxed"
                style={{ fontSize: "14px" }}
              >
                {t("sections.partnership.description")}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BrandPage;
