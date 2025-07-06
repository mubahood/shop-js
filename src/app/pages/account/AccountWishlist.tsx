// src/app/pages/account/AccountWishlist.tsx
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { Heart, ShoppingCart, Trash2, Eye, Package } from 'lucide-react';
import { 
  selectWishlistItems, 
  selectWishlistCount, 
  removeFromWishlistAPI, 
  clearWishlist,
  loadWishlistFromAPI
} from '../../store/slices/wishlistSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { RootState } from '../../store/store';
import { ProductModel } from '../../models/ProductModel';
import ApiService from '../../services/ApiService';
import ToastService from '../../services/ToastService';
import { formatPrice } from '../../utils';
import './AccountWishlist.css';

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

const AccountWishlist: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState<number | null>(null);

  useEffect(() => {
    loadWishlist();
  }, [user]);

  const loadWishlist = async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      const wishlist = await ApiService.getWishlist();
      setWishlistItems(wishlist);
    } catch (error) {
      console.error('Error loading wishlist:', error);
      ToastService.error('Failed to load wishlist');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: number) => {
    try {
      setIsRemoving(productId);
      const success = await ApiService.removeFromWishlist(productId);
      if (success) {
        setWishlistItems(prev => prev.filter(item => item.product_id !== productId));
        dispatch(removeFromWishlistAPI(productId));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    } finally {
      setIsRemoving(null);
    }
  };

  const handleAddToCart = async (item: WishlistItem) => {
    try {
      // Create a ProductModel instance for the cart
      const productModel = new ProductModel();
      productModel.id = item.product_id;
      productModel.name = item.product_name;
      productModel.price_1 = item.product_price;
      productModel.price_2 = item.product_sale_price || item.product_price;
      productModel.feature_photo = item.product_photo || '';

      // Add to cart
      dispatch(addToCart({
        product: productModel,
        quantity: 1,
        variant: {}
      }));

      ToastService.success(`${item.product_name} added to cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      ToastService.error('Failed to add to cart');
    }
  };

  const handleClearWishlist = async () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      try {
        // Remove all items from backend
        for (const item of wishlistItems) {
          await ApiService.removeFromWishlist(item.product_id);
        }
        setWishlistItems([]);
        dispatch(clearWishlist());
        ToastService.success('Wishlist cleared successfully');
      } catch (error) {
        console.error('Error clearing wishlist:', error);
        ToastService.error('Failed to clear wishlist');
      }
    }
  };

  const getEffectivePrice = (item: WishlistItem) => {
    return item.product_sale_price || item.product_price;
  };

  const isOnSale = (item: WishlistItem) => {
    return item.product_sale_price && 
           parseFloat(item.product_sale_price) < parseFloat(item.product_price);
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <div className="mt-3">Loading your wishlist...</div>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="account-page-header">
        <h1 className="account-page-title">
          My Wishlist
          {wishlistItems.length > 0 && (
            <Badge bg="primary" className="ms-3">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </h1>
        <p className="account-page-subtitle">
          Save your favorite items for later
        </p>
        {wishlistItems.length > 0 && (
          <Button 
            variant="outline-danger" 
            onClick={handleClearWishlist}
            size="sm"
          >
            <Trash2 size={16} className="me-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Wishlist Content */}
      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <div className="text-center py-5">
            <Heart size={64} className="text-muted mb-3" />
            <h3 className="h4 text-muted mb-3">Your wishlist is empty</h3>
            <p className="text-muted mb-4">
              Start adding items you love to see them here
            </p>
            <Link to="/shop">
              <Button variant="primary">
                <Package size={16} className="me-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <Row>
          {wishlistItems.map((item) => (
            <Col key={item.id} lg={6} xl={4} className="mb-4">
              <Card className="wishlist-item-card h-100">
                {/* Product Image */}
                <div className="wishlist-item-image">
                  <img
                    src={item.product_photo || '/images/placeholder-product.jpg'}
                    alt={item.product_name}
                    className="card-img-top"
                  />
                  {isOnSale(item) && (
                    <Badge bg="danger" className="sale-badge">
                      Sale
                    </Badge>
                  )}
                </div>

                <Card.Body className="d-flex flex-column">
                  {/* Product Details */}
                  <div className="flex-grow-1">
                    <h5 className="wishlist-item-title">
                      {item.product_name}
                    </h5>
                    
                    <div className="wishlist-item-price mb-3">
                      <span className="current-price">
                        {formatPrice(getEffectivePrice(item))}
                      </span>
                      {isOnSale(item) && (
                        <span className="original-price ms-2">
                          {formatPrice(item.product_price)}
                        </span>
                      )}
                    </div>

                    <div className="wishlist-item-date text-muted small">
                      Added {new Date(item.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="wishlist-item-actions mt-3">
                    <Row className="g-2">
                      <Col>
                        <Button
                          variant="primary"
                          size="sm"
                          className="w-100"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart size={14} className="me-1" />
                          Add to Cart
                        </Button>
                      </Col>
                      <Col xs="auto">
                        <Link to={`/products/${item.product_id}`}>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                          >
                            <Eye size={14} />
                          </Button>
                        </Link>
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemoveFromWishlist(item.product_id)}
                          disabled={isRemoving === item.product_id}
                        >
                          {isRemoving === item.product_id ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            <Heart size={14} />
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default AccountWishlist;
