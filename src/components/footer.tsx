"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer
      className="w-full py-11 md:py-10 px-4 md:px-6 lg:px-8"
      style={{ backgroundColor: "#662d91", color: "#fff" }}
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Company Info Title */}
        <h3
          className="text-lg md:text-xl font-bold "
          style={{ fontSize: "11px" }}
        >
          {t("companyInfo")}
        </h3>

        {/* Company Details */}
        <div
          className="space-y-1 md:space-y-1 text-sm md:text-base"
          style={{ fontSize: "11px" }}
        >
          <p>{t("companyName")}</p>
          <p>{t("phone")}</p>

          <p>
            {t("businessNumber")}{" "}
            <Link
              href="https://www.ftc.go.kr/www/bizCommList.do?key=232"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80 transition-opacity"
            >
              / {t("businessVerify")}
            </Link>
          </p>

          <p>{t("email")}</p>
          <p>{t("address")}</p>
        </div>

        {/* Links */}
        <div
          style={{ fontSize: "11px" }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mt-1 md:mt-1 text-sm md:text-base"
        >
          <Link
            href="/terms"
            className="underline hover:opacity-80 transition-opacity"
          >
            {t("terms")}
          </Link>
          <Link
            href="/privacy"
            className="underline hover:opacity-80 transition-opacity"
          >
            {t("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
