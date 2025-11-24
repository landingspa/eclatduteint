import { BaseService } from "./base.service";

export interface PayOSConfig {
  id: string;
  clientId: string;
  apiKey: string;
  checksumKey: string;
  isActive: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePayOSConfigDto {
  clientId: string;
  apiKey: string;
  checksumKey: string;
  isActive?: boolean;
  description?: string;
}

export interface UpdatePayOSConfigDto {
  clientId?: string;
  apiKey?: string;
  checksumKey?: string;
  isActive?: boolean;
  description?: string;
}

/**
 * PayOS Configuration Service
 */
export class PayOSConfigService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Get all PayOS configurations
   * GET /payos-config
   */
  async getAll(): Promise<PayOSConfig[]> {
    return this.get<PayOSConfig[]>("/payos-config");
  }

  /**
   * Get active PayOS configuration
   * GET /payos-config/active
   */
  async getActive(): Promise<PayOSConfig> {
    return this.get<PayOSConfig>("/payos-config/active");
  }

  /**
   * Get PayOS configuration by ID
   * GET /payos-config/:id
   */
  async getById(id: string): Promise<PayOSConfig> {
    return this.get<PayOSConfig>(`/payos-config/${id}`);
  }

  /**
   * Create new PayOS configuration
   * POST /payos-config
   */
  async create(data: CreatePayOSConfigDto): Promise<PayOSConfig> {
    return this.post<PayOSConfig>("/payos-config", data);
  }

  /**
   * Update PayOS configuration
   * PATCH /payos-config/:id
   */
  async update(id: string, data: UpdatePayOSConfigDto): Promise<PayOSConfig> {
    return this.patch<PayOSConfig>(`/payos-config/${id}`, data);
  }

  /**
   * Activate PayOS configuration
   * PATCH /payos-config/:id/activate
   */
  async activate(id: string): Promise<PayOSConfig> {
    return this.patch<PayOSConfig>(`/payos-config/${id}/activate`, {});
  }

  /**
   * Delete PayOS configuration
   * DELETE /payos-config/:id
   */
  async deleteConfig(id: string): Promise<{ message: string }> {
    return this.delete<{ message: string }>(`/payos-config/${id}`);
  }

  /**
   * Mask sensitive data for display
   */
  maskSensitiveData(value: string): string {
    if (!value || value.length < 8) return "****";
    return value.slice(0, 4) + "****" + value.slice(-4);
  }
}

// Export singleton instance
export const payosConfigService = new PayOSConfigService();
