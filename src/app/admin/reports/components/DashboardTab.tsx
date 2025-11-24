"use client";

import { DashboardStatistics } from "@/service/report.service";
import { formatVND } from "@/service/helpers";

interface DashboardTabProps {
  stats: DashboardStatistics | null;
}

export default function DashboardTab({ stats }: DashboardTabProps) {
  if (!stats) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <p className="text-sm opacity-90 mb-1">Tổng người dùng</p>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <p className="text-sm opacity-90 mb-1">Tổng đơn hàng</p>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <p className="text-sm opacity-90 mb-1">Đơn đã thanh toán</p>
          <p className="text-3xl font-bold">{stats.paidOrders}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white">
          <p className="text-sm opacity-90 mb-1">Tổng doanh thu</p>
          <p className="text-3xl font-bold">{formatVND(stats.totalRevenue)}</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-lg p-6 text-white">
          <p className="text-sm opacity-90 mb-1">Đơn trung bình</p>
          <p className="text-3xl font-bold">
            {formatVND(stats.averageOrderValue)}
          </p>
        </div>
      </div>
    </div>
  );
}
