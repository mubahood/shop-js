import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import Utils from "../../../services/Utils";

interface LandingRecommendedProductsSectionProps {
  manifest?: any;
}

interface ProductItem {
  id: number;
  name: string;
  mainImage: string;
  hoverImage: string | null;
  price: string;
  discount: number;
}

const ProductCard: React.FC<{ product: ProductItem }> = ({ product }) => {
  const { id, name, mainImage, hoverImage, price, discount } = product;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="col-6 col-md-4 col-lg-3 col-xl-2 mb-4 h-100"
      role="listitem"
      aria-label={name}
    >
      {/* Entire card is clickable, linking to /product/<id> */}
      <Link
        to={`/product/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="d-flex flex-column h-100"
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
                  // If hoverImage exists and we're hovered, show it; otherwise show mainImage
                  src={isHovered && hoverImage ? hoverImage : mainImage}
                  alt={name}
                />
                <div className="crop-image-container__mask" />
              </div>
            </div>
          </div>

          <div className="product-card__bottom-wrapper px-2 py-2 mt-auto">
            <div className="product-card__goods-title-container mb-1">
              <span className="goods-title-link">{name}</span>
            </div>
            <div className="bottom-wrapper__price-wrapper d-flex align-items-center justify-content-between">
              <div className="product-card__price">
                <div className="product-card__prices-info">
                  {/* Display UGX instead of $ */}
                  <span className="price-text">UGX {price}</span>
                  {discount > 0 && (
                    <span className="product-card__discount-label">
                      -{discount}%
                    </span>
                  )}
                </div>
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

const LandingRecommendedProductsSection: React.FC<
  LandingRecommendedProductsSectionProps
> = ({ manifest }) => {
  // 1) Grab data from manifest.SECTION_2_PRODUCTS or default to an empty object
  const section2Data = manifest?.SECTION_2_PRODUCTS || {};

  // 2) Convert the object into an array of products
  const productsArray: ProductItem[] = Object.keys(section2Data).map((key) => {
    const item = section2Data[key] || {};

    // Attempt to parse the "rates" JSON to find a second image
    let hoverImage: string | null = null;
    try {
      const rates = JSON.parse(item.rates || "[]");
      // If there's a second item in rates, use that as hover image
      if (Array.isArray(rates) && rates[1]?.src) {
        hoverImage = Utils.img(rates[1].src);
      }
    } catch (err) {
      console.warn("Could not parse rates for product", item.id, err);
    }

    return {
      id: item.id,
      name: item.name ?? "Untitled",
      // Main image is the feature_photo or placeholder
      mainImage: item.feature_photo
        ? Utils.img(item.feature_photo)
        : toAbsoluteUrl("media/products/placeholder.png"),
      // Hover image is from second `rates` entry (if present)
      hoverImage,
      // Use UGX as currency
      price: item.price_1 ? parseFloat(item.price_1).toFixed(2) : "0.00",
      discount: 0, // If your manifest doesn't track discounts, keep it 0
    };
  });

  // 3) Inject CSS styles on mount
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      /* No visible borders */
      .product-card {
        border: none !important;
        background-color: #fff;
        transition: transform 0.2s;
      }
      .product-card:hover {
        transform: translateY(-3px);
      }

      /* Crop Image Container */
      .product-card__top-wrapper {
        position: relative;
      }
      .product-card__img-container {
        width: 100%;
      }
      .crop-image-container {
        position: relative;
        width: 100%;
        padding-bottom: 100%; /* Square aspect ratio */
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
        background: rgba(0, 0, 0, 0.1);
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
      }
      .product-card:hover .crop-image-container__mask {
        opacity: 1;
      }

      /* Bottom Section */
      .product-card__bottom-wrapper {
        background-color: #fff;
      }
      .product-card__goods-title-container .goods-title-link {
        font-size: 1rem;
        font-weight: 500;
        color: black;
        transition: color 0.2s;
      }
      .product-card:hover .goods-title-link {
        color: #f33d02;
      }

      /* Price and Discount Info */
      .price-text {
        font-size: 1rem;
        font-weight: 600;
        color: #114786;
        margin-right: 0.5rem;
      }
      .product-card__discount-label {
        background-color: #dc3545;
        color: #fff;
        padding: 0.1rem 0.4rem;
        border-radius: 4px;
        font-size: 0.875rem;
      }

      /* Add to Cart Button */
      .product-card__add-btn {
        display: inline-block;
        border: none;
        border-radius: 4px;
        background: transparent;
        padding: 0.5rem;
        cursor: pointer;
        transition: background-color 0.2s ease, transform 0.2s ease;
      }
      .product-card__add-btn:hover {
        background-color: #f8f9fa;
        transform: scale(1.05);
      }

      /* CTA Browse Button */
      .cta-browse-btn {
        text-decoration: none;
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
        font-weight: 600;
        border-radius: 4px;
        transition: background-color 0.2s ease, transform 0.2s ease;
      }
      .cta-browse-btn:hover {
        background-color: #0056b3;
        transform: scale(1.02);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // 4) If there are no products, show fallback
  if (productsArray.length === 0) {
    return (
      <section className="container py-4">
        <h2 className="text-center mb-5">Recommended Products</h2>
        <p className="text-center text-muted">No products found</p>
      </section>
    );
  }

  return (
    <section className="container py-4">
      <h2 className="text-center mb-5">Recommended Products</h2>

      {/* 2 products per row on mobile (col-6) */}
      <div className="row gy-4" role="list">
        {productsArray.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-5">
        <a href="/shop" className="btn btn-lg btn-primary cta-browse-btn">
          Browse All Products
        </a>
      </div>
    </section>
  );
};

export default LandingRecommendedProductsSection;
