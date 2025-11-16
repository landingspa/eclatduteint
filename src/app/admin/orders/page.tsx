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
  getErrorMessage,
} from "@/service/helpers";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push("/admin/login");
      return;
    }

    const user = authService.getCurrentUser();
    if (!user || !["ADMIN", "LEADER", "MENTOR"].includes(user.role)) {
      router.push("/admin/login");
      return;
    }

    loadOrders();
  }, [router]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const user = authService.getCurrentUser();

      // Admin can see all orders, others see their own
      const data =
        user?.role === "ADMIN"
          ? await orderService.getAllOrders()
          : await orderService.getMyOrders();

      setOrders(data);
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (
    orderId: string,
    newStatus: "PENDING" | "CONFIRMED" | "PAID" | "CANCELLED"
  ) => {
    try {
      await orderService.updateOrderStatus(orderId, { status: newStatus });
      await loadOrders();
      setSelectedOrder(null);
      alert("Cập nhật trạng thái thành công!");
    } catch (err: any) {
      alert(getErrorMessage(err));
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
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
          <p className="text-gray-600 mt-2">
            Quản lý tất cả đơn hàng ({filteredOrders.length})
          </p>
        </div>
        <button
          onClick={loadOrders}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Làm mới
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">
            Lọc theo trạng thái:
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Tất cả ({orders.length})</option>
            <option value="PENDING">
              Chờ xử lý ({orders.filter((o) => o.status === "PENDING").length})
            </option>
            <option value="CONFIRMED">
              Đã xác nhận (
              {orders.filter((o) => o.status === "CONFIRMED").length})
            </option>
            <option value="PAID">
              Đã thanh toán ({orders.filter((o) => o.status === "PAID").length})
            </option>
            <option value="CANCELLED">
              Đã hủy ({orders.filter((o) => o.status === "CANCELLED").length})
            </option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đơn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.user?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.user?.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items.length} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatVND(order.totalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        order.status === "PAID"
                          ? "bg-green-100 text-green-800"
                          : order.status === "CONFIRMED"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "CANCELLED"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {getOrderStatusDisplayName(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-purple-600 hover:text-purple-900 mr-3"
                    >
                      Xem
                    </button>
                    {authService.getCurrentUser()?.role === "ADMIN" && (
                      <button
                        onClick={() =>
                          handleUpdateStatus(
                            order.id,
                            order.status === "PENDING" ? "CONFIRMED" : "PAID"
                          )
                        }
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Cập nhật
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Không tìm thấy đơn hàng</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Chi tiết đơn hàng
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
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

              {/* Order Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Mã đơn</p>
                    <p className="font-semibold">#{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Trạng thái</p>
                    <p className="font-semibold">
                      {getOrderStatusDisplayName(selectedOrder.status)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Khách hàng</p>
                    <p className="font-semibold">{selectedOrder.user?.name}</p>
                    <p className="text-sm text-gray-500">
                      {selectedOrder.user?.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ngày</p>
                    <p className="font-semibold">
                      {formatDate(selectedOrder.createdAt)}
                    </p>
                  </div>
                  {selectedOrder.region && (
                    <div>
                      <p className="text-sm text-gray-600">Khu vực</p>
                      <p className="font-semibold">{selectedOrder.region}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Sản phẩm đặt hàng
                </h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded"
                    >
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-600">
                          {item.quantity} x {formatVND(item.price)}
                        </p>
                      </div>
                      <p className="font-semibold">
                        {formatVND(item.totalPrice)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">Tổng tiền</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatVND(selectedOrder.totalAmount)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              {authService.getCurrentUser()?.role === "ADMIN" && (
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleUpdateStatus(selectedOrder.id, "CONFIRMED")
                    }
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Xác nhận
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, "PAID")}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Đánh dấu đã thanh toán
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateStatus(selectedOrder.id, "CANCELLED")
                    }
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Hủy
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
