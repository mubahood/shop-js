import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import Utils from "../../../services/Utils";
import { useAuth } from "../../../modules/auth"; // adjust the path as needed

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
  const { addToCart, isInCart } = useAuth();
  // Check if the product is already in the cart using its string id
  const inCart = isInCart(id.toString());

  // When clicked, stop event propagation and add the product to the cart
  const handleAddToCart = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const productModel = {
      id: id.toString(),
      price: parseFloat(price),
      name,
      mainImage,
      hoverImage,
      discount,
    };
    addToCart(productModel);
  };

  return (
    <div
      className="col-6 col-md-4 col-lg-3 col-xl-2 product-col mb-3 h-100"
      role="listitem"
      aria-label={name}
    >
      <Link
        to={`/product/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="d-flex flex-column h-100"
      >
        <div className="product-card d-flex flex-column h-100 p-2">
          <div className="product-card__top-wrapper">
            <div className="product-card__img-container">
              <div className="crop-image-container">
                <img
                  className="crop-image-container__img img-fluid"
                  src={isHovered && hoverImage ? hoverImage : mainImage}
                  alt={name}
                />
                <div className="crop-image-container__mask" />
              </div>
            </div>
          </div>
          <div className="product-card__bottom-wrapper d-flex flex-column justify-content-between mt-auto pt-2">
            <div className="product-card__goods-title-container mb-1">
              <span className="goods-title-link">{name}</span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="product-card__price">
                <div className="product-card__prices-info">
                  <span className="price-text">UGX {price}</span>
                  {discount > 0 && (
                    <span className="product-card__discount-label">
                      -{discount}%
                    </span>
                  )}
                </div>
              </div>
              {inCart ? (
                <Link
                  to="/cart"
                  className="product-card__add-btn btn btn-sm btn-success"
                >
                  <i className="bi bi-cart-check"></i>
                </Link>
              ) : (
                <span
                  className="product-card__add-btn btn btn-sm btn-outline-primary"
                  role="button"
                  onClick={handleAddToCart}
                >
                  <i className="bi bi-cart-plus"></i>
                </span>
              )}
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
  const section2Data = manifest?.SECTION_2_PRODUCTS || {};
  const productsArray: ProductItem[] = Object.keys(section2Data).map((key) => {
    const item = section2Data[key] || {};
    let hoverImage: string | null = null;
    try {
      const rates = JSON.parse(item.rates || "[]");
      if (Array.isArray(rates) && rates[1]?.src) {
        hoverImage = Utils.img(rates[1].src);
      }
    } catch (err) {
      console.warn("Could not parse rates for product", item.id, err);
    }
    return {
      id: item.id,
      name: item.name ?? "Untitled",
      mainImage: item.feature_photo
        ? Utils.img(item.feature_photo)
        : toAbsoluteUrl("media/products/placeholder.png"),
      hoverImage,
      price: item.price_1 ? parseFloat(item.price_1).toFixed(2) : "0.00",
      discount: 0,
    };
  });

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      /* Container for each product */
      .product-card {
        background-color: #fff;
        padding: 0.5rem;
        transition: transform 0.2s, box-shadow 0.2s;
        border-radius: 4px;
      }
      .product-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      .product-card__top-wrapper {
        position: relative;
      }
      .product-card__img-container {
        width: 100%;
        background-color: #fff;
      }
      .crop-image-container {
        position: relative;
        width: 100%;
        padding-bottom: 100%;
        overflow: hidden;
        background-color: #fff;
        border-radius: 4px;
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
        background: rgba(0, 0, 0, 0.05);
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
      }
      .product-card:hover .crop-image-container__mask {
        opacity: 1;
      }
      /* Title and Price */
      .goods-title-link {
        font-size: 0.9rem;
        font-weight: 500;
        color: #333;
        margin-top: 0.5rem;
      }
      .price-text {
        font-size: 0.9rem;
        font-weight: 600;
        color: #114786;
      }
      .product-card__discount-label {
        background-color: #f33d02;
        color: #fff;
        padding: 0.05rem 0.3rem;
        border-radius: 2px;
        font-size: 0.75rem;
      }
      /* Icon Buttons */
      .product-card__add-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 4px;
        padding: 0.3rem 0.5rem;
        cursor: pointer;
        transition: background-color 0.2s ease, transform 0.2s ease;
      }
      .btn-outline-primary {
        background-color: transparent;
        border: 1px solid #f33d02;
        color: #f33d02;
      }
      .btn-outline-primary:hover {
        background-color: #f33d02;
        color: #fff;
      }
      .btn-success {
        background-color: #114786;
        border: none;
        color: #fff;
      }
      .btn-success:hover {
        background-color: #0e3558;
      }
      /* Responsive: 5 items per row on extra large screens */
      @media (min-width: 1200px) {
        .product-col {
          flex: 0 0 20% !important;
          max-width: 20% !important;
        }
      }
      /* Browse button */
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
