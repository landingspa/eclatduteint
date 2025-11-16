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
