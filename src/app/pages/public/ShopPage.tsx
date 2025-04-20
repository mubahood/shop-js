// src/app/pages/public/ShopPage.tsx

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductModel, PaginatedResponse } from "../../models/ProductModel";
import Utils from "../../services/Utils";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { useAuth } from "../../modules/auth";
import ContentLoader from "react-content-loader";
import ShimmerImage from "../../components/ShimmerImage";

const fadeVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const PAGE_SIZE = 20;

// Single file ProductCard
const ProductCard: React.FC<{ product: ProductModel }> = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const mainImg =
    product.getMainImage() || toAbsoluteUrl("media/products/placeholder.png");

  const hoverImg = product.getHoverImage() || mainImg;
  const { addToCart, isInCart } = useAuth();
  const inCart = isInCart(product.id.toString());

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id.toString(),
      price: parseFloat(product.price_1),
      name: product.name,
      mainImage: mainImg,
    });
  };

  return (
    <div className="col d-flex">
      <div
        className="card product-card rounded-3 shadow-sm border-0 d-flex flex-column w-100"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link
          to={`/product/${product.id}`}
          className="text-decoration-none text-dark d-flex flex-column h-100"
        >
          <div className="img-wrapper position-relative overflow-hidden rounded-top-3">
            <ShimmerImage
              src={hovered ? hoverImg : mainImg}
              alt={product.name}
            />
            <button className="add-cart-btn" onClick={handleAdd}>
              {inCart ? (
                <i className="bi bi-cart-check"></i>
              ) : (
                <i className="bi bi-cart-plus"></i>
              )}
            </button>
          </div>
          <div className="card-body flex-grow-1 d-flex flex-column p-3 bg-white">
            <h5 className="product-title mb-3">{product.name}</h5>
            <div className="mt-auto d-flex justify-content-between align-items-center">
              <span className="price-text">{product.getFormattedPrice()}</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

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

  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastPage, setLastPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const dummyCategoryOptions = ["Phones", "Laptops", "Headphones", "Cameras"];
  const dummyBrandOptions = ["Apple", "Samsung", "Dell", "HP", "Canon", "Sony"];
  const dummyColorOptions = ["Black", "White", "Blue", "Red"];
  const dummySizeOptions = ["S", "M", "L", "XL"];
  const dummyRatingOptions = ["1", "2", "3", "4", "5"];
  const dummySortOptions = ["Newest", "Price Low", "Price High"];

  const fetchProductsList = async (page: number) => {
    setLoading(true);
    setError("");
    try {
      const params: Record<string, any> = {
        page,
        per_page: PAGE_SIZE,
        sort: sortBy,
      };
      if (category) params.category = category;
      if (brand) params.brand = brand;
      if (color) params.color = color;
      if (size) params.size = size;
      if (rating) params.rating = rating;
      if (inStockOnly) params.in_stock = 1;
      if (minPrice) params.min_price = minPrice;
      if (maxPrice) params.max_price = maxPrice;

      const resp: PaginatedResponse<ProductModel> =
        await ProductModel.fetchProducts(page, params);
      setProducts(resp.data);
      setLastPage(resp.last_page);
      setTotalProducts(resp.total);
    } catch {
      setError("Failed to load products.");
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsList(currentPage);
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

  const applyFilters = () => {
    setCurrentPage(1);
    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (brand) params.brand = brand;
    if (color) params.color = color;
    if (size) params.size = size;
    if (rating) params.rating = rating;
    if (inStockOnly) params.inStock = "1";
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    params.sort = sortBy;
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
    setMinPrice("");
    setMaxPrice("");
    setSortBy("Newest");
    setCurrentPage(1);
    setSearchParams({}, { replace: true });
    fetchProductsList(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > lastPage) return;
    setCurrentPage(newPage);
    const params: any = Object.fromEntries([...searchParams]);
    params.page = String(newPage);
    setSearchParams(params, { replace: true });
    fetchProductsList(newPage);
  };

  return (
    <div className="container py-4 px-2 px-lg-10">
      <div className="row gx-3">
        {/* FILTERS */}
        <motion.div
          className="col-12 col-md-3 mb-3"
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white rounded shadow-sm p-3">
            <h6 className="fw-bold mb-3">
              <i className="bi bi-funnel-fill me-2 text-primary" />
              Filters
            </h6>
            {/* Category */}
            <div className="mb-3">
              <label className="form-label mb-1">Category</label>
              <select
                className="form-select form-select-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All</option>
                {dummyCategoryOptions.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            {/* Brand */}
            <div className="mb-3">
              <label className="form-label mb-1">Brand</label>
              <select
                className="form-select form-select-sm"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="">All</option>
                {dummyBrandOptions.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            {/* Color */}
            <div className="mb-3">
              <label className="form-label mb-1">Color</label>
              <select
                className="form-select form-select-sm"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="">Any</option>
                {dummyColorOptions.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            {/* Size */}
            <div className="mb-3">
              <label className="form-label mb-1">Size</label>
              <select
                className="form-select form-select-sm"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="">Any</option>
                {dummySizeOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            {/* Rating */}
            <div className="mb-3">
              <label className="form-label mb-1">Rating</label>
              <select
                className="form-select form-select-sm"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">Any</option>
                {dummyRatingOptions.map((r) => (
                  <option key={r}>{r} ★ & Up</option>
                ))}
              </select>
            </div>
            {/* In Stock */}
            <div className="form-check mb-3">
              <input
                id="inStockOnly"
                type="checkbox"
                className="form-check-input"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <label htmlFor="inStockOnly" className="form-check-label">
                In Stock Only
              </label>
            </div>
            {/* Sort */}
            <div className="mb-3">
              <label className="form-label mb-1">Sort By</label>
              <select
                className="form-select form-select-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {dummySortOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            {/* Price */}
            <div className="mb-3">
              <label className="form-label mb-1">Price (UGX)</label>
              <div className="d-flex gap-2">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            {/* Apply / Clear */}
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-primary flex-grow-1"
                onClick={applyFilters}
              >
                Apply
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

        {/* MAIN LIST */}
        <div className="col-12 col-md-9">
          <motion.div
            className="bg-white shadow-sm rounded p-3 mb-3 d-flex justify-content-between align-items-center"
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
          >
            <h1 className="h4 mb-0">Shop</h1>
            <small className="text-muted">{totalProducts} items</small>
          </motion.div>

          {loading && (
            <div className="py-4 text-center">
              <div className="spinner-border text-primary" role="status" />
              <p className="mt-2">Loading products...</p>
            </div>
          )}

          {!loading && error && (
            <div className="alert alert-danger">{error}</div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">No products found.</p>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 gx-3 gy-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {!loading && !error && totalProducts > PAGE_SIZE && (
            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                ‹ Prev
              </button>
              <span>
                Page {currentPage} of {lastPage}
              </span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= lastPage}
              >
                Next ›
              </button>
            </div>
          )}
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .product-card { transition: transform 0.2s, box-shadow 0.2s; }
        .product-card:hover { transform: translateY(-3px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .img-wrapper { width:100%; padding-top:100%; position:relative; }
        .img-wrapper img, .img-wrapper .react-content-loader {
          position:absolute !important; top:0; left:0;
        }
        .add-cart-btn {
          position:absolute; top:8px; right:8px;
          background:rgba(255,255,255,0.85); border:none; border-radius:50%;
          width:36px; height:36px; display:flex; align-items:center; justify-content:center;
          opacity:0; transition:opacity 0.2s; color:#0517A1FF; font-size:1.1rem;
        }
        .product-card:hover .add-cart-btn { opacity:1; }
        .product-title {
          font-size:0.95rem; font-weight:500; line-height:1.3;
          display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;
          overflow:hidden; margin-bottom:0; min-height:2.6rem;
        }
        .price-text { color:#0517A1FF; font-weight:600; font-size:1rem; }
      `}</style>
    </div>
  );
};

export default ShopPage;
