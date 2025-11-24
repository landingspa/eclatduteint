"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService, reportService } from "@/service";
import type {
  RevenueReport,
  RevenueReportQuery,
  DashboardStatistics,
  UsersReport,
  UsersReportQuery,
  ReferralsReport,
  ReferralsReportQuery,
  UserDetailReport,
} from "@/service/report.service";
import { getErrorMessage } from "@/service/helpers";
import DashboardTab from "./components/DashboardTab";
import RevenueTab from "./components/RevenueTab";
import UsersTab from "./components/UsersTab";
import ReferralsTab from "./components/ReferralsTab";

type ReportTab = "dashboard" | "revenue" | "users" | "referrals";

export default function ReportsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ReportTab>("dashboard");

  // Dashboard
  const [dashboardStats, setDashboardStats] =
    useState<DashboardStatistics | null>(null);

  // Revenue Report
  const [revenueReport, setRevenueReport] = useState<RevenueReport | null>(
    null
  );
  const [revenueFilters, setRevenueFilters] = useState<RevenueReportQuery>({});

  // Users Report
  const [usersReport, setUsersReport] = useState<UsersReport | null>(null);
  const [usersFilters, setUsersFilters] = useState<UsersReportQuery>({});

  // Referrals Report
  const [referralsReport, setReferralsReport] =
    useState<ReferralsReport | null>(null);
  const [referralsFilters, setReferralsFilters] =
    useState<ReferralsReportQuery>({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push("/admin/login");
      return;
    }

    const user = authService.getCurrentUser();
    if (!user || !["ADMIN", "EMS", "SUPER_ADMIN"].includes(user.role)) {
      router.push("/admin/login");
      return;
    }

    loadActiveTabData();
  }, [router, activeTab]);

  const loadActiveTabData = async () => {
    try {
      setLoading(true);
      setError("");

      switch (activeTab) {
        case "dashboard":
          await loadDashboard();
          break;
        case "revenue":
          await loadRevenueReport();
          break;
        case "users":
          await loadUsersReport();
          break;
        case "referrals":
          await loadReferralsReport();
          break;
      }
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const loadDashboard = async () => {
    const data = await reportService.getDashboardStatistics();
    setDashboardStats(data);
  };

  const loadRevenueReport = async () => {
    const data = await reportService.getRevenueReport(revenueFilters);
    setRevenueReport(data);
  };

  const loadUsersReport = async () => {
    const data = await reportService.getUsersReport(usersFilters);
    setUsersReport(data);
  };

  const loadReferralsReport = async () => {
    const data = await reportService.getReferralsReport(referralsFilters);
    setReferralsReport(data);
  };

  const navigateToUserDetail = (userId: string) => {
    router.push(`/admin/reports/user/${userId}`);
  };

  const handleDownloadRevenueCSV = () => {
    if (!revenueReport) return;
    const dateRange =
      revenueFilters.startDate && revenueFilters.endDate
        ? `${revenueFilters.startDate}_to_${revenueFilters.endDate}`
        : "all_time";
    reportService.downloadReportCSV(
      revenueReport,
      `revenue_report_${dateRange}.csv`
    );
  };

  if (
    loading &&
    !dashboardStats &&
    !revenueReport &&
    !usersReport &&
    !referralsReport
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải báo cáo...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Báo cáo & Thống kê</h1>
        <p className="text-gray-600 mt-2">
          Phân tích doanh số, người dùng và hệ thống giới thiệu
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "dashboard", label: "Tổng quan", icon: "📊" },
            { id: "revenue", label: "Doanh thu", icon: "💰" },
            { id: "users", label: "Người dùng", icon: "👥" },
            { id: "referrals", label: "Giới thiệu", icon: "🔗" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ReportTab)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                ${
                  activeTab === tab.id
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Dashboard Tab */}
      {activeTab === "dashboard" && dashboardStats && (
        <DashboardTab stats={dashboardStats} />
      )}

      {/* Revenue Tab */}
      {activeTab === "revenue" && (
        <RevenueTab
          report={revenueReport}
          filters={revenueFilters}
          onFiltersChange={setRevenueFilters}
          onApplyFilters={loadRevenueReport}
          onClearFilters={() => {
            setRevenueFilters({});
            setTimeout(loadRevenueReport, 100);
          }}
          onDownloadCSV={handleDownloadRevenueCSV}
        />
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <UsersTab
          report={usersReport}
          filters={usersFilters}
          onFiltersChange={setUsersFilters}
          onApplyFilters={loadUsersReport}
          onClearFilters={() => {
            setUsersFilters({});
            setTimeout(loadUsersReport, 100);
          }}
          onViewUserDetail={navigateToUserDetail}
        />
      )}

      {/* Referrals Tab */}
      {activeTab === "referrals" && (
        <ReferralsTab
          report={referralsReport}
          filters={referralsFilters}
          onFiltersChange={setReferralsFilters}
          onApplyFilters={loadReferralsReport}
          onClearFilters={() => {
            setReferralsFilters({});
            setTimeout(loadReferralsReport, 100);
          }}
          onViewUserDetail={navigateToUserDetail}
        />
      )}
    </div>
  );
}
