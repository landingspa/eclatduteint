"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  authService,
  discountTierService,
  DiscountTier,
  DiscountTierType,
  CreateDiscountTierDto,
} from "@/service";

export default function DiscountTiersPage() {
  const router = useRouter();
  const [tiers, setTiers] = useState<DiscountTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTier, setEditingTier] = useState<DiscountTier | null>(null);
  const [formData, setFormData] = useState({
    tier: "VIP" as DiscountTierType,
    discountPercent: 45,
    maintenanceMonths: 6,
    minOrderAmount: 200000000,
    description: "",
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

    fetchTiers();
  }, [router]);

  const fetchTiers = async () => {
    try {
      const data = await discountTierService.getAll();
      setTiers(data);
    } catch (error) {
      console.error("Error fetching tiers:", error);
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
      if (editingTier) {
        await discountTierService.update(editingTier.tier, formData);
      } else {
        await discountTierService.create(formData as CreateDiscountTierDto);
      }

      fetchTiers();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving tier:", error);
      alert(error instanceof Error ? error.message : "Không thể lưu cấu hình");
    }
  };

  const handleDelete = async (tier: DiscountTierType) => {
    if (!confirm(`Bạn có chắc muốn xóa cấu hình ${tier}?`)) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await discountTierService.remove(tier);
      fetchTiers();
    } catch (error) {
      console.error("Error deleting tier:", error);
      alert(error instanceof Error ? error.message : "Không thể xóa");
    }
  };

  const openEditModal = (tier: DiscountTier) => {
    setEditingTier(tier);
    setFormData({
      tier: tier.tier,
      discountPercent: tier.discountPercent,
      maintenanceMonths: tier.maintenanceMonths,
      minOrderAmount: tier.minOrderAmount,
      description: tier.description,
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingTier(null);
    setFormData({
      tier: "VIP" as DiscountTierType,
      discountPercent: 45,
      maintenanceMonths: 6,
      minOrderAmount: 200000000,
      description: "",
    });
  };

  const formatCurrency = (amount: number) => {
    return discountTierService.formatCurrency(amount);
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
            Quản lý Cấp độ Chiết khấu
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

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="p-4 text-left font-semibold text-gray-700">
                  Cấp độ
                </th>
                <th className="p-4 text-left font-semibold text-gray-700">
                  Chiết khấu
                </th>
                <th className="p-4 text-left font-semibold text-gray-700">
                  Duy trì
                </th>
                <th className="p-4 text-left font-semibold text-gray-700">
                  Đơn tối thiểu
                </th>
                <th className="p-4 text-left font-semibold text-gray-700">
                  Mô tả
                </th>
                <th className="p-4 text-center font-semibold text-gray-700">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier) => (
                <tr
                  key={tier.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                      {tier.tier}
                    </span>
                  </td>
                  <td className="p-4 text-lg font-semibold text-green-600">
                    {tier.discountPercent}%
                  </td>
                  <td className="p-4">{tier.maintenanceMonths} tháng</td>
                  <td className="p-4 font-medium">
                    {formatCurrency(tier.minOrderAmount)}
                  </td>
                  <td className="p-4 text-gray-600">{tier.description}</td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => openEditModal(tier)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded transition"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(tier.tier)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {tiers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Chưa có cấu hình nào. Nhấn "Thêm cấu hình mới" để bắt đầu.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">
              {editingTier ? "Chỉnh sửa cấu hình" : "Thêm cấu hình mới"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Cấp độ
                </label>
                <select
                  value={formData.tier}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tier: e.target.value as any,
                    })
                  }
                  disabled={!!editingTier}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="VIP">VIP</option>
                  <option value="MENTOR">MENTOR</option>
                  <option value="MENTEE">MENTEE</option>
                  <option value="LOYALTY">LOYALTY</option>
                  <option value="NONE">NONE</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Chiết khấu (%)
                </label>
                <input
                  type="number"
                  value={formData.discountPercent}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discountPercent: Number(e.target.value),
                    })
                  }
                  min="0"
                  max="100"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Duy trì (tháng)
                </label>
                <input
                  type="number"
                  value={formData.maintenanceMonths}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maintenanceMonths: Number(e.target.value),
                    })
                  }
                  min="1"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Đơn tối thiểu (VNĐ)
                </label>
                <input
                  type="number"
                  value={formData.minOrderAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      minOrderAmount: Number(e.target.value),
                    })
                  }
                  min="0"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
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
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition"
                >
                  {editingTier ? "Cập nhật" : "Tạo mới"}
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
