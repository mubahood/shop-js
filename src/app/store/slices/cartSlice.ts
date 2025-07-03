// src/app/store/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductModel } from '../../models/ProductModel'; // Assuming ProductModel is used for cart items

interface CartItem {
  product: ProductModel;
  quantity: number;
  // Add variants if your cart needs to distinguish by them
  selectedVariants?: { [key: string]: string };
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number; // Sum of item prices
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: ProductModel; quantity: number; selectedVariants?: { [key: string]: string } }>) => {
      const { product, quantity, selectedVariants } = action.payload;
      const existingItem = state.items.find(
        item => item.product.id === product.id &&
        JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants) // Check variants for uniqueness
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity, selectedVariants });
      }

      state.totalQuantity += quantity;
      state.totalAmount += parseFloat(product.price_1) * quantity;
    },
    removeItem: (state, action: PayloadAction<{ productId: number; selectedVariants?: { [key: string]: string } }>) => {
      const { productId, selectedVariants } = action.payload;
      const itemIndex = state.items.findIndex(
        item => item.product.id === productId &&
        JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants)
      );

      if (itemIndex > -1) {
        const removedItem = state.items[itemIndex];
        state.totalQuantity -= removedItem.quantity;
        state.totalAmount -= parseFloat(removedItem.product.price_1) * removedItem.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    updateItemQuantity: (state, action: PayloadAction<{ productId: number; quantity: number; selectedVariants?: { [key: string]: string } }>) => {
      const { productId, quantity, selectedVariants } = action.payload;
      const existingItem = state.items.find(
        item => item.product.id === productId &&
        JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants)
      );

      if (existingItem) {
        state.totalQuantity += (quantity - existingItem.quantity);
        state.totalAmount += (parseFloat(existingItem.product.price_1) * (quantity - existingItem.quantity));
        existingItem.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;