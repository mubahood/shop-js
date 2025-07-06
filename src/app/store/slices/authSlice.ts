// src/app/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DB_TOKEN, DB_LOGGED_IN_PROFILE } from '../../../Constants';
import { ProfileModel } from '../../models/ProfileModel';
import Utils from '../../services/Utils';
import { loginUser as apiLogin, registerUser as apiRegister } from '../../services/AuthService';

export interface AuthState {
  isAuthenticated: boolean;
  user: ProfileModel | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// Initialize state from localStorage using Utils
const initializeAuthState = (): AuthState => {
  const savedUser = Utils.loadFromDatabase(DB_LOGGED_IN_PROFILE);
  const savedToken = Utils.loadFromDatabase(DB_TOKEN);
  
  if (savedUser && savedToken) {
    const userProfile = ProfileModel.fromJson(JSON.stringify(savedUser));
    return {
      isAuthenticated: true,
      user: userProfile,
      token: savedToken,
      isLoading: false,
      error: null,
    };
  }
  
  return {
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,
    error: null,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initializeAuthState(),
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    
    loginSuccess: (state, action: PayloadAction<{ user: ProfileModel; token: string }>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      
      // Save to localStorage using Utils
      Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, action.payload.user);
      Utils.saveToDatabase(DB_TOKEN, action.payload.token);
    },
    
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
      
      // Clear localStorage using Utils
      Utils.removeFromDatabase(DB_LOGGED_IN_PROFILE);
      Utils.removeFromDatabase(DB_TOKEN);
    },
    
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      state.isLoading = false;
      
      // Clear localStorage using Utils
      Utils.removeFromDatabase(DB_LOGGED_IN_PROFILE);
      Utils.removeFromDatabase(DB_TOKEN);
    },
    
    updateProfile: (state, action: PayloadAction<Partial<ProfileModel>>) => {
      if (state.user) {
        state.user.updateProfile(action.payload);
        // Update localStorage using Utils
        Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, state.user);
      }
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    // Legacy action for compatibility
    setCredentials: (state, action: PayloadAction<{ user: ProfileModel; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      
      // Save to localStorage using Utils
      Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, action.payload.user);
      Utils.saveToDatabase(DB_TOKEN, action.payload.token);
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateProfile,
  clearError,
  setCredentials,
} = authSlice.actions;

export default authSlice.reducer;

// Async thunk actions using your API pattern
export const loginUser = (credentials: { email: string; password: string }) => {
  return async (dispatch: any) => {
    dispatch(loginStart());
    
    try {
      // Use AuthService login function
      const userProfile = await apiLogin({
        username: credentials.email,
        password: credentials.password
      });
      
      // Get token from localStorage (AuthService already saved it)
      const token = Utils.loadFromDatabase(DB_TOKEN);
      
      if (!token) {
        throw new Error('No token received from server');
      }
      
      dispatch(loginSuccess({ user: userProfile, token }));
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch(loginFailure(errorMessage));
      return { success: false, error: errorMessage };
    }
  };
};

export const registerUser = (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  return async (dispatch: any) => {
    dispatch(loginStart());
    
    try {
      // Use AuthService register function
      const userProfile = await apiRegister({
        username: userData.email,
        password: userData.password,
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email
      });
      
      // Get token from localStorage (AuthService already saved it)
      const token = Utils.loadFromDatabase(DB_TOKEN);
      
      if (!token) {
        throw new Error('No token received from server');
      }
      
      dispatch(loginSuccess({ user: userProfile, token }));
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch(loginFailure(errorMessage));
      return { success: false, error: errorMessage };
    }
  };
};

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

// Additional selectors for user information
export const selectUserName = (state: { auth: AuthState }) => {
  const user = state.auth.user;
  if (!user) return '';
  return user.fullName || `${user.first_name} ${user.last_name}`.trim() || user.name || user.username;
};

export const selectUserAvatar = (state: { auth: AuthState }) => {
  const user = state.auth.user;
  if (!user) return '';
  return Utils.img(user.avatar);
};