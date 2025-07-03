// src/app/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  username: string;
  email: string;
  // Add more user properties as needed
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      // In a real app, you'd also save the token to localStorage here
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      // In a real app, you'd also remove the token from localStorage here
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;