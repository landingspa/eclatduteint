"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { commissionService, Commission } from "@/service";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  discountTier: string;
};

type Stats = {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  activeCommission: {
    option: string;
    description: string;
  } | null;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeCommission: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      router.push("/admin/login");
      return;
    }

    const userData = JSON.parse(userStr);
    setUser(userData);

    // Check if user has admin privileges
    if (!["SUPER_ADMIN", "ADMIN", "EMS"].includes(userData.role)) {
      alert("Bạn không có quyền truy cập trang này");
      router.push("/");
      return;
    }

    fetchStats(token);
  }, [router]);

  const fetchStats = async (token: string) => {
    try {
      // Fetch active commission
      const activeCommission = await commissionService.getActive();

      setStats({
        totalUsers: 0,
        totalOrders: 0,
        totalRevenue: 0,
        activeCommission: activeCommission
          ? {
              option: activeCommission.option,
              description: activeCommission.description,
            }
          : null,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/admin/login");
  };

  const getRoleName = (role: string) => {
    const roleNames: { [key: string]: string } = {
      SUPER_ADMIN: "Super Admin",
      ADMIN: "Admin",
      EMS: "EMS - Quản lý báo cáo",
      ERC: "ERC - Hỗ trợ nội bộ",
      VIP_MASTER: "VIP Master",
      MENTOR: "Mentor",
      LEADER: "Leader",
      MENTEE: "Mentee",
      LOYALTY: "Loyalty",
      CUSTOMER: "Customer",
    };
    return roleNames[role] || role;
  };

  const getCommissionLabel = (option: string) => {
    return commissionService.getOptionLabel(option as any);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Eclat Admin Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-medium text-gray-800">{user?.name}</div>
                <div className="text-sm text-gray-600">
                  {user && getRoleName(user.role)}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 mb-2">Tổng số người dùng</div>
            <div className="text-3xl font-bold text-blue-600">
              {stats.totalUsers}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 mb-2">Tổng số đơn hàng</div>
            <div className="text-3xl font-bold text-green-600">
              {stats.totalOrders}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 mb-2">Tổng doanh thu</div>
            <div className="text-3xl font-bold text-purple-600">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(stats.totalRevenue)}
            </div>
          </div>
        </div>

        {/* Active Commission */}
        {stats.activeCommission && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-6 mb-8 text-white">
            <h2 className="text-xl font-bold mb-2">
              🎯 Cấu hình hoa hồng đang active
            </h2>
            <div className="text-lg">
              {getCommissionLabel(stats.activeCommission.option)}
            </div>
            <div className="text-sm mt-1 opacity-90">
              {stats.activeCommission.description}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Quản lý hệ thống</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/discount-tiers"
              className="block p-6 bg-blue-50 hover:bg-blue-100 rounded-lg transition border-2 border-blue-200"
            >
              <div className="text-4xl mb-3">💎</div>
              <div className="font-bold text-lg text-gray-800 mb-1">
                Cấp độ Chiết khấu
              </div>
              <div className="text-sm text-gray-600">
                Quản lý VIP, MENTOR, MENTEE, LOYALTY
              </div>
            </Link>

            <Link
              href="/admin/commissions"
              className="block p-6 bg-purple-50 hover:bg-purple-100 rounded-lg transition border-2 border-purple-200"
            >
              <div className="text-4xl mb-3">💰</div>
              <div className="font-bold text-lg text-gray-800 mb-1">
                Cấu hình Hoa hồng
              </div>
              <div className="text-sm text-gray-600">
                Quản lý 3 options hoa hồng
              </div>
            </Link>

            <Link
              href="/admin/users"
              className="block p-6 bg-green-50 hover:bg-green-100 rounded-lg transition border-2 border-green-200"
            >
              <div className="text-4xl mb-3">👥</div>
              <div className="font-bold text-lg text-gray-800 mb-1">
                Quản lý Users
              </div>
              <div className="text-sm text-gray-600">
                Xem và quản lý người dùng
              </div>
            </Link>

            <Link
              href="/admin/orders"
              className="block p-6 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition border-2 border-yellow-200"
            >
              <div className="text-4xl mb-3">📦</div>
              <div className="font-bold text-lg text-gray-800 mb-1">
                Đơn hàng
              </div>
              <div className="text-sm text-gray-600">
                Quản lý tất cả đơn hàng
              </div>
            </Link>

            <Link
              href="/admin/payments"
              className="block p-6 bg-pink-50 hover:bg-pink-100 rounded-lg transition border-2 border-pink-200"
            >
              <div className="text-4xl mb-3">💳</div>
              <div className="font-bold text-lg text-gray-800 mb-1">
                Thanh toán
              </div>
              <div className="text-sm text-gray-600">
                Xem lịch sử thanh toán
              </div>
            </Link>

            <Link
              href="/admin/reports"
              className="block p-6 bg-orange-50 hover:bg-orange-100 rounded-lg transition border-2 border-orange-200"
            >
              <div className="text-4xl mb-3">📊</div>
              <div className="font-bold text-lg text-gray-800 mb-1">
                Báo cáo
              </div>
              <div className="text-sm text-gray-600">Thống kê và phân tích</div>
            </Link>
          </div>
        </div>

        {/* Role Information */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <h3 className="font-bold text-lg mb-2">ℹ️ Thông tin quyền hạn</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <strong>SUPER_ADMIN:</strong> Toàn quyền truy cập hệ thống
            </p>
            <p>
              <strong>ADMIN:</strong> Quản lý users (trừ SUPER_ADMIN)
            </p>
            <p>
              <strong>EMS:</strong> Quản lý báo cáo và users cấp thấp hơn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
