import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import Utils from "../../../services/Utils";

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
  // Create slices of the array
  const slices = [];
  let start = 0;

  for (let i = 0; i < 3; i++) {
    const end = start + perSlice;
    slices.push(array.slice(start, end));
    start = end;
  }
  // Return an array of 3 sub-arrays (some may be empty)
  return slices;
}

const LandingTopProductsSection: React.FC<LandingTopProductsSectionProps> = ({
  manifest,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  // 1) Pull products from manifest.SECTION_1_PRODUCTS
  //    If it's missing/empty, default to an empty object
  const section1Data = manifest?.SECTION_1_PRODUCTS || {};

  // 2) Convert the object into an array
  const productArray = Object.keys(section1Data).map((key) => {
    const item = section1Data[key] || {};
    return {
      id: item.id,
      name: item.name ?? "Untitled",
      // Build image URL or fallback
      imageUrl: item.feature_photo
        ? Utils.img(item.feature_photo)
        : toAbsoluteUrl("media/products/placeholder.png"),
      // Convert price_1 to a readable price, fallback to "$0.00"
      price: item.price_1 ? `UGX ${item.price_1}` : "UGX 0.00",
      // If your manifest doesn't have discount data, this will remain undefined
      // but we keep it for design consistency.
      discount: undefined,
    };
  });

  // 3) Split the entire product array into 3 arrays
  const [springSale, allUnderOne, quickShip] = divideIntoThree(productArray);

  // 4) Build tab data as in your original code
  const tabData = [
    { label: "BEST SELLERS", products: springSale },
    { label: "LESS THAN 10K", products: allUnderOne },
    { label: "QuickShip", products: quickShip },
  ];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  // 5) If no products at all, show a fallback
  const totalProductsCount = productArray.length;
  if (totalProductsCount === 0) {
    return (
      <div className="container py-5">
        <p className="text-center text-muted">No products found</p>
      </div>
    );
  }

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
              className="btn btn-link fw-semibold position-relative p-0"
              style={{
                color: isActive ? "#f33d02" : "#767676",
                textDecoration: "none",
                borderBottom: isActive
                  ? "2px solid #f33d02"
                  : "2px solid transparent",
                outline: "none",
                transition: "border-color 0.25s, color 0.25s",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Horizontal Slider for the active tab */}
      <Swiper
        modules={[Navigation]}
        navigation={true}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          576: { slidesPerView: 3 }, // small screens ≥576px
          768: { slidesPerView: 4 }, // medium screens ≥768px
          992: { slidesPerView: 5 }, // large screens ≥992px
          1200: { slidesPerView: 6 }, // extra-large screens ≥1200px
        }}
      >
        {tabData[activeTab].products.map((product) => (
          <SwiperSlide key={product.id}>
            <motion.div
              className="card border-0"
              whileHover={{ scale: 1.02 }}
              style={{ overflow: "hidden" }}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default LandingTopProductsSection;
