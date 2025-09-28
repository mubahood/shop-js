// src/app/utils/paymentUtils.ts

import { PAYMENT_CONFIG, ORDER_CONFIG } from '../constants';
import { OrderModel } from '../models/OrderModel';

/**
 * Utility functions for handling payment and pay on delivery logic
 */

/**
 * Check if an order is pay on delivery
 */
export const isPayOnDelivery = (order: any): boolean => {
  if (!order) return false;
  
  // Check multiple ways the pay on delivery flag can be set
  return order.pay_on_delivery === true ||
         order.pay_on_delivery === 1 ||
         order.pay_on_delivery === '1' ||
         order.pay_on_delivery === 'true' ||
         order.payment_gateway === PAYMENT_CONFIG.GATEWAYS.CASH_ON_DELIVERY ||
         order.payment_status === PAYMENT_CONFIG.PAYMENT_STATUS.PAY_ON_DELIVERY;
};

/**
 * Check if an order requires online payment
 */
export const requiresOnlinePayment = (order: any): boolean => {
  if (!order) return false;
  
  // If it's pay on delivery, no online payment required
  if (isPayOnDelivery(order)) return false;
  
  // Check if payment is already completed
  if (order.payment_confirmation === 'PAID' || 
      order.payment_status === PAYMENT_CONFIG.PAYMENT_STATUS.COMPLETED) {
    return false;
  }
  
  return true;
};

/**
 * Get payment method display name
 */
export const getPaymentMethodLabel = (order: any): string => {
  if (!order) return 'Unknown';
  
  if (isPayOnDelivery(order)) {
    return PAYMENT_CONFIG.PAY_ON_DELIVERY.LABEL;
  }
  
  switch (order.payment_gateway) {
    case PAYMENT_CONFIG.GATEWAYS.PESAPAL:
      return 'Pesapal';
    case PAYMENT_CONFIG.GATEWAYS.STRIPE:
      return 'Stripe';
    case PAYMENT_CONFIG.GATEWAYS.MANUAL:
      return 'Manual Payment';
    default:
      return 'Online Payment';
  }
};

/**
 * Get payment status display information
 */
export const getPaymentStatusInfo = (order: any): { label: string; color: string; icon: string } => {
  if (!order) {
    return { label: 'Unknown', color: 'secondary', icon: 'bi-question-circle' };
  }
  
  if (isPayOnDelivery(order)) {
    return {
      label: 'Pay on Delivery',
      color: 'success',
      icon: 'bi-cash-coin'
    };
  }
  
  // Check if paid
  if (order.payment_confirmation === 'PAID' || 
      order.payment_status === PAYMENT_CONFIG.PAYMENT_STATUS.COMPLETED) {
    return {
      label: 'Paid',
      color: 'success',
      icon: 'bi-check-circle-fill'
    };
  }
  
  // Pending payment
  if (order.payment_status === PAYMENT_CONFIG.PAYMENT_STATUS.PENDING ||
      order.payment_status === 'PENDING_PAYMENT') {
    return {
      label: 'Payment Pending',
      color: 'warning',
      icon: 'bi-clock'
    };
  }
  
  // Failed payment
  if (order.payment_status === PAYMENT_CONFIG.PAYMENT_STATUS.FAILED) {
    return {
      label: 'Payment Failed',
      color: 'danger',
      icon: 'bi-x-circle'
    };
  }
  
  return {
    label: 'Payment Required',
    color: 'primary',
    icon: 'bi-credit-card'
  };
};

/**
 * Check if order can be paid now
 */
export const canPayNow = (order: any): boolean => {
  if (!order) return false;
  
  // Can't pay if it's pay on delivery (will pay on delivery)
  if (isPayOnDelivery(order)) return false;
  
  // Can't pay if already paid
  if (order.payment_confirmation === 'PAID') return false;
  
  // Can't pay if order is cancelled or failed
  if (order.order_state === ORDER_CONFIG.STATES.CANCELLED || 
      order.order_state === ORDER_CONFIG.STATES.FAILED) {
    return false;
  }
  
  return true;
};

/**
 * Get appropriate call-to-action text for an order
 */
export const getOrderActionText = (order: any): string => {
  if (!order) return 'View Order';
  
  if (isPayOnDelivery(order)) {
    return 'Track Order';
  }
  
  if (canPayNow(order)) {
    return 'Pay Now';
  }
  
  return 'View Order';
};

/**
 * Validate pay on delivery option based on order details
 */
export const validatePayOnDelivery = (orderTotal: number, deliveryLocation?: string): { 
  isValid: boolean; 
  reason?: string 
} => {
  // Pay on delivery is always available regardless of order total or location
  return { isValid: true };
};

export default {
  isPayOnDelivery,
  requiresOnlinePayment,
  getPaymentMethodLabel,
  getPaymentStatusInfo,
  canPayNow,
  getOrderActionText,
  validatePayOnDelivery,
};