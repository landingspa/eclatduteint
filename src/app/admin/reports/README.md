# Admin Reports Page - Tài liệu

## Tổng quan

Trang báo cáo admin đã được cập nhật hoàn toàn để hỗ trợ đầy đủ các API mới từ backend, bao gồm **hệ thống theo dõi mạng lưới giới thiệu 2 cấp (F1 & F2)**. Trang này cung cấp 4 tab chính để phân tích dữ liệu:

### 1. 📊 Dashboard (Tổng quan)

- Tổng số người dùng
- Tổng số đơn hàng
- Số đơn hàng đã thanh toán
- Tổng doanh thu
- Giá trị đơn hàng trung bình

**API:** `GET /reports/dashboard`

### 2. 💰 Revenue (Doanh thu)

Báo cáo doanh thu chi tiết với:

- Tổng doanh thu, số đơn hàng, giá trị trung bình
- Phân tích theo khu vực
- Danh sách chi tiết tất cả đơn hàng
- Export CSV

**Bộ lọc:**

- Ngày bắt đầu / Ngày kết thúc
- Khu vực
- Mã Mentor

**API:** `GET /reports/revenue`

### 3. 👥 Users (Người dùng)

Báo cáo chi tiết về người dùng với:

- Thống kê tổng hợp (tổng users, doanh thu, giới thiệu)
- Danh sách người dùng với metrics:
  - Số đơn hàng
  - Tổng doanh thu
  - Số người đã giới thiệu
  - Doanh thu từ người giới thiệu
- Chi tiết từng user (modal popup)

**Bộ lọc:**

- Ngày bắt đầu / Ngày kết thúc
- Discount Tier (VIP, MENTOR, MENTEE, LOYALTY, NONE)
- Role (ADMIN, MENTOR, CUSTOMER)

**API:**

- `GET /reports/users` - Danh sách
- `GET /reports/users/:userId` - Chi tiết user

### 4. 🔗 Referrals (Giới thiệu)

Báo cáo hệ thống giới thiệu:

- Thống kê tổng quan:
  - Tổng số người dùng
  - Tổng số giới thiệu
  - Trung bình giới thiệu/user
  - Số users có giới thiệu
- Top 10 người giới thiệu nhiều nhất
- Chi tiết từng user referrer

**Bộ lọc:**

- Discount Tier
- Role

**API:** `GET /reports/referrals`

---

## User Detail Modal - ⭐ Tính năng mới

Khi click "Chi tiết" ở bất kỳ user nào, hiển thị modal chi tiết với **hệ thống mạng lưới 2 cấp F1 & F2**:

### 📊 Thống kê cá nhân

- Tổng đơn hàng của user
- Tổng doanh thu của user
- Đơn hàng trung bình

### 👥 Mạng lưới F1 (Giới thiệu trực tiếp)

**F1 = Người được user này giới thiệu trực tiếp**

- **Số lượng F1**: Tổng số người được giới thiệu trực tiếp
- **Đơn hàng F1**: Tổng đơn hàng từ tất cả F1
- **Doanh thu F1**: Tổng doanh thu từ tất cả F1
- **Trung bình mỗi F1**: Doanh thu trung bình mỗi F1

### 🔗 Mạng lưới F2 (Giới thiệu gián tiếp)

**F2 = Người được F1 giới thiệu (con của F1)**

- **Số lượng F2**: Tổng số người được F1 giới thiệu
- **Doanh thu F2**: Tổng doanh thu từ tất cả F2
- **Tổng mạng lưới**: F1 + F2 (kích thước mạng lưới)
- **Doanh thu mạng lưới**: F1 + F2 (tổng doanh thu mạng lưới)

### 👥 Danh sách F1 chi tiết

Hiển thị từng F1 với:

1. **Thông tin cơ bản F1:**

   - Tên, email, referral code
   - Discount tier, role
   - Ngày tham gia

2. **Thống kê F1:**

   - Số đơn hàng của F1
   - Doanh thu của F1
   - Số F2 mà F1 này đã giới thiệu
   - Số đơn hàng từ F2 của F1 này
   - Doanh thu từ F2 của F1 này

3. **🔗 Danh sách F2 (sub-referrals):**

   - Hiển thị tất cả người mà F1 đã giới thiệu
   - Mỗi F2 hiển thị: tên, email, tier, số đơn, doanh thu
   - Layout dạng card với border đứt nét để phân biệt

