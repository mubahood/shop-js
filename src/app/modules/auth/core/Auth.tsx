/* eslint-disable react-refresh/only-export-components */
import React, {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
// Simple splash screen component
const LayoutSplashScreen: FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div>Loading...</div>
  </div>
);

// Simple children wrapper type
interface WithChildren {
  children?: ReactNode;
}

import { AuthModel } from "./_models";
import * as authHelper from "./AuthHelpers";
import { DB_TOKEN, DB_LOGGED_IN_PROFILE } from "../../../constants";
import Utils from "../../../services/Utils";
import { ProfileModel } from "../../../models/ProfileModel";
import { CartItemModel } from "../../../models/CartItemModel"; // Import our CartItemModel class

// Define interface for ProductModel (extend as needed)
interface ProductModel {
  id: string;
  price: number;
  name?: string;
  mainImage?: string;
  // additional properties if needed
}

type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: ProfileModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<ProfileModel | undefined>>;
  logout: () => void;
  // Cart management properties:
  cartItems: CartItemModel[];
  addToCart: (product: ProductModel) => void;
  increase: (productId: string) => void;
  decrease: (productId: string) => void;
  totalCartAmount: number;
  isInCart: (productId: string) => boolean;
  clearCart: () => void;
  removeFromCart: (productId: string) => void;
};

const initAuthContextPropsState: AuthContextProps = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
  cartItems: [],
  addToCart: () => {},
  increase: () => {},
  decrease: () => {},
  totalCartAmount: 0,
  isInCart: () => false,
  clearCart: () => {},
  removeFromCart: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<ProfileModel | undefined>();

  // Initialize cartItems from local storage,
  // mapping saved items to CartItemModel instances.
  const [cartItems, setCartItems] = useState<CartItemModel[]>(() => {
    const saved = Utils.loadFromDatabase("CART_ITEMS");
    return saved
      ? JSON.parse(saved).map((item: any) => CartItemModel.fromJson(item))
      : [];
  });

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  // Persist cart items to localStorage.
  const saveCartItemsToLocalStorage = (items: CartItemModel[]) => {
    Utils.saveToDatabase("CART_ITEMS", JSON.stringify(items.map((item) => item.toJson())));
  };

  // Add product to cart: If already in cart, update quantity; otherwise, create a new instance.
  const addToCart = (product: ProductModel) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product_id === product.id);
      let newCartItems;
      if (existing) {
        newCartItems = prev.map((item) => {
          if (item.product_id === product.id) {
            const newQuantity = parseInt(item.product_quantity) + 1;
            return new CartItemModel(
              item.id,
              item.product_name,
              item.product_price_1,
              newQuantity.toString(),
              item.product_feature_photo,
              item.product_id,
              item.color,
              item.size,
              item.prices_json
            );
          }
          return item;
        });
      } else {
        const newItem = new CartItemModel(
          0,
          product.name || "",
          product.price.toString(),
          "1",
          product.mainImage || "",
          product.id,
          "", // color (if any)
          "", // size (if any)
          ""
        );
        newCartItems = [...prev, newItem];
      }
      saveCartItemsToLocalStorage(newCartItems);
      return newCartItems;
    });
  };

  // Increase product quantity in cart.
  const increase = (productId: string) => {
    setCartItems((prev) => {
      const newCartItems = prev.map((item) => {
        if (item.product_id === productId) {
          const newQuantity = parseInt(item.product_quantity) + 1;
          return new CartItemModel(
            item.id,
            item.product_name,
            item.product_price_1,
            newQuantity.toString(),
            item.product_feature_photo,
            item.product_id,
            item.color,
            item.size,
            item.prices_json
          );
        }
        return item;
      });
      saveCartItemsToLocalStorage(newCartItems);
      return newCartItems;
    });
  };

  // Decrease product quantity in cart; remove item if quantity falls to zero.
  const decrease = (productId: string) => {
    setCartItems((prev) => {
      const newCartItems = prev
        .map((item) => {
          if (item.product_id === productId) {
            const newQuantity = parseInt(item.product_quantity) - 1;
            if (newQuantity > 0) {
              return new CartItemModel(
                item.id,
                item.product_name,
                item.product_price_1,
                newQuantity.toString(),
                item.product_feature_photo,
                item.product_id,
                item.color,
                item.size,
                item.prices_json
              );
            } else {
              // If new quantity is zero, return null to remove it.
              return null;
            }
          }
          return item;
        })
        .filter((item) => item !== null) as CartItemModel[];
      saveCartItemsToLocalStorage(newCartItems);
      return newCartItems;
    });
  };

  // Remove product from cart entirely.
  const removeFromCart = (productId: string) => {
    setCartItems((prev) => {
      const newCartItems = prev.filter((item) => item.product_id !== productId);
      saveCartItemsToLocalStorage(newCartItems);
      return newCartItems;
    });
  };

  const isInCart = (productId: string): boolean => {
    return cartItems.some((item) => item.product_id === productId);
  };

  const totalCartAmount = cartItems.reduce((sum, item) => sum + item.totalPrice(), 0);

  // Clear cart: remove all items from state and persist an empty array.
  const clearCart = () => {
    setCartItems([]);
    Utils.saveToDatabase("CART_ITEMS", JSON.stringify([]));
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        saveAuth,
        currentUser,
        setCurrentUser,
        logout,
        cartItems,
        addToCart,
        increase,
        decrease,
        totalCartAmount,
        isInCart,
        clearCart,
        removeFromCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { currentUser, setCurrentUser } = useAuth();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    try {
      if (!currentUser) {
        const data = Utils.loadFromDatabase(DB_LOGGED_IN_PROFILE);
        if (data) {
          setCurrentUser(data);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setShowSplashScreen(false);
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export { AuthProvider, AuthInit, useAuth };
