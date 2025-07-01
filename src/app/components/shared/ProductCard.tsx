// src/app/components/shared/ProductCard.tsx
import React from "react";
import { ProductModel } from "../../models/ProductModel";
import "./ProductCard.css";

interface ProductCardProps {
  product: ProductModel & {
    stock?: { items_sold: number; total_items: number };
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Safely parse prices and calculate discount
  const price_1 = parseFloat(product.price_1);
  const price_2 = parseFloat(product.price_2);
  const discountPercent =
    price_2 > price_1 ? Math.round(((price_2 - price_1) / price_2) * 100) : 0;

  const stockProgress = product.stock
    ? (product.stock.items_sold / product.stock.total_items) * 100
    : 0;

  return (
    <div className="product-card">
      <a href="#" className="product-image-link">
        <img
          src={product.feature_photo}
          alt={product.name}
          className="product-image"
        />
        {discountPercent > 0 && (
          <div className="product-discount-badge">-{discountPercent}%</div>
        )}
        <div className="product-quick-view">
          <i className="bi bi-eye"></i>
        </div>
      </a>
      <div className="product-info ">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-pricing">
          <div className="product-price-new">
            UGX {price_1.toLocaleString()}
          </div>
          {price_2 > price_1 && (
            <div className="product-price-old">
              UGX {price_2.toLocaleString()}
            </div>
          )}
        </div>
        {product.stock && (
          <div className="product-stock-progress">
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${stockProgress}%` }}
              ></div>
            </div>
            <span className="items-sold">{product.stock.items_sold} Sold</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
