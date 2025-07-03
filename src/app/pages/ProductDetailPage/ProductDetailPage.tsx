// src/app/pages/ProductDetailPage/ProductDetailPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ProgressBar,
  Spinner,
  Modal,
} from 'react-bootstrap';
import { useGetProductByIdQuery } from '../../services/productsApi';
import { ProductModel } from '../../models/ProductModel';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/slices/cartSlice';
import { showNotification } from '../../store/slices/notificationSlice';
import './ProductDetailPage.css';

interface RouteParams {
  id?: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productId = useMemo(() => parseInt(id || '0', 10), [id]);

  const {
    data: product,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  // Local UI state
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [imageErrored, setImageErrored] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [variantsSelection, setVariantsSelection] = useState<
    Record<string, string>
  >({});
  const [showModal, setShowModal] = useState(false);

  // Initialize image & variants when product loads
  useEffect(() => {
    if (!product) return;

    setSelectedImage(product.feature_photo);
    setImageErrored(false);

    const initial: Record<string, string> = {};
    Object.entries(product.variants || {}).forEach(([type, opts]) => {
      if (opts.length) initial[type] = opts[0];
    });
    setVariantsSelection(initial);
  }, [product]);

  // Loading
  if (isLoading || isFetching) {
    return (
      <Container className="pdp-loading-container text-center my-5">
        <Spinner animation="border" role="status" variant="primary" />
        <h4 className="mt-3">Loading product details…</h4>
      </Container>
    );
  }

  // Error
  if (isError) {
    return (
      <Container className="pdp-error-container text-center my-5">
        <h4 className="text-danger mb-3">Could not load product.</h4>
        <p>{(error as any)?.data || 'Unexpected error occurred.'}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </Container>
    );
  }

  // Not found
  if (!product) {
    return (
      <Container className="pdp-not-found-container text-center my-5">
        <h4>Product not found.</h4>
        <Button variant="outline-primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Container>
    );
  }

  // Derived stock/pricing data
  const price1 = Number(product.price_1);
  const price2 = Number(product.price_2);
  const discount =
    price2 > price1 ? Math.round(((price2 - price1) / price2) * 100) : 0;

  const sold = product.stock?.items_sold ?? 0;
  const total = product.stock?.total_items ?? 0;
  const remaining = total - sold;
  const soldPct = total ? (sold / total) * 100 : 0;
  const outOfStock = total > 0 && remaining <= 0;

  // Handlers
  const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) return setQuantity(1);
    if (val < 1) return setQuantity(1);
    if (val > remaining) {
      dispatch(
        showNotification({
          message: `Only ${remaining} available`,
          type: 'warning',
        })
      );
      return setQuantity(remaining);
    }
    setQuantity(val);
  };

  const onVariantSelect = (type: string, option: string) =>
    setVariantsSelection((prev) => ({ ...prev, [type]: option }));

  const onAddToCart = () => {
    if (outOfStock || quantity < 1) {
      dispatch(
        showNotification({
          message: 'Cannot add to cart – out of stock or invalid quantity.',
          type: 'error',
        })
      );
      return;
    }
    dispatch(addItem({ product, quantity, selectedVariants: variantsSelection }));
    dispatch(
      showNotification({
        message: `${quantity} × ${product.name} added to cart.`,
        type: 'success',
      })
    );
    setQuantity(1);
  };

  const onBuyNow = () => {
    if (outOfStock || quantity < 1) {
      dispatch(
        showNotification({
          message: 'Cannot proceed – out of stock or invalid quantity.',
          type: 'error',
        })
      );
      return;
    }
    // TODO: navigate to checkout
    dispatch(
      showNotification({
        message: `Proceeding to checkout with ${quantity} × ${product.name}.`,
        type: 'info',
      })
    );
  };

  const renderStars = (rate: number) => {
    const full = Math.floor(rate);
    const half = rate % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <>
        {Array(full)
          .fill(0)
          .map((_, i) => (
            <i key={`f${i}`} className="bi bi-star-fill text-warning" />
          ))}
        {half && <i className="bi bi-star-half text-warning" />}
        {Array(empty)
          .fill(0)
          .map((_, i) => (
            <i key={`e${i}`} className="bi bi-star text-warning" />
          ))}
      </>
    );
  };

  const gallery = [product.feature_photo, ...(product.images || [])];

  return (
    <Container className="product-detail-page-container my-5">
      <Row>
        {/* Left: Images */}
        <Col md={6} lg={5} className="mb-4">
          <div className="product-image-main position-relative">
            <img
              src={
                imageErrored
                  ? 'https://via.placeholder.com/600x600?text=No+Image'
                  : selectedImage
              }
              alt={product.name}
              className="img-fluid"
              onError={() => setImageErrored(true)}
              onClick={() => setShowModal(true)}
              style={{ cursor: 'pointer' }}
            />
            {discount > 0 && (
              <span className="badge bg-danger position-absolute top-0 end-0 m-2">
                -{discount}%
              </span>
            )}
          </div>
          <div className="d-flex flex-wrap gap-2 mt-3">
            {gallery.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Thumb ${idx + 1}`}
                className={`img-thumbnail ${
                  url === selectedImage ? 'border-primary' : ''
                }`}
                style={{ width: '80px', cursor: 'pointer' }}
                onClick={() => {
                  setSelectedImage(url);
                  setImageErrored(false);
                }}
              />
            ))}
          </div>
        </Col>

        {/* Right: Info & Actions */}
        <Col md={6} lg={7}>
          <h1 className="mb-3">{product.name}</h1>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="d-flex align-items-center mb-3">
              {renderStars(product.rating)}
              <small className="ms-2 text-muted">
                {product.rating} ({product.reviewsCount})
              </small>
            </div>
          )}

          <hr />

          {/* Price */}
          <div className="mb-4">
            <span className="fs-4 fw-bold">
              UGX {price1.toLocaleString()}
            </span>
            {price2 > price1 && (
              <span className="text-decoration-line-through text-muted ms-3">
                UGX {price2.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock */}
          <p className="mb-3">
            {outOfStock ? (
              <span className="text-danger">Out of Stock</span>
            ) : (
              <>In Stock: {remaining} available</>
            )}
          </p>

          {/* Progress Bar */}
          {total > 0 && (
            <ProgressBar
              now={soldPct}
              label={`${Math.round(soldPct)}% sold`}
              className="mb-4"
            />
          )}

          {/* Variants */}
          {Object.keys(product.variants || {}).length > 0 && (
            <div className="mb-4">
              {Object.entries(product.variants).map(([type, opts]) => (
                <Form.Group key={type} className="mb-2">
                  <Form.Label className="fw-semibold text-capitalize">
                    {type}
                  </Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {opts.map((opt) => (
                      <Button
                        key={opt}
                        size="sm"
                        variant={
                          variantsSelection[type] === opt
                            ? 'primary'
                            : 'outline-secondary'
                        }
                        onClick={() => onVariantSelect(type, opt)}
                        disabled={outOfStock}
                      >
                        {opt}
                      </Button>
                    ))}
                  </div>
                </Form.Group>
              ))}
            </div>
          )}

          {/* Quantity & Actions */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <Form.Control
              type="number"
              value={quantity}
              min={1}
              max={remaining}
              onChange={onQuantityChange}
              style={{ width: '100px' }}
              disabled={outOfStock}
            />
            <Button onClick={onAddToCart} disabled={outOfStock}>
              <i className="bi bi-cart-plus me-1" />
              Add to Cart
            </Button>
            <Button variant="outline-primary" onClick={onBuyNow} disabled={outOfStock}>
              Buy Now
            </Button>
          </div>

          {/* Trust */}
          <div className="mb-4">
            <i className="bi bi-truck me-2" /> Free Shipping{' '}
            <i className="bi bi-arrow-return-left ms-3 me-2" /> Easy Returns{' '}
            <i className="bi bi-shield-check ms-3 me-2" /> 1-Year Warranty
          </div>

          {/* Short Description */}
          {product.description && (
            <div>
              <h5>About this item</h5>
              <p>{product.description}</p>
            </div>
          )}
        </Col>
      </Row>

      {/* Tabs: Description / Specs / Reviews */}
      <Row className="mt-5">
        <Col>
          <ul className="nav nav-pills mb-3">
            <li className="nav-item">
              <button
                className="nav-link active"
                data-bs-toggle="pill"
                data-bs-target="#desc-tab"
              >
                Description
              </button>
            </li>
            {product.specifications.length > 0 && (
              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="pill"
                  data-bs-target="#spec-tab"
                >
                  Specifications
                </button>
              </li>
            )}
            <li className="nav-item">
              <button
                className="nav-link"
                data-bs-toggle="pill"
                data-bs-target="#review-tab"
              >
                Reviews ({product.reviewsCount})
              </button>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane fade show active" id="desc-tab">
              <p>{product.description}</p>
            </div>
            {product.specifications.length > 0 && (
              <div className="tab-pane fade" id="spec-tab">
                <table className="table">
                  <tbody>
                    {product.specifications.map((s, i) => (
                      <tr key={i}>
                        <th>{s.label}</th>
                        <td>{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="tab-pane fade" id="review-tab">
              {product.reviewsCount > 0 ? (
                <p>{product.reviewsCount} reviews coming soon…</p>
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          </div>
        </Col>
      </Row>

      {/* Image Lightbox */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={selectedImage}
            alt={product.name}
            className="img-fluid"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://via.placeholder.com/800x800';
            }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductDetailPage;