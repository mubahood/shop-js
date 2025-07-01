// src/app/pages/ProductDetailPage/ProductDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Form, ProgressBar } from 'react-bootstrap';
// Assuming dummyDeals now contains rich PDP data based on our previous updates
import { dummyDeals } from '../../data/dummyProducts'; // Updated import path
import { ProductModel } from '../../models/ProductModel';
import './ProductDetailPage.css'; // New CSS file for PDP styling

interface ProductDetailPageProps {}

const ProductDetailPage: React.FC<ProductDetailPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [selectedMainImage, setSelectedMainImage] = useState<string>(''); // Currently displayed main image
  const [mainImageError, setMainImageError] = useState<boolean>(false); // State for main image load error
  const [quantity, setQuantity] = useState<number>(1);
  // State for selected variants (e.g., { color: 'Red', size: 'M' })
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const foundProduct = dummyDeals.find(p => p.id === parseInt(id || '0'));

    if (foundProduct) {
      setProduct(foundProduct);
      // Set the initial main image to the feature_photo
      setSelectedMainImage(foundProduct.feature_photo);
      setMainImageError(false); // Reset error state

      // Initialize selected variants if product has them
      if (foundProduct.variants) {
        const initialSelections: { [key: string]: string } = {};
        Object.keys(foundProduct.variants).forEach(variantType => {
          if (foundProduct.variants && foundProduct.variants[variantType] && foundProduct.variants[variantType].length > 0) {
            initialSelections[variantType] = foundProduct.variants[variantType][0]; // Select first option by default
          }
        });
        setSelectedVariants(initialSelections);
      }
    } else {
      setProduct(null);
      console.error(`Product with ID ${id} not found.`);
      // In a real app, you might redirect to a 404 page here
    }
  }, [id]);

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h3 className="text-color-dark">Loading product details...</h3>
        {/* You could add a simple spinner here */}
      </Container>
    );
  }

  // --- Destructure product data for easier access ---
  const price_1_num = parseFloat(product.price_1);
  const price_2_num = parseFloat(product.price_2);
  const discountPercent = price_2_num > price_1_num ? Math.round(((price_2_num - price_1_num) / price_2_num) * 100) : 0;
  const itemsSold = product.stock?.items_sold || 0;
  const totalItems = product.stock?.total_items || 0;
  const stockProgress = totalItems > 0 ? (itemsSold / totalItems) * 100 : 0;

  // --- Handlers ---
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else if (e.target.value === '') {
      setQuantity(0); // Allow clearing field
    }
  };

  const handleVariantSelect = (variantType: string, value: string) => {
    setSelectedVariants(prev => ({ ...prev, [variantType]: value }));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} (ID: ${product.id}) with variants ${JSON.stringify(selectedVariants)} to cart`);
    // Implement actual add to cart logic (e.g., Redux, Context API, API call)
    // Show a toast notification here!
  };

  const handleBuyNow = () => {
      console.log(`Buying ${quantity} of ${product.name} (ID: ${product.id}) with variants ${JSON.stringify(selectedVariants)} now`);
      // Implement direct buy logic (e.g., redirect to checkout with item pre-filled)
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }, (_, i) => <i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>)}
        {hasHalfStar && <i key="half" className="bi bi-star-half text-warning"></i>)}
        {Array.from({ length: emptyStars }, (_, i) => <i key={`empty-${i}`} className="bi bi-star text-warning"></i>)}
      </>
    );
  };

  // Combine feature_photo with additional images for the gallery
  const galleryImages = [product.feature_photo, ...(product.images || [])];


  return (
    <Container className="my-4 my-lg-5 product-detail-page-container">
      <Row>
        {/* Product Image Gallery (Left Column) */}
        <Col md={6} lg={5} className="mb-4 mb-md-0">
          <div className="product-image-gallery-main">
            <img
              src={mainImageError ? "https://via.placeholder.com/600x600?text=Image+Unavailable" : selectedMainImage}
              alt={product.name}
              className="img-fluid product-main-image"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                setMainImageError(true);
                e.currentTarget.onerror = null;
              }}
            />
            {discountPercent > 0 && (
              <span className="product-discount-badge-lg">-{discountPercent}%</span>
            )}
          </div>
          {/* Thumbnail gallery */}
          <div className="product-thumbnail-gallery d-flex flex-wrap gap-3 mt-4 justify-content-center justify-content-md-start">
            {galleryImages.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`Thumbnail ${index + 1}`}
                className={`product-thumbnail img-thumbnail ${selectedMainImage === imgUrl ? 'active' : ''}`}
                onClick={() => { setSelectedMainImage(imgUrl); setMainImageError(false); }}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src = "https://via.placeholder.com/100x100?text=Error"; // Placeholder for broken thumbnail
                  e.currentTarget.onerror = null;
                }}
              />
            ))}
          </div>
        </Col>

        {/* Product Information & Actions (Right Column) */}
        <Col md={6} lg={7}>
          <div className="product-info-details">
            <h1 className="product-title-lg">{product.name}</h1>

            {/* Rating and Reviews */}
            {product.rating !== undefined && product.rating > 0 && (
              <div className="d-flex align-items-center mb-3 product-rating-summary">
                <div className="product-stars-lg me-2">
                  {renderStars(product.rating)}
                </div>
                <span className="fs-14 text-color-medium">
                  {product.rating} / 5 ({product.reviewsCount ? product.reviewsCount.toLocaleString() : 0} Reviews)
                </span>
              </div>
            )}

            <hr className="my-3"/>

            {/* Pricing */}
            <div className="product-pricing-lg mb-4">
              <span className="current-price-lg">UGX {price_1_num.toLocaleString()}</span>
              {price_2_num > price_1_num && (
                <span className="old-price-lg ms-3">UGX {price_2_num.toLocaleString()}</span>
              )}
            </div>

            {/* Flash Deal Progress (if applicable) */}
            {product.stock && totalItems > 0 && (
              <div className="product-stock-progress-lg mb-4">
                <p className="fs-14 text-color-medium mb-2">
                  <i className="bi bi-truck me-2"></i> Only {totalItems - itemsSold} items left in stock!
                </p>
                <ProgressBar now={stockProgress} variant="primary" className="pdp-progress-bar">
                  <span className="progress-bar-label text-white">{Math.round(stockProgress)}% Sold</span>
                </ProgressBar>
                <small className="items-sold-lg mt-1 d-block text-color-light">
                  {itemsSold.toLocaleString()} / {totalItems.toLocaleString()} items sold
                </small>
              </div>
            )}

            {/* Product Variants (Color/Size etc.) */}
            {product.variants && Object.keys(product.variants).length > 0 && (
              <div className="product-variants mb-4">
                {Object.entries(product.variants).map(([variantType, options]) => (
                  <div key={variantType} className="mb-3">
                    <h4 className="fs-16 text-color-dark mb-2 text-capitalize">{variantType}: <span className="text-color-medium">{selectedVariants[variantType]}</span></h4>
                    <div className="d-flex flex-wrap gap-2">
                      {options.map(option => (
                        <Button
                          key={option}
                          variant={selectedVariants[variantType] === option ? 'primary' : 'outline-secondary'}
                          size="sm"
                          className="pdp-variant-btn"
                          onClick={() => handleVariantSelect(variantType, option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Selector and Add to Cart Buttons */}
            <div className="d-flex align-items-center gap-3 mb-4 product-actions-pdp">
              <Form.Group controlId="productQuantity" className="mb-0">
                <Form.Label className="sr-only">Quantity</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="quantity-input"
                  style={{ width: '80px', textAlign: 'center' }} // Inline style as a quick fix, prefer CSS class
                />
              </Form.Group>
              <Button variant="primary" className="btn-lg btn-add-to-cart-pdp" onClick={handleAddToCart}>
                <i className="bi bi-cart-plus me-2"></i> Add to Cart
              </Button>
              <Button variant="outline-primary" className="btn-lg btn-buy-now-pdp" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>

            {/* Short Description / Key Features */}
            {product.description && (
              <div className="product-short-description mb-4">
                <h4 className="fs-16 text-color-dark mb-2">About this item:</h4>
                <p className="text-color-medium" style={{ lineHeight: 1.6 }}>
                  {product.description.split('. ').slice(0, 2).join('. ') + (product.description.split('. ').length > 2 ? '...' : '')} {/* Show first two sentences */}
                  {/* You can add a "Read More" button here */}
                </p>
                {/* For more detailed features, consider parsing description into list or adding specific feature points */}
                <ul className="list-unstyled product-features-list mt-3">
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i> High-resolution display</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i> Advanced health sensors</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i> Long battery life</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i> Durable and water resistant</li>
                </ul>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Product Description, Specifications, and Reviews (Full Width) */}
      <Row className="mt-5">
        <Col xs={12}>
          <div className="product-details-tabs">
            {/* Using Bootstrap Navs for tabs */}
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="pills-description-tab" data-bs-toggle="pill" data-bs-target="#pills-description" type="button" role="tab" aria-controls="pills-description" aria-selected="true">Description</button>
              </li>
              {product.specifications && product.specifications.length > 0 && (
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-specifications-tab" data-bs-toggle="pill" data-bs-target="#pills-specifications" type="button" role="tab" aria-controls="pills-specifications" aria-selected="false">Specifications</button>
                </li>
              )}
              {product.reviewsCount !== undefined && (
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-reviews-tab" data-bs-toggle="pill" data-bs-target="#pills-reviews" type="button" role="tab" aria-controls="pills-reviews" aria-selected="false">Reviews ({product.reviewsCount.toLocaleString()})</button>
                </li>
              )}
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-description" role="tabpanel" aria-labelledby="pills-description-tab">
                {product.description ? (
                  <p className="text-color-medium" style={{ lineHeight: 1.6 }}>{product.description}</p>
                ) : (
                  <p className="text-color-medium">No detailed description available for this product.</p>
                )}
              </div>
              {product.specifications && product.specifications.length > 0 && (
                <div className="tab-pane fade" id="pills-specifications" role="tabpanel" aria-labelledby="pills-specifications-tab">
                  <h5 className="text-color-dark mb-3">Technical Specifications:</h5>
                  <table className="table table-striped table-hover">
                    <tbody>
                      {product.specifications.map((spec, index) => (
                        <tr key={index}>
                          <th scope="row">{spec.label}</th>
                          <td>{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {product.reviewsCount !== undefined && (
                <div className="tab-pane fade" id="pills-reviews" role="tabpanel" aria-labelledby="pills-reviews-tab">
                  <h5 className="text-color-dark mb-3">Customer Reviews:</h5>
                  {product.reviewsCount > 0 ? (
                    <p className="text-color-medium">Displaying {product.reviewsCount.toLocaleString()} reviews. (Review section coming soon!)</p>
                  ) : (
                    <p className="text-color-medium">No reviews yet for this product. Be the first to leave one!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;