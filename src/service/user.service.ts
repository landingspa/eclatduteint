import { BaseService, UserRole } from "./base.service";
import { User } from "./auth.service";

export interface UpdateUserData {
  email?: string;
  name?: string;
  role?: UserRole;
  region?: string;
  mentorId?: string;
  password?: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  region?: string;
  mentorId?: string;
}

export interface ReferralUser {
  id: string;
  email: string;
  name: string;
  role: string;
  discountTier: string;
  createdAt: string;
  totalOrderAmount: number;
  totalOrders: number;
}

export interface UserReferralsResponse {
  referralCode: string;
  totalReferrals: number;
  totalAmount: number;
  referrals: ReferralUser[];
}

/**
 * User Management Service (Admin only)
 */
export class UserService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Create new user (Admin only)
   * POST /auth/register (same endpoint but admin can set role)
   */
  async createUser(data: CreateUserData): Promise<User> {
    // Admin creates user via register endpoint
    const response = await this.post<{ user: User; access_token: string }>(
      "/auth/register",
      data
    );
    return response.user;
  }

  /**
   * Get all users (Admin only)
   * GET /users
   */
  async getAllUsers(): Promise<User[]> {
    return this.get<User[]>("/users");
  }

  /**
   * Get user by ID (Admin only)
   * GET /users/:id
   */
  async getUserById(id: string): Promise<User> {
    return this.get<User>(`/users/${id}`);
  }

  /**
   * Update user (Admin only)
   * PATCH /users/:id
   */
  async updateUser(id: string, data: UpdateUserData): Promise<User> {
    return this.patch<User>(`/users/${id}`, data);
  }

  /**
   * Delete user (Admin only)
   * DELETE /users/:id
   */
  async deleteUser(id: string): Promise<{ message: string }> {
    return this.delete<{ message: string }>(`/users/${id}`);
  }

  /**
   * Get user's referrals (F1 list)
   * GET /users/:id/referrals
   */
  async getUserReferrals(userId: string): Promise<UserReferralsResponse> {
    return this.get<UserReferralsResponse>(`/users/${userId}/referrals`);
  }

  /**
   * Filter users by role
   */
  filterUsersByRole(users: User[], role: UserRole): User[] {
    return users.filter((user) => user.role === role);
  }

  /**
   * Filter users by region
   */
  filterUsersByRegion(users: User[], region: string): User[] {
    return users.filter((user) => user.region === region);
  }

  /**
   * Get users by mentor
   */
  getUsersByMentor(users: User[], mentorId: string): User[] {
    return users.filter((user) => user.mentorId === mentorId);
  }

  /**
   * Count users by role
   */
  countUsersByRole(users: User[]): Record<UserRole, number> {
    return users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<UserRole, number>);
  }
}

// Export singleton instance
export const userService = new UserService();
