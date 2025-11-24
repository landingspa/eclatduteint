"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  authService,
  commissionService,
  Commission,
  CommissionOption,
  CreateCommissionDto,
} from "@/service";

export default function CommissionsPage() {
  const router = useRouter();
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCommission, setEditingCommission] = useState<Commission | null>(
    null
  );
  const [formData, setFormData] = useState({
    option: "FAST_GROWTH" as CommissionOption,
    companyPercent: 12,
    vipPercent: 20,
    mentorPercent: 10,
    menteePercent: 6,
    loyaltyPercent: 2,
    description: "",
    isActive: false,
  });

  useEffect(() => {
    // Check authentication and role
    if (!authService.isAuthenticated()) {
      router.push("/admin/login");
      return;
    }

    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== "SUPER_ADMIN") {
      alert(
        "Bạn không có quyền truy cập trang này. Chỉ SUPER_ADMIN mới được phép."
      );
      router.push("/admin");
      return;
    }

    fetchCommissions();
  }, [router]);

  const fetchCommissions = async () => {
    try {
      const data = await commissionService.getAll();
      setCommissions(data);
    } catch (error) {
      console.error("Error fetching commissions:", error);
      if (error instanceof Error && error.message.includes("401")) {
        router.push("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      if (editingCommission) {
        // Không gửi option trong body khi update
        const { option, ...updateData } = formData;
        await commissionService.update(editingCommission.option, updateData);
      } else {
        await commissionService.create(formData as CreateCommissionDto);
      }

      fetchCommissions();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving commission:", error);
      alert(error instanceof Error ? error.message : "Không thể lưu cấu hình");
    }
  };

  const handleActivate = async (option: CommissionOption) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await commissionService.activate(option);
      fetchCommissions();
    } catch (error) {
      console.error("Error activating commission:", error);
      alert(error instanceof Error ? error.message : "Không thể kích hoạt");
    }
  };

  const handleDelete = async (option: CommissionOption) => {
    if (!confirm(`Bạn có chắc muốn xóa cấu hình ${option}?`)) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await commissionService.remove(option);
      fetchCommissions();
    } catch (error) {
      console.error("Error deleting commission:", error);
      alert(error instanceof Error ? error.message : "Không thể xóa");
    }
  };

  const openEditModal = (commission: Commission) => {
    setEditingCommission(commission);
    setFormData({
      option: commission.option,
      companyPercent: commission.companyPercent,
      vipPercent: commission.vipPercent,
      mentorPercent: commission.mentorPercent,
      menteePercent: commission.menteePercent,
      loyaltyPercent: commission.loyaltyPercent,
      description: commission.description,
      isActive: commission.isActive,
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingCommission(null);
    setFormData({
      option: "FAST_GROWTH" as CommissionOption,
      companyPercent: 12,
      vipPercent: 20,
      mentorPercent: 10,
      menteePercent: 6,
      loyaltyPercent: 2,
      description: "",
      isActive: false,
    });
  };

  const getTotalPercent = () => {
    return (
      formData.companyPercent +
      formData.vipPercent +
      formData.mentorPercent +
      formData.menteePercent +
      formData.loyaltyPercent
    );
  };

  const getOptionLabel = (option: CommissionOption) => {
    return commissionService.getOptionLabel(option);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Quản lý Cấu hình Hoa hồng
          </h1>
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            + Thêm cấu hình mới
          </button>
        </div>

        <div className="grid gap-6">
          {commissions.map((commission) => (
            <div
              key={commission.id}
              className={`border-2 rounded-lg p-6 ${
                commission.isActive
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {getOptionLabel(commission.option)}
                  </h3>
                  <p className="text-gray-600">{commission.description}</p>
                </div>
                {commission.isActive && (
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    ĐANG ACTIVE
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Công ty</div>
                  <div className="text-2xl font-bold text-blue-700">
                    {commission.companyPercent}%
                  </div>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">VIP Master</div>
                  <div className="text-2xl font-bold text-purple-700">
                    {commission.vipPercent}%
                  </div>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Mentor</div>
                  <div className="text-2xl font-bold text-yellow-700">
                    {commission.mentorPercent}%
                  </div>
                </div>
                <div className="bg-orange-100 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Mentee</div>
                  <div className="text-2xl font-bold text-orange-700">
                    {commission.menteePercent}%
                  </div>
                </div>
                <div className="bg-pink-100 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Loyalty</div>
                  <div className="text-2xl font-bold text-pink-700">
                    {commission.loyaltyPercent}%
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                {!commission.isActive && (
                  <button
                    onClick={() => handleActivate(commission.option)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                  >
                    Kích hoạt
                  </button>
                )}
                <button
                  onClick={() => openEditModal(commission)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(commission.option)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        {commissions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Chưa có cấu hình nào. Nhấn "Thêm cấu hình mới" để bắt đầu.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 my-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingCommission ? "Chỉnh sửa cấu hình" : "Thêm cấu hình mới"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Option
                </label>
                <select
                  value={formData.option}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      option: e.target.value as any,
                    })
                  }
                  disabled={!!editingCommission}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="FAST_GROWTH">Tăng trưởng nhanh (Năm 1)</option>
                  <option value="BALANCED">Cân bằng - Ổn định (Năm 2)</option>
                  <option value="MAX_PROFIT">Tối đa lợi nhuận (Năm 3)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Công ty (%)
                  </label>
                  <input
                    type="number"
                    value={formData.companyPercent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyPercent: Number(e.target.value),
                      })
                    }
                    min="0"
                    max="100"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    VIP Master (%)
                  </label>
                  <input
                    type="number"
                    value={formData.vipPercent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        vipPercent: Number(e.target.value),
                      })
                    }
                    min="0"
                    max="100"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Mentor (%)
                  </label>
                  <input
                    type="number"
                    value={formData.mentorPercent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mentorPercent: Number(e.target.value),
                      })
                    }
                    min="0"
                    max="100"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Mentee (%)
                  </label>
                  <input
                    type="number"
                    value={formData.menteePercent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        menteePercent: Number(e.target.value),
                      })
                    }
                    min="0"
                    max="100"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Loyalty (%)
                  </label>
                  <input
                    type="number"
                    value={formData.loyaltyPercent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        loyaltyPercent: Number(e.target.value),
                      })
                    }
                    min="0"
                    max="100"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div className="mb-4 p-4 bg-gray-100 rounded">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Tổng phần trăm:</span>
                  <span
                    className={`text-xl font-bold ${
                      getTotalPercent() === 50
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {getTotalPercent()}%
                  </span>
                </div>
                {getTotalPercent() !== 50 && (
                  <div className="text-red-600 text-sm mt-2">
                    ⚠️ Tổng phải bằng 50%
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={getTotalPercent() !== 50}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {editingCommission ? "Cập nhật" : "Tạo mới"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded font-medium transition"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
