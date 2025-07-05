// src/app/pages/WishlistPage.tsx
import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, Trash2, Eye } from "lucide-react";
import { 
  selectWishlistItems, 
  selectWishlistCount, 
  removeFromWishlist, 
  clearWishlist 
} from "../store/slices/wishlistSlice";
import { addItem } from "../store/slices/cartSlice";
import { ProductWithExtras } from "../types";
import { ProductModel } from "../models/ProductModel";

const WishlistPage: React.FC = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const wishlistCount = useSelector(selectWishlistCount);

  const handleRemoveFromWishlist = (productId: number) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product: ProductWithExtras) => {
    // Create a ProductModel instance
    const productModel = new ProductModel();
    productModel.id = product.id;
    productModel.name = product.name;
    productModel.price_1 = product.price_1;
    productModel.price_2 = product.price_2;
    productModel.feature_photo = product.feature_photo;
    productModel.description = product.description || null;
    productModel.summary = product.summary || null;
    productModel.category = product.category || null;
    productModel.category_text = product.category_text || "";
    productModel.colors = product.colors || "";
    productModel.sizes = product.sizes || "";
    productModel.in_stock = product.in_stock || 1;
    productModel.status = product.status || 1;
    productModel.created_at = product.created_at || "";
    productModel.rating = product.rating || 0;
    productModel.reviewsCount = product.reviewCount || 0;
    
    dispatch(addItem({
      product: productModel,
      quantity: 1
    }));
  };

  const handleClearWishlist = () => {
    if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
      dispatch(clearWishlist());
    }
  };

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h3 mb-2">My Wishlist</h1>
              <p className="text-muted mb-0">
                {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
            {wishlistCount > 0 && (
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
                <Link to="/shop" className="btn btn-primary btn-lg">
                  <ShoppingCart size={20} className="me-2" />
                  Start Shopping
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          {wishlistItems.map((product) => (
            <Col md={6} lg={4} xl={3} key={product.id} className="mb-4">
              <Card className="border-0 shadow-sm h-100 wishlist-card">
                <div className="position-relative">
                  <img
                    src={product.feature_photo}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Button
                    variant="light"
                    size="sm"
                    className="position-absolute top-0 end-0 m-2 rounded-circle"
                    onClick={() => handleRemoveFromWishlist(product.id)}
                  >
                    <Trash2 size={16} className="text-danger" />
                  </Button>
                  {product.isNew && (
                    <Badge 
                      bg="success" 
                      className="position-absolute top-0 start-0 m-2"
                    >
                      New
                    </Badge>
                  )}
                  {product.isTrending && (
                    <Badge 
                      bg="warning" 
                      text="dark"
                      className="position-absolute top-0 start-0 m-2"
                      style={{ top: product.isNew ? "40px" : "8px" }}
                    >
                      Trending
                    </Badge>
                  )}
                </div>
                
                <Card.Body className="d-flex flex-column">
                  <div className="mb-3">
                    <h6 className="card-title mb-2">{product.name}</h6>
                    <div className="d-flex align-items-center mb-2">
                      <span className="h5 text-primary mb-0 me-2">
                        ${product.price_1}
                      </span>
                      {product.price_2 && parseFloat(product.price_2) > parseFloat(product.price_1) && (
                        <span className="text-muted text-decoration-line-through">
                          ${product.price_2}
                        </span>
                      )}
                    </div>
                    
                    {product.rating && (
                      <div className="d-flex align-items-center mb-2">
                        <div className="text-warning me-1">
                          {"★".repeat(Math.floor(product.rating))}
                          {"☆".repeat(5 - Math.floor(product.rating))}
                        </div>
                        <small className="text-muted">
                          ({product.reviewCount || 0})
                        </small>
                      </div>
                    )}

                    {product.category_text && (
                      <Badge bg="light" text="dark" className="mb-2">
                        {product.category_text}
                      </Badge>
                    )}
                  </div>

                  <div className="mt-auto">
                    <div className="d-grid gap-2">
                      <Button 
                        variant="primary" 
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart size={16} className="me-2" />
                        Add to Cart
                      </Button>
                      <Link 
                        to={`/product/${product.id}`} 
                        className="btn btn-outline-secondary"
                      >
                        <Eye size={16} className="me-2" />
                        View Details
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
