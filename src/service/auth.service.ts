import { BaseService, UserRole } from "./base.service";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  region?: string;
  mentorId?: string;
  referralCode?: string;
  referredByCode?: string | null;
  discountTier?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  region?: string;
  referredByCode?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

/**
 * Authentication Service
 */
export class AuthService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Register new user
   * POST /auth/register
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>("/auth/register", data);

    // Store token and user data after successful registration
    if (response.access_token) {
      this.setToken(response.access_token);
      this.setCurrentUser(response.user);
    }

    return response;
  }

  /**
   * Login user
   * POST /auth/login
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>("/auth/login", credentials);

    // Store token and user data after successful login
    if (response.access_token) {
      this.setToken(response.access_token);
      this.setCurrentUser(response.user);
    }

    return response;
  }

  /**
   * Logout user (clear token)
   */
  logout(): void {
    this.clearToken();
    this.clearCurrentUser();
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Get current user from stored data
   */
  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null;

    const userStr = localStorage.getItem("current_user");
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Store current user data
   */
  setCurrentUser(user: User): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("current_user", JSON.stringify(user));
    }
  }

  /**
   * Clear current user data
   */
  clearCurrentUser(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("current_user");
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
