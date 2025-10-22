"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { setUserLocale } from "@/app/actions/locale";
import Link from "next/link";
import Image from "next/image";
import { useState, useTransition, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function HeaderMain() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLocale = async (newLocale: string) => {
    startTransition(async () => {
      await setUserLocale(newLocale);
      router.refresh();
    });
  };

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 300); // Match với animation duration
  };

  const navigationItems = [
    { key: "brand", href: "/brand" },
    { key: "education", href: "/education" },
    { key: "products", href: "/products" },
    { key: "purpleLine", href: "/purple-line" },
    { key: "videoContent", href: "/video-content" },
    { key: "contact", href: "/contact" },
  ];

  return (
    <header
      className="lg:fixed lg:top-0 lg:left-0 lg:right-0 sticky top-0 z-50 shadow-sm"
      style={{
        fontSize: "11px",
      }}
    >
      {/* Mobile Layout */}
      <div className="lg:hidden bg-white">
        {/* Mobile Logo Bar */}
        <div className="flex items-center justify-center py-4 border-b border-gray-100">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Éclat du teint"
              width={160}
              height={53}
              priority
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Mobile Toolbar */}
        <div className="flex items-center justify-between px-4 h-8 border-b border-gray-100">
          {/* Menu Button */}
          <button
            onClick={() =>
              isMenuOpen ? handleCloseMenu() : setIsMenuOpen(true)
            }
            className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu
                style={{ color: "#662d91", fontWeight: "bold" }}
                className="w-4 h-4"
              />
            )}
          </button>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => changeLocale("en")}
                className={`px-2 py-1 rounded transition-colors ${
                  locale === "en" ? "font-semibold" : "hover:text-purple-600"
                }`}
                style={{ color: locale === "en" ? "#662d91" : "#666" }}
              >
                EN
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => changeLocale("vi")}
                className={`px-2 py-1 rounded transition-colors ${
                  locale === "vi" ? "font-semibold" : "hover:text-purple-600"
                }`}
                style={{ color: locale === "vi" ? "#662d91" : "#666" }}
              >
                VI
              </button>
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" style={{ color: "#662d91" }} />
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div
        className="hidden lg:block"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
      >
        {/* Top Bar */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-8">
              {/* Language Switcher */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeLocale("en")}
                  className={`px-2 py-1 rounded transition-colors ${
                    locale === "en" ? "font-semibold" : "hover:text-purple-600"
                  }`}
                  style={{ color: locale === "en" ? "#662d91" : "#666" }}
                >
                  EN
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => changeLocale("vi")}
                  className={`px-2 py-1 rounded transition-colors ${
                    locale === "vi" ? "font-semibold" : "hover:text-purple-600"
                  }`}
                  style={{ color: locale === "vi" ? "#662d91" : "#666" }}
                >
                  VI
                </button>
              </div>

              {/* Cart */}
              <div className="flex items-center gap-4">
                <Link
                  href="/cart"
                  style={{ color: "#662d91" }}
                  className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <ShoppingCart
                    style={{ color: "#662d91", fontWeight: "bold" }}
                    className="w-4 h-4"
                  />
                  <span>{t("cart")}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Éclat du teint"
                width={180}
                height={60}
                priority
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="flex items-center gap-8">
              {navigationItems.map((item) => {
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="font-medium transition-colors uppercase tracking-wide"
                    style={{
                      color: "#662d91",
                      fontSize: "15px",
                    }}
                  >
                    {t(`navigation.${item.key}`)}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className={`lg:hidden fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
              isClosing ? "opacity-0" : "opacity-60"
            }`}
            onClick={handleCloseMenu}
          />

          {/* Slide Menu */}
          <div
            className={`lg:hidden fixed top-0 left-0 h-full w-64 z-50 shadow-2xl transition-transform duration-300 ${
              isClosing ? "animate-slide-out" : "animate-slide-in"
            }`}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.75)",
            }}
          >
            {/* Menu Header */}
            <div
              style={{ background: "#fff" }}
              className="flex items-center justify-between p-4 border-b border-gray-200"
            >
              <Image
                src="/logo.png"
                alt="Éclat du teint"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
              <button
                onClick={handleCloseMenu}
                className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="py-4">
              <div className="flex flex-col">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={handleCloseMenu}
                      className="px-6 py-3 text-sm font-medium transition-all"
                      style={{
                        color: isActive ? "#ffffff" : "#662d91",
                        backgroundColor: isActive ? "#662d91" : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "#662d91";
                          e.currentTarget.style.color = "#ffffff";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#662d91";
                        }
                      }}
                    >
                      {t(`navigation.${item.key}`)}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
