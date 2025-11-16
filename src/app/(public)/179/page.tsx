import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PosterGallery } from "@/components/poster_gallery";
import { PosterMobileGallery } from "@/components/poster_mobile_gallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "posterPage" });

  return {
    title: t("hero.title"),
    description: t("hero.description"),
  };
}

export default function PosterPage() {
  const t = useTranslations("posterPage");

  return (
    <div className="w-full">
      {/* Desktop Hero Section */}
      <section
        className="hidden md:flex relative w-full min-h-screen flex-col items-center justify-start pt-24"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/34828d46ffd36.jpg')",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-center text-white px-4 mb-12">
          <p className="text-sm italic mb-2" style={{ letterSpacing: "0px" }}>
            {t("hero.notice")}
          </p>
          <h1 className="text-lg mb-1">{t("hero.title")}</h1>
          <p className="text-xs mb-6" style={{ letterSpacing: "5px" }}>
            {t("hero.subtitle")}
          </p>
          <p className="text-xs leading-tight">{t("hero.description")}</p>
          <p className="text-xs leading-tight">{t("hero.descriptionLine2")}</p>
        </div>

        <div className="flex justify-center">
          <img
            src="https://cdn.imweb.me/thumbnail/20231220/61b058986a548.png"
            alt="Poster Main"
            className="w-auto h-auto max-w-full"
            style={{ height: "500px" }}
          />
        </div>
      </section>

      {/* Mobile Hero Section */}
      <section
        className="block md:hidden relative w-full py-10"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231221/00380f300093f.jpg')",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-center text-white px-4">
          <p
            className="text-xs italic leading-tight mb-1"
            style={{ letterSpacing: "0px" }}
          >
            <em>{t("hero.notice")}</em>
          </p>
          <h1 className="text-sm mb-1 leading-tight">{t("hero.title")}</h1>
          <p
            className="text-xs mb-8 leading-tight"
            style={{ letterSpacing: "5px" }}
          >
            {t("hero.subtitle")}
          </p>
          <p className="text-xs leading-tight">{t("hero.description")}</p>
          <p className="text-xs leading-tight">{t("hero.descriptionLine2")}</p>
        </div>

        <div className="mt-8 flex justify-center">
          <img
            src="https://cdn.imweb.me/thumbnail/20231221/a10d4e7a4720b.png"
            alt="Poster Main Mobile"
            className="w-auto"
            style={{ height: "232px" }}
          />
        </div>
      </section>

      {/* Desktop Detail Image Full Width */}
      <section
        className="block md:hidden relative w-full py-10"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231221/ade12bd65ed66.jpg')",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Full Width Image */}
        <div className="w-full" style={{ height: "200px", overflow: "hidden" }}>
          <img
            src="https://cdn.imweb.me/thumbnail/20231221/6252a94e5b196.jpg"
            alt="Poster Detail Mobile 1"
            className="w-full h-auto"
            style={{ marginTop: "-43px" }}
          />
        </div>

        <div className="py-10"></div>

        {/* Two Column Images */}
        <div className="grid grid-cols-2 gap-0">
          <div className="relative">
            <div style={{ height: "200px" }}></div>
            <div style={{ height: "143px" }}>
              <img
                src="https://cdn.imweb.me/thumbnail/20231221/2227cc0fe1b97.jpg"
                alt="Poster Detail Mobile 2"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div style={{ height: "200px", overflow: "hidden" }}>
            <img
              src="https://cdn.imweb.me/thumbnail/20231221/c0bb998e4cf4d.jpg"
              alt="Poster Detail Mobile 3"
              className="w-full h-auto"
              style={{ marginTop: "-7px" }}
            />
          </div>
        </div>

        <div className="py-10"></div>

        {/* Bottom Full Width Image */}
        <div className="w-full" style={{ height: "200px", overflow: "hidden" }}>
          <img
            src="https://cdn.imweb.me/thumbnail/20231221/5f71779b0d84a.jpg"
            alt="Poster Detail Mobile 4"
            className="w-full h-auto"
            style={{ marginTop: "-34px" }}
          />
        </div>
      </section>

      {/* Desktop Detail Image Full Width */}
      <section
        className="hidden md:block relative w-full"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/34828d46ffd36.jpg')",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="py-48">
          <div className="w-full" style={{ height: "800px" }}>
            <img
              src="https://cdn.imweb.me/thumbnail/20231220/a8dd458b91758.jpg"
              alt="Poster Detail"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Two Column Images */}
        <div className="py-36 max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-0">
            <div className="relative">
              <div className="h-[700px]"></div>
              <div className="h-[550px]">
                <img
                  src="https://cdn.imweb.me/thumbnail/20231220/bbab0620ff7e9.jpg"
                  alt="Poster Detail 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="h-[700px]">
              <img
                src="https://cdn.imweb.me/thumbnail/20231220/c5fd6b7bde0d9.jpg"
                alt="Poster Detail 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Full Width Image */}
        <div className="py-36">
          <div className="w-full" style={{ height: "800px" }}>
            <img
              src="https://cdn.imweb.me/thumbnail/20231220/ef6d9c556261f.jpg"
              alt="Poster Detail 4"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mobile Product Info Section */}
      <section
        className="block md:hidden relative w-full py-10"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231221/00380f300093f.jpg')",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-center text-white px-4">
          <p
            className="text-xs mb-2 leading-tight"
            style={{ letterSpacing: "0px" }}
          >
            {t("productInfo.sizeNote")}
          </p>
          <p className="text-xs mb-8 leading-tight">
            {t("productInfo.sizeDescription")}
          </p>

          {/* Size Chart Image */}
          <div className="flex justify-center mb-4">
            <img
              src="https://cdn.imweb.me/thumbnail/20240109/09502ec9198ae.png"
              alt="Size Chart Mobile"
              className="w-full max-w-md"
              style={{ height: "auto" }}
            />
          </div>

          {/* Size Table */}
          <div className="text-white text-xs">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-1/5 text-center py-1 leading-none">
                    A1 Size
                  </td>
                  <td className="w-1/5 text-center py-1 leading-none">
                    A2 Size
                  </td>
                  <td className="w-1/5 text-center py-1 leading-none">
                    A3 Size
                  </td>
                  <td className="w-1/5 text-center py-1 leading-none">
                    A4 Size
                  </td>
                  <td className="w-1/5 text-center py-1 leading-none">
                    A5 Size
                  </td>
                </tr>
                <tr className="text-[8px]">
                  <td className="w-1/5 text-center py-1 leading-none">
                    가로 594mm x 세로 841mm
                  </td>
                  <td className="w-1/5 text-center py-1 leading-none">
                    가로 420mm x 세로 594mm
                  </td>
                  <td className="w-1/5 text-center py-1 leading-none">
                    가로 297mm x 세로 420mm
                  </td>
                  <td className="w-1/5 text-center py-1 leading-none">
                    가로 210mm x 세로 297mm
                  </td>
                  <td className="w-1/5 text-center py-1 leading-none">
                    가로 148mm x 세로 210mm
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Desktop Product Info Section */}
      <section
        className="hidden md:block relative w-full py-24"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/34828d46ffd36.jpg')",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-4 text-center text-white">
          <p className="text-base mb-8" style={{ letterSpacing: "0px" }}>
            {t("productInfo.title")}
          </p>
          <p className="text-xs leading-tight mb-1">
            {t("productInfo.description")}
          </p>
          <p className="text-xs leading-tight mb-12">
            {t("productInfo.descriptionLine2")}
          </p>

          <p className="text-base italic mb-8" style={{ letterSpacing: "0px" }}>
            {t("productInfo.sizeNote")}
          </p>
          <p className="text-xs leading-tight mb-12">
            {t("productInfo.sizeDescription")}
          </p>

          {/* Size Chart Image */}
          <div className="flex justify-center mb-8">
            <img
              src="https://cdn.imweb.me/thumbnail/20240109/0f265f2f786be.png"
              alt="Size Chart"
              className="w-auto h-auto max-w-full"
              style={{ height: "594px" }}
            />
          </div>

          {/* Size Table */}
          <div className="mb-24">
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="w-1/5 text-center py-2">A2 Size</td>
                  <td className="w-1/5 text-center py-2">A2 Size</td>
                  <td className="w-1/5 text-center py-2">A3 Size</td>
                  <td className="w-1/5 text-center py-2">A4 Size</td>
                  <td className="w-1/5 text-center py-2">A5 Size</td>
                </tr>
                <tr>
                  <td className="w-1/5 text-center py-2">
                    가로 594mm x 세로 841mm
                  </td>
                  <td className="w-1/5 text-center py-2">
                    가로 420mm x 세로 594mm
                  </td>
                  <td className="w-1/5 text-center py-2">
                    가로 297mm x 세로 420mm
                  </td>
                  <td className="w-1/5 text-center py-2">
                    가로 210mm x 세로 297mm
                  </td>
                  <td className="w-1/5 text-center py-2">
                    가로 148mm x 세로 210mm
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Mobile Gallery Info Section */}
      <section
        className="block md:hidden relative w-full py-10"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231221/00380f300093f.jpg')",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-center text-white px-4 mb-8">
          <p
            className="text-xs mb-2 leading-tight"
            style={{ letterSpacing: "0px" }}
          >
            {t("productInfo.title")}
          </p>
          <p className="text-xs leading-tight">
            {t("productInfo.description")}
          </p>
          <p className="text-xs leading-tight">
            {t("productInfo.descriptionLine2")}
          </p>
        </div>

        {/* Mobile Gallery Grid - 2 columns */}
        <PosterMobileGallery />
      </section>

      {/* Desktop Gallery Section */}
      <section
        className="hidden md:block relative w-full py-24"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/34828d46ffd36.jpg')",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <PosterGallery />
        </div>
      </section>

      {/* Desktop Related Products Section */}
      <section
        className="hidden md:block relative w-full py-36"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/34828d46ffd36.jpg')",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-4">
          {/* Full Width Card */}
          <a
            href="/178"
            className="block mb-0 text-white text-center py-24 relative overflow-hidden"
            style={{
              backgroundImage:
                "url('https://cdn.imweb.me/thumbnail/20231220/73408acde3817.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <p className="text-sm mb-2">
              {t("relatedProducts.signboard.notice")}
            </p>
            <h3 className="text-lg mb-1">
              {t("relatedProducts.signboard.title")}
            </h3>
            <p className="text-xs mb-4" style={{ letterSpacing: "5px" }}>
              {t("relatedProducts.signboard.subtitle")}
            </p>
            <p className="text-sm" style={{ letterSpacing: "0px" }}>
              View More &gt;
            </p>
          </a>

          {/* Grid of 4 Cards */}
          <div className="grid grid-cols-2 gap-0">
            <a
              href="/179"
              className="block text-white text-center py-24 relative overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://cdn.imweb.me/thumbnail/20231220/fe26d18dff3c9.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <p className="text-sm mb-2">
                {t("relatedProducts.poster.notice")}
              </p>
              <h3 className="text-lg mb-1">
                {t("relatedProducts.poster.title")}
              </h3>
              <p className="text-xs mb-4" style={{ letterSpacing: "5px" }}>
                {t("relatedProducts.poster.subtitle")}
              </p>
              <p className="text-sm" style={{ letterSpacing: "0px" }}>
                View More &gt;
              </p>
            </a>

            <a
              href="/182"
              className="block text-white text-center py-24 relative overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://cdn.imweb.me/thumbnail/20231220/76f6bed2ad228.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <p className="text-sm mb-2">
                {t("relatedProducts.banner.notice")}
              </p>
              <h3 className="text-lg mb-1">
                {t("relatedProducts.banner.title")}
              </h3>
              <p className="text-xs mb-4" style={{ letterSpacing: "5px" }}>
                {t("relatedProducts.banner.subtitle")}
              </p>
              <p className="text-sm" style={{ letterSpacing: "0px" }}>
                View More &gt;
              </p>
            </a>

            <a
              href="/181"
              className="block text-white text-center py-24 relative overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://cdn.imweb.me/thumbnail/20231220/fe26d18dff3c9.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <p className="text-sm mb-2">
                {t("relatedProducts.brochure.notice")}
              </p>
              <h3 className="text-lg mb-1">
                {t("relatedProducts.brochure.title")}
              </h3>
              <p className="text-xs mb-4" style={{ letterSpacing: "5px" }}>
                {t("relatedProducts.brochure.subtitle")}
              </p>
              <p className="text-sm" style={{ letterSpacing: "0px" }}>
                View More &gt;
              </p>
            </a>

            <a
              href="/183"
              className="block text-white text-center py-24 relative overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://cdn.imweb.me/thumbnail/20231220/fe26d18dff3c9.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <p className="text-sm mb-2">
                {t("relatedProducts.shoppingBag.notice")}
              </p>
              <h3 className="text-lg mb-1">
                {t("relatedProducts.shoppingBag.title")}
              </h3>
              <p className="text-xs mb-4" style={{ letterSpacing: "5px" }}>
                {t("relatedProducts.shoppingBag.subtitle")}
              </p>
              <p className="text-sm" style={{ letterSpacing: "0px" }}>
                View More &gt;
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Related Products Section */}
      <section
        className="block md:hidden relative w-full"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231221/ade12bd65ed66.jpg')",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Signboard Card */}
        <a
          href="/178"
          className="block text-white text-center py-16 relative overflow-hidden"
          style={{
            backgroundImage:
              "url('https://cdn.imweb.me/thumbnail/20231221/6f7d7d63505b5.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <p className="text-xs mb-1">
            <em>{t("relatedProducts.signboard.notice")}</em>
          </p>
          <h3 className="text-xs mb-1 leading-none">
            {t("relatedProducts.signboard.title")}
          </h3>
          <p
            className="text-xs mb-2 leading-none"
            style={{ letterSpacing: "5px" }}
          >
            {t("relatedProducts.signboard.subtitle")}
          </p>
          <p className="text-xs leading-none">View More &gt;</p>
        </a>

        {/* Poster Card */}
        <a
          href="/179"
          className="block text-white text-center py-16 relative overflow-hidden"
          style={{
            backgroundImage:
              "url('https://cdn.imweb.me/thumbnail/20231221/6f7d7d63505b5.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <p className="text-xs mb-1">
            <em>{t("relatedProducts.poster.notice")}</em>
          </p>
          <h3 className="text-xs mb-1 leading-none">
            {t("relatedProducts.poster.title")}
          </h3>
          <p
            className="text-xs mb-2 leading-none"
            style={{ letterSpacing: "5px" }}
          >
            {t("relatedProducts.poster.subtitle")}
          </p>
          <p className="text-xs leading-none">View More &gt;</p>
        </a>

        {/* Banner Card */}
        <a
          href="/182"
          className="block text-white text-center py-16 relative overflow-hidden"
          style={{
            backgroundImage:
              "url('https://cdn.imweb.me/thumbnail/20231221/6f7d7d63505b5.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <p className="text-xs mb-1">
            <em>{t("relatedProducts.banner.notice")}</em>
          </p>
          <h3 className="text-xs mb-1 leading-none">
            {t("relatedProducts.banner.title")}
          </h3>
          <p
            className="text-xs mb-2 leading-none"
            style={{ letterSpacing: "5px" }}
          >
            {t("relatedProducts.banner.subtitle")}
          </p>
          <p className="text-xs leading-none">View More &gt;</p>
        </a>

        {/* Brochure Card */}
        <a
          href="/181"
          className="block text-white text-center py-16 relative overflow-hidden"
          style={{
            backgroundImage:
              "url('https://cdn.imweb.me/thumbnail/20231221/6f7d7d63505b5.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <p className="text-xs mb-1">
            <em>{t("relatedProducts.brochure.notice")}</em>
          </p>
          <h3 className="text-xs mb-1 leading-none">
            {t("relatedProducts.brochure.title")}
          </h3>
          <p
            className="text-xs mb-2 leading-none"
            style={{ letterSpacing: "5px" }}
          >
            {t("relatedProducts.brochure.subtitle")}
          </p>
          <p className="text-xs leading-none">View More &gt;</p>
        </a>

        {/* Shopping Bag Card */}
        <a
          href="/183"
          className="block text-white text-center py-16 relative overflow-hidden"
          style={{
            backgroundImage:
              "url('https://cdn.imweb.me/thumbnail/20231221/6f7d7d63505b5.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <p className="text-xs mb-1">
            <em>{t("relatedProducts.shoppingBag.notice")}</em>
          </p>
          <h3 className="text-xs mb-1 leading-none">
            {t("relatedProducts.shoppingBag.title")}
          </h3>
          <p
            className="text-xs mb-2 leading-none"
            style={{ letterSpacing: "5px" }}
          >
            {t("relatedProducts.shoppingBag.subtitle")}
          </p>
          <p className="text-xs leading-none">View More &gt;</p>
        </a>
      </section>

      {/* Contact Section */}
      <section
        className="relative w-full py-36"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20231219/30829ed3380bb.jpg')",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl mb-2">{t("contact.title")}</h2>
          <p className="text-sm mb-8" style={{ letterSpacing: "5px" }}>
            {t("contact.subtitle")}
          </p>
          <p className="text-xs leading-tight mb-1">
            {t("contact.description")}
          </p>
          <p className="text-xs leading-tight mb-8">
            {t("contact.descriptionLine2")}
          </p>

          <a
            href="http://pf.kakao.com/_hnkCxj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded hover:bg-gray-100 transition-colors"
          >
            <i className="ii ii-kakaotalk" aria-hidden="true"></i>
            Contact us
          </a>
        </div>
      </section>
    </div>
  );
}
