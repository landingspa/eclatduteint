import { BaseService } from "./base.service";

export interface RevenueByRegion {
  [region: string]: {
    count: number;
    revenue: number;
  };
}

export interface RevenueByMentor {
  [mentorId: string]: {
    count: number;
    revenue: number;
  };
}

export interface RevenueByDate {
  [date: string]: {
    count: number;
    revenue: number;
  };
}

export interface OrderSummary {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  totalAmount: number;
  region?: string;
  mentorId?: string;
  createdAt: string;
  itemsCount: number;
}

export interface RevenueReport {
  summary: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
  };
  byRegion: RevenueByRegion;
  byMentor: RevenueByMentor;
  byDate: RevenueByDate;
  orders: OrderSummary[];
}

export interface DashboardStatistics {
  totalUsers: number;
  totalOrders: number;
  paidOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}

export interface RevenueReportQuery {
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  region?: string;
  mentorId?: string;
}

// Users Report Interfaces
export interface UserStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  referralsCount: number;
  referralRevenue: number;
  totalReferralOrders: number;
}

export interface ReferralUser {
  id: string;
  email: string;
  name: string;
  joinedAt: string;
}

export interface UserReportItem {
  id: string;
  email: string;
  name: string;
  role: string;
  discountTier: string;
  region?: string;
  referralCode: string;
  referredByCode?: string;
  createdAt: string;
  stats: UserStats;
  referrals: ReferralUser[];
}

export interface UsersReport {
  summary: {
    totalRevenue: number;
    totalOrders: number;
    totalReferrals: number;
    totalReferralRevenue: number;
  };
  totalUsers: number;
  users: UserReportItem[];
}

export interface UsersReportQuery {
  startDate?: string;
  endDate?: string;
  discountTier?: string;
  role?: string;
}

// User Detail Report Interfaces
export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface UserDetailOrder {
  id: string;
  totalAmount: number;
  status: string;
  itemsCount: number;
  items?: OrderItem[];
  createdAt: string;
}

// F2 Referral (Sub-referral)
export interface F2Referral {
  id: string;
  email: string;
  name: string;
  role: string;
  discountTier: string;
  createdAt: string;
  totalOrders: number;
  totalRevenue: number;
}

// F1 Referral (Direct referral with detailed info)
export interface F1Referral {
  id: string;
  email: string;
  name: string;
  role: string;
  discountTier: string;
  tierStartDate?: string;
  region?: string;
  mentorId?: string;
  referralCode: string;
  joinedAt: string;
  updatedAt: string;
  stats: {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    f2ReferralsCount: number;
    f2TotalRevenue: number;
    f2TotalOrders: number;
  };
  orders: UserDetailOrder[];
  subReferrals: F2Referral[];
}

export interface UserDetailReferral {
  id: string;
  email: string;
  name: string;
  role: string;
  discountTier: string;
  createdAt: string;
  totalOrders: number;
  totalRevenue: number;
}

export interface UserDetailStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  f1Count: number;
  f1TotalOrders: number;
  f1TotalRevenue: number;
  f1AverageRevenuePerReferral: number;
  f2Count: number;
  f2TotalRevenue: number;
  totalNetworkRevenue: number;
  totalNetworkSize: number;
}

export interface UserDetailReport {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    discountTier: string;
    tierStartDate?: string;
    region?: string;
    mentorId?: string;
    referralCode: string;
    referredByCode?: string;
    createdAt: string;
    referrer?: {
      id: string;
      email: string;
      name: string;
    };
  };
  stats: UserDetailStats;
  orders: UserDetailOrder[];
  referrals: UserDetailReferral[];
  f1Referrals: F1Referral[];
}

export interface UserDetailReportQuery {
  startDate?: string;
  endDate?: string;
}

// Referrals Report Interfaces
export interface TopReferrer {
  userId: string;
  email: string;
  name: string;
  role: string;
  referralCode: string;
  referralsCount: number;
}

export interface ReferralsReport {
  summary: {
    totalUsers: number;
    totalReferrals: number;
    averageReferralsPerUser: number;
    usersWithReferrals: number;
  };
  topReferrers: TopReferrer[];
  allUsers: TopReferrer[];
}

export interface ReferralsReportQuery {
  discountTier?: string;
  role?: string;
}

/**
 * Report Service (Admin only)
 */
export class ReportService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Get revenue report with filters
   * GET /reports/revenue
   */
  async getRevenueReport(query?: RevenueReportQuery): Promise<RevenueReport> {
    const params = new URLSearchParams();

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }

    const queryString = params.toString();
    const url = queryString
      ? `/reports/revenue?${queryString}`
      : "/reports/revenue";

    return this.get<RevenueReport>(url);
  }

  /**
   * Get dashboard statistics
   * GET /reports/dashboard
   */
  async getDashboardStatistics(): Promise<DashboardStatistics> {
    return this.get<DashboardStatistics>("/reports/dashboard");
  }

  /**
   * Get users report with filters
   * GET /reports/users
   */
  async getUsersReport(query?: UsersReportQuery): Promise<UsersReport> {
    const params = new URLSearchParams();

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }

    const queryString = params.toString();
    const url = queryString
      ? `/reports/users?${queryString}`
      : "/reports/users";

    return this.get<UsersReport>(url);
  }

  /**
   * Get user detail report
   * GET /reports/users/:userId
   */
  async getUserDetailReport(
    userId: string,
    query?: UserDetailReportQuery
  ): Promise<UserDetailReport> {
    const params = new URLSearchParams();

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }

    const queryString = params.toString();
    const url = queryString
      ? `/reports/users/${userId}?${queryString}`
      : `/reports/users/${userId}`;

    return this.get<UserDetailReport>(url);
  }

  /**
   * Get referrals report
   * GET /reports/referrals
   */
  async getReferralsReport(
    query?: ReferralsReportQuery
  ): Promise<ReferralsReport> {
    const params = new URLSearchParams();

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }

    const queryString = params.toString();
    const url = queryString
      ? `/reports/referrals?${queryString}`
      : "/reports/referrals";

    return this.get<ReferralsReport>(url);
  }

  /**
   * Export revenue report to CSV format
   */
  exportReportToCSV(report: RevenueReport): string {
    const lines: string[] = [];

    // Header
    lines.push("Date,User Email,User Name,Amount,Region,Mentor ID,Items Count");

    // Data rows
    report.orders.forEach((order) => {
      lines.push(
        [
          order.createdAt,
          order.userEmail,
          order.userName,
          order.totalAmount,
          order.region || "",
          order.mentorId || "",
          order.itemsCount,
        ].join(",")
      );
    });

    return lines.join("\n");
  }

  /**
   * Download report as CSV file
   */
  downloadReportCSV(
    report: RevenueReport,
    filename: string = "report.csv"
  ): void {
    if (typeof window === "undefined") return;

    const csv = this.exportReportToCSV(report);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  /**
   * Format date range for display
   */
  formatDateRange(startDate?: string, endDate?: string): string {
    if (!startDate && !endDate) {
      return "All time";
    }

    if (startDate && endDate) {
      return `${startDate} to ${endDate}`;
    }

    if (startDate) {
      return `From ${startDate}`;
    }

    return `Until ${endDate}`;
  }

  /**
   * Calculate growth percentage
   */
  calculateGrowth(current: number, previous: number): number {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  }
}

// Export singleton instance
export const reportService = new ReportService();
