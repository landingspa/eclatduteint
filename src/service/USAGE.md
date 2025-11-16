# API Services Documentation

## Tổng quan

Dự án đã được tích hợp đầy đủ các service để giao tiếp với backend API dựa trên API_DOCUMENTATION.md.

## 📁 Cấu trúc Service

```
src/service/
├── base.service.ts      # Base service với axios và token management
├── auth.service.ts      # Authentication (login, register)
├── user.service.ts      # User management (Admin)
├── order.service.ts     # Order management
├── payment.service.ts   # Payment processing
├── report.service.ts    # Reports & analytics (Admin)
├── product.service.ts   # Product management (local)
├── helpers.ts           # Utility functions
├── index.ts            # Export tất cả services
└── README_SERVICE.md   # Documentation
```

## 🚀 Cách sử dụng

### 1. Import services

```typescript
// Import single service
import { authService } from "@/service/auth.service";
import { orderService } from "@/service/order.service";

// Hoặc import tất cả
import { authService, orderService, paymentService } from "@/service";
```

### 2. Authentication Flow

```typescript
import { authService } from "@/service";

// Register
const handleRegister = async () => {
  try {
    const response = await authService.register({
      email: "user@example.com",
      password: "password123",
      name: "John Doe",
      region: "North",
      mentorId: "mentor-123", // optional
    });

    console.log("User:", response.user);
    console.log("Token auto saved:", response.access_token);

    // Store user data
    authService.setCurrentUser(response.user);
  } catch (error) {
    console.error("Register failed:", error);
  }
};

// Login
const handleLogin = async () => {
  try {
    const response = await authService.login({
      email: "user@example.com",
      password: "password123",
    });

    authService.setCurrentUser(response.user);
    // Redirect to dashboard
  } catch (error) {
    console.error("Login failed:", error);
  }
};

// Logout
const handleLogout = () => {
  authService.logout();
  authService.clearCurrentUser();
  // Redirect to login
};

// Check authentication
if (authService.isAuthenticated()) {
  const user = authService.getCurrentUser();
  console.log("Logged in as:", user?.name);
}
```

### 3. Order Management

```typescript
import { orderService, OrderItem } from "@/service";

// Create order
const createOrder = async (cartItems: OrderItem[]) => {
  try {
    // Validate items
    if (!orderService.validateOrderItems(cartItems)) {
      throw new Error("Invalid cart items");
    }

    const order = await orderService.createOrder({
      items: cartItems,
      region: "North",
      mentorId: "mentor-123", // optional
    });

    console.log("Order created:", order.id);
    return order;
  } catch (error) {
    console.error("Failed to create order:", error);
  }
};

// Get user's orders
const getMyOrders = async () => {
  try {
    const orders = await orderService.getMyOrders();
    console.log("My orders:", orders);
  } catch (error) {
    console.error("Failed to get orders:", error);
  }
};

// Get all orders (Admin only)
const getAllOrders = async () => {
  try {
    const orders = await orderService.getAllOrders();
    console.log("All orders:", orders);
  } catch (error) {
    console.error("Failed to get orders:", error);
  }
};

// Update order status (Admin only)
const updateOrderStatus = async (orderId: string) => {
  try {
    const order = await orderService.updateOrderStatus(orderId, {
      status: "CONFIRMED",
    });
    console.log("Order updated:", order);
  } catch (error) {
    console.error("Failed to update order:", error);
  }
};
```

### 4. Payment Processing

```typescript
import { paymentService } from "@/service";

// Complete payment flow
const processPayment = async (orderId: string, amount: number) => {
  try {
    // 1. Create payment intent
    const { clientSecret, paymentId } =
      await paymentService.createPaymentIntent({
        orderId,
        amount,
      });

    // 2. Use clientSecret with Stripe.js
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

    const result = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: customerName,
          email: customerEmail,
        },
      },
    });

    if (result.error) {
      console.error("Payment failed:", result.error.message);
    } else {
      console.log("Payment successful!");
      // Webhook will automatically update order status
    }
  } catch (error) {
    console.error("Payment processing failed:", error);
  }
};

// Get all payments (Admin only)
const getAllPayments = async () => {
  try {
    const payments = await paymentService.getAllPayments();
    console.log("All payments:", payments);
  } catch (error) {
    console.error("Failed to get payments:", error);
  }
};

// Format payment amount
const formattedAmount = paymentService.formatAmount(35000, "VND");
console.log(formattedAmount); // ₫35,000
```

### 5. User Management (Admin)

