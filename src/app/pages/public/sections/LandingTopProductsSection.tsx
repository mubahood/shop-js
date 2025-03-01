import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import Utils from "../../../services/Utils";
import { useAuth } from "../../../modules/auth"; // adjust the path as needed

// Simple fade animation variant
const fadeVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

interface LandingTopProductsSectionProps {
  manifest?: any;
}

// Helper to chunk an array into 3 parts
function divideIntoThree<T>(array: T[]): T[][] {
  const total = array.length;
  const perSlice = Math.ceil(total / 3);
  const slices = [];
  let start = 0;
  for (let i = 0; i < 3; i++) {
    const end = start + perSlice;
    slices.push(array.slice(start, end));
    start = end;
  }
  return slices;
}

const LandingTopProductsSection: React.FC<LandingTopProductsSectionProps> = ({ manifest }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { addToCart, isInCart } = useAuth();

  // 1) Get products from manifest.SECTION_1_PRODUCTS or default to empty object
  const section1Data = manifest?.SECTION_1_PRODUCTS || {};

  // 2) Convert the object into an array of products
  const productArray = Object.keys(section1Data).map((key) => {
    const item = section1Data[key] || {};
    return {
      id: item.id,
      name: item.name ?? "Untitled",
      imageUrl: item.feature_photo
        ? Utils.img(item.feature_photo)
        : toAbsoluteUrl("media/products/placeholder.png"),
      price: item.price_1 ? `UGX ${item.price_1}` : "UGX 0.00",
      discount: item.discount, // may be undefined
    };
  });

  // 3) Split productArray into three parts
  const [springSale, allUnderOne, quickShip] = divideIntoThree(productArray);

  // 4) Build tab data
  const tabData = [
    { label: "BEST SELLERS", products: springSale },
    { label: "LESS THAN 10K", products: allUnderOne },
    { label: "QuickShip", products: quickShip },
  ];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  // Add-to-cart handler for slider items
  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product: any
  ) => {
    e.preventDefault();
    e.stopPropagation();
    // Remove the "UGX " prefix and convert price
    const priceNumber = parseFloat(product.price.replace("UGX ", ""));
    const productModel = {
      id: product.id.toString(),
      price: priceNumber,
      name: product.name,
      mainImage: product.imageUrl,
      discount: product.discount || 0,
    };
    addToCart(productModel);
  };

  // Fallback if no products
  if (productArray.length === 0) {
    return (
      <div className="container py-5">
        <p className="text-center text-muted">No products found</p>
      </div>
    );
  }

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      /* Card Styling */
      .card {
        background-color: #fff;
        border: 0;
        border-radius: 4px;
        overflow: hidden;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      /* Image Container */
      .card .position-relative {
        background-color: #fff;
      }
      .card img {
        object-fit: cover;
      }
      /* Overlay Cart Button */
      .cart-btn {
        position: absolute;
        bottom: 10px;
        right: 10px;
        z-index: 10;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        cursor: pointer;
        transition: transform 0.2s ease, opacity 0.2s ease;
        opacity: 0;
      }
      .card:hover .cart-btn {
        opacity: 1;
      }
      /* Add-to-Cart Button (not in cart) */
      .cart-btn.add {
        background-color: transparent;
        border: 2px solid #f33d02;
        color: #f33d02;
      }
      .cart-btn.add:hover {
        background-color: #f33d02;
        color: #fff;
        transform: scale(1.1);
      }
      /* Checkout Button (in cart) */
      .cart-btn.checkout {
        background-color: #114786;
        border: none;
        color: #fff;
      }
      .cart-btn.checkout:hover {
        background-color: #0e3558;
        transform: scale(1.1);
      }
      /* Tab Button Styling */
      .tab-btn {
        border: none;
        background: none;
        padding: 0;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: border-color 0.25s, color 0.25s;
      }
      /* Responsive: 6 slides per view on extra-large screens */
      @media (min-width: 1200px) {
        .swiper-slide {
          flex: 0 0 16.66% !important;
          max-width: 16.66% !important;
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

  return (
    <motion.div
      className="container py-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeVariant}
    >
      {/* Tabs */}
      <div className="d-flex justify-content-center mb-4 gap-4">
        {tabData.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className="tab-btn"
              style={{
                color: isActive ? "#f33d02" : "#767676",
                borderBottom: isActive
                  ? "2px solid #f33d02"
                  : "2px solid transparent",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Horizontal Slider */}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          576: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          992: { slidesPerView: 5 },
          1200: { slidesPerView: 6 },
        }}
      >
        {tabData[activeTab].products.map((product) => (
          <SwiperSlide key={product.id}>
            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <motion.div
                className="card"
                whileHover={{ scale: 1.02 }}
                style={{ position: "relative", overflow: "hidden" }}
              >
                <div
                  className="position-relative w-100"
                  style={{ height: "220px" }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="img-fluid w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                  {isInCart(product.id.toString()) ? (
                    <Link
                      to="/cart"
                      className="cart-btn checkout"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="bi bi-cart-check"></i>
                    </Link>
                  ) : (
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="cart-btn add"
                    >
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  )}
                </div>
                <div className="card-body p-2">
                  <h6 className="fw-semibold mb-1" style={{ fontSize: "0.9rem" }}>
                    {product.name}
                  </h6>
                  <div className="d-flex align-items-center">
                    <span
                      className="text-primary fw-bold me-2"
                      style={{ fontSize: "1rem" }}
                    >
                      {product.price}
                    </span>
                    {product.discount && (
                      <span
                        className="badge bg-danger text-white"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {product.discount}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-center mt-5">
        <a href="/shop" className="btn btn-lg btn-primary cta-browse-btn">
          Browse All Products
        </a>
      </div>
    </motion.div>
  );
};

export default LandingTopProductsSection;
