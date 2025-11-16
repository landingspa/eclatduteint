import { BaseService } from "./base.service";

// Define product-related types
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description?: string;
  images?: string[];
  category?: string;
  stock?: number;
  featured?: boolean;
}

export interface ProductQuery {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
}

/**
 * Product Service - Local products management (not connected to backend API)
 * This service manages products from local data
 */
export class ProductService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Get all products with optional filters (local data)
   */
  async getProducts(
    query?: ProductQuery
  ): Promise<{ products: Product[]; total: number }> {
    // This would typically load from local data/products.ts
    // For API integration, uncomment below:
    /*
    const params = new URLSearchParams();

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }

    return this.get<{ products: Product[]; total: number }>(
      `/products?${params.toString()}`
    );
    */

    // Placeholder return for local data
    return {
      products: [],
      total: 0,
    };
  }

  /**
   * Get single product by ID or slug (local data)
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    // This would typically load from local data/products.ts
    // For API integration, uncomment below:
    /*
    return this.get<Product>(`/products/${slug}`);
    */

    return null;
  }

  /**
   * Get single product by ID
   */
  async getProductById(id: string): Promise<Product | null> {
    // For API integration, uncomment below:
    /*
    return this.get<Product>(`/products/${id}`);
    */

    return null;
  }

  /**
   * Create new product (admin only)
   */
  async createProduct(data: Omit<Product, "id">): Promise<Product> {
    return this.post<Product>("/products", data);
  }

  /**
   * Update product (admin only)
   */
  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    return this.put<Product>(`/products/${id}`, data);
  }

  /**
   * Delete product (admin only)
   */
  async deleteProduct(id: string): Promise<void> {
    return this.delete<void>(`/products/${id}`);
  }

  /**
   * Upload product images
   */
  async uploadProductImages(
    productId: string,
    files: File[]
  ): Promise<{ imageUrls: string[] }> {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append(`images`, file);
    });

    formData.append("productId", productId);

    try {
      const response = await this.axiosInstance.post<{ imageUrls: string[] }>(
        "/products/upload-images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Filter products by category
   */
  filterByCategory(products: Product[], category: string): Product[] {
    return products.filter((p) => p.category === category);
  }

  /**
   * Filter products by price range
   */
  filterByPriceRange(
    products: Product[],
    minPrice?: number,
    maxPrice?: number
  ): Product[] {
    return products.filter((p) => {
      if (minPrice !== undefined && p.price < minPrice) return false;
      if (maxPrice !== undefined && p.price > maxPrice) return false;
      return true;
    });
  }

  /**
   * Search products by name or description
   */
  searchProducts(products: Product[], query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description?.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Get featured products
   */
  getFeaturedProducts(products: Product[]): Product[] {
    return products.filter((p) => p.featured === true);
  }
}

// Export singleton instance
export const productService = new ProductService();
