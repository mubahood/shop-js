import React, { useState, useEffect } from "react";

const productImages = [
  "media/products/1.png",
  "media/products/2.png",
  "media/products/3.png",
  "media/products/4.png",
  "media/products/5.png",
  "media/products/6.png",
  "media/products/7.png",
  "media/products/8.png",
  "media/products/9.png",
  "media/products/10.png",
  "media/products/11.png",
  "media/products/12.png",
  "media/products/13.png",
  "media/products/14.png",
  "media/products/15.png",
  "media/products/16.png",
  "media/products/17.png",
  "media/products/18.png",
  "media/products/19.png",
  "media/products/20.png",
  "media/products/21.png",
  "media/products/23.png",
  "media/products/24.png",
];

const dummyImages = [
  "media/products/1.png",
  "media/products/2.png",
  "media/products/3.png",
  "media/products/4.png",
  "media/products/5.png",
  "media/products/6.png",
  "media/products/7.png",
  "media/products/8.png",
  "media/products/9.png",
  "media/products/10.png",
  "media/products/11.png",
  "media/products/12.png",
  "media/products/13.png",
  "media/products/14.png",
  "media/products/15.png",
  "media/products/16.png",
  "media/products/17.png",
  "media/products/18.png",
  "media/products/19.png",
  "media/products/20.png",
];

const products = productImages.map((image, index) => ({
  id: index,
  name: `Sample Product ${index + 1}`,
  image,
  price: (Math.random() * 10 + 1).toFixed(2),
  discount: Math.floor(Math.random() * 60),
}));

const ProductCard = ({ product }) => {
  const { name, image, price, discount } = product;
  const [isHovered, setIsHovered] = useState(false);
  const [hoverImage, setHoverImage] = useState(null);

  const handleMouseEnter = () => {
    const randomDummyImage =
      dummyImages[Math.floor(Math.random() * dummyImages.length)];
    setHoverImage(randomDummyImage);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="col-6 col-md-4 col-lg-3 col-xl-2"
      role="listitem"
      tabIndex={0}
      aria-label={name}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="product-card multiple-row-card j-expose__product-item product-item-ccc"
        style={{
          height: "100%",
          transition: "transform 0.2s",
          cursor: "pointer",
        }}
      >
        <div className="product-card__top-wrapper">
          <div
            className="product-card__img-container j-expose__product-item-img"
            tabIndex={0}
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <div className="crop-image-container">
              <img
                className="crop-image-container__img img-fluid"
                src={isHovered && hoverImage ? hoverImage : image}
                alt={name}
              />
              <div className="crop-image-container__mask" />
            </div>
          </div>
        </div>
        <div className="product-card__bottom-wrapper">
          <div className="product-card__goods-title-container">
            <a className="goods-title-link goods-title-link--jump" tabIndex={0}>
              {name}
            </a>
          </div>
          <div className="bottom-wrapper__price-wrapper">
            <div className="product-card__price">
              <div className="product-card__prices-info">
                <span className="fw-bold text-primary fs-5">${price}</span>
                {discount > 0 && (
                  <span className="product-card__discount-label">
                    -{discount}%
                  </span>
                )}
              </div>
            </div>
            <button
              className="product-card__add-btn btn btn-sm"
              role="button"
              aria-label="ADD TO CART"
            >
              <i className="bi bi-cart-plus text-primary"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingRecommendedProductsSection = () => {
  useEffect(() => {
    // Inject CSS styles into the document head
    const style = document.createElement("style");
    style.innerHTML = `
      /* Product Card Base */
      .product-card {
        background-color: #fff;
        border-radius: 4px;
        overflow: hidden;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      }
      .product-card:hover {
        transform: translateY(-3px);
      }
      .multiple-row-card, .j-expose__product-item, .product-item-ccc {
        /* Additional styles can be defined here if needed */
      }
      .product-card__top-wrapper {
        position: relative;
      }
      
      /* Crop Image Container */
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
        padding: 0.5rem;
        background-color: #fff;
      }
      .product-card__goods-title-container {
        font-size: 1rem;
        font-weight: 500;
        color: #333;
        margin-bottom: 0.5rem;
      }
      
      /* Price and Discount Info */
      .bottom-wrapper__price-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .product-card__price {
        font-size: 1rem;
      }
      .product-card__prices-info {
        display: flex;
        align-items: center;
      }
      .product-card__discount-label {
        background-color: #dc3545;
        color: #fff;
        padding: 0.1rem 0.4rem;
        border-radius: 4px;
        font-size: 0.875rem;
        margin-left: 0.5rem;
      }
      
      /* Add to Cart Button */
      .product-card__add-btn {
        border: 1px solid black;
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
      
      /* Call-to-Action Button */
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

  return (
    <section className="container py-4">
      <h2 className="text-center mb-5">Recommended Products</h2>
      <div className="row gy-4" role="list">
        {products.map((product) => (
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
