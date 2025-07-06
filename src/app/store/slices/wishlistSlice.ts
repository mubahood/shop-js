// src/app/store/slices/wishlistSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductWithExtras } from '../../types';
import ApiService from '../../services/ApiService';

interface WishlistItem {
  id: number;
  user_id: number;
  product_id: number;
  product_name: string;
  product_price: string;
  product_sale_price?: string;
  product_photo?: string;
  created_at: string;
  updated_at: string;
}

interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  isLoading: false,
  error: null,
};

// Async thunks for API integration
export const loadWishlistFromAPI = createAsyncThunk(
  'wishlist/loadFromAPI',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const wishlistItems = await ApiService.getWishlist();
      // Update manifest wishlist count when loading from API
      const { updateCounts } = await import('./manifestSlice');
      dispatch(updateCounts({ wishlist_count: wishlistItems.length }));
      return wishlistItems;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load wishlist');
    }
  }
);

export const addToWishlistAPI = createAsyncThunk(
  'wishlist/addToAPI',
  async (productId: number, { rejectWithValue, dispatch }) => {
    try {
      await ApiService.addToWishlist(productId);
      // Update manifest wishlist count
      const { incrementWishlistCount } = await import('./manifestSlice');
      dispatch(incrementWishlistCount());
      return productId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add to wishlist');
    }
  }
);

export const removeFromWishlistAPI = createAsyncThunk(
  'wishlist/removeFromAPI',
  async (productId: number, { rejectWithValue, dispatch }) => {
    try {
      await ApiService.removeFromWishlist(productId);
      // Update manifest wishlist count
      const { decrementWishlistCount } = await import('./manifestSlice');
      dispatch(decrementWishlistCount());
      return productId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to remove from wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const existingItem = state.items.find((item: WishlistItem) => item.product_id === action.payload.product_id);
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item: WishlistItem) => item.product_id !== action.payload);
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
    setWishlistItems: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load wishlist
      .addCase(loadWishlistFromAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadWishlistFromAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(loadWishlistFromAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add to wishlist
      .addCase(addToWishlistAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToWishlistAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        // The actual item will be loaded when we refresh the wishlist
      })
      .addCase(addToWishlistAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Remove from wishlist
      .addCase(removeFromWishlistAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromWishlistAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(item => item.product_id !== action.payload);
      })
      .addCase(removeFromWishlistAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  setLoading,
  setError,
  setWishlistItems,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

// Selectors
export const selectWishlistItems = (state: { wishlist: WishlistState }) => state.wishlist.items;
export const selectWishlistCount = (state: { wishlist: WishlistState }) => state.wishlist.items.length;
export const selectIsInWishlist = (productId: number) => (state: { wishlist: WishlistState }) =>
  state.wishlist.items.some((item: WishlistItem) => item.product_id === productId);
export const selectWishlistLoading = (state: { wishlist: WishlistState }) => state.wishlist.isLoading;
export const selectWishlistError = (state: { wishlist: WishlistState }) => state.wishlist.error;
