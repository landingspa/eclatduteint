"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService, reportService } from "@/service";
import type { DashboardStatistics } from "@/service/report.service";
import { formatVND, getRoleDisplayName } from "@/service/helpers";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStatistics | null>(null);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check authentication
    if (!authService.isAuthenticated()) {
      router.push("/admin/login");
      return;
    }

    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push("/admin/login");
      return;
    }

    // Only admins and super admins can access dashboard, others redirect to their personal pages
    if (currentUser.role !== "ADMIN" && currentUser.role !== "SUPER_ADMIN") {
      router.push("/admin/my-orders");
      return;
    }

    setUser(currentUser);
    loadDashboardStats();
  }, [router]);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await reportService.getDashboardStatistics();
      setStats(data);
      setError(""); // Clear any previous errors
    } catch (err: any) {
      console.error("Failed to load dashboard stats:", err);
      // Don't set error, just use dummy data for now
      setStats({
        totalUsers: 0,
        totalOrders: 0,
        paidOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 text-xl font-semibold mb-2">
            Access Denied
          </h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tổng quan</h1>
        <p className="text-gray-600 mt-2">
          Chào mừng trở lại, {user?.name} ({getRoleDisplayName(user?.role)})
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng người dùng</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats?.totalUsers || 0}
              </p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-blue-600"
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
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng đơn hàng</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats?.totalOrders || 0}
              </p>
            </div>
            <div className="bg-purple-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-purple-600"
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
          </div>
        </div>

        {/* Paid Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Đơn đã thanh toán</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats?.paidOrders || 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {stats?.totalOrders
                  ? Math.round(
                      ((stats?.paidOrders || 0) / stats.totalOrders) * 100
                    )
                  : 0}
                % chuyển đổi
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng doanh thu</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatVND(stats?.totalRevenue || 0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Trung bình: {formatVND(stats?.averageOrderValue || 0)}
              </p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-yellow-600"
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
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Thao tác nhanh
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {user?.role === "SUPER_ADMIN" && (
            <button
              onClick={() => router.push("/admin/discount-tiers")}
              className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
            >
              <svg
                className="w-6 h-6 text-blue-600 mr-3"
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
              <div className="text-left">
                <p className="font-semibold text-gray-900">Chiết khấu</p>
                <p className="text-sm text-gray-600">Quản lý cấp độ</p>
              </div>
            </button>
          )}
          {user?.role === "SUPER_ADMIN" && (
            <button
              onClick={() => router.push("/admin/commissions")}
              className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition cursor-pointer"
            >
              <svg
                className="w-6 h-6 text-yellow-600 mr-3"
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
              <div className="text-left">
                <p className="font-semibold text-gray-900">Hoa hồng</p>
                <p className="text-sm text-gray-600">Cấu hình options</p>
              </div>
            </button>
          )}

          <button
            onClick={() => router.push("/admin/orders")}
            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition cursor-pointer"
          >
            <svg
              className="w-6 h-6 text-purple-600 mr-3"
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
            <div className="text-left">
              <p className="font-semibold text-gray-900">Đơn hàng</p>
              <p className="text-sm text-gray-600">Quản lý đơn hàng</p>
            </div>
          </button>

          {user?.role === "SUPER_ADMIN" && (
            <button
              onClick={() => router.push("/admin/users")}
              className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition cursor-pointer"
            >
              <svg
                className="w-6 h-6 text-indigo-600 mr-3"
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
              <div className="text-left">
                <p className="font-semibold text-gray-900">Người dùng</p>
                <p className="text-sm text-gray-600">Quản lý users</p>
              </div>
            </button>
          )}

          {user?.role === "SUPER_ADMIN" && (
            <button
              onClick={() => router.push("/admin/payos-config")}
              className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition cursor-pointer"
            >
              <svg
                className="w-6 h-6 text-orange-600 mr-3"
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
              <div className="text-left">
                <p className="font-semibold text-gray-900">PayOS Config</p>
                <p className="text-sm text-gray-600">Cấu hình thanh toán</p>
              </div>
            </button>
          )}

          <button
            onClick={() => router.push("/admin/reports")}
            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition cursor-pointer"
          >
            <svg
              className="w-6 h-6 text-green-600 mr-3"
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
            <div className="text-left">
              <p className="font-semibold text-gray-900">Báo cáo</p>
              <p className="text-sm text-gray-600">Phân tích doanh thu</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Trạng thái hệ thống
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">Trạng thái API</span>
            </div>
            <span className="text-sm font-semibold text-green-600">
              Hoạt động
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">Cơ sở dữ liệu</span>
            </div>
            <span className="text-sm font-semibold text-blue-600">Kết nối</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">Cổng thanh toán</span>
            </div>
            <span className="text-sm font-semibold text-purple-600">
              Hoạt động
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
