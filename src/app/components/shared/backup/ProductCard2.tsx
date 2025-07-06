// src/app/components/shared/ProductCard2.tsx
import React from "react";
import { ProductModel } from "../../models/ProductModel";
import "./ProductCard2.css"; // New CSS file for ProductCard2

interface ProductCard2Props {
  product: ProductModel & {
    stock?: { items_sold: number; total_items: number };
  };
}

const ProductCard2: React.FC<ProductCard2Props> = ({ product }) => {
  // Safely parse prices and calculate discount
  const price_1_num = parseFloat(product.price_1);
  const price_2_num = parseFloat(product.price_2);
  const discountPercent =
    price_2_num > price_1_num ? Math.round(((price_2_num - price_1_num) / price_2_num) * 100) : 0;

  const stockProgress = product.stock
    ? (product.stock.items_sold / product.stock.total_items) * 100
    : 0;

  return (
    <div className="product-card2">
      {/* Main clickable link now wraps all visible content */}
      <a href={`/product/${product.id}`} className="product-card2-info-link">
        {/* Product Image Section */}
        <div className="product-card2-image-wrapper">
          <img
            src={product.feature_photo}
            alt={product.name}
            className="product-card2-image"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = "/media/svg/files/blank-image.svg";
              e.currentTarget.onerror = null;
            }}
          />
          {discountPercent > 0 && (
            <span className="product-card2-discount-badge">-{discountPercent}%</span>
          )}
        </div>

        {/* Product Info Section (No separate actions overlay anymore) */}
        <div className="product-card2-info-block"> {/* This div contains the info part */}
          <div className="product-card2-info">
            <h3 className="product-card2-name">{product.name}</h3>

            <div className="product-card2-pricing">
              <span className="product-card2-price-new">
                UGX {price_1_num.toLocaleString()}
              </span>
              {price_2_num > price_1_num && (
                <span className="product-card2-price-old">
                  UGX {price_2_num.toLocaleString()}
                </span>
              )}
            </div>

            {product.stock && product.stock.total_items > 0 && (
              <div className="product-card2-stock-progress">
                <div className="product-card2-progress-bar-container">
                  <div
                    className="product-card2-progress-bar-fill"
                    style={{ width: `${stockProgress}%` }}
                  ></div>
                </div>
                <span className="product-card2-items-sold-text">
                  {product.stock.items_sold.toLocaleString()}/{product.stock.total_items.toLocaleString()} Sold
                </span>
              </div>
            )}
          </div>
        </div> {/* End of product-card2-info-block */}
      </a> {/* End of product-card2-info-link - now wraps both image and info block */}

      {/* Add to Cart Button (Absolutely positioned, appears on hover, overlays content) */}
      {/* This button remains outside the main <a> tag as its click is a separate action */}
      <button
        className="product-card2-add-to-cart-bar-btn"
        onClick={() => {
          console.log("Add to Cart clicked for ProductCard2:", product.name);
          // Add your actual add-to-cart logic here
        }}
      >
        <i className="bi bi-cart-plus me-2"></i> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard2;