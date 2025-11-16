"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService, paymentService } from "@/service";
import type { Payment } from "@/service/payment.service";
import {
  formatVND,
  formatDate,
  getPaymentStatusDisplayName,
  getPaymentStatusColor,
  getOrderStatusDisplayName,
  getOrderStatusColor,
  getErrorMessage,
} from "@/service/helpers";

export default function MyPaymentsPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push("/admin/login");
      return;
    }

    loadPayments();
  }, [router]);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const data = await paymentService.getMyPayments();
      setPayments(data);
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter((payment) => {
    if (filterStatus === "all") return true;
    return payment.status === filterStatus;
  });

  // Calculate statistics
  const stats = {
    total: payments.length,
    succeeded: payments.filter((p) => p.status === "SUCCEEDED").length,
    pending: payments.filter((p) => p.status === "PENDING").length,
    failed: payments.filter((p) => p.status === "FAILED").length,
    totalAmount: payments
      .filter((p) => p.status === "SUCCEEDED")
      .reduce((sum, p) => sum + p.amount, 0),
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
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Lịch sử thanh toán</h1>
        <p className="text-gray-600 mt-2">
          Xem tất cả giao dịch thanh toán của bạn ({filteredPayments.length})
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Tổng giao dịch</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow-sm border border-green-200 p-4">
          <p className="text-sm text-green-600">Thành công</p>
          <p className="text-2xl font-bold text-green-900 mt-1">
            {stats.succeeded}
          </p>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow-sm border border-yellow-200 p-4">
          <p className="text-sm text-yellow-600">Đang xử lý</p>
          <p className="text-2xl font-bold text-yellow-900 mt-1">
            {stats.pending}
          </p>
        </div>
        <div className="bg-red-50 rounded-lg shadow-sm border border-red-200 p-4">
          <p className="text-sm text-red-600">Thất bại</p>
          <p className="text-2xl font-bold text-red-900 mt-1">{stats.failed}</p>
        </div>
        <div className="bg-purple-50 rounded-lg shadow-sm border border-purple-200 p-4">
          <p className="text-sm text-purple-600">Tổng chi tiêu</p>
          <p className="text-lg font-bold text-purple-900 mt-1">
            {formatVND(stats.totalAmount)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">
          Lọc theo trạng thái:
        </label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="all">Tất cả</option>
          <option value="SUCCEEDED">Thành công</option>
          <option value="PENDING">Đang xử lý</option>
          <option value="FAILED">Thất bại</option>
        </select>
        <button
          onClick={loadPayments}
          className="ml-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Làm mới
        </button>
      </div>

      {/* Payments List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredPayments.length === 0 ? (
          <div className="text-center py-12">
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
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <p className="mt-4 text-gray-600">Chưa có giao dịch nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Mã thanh toán
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Mã đơn hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Số tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Thời gian
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {payment.id.slice(0, 12)}...
                      </div>
                      <div className="text-xs text-gray-500">
                        {payment.paymentIntentId.slice(0, 16)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        #{payment.orderId.slice(0, 8)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatVND(payment.amount)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {payment.currency.toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                          payment.status
                        )}`}
                      >
                        {getPaymentStatusDisplayName(payment.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(payment.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => setSelectedPayment(payment)}
                        className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Chi tiết thanh toán
              </h2>
              <button
                onClick={() => setSelectedPayment(null)}
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

            <div className="p-6 space-y-6">
              {/* Payment Status */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Trạng thái thanh toán
                </h3>
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getPaymentStatusColor(
                    selectedPayment.status
                  )}`}
                >
                  {getPaymentStatusDisplayName(selectedPayment.status)}
                </span>
              </div>

              {/* Payment Info */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Thông tin thanh toán
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mã thanh toán:</span>
                    <span className="font-medium text-gray-900">
                      {selectedPayment.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Intent ID:</span>
                    <span className="font-mono text-xs text-gray-900">
                      {selectedPayment.paymentIntentId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số tiền:</span>
                    <span className="font-bold text-purple-600">
                      {formatVND(selectedPayment.amount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Đơn vị tiền tệ:</span>
                    <span className="font-medium text-gray-900">
                      {selectedPayment.currency.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày tạo:</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(selectedPayment.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cập nhật lần cuối:</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(selectedPayment.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Info */}
              {selectedPayment.order && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Thông tin đơn hàng
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-blue-900 font-medium">
                          Đơn hàng #{selectedPayment.order.id.slice(0, 8)}
                        </p>
                        <p className="text-xs text-blue-700 mt-1">
                          {formatDate(selectedPayment.order.createdAt)}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(
                          selectedPayment.order.status
                        )}`}
                      >
                        {getOrderStatusDisplayName(
                          selectedPayment.order.status
                        )}
                      </span>
                    </div>

                    {selectedPayment.order.region && (
                      <div className="text-sm text-blue-900">
                        <span className="font-medium">Khu vực:</span>{" "}
                        {selectedPayment.order.region}
                      </div>
                    )}

                    {/* Order Items */}
                    {selectedPayment.order.items &&
                      selectedPayment.order.items.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-blue-200">
                          <p className="text-xs font-medium text-blue-900 mb-2">
                            Sản phẩm ({selectedPayment.order.items.length}):
                          </p>
                          <div className="space-y-2">
                            {selectedPayment.order.items.map((item, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center text-xs bg-white/50 rounded p-2"
                              >
                                <div className="flex-1">
                                  <p className="font-medium text-blue-900">
                                    {item.productName}
                                  </p>
                                  <p className="text-blue-700">
                                    {formatVND(item.price)} × {item.quantity}
                                  </p>
                                </div>
                                <p className="font-semibold text-blue-900">
                                  {formatVND(item.totalPrice)}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-blue-200 flex justify-between items-center">
                            <span className="text-sm font-medium text-blue-900">
                              Tổng cộng:
                            </span>
                            <span className="text-lg font-bold text-blue-900">
                              {formatVND(selectedPayment.order.totalAmount)}
                            </span>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setSelectedPayment(null)}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
