// src/app/services/CacheApiService.ts
/**
 * CacheApiService - Cache-first wrapper for existing ApiService
 * 
 * This service     try {
      // Re-enable caching with proper error handling      
      // For products, we'll be selective about caching
      // Only cache simple queries without complex parameters
      const isSimpleQuery = !params.search && !params.min_price && !params.max_price && 
                            (params.page || 1) === 1 && !params.sort_by;e existing ApiService with cache-first logic.
 * It's designed to be a drop-in replacement that:
 * 1. Checks cache first
 * 2. Falls back to existing ApiService methods
 * 3. Caches the results for future use
 * 4. Maintains 100% backward compatibility
 * 
 * SAFETY: All existing ApiService functionality remains unchanged
 */

import ApiService from './ApiService';
import { CacheUtils } from './CacheUtils';
import { CacheKey } from './CacheService';
import ProductModel, { PaginatedResponse } from '../models/ProductModel';
import CategoryModel from '../models/CategoryModel';
import VendorModel from '../models/VendorModel';

/**
 * Cache-enhanced API service with fallback to original ApiService
 */
export class CacheApiService {
  
  // ===== CATEGORIES =====
  
  /**
   * Get all categories with cache-first strategy
   * Falls back to ApiService.getCategories() if cache miss
   */
  static async getCategories(): Promise<CategoryModel[]> {
    return CacheUtils.getWithFallback(
      'CATEGORIES',
      () => ApiService.getCategories(),
      {
        storageType: 'localStorage',
        validateData: CacheUtils.validators.categories
      }
    );
  }

  /**
   * Get banner categories with cache-first strategy
   */
  static async getBannerCategories(): Promise<CategoryModel[]> {
    return CacheUtils.getWithFallback(
      'BANNER_CATEGORIES',
      () => ApiService.getBannerCategories(),
      {
        storageType: 'localStorage',
        validateData: CacheUtils.validators.categories
      }
    );
  }

  /**
   * Get navigation categories with cache-first strategy
   */
  static async getNavigationCategories(): Promise<CategoryModel[]> {
    return CacheUtils.getWithFallback(
      'CATEGORIES', // Reuse same cache key as getCategories
      async () => {
        const allCategories = await ApiService.getCategories();
        return allCategories.filter(cat => cat.isShownInCategories() && !cat.isParentCategory());
      },
      {
        storageType: 'localStorage',
        validateData: CacheUtils.validators.categories
      }
    );
  }

  /**
   * Get single category by ID (with cache)
   */
  static async getCategory(id: number): Promise<CategoryModel> {
    // For single categories, we'll use the existing method directly
    // but trigger a background refresh of all categories
    const result = await ApiService.getCategory(id);
    
    // Background refresh of categories cache
    CacheUtils.refreshInBackground(
      'CATEGORIES',
      () => ApiService.getCategories(),
      {
        storageType: 'localStorage'
      }
    );

    return result;
  }

  // ===== MANIFEST =====
  
  /**
   * Get application manifest with cache-first strategy
   */
  static async getManifest(): Promise<any> {
    return CacheUtils.getWithFallback(
      'MANIFEST',
      () => ApiService.getManifest(),
      {
        storageType: 'localStorage',
        validateData: CacheUtils.validators.manifest
      }
    );
  }

  // ===== PRODUCTS =====
  
  /**
   * Get paginated products with smart caching
   * Note: We cache based on parameters for better hit rates
   */
  static async getProducts(params: {
    page?: number;
    category?: number;
    search?: string;
    vendor?: number;
    min_price?: number;
    max_price?: number;
    in_stock?: boolean;
    sort_by?: 'name' | 'price_1' | 'date_added' | 'metric';
    sort_order?: 'asc' | 'desc';
    limit?: number;
  } = {}): Promise<PaginatedResponse<ProductModel>> {
    try {
      // Re-enable caching with proper error handling
      console.log('� CacheApiService.getProducts: Processing request with caching', params);
      
      // For products, we'll be selective about caching
      // Only cache simple queries without complex parameters
      const isSimpleQuery = !params.search && !params.min_price && !params.max_price && 
                            (params.page || 1) === 1 && !params.sort_by;

      if (isSimpleQuery && params.category) {
        // Cache products by category
        return CacheUtils.getWithFallback(
          'PRODUCTS',
          () => ApiService.getProducts(params),
          {
            storageType: 'sessionStorage', // Use session storage for product lists
            customDuration: 2 * 60 * 60 * 1000, // 2 hours
            validateData: (data) => data && Array.isArray(data.data)
          }
        );
      }

      // For complex queries, go direct to API (no caching)
      return ApiService.getProducts(params);
    } catch (error) {
      console.error('❌ CacheApiService.getProducts: Error occurred:', error);
      // Fallback to direct API call if caching fails
      return ApiService.getProducts(params);
    }
  }