```typescript
import { userService } from "@/service";

// Get all users
const getAllUsers = async () => {
  try {
    const users = await userService.getAllUsers();
    console.log("Total users:", users.length);

    // Filter by role
    const admins = userService.filterUsersByRole(users, "ADMIN");
    const customers = userService.filterUsersByRole(users, "CUSTOMER");

    // Count by role
    const roleCounts = userService.countUsersByRole(users);
    console.log("Role counts:", roleCounts);
  } catch (error) {
    console.error("Failed to get users:", error);
  }
};

// Update user
const updateUser = async (userId: string) => {
  try {
    const user = await userService.updateUser(userId, {
      role: "MENTOR",
      region: "South",
    });
    console.log("User updated:", user);
  } catch (error) {
    console.error("Failed to update user:", error);
  }
};

// Delete user
const deleteUser = async (userId: string) => {
  try {
    const result = await userService.deleteUser(userId);
    console.log(result.message);
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};
```

### 6. Reports & Analytics (Admin)

```typescript
import { reportService } from "@/service";

// Get revenue report
const getRevenue = async () => {
  try {
    const report = await reportService.getRevenueReport({
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      region: "North",
      mentorId: "mentor-123",
    });

    console.log("Total revenue:", report.summary.totalRevenue);
    console.log("Total orders:", report.summary.totalOrders);
    console.log("Average order value:", report.summary.averageOrderValue);
    console.log("By region:", report.byRegion);
    console.log("By mentor:", report.byMentor);

    // Download report as CSV
    reportService.downloadReportCSV(report, "revenue-report-2024.csv");
  } catch (error) {
    console.error("Failed to get report:", error);
  }
};

// Get dashboard statistics
const getDashboardStats = async () => {
  try {
    const stats = await reportService.getDashboardStatistics();
    console.log("Dashboard stats:", stats);
  } catch (error) {
    console.error("Failed to get stats:", error);
  }
};
```

### 7. Sử dụng Helpers

```typescript
import {
  isAdmin,
  getRoleDisplayName,
  getOrderStatusDisplayName,
  formatVND,
  formatDate,
  isValidEmail,
  isStrongPassword,
  getErrorMessage,
} from "@/service/helpers";

// Check role
const user = authService.getCurrentUser();
if (user && isAdmin(user.role)) {
  console.log("User is admin");
}

// Display names
console.log(getRoleDisplayName("ADMIN")); // "Admin"
console.log(getOrderStatusDisplayName("PAID")); // "Đã thanh toán"

// Format values
console.log(formatVND(350000)); // "350.000 ₫"
console.log(formatDate(new Date())); // "16/11/2025, 14:30"

// Validate
if (!isValidEmail(email)) {
  console.error("Invalid email");
}

if (!isStrongPassword(password)) {
  console.error("Password too weak");
}

// Handle errors
try {
  await orderService.createOrder(data);
} catch (error) {
  const message = getErrorMessage(error);
  toast.error(message); // Show user-friendly message
}
```

## 🔐 Authentication Flow

1. **User registers/logs in** → Token được tự động lưu vào localStorage
2. **Token được thêm tự động** vào mọi API requests qua axios interceptor
3. **Token expired** → Auto redirect về /login và xóa token
4. **Logout** → Xóa token và redirect về home

## 📊 Complete Example: Checkout Flow

```typescript
import { orderService, paymentService, authService } from "@/service";

const handleCheckout = async (cartItems: OrderItem[]) => {
  try {
    // 1. Check authentication
    if (!authService.isAuthenticated()) {
      router.push("/login");
      return;
    }

    // 2. Validate cart
    if (!orderService.validateOrderItems(cartItems)) {
      toast.error("Giỏ hàng không hợp lệ");
      return;
    }

    // 3. Create order
    const order = await orderService.createOrder({
      items: cartItems,
      region: userRegion,
      mentorId: userMentorId,
    });

    // 4. Create payment intent
    const { clientSecret } = await paymentService.createPaymentIntent({
      orderId: order.id,
      amount: order.totalAmount,
    });

    // 5. Process payment with Stripe
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    const result = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: customerName },
      },
    });

    if (result.error) {
      toast.error(result.error.message);
    } else {
      toast.success("Thanh toán thành công!");
      router.push(`/orders/${order.id}`);
    }
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
};
```

## 🔧 Environment Variables

Thêm vào `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
```

## 📝 Type Safety

Tất cả services đều có TypeScript types đầy đủ:

- `User`, `UserRole`
- `Order`, `OrderItem`, `OrderStatus`
- `Payment`, `PaymentStatus`
- `RevenueReport`, `DashboardStatistics`

## 🎯 Best Practices

1. **Always handle errors** với try-catch
2. **Check authentication** trước khi gọi protected endpoints
3. **Validate data** trước khi gửi lên server
4. **Use helpers** để format và validate
5. **Show user-friendly messages** với toast/alert
6. **Type everything** với TypeScript

## 📚 API Documentation Reference

Xem file `API_DOCUMENTATION.md` để biết chi tiết về:

- Request/Response formats
- Error codes
- Available endpoints
- Swagger UI: `http://localhost:3000/api/docs`
