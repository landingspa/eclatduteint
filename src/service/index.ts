// Export all services
export * from "./base.service";
export * from "./auth.service";
export * from "./user.service";
export * from "./order.service";
export * from "./payment.service";
export * from "./report.service";
export * from "./product.service";

// Re-export singleton instances for convenience
export { authService } from "./auth.service";
export { userService } from "./user.service";
export { orderService } from "./order.service";
export { paymentService } from "./payment.service";
export { reportService } from "./report.service";
export { productService } from "./product.service";