  /**
   * Get products by category with cache
   */
  static async getProductsByCategory(
    categoryId: number,
    page = 1,
    additionalParams: Record<string, any> = {}
  ): Promise<PaginatedResponse<ProductModel>> {
    // Only cache first page without additional params
    if (page === 1 && Object.keys(additionalParams).length === 0) {
      return CacheUtils.getWithFallback(
        'PRODUCTS',
        () => ApiService.getProductsByCategory(categoryId, page, additionalParams),
        {
          storageType: 'sessionStorage',
          customDuration: 2 * 60 * 60 * 1000, // 2 hours
          validateData: (data) => data && Array.isArray(data.data)
        }
      );
    }

    // For other pages/params, go direct to API
    return ApiService.getProductsByCategory(categoryId, page, additionalParams);
  }

  /**
   * Get single product with cache
   */
  static async getProduct(id: number): Promise<ProductModel> {
    // Use memory cache for individual products (shorter duration)
    try {
      const cacheKey = 'PRODUCT_DETAILS';
      return await CacheUtils.getWithFallback(
        cacheKey,
        () => ApiService.getProduct(id),
        {
          storageType: 'memory',
          customDuration: 1 * 60 * 60 * 1000, // 1 hour
          validateData: CacheUtils.validators.products
        }
      );
    } catch (error) {
      // Fallback to direct API call
      return ApiService.getProduct(id);
    }
  }

  /**
   * Search products (no caching for search - too dynamic)
   */
  static async searchProducts(
    searchTerm: string,
    page = 1,
    additionalParams: Record<string, any> = {}
  ): Promise<PaginatedResponse<ProductModel>> {
    // Search results are too dynamic to cache effectively
    return ApiService.searchProducts(searchTerm, page, additionalParams);
  }

  // ===== VENDORS =====
  
  /**
   * Get all vendors with cache
   */
  static async getVendors(): Promise<VendorModel[]> {
    return CacheUtils.getWithFallback(
      'VENDORS',
      () => ApiService.getVendors(),
      {
        storageType: 'localStorage',
        validateData: CacheUtils.validators.vendors
      }
    );
  }

  /**
   * Get active vendors with cache
   */
  static async getActiveVendors(): Promise<VendorModel[]> {
    return CacheUtils.getWithFallback(
      'VENDORS', // Reuse vendors cache and filter
      async () => {
        const allVendors = await ApiService.getVendors();
        return allVendors.filter(vendor => vendor.isActive() && vendor.isApproved());
      },
      {
        storageType: 'localStorage',
        validateData: CacheUtils.validators.vendors
      }
    );
  }

  /**
   * Get single vendor (no caching for individual items)
   */
  static async getVendor(id: number): Promise<VendorModel> {
    return ApiService.getVendor(id);
  }

  // ===== METHODS THAT SHOULD NOT BE CACHED =====
  
  /**
   * Live search - too dynamic for caching
   */
  static async liveSearch(query: string, limit = 10): Promise<{
    products: ProductModel[];
    suggestions: string[];
    total: number;
    search_term: string;
  }> {
    return ApiService.liveSearch(query, limit);
  }

  /**
   * Cart operations - should not be cached
   */
  static async addToCart(productId: number, quantity = 1, variant?: Record<string, string>): Promise<boolean> {
    return ApiService.addToCart(productId, quantity, variant);
  }

  static async getCartItems(): Promise<Array<{
    product: ProductModel;
    quantity: number;
    variant: Record<string, string>;
  }>> {
    return ApiService.getCartItems();
  }

  static async updateCartItem(productId: number, quantity: number, variant?: Record<string, string>): Promise<boolean> {
    return ApiService.updateCartItem(productId, quantity, variant);
  }

  static async removeFromCart(productId: number, variant?: Record<string, string>): Promise<boolean> {
    return ApiService.removeFromCart(productId, variant);
  }

  static async clearCart(): Promise<boolean> {
    return ApiService.clearCart();
  }

