import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  success?: boolean;
  statusCode?: number;
  error?: string;
}

export type UserRole =
  | "CUSTOMER"
  | "MENTOR"
  | "LEADER"
  | "ADMIN"
  | "SUPER_ADMIN"
  | "EMS"
  | "ERC"
  | "VIP_MASTER"
  | "MENTEE"
  | "LOYALTY";
export type OrderStatus = "PENDING" | "CONFIRMED" | "PAID" | "CANCELLED";
export type PaymentStatus = "PENDING" | "SUCCEEDED" | "FAILED";

export class BaseService {
  protected axiosInstance: AxiosInstance;
  protected baseURL: string;

  constructor(
    baseURL: string = process.env.NEXT_PUBLIC_API_URL ||
      "https://server.eclatduteint.store/api"
  ) {
    this.baseURL = baseURL;

    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.initializeInterceptors();
  }

  /**
   * Initialize request and response interceptors
   */
  private initializeInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Always get token fresh from localStorage
        // Support both 'token' and 'auth_token' for backward compatibility
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("token") ||
              localStorage.getItem("auth_token")
            : null;

        // Add token to headers if available
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log("BaseService.interceptor - Adding token to request");
        } else {
          console.log("BaseService.interceptor - No token found");
        }

        // You can add other common headers here
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        // Handle common errors
        if (error.response) {
          switch (error.response.status) {
            case 401:
              // Handle unauthorized - clear token and redirect to login ONLY if on admin pages
              this.clearToken();
              if (typeof window !== "undefined") {
                // Only redirect to admin login if currently on admin pages
                const currentPath = window.location.pathname;
                if (currentPath.startsWith("/admin")) {
                  window.location.href = "/admin/login";
                }
                // For public pages, just log the error and let the component handle it
                console.log(
                  "401 Unauthorized - Not redirecting from public page"
                );
              }
              break;
            case 403:
              console.error("Access forbidden");
              break;
            case 404:
              console.error("Resource not found");
              break;
            case 500:
              console.error("Internal server error");
              break;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Set authentication token
   */
  public setToken(token: string): void {
    if (typeof window !== "undefined") {
      // Store in both keys for backward compatibility
      localStorage.setItem("token", token);
      localStorage.setItem("auth_token", token);
    }
  }

  /**
   * Get current token
   */
  public getToken(): string | null {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("token") || localStorage.getItem("auth_token")
      );
    }
    return null;
  }

  /**
   * Clear authentication token
   */
  public clearToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("auth_token");
    }
  }

  /**
   * Generic GET request
   */
  protected async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Generic POST request
   */
  protected async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Generic PUT request
   */
  protected async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Generic PATCH request
   */
  protected async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Generic DELETE request
   */
  protected async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle errors uniformly
   */
  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      return new Error(message);
    }
    return error;
  }

  /**
   * Upload file with form data
   */
  protected async uploadFile<T = any>(
    url: string,
    file: File,
    fieldName: string = "file",
    additionalData?: Record<string, any>
  ): Promise<T> {
    const formData = new FormData();
    formData.append(fieldName, file);

    if (additionalData) {
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });
    }

    try {
      const response = await this.axiosInstance.post<T>(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

export default BaseService;
