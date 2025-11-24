"use client";

import { UserDetailReport } from "@/service/report.service";
import { formatVND, formatDateShort } from "@/service/helpers";

interface UserDetailModalProps {
  userDetail: UserDetailReport | null;
  onClose: () => void;
}

export default function UserDetailModal({
  userDetail,
  onClose,
}: UserDetailModalProps) {
  if (!userDetail) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {userDetail.user.name}
            </h2>
            <p className="text-gray-600">{userDetail.user.email}</p>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded">
                {userDetail.user.discountTier}
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                {userDetail.user.role}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-mono rounded">
                {userDetail.user.referralCode}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats - Personal */}
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-3">
              📊 Thống kê cá nhân
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <p className="text-xs text-purple-700 mb-1">Đơn hàng</p>
                <p className="text-2xl font-bold text-purple-900">
                  {userDetail.stats.totalOrders}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <p className="text-xs text-blue-700 mb-1">Doanh thu</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatVND(userDetail.stats.totalRevenue)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <p className="text-xs text-green-700 mb-1">ĐH trung bình</p>
                <p className="text-2xl font-bold text-green-900">
                  {formatVND(userDetail.stats.averageOrderValue)}
                </p>
              </div>
            </div>
          </div>

          {/* Stats - F1 Network */}
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-3">
              👥 Mạng lưới F1 (Người được giới thiệu trực tiếp)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
                <p className="text-xs text-indigo-700 mb-1">Số lượng F1</p>
                <p className="text-2xl font-bold text-indigo-900">
                  {userDetail.stats.f1Count}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <p className="text-xs text-blue-700 mb-1">Đơn hàng F1</p>
                <p className="text-2xl font-bold text-blue-900">
                  {userDetail.stats.f1TotalOrders}
                </p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 border border-cyan-200">
                <p className="text-xs text-cyan-700 mb-1">Doanh thu F1</p>
                <p className="text-2xl font-bold text-cyan-900">
                  {formatVND(userDetail.stats.f1TotalRevenue)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 border border-teal-200">
                <p className="text-xs text-teal-700 mb-1">TB mỗi F1</p>
                <p className="text-2xl font-bold text-teal-900">
                  {formatVND(userDetail.stats.f1AverageRevenuePerReferral)}
                </p>
              </div>
            </div>
          </div>

          {/* Referrer Info */}
          {userDetail.user.referrer && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-yellow-900 mb-2">
                ⬆️ Được giới thiệu bởi:
              </p>
              <div className="text-sm text-yellow-800">
                <p className="font-medium">{userDetail.user.referrer.name}</p>
                <p>{userDetail.user.referrer.email}</p>
              </div>
            </div>
          )}

          {/* F1 Referrals List - Detailed */}
          {userDetail.f1Referrals && userDetail.f1Referrals.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                👥 Danh sách F1 chi tiết ({userDetail.f1Referrals.length})
              </h3>
              <div className="space-y-4">
                {userDetail.f1Referrals.map((f1) => (
                  <div
                    key={f1.id}
                    className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-md transition"
                  >
                    {/* F1 Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {f1.name}
                        </h4>
                        <p className="text-sm text-gray-600">{f1.email}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                            {f1.discountTier}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded">
                            {f1.role}
                          </span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-mono rounded">
                            {f1.referralCode}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          Tham gia: {formatDateShort(f1.joinedAt)}
                        </p>
                      </div>
                    </div>

                    {/* F1 Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      <div className="bg-white rounded p-3 border border-blue-200">
                        <p className="text-xs text-gray-600">Đơn hàng</p>
                        <p className="text-lg font-bold text-gray-900">
                          {f1.stats.totalOrders}
                        </p>
                      </div>
                      <div className="bg-white rounded p-3 border border-blue-200">
                        <p className="text-xs text-gray-600">Doanh thu</p>
                        <p className="text-lg font-bold text-blue-600">
                          {formatVND(f1.stats.totalRevenue)}
                        </p>
                      </div>
                      <div className="bg-white rounded p-3 border border-blue-200">
                        <p className="text-xs text-gray-600">ĐH trung bình</p>
                        <p className="text-lg font-bold text-green-600">
                          {formatVND(f1.stats.averageOrderValue)}
                        </p>
                      </div>
                    </div>

                    {/* F1 Orders */}
                    {f1.orders && f1.orders.length > 0 && (
                      <details className="mt-3">
                        <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800">
                          📦 Xem đơn hàng của {f1.name} ({f1.orders.length})
                        </summary>
                        <div className="mt-2 space-y-2">
                          {f1.orders.map((order) => (
                            <div
                              key={order.id}
                              className="bg-white rounded border border-gray-200 p-3"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-3">
                                  <span
                                    className={`px-2 py-1 text-xs font-semibold rounded ${
                                      order.status === "PAID"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {order.status}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {formatDateShort(order.createdAt)}
                                  </span>
                                </div>
                                <div className="text-lg font-bold text-gray-900">
                                  {formatVND(order.totalAmount)}
                                </div>
                              </div>
                              {order.items && order.items.length > 0 && (
                                <div className="mt-2 pl-4 text-xs text-gray-600 space-y-1">
                                  {order.items.map((item, idx) => (
                                    <div
                                      key={idx}
                                      className="flex justify-between"
                                    >
                                      <span>
                                        • {item.productName} x{item.quantity}
                                      </span>
                                      <span className="font-semibold">
                                        {formatVND(item.totalPrice)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User's Orders */}
          {userDetail.orders && userDetail.orders.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                🛒 Đơn hàng của user ({userDetail.orders.length})
              </h3>
              <div className="space-y-3">
                {userDetail.orders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition"
                  >
                    <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded ${
                            order.status === "PAID"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                        <span className="text-sm text-gray-600">
                          {formatDateShort(order.createdAt)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {order.itemsCount} sản phẩm
                        </span>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatVND(order.totalAmount)}
                      </div>
                    </div>
                    {order.items && order.items.length > 0 && (
                      <div className="px-4 py-3">
                        <table className="w-full">
                          <thead>
                            <tr className="text-xs text-gray-500 border-b">
                              <th className="text-left py-2">Sản phẩm</th>
                              <th className="text-center py-2">Số lượng</th>
                              <th className="text-right py-2">Đơn giá</th>
                              <th className="text-right py-2">Thành tiền</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item, idx) => (
                              <tr key={idx} className="border-b last:border-0">
                                <td className="py-2 text-sm text-gray-900">
                                  {item.productName}
                                </td>
                                <td className="py-2 text-sm text-center text-gray-600">
                                  {item.quantity}
                                </td>
                                <td className="py-2 text-sm text-right text-gray-600">
                                  {formatVND(item.price)}
                                </td>
                                <td className="py-2 text-sm text-right font-semibold text-gray-900">
                                  {formatVND(item.totalPrice)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
