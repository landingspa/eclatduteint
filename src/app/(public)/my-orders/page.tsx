"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService, orderService } from "@/service";
import type { Order } from "@/service/order.service";
import {
  formatVND,
  formatDate,
  getOrderStatusDisplayName,
  getOrderStatusColor,
  getPaymentStatusDisplayName,
  getPaymentStatusColor,
  getErrorMessage,
} from "@/service/helpers";

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push("/login?redirect=/my-orders");
      return;
    }

    loadOrders();
  }, [router]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getMyOrders();
      setOrders(data);
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    return order.status === filterStatus;
  });

  // Calculate statistics
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "PENDING").length,
    confirmed: orders.filter((o) => o.status === "CONFIRMED").length,
    paid: orders.filter((o) => o.status === "PAID").length,
    cancelled: orders.filter((o) => o.status === "CANCELLED").length,
    totalSpent: orders
      .filter((o) => o.status === "PAID")
      .reduce((sum, o) => sum + o.totalAmount, 0),
  };

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-6 md:py-12">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white"
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
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Đơn hàng của tôi
              </h1>
              <p className="text-xs md:text-sm text-gray-600">
                Quản lý và theo dõi đơn hàng của bạn
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-3">
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-600"
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
              <div>
                <p className="text-xs text-gray-600">Tổng đơn</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-sm border border-yellow-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-200 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-yellow-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-yellow-700">Chờ xử lý</p>
                <p className="text-xl md:text-2xl font-bold text-yellow-900">
                  {stats.pending}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm border border-blue-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-700"
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
              <div>
                <p className="text-xs text-blue-700">Xác nhận</p>
                <p className="text-xl md:text-2xl font-bold text-blue-900">
                  {stats.confirmed}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm border border-green-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-green-700">Đã thanh toán</p>
                <p className="text-xl md:text-2xl font-bold text-green-900">
                  {stats.paid}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-sm border border-red-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-200 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-red-700"
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
              </div>
              <div>
                <p className="text-xs text-red-700">Đã hủy</p>
                <p className="text-xl md:text-2xl font-bold text-red-900">
                  {stats.cancelled}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
            <div className="text-white">
              <p className="text-xs opacity-90">Tổng chi tiêu</p>
              <p className="text-lg md:text-xl font-bold mt-1">
                {formatVND(stats.totalSpent)}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <label className="text-sm font-medium text-gray-700">
                Bộ lọc:
              </label>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 sm:flex-none px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white hover:border-purple-400 transition"
            >
              <option value="all">📋 Tất cả đơn hàng</option>
              <option value="PENDING">⏳ Chờ xử lý</option>
              <option value="CONFIRMED">✅ Đã xác nhận</option>
              <option value="PAID">💰 Đã thanh toán</option>
              <option value="CANCELLED">❌ Đã hủy</option>
            </select>
            <div className="flex gap-2 sm:ml-auto">
              <button
                onClick={loadOrders}
                className="flex-1 sm:flex-none px-4 py-2.5 text-sm bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition shadow-sm flex items-center justify-center gap-2"
              >
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Làm mới
              </button>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
            <span>Hiển thị {filteredOrders.length} đơn hàng</span>
            {filterStatus !== "all" && (
              <button
                onClick={() => setFilterStatus("all")}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-gray-400"
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
            <p className="text-gray-900 font-medium mb-1">
              Chưa có đơn hàng nào
            </p>
            <p className="text-sm text-gray-500">
              Các đơn hàng của bạn sẽ hiển thị tại đây
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-purple-200 flex flex-col"
              >
                <div className="p-5 md:p-6 flex-1 flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900">
                        Đơn hàng #{order.id.slice(0, 8)}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex sm:flex-col items-start sm:items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(
                          order.status
                        )}`}
                      >
                        {getOrderStatusDisplayName(order.status)}
                      </span>
                      {order.payment && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                            order.payment.status
                          )}`}
                        >
                          {getPaymentStatusDisplayName(order.payment.status)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4">
                    <h4 className="text-xs md:text-sm font-medium text-gray-700 mb-2">
                      Sản phẩm ({order.items.length}):
                    </h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 px-2 md:px-3 bg-gray-50 rounded"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-xs md:text-sm font-medium text-gray-900 truncate">
                              {item.productName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatVND(item.price)} × {item.quantity}
                            </p>
                          </div>
                          <p className="text-xs md:text-sm font-semibold text-gray-900 ml-2">
                            {formatVND(item.totalPrice)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="border-t pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="text-xs md:text-sm text-gray-600">
                      {order.region && (
                        <p>
                          <span className="font-medium">Khu vực:</span>{" "}
                          {order.region}
                        </p>
                      )}
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs md:text-sm text-gray-600">
                        Tổng cộng
                      </p>
                      <p className="text-xl md:text-2xl font-bold text-purple-600">
                        {formatVND(order.totalAmount)}
                      </p>
                    </div>
                  </div>

                  {/* Payment Info */}
                  {order.payment && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">
                        Thông tin thanh toán
                      </h4>
                      <div className="text-xs text-blue-800 space-y-1">
                        <p>
                          <span className="font-medium">Mã thanh toán:</span>{" "}
                          {order.payment.id.slice(0, 12)}...
                        </p>
                        <p>
                          <span className="font-medium">Số tiền:</span>{" "}
                          {formatVND(order.payment.amount)}
                        </p>
                        <p>
                          <span className="font-medium">Thời gian:</span>{" "}
                          {formatDate(order.payment.createdAt)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Spacer to push button to bottom */}
                  <div className="flex-1"></div>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="mt-4 w-full px-4 py-2.5 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 text-purple-700 rounded-lg hover:from-purple-100 hover:to-pink-100 hover:border-purple-300 transition-all font-medium flex items-center justify-center gap-2 group"
                  >
                    <span>Xem chi tiết</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 z-50">
            <div className="bg-white md:rounded-xl shadow-2xl max-w-3xl w-full h-full md:h-auto md:max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between z-10">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                  Chi tiết #{selectedOrder.id.slice(0, 8)}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600 transition"
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

              <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                {/* Status */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                  </h3>
                  <div className="flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      {getOrderStatusDisplayName(selectedOrder.status)}
                    </span>
                    {selectedOrder.payment && (
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(
                          selectedOrder.payment.status
                        )}`}
                      >
                        {getPaymentStatusDisplayName(
                          selectedOrder.payment.status
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Thông tin đơn hàng
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mã đơn hàng:</span>
                      <span className="font-medium text-gray-900">
                        {selectedOrder.id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ngày tạo:</span>
                      <span className="font-medium text-gray-900">
                        {formatDate(selectedOrder.createdAt)}
                      </span>
                    </div>
                    {selectedOrder.region && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Khu vực:</span>
                        <span className="font-medium text-gray-900">
                          {selectedOrder.region}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h3 className="text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Sản phẩm ({selectedOrder.items.length})
                  </h3>
                  {/* Mobile: Card view */}
                  <div className="md:hidden space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-3 space-y-1"
                      >
                        <p className="text-sm font-medium text-gray-900">
                          {item.productName}
                        </p>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Đơn giá: {formatVND(item.price)}</span>
                          <span>SL: {item.quantity}</span>
                        </div>
                        <div className="text-sm font-semibold text-purple-600 text-right">
                          {formatVND(item.totalPrice)}
                        </div>
                      </div>
                    ))}
                    <div className="bg-purple-50 rounded-lg p-3 flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">
                        Tổng cộng
                      </span>
                      <span className="text-lg font-bold text-purple-600">
                        {formatVND(selectedOrder.totalAmount)}
                      </span>
                    </div>
                  </div>
                  {/* Desktop: Table view */}
                  <div className="hidden md:block border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                            Sản phẩm
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">
                            Số lượng
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">
                            Đơn giá
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">
                            Thành tiền
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedOrder.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {item.productName}
                            </td>
                            <td className="px-4 py-3 text-sm text-center text-gray-600">
                              {item.quantity}
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-gray-600">
                              {formatVND(item.price)}
                            </td>
                            <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                              {formatVND(item.totalPrice)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td
                            colSpan={3}
                            className="px-4 py-3 text-sm font-medium text-gray-900"
                          >
                            Tổng cộng
                          </td>
                          <td className="px-4 py-3 text-sm text-right font-bold text-purple-600">
                            {formatVND(selectedOrder.totalAmount)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Payment Info */}
                {selectedOrder.payment && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Thông tin thanh toán
                    </h3>
                    <div className="bg-blue-50 rounded-lg p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-900">Mã thanh toán:</span>
                        <span className="font-medium text-blue-900">
                          {selectedOrder.payment.id}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-900">Số tiền:</span>
                        <span className="font-medium text-blue-900">
                          {formatVND(selectedOrder.payment.amount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-900">Trạng thái:</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(
                            selectedOrder.payment.status
                          )}`}
                        >
                          {getPaymentStatusDisplayName(
                            selectedOrder.payment.status
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-900">Thời gian:</span>
                        <span className="font-medium text-blue-900">
                          {formatDate(selectedOrder.payment.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
