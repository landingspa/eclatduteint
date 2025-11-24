# 🔐 Admin Panel - Éclat du teint

Hệ thống quản trị cho nhân viên và quản lý, được xây dựng dựa trên nghiệp vụ trong `description.md`.

## 📁 Cấu trúc Admin Pages

```
src/app/(admin)/
├── layout.tsx          # Admin layout với sidebar và authentication
├── page.tsx            # Dashboard - Tổng quan thống kê
├── login/
│   └── page.tsx       # Trang đăng nhập admin
├── orders/
│   └── page.tsx       # Quản lý đơn hàng
├── users/
│   └── page.tsx       # Quản lý người dùng (Admin only)
├── payments/
│   └── page.tsx       # Quản lý thanh toán
└── reports/
    └── page.tsx       # Báo cáo doanh số
```

## 🎯 Tính năng theo Role

### 1. ADMIN (Quản trị viên)

- ✅ Truy cập tất cả trang
- ✅ Quản lý Users: thêm, sửa, xóa thành viên
- ✅ Quản lý Orders: xem, cập nhật trạng thái đơn hàng
- ✅ Quản lý Payments: xem chi tiết thanh toán
- ✅ Báo cáo Revenue: xem thống kê doanh số theo region, mentor, ngày
- ✅ Thay đổi role của user (Customer → Mentor → Leader → Admin)

### 2. LEADER

- ✅ Truy cập Dashboard, Orders, Payments, Reports
- ❌ Không thể quản lý Users
- ✅ Xem báo cáo doanh số
- ✅ Xem chi tiết đơn hàng và thanh toán

### 3. MENTOR

- ✅ Truy cập Dashboard, Orders, Payments, Reports
- ❌ Không thể quản lý Users
- ✅ Xem báo cáo doanh số (có thể filter theo mentorId)
- ✅ Xem đơn hàng liên quan

### 4. CUSTOMER

- ❌ Không có quyền truy cập admin panel
- Redirect về trang chủ nếu cố gắng truy cập

## 🚀 Cách sử dụng

### Đăng nhập Admin

```
URL: /admin/login
```

**Test Accounts** (cần tạo trên backend):

```
Admin Account:
Email: admin@eclatduteint.com
Password: Admin@123

Leader Account:
Email: leader@eclatduteint.com
Password: Leader@123

Mentor Account:
Email: mentor@eclatduteint.com
Password: Mentor@123
```

### 1. Dashboard (`/admin`)

**Hiển thị:**

- Total Users
- Total Orders
- Paid Orders (với conversion rate)
- Total Revenue (với average order value)
- Quick Actions buttons
- System Status

**Dành cho:** Admin, Leader, Mentor

### 2. Orders Management (`/admin/orders`)

**Chức năng:**

- Xem danh sách tất cả đơn hàng
- Filter theo status: Pending, Confirmed, Paid, Cancelled
- View chi tiết đơn hàng (items, customer info, total)
- Update order status (Admin only):
  - Pending → Confirmed
  - Confirmed → Paid
  - Any → Cancelled

**API sử dụng:**

```typescript
// Get all orders (Admin)
await orderService.getAllOrders();

// Get my orders (Leader, Mentor)
await orderService.getMyOrders();

// Update status
await orderService.updateOrderStatus(orderId, { status: "CONFIRMED" });
```

**Dành cho:** Admin, Leader, Mentor

### 3. Users Management (`/admin/users`)

**Chức năng:**

- Xem danh sách tất cả users
- Thống kê users theo role (Admin, Leader, Mentor, Customer)
- Edit user info:
  - Name, Email
  - Role (CUSTOMER, MENTOR, LEADER, ADMIN)
  - Region (North, South, East, West)
  - Mentor ID
- Delete user

**API sử dụng:**

