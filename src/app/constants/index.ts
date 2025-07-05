// src/app/constants/index.ts

/**
 * Centralized application constants
 */

// ===================================================================
// API CONFIGURATION
// ===================================================================

export const API_CONFIG = {
  BASE_URL: "https://blit.blitxpress.com",
  API_URL: "https://blit.blitxpress.com/api",
  TIMEOUT: 5000,
  MAX_RETRIES: 3,
} as const;

// ===================================================================
// APPLICATION SETTINGS
// ===================================================================

export const APP_CONFIG = {
  NAME: "BlitXpress",
  CURRENCY: "UGX",
  DATE_FORMAT: "YYYY-MM-DD",
  LOGO: "https://skills-ug-api.8technologies.net/storage/images/8tech.png",
} as const;

// ===================================================================
// LOCAL STORAGE KEYS
// ===================================================================

export const STORAGE_KEYS = {
  CART_ITEMS: "CART_ITEMS",
  LOCAL_MANIFEST: "LOCAL_MANIFEST",
  LOCAL_DISTRICTS: "LOCAL_DISTRICTS",
  LOCAL_JOBSEEKER_MANIFEST: "LOCAL_JOBSEEKER_MANIFEST",
  USER_PREFERENCES: "USER_PREFERENCES",
  THEME: "THEME",
  // Auth-related storage keys
  DB_TOKEN: "DB_TOKEN",
  DB_LOGGED_IN_PROFILE: "DB_LOGGED_IN_PROFILE",
} as const;

// Legacy exports for backward compatibility
export const DB_TOKEN = STORAGE_KEYS.DB_TOKEN;
export const DB_LOGGED_IN_PROFILE = STORAGE_KEYS.DB_LOGGED_IN_PROFILE;
export const LOCAL_MANIFEST = STORAGE_KEYS.LOCAL_MANIFEST;
export const LOCAL_DISTRICTS = STORAGE_KEYS.LOCAL_DISTRICTS;
export const LOCAL_JOBSEEKER_MANIFEST = STORAGE_KEYS.LOCAL_JOBSEEKER_MANIFEST;
export const BASE_URL = API_CONFIG.BASE_URL;
export const API_URL = API_CONFIG.API_URL;

// ===================================================================
// UI CONSTANTS
// ===================================================================

export const BREAKPOINTS = {
  XS: 575.98,
  SM: 767.98,
  MD: 991.98,
  LG: 1199.98,
  XL: 1399.98,
} as const;

export const GRID_SETTINGS = {
  CONTAINER_MAX_WIDTH: 1200,
  PRODUCTS_PER_PAGE: 20,
  PRODUCTS_PER_ROW_DESKTOP: 4,
  PRODUCTS_PER_ROW_TABLET: 3,
  PRODUCTS_PER_ROW_MOBILE: 2,
} as const;

// ===================================================================
// PRODUCT SETTINGS
// ===================================================================

export const PRODUCT_CONFIG = {
  DEFAULT_IMAGE: "https://via.placeholder.com/300x300?text=No+Image",
  STOCK_WARNING_THRESHOLD: 10,
  LOW_STOCK_PERCENTAGE: 70,
  CRITICAL_STOCK_PERCENTAGE: 90,
} as const;

// ===================================================================
// NOTIFICATION SETTINGS
// ===================================================================

export const NOTIFICATION_CONFIG = {
  DURATION: {
    SHORT: 3000,
    MEDIUM: 5000,
    LONG: 8000,
  },
  POSITION: 'top-right' as const,
  MAX_NOTIFICATIONS: 5,
} as const;

// ===================================================================
// FORM VALIDATION
// ===================================================================

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const;

// ===================================================================
// ROUTES
// ===================================================================

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const;

// ===================================================================
// ERROR MESSAGES
// ===================================================================

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

// ===================================================================
// SUCCESS MESSAGES
// ===================================================================

export const SUCCESS_MESSAGES = {
  ITEM_ADDED_TO_CART: 'Item added to cart successfully!',
  ITEM_REMOVED_FROM_CART: 'Item removed from cart.',
  NEWSLETTER_SUBSCRIBED: 'Successfully subscribed to newsletter!',
  FORM_SUBMITTED: 'Form submitted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
} as const;
