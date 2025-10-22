"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AllProductsSection() {
  const t = useTranslations("allProducts");
  return (
    <section className="w-full flex flex-col items-center py-12 md:py-24 lg:py-32">
      <h2
        className="text-xl md:text-md lg:text-2xl font-bold mb-2 md:mb-4 lg:mb-6 text-center"
        style={{ color: "#662d91" }}
      >
        {t("title")}
      </h2>
      <p
        className="text-base md:text-2xl lg:text-xl mb-6 md:mb-10 lg:mb-16 text-center"
        style={{ color: "#662d91" }}
      >
        {t("subtitle")}
      </p>
      <div className="mb-6 md:mb-12 lg:mb-16">
        <Image
          src="/allproduct.png"
          alt="All Products"
          width={160}
          height={200}
          className="mx-auto md:w-[320px] md:h-[400px] lg:w-[480px] lg:h-[600px]"
        />
      </div>
      <p className="text-gray-700 text-sm md:text-lg lg:text-xl mb-6 md:mb-10 lg:mb-12 text-center max-w-md md:max-w-2xl lg:max-w-3xl px-4">
        {t("desc")}
      </p>
      <a
        href="/products"
        className="text-sm md:text-lg lg:text-xl text-center"
        style={{ color: "#662d91", fontWeight: "500" }}
      >
        {t("cta")}
      </a>
    </section>
  );
}
