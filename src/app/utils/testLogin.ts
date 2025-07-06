// src/app/utils/testLogin.ts
import { login } from '../services/Api';
import { debugAuthStatus } from './debugAuth';

/**
 * Test login functionality with debugging
 */
export async function testLogin(email: string, password: string) {
  console.log('🧪 Testing login...');
  console.log('Email:', email);
  
  try {
    console.log('📡 Calling login API...');
    const response = await login(email, password);
    console.log('✅ Login response:', response);
    
    // Check if authentication data was saved
    console.log('🔍 Checking saved auth data...');
    const authStatus = debugAuthStatus();
    
    if (authStatus) {
      console.log('🎉 Login test successful!');
      return { success: true, response };
    } else {
      console.log('❌ Login succeeded but auth data not saved properly');
      return { success: false, error: 'Auth data not saved' };
    }
  } catch (error) {
    console.log('❌ Login test failed:', error);
    return { success: false, error: (error as Error).message || 'Unknown error' };
  }
}

// Add to window for easy testing
if (typeof window !== 'undefined') {
  (window as any).testLogin = testLogin;
}
