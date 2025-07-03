// src/models/ProductModel.ts

import { http_get, http_post } from "../services/Api";
import Utils from "../services/Utils";

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: Array<{ url: string | null; label: string; active: boolean }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface Stock {
  items_sold: number;
  total_items: number;
}

export interface Specification {
  label: string;
  value: string;
}

export type VariantOptions = Record<string, string[]>;

export class ProductModel {
  // Basic Fields
  id: number = 0;
  name: string = "";
  price_1: string = "0.00";
  price_2: string = "0.00";
  feature_photo: string = "";
  rates: string = "[]";
  description: string | null = null;
  summary: string | null = null;
  category: number | null = null;
  category_text: string = "";
  colors: string = "";
  sizes: string = "";
  in_stock: number = 1;
  status: number = 1;
  created_at: string = "";
  updated_at: string = "";

  // --- Newly added fields ---
  variants: VariantOptions = {};
  images: string[] = [];
  stock: Stock = { items_sold: 0, total_items: 0 };
  rating: number = 0;
  reviewsCount: number = 0;
  specifications: Specification[] = [];
  // --------------------------

  /**
   * Update fields with provided partial data.
   * @param data Partial data to update the product fields.
   */
  updateProfile(data: Partial<ProductModel>): void {
    Object.assign(this, data);
  }

  /**
   * Converts this instance to a plain JS object.
   */
  toJSON(): Record<string, any> {
    const result: Record<string, any> = {};
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        result[key] = (this as any)[key];
      }
    }
    return result;
  }

  /**
   * Creates a ProductModel instance from a plain object or JSON string.
   * @param data The plain object or JSON string containing product data.
   */
  static fromJson(data: string | Record<string, any>): ProductModel {
    const model = new ProductModel();
    let obj: Record<string, any> = {};

    if (typeof data === "string") {
      try {
        obj = JSON.parse(data);
      } catch (error) {
        return model;
      }
    } else {
      obj = data;
    }

    const modelKeys = Object.keys(model);
    for (const key of Object.keys(obj)) {
      if (modelKeys.includes(key)) {
        (model as any)[key] = obj[key];
      }
    }
    return model;
  }

  /**
   * Helper: Returns the main image URL if `feature_photo` exists,
   * else returns a fallback placeholder.
   */
  getMainImage(): string {
    return this.feature_photo
      ? Utils.img(this.feature_photo)
      : Utils.img("media/products/placeholder.png");
  }

  /**
   * Helper: Parses `rates` JSON to get a second/hover image, if available.
   */
  getHoverImage(): string | null {
    try {
      const parsed = JSON.parse(this.rates || "[]");
      if (Array.isArray(parsed) && parsed[1]?.src) {
        return Utils.img(parsed[1].src);
      }
    } catch (err) {
      console.warn("Failed to parse rates for product:", this.id, err);
    }
    return null;
  }

  /**
   * Helper: Returns price_1 formatted to 2 decimals with UGX as currency.
   */
  getFormattedPrice(): string {
    return Utils.moneyFormat(this.price_1);
  }

  /** Fetch a paginated list of products (GET /products). */
  static async fetchProducts(
    page = 1,
    params: Record<string, string | number> = {}
  ): Promise<PaginatedResponse<ProductModel>> {
    try {
      const queryParams = new URLSearchParams({
        page: String(page),
        ...Object.fromEntries(
          Object.entries(params).map(([key, val]) => [key, String(val)])
        ),
      });
      const response = await http_get(`/products?${queryParams.toString()}`);
      if (response.code !== 1) {
        throw new Error(response.message || "Failed to fetch products.");
      }
      const paginatedData: PaginatedResponse<any> = response.data;
      paginatedData.data = paginatedData.data.map((item: any) =>
        ProductModel.fromJson(item)
      );
      return paginatedData as PaginatedResponse<ProductModel>;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  /** Fetch a single product by ID (GET /products/:id). */
  static async fetchProductById(id: string | number): Promise<ProductModel> {
    try {
      const response = await http_get(`/products/${id}`);
      if (response.code !== 1) {
        throw new Error(response.message || "Failed to fetch product.");
      }
      return ProductModel.fromJson(response.data);
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  }

  /** Create a new product (POST /products). */
  static async createProduct(
    productData: Partial<ProductModel>
  ): Promise<ProductModel> {
    try {
      const response = await http_post("/products", productData);
      if (response.code !== 1) {
        throw new Error(response.message || "Failed to create product.");
      }
      return ProductModel.fromJson(response.data);
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  /** Update product (PUT /products/:id). */
  static async updateProduct(
    id: string | number,
    productData: Partial<ProductModel>
  ): Promise<ProductModel> {
    try {
      const response = await http_post(
        `/products/${id}?_method=PUT`,
        productData
      );
      if (response.code !== 1) {
        throw new Error(response.message || "Failed to update product.");
      }
      return ProductModel.fromJson(response.data);
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  /** Delete product (DELETE /products/:id). */
  static async deleteProduct(id: string | number): Promise<boolean> {
    try {
      const response = await http_post(`/products/${id}?_method=DELETE`, {});
      if (response.code !== 1) {
        throw new Error(response.message || "Failed to delete product.");
      }
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}
export default ProductModel; 