4. **📦 Đơn hàng của F1:**
   - Collapsible section (click để xem)
   - Hiển thị tất cả đơn hàng
   - Mỗi đơn hàng có:
     - Trạng thái, ngày đặt, tổng tiền
     - Chi tiết items: tên sản phẩm, số lượng, giá

### 🛒 Đơn hàng của User

Hiển thị chi tiết tất cả đơn hàng với:

- Trạng thái (PAID/PENDING)
- Ngày đặt
- Số lượng sản phẩm
- Tổng tiền
- **Chi tiết items trong đơn:**
  - Tên sản phẩm
  - Số lượng
  - Đơn giá
  - Thành tiền

### Ví dụ cấu trúc mạng lưới:

```
User (John)
  ├─ F1 (Alice)
  │   ├─ F2 (Bob)
  │   └─ F2 (Charlie)
  └─ F1 (David)
      └─ F2 (Eve)

John có:
- 2 F1: Alice, David
- 3 F2: Bob, Charlie, Eve
- Tổng mạng lưới: 5 người
```

---

## Tính năng

### Navigation

- Tab switching mượt mà
- Mỗi tab load data riêng khi được chọn
- State được lưu giữ khi chuyển tab

### Filters

- Mỗi tab có bộ lọc riêng
- Button "Áp dụng" để load data mới
- Button "Xóa bộ lọc" để reset về mặc định

### Export

- Tab Revenue có nút "Xuất CSV"
- File CSV bao gồm tất cả đơn hàng với filter hiện tại
- Tên file tự động có date range

### Loading States

- Spinner khi lần đầu load trang
- Loading indicator trong modal chi tiết user
- Error messages rõ ràng

### Responsive

- Grid layout responsive
- Tables có horizontal scroll
- Modal responsive với max-height
- Cards F1/F2 responsive

### Visual Design

**Color Coding:**

- 💜 Purple/Indigo: Primary, User stats
- 💙 Blue/Cyan: F1 metrics
- 🧡 Amber/Orange: F2 metrics
- 💚 Green/Emerald: Revenue, Network total
- 🟡 Yellow: Warnings
- ❌ Red: Errors

**Card Styles:**

- F1 cards: Gradient blue-indigo background
- F2 cards: Dashed border indigo, light indigo background
- Stats cards: Gradient với border matching color
- Orders: Expandable with item details table

---

## Technical Details

### State Management

```typescript
// Tab hiện tại
const [activeTab, setActiveTab] = useState<ReportTab>("dashboard");

// Data cho mỗi tab
const [dashboardStats, setDashboardStats] =
  useState<DashboardStatistics | null>(null);
const [revenueReport, setRevenueReport] = useState<RevenueReport | null>(null);
const [usersReport, setUsersReport] = useState<UsersReport | null>(null);
const [referralsReport, setReferralsReport] = useState<ReferralsReport | null>(
  null
);

// Filters cho mỗi tab
const [revenueFilters, setRevenueFilters] = useState<RevenueReportQuery>({});
const [usersFilters, setUsersFilters] = useState<UsersReportQuery>({});
const [referralsFilters, setReferralsFilters] = useState<ReferralsReportQuery>(
  {}
);

// User detail modal
const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
const [userDetailReport, setUserDetailReport] =
  useState<UserDetailReport | null>(null);
```

### New Interfaces (F1 & F2 Support)

```typescript
// Order Items
export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

// F2 Referral (Sub-referral of F1)
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

// F1 Referral (Direct referral with full details)
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

// Updated Stats with F1/F2 breakdown
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
```

### API Calls

Tất cả sử dụng `reportService` từ `@/service`:

```typescript
// Dashboard
await reportService.getDashboardStatistics();

// Revenue
await reportService.getRevenueReport(filters);

// Users
await reportService.getUsersReport(filters);

// User Detail - với thông tin F1/F2
await reportService.getUserDetailReport(userId, filters);

// Referrals
await reportService.getReferralsReport(filters);
```

### Authentication

Yêu cầu user có role:

- `ADMIN`
- `EMS`
- `SUPER_ADMIN`

Nếu không, redirect về `/admin/login`

---

## Use Cases

