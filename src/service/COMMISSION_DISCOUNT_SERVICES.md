# Commission & Discount Tier Services

## Overview

Các service mới được tạo để quản lý Commissions và Discount Tiers, thay thế việc gọi API trực tiếp trong các trang admin.

## Services Mới

### 1. CommissionService (`commission.service.ts`)

Service quản lý cấu hình hoa hồng với 3 options:

- `FAST_GROWTH` - Tăng trưởng nhanh (Năm 1)
- `BALANCED` - Cân bằng - Ổn định (Năm 2)
- `MAX_PROFIT` - Tối đa lợi nhuận (Năm 3)

#### Methods:

```typescript
// Lấy tất cả cấu hình
await commissionService.getAll(): Promise<Commission[]>

// Lấy cấu hình đang active
await commissionService.getActive(): Promise<Commission | null>

// Lấy cấu hình theo option
await commissionService.getByOption(option: CommissionOption): Promise<Commission>

// Tạo cấu hình mới
await commissionService.create(data: CreateCommissionDto): Promise<Commission>

// Cập nhật cấu hình
await commissionService.update(option: CommissionOption, data: UpdateCommissionDto): Promise<Commission>

// Xóa cấu hình
await commissionService.remove(option: CommissionOption): Promise<void>

// Kích hoạt cấu hình
await commissionService.activate(option: CommissionOption): Promise<Commission>

// Validate tổng % = 50%
commissionService.validateTotalPercent(data): boolean

// Lấy label tiếng Việt
commissionService.getOptionLabel(option: CommissionOption): string
```

#### Usage Example:

```typescript
import { commissionService, CommissionOption } from "@/service";

// Lấy tất cả commissions
const commissions = await commissionService.getAll();

// Tạo mới
await commissionService.create({
  option: "FAST_GROWTH",
  companyPercent: 12,
  vipPercent: 20,
  mentorPercent: 10,
  menteePercent: 6,
  loyaltyPercent: 2,
  description: "Cấu hình cho năm đầu tiên",
  isActive: false,
});

// Kích hoạt
await commissionService.activate("FAST_GROWTH");
```

### 2. DiscountTierService (`discount-tier.service.ts`)

Service quản lý cấp độ chiết khấu:

- `VIP` - VIP Master
- `MENTOR` - Mentor
- `MENTEE` - Mentee
- `LOYALTY` - Loyalty
- `NONE` - Không có

#### Methods:

```typescript
// Lấy tất cả cấp độ
await discountTierService.getAll(): Promise<DiscountTier[]>

// Lấy cấp độ theo tier
await discountTierService.getByTier(tier: DiscountTierType): Promise<DiscountTier>

// Tạo cấp độ mới
await discountTierService.create(data: CreateDiscountTierDto): Promise<DiscountTier>

// Cập nhật cấp độ
await discountTierService.update(tier: DiscountTierType, data: UpdateDiscountTierDto): Promise<DiscountTier>

// Xóa cấp độ
await discountTierService.remove(tier: DiscountTierType): Promise<void>

// Lấy label tiếng Việt
discountTierService.getTierLabel(tier: DiscountTierType): string

// Format tiền VND
discountTierService.formatCurrency(amount: number): string

// Validate discount %
discountTierService.validateDiscountPercent(percent: number): boolean
```

#### Usage Example:

```typescript
import { discountTierService, DiscountTierType } from "@/service";

// Lấy tất cả tiers
const tiers = await discountTierService.getAll();

// Tạo mới
await discountTierService.create({
  tier: "VIP",
  discountPercent: 45,
  maintenanceMonths: 6,
  minOrderAmount: 200000000,
  description: "Cấp độ VIP Master",
});

// Format tiền
const formatted = discountTierService.formatCurrency(200000000);
// => "200.000.000 ₫"
```

## Các Trang Đã Cập Nhật

### 1. `/admin/commissions/page.tsx`

- ✅ Thay thế `fetch()` bằng `commissionService`
- ✅ Sử dụng types từ service
- ✅ Error handling với try-catch
- ✅ Sử dụng helper methods của service

### 2. `/admin/discount-tiers/page.tsx`

- ✅ Thay thế `fetch()` bằng `discountTierService`
- ✅ Sử dụng types từ service
- ✅ Error handling với try-catch
- ✅ Sử dụng formatCurrency từ service

### 3. `/admin/dashboard/page.tsx`

- ✅ Thay thế `fetch()` bằng `commissionService.getActive()`
- ✅ Sử dụng getOptionLabel từ service
- ✅ Clean code với service layer

## Lợi Ích

### 1. **Code Organization**

- Tách biệt business logic khỏi UI components
- Dễ maintain và test
- Reusable across multiple components

### 2. **Type Safety**

- TypeScript interfaces cho tất cả DTOs
- IntelliSense support tốt hơn
- Compile-time error checking

### 3. **Centralized Error Handling**

- BaseService xử lý errors thống nhất
- Auto-redirect khi 401 Unauthorized
- Consistent error messages

### 4. **Token Management**

- Tự động thêm Authorization header
- Support cả `token` và `auth_token` (backward compatibility)
- Interceptors xử lý token seamlessly

### 5. **Helper Methods**

- `getOptionLabel()` - Format labels tiếng Việt
- `formatCurrency()` - Format VND
- `validateTotalPercent()` - Validation logic
- Không cần duplicate code trong components

## BaseService Updates

### Token Compatibility

BaseService đã được cập nhật để support cả hai token keys:

- `token` - Key hiện tại đang dùng trong admin pages
- `auth_token` - Key mới theo chuẩn của services

```typescript
// Tự động check cả 2 keys
const token =
  localStorage.getItem("token") || localStorage.getItem("auth_token");

// Set token vào cả 2 keys
localStorage.setItem("token", token);
localStorage.setItem("auth_token", token);
```

## Migration Guide

### Trước (Old Way):

```typescript
const response = await fetch(
  "https://server.eclatduteint.store/api/commissions",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

if (response.ok) {
  const data = await response.json();
  setCommissions(data);
} else if (response.status === 401) {
  router.push("/admin/login");
}
```

### Sau (New Way):

```typescript
try {
  const data = await commissionService.getAll();
  setCommissions(data);
} catch (error) {
  console.error("Error:", error);
  if (error instanceof Error && error.message.includes("401")) {
    router.push("/admin/login");
  }
}
```

## Testing

Để test các services:

```typescript
// Mock service nếu cần
jest.mock("@/service", () => ({
  commissionService: {
    getAll: jest.fn(),
    create: jest.fn(),
    // ...
  },
}));

// Test component
const mockCommissions = [
  /* mock data */
];
(commissionService.getAll as jest.Mock).mockResolvedValue(mockCommissions);
```

## Next Steps

Các trang admin khác cũng nên được cập nhật tương tự:

- [ ] `/admin/users/page.tsx` - Sử dụng `userService`
- [ ] `/admin/orders/page.tsx` - Sử dụng `orderService`
- [ ] `/admin/payments/page.tsx` - Sử dụng `paymentService`
- [ ] `/admin/reports/page.tsx` - Sử dụng `reportService`
