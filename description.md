# 📌 TASK: Xây dựng hệ thống backend NestJS cho ứng dụng Eclat

## 🏗 Công nghệ sử dụng

- **NestJS**
- **Prisma ORM + PostgreSQL**
- **Stripe Payment**
- **JWT Authentication**
- **Role-based Access Control (RBAC)**
- **pnpm** (package manager)

## 📁 1. Cấu trúc thư mục cần tạo

```
src/
  auth/
  users/
  orders/
  payments/
  inventory/
  reports/
  common/
    guards/
    decorators/
  prisma/
  main.ts
```

## 🚀 2. Công việc chi tiết cho từng module

### 2.1 Auth Module

- Tạo AuthModule, AuthService, AuthController
- JWT login/register
- API:
  - POST /auth/register
  - POST /auth/login
- Hash mật khẩu bằng bcrypt
- Mặc định role = "customer"
- Role Admin quản lý tất cả có quyên thêm sửa xóa các thành viên

### 2.2 Users Module

- CRUD user (admin)
- API:
  - GET /users
  - PATCH /users/:id
- Tạo Roles decorator & RolesGuard
- Enum role: customer, mentor, leader, admin

### 2.3 Orders Module

- User: GET /orders/my-orders
- Admin: GET /orders
- Tạo đơn, cập nhật trạng thái
- Khi confirm đơn → trừ kho

### 2.4 Payments Module (Stripe)

- POST /payments/create-intent
- POST /payments/webhook
- Lưu paymentIntentId, amount, status
- Khi webhook success → update đơn hàng = paid

### 2.5 Inventory Module

- CRUD sản phẩm
- Kiểm tra tồn kho
- Trừ tồn khi đơn confirm

### 2.6 Reports Module

- GET /reports/revenue
- Thống kê doanh số theo:
  - khu vực
  - mentor
  - ngày
- SUM(order.totalAmount)
- COUNT(order.id)

## 🗄 3. Prisma Schema

- User
- Order
- OrderItem
- Product
- Payment

## 🧪 4. Swagger

- URL: /api/docs

## 🧰 5. Cấu hình .env

```
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret"
STRIPE_SECRET_KEY="sk_live_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"
```

## 🚦 6. Quy tắc code

- NestJS module-based
- DTO + class-validator
- Prisma cho DB query
- JWT Guard cho route quan trọng
- RolesGuard cho admin

## 📌 7. Thứ tự thực thi

1. Prisma schema
2. Auth
3. Users
4. Inventory
5. Orders
6. Payments
7. Reports
8. Swagger
9. Test end-to-end

## 🎯 8. Mục tiêu

Backend hoàn chỉnh cho ứng dụng Eclat:

- Đăng nhập
- Thanh toán Stripe
- Quản lý đơn hàng
- Quản lý tồn kho
- Báo cáo doanh số
- Quản trị thành viên

## 9. Lưu ý

- Backend không quản lý dữ liệu sản phẩm: tức là các sản phẩm đều được fix cứng tại client và gửi lưu thông tin vào backend chứ backend không có lưu dữ liệu sản phẩm
