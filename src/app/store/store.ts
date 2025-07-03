// src/app/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Import your API services
import { productsApi } from '../services/productsApi';

// Import your Redux slices
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    // Add your RTK Query API reducers
    [productsApi.reducerPath]: productsApi.reducer,

    // Add your regular Redux slices here
    cart: cartReducer,
    auth: authReducer,
    notification: notificationReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of RTK Query.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

// Optional: Required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Define RootState and AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;