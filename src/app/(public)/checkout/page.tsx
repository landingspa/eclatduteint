"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService, orderService, paymentService } from "@/service";
import { getCart, clearCart, getCartTotal, type CartItem } from "@/utils/cart";
import { Product } from "@/data/products";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    region: "",
    note: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Check authentication
    if (!authService.isAuthenticated()) {
      router.push("/admin/login?redirect=/checkout");
      return;
    }

    const user = authService.getCurrentUser();
    if (!user) {
      router.push("/login?redirect=/checkout");
      return;
    }

    // Load cart
    const cartData = getCart();
    if (cartData.length === 0) {
      router.push("/cart");
      return;
    }

    setCurrentUser(user);
    setCart(cartData);

    // Pre-fill form with user data
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: "",
      address: "",
      region: user.region || "",
      note: "",
    });

    setLoading(false);
  }, [router]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN");
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
      errors.name = "Vui lòng nhập họ tên";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Vui lòng nhập email";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email không hợp lệ";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Vui lòng nhập số điện thoại";
      isValid = false;
    }

    if (!formData.address.trim()) {
      errors.address = "Vui lòng nhập địa chỉ giao hàng";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare order items
      const items = cart.map((item) => ({
        productName: item.product.nameVi || item.product.name,
        quantity: item.quantity,
        price: item.product.salePrice,
        totalPrice: item.product.salePrice * item.quantity,
      }));

      // Create order via API
      const orderData = {
        items,
        region: formData.region || undefined,
        mentorId: currentUser.mentorId || undefined,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        note: formData.note || undefined,
      };

      const order = await orderService.createOrder(orderData);

      // If online payment selected, create payment link
      if (paymentMethod === "online") {
        try {
          const paymentLink = await paymentService.createPaymentLink({
            orderId: order.id,
            amount: order.totalAmount,
            returnUrl: `${window.location.origin}/payment/success`,
            cancelUrl: `${window.location.origin}/payment/cancel`,
          });

          // Store order code for later verification
          sessionStorage.setItem(
            "paymentOrderCode",
            paymentLink.orderCode.toString()
          );
          sessionStorage.setItem("orderId", order.id);

          // Clear cart before redirect
          clearCart();

          // Redirect to PayOS
          window.location.href = paymentLink.checkoutUrl;
          return;
        } catch (error: any) {
          console.error("Payment link creation error:", error);
          alert(
            error.message || "Không thể tạo link thanh toán. Vui lòng thử lại!"
          );
          setIsSubmitting(false);
          return;
        }
      }

      // COD: Store order info for success page
      sessionStorage.setItem(
        "lastOrder",
        JSON.stringify({
          orderId: order.id,
          orderNumber: order.id.slice(0, 8),
          total: order.totalAmount,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerAddress: formData.address,
          note: formData.note,
        })
      );

      // Clear cart
      clearCart();

      // Redirect to success page
      router.push(`/checkout/success?orderId=${order.id}`);
    } catch (error: any) {
      console.error("Order creation error:", error);
      alert(
        error.message || "Đã có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#662d91] mb-8">
          Thanh toán đơn hàng
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Thông tin giao hàng
              </h2>

              <form onSubmit={handleSubmitOrder} className="space-y-6">
                {/* Customer Info Section */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#662d91] focus:border-transparent ${
                        formErrors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Nhập họ và tên của bạn"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#662d91] focus:border-transparent ${
                          formErrors.email
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="email@example.com"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#662d91] focus:border-transparent ${
                          formErrors.phone
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="0912345678"
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa chỉ giao hàng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#662d91] focus:border-transparent ${
                        formErrors.address
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    />
                    {formErrors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Khu vực
                    </label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#662d91] focus:border-transparent"
                    >
                      <option value="">Chọn khu vực (không bắt buộc)</option>
                      <option value="North">Miền Bắc</option>
                      <option value="Central">Miền Trung</option>
                      <option value="South">Miền Nam</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ghi chú đơn hàng
                    </label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#662d91] focus:border-transparent"
                      placeholder="Ghi chú thêm về đơn hàng (không bắt buộc)"
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Phương thức thanh toán{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      <label
                        className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition ${
                          paymentMethod === "cod"
                            ? "border-[#662d91] bg-purple-50"
                            : "border-gray-300 hover:border-purple-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={(e) =>
                            setPaymentMethod(e.target.value as "cod" | "online")
                          }
                          className="mt-1 w-4 h-4 text-[#662d91] focus:ring-[#662d91]"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              Thanh toán khi nhận hàng (COD)
                            </span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                              Miễn phí
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Thanh toán bằng tiền mặt khi nhận hàng
                          </p>
                        </div>
                      </label>

                      <label
                        className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition ${
                          paymentMethod === "online"
                            ? "border-[#662d91] bg-purple-50"
                            : "border-gray-300 hover:border-purple-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="online"
                          checked={paymentMethod === "online"}
                          onChange={(e) =>
                            setPaymentMethod(e.target.value as "cod" | "online")
                          }
                          className="mt-1 w-4 h-4 text-[#662d91] focus:ring-[#662d91]"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              Thanh toán online
                            </span>
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                              PayOS
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Chuyển khoản ngân hàng, QR Code, Visa/Master
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#662d91] text-white py-4 rounded-lg hover:bg-[#551f7a] transition-colors font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Xác nhận đặt hàng
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Đơn hàng của bạn
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 pb-4 border-b"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.nameVi}
                        className="w-full h-full object-cover rounded"
                      />
                      <span className="absolute -top-2 -right-2 bg-[#662d91] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-semibold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                        {item.product.nameVi || item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatPrice(item.product.salePrice)}₫ × {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-[#662d91] mt-1">
                        {formatPrice(item.product.salePrice * item.quantity)}₫
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span className="font-semibold">
                    {formatPrice(subtotal)}₫
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span className="font-semibold text-green-600">Miễn phí</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-800 mb-6">
                <span>Tổng cộng</span>
                <span className="text-[#662d91]">{formatPrice(total)}₫</span>
              </div>

              {/* Info Box */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"
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
                  <div className="text-sm text-purple-900">
                    <p className="font-medium mb-1">Thông tin đơn hàng</p>
                    <p className="text-purple-700">
                      Đơn hàng sẽ được xác nhận và xử lý trong vòng 24h. Bạn sẽ
                      nhận được email xác nhận sau khi đơn hàng được tạo thành
                      công.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
