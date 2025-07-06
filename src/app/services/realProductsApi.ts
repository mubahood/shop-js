// src/app/services/realProductsApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ProductModel, { PaginatedResponse } from '../models/ProductModel';
import CategoryModel from '../models/CategoryModel';
import { API_URL } from '../../Constants';
import Utils from './Utils';
import { DB_TOKEN, DB_LOGGED_IN_PROFILE } from '../../Constants';

// Create the RTK Query API
export const realProductsApi = createApi({
  reducerPath: 'realProductsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = Utils.loadFromDatabase(DB_TOKEN);
      const user = Utils.loadFromDatabase(DB_LOGGED_IN_PROFILE);
      
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      
      if (user) {
        headers.set('HTTP_USER_ID', String(user.id));
        headers.set('user_id', String(user.id));
      }
      
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('tok', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ['Product', 'Category', 'Vendor'],
  endpoints: (builder) => ({
    
    // ===== PRODUCTS =====
    getProducts: builder.query<PaginatedResponse<ProductModel>, {
      page?: number;
      category?: number;
      search?: string;
      vendor?: number;
      min_price?: number;
      max_price?: number;
      in_stock?: boolean;
      sort_by?: string;
      sort_order?: string;
      limit?: number;
    }>({
      query: (params = {}) => {
        const { page = 1, in_stock, ...otherParams } = params;
        const queryParams: Record<string, string> = {
          page: String(page),
          ...Object.fromEntries(
            Object.entries(otherParams).map(([key, val]) => [key, String(val)])
          ),
        };
        
        if (in_stock !== undefined) {
          queryParams.in_stock = in_stock ? '1' : '0';
        }
        
        return `products?${new URLSearchParams(queryParams).toString()}`;
      },
      transformResponse: (response: any) => {
        // Handle Laravel API response structure
        if (response.code === 1 && response.data) {
          const paginatedData = response.data;
          paginatedData.data = paginatedData.data.map((item: any) =>
            ProductModel.fromJson(item)
          );
          return paginatedData as PaginatedResponse<ProductModel>;
        }
        throw new Error(response.message || 'Failed to fetch products');
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    getProductById: builder.query<ProductModel, number>({
      query: (id) => `products/${id}`,
      transformResponse: (response: any) => {
        if (response.code === 1) {
          return ProductModel.fromJson(response.data);
        }
        throw new Error(response.message || 'Product not found');
      },
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    // ===== CATEGORIES =====
    getCategories: builder.query<CategoryModel[], void>({
      query: () => 'categories',
      transformResponse: (response: any) => {
        if (response.code === 1 && Array.isArray(response.data)) {
          return response.data.map((item: any) => CategoryModel.fromJson(item));
        }
        return [];
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Category' as const, id })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }],
    }),

    getCategoryById: builder.query<CategoryModel, number>({
      query: (id) => `categories/${id}`,
      transformResponse: (response: any) => {
        if (response.code === 1) {
          return CategoryModel.fromJson(response.data);
        }
        throw new Error(response.message || 'Category not found');
      },
      providesTags: (result, error, id) => [{ type: 'Category', id }],
    }),

    // ===== VENDORS =====
    getVendors: builder.query<any[], void>({
      query: () => 'vendors',
      transformResponse: (response: any) => {
        if (response.code === 1 && Array.isArray(response.data)) {
          return response.data;
        }
        return [];
      },
      providesTags: [{ type: 'Vendor', id: 'LIST' }],
    }),

    // ===== SEARCH =====
    searchProducts: builder.query<PaginatedResponse<ProductModel>, {
      query: string;
      page?: number;
      filters?: Record<string, any>;
    }>({
      query: ({ query, page = 1, filters = {} }) => {
        const params = {
          search: query,
          page: String(page),
          ...Object.fromEntries(
            Object.entries(filters).map(([key, val]) => [key, String(val)])
          ),
        };
        return `products?${new URLSearchParams(params).toString()}`;
      },
      transformResponse: (response: any) => {
        if (response.code === 1 && response.data) {
          const paginatedData = response.data;
          paginatedData.data = paginatedData.data.map((item: any) =>
            ProductModel.fromJson(item)
          );
          return paginatedData as PaginatedResponse<ProductModel>;
        }
        throw new Error(response.message || 'Search failed');
      },
    }),

    // ===== ORDERS (requires authentication) =====
    getOrders: builder.query<any, { page?: number }>({
      query: ({ page = 1 }) => `orders?page=${page}`,
      transformResponse: (response: any) => {
        if (response.code === 1) {
          return response.data;
        }
        throw new Error(response.message || 'Failed to fetch orders');
      },
    }),

    getOrderById: builder.query<any, number>({
      query: (id) => `orders/${id}`,
      transformResponse: (response: any) => {
        if (response.code === 1) {
          return response.data;
        }
        throw new Error(response.message || 'Order not found');
      },
    }),

    // ===== MUTATIONS =====
    createOrder: builder.mutation<any, any>({
      query: (orderData) => ({
        url: 'orders',
        method: 'POST',
        body: orderData,
      }),
      transformResponse: (response: any) => {
        if (response.code === 1) {
          return response.data;
        }
        throw new Error(response.message || 'Failed to create order');
      },
    }),

    addToWishlist: builder.mutation<any, { product_id: number }>({
      query: (data) => ({
        url: 'wishlist',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => {
        if (response.code === 1) {
          return response.data;
        }
        throw new Error(response.message || 'Failed to add to wishlist');
      },
    }),

    removeFromWishlist: builder.mutation<any, number>({
      query: (productId) => ({
        url: `wishlist/${productId}`,
        method: 'DELETE',
      }),
      transformResponse: (response: any) => {
        if (response.code === 1) {
          return response.data;
        }
        throw new Error(response.message || 'Failed to remove from wishlist');
      },
    }),

    getWishlist: builder.query<ProductModel[], void>({
      query: () => 'wishlist',
      transformResponse: (response: any) => {
        if (response.code === 1 && Array.isArray(response.data)) {
          return response.data.map((item: any) => 
            ProductModel.fromJson(item.product || item)
          );
        }
        return [];
      },
    }),

    addProductReview: builder.mutation<any, {
      productId: number;
      rating: number;
      comment: string;
      title?: string;
    }>({
      query: ({ productId, ...reviewData }) => ({
        url: `products/${productId}/reviews`,
        method: 'POST',
        body: reviewData,
      }),
      transformResponse: (response: any) => {
        if (response.code === 1) {
          return response.data;
        }
        throw new Error(response.message || 'Failed to submit review');
      },
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Product', id: productId },
      ],
    }),

    getProductReviews: builder.query<any, { productId: number; page?: number }>({
      query: ({ productId, page = 1 }) => `products/${productId}/reviews?page=${page}`,
      transformResponse: (response: any) => {
        if (response.code === 1) {
          return response.data;
        }
        return { data: [], total: 0 };
      },
    }),
  }),
});

// Export hooks for components to use
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetVendorsQuery,
  useSearchProductsQuery,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetWishlistQuery,
  useAddProductReviewMutation,
  useGetProductReviewsQuery,
} = realProductsApi;
