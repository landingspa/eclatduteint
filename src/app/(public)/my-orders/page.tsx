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
    <div className="min-h-screen bg-gray-50 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Đơn hàng của tôi
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Xem tất cả đơn hàng và lịch sử mua hàng của bạn (
            {filteredOrders.length})
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
          <label className="text-xs md:text-sm font-medium text-gray-700">
            Lọc theo trạng thái:
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 sm:flex-none px-3 md:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Tất cả</option>
            <option value="PENDING">Chờ xử lý</option>
            <option value="CONFIRMED">Đã xác nhận</option>
            <option value="PAID">Đã thanh toán</option>
            <option value="CANCELLED">Đã hủy</option>
          </select>
          <button
            onClick={loadOrders}
            className="sm:ml-auto px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Làm mới
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
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
              <p className="mt-4 text-gray-600">Chưa có đơn hàng nào</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
              >
                <div className="p-4 md:p-6">
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

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="mt-4 w-full px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

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
