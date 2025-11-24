"use client";

import {
  ReferralsReport,
  ReferralsReportQuery,
} from "@/service/report.service";

interface ReferralsTabProps {
  report: ReferralsReport | null;
  filters: ReferralsReportQuery;
  onFiltersChange: (filters: ReferralsReportQuery) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  onViewUserDetail: (userId: string) => void;
}

export default function ReferralsTab({
  report,
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
  onViewUserDetail,
}: ReferralsTabProps) {
  return (
    <>
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Bộ lọc</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                {report.summary.totalUsers}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-1">Tổng F1</p>
              <p className="text-3xl font-bold text-blue-600">
                {report.summary.totalReferrals}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-1">TB F1/user</p>
              <p className="text-3xl font-bold text-green-600">
                {report.summary.averageReferralsPerUser.toFixed(2)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-1">Users có F1</p>
              <p className="text-3xl font-bold text-purple-600">
                {report.summary.usersWithReferrals}
              </p>
            </div>
          </div>

          {/* Top Referrers */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🏆 Top 10 người giới thiệu
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Hạng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Người dùng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Mã giới thiệu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Số lượng F1
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {report.topReferrers.map((user, index) => (
                    <tr key={user.userId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-2xl font-bold ${
                            index === 0
                              ? "text-yellow-500"
                              : index === 1
                              ? "text-gray-400"
                              : index === 2
                              ? "text-orange-600"
                              : "text-gray-600"
                          }`}
                        >
                          {index === 0
                            ? "🥇"
                            : index === 1
                            ? "🥈"
                            : index === 2
                            ? "🥉"
                            : `#${index + 1}`}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-purple-600">
                        {user.referralCode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-blue-600">
                        {user.referralsCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => onViewUserDetail(user.userId)}
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
