"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { paymentService } from "@/service";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get orderCode from URL params or sessionStorage
        const orderCodeParam = searchParams.get("orderCode");
        const orderCodeStorage = sessionStorage.getItem("paymentOrderCode");
        const orderCode = orderCodeParam || orderCodeStorage;

        if (!orderCode) {
          setError("Không tìm thấy thông tin thanh toán");
          setLoading(false);
          return;
        }

        // Verify payment status from backend
        const info = await paymentService.getPaymentInfo(parseInt(orderCode));
        setPaymentInfo(info);

        // Clear stored data
        sessionStorage.removeItem("paymentOrderCode");
        sessionStorage.removeItem("orderId");
      } catch (err: any) {
        console.error("Payment verification error:", err);
        setError(err.message || "Không thể xác minh thanh toán");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-4 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-base md:text-lg">
            Đang xác minh thanh toán...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-center">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <svg
              className="w-7 h-7 md:w-8 md:h-8 text-red-600"
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
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Có lỗi xảy ra
          </h1>
          <p className="text-sm md:text-base text-gray-600 mb-6">{error}</p>
          <Link
            href="/my-orders"
            className="inline-block px-5 md:px-6 py-2.5 md:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm md:text-base"
          >
            Xem đơn hàng của tôi
          </Link>
        </div>
      </div>
    );
  }

  const isPaid = paymentInfo?.status === "PAID";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 py-6 md:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div
            className={`p-6 md:p-8 text-center ${
              isPaid
                ? "bg-gradient-to-r from-green-400 to-green-600"
                : "bg-gradient-to-r from-yellow-400 to-orange-500"
            }`}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 animate-bounce">
              <svg
                className={`w-8 h-8 md:w-10 md:h-10 ${
                  isPaid ? "text-green-600" : "text-yellow-600"
                }`}
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
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {isPaid ? "Thanh toán thành công!" : "Đang xử lý thanh toán"}
            </h1>
            <p className="text-sm md:text-base text-white/90">
              {isPaid
                ? "Cảm ơn bạn đã tin tưởng và sử dụng sản phẩm của chúng tôi"
                : "Thanh toán của bạn đang được xử lý. Vui lòng chờ trong giây lát."}
            </p>
          </div>

          {/* Payment Info */}
          <div className="p-4 md:p-8">
            <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
              <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                Thông tin thanh toán
              </h2>
              <div className="space-y-2 md:space-y-3">
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Mã giao dịch:</span>
                  <span className="font-medium text-gray-900">
                    {paymentInfo?.orderCode}
                  </span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Số tiền:</span>
                  <span className="font-bold text-purple-600 text-base md:text-lg">
                    {paymentInfo?.amount?.toLocaleString("vi-VN")}₫
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Trạng thái:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {isPaid ? "Đã thanh toán" : "Đang xử lý"}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
              <h3 className="text-sm md:text-base font-semibold text-blue-900 mb-2 flex items-center gap-2">
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
                Bước tiếp theo
              </h3>
              <ul className="text-xs md:text-sm text-blue-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Đơn hàng của bạn đang được xử lý</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Chúng tôi sẽ gửi email xác nhận trong vòng 24h</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>
                    Bạn có thể theo dõi đơn hàng trong mục "Đơn hàng của tôi"
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
                href="/products"
                className="flex-1 px-4 md:px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition text-center font-semibold text-sm md:text-base"
              >
                Tiếp tục mua sắm
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

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Đang tải...</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
