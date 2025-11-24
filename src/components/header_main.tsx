"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { setUserLocale } from "@/app/(public)/actions/locale";
import Link from "next/link";
import Image from "next/image";
import { useState, useTransition, useEffect } from "react";
import { Menu, X, ShoppingCart, User, LogOut, Copy, Check } from "lucide-react";
import { getCart, getCartItemsCount } from "@/utils/cart";
import { authService } from "@/service";
import type { User as UserType } from "@/service/auth.service";

export default function HeaderMain() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [copiedReferralCode, setCopiedReferralCode] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = authService.getCurrentUser();
    setCurrentUser(user);

    // Listen for auth state changes
    const handleAuthChange = () => {
      const updatedUser = authService.getCurrentUser();
      setCurrentUser(updatedUser);
    };

    window.addEventListener("authStateChanged", handleAuthChange);
    return () =>
      window.removeEventListener("authStateChanged", handleAuthChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Update cart count on mount and when cart changes
    const updateCartCount = () => {
      const cart = getCart();
      setCartItemsCount(getCartItemsCount(cart));
    };

    updateCartCount();

    // Listen for cart updates
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
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

  const handleLogout = () => {
    if (confirm("Bạn có chắc muốn đăng xuất?")) {
      authService.logout();
      setCurrentUser(null);
      setShowUserMenu(false);
      window.dispatchEvent(new Event("authStateChanged"));
      router.push("/");
    }
  };

  const copyReferralCode = () => {
    if (currentUser?.referralCode) {
      navigator.clipboard.writeText(currentUser.referralCode);
      setCopiedReferralCode(true);
      setTimeout(() => setCopiedReferralCode(false), 2000);
    }
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

            {/* User Menu or Register Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-1 p-1.5 rounded-full bg-purple-100 hover:bg-purple-200 transition"
                >
                  <User className="w-4 h-4 text-purple-600" />
                </button>

                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {currentUser.email}
                        </p>
                      </div>
                      {currentUser.referralCode && (
                        <div className="mx-3 my-2 p-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                          <p className="text-xs text-gray-600 mb-1.5">
                            Mã giới thiệu
                          </p>
                          <div className="flex items-center gap-1.5">
                            <code className="text-xs font-mono font-semibold text-purple-700 bg-white px-2 py-1 rounded flex-1 truncate">
                              {currentUser.referralCode}
                            </code>
                            <button
                              onClick={copyReferralCode}
                              className="p-1.5 hover:bg-white rounded transition flex-shrink-0"
                              title="Copy"
                            >
                              {copiedReferralCode ? (
                                <Check className="w-3.5 h-3.5 text-green-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 text-purple-600" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                      <Link
                        href="/my-orders"
                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-purple-50 transition"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Đơn hàng của tôi
                      </Link>
                      <Link
                        href="/my-payments"
                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-purple-50 transition"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Lịch sử thanh toán
                      </Link>
                      <Link
                        href="/my-payments#f1-referrals"
                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-purple-50 transition"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Danh sách F1
                      </Link>
                      {(currentUser.role === "ADMIN" ||
                        currentUser.role === "SUPER_ADMIN") && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-xs text-purple-700 hover:bg-purple-50 transition font-semibold"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Quản trị hệ thống
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                      >
                        <LogOut className="w-3 h-3" />
                        Đăng xuất
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition"
              >
                Đăng nhập
              </Link>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors relative"
            >
              <ShoppingCart className="w-4 h-4" style={{ color: "#662d91" }} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
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

              {/* User Menu or Register & Cart */}
              <div className="flex items-center gap-4">
                {currentUser ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 hover:bg-purple-200 transition"
                    >
                      <User className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-900">
                        {currentUser.name}
                      </span>
                    </button>

                    {showUserMenu && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setShowUserMenu(false)}
                        />
                        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-900">
                              {currentUser.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {currentUser.email}
                            </p>
                            <p className="text-xs text-purple-600 font-medium mt-1">
                              {currentUser.role}
                            </p>
                          </div>
                          {currentUser.referralCode && (
                            <div className="px-4 py-3 border-b border-gray-100">
                              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-xs text-gray-700 font-medium">
                                    Mã giới thiệu
                                  </p>
                                  {copiedReferralCode && (
                                    <span className="text-xs text-green-600 font-medium">
                                      ✓ Đã copy
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-stretch gap-2">
                                  <div className="flex-1 bg-white rounded-lg border border-purple-300 px-2.5 py-2 overflow-hidden">
                                    <code className="text-xs font-mono font-semibold text-purple-700 break-all">
                                      {currentUser.referralCode}
                                    </code>
                                  </div>
                                  <button
                                    onClick={copyReferralCode}
                                    className="px-2.5 bg-white hover:bg-purple-100 rounded-lg transition border border-purple-300 flex-shrink-0"
                                    title="Copy mã"
                                  >
                                    {copiedReferralCode ? (
                                      <Check className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <Copy className="w-4 h-4 text-purple-600" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          <Link
                            href="/my-orders"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <div className="flex items-center gap-2">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                              </svg>
                              Đơn hàng của tôi
                            </div>
                          </Link>
                          <Link
                            href="/my-payments"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <div className="flex items-center gap-2">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                />
                              </svg>
                              Lịch sử thanh toán
                            </div>
                          </Link>
                          <Link
                            href="/my-payments#f1-referrals"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <div className="flex items-center gap-2">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                              Danh sách F1
                            </div>
                          </Link>
                          {(currentUser.role === "ADMIN" ||
                            currentUser.role === "SUPER_ADMIN") && (
                            <Link
                              href="/admin"
                              className="block px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 transition font-semibold border-t border-gray-100 mt-1 pt-3"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <div className="flex items-center gap-2">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                Quản trị hệ thống
                              </div>
                            </Link>
                          )}
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-100 mt-1 pt-3"
                          >
                            <div className="flex items-center gap-2">
                              <LogOut className="w-4 h-4" />
                              Đăng xuất
                            </div>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition shadow-md hover:shadow-lg"
                  >
                    Đăng nhập
                  </Link>
                )}
                <Link
                  href="/cart"
                  style={{ color: "#662d91" }}
                  className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors relative"
                >
                  <ShoppingCart
                    style={{ color: "#662d91", fontWeight: "bold" }}
                    className="w-4 h-4"
                  />
                  <span>{t("cart")}</span>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartItemsCount}
                    </span>
                  )}
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
