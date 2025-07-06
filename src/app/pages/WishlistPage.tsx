// src/app/pages/WishlistPage.tsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, Trash2, Eye, Package } from "lucide-react";
import { 
  selectWishlistItems, 
  selectWishlistLoading,
  selectWishlistError,
  loadWishlistFromAPI,
  removeFromWishlistAPI
} from "../store/slices/wishlistSlice";
import { addToCart } from "../store/slices/cartSlice";
import { AppDispatch } from "../store/store";
import ApiService from "../services/ApiService";
import ToastService from "../services/ToastService";
import { ProductModel } from "../models/ProductModel";

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

const WishlistPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wishlistItems = useSelector(selectWishlistItems);
  const isLoading = useSelector(selectWishlistLoading);
  const error = useSelector(selectWishlistError);
  const [isRemoving, setIsRemoving] = useState<number | null>(null);

  useEffect(() => {
    // Load wishlist from API when component mounts
    dispatch(loadWishlistFromAPI());
  }, [dispatch]);

  const handleRemoveFromWishlist = async (productId: number) => {
    try {
      setIsRemoving(productId);
      await dispatch(removeFromWishlistAPI(productId)).unwrap();
      // Reload wishlist after removal
      dispatch(loadWishlistFromAPI());
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      ToastService.error('Failed to remove from wishlist');
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
        // Remove all items from wishlist
        for (const item of wishlistItems) {
          await ApiService.removeFromWishlist(item.product_id);
        }
        // Reload wishlist
        dispatch(loadWishlistFromAPI());
        ToastService.success('Wishlist cleared');
      } catch (error) {
        console.error('Error clearing wishlist:', error);
        ToastService.error('Failed to clear wishlist');
      }
    }
  };

  if (isLoading) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3">Loading your wishlist...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="danger">
              <h5>Error Loading Wishlist</h5>
              <p>{error}</p>
              <Button onClick={() => dispatch(loadWishlistFromAPI())} variant="outline-danger">
                Try Again
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h3 mb-2">My Wishlist</h1>
              <p className="text-muted mb-0">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
            {wishlistItems.length > 0 && (
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={handleClearWishlist}
              >
                <Trash2 size={16} className="me-2" />
                Clear All
              </Button>
            )}
          </div>
        </Col>
      </Row>

      {wishlistItems.length === 0 ? (
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <Card className="border-0 shadow-sm py-5">
              <Card.Body>
                <Heart size={64} className="text-muted mb-4" />
                <h3 className="h4 mb-3">Your wishlist is empty</h3>
                <p className="text-muted mb-4">
                  Browse our products and save your favorites for later!
                </p>
                <Link to="/shop">
                  <Button variant="primary" size="lg">
                    <Package size={20} className="me-2" />
                    Start Shopping
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          {wishlistItems.map((item) => (
            <Col md={6} lg={4} xl={3} key={item.id} className="mb-4">
              <Card className="border-0 shadow-sm h-100 wishlist-card">
                <div className="position-relative">
                  <img
                    src={item.product_photo ? `http://127.0.0.1:8888/images/${item.product_photo}` : '/media/misc/image.png'}
                    alt={item.product_name}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/media/misc/image.png';
                    }}
                  />
                  <Button
                    variant="light"
                    size="sm"
                    className="position-absolute top-0 end-0 m-2 rounded-circle"
                    onClick={() => handleRemoveFromWishlist(item.product_id)}
                    disabled={isRemoving === item.product_id}
                  >
                    {isRemoving === item.product_id ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <Trash2 size={16} className="text-danger" />
                    )}
                  </Button>
                </div>
                
                <Card.Body className="d-flex flex-column">
                  <div className="mb-3">
                    <h6 className="card-title mb-2">{item.product_name}</h6>
                    <div className="d-flex align-items-center mb-2">
                      <span className="h5 text-primary mb-0 me-2">
                        UGX {parseFloat(item.product_sale_price || item.product_price).toLocaleString()}
                      </span>
                      {item.product_sale_price && parseFloat(item.product_sale_price) < parseFloat(item.product_price) && (
                        <span className="text-muted text-decoration-line-through">
                          UGX {parseFloat(item.product_price).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="d-grid gap-2">
                      <Button 
                        variant="primary" 
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart size={16} className="me-2" />
                        Add to Cart
                      </Button>
                      <Link to={`/products/${item.product_id}`}>
                        <Button variant="outline-secondary" className="w-100">
                          <Eye size={16} className="me-2" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Related Categories */}
      {wishlistItems.length > 0 && (
        <Row className="mt-5 pt-4 border-top">
          <Col>
            <h4 className="mb-3">Shop More Categories</h4>
            <div className="d-flex flex-wrap gap-2">
              {["Electronics", "Clothing", "Home & Garden", "Sports", "Books"].map((category) => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="btn btn-outline-primary btn-sm"
                >
                  {category}
                </Link>
              ))}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default WishlistPage;
