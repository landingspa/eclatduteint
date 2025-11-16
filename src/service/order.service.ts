import { BaseService, OrderStatus } from "./base.service";
import { User } from "./auth.service";

export interface OrderItem {
  id?: string;
  orderId?: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  region?: string;
  mentorId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  user?: User;
  payment?: any;
}

export interface CreateOrderData {
  items: OrderItem[];
  region?: string;
  mentorId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  note?: string;
}

export interface UpdateOrderStatusData {
  status: OrderStatus;
}

/**
 * Order Service
 */
export class OrderService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Create new order
   * POST /orders
   */
  async createOrder(data: CreateOrderData): Promise<Order> {
    return this.post<Order>("/orders", data);
  }

  /**
   * Get user's orders
   * GET /orders/my-orders
   */
  async getMyOrders(): Promise<Order[]> {
    return this.get<Order[]>("/orders/my-orders");
  }

  /**
   * Get all orders (Admin only)
   * GET /orders
   */
  async getAllOrders(): Promise<Order[]> {
    return this.get<Order[]>("/orders");
  }

  /**
   * Get order by ID
   * GET /orders/:id
   */
  async getOrderById(id: string): Promise<Order> {
    return this.get<Order>(`/orders/${id}`);
  }

  /**
   * Update order status (Admin only)
   * PATCH /orders/:id/status
   */
  async updateOrderStatus(
    id: string,
    data: UpdateOrderStatusData
  ): Promise<Order> {
    return this.patch<Order>(`/orders/${id}/status`, data);
  }

  /**
   * Calculate total amount from items
   */
  calculateTotalAmount(items: OrderItem[]): number {
    return items.reduce((total, item) => total + item.totalPrice, 0);
  }

  /**
   * Validate order items
   */
  validateOrderItems(items: OrderItem[]): boolean {
    if (!items || items.length === 0) {
      return false;
    }

    return items.every(
      (item) =>
        item.productName &&
        item.quantity > 0 &&
        item.price > 0 &&
        item.totalPrice === item.quantity * item.price
    );
  }
}

// Export singleton instance
export const orderService = new OrderService();
