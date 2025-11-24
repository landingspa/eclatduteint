"use client";

import { RevenueReport, RevenueReportQuery } from "@/service/report.service";
import { formatVND, formatDateShort } from "@/service/helpers";

interface RevenueTabProps {
  report: RevenueReport | null;
  filters: RevenueReportQuery;
  onFiltersChange: (filters: RevenueReportQuery) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  onDownloadCSV: () => void;
}

export default function RevenueTab({
  report,
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
  onDownloadCSV,
}: RevenueTabProps) {
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
              Khu vực
            </label>
            <input
              type="text"
              value={filters.region || ""}
              onChange={(e) =>
                onFiltersChange({ ...filters, region: e.target.value })
              }
              placeholder="Miền Bắc, Miền Nam..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mã Mentor
            </label>
            <input
              type="text"
              value={filters.mentorId || ""}
              onChange={(e) =>
                onFiltersChange({ ...filters, mentorId: e.target.value })
              }
              placeholder="Mã Mentor..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
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
          <button
            onClick={onDownloadCSV}
            disabled={!report}
            className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
          >
            📥 Xuất CSV
          </button>
        </div>
      </div>

      {report && (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
              <p className="text-sm opacity-90 mb-1">Tổng doanh thu</p>
              <p className="text-3xl font-bold">
                {formatVND(report.summary.totalRevenue)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
              <p className="text-sm opacity-90 mb-1">Tổng đơn hàng</p>
              <p className="text-3xl font-bold">{report.summary.totalOrders}</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
              <p className="text-sm opacity-90 mb-1">Đơn trung bình</p>
              <p className="text-3xl font-bold">
                {formatVND(report.summary.averageOrderValue)}
              </p>
            </div>
          </div>

          {/* By Region */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Doanh thu theo khu vực
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(report.byRegion).map(([region, data]) => (
                <div key={region} className="border rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">{region}</p>
                  <p className="text-xl font-bold text-purple-600">
                    {formatVND(data.revenue)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {data.count} đơn hàng
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Orders List */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Danh sách đơn hàng ({report.orders.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Ngày
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Khách hàng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Khu vực
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Sản phẩm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Số tiền
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {report.orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDateShort(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.userName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.userEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.region || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.itemsCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatVND(order.totalAmount)}
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