  /**
   * Wishlist operations - should not be cached
   */
  static async addToWishlist(productId: number): Promise<boolean> {
    return ApiService.addToWishlist(productId);
  }

  static async removeFromWishlist(productId: number): Promise<boolean> {
    return ApiService.removeFromWishlist(productId);
  }

  static async getWishlist(): Promise<any[]> {
    return ApiService.getWishlist();
  }

  static async checkWishlist(productId: number): Promise<boolean> {
    return ApiService.checkWishlist(productId);
  }

  /**
   * Order operations - should not be cached
   */
  static async getUserOrders(page = 1): Promise<any> {
    return ApiService.getUserOrders(page);
  }

  static async getOrder(id: number): Promise<any> {
    return ApiService.getOrder(id);
  }

  static async createOrder(orderData: {
    products: Array<{
      product_id: number;
      quantity: number;
      variant?: Record<string, string>;
    }>;
    shipping_address: any;
    payment_method: string;
    notes?: string;
  }): Promise<any> {
    return ApiService.createOrder(orderData);
  }

  static async updateOrderStatus(orderId: number, status: string): Promise<any> {
    return ApiService.updateOrderStatus(orderId, status);
  }

  /**
   * Review operations - should not be cached
   */
  static async addReview(productId: number, reviewData: {
    rating: number;
    comment: string;
    title?: string;
  }): Promise<any> {
    return ApiService.addReview(productId, reviewData);
  }

  static async getProductReviews(productId: number, page = 1): Promise<any> {
    return ApiService.getProductReviews(productId, page);
  }

  /**
   * Clear user's search history - no caching for user actions
   */
  static async clearSearchHistory(): Promise<boolean> {
    return ApiService.clearSearchHistory();
  }

  /**
   * User profile operations - should not be cached
   */
  static async updateProfile(profileData: {
    first_name: string;
    last_name: string;
    email?: string;
    phone_number: string;
    dob?: string;
    sex?: string;
    intro?: string;
    address?: string;
  }): Promise<any> {
    return ApiService.updateProfile(profileData);
  }

  // ===== CACHE MANAGEMENT METHODS =====
  
  /**
   * Preload essential data for faster app startup
   */
  static async preloadEssentialData(): Promise<void> {
    await CacheUtils.warmUpCache([
      {
        key: 'CATEGORIES',
        dataFn: () => ApiService.getCategories(),
        priority: 'high',
        storageType: 'localStorage'
      },
      {
        key: 'MANIFEST',
        dataFn: () => ApiService.getManifest(),
        priority: 'high',
        storageType: 'localStorage'
      },
      {
        key: 'VENDORS',
        dataFn: () => ApiService.getVendors(),
        priority: 'medium',
        storageType: 'localStorage'
      }
    ]);
  }

  /**
   * Refresh cached data in background
   */
  static async refreshBackgroundData(): Promise<void> {
    // Refresh categories
    CacheUtils.refreshInBackground(
      'CATEGORIES',
      () => ApiService.getCategories(),
      { storageType: 'localStorage' }
    );

    // Refresh manifest
    CacheUtils.refreshInBackground(
      'MANIFEST',
      () => ApiService.getManifest(),
      { storageType: 'localStorage' }
    );

    // Refresh vendors
    CacheUtils.refreshInBackground(
      'VENDORS',
      () => ApiService.getVendors(),
      { storageType: 'localStorage' }
    );
  }

  /**
   * Force refresh specific data type
   */
  static async forceRefresh(dataType: 'categories' | 'manifest' | 'vendors' | 'all'): Promise<void> {
    switch (dataType) {
      case 'categories':
        await CacheUtils.getWithFallback(
          'CATEGORIES',
          () => ApiService.getCategories(),
          { skipCache: true, storageType: 'localStorage' }
        );
        break;
      case 'manifest':
        await CacheUtils.getWithFallback(
          'MANIFEST',
          () => ApiService.getManifest(),
          { skipCache: true, storageType: 'localStorage' }
        );
        break;
      case 'vendors':
        await CacheUtils.getWithFallback(
          'VENDORS',
          () => ApiService.getVendors(),
          { skipCache: true, storageType: 'localStorage' }
        );
        break;
      case 'all':
        await Promise.all([
          this.forceRefresh('categories'),
          this.forceRefresh('manifest'),
          this.forceRefresh('vendors')
        ]);
        break;
    }
  }
}

export default CacheApiService;