import { BaseService } from "./base.service";

export type DiscountTierType = "VIP" | "MENTOR" | "MENTEE" | "LOYALTY" | "NONE";

export interface DiscountTier {
  id: string;
  tier: DiscountTierType;
  discountPercent: number;
  maintenanceMonths: number;
  minOrderAmount: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDiscountTierDto {
  tier: DiscountTierType;
  discountPercent: number;
  maintenanceMonths: number;
  minOrderAmount: number;
  description?: string;
}

export interface UpdateDiscountTierDto {
  discountPercent?: number;
  maintenanceMonths?: number;
  minOrderAmount?: number;
  description?: string;
}

export class DiscountTierService extends BaseService {
  private readonly endpoint = "/discount-tiers";

  constructor() {
    super(
      process.env.NEXT_PUBLIC_API_URL || "https://server.eclatduteint.store/api"
    );
  }

  /**
   * Get all discount tier configurations
   */
  async getAll(): Promise<DiscountTier[]> {
    return this.get<DiscountTier[]>(this.endpoint);
  }

  /**
   * Get discount tier by type
   */
  async getByTier(tier: DiscountTierType): Promise<DiscountTier> {
    return this.get<DiscountTier>(`${this.endpoint}/${tier}`);
  }

  /**
   * Create new discount tier configuration
   */
  async create(data: CreateDiscountTierDto): Promise<DiscountTier> {
    return this.post<DiscountTier>(this.endpoint, data);
  }

  /**
   * Update discount tier configuration
   */
  async update(
    tier: DiscountTierType,
    data: UpdateDiscountTierDto
  ): Promise<DiscountTier> {
    return this.patch<DiscountTier>(`${this.endpoint}/${tier}`, data);
  }

  /**
   * Delete discount tier configuration
   */
  async remove(tier: DiscountTierType): Promise<void> {
    return this.delete(`${this.endpoint}/${tier}`);
  }

  /**
   * Get tier label in Vietnamese
   */
  getTierLabel(tier: DiscountTierType): string {
    const labels: Record<DiscountTierType, string> = {
      VIP: "VIP Master",
      MENTOR: "Mentor",
      MENTEE: "Mentee",
      LOYALTY: "Loyalty",
      NONE: "Không có",
    };
    return labels[tier] || tier;
  }

  /**
   * Format currency to VND
   */
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }

  /**
   * Validate discount percent (0-100)
   */
  validateDiscountPercent(percent: number): boolean {
    return percent >= 0 && percent <= 100;
  }
}

// Export singleton instance
export const discountTierService = new DiscountTierService();
