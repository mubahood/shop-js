// src/app/components/AppInitializer.tsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import { loadWishlistFromAPI } from '../store/slices/wishlistSlice';
import { loadManifest, updateCartCount } from '../store/slices/manifestSlice';
import { useCart } from '../hooks/useCart';

/**
 * AppInitializer handles initialization logic when the app starts
 * - Loads application manifest with essential data
 * - Loads wishlist for authenticated users
 * - Syncs cart count with manifest
 * - Can be extended for other initialization tasks
 */
const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { cartCount } = useCart();

  // Load manifest on app start
  useEffect(() => {
    dispatch(loadManifest());
  }, [dispatch]);

  // Reload manifest when authentication status changes
  useEffect(() => {
    // Small delay to ensure auth state is settled
    const timer = setTimeout(() => {
      dispatch(loadManifest());
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, dispatch]);

  // Update cart count in manifest when cart changes
  useEffect(() => {
    dispatch(updateCartCount(cartCount));
  }, [cartCount, dispatch]);

  useEffect(() => {
    // Load user-specific data when authenticated
    if (isAuthenticated) {
      // Load wishlist from API
      dispatch(loadWishlistFromAPI());
    }
  }, [isAuthenticated, dispatch]);

  return <>{children}</>;
};

export default AppInitializer;
