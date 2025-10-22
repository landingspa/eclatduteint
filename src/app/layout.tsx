import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_KR } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import HeaderMain from "@/components/header_main";
import Footer from "@/components/footer";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Éclat du teint - Sensitive Skin Specialist",
  description:
    "Dermocosmetic brand specializing in sensitive/problematic skin care",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${notoSans.variable} ${notoSansKR.variable} antialiased`}
        style={{
          fontFamily:
            "var(--font-noto-sans), var(--font-noto-sans-kr), sans-serif",
        }}
      >
        <NextIntlClientProvider messages={messages}>
          <HeaderMain />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
