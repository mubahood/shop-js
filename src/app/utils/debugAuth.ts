// src/app/utils/debugAuth.ts
import { DB_TOKEN, DB_LOGGED_IN_PROFILE } from "../../Constants";
import Utils from "../services/Utils";

/**
 * Debug utility to check authentication status
 */
export function debugAuthStatus() {
  console.log('=== Authentication Debug ===');
  
  const token = Utils.loadFromDatabase(DB_TOKEN);
  const user = Utils.loadFromDatabase(DB_LOGGED_IN_PROFILE);
  
  console.log('Token:', token ? `${token.substring(0, 10)}...` : 'NOT FOUND');
  console.log('User:', user ? { 
    id: user.id, 
    name: user.name || user.username || 'No name',
    email: user.email || 'No email' 
  } : 'NOT FOUND');
  
  if (!token) {
    console.log('❌ No authentication token found');
    console.log('User needs to login first');
    return false;
  }
  
  if (!user || !user.id) {
    console.log('❌ No user profile found');
    console.log('User profile data is missing');
    return false;
  }
  
  console.log('✅ Authentication data looks good');
  return true;
}

// Add to window for easy debugging
if (typeof window !== 'undefined') {
  (window as any).debugAuth = debugAuthStatus;
}
