"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function PaymentCancelContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderCode, setOrderCode] = useState<string>("");

  useEffect(() => {
    const code =
      searchParams.get("orderCode") ||
      sessionStorage.getItem("paymentOrderCode") ||
      "";
    setOrderCode(code);

    // Clear stored data
    sessionStorage.removeItem("paymentOrderCode");
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 py-6 md:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Cancel Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8 text-center bg-gradient-to-r from-orange-400 to-red-500">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-red-600"
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
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Thanh toán đã bị hủy
            </h1>
            <p className="text-sm md:text-base text-white/90">
              Bạn đã hủy giao dịch thanh toán
            </p>
          </div>

          {/* Content */}
          <div className="p-4 md:p-8">
            {orderCode && (
              <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Mã giao dịch:</span>
                  <span className="font-medium text-gray-900">{orderCode}</span>
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
              <h3 className="text-sm md:text-base font-semibold text-orange-900 mb-2 flex items-center gap-2">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Thông tin
              </h3>
              <ul className="text-xs md:text-sm text-orange-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Đơn hàng của bạn vẫn được lưu trong hệ thống</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Bạn có thể thanh toán lại bất cứ lúc nào</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>
                    Hoặc chọn phương thức thanh toán khi nhận hàng (COD)
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                href="/my-orders"
                className="flex-1 px-4 md:px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-center font-semibold text-sm md:text-base"
              >
                Xem đơn hàng
              </Link>
              <Link
                href="/cart"
                className="flex-1 px-4 md:px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition text-center font-semibold text-sm md:text-base"
              >
                Về giỏ hàng
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-4 md:mt-6 text-center text-xs md:text-sm text-gray-600 px-4">
          <p>Cần hỗ trợ? Liên hệ: </p>
          <p className="mt-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <a
              href="tel:0986003747"
              className="text-purple-600 hover:underline"
            >
              0986003747
            </a>
            <span className="hidden sm:inline">|</span>
            <a
              href="mailto:support@eclatduteint.com"
              className="text-purple-600 hover:underline break-all"
            >
              support@eclatduteint.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-4 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-base md:text-lg">
              Đang tải...
            </p>
          </div>
        </div>
      }
    >
      <PaymentCancelContent />
    </Suspense>
  );
}