### 1. Tính Hoa Hồng Theo Cấp

Sử dụng User Detail Modal để:

- Xem doanh thu trực tiếp của user
- Tính hoa hồng từ F1 (cấp 1)
- Tính hoa hồng từ F2 (cấp 2)
- Xem chi tiết từng F1 và F2 của họ

**Ví dụ:**

- User John giới thiệu Alice (F1)
- Alice giới thiệu Bob (F2)
- John nhận hoa hồng từ cả Alice và Bob
- Chi tiết: Alice mua 10tr, Bob mua 5tr
- Tổng mạng lưới John: 15tr

### 2. Phân Tích Hiệu Quả Referral

- Tab Referrals: Xem top performers
- User Detail: Xem ai có mạng lưới F2 lớn
- So sánh F1 count vs F2 count để đánh giá viral effect

### 3. Theo Dõi Đơn Hàng Chi Tiết

- Xem từng đơn hàng với chi tiết items
- Track sản phẩm nào bán chạy nhất
- Phân tích giá trị đơn hàng

### 4. Báo Cáo Cho Leader/Mentor

- Export CSV doanh thu
- Screenshot stats cards
- Chia sẻ thông tin mạng lưới

---

## Future Enhancements

1. **Pagination**: Thêm pagination cho danh sách lớn
2. **Charts**:
   - Network tree visualization (F1 → F2)
   - Revenue timeline charts
   - Growth charts
3. **Advanced Filters**:
   - Date range picker với presets
   - Multi-select cho tiers/roles
4. **Export Options**:
   - PDF reports với charts
   - Excel export với multiple sheets
   - Network diagram export
5. **Real-time Updates**: WebSocket cho live data
6. **Caching**: Cache data với refresh button
7. **Sorting & Search**:
   - Sort tables by columns
   - Search trong F1/F2 lists
8. **F3+ Support**: Mở rộng cho mạng lưới 3+ cấp
9. **Commission Calculator**: Tool tính hoa hồng tự động
10. **Notification**: Alert khi có F1/F2 mới hoặc đơn hàng mới

---

## Performance Notes

- **F1/F2 Data**: API trả về full data, có thể lớn với users có nhiều referrals
- **Collapsible Sections**: Orders của F1 được collapse để giảm DOM size
- **Lazy Loading**: Chỉ load user detail khi click "Chi tiết"
- **Optimistic UI**: Modal mở ngay, data load sau

---

## Testing Checklist

- [ ] Dashboard stats hiển thị đúng
- [ ] Revenue filters hoạt động
- [ ] Users list với referral counts
- [ ] User detail modal với F1 data
- [ ] F2 sub-referrals hiển thị đúng
- [ ] Order items expand/collapse
- [ ] Stats cards tính toán đúng
- [ ] Export CSV hoạt động
- [ ] Responsive trên mobile
- [ ] Error handling

### 1. 📊 Dashboard (Tổng quan)

- Tổng số người dùng
- Tổng số đơn hàng
- Số đơn hàng đã thanh toán
- Tổng doanh thu
- Giá trị đơn hàng trung bình

**API:** `GET /reports/dashboard`

### 2. 💰 Revenue (Doanh thu)

Báo cáo doanh thu chi tiết với:

- Tổng doanh thu, số đơn hàng, giá trị trung bình
- Phân tích theo khu vực
- Danh sách chi tiết tất cả đơn hàng
- Export CSV

**Bộ lọc:**

- Ngày bắt đầu / Ngày kết thúc
- Khu vực
- Mã Mentor

**API:** `GET /reports/revenue`

### 3. 👥 Users (Người dùng)

Báo cáo chi tiết về người dùng với:

- Thống kê tổng hợp (tổng users, doanh thu, giới thiệu)
- Danh sách người dùng với metrics:
  - Số đơn hàng
  - Tổng doanh thu
  - Số người đã giới thiệu
  - Doanh thu từ người giới thiệu
- Chi tiết từng user (modal popup)

**Bộ lọc:**

- Ngày bắt đầu / Ngày kết thúc
- Discount Tier (VIP, MENTOR, MENTEE, LOYALTY, NONE)
- Role (ADMIN, MENTOR, CUSTOMER)

**API:**

- `GET /reports/users` - Danh sách
- `GET /reports/users/:userId` - Chi tiết user

