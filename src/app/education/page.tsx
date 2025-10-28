import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("education");

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

export default function EducationPage() {
  const t = useTranslations("education");

  return (
    <main className="min-h-screen">
      {/* Hero Section - Full screen on desktop, 300px on mobile */}
      <section className="relative w-full h-[300px] lg:h-screen">
        <Image
          src="https://cdn.imweb.me/thumbnail/20230413/5cfbfed4a6bed.png"
          alt={t("hero.title")}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12 lg:py-20 max-w-4xl">
        {/* Introduction */}
        <div className="text-center mb-12 lg:mb-16">
          <p
            className="text-lg lg:text-xl mb-4"
            style={{ color: "#662d91", fontWeight: "550" }}
          >
            {t("intro.greeting")} {t("intro.thankYou")}
          </p>
        </div>

        {/* Schedule Information */}
        <div className="mb-12 lg:mb-16 text-center">
          <div className="bg-gray-50 rounded-lg p-6 lg:p-10 mb-8">
            <p className="text-base lg:text-lg leading-relaxed mb-4">
              {t("schedule.current")}
            </p>
            <p className="text-base lg:text-lg leading-relaxed mb-4 font-semibold">
              {t("schedule.timing")}
            </p>
            <p className="text-base lg:text-lg leading-relaxed mb-4">
              {t("schedule.contact")}
            </p>
            <p className="text-base lg:text-lg leading-relaxed mb-4">
              {t("schedule.inquiry")}
            </p>
            <p className="text-sm lg:text-base text-gray-600 italic mt-6">
              {t("schedule.notice")}
            </p>
          </div>

          {/* Training Details Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-t border-b border-gray-300">
                  <td className="py-4 px-4 lg:px-6 font-semibold text-left bg-gray-100 w-1/3">
                    {t("details.location")}
                  </td>
                  <td className="py-4 px-4 lg:px-6 text-left">
                    {t("details.locationAddress")}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-4 px-4 lg:px-6 font-semibold text-left bg-gray-100">
                    {t("details.datetime")}
                  </td>
                  <td className="py-4 px-4 lg:px-6 text-left">
                    {t("details.datetimeInfo")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Application Section */}
        <div className="text-center">
          <h2
            className="text-2xl lg:text-3xl font-bold mb-6"
            style={{ color: "#662d91" }}
          >
            {t("application.title")}
          </h2>

          {/* Social Media Buttons */}
          <div className="flex justify-center items-center gap-4 mb-6">
            {/* Facebook Button */}
            <a
              href="https://www.facebook.com/profile.php?id=61579240127022"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-transparent"
            >
              <div className="bg-transparent w-14 h-14 lg:w-18 lg:h-18  flex items-center justify-center hover:opacity-80 transition-opacity  overflow-hidden ">
                <Image
                  src="/facebook.png"
                  alt="Facebook"
                  width={72}
                  height={72}
                  className="bg-transparent w-full h-full object-contain p-1"
                />
              </div>
            </a>

            {/* Zalo Button */}
            <a
              href="https://zalo.me/g/oboocy070"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20  flex items-center justify-center hover:opacity-80 transition-opacity overflow-hidden ">
                <Image
                  src="/zalo.png"
                  alt="Zalo"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain p-1"
                />
              </div>
            </a>
          </div>

          <p className="text-base lg:text-lg leading-relaxed mb-4">
            {t("application.instruction")}
          </p>
          <p className="text-sm lg:text-base text-gray-600">
            {t("application.tip")}
          </p>
        </div>
      </section>
    </main>
  );
}
