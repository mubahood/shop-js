// src/app/pages/public/ShopPage.tsx

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { ProductModel, PaginatedResponse } from "../../models/ProductModel";
import Utils from "../../services/Utils";
import { toAbsoluteUrl } from "../../../_metronic/helpers";

interface ShopPageProps {
  manifest?: any;
}

const fadeVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const PAGE_SIZE = 8; // adjust as needed

/**
 * ProductCard using ProductModel helper methods.
 * Uses col-6 on xs and col-md-3 on medium+ (4 per row on medium+)
 */
const ProductCard: React.FC<{ product: ProductModel }> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mainImage = product.getMainImage();
  const hoverImage = product.getHoverImage();

  return (
    <div className="col-6 col-md-3 mb-4 d-flex">
      <Link
        to={`/product/${product.id}`}
        className="d-flex flex-column w-100 text-decoration-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="product-card d-flex flex-column h-100">
          <div className="product-card__top-wrapper">
            <div
              className="product-card__img-container"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="crop-image-container">
                <img
                  className="crop-image-container__img img-fluid"
                  src={isHovered && hoverImage ? hoverImage : mainImage}
                  alt={product.name}
                />
                <div className="crop-image-container__mask" />
              </div>
            </div>
          </div>
          <div className="product-card__bottom-wrapper px-2 py-2 mt-auto">
            <div className="product-card__goods-title-container mb-1">
              <span className="goods-title-link">{product.name}</span>
            </div>
            <div className="bottom-wrapper__price-wrapper d-flex align-items-center justify-content-between">
              <div className="product-card__price">
                <span className="price-text">
                  {product.getFormattedPrice()}
                </span>
              </div>
              <span className="product-card__add-btn btn btn-sm" role="button">
                <i className="bi bi-cart-plus"></i>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ShopPage: React.FC<ShopPageProps> = () => {
  // URL query params for filters/pagination
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  // Filter states (adjust/add more as needed)
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [color, setColor] = useState(searchParams.get("color") || "");
  const [size, setSize] = useState(searchParams.get("size") || "");
  const [rating, setRating] = useState(searchParams.get("rating") || "");
  const [inStockOnly, setInStockOnly] = useState(
    searchParams.get("inStock") === "1"
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "Newest");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  // Product & pagination state
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastPage, setLastPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Dummy filter options (replace with dynamic data as needed)
  const dummyCategoryOptions = ["Phones", "Laptops", "Headphones", "Cameras"];
  const dummyBrandOptions = ["Apple", "Samsung", "Dell", "HP", "Canon", "Sony"];
  const dummyColorOptions = [
    "Black",
    "White",
    "Blue",
    "Red",
    "Green",
    "Yellow",
  ];
  const dummySizeOptions = ["Small", "Medium", "Large", "XL"];
  const dummyRatingOptions = ["1", "2", "3", "4", "5"];
  const dummySortOptions = ["Newest", "Oldest", "Price Low", "Price High"];

  // Fetch products using ProductModel
  const fetchProductsList = async (page: number) => {
    setLoading(true);
    setError("");
    try {
      const params: Record<string, string | number> = {};
      if (category) params.category = category;
      if (brand) params.brand = brand;
      if (color) params.color = color;
      if (size) params.size = size;
      if (rating) params.rating = rating;
      if (inStockOnly) params.in_stock = 1;
      params.sort = sortBy;
      if (minPrice) params.min_price = minPrice;
      if (maxPrice) params.max_price = maxPrice;

      const response: PaginatedResponse<ProductModel> =
        await ProductModel.fetchProducts(page, params);
      setProducts(response.data);
      setLastPage(response.last_page);
      setTotalProducts(response.total);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  // Load products on mount and when filters or page change
  useEffect(() => {
    fetchProductsList(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    category,
    brand,
    color,
    size,
    rating,
    inStockOnly,
    sortBy,
    minPrice,
    maxPrice,
    currentPage,
  ]);

  // Apply filters: update URL and reset to page 1
  const applyAllFilters = () => {
    setCurrentPage(1);
    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (brand) params.brand = brand;
    if (color) params.color = color;
    if (size) params.size = size;
    if (rating) params.rating = rating;
    if (inStockOnly) params.inStock = "1";
    params.sort = sortBy;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    params.page = "1";
    setSearchParams(params, { replace: true });
    fetchProductsList(1);
  };

  const clearFilters = () => {
    setCategory("");
    setBrand("");
    setColor("");
    setSize("");
    setRating("");
    setInStockOnly(false);
    setSortBy("Newest");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
    setSearchParams({}, { replace: true });
    fetchProductsList(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > lastPage) return;
    setCurrentPage(newPage);
    const params = Object.fromEntries([...searchParams]);
    params.page = String(newPage);
    setSearchParams(params, { replace: true });
    fetchProductsList(newPage);
  };

  return (
    <div className="container py-4 px-2 px-lg-10">
      <div className="row gx-3">
        {/* LEFT FILTER COLUMN */}
        <motion.div
          className="col-12 col-md-3 mb-3"
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white rounded shadow-sm p-3">
            <h6 className="fw-bold mb-3 d-flex align-items-center">
              <i className="bi bi-funnel-fill me-2 text-primary"></i>
              Filter Products
            </h6>
            {/* Category Filter */}
            <div className="mb-3">
              <label className="form-label mb-1">Category</label>
              <select
                className="form-select form-select-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All</option>
                {dummyCategoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {/* Brand Filter */}
            <div className="mb-3">
              <label className="form-label mb-1">Brand</label>
              <select
                className="form-select form-select-sm"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="">All</option>
                {dummyBrandOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            {/* Color Filter */}
            <div className="mb-3">
              <label className="form-label mb-1">Color</label>
              <select
                className="form-select form-select-sm"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="">Any</option>
                {dummyColorOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            {/* Size Filter */}
            <div className="mb-3">
              <label className="form-label mb-1">Size</label>
              <select
                className="form-select form-select-sm"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="">Any</option>
                {dummySizeOptions.map((sz) => (
                  <option key={sz} value={sz}>
                    {sz}
                  </option>
                ))}
              </select>
            </div>
            {/* Rating Filter */}
            <div className="mb-3">
              <label className="form-label mb-1">Minimum Rating</label>
              <select
                className="form-select form-select-sm"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">Any</option>
                {dummyRatingOptions.map((r) => (
                  <option key={r} value={r}>
                    {r} ★ & Up
                  </option>
                ))}
              </select>
            </div>
            {/* In Stock */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="inStockOnly"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <label htmlFor="inStockOnly" className="form-check-label">
                In Stock Only
              </label>
            </div>
            {/* Price Range */}
            <div className="mb-3">
              <label className="form-label mb-1">Price Range (UGX)</label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  className="form-control form-control-sm me-2"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  style={{ width: "90px" }}
                />
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  style={{ width: "90px" }}
                />
              </div>
            </div>
            {/* Filter Buttons */}
            <div className="mb-3 d-flex gap-2">
              <button
                className="btn btn-sm btn-primary flex-grow-1"
                onClick={() => {
                  applyAllFilters();
                  handlePageChange(1);
                }}
              >
                <i className="bi bi-search me-1"></i>Apply
              </button>
              <button
                className="btn btn-sm btn-secondary"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </div>
        </motion.div>

        {/* RIGHT MAIN COLUMN */}
        <div className="col-12 col-md-9">
          {/* Top Bar - Sort */}
          <motion.div
            className="bg-white shadow-sm rounded p-3 d-flex align-items-center justify-content-between mb-3"
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
          >
            <h1 className="h4 mb-0">Shop</h1>
            <div className="ms-auto">
              <label className="me-2 text-muted">Sort By:</label>
              <select
                className="form-select form-select-sm d-inline-block w-auto"
                style={{ minWidth: "120px" }}
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                  fetchProductsList(1);
                }}
              >
                {dummySortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* LOADING */}
          {loading && (
            <div className="py-4 text-center">
              <div className="spinner-border text-primary" role="status" />
              <p className="mt-2">Loading products...</p>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* NO PRODUCTS */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">No products found.</p>
            </div>
          )}

          {/* PRODUCT LISTING: 4 per row on large screens */}
          {!loading && !error && products.length > 0 && (
            <div className="row gy-4 row-cols-2 row-cols-md-3 row-cols-lg-4">
              {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {!loading && !error && totalProducts > 0 && (
            <div className="d-flex justify-content-between align-items-center mt-4">
              <small className="text-muted">
                Page <strong>{currentPage}</strong> of{" "}
                <strong>{lastPage}</strong> | Total:{" "}
                <strong>{totalProducts}</strong>
              </small>
              <div>
                <button
                  className="btn btn-outline-secondary btn-sm me-1"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  <i className="bi bi-chevron-left"></i> Prev
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= lastPage}
                >
                  Next <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional styling */}
      <style>{`
        .btn-primary {
          background-color: #f33d02;
          border-color: #114786;
        }
        .btn-primary:hover {
          background-color: #0f3a6d;
          border-color: #0f3a6d;
        }
        .product-card {
          background-color: #fff;
          transition: transform 0.2s;
        }
        .product-card:hover {
          transform: translateY(-3px);
        }
        .crop-image-container {
          position: relative;
          width: 100%;
          padding-bottom: 100%;
          overflow: hidden;
          background-color: #f8f9fa;
        }
        .crop-image-container__img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .crop-image-container__mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.1);
          opacity: 0;
          transition: opacity 0.2s ease-in-out;
        }
        .product-card:hover .crop-image-container__mask {
          opacity: 1;
        }
        .goods-title-link {
          font-size: 1rem;
          font-weight: 500;
          color: black;
          transition: color 0.2s;
        }
        .product-card:hover .goods-title-link {
          color: #f33d02;
        }
        .price-text {
          font-size: 1rem;
          font-weight: 600;
          color: #114786;
          margin-right: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default ShopPage;
