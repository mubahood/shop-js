// src/app/utils/authDebugger.ts
import { http_post } from '../services/Api';
import { DB_TOKEN, DB_LOGGED_IN_PROFILE } from '../../Constants';
import Utils from '../services/Utils';

/**
 * Debug authentication by testing the raw API response
 */
export async function debugLogin(email: string, password: string) {
  console.log('🔍 DEBUG: Testing raw login API call...');
  
  try {
    // Make raw API call to see exact response
    console.log('📡 Making raw API call to users/login...');
    const rawResponse = await http_post('users/login', {
      username: email,
      password: password
    });
    
    console.log('📋 Raw API Response:', JSON.stringify(rawResponse, null, 2));
    
    // Analyze response structure
    console.log('🔍 Response Analysis:');
    console.log('- Type:', typeof rawResponse);
    console.log('- Code:', rawResponse?.code);
    console.log('- Message:', rawResponse?.message);
    console.log('- Data type:', typeof rawResponse?.data);
    console.log('- Data keys:', rawResponse?.data ? Object.keys(rawResponse.data) : 'No data');
    
    if (rawResponse?.data) {
      console.log('🔑 Looking for token fields in data:');
      const data = rawResponse.data;
      console.log('- remember_token:', data.remember_token ? `${data.remember_token.substring(0, 10)}...` : 'NOT FOUND');
      console.log('- token:', data.token ? `${data.token.substring(0, 10)}...` : 'NOT FOUND');
      console.log('- access_token:', data.access_token ? `${data.access_token.substring(0, 10)}...` : 'NOT FOUND');
      console.log('- All data fields:', Object.keys(data));
    }
    
    return rawResponse;
  } catch (error) {
    console.error('❌ Raw API call failed:', error);
    return null;
  }
}

/**
 * Manual authentication for testing
 */
export async function manualAuth(email: string, password: string) {
  console.log('🧪 Manual authentication test...');
  
  const rawResponse = await debugLogin(email, password);
  
  if (!rawResponse || rawResponse.code !== 1) {
    console.log('❌ Authentication failed or invalid response');
    return false;
  }
  
  const userData = rawResponse.data;
  if (!userData) {
    console.log('❌ No user data in response');
    return false;
  }
  
  // Try to find token in different fields
  const token = userData.remember_token || userData.token || userData.access_token;
  
  if (!token) {
    console.log('❌ No token found in any expected field');
    console.log('Available fields:', Object.keys(userData));
    return false;
  }
  
  try {
    console.log('💾 Saving authentication data...');
    Utils.saveToDatabase(DB_TOKEN, token);
    Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, userData);
    
    console.log('✅ Authentication data saved successfully');
    console.log('Token:', `${token.substring(0, 10)}...`);
    console.log('User ID:', userData.id);
    console.log('User Name:', userData.name || userData.username || 'Not provided');
    
    return true;
  } catch (error) {
    console.error('❌ Failed to save auth data:', error);
    return false;
  }
}

// Add to window for debugging
if (typeof window !== 'undefined') {
  (window as any).debugLogin = debugLogin;
  (window as any).manualAuth = manualAuth;
}
