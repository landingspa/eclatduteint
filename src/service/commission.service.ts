import { BaseService } from "./base.service";

export type CommissionOption = "FAST_GROWTH" | "BALANCED" | "MAX_PROFIT";

export interface Commission {
  id: string;
  option: CommissionOption;
  companyPercent: number;
  vipPercent: number;
  mentorPercent: number;
  menteePercent: number;
  loyaltyPercent: number;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommissionDto {
  option: CommissionOption;
  companyPercent: number;
  vipPercent: number;
  mentorPercent: number;
  menteePercent: number;
  loyaltyPercent: number;
  description?: string;
  isActive?: boolean;
}

export interface UpdateCommissionDto {
  companyPercent?: number;
  vipPercent?: number;
  mentorPercent?: number;
  menteePercent?: number;
  loyaltyPercent?: number;
  description?: string;
  isActive?: boolean;
}

export class CommissionService extends BaseService {
  private readonly endpoint = "/commissions";

  constructor() {
    super(
      process.env.NEXT_PUBLIC_API_URL || "https://server.eclatduteint.store/api"
    );
  }

  /**
   * Get all commission configurations
   */
  async getAll(): Promise<Commission[]> {
    return this.get<Commission[]>(this.endpoint);
  }

  /**
   * Get active commission configuration
   */
  async getActive(): Promise<Commission | null> {
    return this.get<Commission | null>(`${this.endpoint}/active`);
  }

  /**
   * Get commission by option
   */
  async getByOption(option: CommissionOption): Promise<Commission> {
    return this.get<Commission>(`${this.endpoint}/${option}`);
  }

  /**
   * Create new commission configuration
   */
  async create(data: CreateCommissionDto): Promise<Commission> {
    return this.post<Commission>(this.endpoint, data);
  }

  /**
   * Update commission configuration
   */
  async update(
    option: CommissionOption,
    data: UpdateCommissionDto
  ): Promise<Commission> {
    return this.patch<Commission>(`${this.endpoint}/${option}`, data);
  }

  /**
   * Delete commission configuration
   */
  async remove(option: CommissionOption): Promise<void> {
    return this.delete(`${this.endpoint}/${option}`);
  }

  /**
   * Activate a commission configuration
   */
  async activate(option: CommissionOption): Promise<Commission> {
    return this.post<Commission>(`${this.endpoint}/${option}/activate`);
  }

  /**
   * Validate if total percentage equals 50%
   */
  validateTotalPercent(
    data: CreateCommissionDto | UpdateCommissionDto
  ): boolean {
    const total =
      (data.companyPercent || 0) +
      (data.vipPercent || 0) +
      (data.mentorPercent || 0) +
      (data.menteePercent || 0) +
      (data.loyaltyPercent || 0);
    return total === 50;
  }

  /**
   * Get option label in Vietnamese
   */
  getOptionLabel(option: CommissionOption): string {
    const labels: Record<CommissionOption, string> = {
      FAST_GROWTH: "Tăng trưởng nhanh (Năm 1)",
      BALANCED: "Cân bằng - Ổn định (Năm 2)",
      MAX_PROFIT: "Tối đa lợi nhuận (Năm 3)",
    };
    return labels[option] || option;
  }
}

// Export singleton instance
export const commissionService = new CommissionService();