```typescript
// Get all users
await userService.getAllUsers();

// Update user
await userService.updateUser(userId, {
  role: "MENTOR",
  region: "North",
  mentorId: "mentor-id",
});

// Delete user
await userService.deleteUser(userId);
```

**Dành cho:** ADMIN ONLY ⚠️

### 4. Payments Management (`/admin/payments`)

**Chức năng:**

- Xem tất cả payments
- Thống kê:
  - Total Payments
  - Successful Payments (với success rate)
  - Total Revenue
- View payment details:
  - Payment ID
  - Order ID
  - Payment Intent ID (Stripe)
  - Amount, Currency
  - Status (Pending, Succeeded, Failed)
  - Customer info

**API sử dụng:**

```typescript
// Get all payments
await paymentService.getAllPayments();
```

**Dành cho:** Admin, Leader, Mentor

### 5. Revenue Reports (`/admin/reports`)

**Chức năng:**

- Xem báo cáo doanh số chi tiết
- Filter theo:
  - Start Date & End Date
  - Region
  - Mentor ID
- Thống kê:
  - Total Revenue
  - Total Orders
  - Average Order Value
- Phân tích theo:
  - **By Region:** Doanh thu và số đơn hàng theo khu vực
  - **By Mentor:** Doanh thu và số đơn hàng theo mentor
  - **By Date:** Doanh thu theo ngày (time series)
- Export to CSV

**API sử dụng:**

```typescript
// Get revenue report with filters
await reportService.getRevenueReport({
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  region: "North",
  mentorId: "mentor-123",
});

// Download CSV
reportService.downloadReportCSV(report, "revenue_report.csv");
```

**Dành cho:** Admin, Leader, Mentor

## 🔒 Authentication Flow

### 1. Login Process

```typescript
// User enters email & password
const response = await authService.login({ email, password });

// Check role
if (!["ADMIN", "LEADER", "MENTOR"].includes(response.user.role)) {
  throw new Error("Không có quyền truy cập");
}

// Save token & user data
authService.setToken(response.access_token);
authService.setCurrentUser(response.user);

// Redirect to dashboard
router.push("/admin");
```

### 2. Auto Authentication Check

Mỗi trang admin tự động check authentication:

```typescript
useEffect(() => {
  if (!authService.isAuthenticated()) {
    router.push("/admin/login");
    return;
  }

  const user = authService.getCurrentUser();
  if (!user || !["ADMIN", "LEADER", "MENTOR"].includes(user.role)) {
    alert("Bạn không có quyền truy cập");
    router.push("/admin/login");
    return;
  }
}, []);
```

### 3. Logout

```typescript
authService.logout(); // Clear token
authService.clearCurrentUser(); // Clear user data
router.push("/admin/login");
```

## 📊 Nghiệp vụ theo description.md

### ✅ Đã triển khai:

1. **Auth Module**

   - JWT login/register ✅
   - Role-based access control ✅
   - Roles: CUSTOMER, MENTOR, LEADER, ADMIN ✅

2. **Users Module**

   - CRUD user (Admin only) ✅
   - View all users ✅
   - Update user role, region, mentorId ✅
   - Delete user ✅

3. **Orders Module**

   - View all orders (Admin) ✅
   - View my orders (User) ✅
   - Update order status ✅
   - View order details ✅
   - Filter by status ✅

4. **Payments Module**

   - View all payments ✅
   - Payment details ✅
   - Stripe payment integration ready ✅
   - Payment status tracking ✅

5. **Reports Module**
   - Revenue report ✅
   - Statistics by region ✅
   - Statistics by mentor ✅
   - Statistics by date ✅
   - Export to CSV ✅
   - Dashboard statistics ✅

### 📝 Backend cần implement:

Theo `description.md`, backend cần có các API endpoints:

