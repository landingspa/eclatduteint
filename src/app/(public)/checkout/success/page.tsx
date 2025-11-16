"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderInfo, setOrderInfo] = useState<any>(null);

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    if (!orderId) {
      router.push("/");
      return;
    }

    // Get order info from session storage
    const lastOrder = sessionStorage.getItem("lastOrder");
    if (lastOrder) {
      setOrderInfo(JSON.parse(lastOrder));
      // Clear after reading
      sessionStorage.removeItem("lastOrder");
    } else {
      // If no order info, just show generic success
      setOrderInfo({ orderId, orderNumber: orderId.slice(0, 8) });
    }
  }, [searchParams, router]);

  const formatPrice = (price: number) => {
    return price?.toLocaleString("vi-VN") || "0";
  };

  if (!orderInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Success Icon & Message */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center mb-6">
            <div className="mb-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-75"></div>
                <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full p-6">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Đặt hàng thành công!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Cảm ơn bạn đã tin tưởng và mua hàng tại Éclat du teint
            </p>

            {/* Order Number */}
            <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-xl px-6 py-4 mb-8">
              <p className="text-sm text-gray-600 mb-1">Mã đơn hàng</p>
              <p className="text-2xl font-bold text-purple-600">
                #{orderInfo.orderNumber || orderInfo.orderId?.slice(0, 8)}
              </p>
            </div>

            {/* Order Details */}
            {orderInfo.total && (
              <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Thông tin đơn hàng
                </h2>
                <div className="space-y-3">
                  {orderInfo.customerName && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Người nhận:</span>
                      <span className="font-medium text-gray-900">
                        {orderInfo.customerName}
                      </span>
                    </div>
                  )}
                  {orderInfo.customerPhone && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Số điện thoại:</span>
                      <span className="font-medium text-gray-900">
                        {orderInfo.customerPhone}
                      </span>
                    </div>
                  )}
                  {orderInfo.customerEmail && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-900 break-all">
                        {orderInfo.customerEmail}
                      </span>
                    </div>
                  )}
                  {orderInfo.customerAddress && (
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-600">Địa chỉ giao hàng:</span>
                      <span className="font-medium text-gray-900">
                        {orderInfo.customerAddress}
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-gray-900">
                        Tổng tiền:
                      </span>
                      <span className="font-bold text-purple-600">
                        {formatPrice(orderInfo.total)}₫
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
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
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-2">Những điều cần biết:</p>
                  <ul className="space-y-1 text-blue-800">
                    <li>• Email xác nhận đã được gửi đến hộp thư của bạn</li>
                    <li>• Đơn hàng sẽ được xử lý trong vòng 24 giờ</li>
                    <li>
                      • Bạn có thể theo dõi đơn hàng trong mục "Đơn hàng của
                      tôi"
                    </li>
                    <li>• Liên hệ hotline nếu cần hỗ trợ: 1900-xxxx</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/admin/my-orders"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl font-semibold"
              >
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Xem đơn hàng của tôi
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-xl hover:bg-purple-50 transition-all font-semibold"
              >
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center text-gray-600 text-sm">
            <p>Cần hỗ trợ? Liên hệ chúng tôi qua:</p>
            <p className="mt-2">
              Email:{" "}
              <a
                href="mailto:eclatmastersystem@gmail.com"
                className="text-purple-600 hover:underline"
              >
                eclatmastersystem@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
