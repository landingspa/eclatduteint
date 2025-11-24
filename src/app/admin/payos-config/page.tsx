"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  authService,
  payosConfigService,
  PayOSConfig,
  CreatePayOSConfigDto,
  UpdatePayOSConfigDto,
} from "@/service";
import { formatDate } from "@/service/helpers";

export default function PayOSConfigPage() {
  const router = useRouter();
  const [configs, setConfigs] = useState<PayOSConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<PayOSConfig | null>(null);
  const [showApiKey, setShowApiKey] = useState<{ [key: string]: boolean }>({});
  const [showChecksumKey, setShowChecksumKey] = useState<{
    [key: string]: boolean;
  }>({});
  const [formData, setFormData] = useState<
    CreatePayOSConfigDto | UpdatePayOSConfigDto
  >({
    clientId: "",
    apiKey: "",
    checksumKey: "",
    isActive: false,
    description: "",
  });
  const [error, setError] = useState("");

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

    fetchConfigs();
  }, [router]);

  const fetchConfigs = async () => {
    try {
      setLoading(true);
      const data = await payosConfigService.getAll();
      setConfigs(data);
      setError("");
    } catch (error) {
      console.error("Error fetching PayOS configs:", error);
      setError("Không thể tải danh sách cấu hình PayOS");
      if (error instanceof Error && error.message.includes("401")) {
        router.push("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingConfig) {
        await payosConfigService.update(editingConfig.id, formData);
      } else {
        await payosConfigService.create(formData as CreatePayOSConfigDto);
      }
      setIsModalOpen(false);
      setEditingConfig(null);
      resetForm();
      fetchConfigs();
    } catch (error) {
      console.error("Error saving config:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra khi lưu cấu hình"
      );
    }
  };

  const handleEdit = (config: PayOSConfig) => {
    setEditingConfig(config);
    setFormData({
      clientId: config.clientId,
      apiKey: config.apiKey,
      checksumKey: config.checksumKey,
      isActive: config.isActive,
      description: config.description || "",
    });
    setIsModalOpen(true);
  };

  const handleActivate = async (id: string) => {
    if (
      !confirm("Kích hoạt cấu hình này? Các cấu hình khác sẽ bị vô hiệu hóa.")
    ) {
      return;
    }

    try {
      await payosConfigService.activate(id);
      fetchConfigs();
    } catch (error) {
      console.error("Error activating config:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra khi kích hoạt cấu hình"
      );
    }
  };

  const handleDelete = async (id: string, config: PayOSConfig) => {
    if (config.isActive) {
      alert("Không thể xóa cấu hình đang hoạt động!");
      return;
    }

    if (!confirm("Bạn có chắc muốn xóa cấu hình này?")) {
      return;
    }

    try {
      await payosConfigService.deleteConfig(id);
      fetchConfigs();
    } catch (error) {
      console.error("Error deleting config:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra khi xóa cấu hình"
      );
    }
  };

  const resetForm = () => {
    setFormData({
      clientId: "",
      apiKey: "",
      checksumKey: "",
      isActive: false,
      description: "",
    });
    setEditingConfig(null);
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const toggleApiKeyVisibility = (id: string) => {
    setShowApiKey((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleChecksumKeyVisibility = (id: string) => {
    setShowChecksumKey((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const maskValue = (value: string): string => {
    if (!value || value.length < 8) return "****";
    return value.slice(0, 4) + "****" + value.slice(-4);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            PayOS Configuration
          </h1>
          <p className="text-gray-600 mt-2">
            Quản lý cấu hình PayOS (Chỉ SUPER_ADMIN)
          </p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Thêm cấu hình mới
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Info Box */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
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
            <p className="font-semibold mb-1">Lưu ý quan trọng:</p>
            <ul className="space-y-1 text-blue-800">
              <li>• Chỉ có một cấu hình có thể active tại một thời điểm</li>
              <li>
                • Khi kích hoạt cấu hình mới, tất cả cấu hình khác sẽ tự động bị
                vô hiệu hóa
              </li>
              <li>• Không thể xóa cấu hình đang active</li>
              <li>• Credentials được lưu trong database, không dùng .env</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Configs List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  API Key
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Checksum Key
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {configs.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Chưa có cấu hình PayOS nào
                  </td>
                </tr>
              ) : (
                configs.map((config) => (
                  <tr key={config.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {config.isActive ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {config.clientId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">
                          {showApiKey[config.id]
                            ? config.apiKey
                            : maskValue(config.apiKey)}
                        </span>
                        <button
                          onClick={() => toggleApiKeyVisibility(config.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {showApiKey[config.id] ? (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">
                          {showChecksumKey[config.id]
                            ? config.checksumKey
                            : maskValue(config.checksumKey)}
                        </span>
                        <button
                          onClick={() => toggleChecksumKeyVisibility(config.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {showChecksumKey[config.id] ? (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {config.description || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(config.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {!config.isActive && (
                          <button
                            onClick={() => handleActivate(config.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Kích hoạt"
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(config)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Chỉnh sửa"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        {!config.isActive && (
                          <button
                            onClick={() => handleDelete(config.id, config)}
                            className="text-red-600 hover:text-red-900"
                            title="Xóa"
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
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {editingConfig ? "Chỉnh sửa cấu hình" : "Thêm cấu hình mới"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.clientId}
                    onChange={(e) =>
                      setFormData({ ...formData, clientId: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent font-mono text-sm"
                    placeholder="your-client-id"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.apiKey}
                    onChange={(e) =>
                      setFormData({ ...formData, apiKey: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent font-mono text-sm"
                    placeholder="your-api-key"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Checksum Key <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.checksumKey}
                    onChange={(e) =>
                      setFormData({ ...formData, checksumKey: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent font-mono text-sm"
                    placeholder="your-checksum-key"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Production PayOS config"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-600"
                  />
                  <label
                    htmlFor="isActive"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Kích hoạt cấu hình này (các cấu hình khác sẽ bị vô hiệu hóa)
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    {editingConfig ? "Cập nhật" : "Tạo mới"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingConfig(null);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
