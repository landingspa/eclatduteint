"use client";

import { UsersReport, UsersReportQuery } from "@/service/report.service";
import { formatVND } from "@/service/helpers";

interface UsersTabProps {
  report: UsersReport | null;
  filters: UsersReportQuery;
  onFiltersChange: (filters: UsersReportQuery) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  onViewUserDetail: (userId: string) => void;
}

export default function UsersTab({
  report,
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
  onViewUserDetail,
}: UsersTabProps) {
  return (
    <>
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Bộ lọc</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày bắt đầu
            </label>
            <input
              type="date"
              value={filters.startDate || ""}
              onChange={(e) =>
                onFiltersChange({ ...filters, startDate: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày kết thúc
            </label>
            <input
              type="date"
              value={filters.endDate || ""}
              onChange={(e) =>
                onFiltersChange({ ...filters, endDate: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Tier
            </label>
            <select
              value={filters.discountTier || ""}
              onChange={(e) =>
                onFiltersChange({ ...filters, discountTier: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Tất cả</option>
              <option value="VIP">VIP</option>
              <option value="MENTOR">MENTOR</option>
              <option value="MENTEE">MENTEE</option>
              <option value="LOYALTY">LOYALTY</option>
              <option value="NONE">NONE</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={filters.role || ""}
              onChange={(e) =>
                onFiltersChange({ ...filters, role: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Tất cả</option>
              <option value="ADMIN">ADMIN</option>
              <option value="MENTOR">MENTOR</option>
              <option value="CUSTOMER">CUSTOMER</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={onApplyFilters}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Áp dụng
          </button>
          <button
            onClick={onClearFilters}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>

      {report && (
        <>
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-1">Tổng người dùng</p>
              <p className="text-3xl font-bold text-gray-900">
                {report.totalUsers}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-1">Tổng doanh thu</p>
              <p className="text-3xl font-bold text-purple-600">
                {formatVND(report.summary.totalRevenue)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-1">Tổng giới thiệu</p>
              <p className="text-3xl font-bold text-blue-600">
                {report.summary.totalReferrals}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-1">DT từ giới thiệu</p>
              <p className="text-3xl font-bold text-green-600">
                {formatVND(report.summary.totalReferralRevenue)}
              </p>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Danh sách người dùng ({report.users.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Người dùng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tier / Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Đơn hàng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Doanh thu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      F1
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      DT từ F1
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {report.users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                        <div className="text-xs text-gray-400">
                          {user.referralCode}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.discountTier}
                        </div>
                        <div className="text-sm text-gray-500">{user.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.stats.totalOrders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatVND(user.stats.totalRevenue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        {user.stats.referralsCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                        {formatVND(user.stats.referralRevenue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => onViewUserDetail(user.id)}
                          className="text-purple-600 hover:text-purple-900 font-medium"
                        >
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
