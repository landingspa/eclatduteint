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
    "Dermocosmetic brand specializing in sensitive/problematic skin care, recognized by international dermatology experts and cooperating with over 2,000 specialized skin institutions worldwide.",
  keywords: [
    "Éclat du teint",
    "sensitive skin",
    "dermocosmetic",
    "skincare",
    "Korean skincare",
    "problematic skin",
    "post-treatment care",
  ],
  authors: [{ name: "Éclat du teint" }],
  creator: "Éclat du teint",
  publisher: "Éclat du teint",
  metadataBase: new URL("https://eclatduteint.com"),
  openGraph: {
    title: "Éclat du teint - Sensitive Skin Specialist",
    description:
      "Dermocosmetic brand specializing in sensitive/problematic skin care, recognized by international dermatology experts.",
    url: "https://eclatduteint.com",
    siteName: "Éclat du teint",
    images: [
      {
        url: "https://cdn.imweb.me/thumbnail/20240726/0451fe5db94a3.png",
        width: 1200,
        height: 630,
        alt: "Éclat du teint - Sensitive Skin Specialist",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Éclat du teint - Sensitive Skin Specialist",
    description:
      "Dermocosmetic brand specializing in sensitive/problematic skin care.",
    images: ["https://cdn.imweb.me/thumbnail/20240726/0451fe5db94a3.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
