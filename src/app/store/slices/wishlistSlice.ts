// src/app/store/slices/wishlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductWithExtras } from '../../types';

interface WishlistState {
  items: ProductWithExtras[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<ProductWithExtras>) => {
      const existingItem = state.items.find((item: ProductWithExtras) => item.id === action.payload.id);
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item: ProductWithExtras) => item.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    toggleWishlistItem: (state, action: PayloadAction<ProductWithExtras>) => {
      const existingItemIndex = state.items.findIndex((item: ProductWithExtras) => item.id === action.payload.id);
      if (existingItemIndex >= 0) {
        // Remove if exists
        state.items.splice(existingItemIndex, 1);
      } else {
        // Add if doesn't exist
        state.items.push(action.payload);
      }
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  setLoading,
  setError,
  toggleWishlistItem,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

// Selectors
export const selectWishlistItems = (state: { wishlist: WishlistState }) => state.wishlist.items;
export const selectWishlistCount = (state: { wishlist: WishlistState }) => state.wishlist.items.length;
export const selectIsInWishlist = (productId: number) => (state: { wishlist: WishlistState }) =>
  state.wishlist.items.some((item: ProductWithExtras) => item.id === productId);
export const selectWishlistLoading = (state: { wishlist: WishlistState }) => state.wishlist.isLoading;
export const selectWishlistError = (state: { wishlist: WishlistState }) => state.wishlist.error;