```
POST   /auth/register       ✅ Used in login page
POST   /auth/login          ✅ Used in login page
GET    /users               ✅ Used in users page
PATCH  /users/:id           ✅ Used in users page
DELETE /users/:id           ✅ Used in users page
GET    /orders              ✅ Used in orders page
GET    /orders/my-orders    ✅ Used in orders page
PATCH  /orders/:id/status   ✅ Used in orders page
GET    /payments            ✅ Used in payments page
GET    /reports/revenue     ✅ Used in reports page
GET    /reports/dashboard   ✅ Used in dashboard
```

## 🎨 UI Components

### Color Scheme

- Primary: Purple (#9333EA)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Danger: Red (#EF4444)
- Info: Blue (#3B82F6)

### Status Colors

- **Orders:**

  - Pending: Yellow
  - Confirmed: Blue
  - Paid: Green
  - Cancelled: Red

- **Payments:**
  - Pending: Yellow
  - Succeeded: Green
  - Failed: Red

### Responsive Design

- Desktop: Sidebar fixed, main content with margin
- Tablet: Same as desktop
- Mobile: Stack layout (cần optimize thêm)

## 🔧 Environment Setup

**.env.local**

```env
NEXT_PUBLIC_API_URL=https://server.eclatduteint.store/api
# hoặc production URL
NEXT_PUBLIC_API_URL=https://api.eclatduteint.com
```

## 📱 Navigation

**Sidebar Menu:**

1. Dashboard - Tổng quan
2. Orders - Quản lý đơn hàng
3. Users - Quản lý người dùng (Admin only)
4. Payments - Quản lý thanh toán
5. Reports - Báo cáo doanh số
6. Back to Website - Quay về trang chủ
7. Logout - Đăng xuất

**Active State:**

- Current page có background màu purple nhạt
- Border bên phải màu purple
- Text màu purple

## 🚨 Error Handling

Tất cả pages đều có:

- Loading state với spinner
- Error messages với alert màu đỏ
- Try-catch cho API calls
- User-friendly error messages

## 📈 Performance

- Client-side rendering cho interactive features
- Lazy loading cho large tables
- Debounced search inputs
- Optimistic updates cho better UX

## 🔐 Security

- JWT token stored in localStorage
- Auto-clear token on 401 errors
- Role-based route protection
- Confirmation dialogs for destructive actions
- CORS configuration on backend

## 📖 Usage Examples

### Example 1: View and Update Order Status

```typescript
// Admin viewing orders
const orders = await orderService.getAllOrders();

// Filter pending orders
const pendingOrders = orders.filter((o) => o.status === "PENDING");

// Confirm an order
await orderService.updateOrderStatus(orderId, { status: "CONFIRMED" });
```

### Example 2: Generate Revenue Report

```typescript
// Get report for Q1 2024, North region
const report = await reportService.getRevenueReport({
  startDate: "2024-01-01",
  endDate: "2024-03-31",
  region: "North",
});

console.log(`Total Revenue: ${formatVND(report.summary.totalRevenue)}`);
console.log(`Total Orders: ${report.summary.totalOrders}`);

// Download as CSV
reportService.downloadReportCSV(report, "q1_2024_north.csv");
```

### Example 3: Manage Users

```typescript
// Get all users
const users = await userService.getAllUsers();

// Promote customer to mentor
await userService.updateUser(userId, {
  role: "MENTOR",
  region: "North",
});

// Assign mentor to customer
await userService.updateUser(customerId, {
  mentorId: mentorId,
});
```

## 🎯 Next Steps

1. **Testing:** Test với backend API thật
2. **Mobile Optimization:** Optimize responsive cho mobile
3. **Real-time Updates:** WebSocket cho live order updates
4. **Advanced Filtering:** More filter options
5. **Charts:** Add visualization charts for reports
6. **Notifications:** Toast notifications thay vì alert()
7. **Bulk Actions:** Select multiple items for bulk operations
8. **Search:** Add search functionality
9. **Pagination:** Add pagination for large datasets
10. **Export:** More export formats (Excel, PDF)

---

**Developed for Éclat du teint Management System**
