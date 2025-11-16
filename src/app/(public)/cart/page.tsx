"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartTotal,
  type CartItem,
} from "@/utils/cart";
import { Product } from "@/data/products";
import { authService } from "@/service";

const CartPage = () => {
  const t = useTranslations("cartPage");
  const locale = useLocale();
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStatus, setOrderStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [orderNumber, setOrderNumber] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    note: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Check if user is logged in
    setIsLoggedIn(authService.isAuthenticated());

    // Load cart on mount
    setCart(getCart());

    // Listen for cart updates
    const handleCartUpdate = () => {
      setCart(getCart());
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN");
  };

  const getProductName = (product: Product) => {
    if (locale === "vi") return product.nameVi;
    if (locale === "en") return product.nameEn;
    return product.name;
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };

  const subtotal = getCartTotal(cart);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      phone: "",
      address: "",
    };

    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = t("orderForm.required");
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = t("orderForm.required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email không hợp lệ";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = t("orderForm.required");
      isValid = false;
    }

    if (!formData.address.trim()) {
      errors.address = t("orderForm.required");
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Generate order number
      const orderNum = `ORD-${Date.now()}`;
      setOrderNumber(orderNum);

      // Prepare order details
      const orderDetails = cart
        .map((item) => {
          const productName = getProductName(item.product);
          return `- ${productName} x ${item.quantity} = ${formatPrice(
            item.product.salePrice * item.quantity
          )}₫`;
        })
        .join("\n");

      const orderMessage = `
ĐƠN HÀNG MỚI - ${orderNum}

THÔNG TIN KHÁCH HÀNG:
- Họ tên: ${formData.name}
- Email: ${formData.email}
- Số điện thoại: ${formData.phone}
- Địa chỉ: ${formData.address}
${formData.note ? `- Ghi chú: ${formData.note}` : ""}

CHI TIẾT ĐƠN HÀNG:
${orderDetails}

TỔNG CỘNG: ${formatPrice(total)}₫
`;

      // Prepare data for Google Sheets
      const orderData = {
        orderNumber: orderNum,
        orderDate: new Date().toISOString(),
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        customerNote: formData.note,
        items: cart.map((item) => ({
          productId: item.product.id,
          productName: getProductName(item.product),
          productNameKo: item.product.name,
          productNameEn: item.product.nameEn,
          productNameVi: item.product.nameVi,
          quantity: item.quantity,
          price: item.product.salePrice,
          total: item.product.salePrice * item.quantity,
        })),
        subtotal: subtotal,
        shipping: shipping,
        total: total,
        status: "pending",
      };

      // Send to Google Sheets (non-blocking)
      fetch("/api/save-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }).catch((error) => {
        console.error("Google Sheets save error:", error);
        // Don't block the order process
      });

      // Send email via API
      const response = await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: orderMessage,
          subject: `Đơn hàng mới #${orderNum} từ ${formData.name}`,
          adminEmail: "eclatmastersystem@gmail.com",
          adminName: "Éclat du teint Admin",
          companyName: "Éclat du teint",
          serviceName: "đơn hàng sản phẩm",
          projectName: "E-commerce",
        }),
      });

      if (response.ok) {
        setOrderStatus("success");
        clearCart();
        setCart([]);
      } else {
        setOrderStatus("error");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      setOrderStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Success screen
  if (orderStatus === "success") {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto text-green-500"
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
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {t("success.title")}
            </h1>
            <p className="text-gray-600 mb-2">{t("success.message")}</p>
            <p className="text-sm text-gray-500 mb-8">
              {t("success.orderNumber")}: <strong>{orderNumber}</strong>
            </p>
            <Link
              href="/"
              className="inline-block bg-[#662d91] text-white px-8 py-3 rounded-lg hover:bg-[#551f7a] transition-colors"
            >
              {t("success.backToHome")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Error screen
  if (orderStatus === "error") {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {t("error.title")}
            </h1>
            <p className="text-gray-600 mb-8">{t("error.message")}</p>
            <button
              onClick={() => setOrderStatus("idle")}
              className="inline-block bg-[#662d91] text-white px-8 py-3 rounded-lg hover:bg-[#551f7a] transition-colors"
            >
              {t("error.tryAgain")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#662d91] mb-8">
          {t("title")}
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
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
            <p className="text-xl text-gray-600 mb-6">{t("emptyCart")}</p>
            <Link
              href="/products"
              className="inline-block bg-[#662d91] text-white px-6 py-3 rounded-lg hover:bg-[#551f7a] transition-colors"
            >
              {t("continueShopping")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden md:block">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          {t("product")}
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                          {t("price")}
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                          {t("quantity")}
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                          {t("total")}
                        </th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.product.id} className="border-b">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="relative w-20 h-20 flex-shrink-0">
                                <Image
                                  src={item.product.image}
                                  alt={getProductName(item.product)}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800">
                                  {getProductName(item.product)}
                                </h3>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <p className="text-gray-800">
                              {formatPrice(item.product.salePrice)}₫
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.product.id,
                                    item.quantity - 1
                                  )
                                }
                                className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
                              >
                                -
                              </button>
                              <span className="w-12 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.product.id,
                                    item.quantity + 1
                                  )
                                }
                                className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <p className="font-semibold text-gray-800">
                              {formatPrice(
                                item.product.salePrice * item.quantity
                              )}
                              ₫
                            </p>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleRemoveItem(item.product.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y">
                  {cart.map((item) => (
                    <div key={item.product.id} className="p-4">
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <Image
                            src={item.product.image}
                            alt={getProductName(item.product)}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 mb-2">
                            {getProductName(item.product)}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            {formatPrice(item.product.salePrice)}₫
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.product.id,
                                    item.quantity - 1
                                  )
                                }
                                className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
                              >
                                -
                              </button>
                              <span className="w-12 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.product.id,
                                    item.quantity + 1
                                  )
                                }
                                className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.product.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-right font-semibold text-gray-800">
                          {t("total")}:{" "}
                          {formatPrice(item.product.salePrice * item.quantity)}₫
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary & Form */}
            <div className="lg:col-span-1">
              {!showOrderForm ? (
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    {t("orderForm.title")}
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>{t("subtotal")}</span>
                      <span className="font-semibold">
                        {formatPrice(subtotal)}₫
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>{t("shipping")}</span>
                      <span className="font-semibold text-green-600">
                        {t("shippingFree")}
                      </span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-bold text-gray-800">
                        <span>{t("grandTotal")}</span>
                        <span className="text-[#662d91]">
                          {formatPrice(total)}₫
                        </span>
                      </div>
                    </div>
                  </div>

                  {isLoggedIn ? (
                    <button
                      onClick={() => router.push("/checkout")}
                      className="w-full bg-[#662d91] text-white py-3 rounded-lg hover:bg-[#551f7a] transition-colors font-semibold"
                    >
                      {t("proceedToCheckout")}
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={() => router.push("/login?redirect=/checkout")}
                        className="w-full bg-[#662d91] text-white py-3 rounded-lg hover:bg-[#551f7a] transition-colors font-semibold"
                      >
                        Đăng nhập để thanh toán
                      </button>
                      <button
                        onClick={() => setShowOrderForm(true)}
                        className="w-full bg-white text-[#662d91] border-2 border-[#662d91] py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
                      >
                        Đặt hàng không cần tài khoản
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <button
                    onClick={() => setShowOrderForm(false)}
                    className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
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
                    Quay lại
                  </button>

                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    {t("orderForm.title")}
                  </h2>

                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("orderForm.name")} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t("orderForm.namePlaceholder")}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#662d91] focus:border-transparent ${
                          formErrors.name ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("orderForm.email")} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t("orderForm.emailPlaceholder")}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#662d91] focus:border-transparent ${
                          formErrors.email
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("orderForm.phone")} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t("orderForm.phonePlaceholder")}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#662d91] focus:border-transparent ${
                          formErrors.phone
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("orderForm.address")} *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder={t("orderForm.addressPlaceholder")}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#662d91] focus:border-transparent ${
                          formErrors.address
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {formErrors.address && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.address}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("orderForm.note")}
                      </label>
                      <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        placeholder={t("orderForm.notePlaceholder")}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#662d91] focus:border-transparent"
                      />
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-bold text-gray-800 mb-4">
                        <span>{t("grandTotal")}</span>
                        <span className="text-[#662d91]">
                          {formatPrice(total)}₫
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#662d91] text-white py-3 rounded-lg hover:bg-[#551f7a] transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isSubmitting
                        ? t("orderForm.submitting")
                        : t("orderForm.submit")}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
