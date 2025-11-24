"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { authService, reportService, commissionService } from "@/service";
import { UserDetailReport } from "@/service/report.service";
import { Commission } from "@/service/commission.service";
import { formatVND, formatDateShort, getErrorMessage } from "@/service/helpers";

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;

  const [userDetail, setUserDetail] = useState<UserDetailReport | null>(null);
  const [activeCommission, setActiveCommission] = useState<Commission | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push("/admin/login");
      return;
    }

    const user = authService.getCurrentUser();
    if (!user || !["ADMIN", "EMS", "SUPER_ADMIN"].includes(user.role)) {
      router.push("/admin/login");
      return;
    }

    loadUserDetail();
  }, [userId, router]);

  const loadUserDetail = async () => {
    try {
      setLoading(true);
      setError("");
      const [userData, commissionData] = await Promise.all([
        reportService.getUserDetailReport(userId),
        commissionService.getActive(),
      ]);
      setUserDetail({
        ...userData,
        referrals: userData.referrals || [],
        f1Referrals: userData.f1Referrals || [],
        orders: userData.orders || [],
      });
      setActiveCommission(commissionData);
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const calculatePayback = (f1Revenue: number, userTier: string): number => {
    if (!activeCommission) return 0;

    const percentMap: Record<string, number> = {
      VIP: activeCommission.vipPercent,
      MENTOR: activeCommission.mentorPercent,
      MENTEE: activeCommission.menteePercent,
      LOYALTY: activeCommission.loyaltyPercent,
      NONE: 0,
    };

    const percent = percentMap[userTier] || 0;
    return (f1Revenue * percent) / 100;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (error || !userDetail) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 text-purple-600 hover:text-purple-800"
        >
          ← Quay lại
        </button>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600">
            {error || "Không tìm thấy thông tin user"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-4 sm:mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium text-sm sm:text-base"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Quay lại Reports
      </button>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">
              {userDetail.user.name}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1 break-all">
              {userDetail.user.email}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-800 text-xs sm:text-sm font-semibold rounded">
                {userDetail.user.discountTier}
              </span>
              <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm font-semibold rounded">
                {userDetail.user.role}
              </span>
              <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-800 text-xs sm:text-sm font-mono rounded break-all">
                {userDetail.user.referralCode}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats - Personal */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
          📊 Thống kê cá nhân
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 sm:p-6 border border-purple-200">
            <p className="text-xs sm:text-sm text-purple-700 mb-1">Đơn hàng</p>
            <p className="text-2xl sm:text-3xl font-bold text-purple-900">
              {userDetail.stats.totalOrders}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6 border border-blue-200">
            <p className="text-xs sm:text-sm text-blue-700 mb-1">Doanh thu</p>
            <p className="text-xl sm:text-3xl font-bold text-blue-900 break-words">
              {formatVND(userDetail.stats.totalRevenue)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 sm:p-6 border border-green-200">
            <p className="text-xs sm:text-sm text-green-700 mb-1">
              ĐH trung bình
            </p>
            <p className="text-xl sm:text-3xl font-bold text-green-900 break-words">
              {formatVND(userDetail.stats.averageOrderValue)}
            </p>
          </div>
        </div>
      </div>

      {/* Stats - F1 Network */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
          👥 Mạng lưới F1 (Người được giới thiệu trực tiếp)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 sm:p-6 border border-indigo-200">
            <p className="text-xs sm:text-sm text-indigo-700 mb-1">
              Số lượng F1
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-indigo-900">
              {userDetail.stats.f1Count}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6 border border-blue-200">
            <p className="text-xs sm:text-sm text-blue-700 mb-1">Đơn hàng F1</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-900">
              {userDetail.stats.f1TotalOrders}
            </p>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 sm:p-6 border border-cyan-200">
            <p className="text-xs sm:text-sm text-cyan-700 mb-1">
              Doanh thu F1
            </p>
            <p className="text-xl sm:text-3xl font-bold text-cyan-900 break-words">
              {formatVND(userDetail.stats.f1TotalRevenue)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 sm:p-6 border border-teal-200">
            <p className="text-xs sm:text-sm text-teal-700 mb-1">TB mỗi F1</p>
            <p className="text-xl sm:text-3xl font-bold text-teal-900 break-words">
              {formatVND(userDetail.stats.f1AverageRevenuePerReferral)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 sm:p-6 border border-green-200">
            <p className="text-xs sm:text-sm text-green-700 mb-1 break-words">
              💰 Payback (
              {activeCommission
                ? userDetail.user.discountTier === "VIP"
                  ? `${activeCommission.vipPercent}%`
                  : userDetail.user.discountTier === "MENTOR"
                  ? `${activeCommission.mentorPercent}%`
                  : userDetail.user.discountTier === "MENTEE"
                  ? `${activeCommission.menteePercent}%`
                  : userDetail.user.discountTier === "LOYALTY"
                  ? `${activeCommission.loyaltyPercent}%`
                  : "0%"
                : "0%"}
              )
            </p>
            <p className="text-xl sm:text-3xl font-bold text-green-900 break-words">
              {formatVND(
                calculatePayback(
                  userDetail.stats.f1TotalRevenue,
                  userDetail.user.discountTier
                )
              )}
            </p>
            {activeCommission && (
              <p className="text-xs text-green-600 mt-1">
                Tier {userDetail.user.discountTier}
              </p>
            )}
          </div>
        </div>
        {activeCommission && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs sm:text-sm text-blue-800 break-words">
              <strong>📌 Công thức:</strong> Payback = Doanh thu F1 × % tier (
              {userDetail.user.discountTier === "VIP" &&
                `${activeCommission.vipPercent}%`}
              {userDetail.user.discountTier === "MENTOR" &&
                `${activeCommission.mentorPercent}%`}
              {userDetail.user.discountTier === "MENTEE" &&
                `${activeCommission.menteePercent}%`}
              {userDetail.user.discountTier === "LOYALTY" &&
                `${activeCommission.loyaltyPercent}%`}
              {userDetail.user.discountTier === "NONE" && "0%"})
            </p>
          </div>
        )}
      </div>

      {/* Referrer Info */}
      {userDetail.user.referrer && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm font-semibold text-yellow-900 mb-2">
            ⬆️ Được giới thiệu bởi:
          </p>
          <div className="text-xs sm:text-sm text-yellow-800">
            <p className="font-medium break-words">
              {userDetail.user.referrer.name}
            </p>
            <p className="break-all">{userDetail.user.referrer.email}</p>
          </div>
        </div>
      )}

      {/* F1 Referrals List - Detailed */}
      {userDetail.f1Referrals && userDetail.f1Referrals.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
            👥 Danh sách F1 chi tiết ({userDetail.f1Referrals.length})
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {userDetail.f1Referrals.map((f1) => (
              <div
                key={f1.id}
                className="border border-gray-200 rounded-lg p-4 sm:p-6 bg-white hover:shadow-lg transition"
              >
                {/* F1 Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">
                      {f1.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 break-all">
                      {f1.email}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                        {f1.discountTier}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded">
                        {f1.role}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-mono rounded break-all">
                        {f1.referralCode}
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-gray-500">
                      Tham gia: {formatDateShort(f1.joinedAt)}
                    </p>
                  </div>
                </div>

                {/* F1 Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="bg-gray-50 rounded p-3 sm:p-4 border border-gray-200">
                    <p className="text-xs text-gray-600">Đơn hàng</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      {f1.stats.totalOrders}
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded p-3 sm:p-4 border border-blue-200">
                    <p className="text-xs text-blue-700">Doanh thu</p>
                    <p className="text-lg sm:text-2xl font-bold text-blue-600 break-words">
                      {formatVND(f1.stats.totalRevenue)}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded p-3 sm:p-4 border border-green-200">
                    <p className="text-xs text-green-700">ĐH trung bình</p>
                    <p className="text-lg sm:text-2xl font-bold text-green-600 break-words">
                      {formatVND(f1.stats.averageOrderValue)}
                    </p>
                  </div>
                  {f1.stats.f2TotalRevenue > 0 && (
                    <div className="bg-yellow-50 rounded p-3 sm:p-4 border border-yellow-200 col-span-2 lg:col-span-1">
                      <p className="text-xs text-yellow-700">
                        💰 Payback của F1
                      </p>
                      <p className="text-lg sm:text-2xl font-bold text-yellow-600 break-words">
                        {formatVND(
                          calculatePayback(
                            f1.stats.f2TotalRevenue || 0,
                            f1.discountTier
                          )
                        )}
                      </p>
                      <p className="text-xs text-yellow-600 mt-1">
                        từ {f1.stats.f2ReferralsCount || 0} F2
                      </p>
                    </div>
                  )}
                </div>

                {/* F1 Orders */}
                {f1.orders && f1.orders.length > 0 && (
                  <details className="mt-3 sm:mt-4">
                    <summary className="cursor-pointer text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 py-2">
                      📦 Xem đơn hàng của {f1.name} ({f1.orders.length})
                    </summary>
                    <div className="mt-2 sm:mt-3 space-y-2">
                      {f1.orders.map((order) => (
                        <div
                          key={order.id}
                          className="bg-gray-50 rounded border border-gray-200 p-3 sm:p-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded ${
                                  order.status === "PAID"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {order.status}
                              </span>
                              <span className="text-xs sm:text-sm text-gray-500">
                                {formatDateShort(order.createdAt)}
                              </span>
                            </div>
                            <div className="text-base sm:text-lg font-bold text-gray-900 break-words">
                              {formatVND(order.totalAmount)}
                            </div>
                          </div>
                          {order.items && order.items.length > 0 && (
                            <div className="mt-2 pl-0 sm:pl-4 text-xs sm:text-sm text-gray-600 space-y-1">
                              {order.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between gap-2"
                                >
                                  <span className="break-words flex-1">
                                    • {item.productName} x{item.quantity}
                                  </span>
                                  <span className="font-semibold whitespace-nowrap">
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
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
            🛒 Đơn hàng của user ({userDetail.orders.length})
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {userDetail.orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition"
              >
                <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <span
                      className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded ${
                        order.status === "PAID"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {formatDateShort(order.createdAt)}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {order.itemsCount} sản phẩm
                    </span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                    {formatVND(order.totalAmount)}
                  </div>
                </div>
                {order.items && order.items.length > 0 && (
                  <div className="px-3 sm:px-6 py-3 sm:py-4 overflow-x-auto">
                    <table className="w-full min-w-[500px]">
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
                            <td className="py-2 text-xs sm:text-sm text-gray-900 break-words">
                              {item.productName}
                            </td>
                            <td className="py-2 text-xs sm:text-sm text-center text-gray-600">
                              {item.quantity}
                            </td>
                            <td className="py-2 text-xs sm:text-sm text-right text-gray-600 whitespace-nowrap">
                              {formatVND(item.price)}
                            </td>
                            <td className="py-2 text-xs sm:text-sm text-right font-semibold text-gray-900 whitespace-nowrap">
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
  );
}
