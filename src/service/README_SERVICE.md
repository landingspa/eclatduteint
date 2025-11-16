# Base Service Documentation

## Tổng quan

Base Service là một lớp cơ sở sử dụng Axios để xử lý các HTTP requests. Nó cung cấp các tính năng:

- ✅ Quản lý token tự động
- ✅ Interceptors cho request/response
- ✅ Xử lý lỗi thống nhất
- ✅ Hỗ trợ upload file
- ✅ Có thể kế thừa và mở rộng
- ✅ TypeScript support đầy đủ

## Cài đặt

Axios đã được cài đặt sẵn trong project.

## Cấu trúc

```
src/service/
├── base.service.ts      # Base service class
├── user.service.ts      # Example: User service
├── product.service.ts   # Example: Product service
└── README_SERVICE.md    # Documentation
```

## Sử dụng cơ bản

### 1. Tạo service mới kế thừa từ BaseService

```typescript
import { BaseService, ApiResponse } from "./base.service";

export class MyService extends BaseService {
  constructor() {
    super(); // Hoặc super('https://api.example.com') để custom base URL
  }

  // Thêm các methods của bạn
  async getData(): Promise<ApiResponse<any>> {
    return this.get("/my-endpoint");
  }
}

export const myService = new MyService();
```

### 2. Sử dụng trong component

```typescript
import { userService } from "@/service/user.service";

// Login
const handleLogin = async () => {
  try {
    const response = await userService.login({
      email: "user@example.com",
      password: "password123",
    });

    if (response.success) {
      console.log("Logged in:", response.data.user);
      // Token được tự động lưu và thêm vào requests
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};

// Get profile (với token)
const getProfile = async () => {
  try {
    const response = await userService.getProfile();
    console.log("User profile:", response.data);
  } catch (error) {
    console.error("Failed to get profile:", error);
  }
};

// Logout
const handleLogout = async () => {
  await userService.logout();
  // Token được tự động xóa
};
```

## API Reference

### BaseService Methods

#### HTTP Methods (Protected)

```typescript
// GET request
protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>

// POST request
protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>

// PUT request
protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>

// PATCH request
protected async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>

// DELETE request
protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>

// Upload file
protected async uploadFile<T>(
  url: string,
  file: File,
  fieldName?: string,
  additionalData?: Record<string, any>
): Promise<ApiResponse<T>>
```

#### Token Management (Public)

```typescript
// Lưu token
public setToken(token: string): void

// Lấy token hiện tại
public getToken(): string | null

// Xóa token
public clearToken(): void
```

### ApiResponse Interface

```typescript
interface ApiResponse<T = any> {
  data: T; // Response data
  message?: string; // Optional message
  success: boolean; // Success status
}
```

## Ví dụ nâng cao

### 1. Service với custom headers

```typescript
export class CustomService extends BaseService {
  async getDataWithCustomHeaders() {
    return this.get("/endpoint", {
      headers: {
        "X-Custom-Header": "value",
      },
    });
  }
}
```

### 2. Upload nhiều files

```typescript
export class FileService extends BaseService {
  async uploadMultipleFiles(files: File[]) {
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    const response = await this.axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
}
```

### 3. Pagination

```typescript
export class PaginatedService extends BaseService {
  async getItems(page: number = 1, limit: number = 10) {
    return this.get(`/items?page=${page}&limit=${limit}`);
  }
}
```

### 4. Search với query params

```typescript
export class SearchService extends BaseService {
  async search(query: string, filters?: Record<string, any>) {
    const params = new URLSearchParams({ q: query });

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, String(value));
      });
    }

    return this.get(`/search?${params.toString()}`);
  }
}
```

## Xử lý lỗi

Base service tự động xử lý các lỗi phổ biến:

- **401 Unauthorized**: Tự động xóa token và redirect về /login
- **403 Forbidden**: Log error
- **404 Not Found**: Log error
- **500 Internal Server Error**: Log error

Bạn có thể override error handling:

```typescript
export class CustomErrorService extends BaseService {
  constructor() {
    super();
    this.setupCustomErrorHandling();
  }

  private setupCustomErrorHandling() {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Custom error handling
        if (error.response?.status === 403) {
          alert("Bạn không có quyền truy cập!");
        }
        return Promise.reject(error);
      }
    );
  }
}
```

## Environment Variables

Thêm vào file `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

Service sẽ tự động sử dụng URL này làm base URL.

## Best Practices

1. **Tạo singleton instance** cho mỗi service:

```typescript
export const myService = new MyService();
```

2. **Sử dụng TypeScript types** cho request/response:

```typescript
interface UserData {
  name: string;
  email: string;
}

async createUser(data: UserData): Promise<ApiResponse<User>> {
  return this.post<User>('/users', data);
}
```

3. **Xử lý errors gracefully**:

```typescript
try {
  const response = await service.getData();
  return response.data;
} catch (error) {
  console.error("Error:", error);
  // Show user-friendly message
  toast.error("Không thể tải dữ liệu");
}
```

4. **Kiểm tra token trước khi gọi protected endpoints**:

```typescript
const token = service.getToken();
if (!token) {
  router.push("/login");
  return;
}
```

## Testing

```typescript
import { UserService } from "@/service/user.service";

describe("UserService", () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  it("should login successfully", async () => {
    const result = await service.login({
      email: "test@example.com",
      password: "password123",
    });

    expect(result.success).toBe(true);
    expect(service.getToken()).toBeTruthy();
  });
});
```

## Troubleshooting

### Token không được thêm vào request

- Đảm bảo đã gọi `setToken()` sau khi login thành công
- Kiểm tra token trong localStorage: `localStorage.getItem('auth_token')`

### CORS errors

- Cấu hình CORS trên backend
- Hoặc sử dụng Next.js API routes làm proxy

### TypeScript errors

- Đảm bảo đã định nghĩa đúng types cho response
- Sử dụng `ApiResponse<T>` wrapper cho consistency
