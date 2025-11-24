"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/service";

export default function SystemSettingsPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);

    // Only SUPER_ADMIN can access this page
    if (!user || user.role !== "SUPER_ADMIN") {
      alert("Bạn không có quyền truy cập trang này!");
      router.push("/admin");
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản trị hệ thống</h1>
        <p className="mt-2 text-gray-600">
          Cấu hình và quản lý toàn bộ hệ thống (Chỉ dành cho Super Admin)
        </p>
      </div>

      {/* User Info */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 text-purple-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm text-purple-800">
            Bạn đang truy cập với quyền <strong>Super Admin</strong> - Quyền cao
            nhất trong hệ thống
          </p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Management */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-purple-600"
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
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-900">
              Quản lý người dùng
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Quản lý toàn bộ người dùng, bao gồm cả Admin. Thêm, sửa, xóa và phân
            quyền.
          </p>
          <button
            onClick={() => router.push("/admin/users")}
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Truy cập
          </button>
        </div>

        {/* Discount Tiers */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-900">
              Cấu hình chiết khấu
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Thiết lập các mức chiết khấu theo role và điều kiện đặc biệt.
          </p>
          <button
            onClick={() => router.push("/admin/discount-tiers")}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Truy cập
          </button>
        </div>

        {/* Commission Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
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
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-900">
              Cấu hình hoa hồng
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Quản lý tỷ lệ hoa hồng cho từng cấp bậc và điều kiện.
          </p>
          <button
            onClick={() => router.push("/admin/commissions")}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Truy cập
          </button>
        </div>

        {/* Order Management */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-yellow-600"
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
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-900">
              Quản lý đơn hàng
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Xem và quản lý tất cả đơn hàng trong hệ thống.
          </p>
          <button
            onClick={() => router.push("/admin/orders")}
            className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
          >
            Truy cập
          </button>
        </div>

        {/* Payment Management */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-indigo-600"
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
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-900">
              Quản lý thanh toán
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Theo dõi và xử lý tất cả giao dịch thanh toán.
          </p>
          <button
            onClick={() => router.push("/admin/payments")}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Truy cập
          </button>
        </div>

        {/* Reports */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-red-600"
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
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-900">
              Báo cáo & Thống kê
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Xem các báo cáo tổng hợp và phân tích dữ liệu.
          </p>
          <button
            onClick={() => router.push("/admin/reports")}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Truy cập
          </button>
        </div>
      </div>

      {/* System Information */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Thông tin hệ thống
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-lg font-semibold text-gray-900">
              {currentUser?.email}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Quyền hạn</p>
            <p className="text-lg font-semibold text-purple-600">
              {currentUser?.role}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Họ tên</p>
            <p className="text-lg font-semibold text-gray-900">
              {currentUser?.name || "Chưa cập nhật"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Level</p>
            <p className="text-lg font-semibold text-gray-900">
              100 (Cao nhất)
            </p>
          </div>
        </div>
      </div>

      {/* Warning Notice */}
      <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <p className="text-sm font-semibold text-red-800 mb-1">
              Lưu ý quan trọng
            </p>
            <p className="text-sm text-red-700">
              Với quyền Super Admin, bạn có toàn quyền truy cập và thay đổi mọi
              cài đặt trong hệ thống. Hãy thận trọng khi thực hiện các thay đổi
              vì chúng sẽ ảnh hưởng đến toàn bộ hệ thống và người dùng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
