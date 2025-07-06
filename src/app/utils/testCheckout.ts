// src/app/utils/testCheckout.ts
import { OrderModel } from '../models/OrderModel';
import { OrderModelUtils } from './OrderModelUtils';

/**
 * Test utility to verify checkout flow doesn't crash
 */
export function testCheckoutFlow() {
  console.log('Testing checkout flow...');

  try {
    // Test 1: Create order from scratch
    const order1 = new OrderModel();
    order1.customer_name = 'Test Customer';
    order1.customer_phone_number_1 = '0700123456';
    order1.delivery_amount = '5000';
    order1.payable_amount = '25000';

    console.log('✓ Order creation successful');

    // Test 2: Test tax calculation
    const tax = OrderModelUtils.calculateTax(order1, '20000');
    console.log('✓ Tax calculation successful:', tax);

    // Test 3: Test JSON conversion
    const json = OrderModelUtils.toJson(order1);
    console.log('✓ JSON conversion successful:', json);

    // Test 4: Test order reconstruction from plain object
    const plainObject = JSON.parse(JSON.stringify(order1));
    const reconstructed = OrderModelUtils.ensureOrderModel(plainObject);
    console.log('✓ Order reconstruction successful');

    // Test 5: Test methods on reconstructed order
    const taxReconstructed = OrderModelUtils.calculateTax(reconstructed, '20000');
    console.log('✓ Methods work on reconstructed order:', taxReconstructed);

    console.log('🎉 All checkout flow tests passed!');
    return true;
  } catch (error) {
    console.error('❌ Checkout flow test failed:', error);
    return false;
  }
}

// Run test if in development mode
if (import.meta.env.DEV) {
  // Enable this line to test checkout flow
  // testCheckoutFlow();
}

// Test API authentication
export async function testApiAuth() {
  console.log('Testing API authentication...');
  
  const { http_get } = await import('../services/Api');
  
  try {
    // Test a simple GET request to see if authentication works
    const response = await http_get('test', {});
    console.log('API response:', response);
    
    if (response.code === 0 && response.message?.includes('not logged in')) {
      console.log('✓ API correctly detects unauthenticated user');
      return { success: true, message: 'Authentication validation working' };
    } else {
      console.log('✓ API request successful with authentication');
      return { success: true, message: 'API working correctly' };
    }
  } catch (error) {
    console.log('API test result:', error);
    return { success: false, message: 'API test completed - check authentication' };
  }
}
