"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InterestModal({ isOpen, onClose }: InterestModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneZalo: "",
    email: "",
    spaClinicName: "",
    address: "",
    role: [] as string[],
    expectations: [] as string[],
    confirmMethod: [] as string[],
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleCheckboxChange = (
    field: "role" | "expectations" | "confirmMethod",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/submit-interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Đăng ký thành công! Cảm ơn bạn đã quan tâm.",
        });
        setTimeout(() => {
          onClose();
          // Reset form
          setFormData({
            fullName: "",
            phoneZalo: "",
            email: "",
            spaClinicName: "",
            address: "",
            role: [],
            expectations: [],
            confirmMethod: [],
            notes: "",
          });
          setSubmitStatus({ type: null, message: "" });
        }, 2000);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Có lỗi xảy ra. Vui lòng thử lại.",
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus({
        type: "error",
        message: "Không thể kết nối. Vui lòng thử lại sau.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all max-h-[90vh] flex flex-col">
                {/* Header - Fixed */}
                <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200 bg-linear-to-r from-purple-50 to-pink-50">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold text-gray-900"
                  >
                    Đăng Ký Quan Tâm
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                {/* Form Content - Scrollable */}
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col flex-1 overflow-hidden"
                >
                  <div className="overflow-y-auto px-5 py-4 space-y-4">
                    {/* Row 1: Họ và tên + Số điện thoại */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fullName: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Nhập họ và tên"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Số điện thoại / Zalo{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phoneZalo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phoneZalo: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email + Tên spa */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-3 py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Tên spa / phòng khám{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.spaClinicName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              spaClinicName: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Nhập tên spa/phòng khám"
                        />
                      </div>
                    </div>

                    {/* Row 3: Địa chỉ - Full width */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Địa chỉ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="w-full px-3 py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Nhập địa chỉ đầy đủ"
                      />
                    </div>

                    {/* Row 4: Vai trò + Mong muốn */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Vai trò <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {["Bác sĩ", "Chủ Spa", "Kỹ thuật viên", "Khác"].map(
                            (role) => (
                              <label
                                key={role}
                                className="flex items-center cursor-pointer group"
                              >
                                <input
                                  type="checkbox"
                                  checked={formData.role.includes(role)}
                                  onChange={() =>
                                    handleCheckboxChange("role", role)
                                  }
                                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                                />
                                <span className="ml-2 text-sm text-gray-700 group-hover:text-purple-600 transition-colors">
                                  {role}
                                </span>
                              </label>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Mong muốn khi tham dự{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-1.5">
                          {[
                            "Học hỏi kỹ thuật mới",
                            "Kết nối thương hiệu",
                            "Trở thành Mentor",
                            "Khác",
                          ].map((expectation) => (
                            <label
                              key={expectation}
                              className="flex items-center cursor-pointer group"
                            >
                              <input
                                type="checkbox"
                                checked={formData.expectations.includes(
                                  expectation
                                )}
                                onChange={() =>
                                  handleCheckboxChange(
                                    "expectations",
                                    expectation
                                  )
                                }
                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                              />
                              <span className="ml-2 text-sm text-gray-700 group-hover:text-purple-600 transition-colors">
                                {expectation}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Row 5: Hình thức xác nhận */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Hình thức xác nhận{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-6">
                        {["Zalo", "Email"].map((method) => (
                          <label
                            key={method}
                            className="flex items-center cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={formData.confirmMethod.includes(method)}
                              onChange={() =>
                                handleCheckboxChange("confirmMethod", method)
                              }
                              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                            />
                            <span className="ml-2 text-sm text-gray-700 group-hover:text-purple-600 transition-colors">
                              {method}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Row 6: Ghi chú */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Ghi chú khác
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        rows={2}
                        className="w-full px-3 py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        placeholder="Nhập ghi chú nếu có..."
                      />
                    </div>

                    {/* Status Message */}
                    {submitStatus.type && (
                      <div
                        className={`p-3 rounded-lg text-sm font-medium ${
                          submitStatus.type === "success"
                            ? "bg-green-50 text-green-800 border border-green-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                        }`}
                      >
                        {submitStatus.message}
                      </div>
                    )}
                  </div>

                  {/* Footer - Fixed */}
                  <div className="flex justify-end gap-3 px-5 py-4 border-t border-gray-200 bg-gray-50">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-white transition-colors font-medium"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 text-sm bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm hover:shadow-md"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Đang gửi...
                        </span>
                      ) : (
                        "Đăng ký"
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
