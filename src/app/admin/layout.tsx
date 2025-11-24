"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authService } from "@/service";
import "../(public)/globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    if (confirm("Bạn có chắc muốn đăng xuất?")) {
      authService.logout();
      authService.clearCurrentUser();
      router.push("/admin/login");
    }
  };

  const isAdmin =
    currentUser?.role === "ADMIN" || currentUser?.role === "SUPER_ADMIN";
  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";

  // Don't render sidebar on login page
  if (!mounted || pathname === "/admin/login") {
    return (
      <html lang="en">
        <body className="bg-gray-50">{children}</body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-lg fixed h-full z-10">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-purple-600">
                Éclat Admin
              </h1>
            </div>
            <nav className="mt-6">
              {/* Personal Section - Available for all users */}
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Cá nhân
                </p>
              </div>
              <a
                href="/admin/my-orders"
                className={`block px-6 py-3 transition ${
                  pathname === "/admin/my-orders"
                    ? "bg-purple-50 text-purple-600 border-r-4 border-purple-600"
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                }`}
              >
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3"
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
                </span>
              </a>
              <a
                href="/admin/my-payments"
                className={`block px-6 py-3 transition ${
                  pathname === "/admin/my-payments"
                    ? "bg-purple-50 text-purple-600 border-r-4 border-purple-600"
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                }`}
              >
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3"
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
                </span>
              </a>

              {/* Admin Section - For Admin and Super Admin users */}
              {isAdmin && (
                <>
                  <div className="px-4 py-2 mt-6 border-t pt-6">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Quản trị
                    </p>
                  </div>
                  {isSuperAdmin && (
                    <a
                      href="/admin/system-settings"
                      className={`block px-6 py-3 transition ${
                        pathname === "/admin/system-settings"
                          ? "bg-purple-50 text-purple-600 border-r-4 border-purple-600"
                          : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      }`}
                    >
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3"
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
                      </span>
                    </a>
                  )}
                  <a
                    href="/admin"
                    className={`block px-6 py-3 transition ${
                      pathname === "/admin"
                        ? "bg-purple-50 text-purple-600 border-r-4 border-purple-600"
                        : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    }`}
                  >
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      Tổng quan
                    </span>
                  </a>
                  <a
                    href="/admin/orders"
                    className={`block px-6 py-3 transition ${
                      pathname === "/admin/orders"
                        ? "bg-purple-50 text-purple-600 border-r-4 border-purple-600"
                        : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    }`}
                  >
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3"
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
                      Quản lý đơn hàng
                    </span>
                  </a>
                  {isSuperAdmin && (
                    <a
                      href="/admin/users"
                      className={`block px-6 py-3 transition ${
                        pathname === "/admin/users"
                          ? "bg-purple-50 text-purple-600 border-r-4 border-purple-600"
                          : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      }`}
                    >
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        Quản lý người dùng
                      </span>
                    </a>
                  )}
                  {isSuperAdmin && (
                    <a
                      href="/admin/discount-tiers"
                      className={`block px-6 py-3 transition ${
                        pathname === "/admin/discount-tiers"
                          ? "bg-purple-50 text-purple-600 border-r-4 border-purple-600"
                          : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      }`}
                    >
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Cấp chiết khấu
                      </span>
                    </a>
                  )}
                  {isSuperAdmin && (
                    <a
                      href="/admin/commissions"
                      className={`block px-6 py-3 transition ${
                        pathname === "/admin/commissions"
                          ? "bg-purple-50 text-purple-600 border-r-4 border-purple-600"
                          : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      }`}
                    >
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        Hoa hồng
                      </span>
                    </a>
                  )}
                  {isSuperAdmin && (
                    <a
                      href="/admin/payos-config"
                      className={`block px-6 py-3 transition ${
                        pathname === "/admin/payos-config"
                          ? "bg-purple-50 text-purple-600 border-r-4 border-purple-600"
                          : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      }`}
                    >
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3"
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
                        PayOS Config
                      </span>
                    </a>
                  )}
                  <a
                    href="/admin/payments"
                    className={`block px-6 py-3 transition ${
                      pathname === "/admin/payments"
                        ? "bg-purple-50 text-purple-600 border-r-4 border-purple-600"
                        : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    }`}
                  >
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3"
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
                      Quản lý thanh toán
                    </span>
                  </a>
                  <a
                    href="/admin/reports"
                    className={`block px-6 py-3 transition ${
                      pathname === "/admin/reports"
                        ? "bg-purple-50 text-purple-600 border-r-4 border-purple-600"
                        : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    }`}
                  >
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      Báo cáo
                    </span>
                  </a>
                </>
              )}
              <div className="mt-6 border-t pt-6">
                <a
                  href="/"
                  className="block px-6 py-3 text-gray-700 hover:bg-gray-50 transition"
                >
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Về trang chủ
                  </span>
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-6 py-3 text-red-600 hover:bg-red-50 transition"
                >
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Đăng xuất
                  </span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 ml-64 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
