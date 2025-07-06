// src/app/utils/quickLoginTest.ts
import { debugLogin } from './authDebugger';

/**
 * Quick login test function that can be called from browser console
 */
export async function quickLogin() {
  console.log('🧪 Quick Login Test');
  console.log('This will test login with sample credentials');
  console.log('Replace with your actual credentials when testing');
  
  // You can replace these with real credentials for testing
  const testEmail = 'test@example.com';
  const testPassword = 'password123';
  
  console.log(`Testing with: ${testEmail}`);
  
  const result = await debugLogin(testEmail, testPassword);
  
  if (result) {
    console.log('🎉 Login test completed - check the output above for response details');
  } else {
    console.log('❌ Login test failed - check console for errors');
  }
  
  return result;
}

// Instructions for manual testing
export function loginInstructions() {
  console.log(`
🔍 LOGIN TESTING INSTRUCTIONS:

1. Open browser console (F12)

2. Test with your credentials:
   debugLogin("your-email@example.com", "your-password")

3. Check the console output for:
   - Raw API response
   - Response structure analysis
   - Token field detection

4. If you see a token, try manual authentication:
   manualAuth("your-email@example.com", "your-password")

5. Verify auth status:
   debugAuth()

6. If all works, try the checkout flow!

Available commands:
- quickLogin() - Test with sample credentials
- debugLogin(email, password) - See raw API response
- manualAuth(email, password) - Manual authentication
- debugAuth() - Check current auth status
  `);
}

// Add to window for easy access
if (typeof window !== 'undefined') {
  (window as any).quickLogin = quickLogin;
  (window as any).loginInstructions = loginInstructions;
}
