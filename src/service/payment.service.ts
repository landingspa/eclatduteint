import { BaseService, PaymentStatus } from "./base.service";
import { Order } from "./order.service";
import { User } from "./auth.service";

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  order?: Order;
  user?: User;
}

export interface CreatePaymentIntentData {
  orderId: string;
  amount: number;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
  paymentId: string;
}

/**
 * Payment Service
 */
export class PaymentService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Create payment intent
   * POST /payments/create-intent
   */
  async createPaymentIntent(
    data: CreatePaymentIntentData
  ): Promise<CreatePaymentIntentResponse> {
    return this.post<CreatePaymentIntentResponse>(
      "/payments/create-intent",
      data
    );
  }

  /**
   * Get all payments (Admin only)
   * GET /payments
   */
  async getAllPayments(): Promise<Payment[]> {
    return this.get<Payment[]>("/payments");
  }

  /**
   * Get my payments (current user's payments)
   * GET /payments/my-payments
   */
  async getMyPayments(): Promise<Payment[]> {
    return this.get<Payment[]>("/payments/my-payments");
  }

  /**
   * Get payment by ID
   * GET /payments/:id
   */
  async getPaymentById(id: string): Promise<Payment> {
    return this.get<Payment>(`/payments/${id}`);
  }

  /**
   * Get payment by order ID
   * GET /payments/order/:orderId
   */
  async getPaymentByOrderId(orderId: string): Promise<Payment> {
    return this.get<Payment>(`/payments/order/${orderId}`);
  }

  /**
   * Format currency amount
   */
  formatAmount(amount: number, currency: string = "USD"): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  }

  /**
   * Check if payment is successful
   */
  isPaymentSuccessful(payment: Payment): boolean {
    return payment.status === "SUCCEEDED";
  }
}

// Export singleton instance
export const paymentService = new PaymentService();
