"use client";

import React, { useState } from "react";
import Image from "next/image";

const PaymentMethodPage = () => {
  const [copied, setCopied] = useState(false);

  // Thông tin tài khoản TPBank
  const bankInfo = {
    bankName: "TPBank - Ngân hàng Tiên Phong",
    accountNumber: "3159 3999 999",
    accountName: "NGO KIEU TRAM",
  };

  const handleCopyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(bankInfo.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownloadQR = () => {
    const link = document.createElement("a");
    link.href = "/qrcode.jpg";
    link.download = "TPBank_QRCode_EclatDuTeint.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-6 sm:py-12">
      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-12">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
            style={{ color: "#662d91" }}
          >
            Phương Thức Thanh Toán
          </h1>
          <p className="text-gray-600 text-base sm:text-lg px-2">
            Quý khách có thể thanh toán qua chuyển khoản ngân hàng
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
          {/* Bank Header */}
          <div
            className="py-4 sm:py-6 px-4 sm:px-8 text-center"
            style={{ backgroundColor: "#662d91" }}
          >
            <h2 className="text-lg sm:text-2xl font-bold text-white">
              {bankInfo.bankName}
            </h2>
          </div>

          <div className="p-4 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              {/* QR Code Section */}
              <div className="flex flex-col items-center order-1 md:order-1">
                <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg border-2 border-purple-100">
                  <Image
                    src="/qrcode.jpg"
                    alt="TPBank QR Code"
                    width={280}
                    height={280}
                    className="rounded-lg w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] object-contain"
                    priority
                  />
                </div>
                <button
                  onClick={handleDownloadQR}
                  className="mt-4 sm:mt-6 flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Tải mã QR
                </button>
              </div>

              {/* Bank Info Section */}
              <div className="space-y-4 sm:space-y-6 order-2 md:order-2">
                {/* Account Number */}
                <div className="bg-purple-50 rounded-xl p-4 sm:p-6">
                  <label className="text-xs sm:text-sm font-medium text-purple-600 uppercase tracking-wide">
                    Số tài khoản
                  </label>
                  <div className="flex items-center justify-between mt-2 gap-2">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-wider break-all">
                      {bankInfo.accountNumber}
                    </span>
                    <button
                      onClick={handleCopyAccountNumber}
                      className={`ml-2 sm:ml-4 p-2.5 sm:p-3 rounded-lg transition-all duration-300 flex-shrink-0 active:scale-95 ${
                        copied
                          ? "bg-green-500 text-white"
                          : "bg-purple-600 hover:bg-purple-700 text-white"
                      }`}
                      title="Copy số tài khoản"
                    >
                      {copied ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {copied && (
                    <p className="text-green-600 text-sm mt-2 font-medium">
                      ✓ Đã copy số tài khoản!
                    </p>
                  )}
                </div>

                {/* Account Name */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <label className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Tên tài khoản
                  </label>
                  <p className="text-lg sm:text-xl font-bold text-gray-800 mt-2">
                    {bankInfo.accountName}
                  </p>
                </div>
              </div>
            </div>

            {/* Note Section */}
            <div className="mt-6 sm:mt-10 p-4 sm:p-6 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="flex items-start gap-2 sm:gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-bold text-yellow-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    Lưu ý quan trọng
                  </h3>
                  <ul className="text-yellow-700 space-y-1 text-xs sm:text-sm">
                    <li>
                      • Vui lòng ghi <strong>Mã đơn hàng</strong> hoặc{" "}
                      <strong>Số điện thoại</strong> trong nội dung chuyển khoản
                    </li>
                    <li>
                      • Đơn hàng sẽ được xử lý sau khi xác nhận thanh toán thành
                      công
                    </li>
                    <li>
                      • Nếu cần hỗ trợ, vui lòng liên hệ qua Zalo hoặc Facebook
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-gray-500 text-sm sm:text-base">
            Cần hỗ trợ?{" "}
            <a
              href="/contact"
              className="text-purple-600 hover:text-purple-700 font-medium underline"
            >
              Liên hệ với chúng tôi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodPage;
