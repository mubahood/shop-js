// src/app/pages/ProductDetailPage/ProductDetailPage.tsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ProgressBar,
  Spinner,
  Modal,
} from "react-bootstrap";
import { useGetProductByIdQuery } from "../../services/productsApi";
import { ProductModel } from "../../models/ProductModel";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/slices/cartSlice";
import { showNotification } from "../../store/slices/notificationSlice";
import "./ProductDetailPage.css";
import ProductCard2 from "../../components/shared/ProductCard2";
import { topProductsData } from "../../data/optimized/products";

interface RouteParams {
  id?: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productId = useMemo(() => parseInt(id || "0", 10), [id]);

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
  const [selectedImage, setSelectedImage] = useState<string>("");
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
        <p>{(error as any)?.data || "Unexpected error occurred."}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </Container>
    );
  }

  // Not found
  if (!product) {
    return (
      <Container className="pdp-not-found-container text-center my-5">
        <h4>Product not found.</h4>
        <Button variant="outline-primary" onClick={() => navigate("/")}>
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
          type: "warning",
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
          message: "Cannot add to cart – out of stock or invalid quantity.",
          type: "error",
        })
      );
      return;
    }
    dispatch(
      addItem({ product, quantity, selectedVariants: variantsSelection })
    );
    dispatch(
      showNotification({
        message: `${quantity} × ${product.name} added to cart.`,
        type: "success",
      })
    );
    setQuantity(1);
  };

  const onBuyNow = () => {
    if (outOfStock || quantity < 1) {
      dispatch(
        showNotification({
          message: "Cannot proceed – out of stock or invalid quantity.",
          type: "error",
        })
      );
      return;
    }
    // TODO: navigate to checkout
    dispatch(
      showNotification({
        message: `Proceeding to checkout with ${quantity} × ${product.name}.`,
        type: "info",
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
    <Container className="my-4">
      <Row>
        <Col md={1} lg={9} className="">
          <div 
            className="card border shadow-sm" 
            style={{
              borderRadius: 'var(--border-radius)',
              background: 'var(--white)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div className="card-body p-4">
              <Row>
                {/* Left: Images */}
                <Col md={1} lg={4} className="mb-4">
                  <div className="product-image-gallery d-flex flex-column align-items-center">
                    <div
                      className="main-image-wrapper position-relative mb-3"
                      style={{
                        width: "100%",
                        aspectRatio: "1/1",
                        background: "var(--background-light)",
                        borderRadius: 'var(--border-radius)',
                        boxShadow: "var(--shadow-sm)",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: 320,
                        cursor: "pointer",
                        border: "2px solid var(--border-color)",
                        transition: "all var(--transition-speed) var(--transition-timing-function)"
                      }}
                      onClick={() => setShowModal(true)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary-color)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                      }}
                    >
                      <img
                        src={
                          imageErrored
                            ? "https://via.placeholder.com/600x600?text=No+Image"
                            : selectedImage
                        }
                        alt={product.name}
                        className="img-fluid"
                        style={{
                          maxHeight: 380,
                          maxWidth: "100%",
                          objectFit: "contain",
                          transition: "all var(--transition-speed) var(--transition-timing-function)"
                        }}
                        onError={() => setImageErrored(true)}
                        draggable={false}
                      />
                      {discount > 0 && (
                        <span
                          className="badge position-absolute"
                          style={{
                            top: 15,
                            right: 15,
                            fontSize: "1rem",
                            padding: "0.5em 1em",
                            borderRadius: 'var(--border-radius)',
                            background: "var(--primary-color)",
                            color: "var(--white)",
                            fontWeight: "700",
                            boxShadow: "var(--shadow-sm)",
                            border: "none"
                          }}
                        >
                          -{discount}%
                        </span>
                      )}
                      <div
                        className="position-absolute"
                        style={{
                          bottom: 10,
                          right: 10,
                          background: "rgba(255, 255, 255, 0.95)",
                          borderRadius: "var(--border-radius)",
                          padding: "6px 10px",
                          fontSize: "0.75rem",
                          color: "var(--text-color-medium)",
                          border: "1px solid var(--border-color)"
                        }}
                      >
                        <i className="bi bi-zoom-in me-1"></i>
                        Click to zoom
                      </div>
                    </div>
                    <div
                      className="thumbnail-row d-flex flex-row flex-nowrap justify-content-start gap-2"
                      style={{
                        width: "100%",
                        overflowX: "auto",
                        overflowY: "hidden",
                        height: 70,
                        maxHeight: 70,
                        paddingBottom: 4,
                        scrollbarWidth: "thin"
                      }}
                    >
                      {gallery.map((url, idx) => (
                        <div
                          key={idx}
                          className={`thumb-wrapper position-relative ${
                            url === selectedImage ? "selected-thumb" : ""
                          }`}
                          style={{
                            border:
                              url === selectedImage
                                ? "2px solid var(--primary-color)"
                                : "1px solid var(--border-color)",
                            borderRadius: 'var(--border-radius)',
                            overflow: "hidden",
                            width: 65,
                            height: 65,
                            background: "var(--white)",
                            cursor: "pointer",
                            boxShadow:
                              url === selectedImage
                                ? "var(--shadow-md)"
                                : "var(--shadow-sm)",
                            transition: "all var(--transition-speed) var(--transition-timing-function)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flex: "0 0 auto"
                          }}
                          onClick={() => {
                            setSelectedImage(url);
                            setImageErrored(false);
                          }}
                          onMouseEnter={(e) => {
                            if (url !== selectedImage) {
                              e.currentTarget.style.borderColor = 'var(--primary-color)';
                              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (url !== selectedImage) {
                              e.currentTarget.style.borderColor = 'var(--border-color)';
                              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                            }
                          }}
                        >
                          <img
                            src={url}
                            alt={`Thumb ${idx + 1}`}
                            className="img-fluid"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              background: "transparent",
                              borderRadius: 'var(--border-radius)',
                              pointerEvents: "none",
                              userSelect: "none"
                            }}
                            draggable={false}
                          />
                          {url === selectedImage && (
                            <span
                              className="position-absolute"
                              style={{
                                top: -1,
                                right: -1,
                                width: 12,
                                height: 12,
                                background: "var(--primary-color)",
                                borderRadius: "var(--border-radius)",
                                border: "1px solid var(--white)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                              }}
                            >
                              <i 
                                className="bi bi-check" 
                                style={{ 
                                  fontSize: "8px", 
                                  color: "var(--white)",
                                  fontWeight: "bold"
                                }} 
                              />
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Share Buttons (icon only, extra small) */}
                    <div className="mt-3 w-100 d-flex flex-row gap-2 justify-content-center align-items-center">
                      <span
                        className="fw-semibold me-1"
                        style={{ fontSize: "0.93em" }}
                      >
                        Share:
                      </span>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          window.location.href
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-xs d-flex align-items-center justify-content-center p-0"
                        title="Share on Facebook"
                        style={{
                          borderRadius: "50%",
                          width: 28,
                          height: 28,
                          fontSize: 16,
                          minWidth: 28,
                          minHeight: 28,
                        }}
                      >
                        <i className="bi bi-facebook" />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          window.location.href
                        )}&text=${encodeURIComponent(product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-info btn-xs d-flex align-items-center justify-content-center p-0"
                        title="Share on Twitter"
                        style={{
                          borderRadius: "50%",
                          width: 28,
                          height: 28,
                          fontSize: 16,
                          minWidth: 28,
                          minHeight: 28,
                        }}
                      >
                        <i className="bi bi-twitter-x" />
                      </a>
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(
                          product.name + " " + window.location.href
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-success btn-xs d-flex align-items-center justify-content-center p-0"
                        title="Share on WhatsApp"
                        style={{
                          borderRadius: "50%",
                          width: 28,
                          height: 28,
                          fontSize: 16,
                          minWidth: 28,
                          minHeight: 28,
                        }}
                      >
                        <i className="bi bi-whatsapp" />
                      </a>
                      <a
                        href={`https://t.me/share/url?url=${encodeURIComponent(
                          window.location.href
                        )}&text=${encodeURIComponent(product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-secondary btn-xs d-flex align-items-center justify-content-center p-0"
                        title="Share on Telegram"
                        style={{
                          borderRadius: "50%",
                          width: 28,
                          height: 28,
                          fontSize: 16,
                          minWidth: 28,
                          minHeight: 28,
                        }}
                      >
                        <i className="bi bi-telegram" />
                      </a>
                      <button
                        type="button"
                        className="btn btn-outline-dark btn-xs d-flex align-items-center justify-content-center p-0"
                        title="Copy link"
                        style={{
                          borderRadius: "50%",
                          width: 28,
                          height: 28,
                          fontSize: 16,
                          minWidth: 28,
                          minHeight: 28,
                        }}
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                        }}
                      >
                        <i className="bi bi-link-45deg" />
                      </button>
                    </div>
                  </div>
                </Col>

                {/* Right: Info & Actions */}
                <Col md={6} lg={8}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <a
                      href="#"
                      className="badge text-decoration-none"
                      style={{ 
                        fontSize: "0.9rem", 
                        padding: "0.5em 1em",
                        background: "var(--primary-color)",
                        color: "var(--white)",
                        borderRadius: "var(--border-radius)",
                        fontWeight: "600",
                        border: "none",
                        transition: "all var(--transition-speed) var(--transition-timing-function)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--primary-color-dark)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--primary-color)';
                      }}
                    >
                      {product.category_text || "Uncategorized"}
                    </a>

                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="p-0 m-0"
                      title="Add to Wishlist"
                      style={{
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "var(--border-radius)",
                        transition: "all var(--transition-speed) var(--transition-timing-function)",
                        borderColor: "var(--primary-color)",
                        color: "var(--primary-color)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--primary-color)";
                        e.currentTarget.style.color = "var(--white)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "var(--primary-color)";
                      }}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Add to Wishlist"
                    >
                      <i className="bi bi-heart" style={{ fontSize: "1rem" }} />
                    </Button>
                  </div>

                  <h1 
                    className="mb-3 mt-0 p-0" 
                    style={{
                      fontSize: "2rem",
                      fontWeight: "800",
                      color: "var(--text-color-dark)",
                      lineHeight: "1.2"
                    }}
                  >
                    {product.name}
                  </h1>

                  {/* Rating */}
                  {product.rating > 0 && (
                    <div 
                      className="d-flex align-items-center gap-3 mb-4 p-3" 
                      style={{
                        background: "var(--background-light)",
                        borderRadius: "var(--border-radius)",
                        border: "1px solid var(--border-color)"
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <span className="fs-5 fw-semibold">
                          {renderStars(product.rating)}
                        </span>
                        <span 
                          className="ms-1 fw-bold" 
                          style={{ 
                            fontSize: "1.1rem",
                            color: "var(--text-color-dark)"
                          }}
                        >
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                      <span
                        className="text-muted"
                        style={{ 
                          fontSize: "0.95rem",
                          fontWeight: "500",
                          color: "var(--text-color-medium)"
                        }}
                      >
                        ({product.reviewsCount} review
                        {product.reviewsCount !== 1 ? "s" : ""})
                      </span>
                    </div>
                  )}

                  {/* Stock Info Card */}
                  <div 
                    className="border rounded p-3 mb-4" 
                    style={{
                      background: outOfStock 
                        ? "linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)" 
                        : "linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)",
                      borderColor: outOfStock ? "#feb2b2" : "#9ae6b4",
                      borderWidth: "2px",
                      borderRadius: "16px"
                    }}
                  >
                    <div
                      className="fw-semibold mb-2 d-flex align-items-center gap-2"
                      style={{ 
                        fontSize: "1.1rem",
                        color: outOfStock ? "#c53030" : "#2f855a"
                      }}
                    >
                      <i 
                        className={`bi ${outOfStock ? 'bi-exclamation-triangle' : 'bi-check-circle'}`} 
                        style={{ fontSize: "1.2rem" }}
                      />
                      {outOfStock ? "Out of Stock" : "In Stock"}
                    </div>
                    <div className="mb-2">
                      {outOfStock ? (
                        <span 
                          className="fw-semibold" 
                          style={{ 
                            color: "#c53030",
                            fontSize: "1rem"
                          }}
                        >
                          Currently unavailable
                        </span>
                      ) : (
                        <span 
                          className="fw-semibold" 
                          style={{ 
                            color: "#2f855a",
                            fontSize: "1rem"
                          }}
                        >
                          {remaining} units available
                        </span>
                      )}
                    </div>
                    {total > 0 && (
                      <ProgressBar
                        now={soldPct}
                        label={`${Math.round(soldPct)}% sold`}
                        className="minimal-progress"
                        style={{ 
                          height: 12, 
                          background: "rgba(255,255,255,0.7)",
                          borderRadius: "6px"
                        }}
                        variant={outOfStock ? "danger" : "success"}
                      />
                    )}
                  </div>

                  <div
                    className="card mb-3 mt-3 shadow-sm border"
                    style={{
                      borderRadius: 14,
                      borderColor: "#e5e7eb",
                      background: "#fcfcfd",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div
                      className="card-header bg-white border-0 d-flex align-items-center gap-2"
                      style={{
                        borderTopLeftRadius: 14,
                        borderTopRightRadius: 14,
                        padding: "0.65rem 1rem 0.5rem 1rem",
                        borderBottom: "1px solid #ececec",
                      }}
                    >
                      <span
                        className="fw-semibold"
                        style={{ fontSize: "1.01em", color: "#222" }}
                      >
                        You may also like
                      </span>
                    </div>
                    <div
                      className="card-body d-flex align-items-center gap-3 py-0 px-2"
                      style={{ minHeight: 90 }}
                    >
                      {(() => {
                        // Simulate a random product (replace with real API in production)
                        const randomProduct = new ProductModel();
                        randomProduct.updateProfile({
                          id: 999,
                          name: "Retractable Garden Hose Reel",
                          feature_photo:
                            "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
                          price_1: "85000",
                          price_2: "95000",
                          rating: 4.3,
                          reviewsCount: 12,
                          category_text: "Garden Tools",
                          stock: { items_sold: 8, total_items: 20 },
                          variants: {},
                          images: [],
                          description:
                            "A durable, wall-mountable hose reel for easy watering.",
                          specifications: [],
                        });

                        const price1 = Number(randomProduct.price_1);
                        const price2 = Number(randomProduct.price_2);
                        const discount =
                          price2 > price1
                            ? Math.round(((price2 - price1) / price2) * 100)
                            : 0;

                        return (
                          <>
                            <div
                              className="d-flex align-items-center justify-content-center position-relative"
                              style={{
                                width: 68,
                                height: 68,
                                borderRadius: 10,
                                overflow: "hidden",
                                background:
                                  "linear-gradient(135deg, #f8fafc 60%, #e3f0ff 100%)",
                                border: "1.2px solid #e5e7eb",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                                flex: "0 0 68px",
                              }}
                            >
                              <img
                                src={randomProduct.feature_photo}
                                alt={randomProduct.name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: 10,
                                  transition: "transform 0.18s",
                                }}
                              />
                              {discount > 0 && (
                                <span
                                  className="badge bg-danger position-absolute"
                                  style={{
                                    top: 7,
                                    left: 7,
                                    fontSize: "0.82em",
                                    padding: "0.22em 0.6em",
                                    borderRadius: 5,
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                                    letterSpacing: 0.2,
                                  }}
                                >
                                  -{discount}%
                                </span>
                              )}
                            </div>
                            <div
                              className="flex-grow-1"
                              style={{ minWidth: 0 }}
                            >
                              <div
                                className="fw-semibold text-truncate"
                                style={{
                                  fontSize: "1.01em",
                                  color: "#1a202c",
                                  marginBottom: 2,
                                  maxWidth: 220,
                                }}
                                title={randomProduct.name}
                              >
                                {randomProduct.name}
                              </div>
                              <div className="d-flex align-items-end gap-2 mb-1">
                                <span
                                  className="text-primary fw-bold"
                                  style={{ fontSize: "1em" }}
                                >
                                  UGX {price1.toLocaleString()}
                                </span>
                                {price2 > price1 && (
                                  <span
                                    className="text-muted"
                                    style={{
                                      textDecoration: "line-through",
                                      fontSize: "0.93em",
                                    }}
                                  >
                                    UGX {price2.toLocaleString()}
                                  </span>
                                )}
                              </div>
                              <div className="d-flex align-items-center gap-1 mb-1">
                                <span style={{ fontSize: "0.93em" }}>
                                  {renderStars(randomProduct.rating)}
                                </span>
                                <span
                                  className="ms-1"
                                  style={{ fontSize: "0.93em", color: "#888" }}
                                >
                                  {randomProduct.rating.toFixed(1)} (
                                  {randomProduct.reviewsCount})
                                </span>
                              </div>
                              <div
                                className="text-muted text-truncate"
                                style={{
                                  fontSize: "0.93em",
                                  lineHeight: 1.35,
                                  maxWidth: 220,
                                  marginBottom: 0,
                                }}
                                title={randomProduct.description || undefined}
                              >
                                {randomProduct.description}
                              </div>
                            </div>
                            <div className="d-flex flex-column align-items-end gap-1 ms-2">
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() =>
                                  navigate(`/product/${randomProduct.id}`)
                                }
                                style={{
                                  whiteSpace: "nowrap",
                                  borderRadius: 16,
                                  fontWeight: 500,
                                  fontSize: "0.97em",
                                  padding: "0.32em 1.1em",
                                  boxShadow: "0 1px 2px rgba(0,123,255,0.07)",
                                  minWidth: 70,
                                }}
                              >
                                <i className="bi bi-eye me-1" />
                                View
                              </Button>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                style={{
                                  borderRadius: 16,
                                  fontSize: "0.93em",
                                  padding: "0.22em 0.9em",
                                  minWidth: 70,
                                }}
                                title="Add to Wishlist"
                              >
                                <i className="bi bi-heart" />
                              </Button>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Accepted Payment Methods */}
                  <div className="mb-3">
                    <h6 className="mb-2" style={{ fontSize: "1rem" }}>
                      We Accept
                    </h6>
                    <div className="d-flex flex-row gap-3 align-items-center">
                      {[
                        {
                          name: "Visa",
                          img: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
                        },
                        {
                          name: "Mastercard",
                          img: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
                        },
                        {
                          name: "MTN Mobile Money",
                          img: "https://images.seeklogo.com/logo-png/9/1/mtn-logo-png_seeklogo-95716.png",
                        },
                        {
                          name: "Airtel Money",
                          img: "https://images.seeklogo.com/logo-png/16/1/airtel-logo-png_seeklogo-168290.png",
                        },
                        {
                          name: "PayPal",
                          img: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
                        },
                      ].map((method) => (
                        <div
                          key={method.name}
                          className="border rounded d-flex align-items-center justify-content-center"
                          style={{
                            background: "#fff",
                            padding: "0.3rem 0.7rem",
                            minWidth: 60,
                            minHeight: 36,
                            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                          }}
                          title={method.name}
                        >
                          <img
                            src={method.img}
                            alt={method.name}
                            style={{
                              maxHeight: 24,
                              maxWidth: 48,
                              objectFit: "contain",
                              filter: "grayscale(0.2)",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <Row className="mt-4">
            <Col>
              <div 
                className="card border-0 shadow-lg" 
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                  overflow: "hidden"
                }}
              >
                <div className="card-body p-4">
                  {/* Modern Product Details Table */}
                  <div className="mb-4">
                    <h6 
                      className="mb-3" 
                      style={{ 
                        fontSize: "1.3rem",
                        fontWeight: "700",
                        color: "#1f2937",
                        borderBottom: "3px solid var(--bs-primary)",
                        paddingBottom: "0.5rem",
                        display: "inline-block"
                      }}
                    >
                      Product Details
                    </h6>
                    <div
                      className="table-responsive w-100"
                      style={{
                        borderRadius: "16px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        background: "#ffffff",
                        width: "100%",
                        maxWidth: "100%",
                        overflow: "hidden",
                        border: "1px solid #e5e7eb"
                      }}
                    >
                      <table
                        className="table table-borderless align-middle mb-0"
                        style={{
                          width: "100%",
                          minWidth: 320,
                          fontSize: "0.93em",
                        }}
                      >
                        <tbody>
                          {[
                            { label: "Brand", value: "Hainan" },
                            { label: "Material", value: "Polypropylene" },
                            { label: "Color", value: "Black+lime Green" },
                            {
                              label: "Item dimensions L x W x H",
                              value:
                                "21.5 x 10.16 x 18.98 inches (54.6 x 25.8 x 48.2 cm)",
                            },
                            {
                              label: "Style",
                              value:
                                "Retractable, Automatic rewind system, Modern",
                            },
                            { label: "Installation Type", value: "Wall Mount" },
                            { label: "Operation Mode", value: "Automatic" },
                            {
                              label: "Manufacturer",
                              value:
                                "YongKang Fengran Industry & Trade Co., LTD",
                            },
                            { label: "Capacity", value: "100 Feet" },
                            {
                              label: "Product Dimensions (L x W x H)",
                              value:
                                "21.5 x 10.16 x 18.98 inches (54.6 x 25.8 x 48.2 cm)",
                            },
                            {
                              label: "Item Weight",
                              value: "37.9 pounds (17.19 kg)",
                            },
                            { label: "Country of Origin", value: "China" },
                            { label: "Item model number", value: "ZYW019-S30" },
                            {
                              label: "Date First Available",
                              value: "2025-05-15 17:07:33",
                            },
                          ].map((row, idx) => (
                            <tr
                              key={row.label}
                              style={{
                                background: idx % 2 === 0 ? "#f8fafc" : "#fff",
                                borderTop:
                                  idx === 0 ? "none" : "1px solid #f1f3f7",
                                height: 32,
                              }}
                            >
                              <th
                                style={{
                                  width: "38%",
                                  fontWeight: 600,
                                  color: "#1f2937",
                                  padding: "0.8em 1.2em",
                                  background: "none",
                                  border: "none",
                                  fontSize: "1rem",
                                  letterSpacing: "0.3px",
                                  verticalAlign: "middle",
                                  textAlign: "left",
                                }}
                                scope="row"
                              >
                                <span
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                  }}
                                >
                                  <i
                                    className="bi bi-arrow-right-circle-fill"
                                    style={{ 
                                      fontSize: "0.9rem",
                                      color: "var(--bs-primary)"
                                    }}
                                  />
                                  {row.label}
                                </span>
                              </th>
                              <td
                                style={{
                                  color: "#374151",
                                  padding: "0.8em 1.2em",
                                  fontSize: "1rem",
                                  verticalAlign: "middle",
                                  border: "none",
                                  background: "none",
                                  wordBreak: "break-word",
                                  fontWeight: "500"
                                }}
                              >
                                {row.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Short Description */}
                  {product.description && (
                    <div 
                      className="p-4 mt-4" 
                      style={{
                        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                        borderRadius: "16px",
                        border: "1px solid #bae6fd"
                      }}
                    >
                      <h5 
                        style={{ 
                          fontSize: "1.3rem",
                          fontWeight: "700",
                          color: "#1f2937",
                          marginBottom: "1rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem"
                        }}
                      >
                        <i className="bi bi-info-circle-fill" style={{ color: "var(--bs-primary)" }} />
                        About this item
                      </h5>
                      <p 
                        style={{ 
                          fontSize: "1.05rem",
                          lineHeight: "1.6",
                          color: "#374151",
                          marginBottom: 0,
                          fontWeight: "400"
                        }}
                      >
                        {product.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Reviews Section */}
              <div 
                className="card border shadow-sm mt-4"
                style={{
                  borderRadius: "var(--border-radius)",
                  background: "var(--white)",
                  boxShadow: "var(--shadow-sm)",
                  border: "1px solid var(--border-color)"
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "var(--text-color-dark)",
                        margin: 0
                      }}
                    >
                      Customer Reviews
                    </h4>
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-bold" style={{ fontSize: "1.1rem" }}>
                        {product.rating.toFixed(1)}
                      </span>
                      <span>{renderStars(product.rating)}</span>
                      <span className="text-muted">
                        ({product.reviewsCount} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Review List */}
                  <div className="reviews-list mb-4">
                    {[
                      {
                        id: 1,
                        author: "Sarah Johnson",
                        rating: 5,
                        date: "June 15, 2025",
                        title: "Excellent product quality!",
                        content: "This product exceeded my expectations. The build quality is outstanding and it works exactly as described. Highly recommend!",
                        verified: true,
                        helpful: 12
                      },
                      {
                        id: 2,
                        author: "Michael Chen",
                        rating: 4,
                        date: "June 10, 2025",
                        title: "Good value for money",
                        content: "Great product overall. Installation was straightforward and it's been working well for the past few weeks. Only minor issue is the mounting hardware could be stronger.",
                        verified: true,
                        helpful: 8
                      },
                      {
                        id: 3,
                        author: "Emma Davis",
                        rating: 5,
                        date: "June 5, 2025",
                        title: "Perfect for my needs",
                        content: "Exactly what I was looking for. The automatic rewind feature works smoothly and saves so much time. Worth every penny!",
                        verified: false,
                        helpful: 15
                      }
                    ].map((review) => (
                      <div 
                        key={review.id}
                        className="review-item p-3 mb-3"
                        style={{
                          background: "var(--background-light)",
                          borderRadius: "var(--border-radius)",
                          border: "1px solid var(--border-color)"
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="reviewer-avatar d-flex align-items-center justify-content-center"
                              style={{
                                width: "40px",
                                height: "40px",
                                background: "var(--primary-color)",
                                color: "var(--white)",
                                borderRadius: "var(--border-radius)",
                                fontWeight: "700",
                                fontSize: "1.1rem"
                              }}
                            >
                              {review.author.charAt(0)}
                            </div>
                            <div>
                              <div className="d-flex align-items-center gap-2">
                                <span className="fw-semibold">{review.author}</span>
                                {review.verified && (
                                  <span 
                                    className="badge"
                                    style={{
                                      background: "#28a745",
                                      color: "var(--white)",
                                      fontSize: "0.7rem",
                                      borderRadius: "var(--border-radius)"
                                    }}
                                  >
                                    Verified Purchase
                                  </span>
                                )}
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <span>{renderStars(review.rating)}</span>
                                <span className="text-muted" style={{ fontSize: "0.85rem" }}>
                                  {review.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <h6 className="mb-2 fw-semibold">{review.title}</h6>
                        <p className="mb-3" style={{ lineHeight: "1.6" }}>
                          {review.content}
                        </p>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            style={{
                              borderRadius: "var(--border-radius)",
                              fontSize: "0.8rem",
                              padding: "0.25rem 0.75rem"
                            }}
                          >
                            <i className="bi bi-hand-thumbs-up me-1"></i>
                            Helpful ({review.helpful})
                          </Button>
                          <Button
                            variant="link"
                            size="sm"
                            className="text-muted p-0"
                            style={{ fontSize: "0.8rem" }}
                          >
                            Report
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Write Review Form */}
                  <div 
                    className="write-review-section p-4"
                    style={{
                      background: "var(--background-light)",
                      borderRadius: "var(--border-radius)",
                      border: "1px solid var(--border-color)"
                    }}
                  >
                    <h5 className="mb-3 fw-semibold">Write a Review</h5>
                    <Form>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Your Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your name"
                              style={{
                                borderRadius: "var(--border-radius)",
                                border: "1px solid var(--border-color)"
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter your email"
                              style={{
                                borderRadius: "var(--border-radius)",
                                border: "1px solid var(--border-color)"
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Rating</Form.Label>
                        <div className="rating-input d-flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Button
                              key={star}
                              variant="link"
                              className="p-0"
                              style={{
                                color: "#ffc107",
                                fontSize: "1.5rem",
                                textDecoration: "none",
                                border: "none"
                              }}
                            >
                              <i className="bi bi-star"></i>
                            </Button>
                          ))}
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Review Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Give your review a title"
                          style={{
                            borderRadius: "var(--border-radius)",
                            border: "1px solid var(--border-color)"
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Your Review</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          placeholder="Tell others about your experience with this product..."
                          style={{
                            borderRadius: "var(--border-radius)",
                            border: "1px solid var(--border-color)",
                            resize: "vertical"
                          }}
                        />
                      </Form.Group>

                      <div className="d-flex justify-content-between align-items-center">
                        <Form.Check 
                          type="checkbox" 
                          label="I confirm this is a genuine review based on my own experience"
                          style={{ fontSize: "0.9rem" }}
                        />
                        <Button
                          variant="primary"
                          style={{
                            borderRadius: "var(--border-radius)",
                            padding: "0.5rem 2rem",
                            fontWeight: "600"
                          }}
                        >
                          Submit Review
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={1} lg={3} className="">
          <div 
            className="card border shadow-sm" 
            style={{ 
              padding: "1rem", 
              borderRadius: "var(--border-radius)",
              background: "var(--white)",
              boxShadow: "var(--shadow-sm)",
              border: "1px solid var(--border-color)",
              position: "sticky",
              top: "20px"
            }}
          >
            <div className="card-body p-3">
              <div className="mb-3">
                <div className="d-flex flex-column align-items-start gap-2">
                  <span 
                    className="fw-bold"
                    style={{
                      fontSize: "2.2rem",
                      color: "var(--primary-color)",
                      fontWeight: "800"
                    }}
                  >
                    UGX {price1.toLocaleString()}
                  </span>
                  {price2 > price1 && (
                    <span
                      className="text-muted"
                      style={{
                        textDecoration: "line-through",
                        fontSize: "1rem",
                        marginLeft: 4,
                        color: "var(--text-color-light)",
                        fontWeight: 500,
                      }}
                    >
                      UGX {price2.toLocaleString()}
                    </span>
                  )}
                </div>
                {price2 > price1 && (
                  <div
                    className="fw-semibold mt-2 p-2"
                    style={{ 
                      fontSize: "0.9rem",
                      color: "#28a745",
                      background: "var(--background-light)",
                      borderRadius: "var(--border-radius)",
                      border: "1px solid #c3e6cb"
                    }}
                  >
                    💰 You save UGX {(price2 - price1).toLocaleString()}!
                  </div>
                )}
              </div>
              <hr className="my-3" style={{ borderColor: "var(--border-color)", borderWidth: "1px" }} />
              <div className="d-flex flex-column align-items-stretch gap-2 mb-3">
                {/* Variants */}
                {Object.keys(product.variants || {}).length > 0 && (
                  <div className="mb-1">
                    {Object.entries(product.variants).map(([type, opts]) => (
                      <Form.Group key={type} className="mb-1">
                        <Form.Label
                          className="fw-semibold mb-1"
                          style={{ fontSize: "0.98em" }}
                        >
                          {type}
                        </Form.Label>
                        <div className="d-flex flex-wrap gap-1">
                          {opts.map((opt) => {
                            const isSelected = variantsSelection[type] === opt;
                            return (
                              <Button
                                key={opt}
                                size="sm"
                                variant={
                                  isSelected ? "primary" : "outline-secondary"
                                }
                                onClick={() => onVariantSelect(type, opt)}
                                disabled={outOfStock}
                                className={`variant-btn${
                                  isSelected ? " active" : ""
                                }`}
                                style={{
                                  minWidth: 40,
                                  borderRadius: 16,
                                  fontWeight: isSelected ? 600 : 400,
                                  boxShadow: isSelected
                                    ? "0 0 0 1.5px var(--bs-primary-border-subtle)"
                                    : undefined,
                                  backgroundColor: isSelected
                                    ? "var(--bs-primary-bg-subtle)"
                                    : undefined,
                                  color: isSelected ? "#fff" : undefined,
                                  borderColor: isSelected
                                    ? "var(--bs-primary)"
                                    : undefined,
                                  transition: "all 0.15s",
                                  padding: "0.25rem 0.75rem",
                                }}
                              >
                                {opt}
                              </Button>
                            );
                          })}
                        </div>
                      </Form.Group>
                    ))}
                  </div>
                )}

                <Form.Group className="mb-1">
                  <Form.Label
                    className="fw-semibold mb-1"
                    style={{ fontSize: "0.98em" }}
                  >
                    Quantity
                  </Form.Label>
                  <Form.Control
                    type="number"
                    className="text-center"
                    value={quantity}
                    min={1}
                    max={remaining}
                    onChange={onQuantityChange}
                    style={{
                      width: "100%",
                      padding: "0.25rem 0.5rem",
                      fontSize: "1em",
                    }}
                    disabled={outOfStock}
                  />
                </Form.Group>
                <Button
                  className="w-100 mb-1"
                  onClick={onAddToCart}
                  disabled={outOfStock}
                  size="lg"
                  style={{ 
                    padding: "0.75rem 0", 
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    borderRadius: "var(--border-radius)",
                    background: outOfStock 
                      ? "var(--gray-400)" 
                      : "var(--primary-color)",
                    border: "none",
                    color: "var(--white)",
                    boxShadow: outOfStock 
                      ? "none" 
                      : "var(--shadow-md)",
                    transition: "all var(--transition-speed) var(--transition-timing-function)"
                  }}
                  onMouseEnter={(e) => {
                    if (!outOfStock) {
                      e.currentTarget.style.background = 'var(--primary-color-dark)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!outOfStock) {
                      e.currentTarget.style.background = 'var(--primary-color)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    }
                  }}
                >
                  <i className="bi bi-cart-plus me-2" />
                  {outOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>
                <Button
                  className="w-100 mb-3"
                  variant="outline-primary"
                  onClick={onBuyNow}
                  disabled={outOfStock}
                  size="lg"
                  style={{ 
                    padding: "0.75rem 0", 
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    borderRadius: "var(--border-radius)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "var(--primary-color)",
                    color: "var(--primary-color)",
                    background: "transparent",
                    transition: "all var(--transition-speed) var(--transition-timing-function)"
                  }}
                  onMouseEnter={(e) => {
                    if (!outOfStock) {
                      e.currentTarget.style.background = "var(--primary-color)";
                      e.currentTarget.style.color = "var(--white)";
                      e.currentTarget.style.borderColor = "var(--primary-color)";
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!outOfStock) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--primary-color)";
                      e.currentTarget.style.borderColor = "var(--primary-color)";
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  <i className="bi bi-lightning me-2" />
                  Buy Now
                </Button>
              </div>

              <div className="mb-0">
                <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                  {[
                    {
                      icon: "bi-truck",
                      title: "Free shipping",
                      desc: "On orders above UGX 50,000",
                      color: "#059669",
                      bgColor: "#d1fae5"
                    },
                    {
                      icon: "bi-arrow-return-left",
                      title: "Easy returns",
                      desc: "Return within 7 days for eligible items",
                      color: "#dc2626",
                      bgColor: "#fef2f2"
                    },
                    {
                      icon: "bi-shield-check",
                      title: "1-year warranty",
                      desc: "Covers manufacturer defects",
                      color: "#7c3aed",
                      bgColor: "#f3e8ff"
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="d-flex align-items-center mb-0">
                      <span
                        className="d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: 40,
                          height: 40,
                          background: item.bgColor,
                          borderRadius: "12px",
                          minWidth: 40,
                          minHeight: 40,
                          boxSizing: "border-box",
                          border: `2px solid ${item.color}20`,
                          boxShadow: `0 2px 8px ${item.color}15`
                        }}
                      >
                        <i
                          className={`bi ${item.icon}`}
                          style={{
                            color: item.color,
                            fontSize: "1.1rem",
                            fontWeight: "600"
                          }}
                        />
                      </span>
                      <span>
                        <span
                          style={{
                            fontSize: "1rem",
                            display: "block",
                            fontWeight: 600,
                            color: "#1f2937",
                            marginBottom: "2px"
                          }}
                        >
                          {item.title}
                        </span>
                        <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                          {item.desc}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={1} lg={12}>
          <div 
            className="card border shadow-sm" 
            style={{
              borderRadius: "var(--border-radius)",
              background: "var(--white)",
              boxShadow: "var(--shadow-sm)",
              border: "1px solid var(--border-color)"
            }}
          >
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 
                  className="m-0"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "var(--text-color-dark)"
                  }}
                >
                  You may also like
                </h3>
                <a
                  href="#"
                  className="text-decoration-none fw-semibold"
                  style={{
                    fontSize: "1rem",
                    color: "var(--primary-color)",
                    transition: "all var(--transition-speed) var(--transition-timing-function)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--primary-color-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--primary-color)';
                  }}
                >
                  View More <i className="bi bi-arrow-right ms-1"></i>
                </a>
              </div>
              <div className="top-products-grid">
                {topProductsData.slice(0, 5).map((product) => (
                  <ProductCard2 key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="xl"
        centered
        contentClassName="p-0 border-0"
        dialogClassName="pdp-lightbox-modal"
        backdropClassName="pdp-lightbox-backdrop"
      >
        <Modal.Header
          closeButton
          className="border-0 px-4 py-3"
          style={{
            borderRadius: "var(--border-radius)",
            borderBottom: "1px solid var(--border-color)",
            background: "var(--white)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <Modal.Title
            className="fw-semibold d-flex align-items-center gap-2"
            style={{ 
              fontSize: "1.3rem", 
              color: "var(--text-color-dark)"
            }}
          >
            <i className="bi bi-image" style={{ color: "var(--primary-color)" }} />
            {product.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="text-center d-flex align-items-center justify-content-center p-4"
          style={{
            minHeight: 500,
            background: "var(--white)",
            borderRadius: "var(--border-radius)",
            boxShadow: "none",
          }}
        >
          <img
            src={selectedImage}
            alt={product.name}
            className="img-fluid"
            style={{
              maxHeight: "75vh",
              maxWidth: "100%",
              objectFit: "contain",
              margin: "0 auto",
              borderRadius: "var(--border-radius)",
              background: "var(--background-light)",
              boxShadow: "var(--shadow-md)",
              transition: "all var(--transition-speed) var(--transition-timing-function)",
              border: "1px solid var(--border-color)"
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/800x800?text=No+Image";
            }}
            draggable={false}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductDetailPage;