### 4. 🔗 Referrals (Giới thiệu)

Báo cáo hệ thống giới thiệu:

- Thống kê tổng quan:
  - Tổng số người dùng
  - Tổng số giới thiệu
  - Trung bình giới thiệu/user
  - Số users có giới thiệu
- Top 10 người giới thiệu nhiều nhất
- Chi tiết từng user referrer

**Bộ lọc:**

- Discount Tier
- Role

**API:** `GET /reports/referrals`

## User Detail Modal

Khi click "Chi tiết" ở bất kỳ user nào, hiển thị modal với:

### Thông tin cơ bản

- Tên, email, referral code
- Discount tier, role
- Người giới thiệu họ (nếu có)

### Thống kê

- Tổng đơn hàng
- Tổng doanh thu
- Số người đã giới thiệu
- Doanh thu từ người được giới thiệu
- Trung bình doanh thu/người giới thiệu

### Danh sách người được giới thiệu

Bảng chi tiết tất cả người mà user này đã giới thiệu:

- Tên, email
- Discount tier
- Số đơn hàng
- Tổng doanh thu
- Ngày tham gia

### Đơn hàng gần đây

Danh sách các đơn hàng của user:

- Ngày đặt
- Trạng thái
- Số sản phẩm
- Số tiền

## Tính năng

### Navigation

- Tab switching mượt mà
- Mỗi tab load data riêng khi được chọn
- State được lưu giữ khi chuyển tab

### Filters

- Mỗi tab có bộ lọc riêng
- Button "Áp dụng" để load data mới
- Button "Xóa bộ lọc" để reset về mặc định

### Export

- Tab Revenue có nút "Xuất CSV"
- File CSV bao gồm tất cả đơn hàng với filter hiện tại
- Tên file tự động có date range

### Loading States

- Spinner khi lần đầu load trang
- Loading indicator trong modal chi tiết user
- Error messages rõ ràng

### Responsive

- Grid layout responsive
- Tables có horizontal scroll
- Modal responsive với max-height

## Technical Details

### State Management

```typescript
// Tab hiện tại
const [activeTab, setActiveTab] = useState<ReportTab>("dashboard");

// Data cho mỗi tab
const [dashboardStats, setDashboardStats] =
  useState<DashboardStatistics | null>(null);
const [revenueReport, setRevenueReport] = useState<RevenueReport | null>(null);
const [usersReport, setUsersReport] = useState<UsersReport | null>(null);
const [referralsReport, setReferralsReport] = useState<ReferralsReport | null>(
  null
);

// Filters cho mỗi tab
const [revenueFilters, setRevenueFilters] = useState<RevenueReportQuery>({});
const [usersFilters, setUsersFilters] = useState<UsersReportQuery>({});
const [referralsFilters, setReferralsFilters] = useState<ReferralsReportQuery>(
  {}
);

// User detail modal
const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
const [userDetailReport, setUserDetailReport] =
  useState<UserDetailReport | null>(null);
```

### API Calls

Tất cả sử dụng `reportService` từ `@/service`:

```typescript
// Dashboard
await reportService.getDashboardStatistics();

// Revenue
await reportService.getRevenueReport(filters);

// Users
await reportService.getUsersReport(filters);

// User Detail
await reportService.getUserDetailReport(userId, filters);

// Referrals
await reportService.getReferralsReport(filters);
```

### Authentication

Yêu cầu user có role:

- `ADMIN`
- `EMS`
- `SUPER_ADMIN`

Nếu không, redirect về `/admin/login`

## Styling

- Sử dụng Tailwind CSS
- Gradient cards cho metrics
- Hover effects trên tables
- Shadow và border radius consistent
- Color coding:
  - Purple: Primary actions, main metrics
  - Blue: User/referral metrics
  - Green: Revenue metrics
  - Yellow: Warnings/special info
  - Red: Errors

## Future Enhancements

1. **Pagination**: Thêm pagination cho tables lớn
2. **Charts**: Visualize data với charts (Chart.js, Recharts)
3. **Advanced Filters**: Date range picker, multi-select
4. **Export Options**: PDF, Excel export
5. **Real-time Updates**: WebSocket cho real-time data
6. **Caching**: Cache data để giảm API calls
7. **Sorting**: Sort columns trong tables
8. **Search**: Search trong tables
