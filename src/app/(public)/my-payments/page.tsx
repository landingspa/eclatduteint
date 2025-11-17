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
      router.push("/login?redirect=/my-payments");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-6 md:py-12">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Lịch sử thanh toán
              </h1>
              <p className="text-xs md:text-sm text-gray-600">
                Theo dõi tất cả giao dịch của bạn
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

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600">Tổng GD</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {stats.total}
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-green-700">Thành công</p>
                <p className="text-xl md:text-2xl font-bold text-green-900">
                  {stats.succeeded}
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
                <p className="text-xs text-yellow-700">Xử lý</p>
                <p className="text-xl md:text-2xl font-bold text-yellow-900">
                  {stats.pending}
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
                <p className="text-xs text-red-700">Thất bại</p>
                <p className="text-xl md:text-2xl font-bold text-red-900">
                  {stats.failed}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-5 h-5"
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
                <p className="text-xs opacity-90">Tổng chi tiêu</p>
              </div>
              <p className="text-lg md:text-xl font-bold">
                {formatVND(stats.totalAmount)}
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
              className="flex-1 sm:flex-none px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white hover:border-blue-400 transition"
            >
              <option value="all">📋 Tất cả giao dịch</option>
              <option value="SUCCEEDED">✅ Thành công</option>
              <option value="PENDING">⏳ Đang xử lý</option>
              <option value="FAILED">❌ Thất bại</option>
            </select>
            <div className="flex gap-2 sm:ml-auto">
              <button
                onClick={loadPayments}
                className="flex-1 sm:flex-none px-4 py-2.5 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow-sm flex items-center justify-center gap-2"
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
            <span>Hiển thị {filteredPayments.length} giao dịch</span>
            {filterStatus !== "all" && (
              <button
                onClick={() => setFilterStatus("all")}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Payments List */}
        {filteredPayments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-blue-500"
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
            </div>
            <p className="text-gray-900 font-medium mb-1">
              Chưa có giao dịch nào
            </p>
            <p className="text-sm text-gray-500">
              Lịch sử thanh toán sẽ hiển thị tại đây
            </p>
          </div>
        ) : (
          <>
            {/* Mobile: Card View */}
            <div className="md:hidden space-y-3">
              {filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-lg transition-all duration-200 hover:border-blue-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-gray-500 truncate">
                        {payment.id.slice(0, 12)}...
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {formatVND(payment.amount)}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                        payment.status
                      )}`}
                    >
                      {getPaymentStatusDisplayName(payment.status)}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600 mb-3">
                    <p>
                      <span className="font-medium">Đơn hàng:</span> #
                      {payment.orderId.slice(0, 8)}
                    </p>
                    <p>
                      <span className="font-medium">Thời gian:</span>{" "}
                      {formatDate(payment.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedPayment(payment)}
                    className="w-full px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 text-blue-700 rounded-lg hover:from-blue-100 hover:to-purple-100 hover:border-blue-300 transition-all text-sm font-medium flex items-center justify-center gap-2 group"
                  >
                    <span>Chi tiết</span>
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
              ))}
            </div>

            {/* Desktop: Table View */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                      <tr
                        key={payment.id}
                        className="hover:bg-gray-50 transition"
                      >
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
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                          >
                            <span>Chi tiết</span>
                            <svg
                              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Payment Detail Modal */}
        {selectedPayment && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 z-50">
            <div className="bg-white md:rounded-xl shadow-2xl max-w-3xl w-full h-full md:h-auto md:max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between z-10">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
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

              <div className="p-4 md:p-6 space-y-4 md:space-y-6">
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
                              {selectedPayment.order.items.map(
                                (item, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between items-center text-xs bg-white/50 rounded p-2"
                                  >
                                    <div className="flex-1">
                                      <p className="font-medium text-blue-900">
                                        {item.productName}
                                      </p>
                                      <p className="text-blue-700">
                                        {formatVND(item.price)} ×{" "}
                                        {item.quantity}
                                      </p>
                                    </div>
                                    <p className="font-semibold text-blue-900">
                                      {formatVND(item.totalPrice)}
                                    </p>
                                  </div>
                                )
                              )}
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
    </div>
  );
}
