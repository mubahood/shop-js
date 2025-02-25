import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";

interface LandingHeroSectionProps {
  manifest?: any;
}

const fadeVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slides = [
  "media/stock/900x600/1.jpg",
  "media/stock/900x600/2.jpg",
  "media/stock/900x600/3.jpg",
  "media/stock/900x600/4.jpg",
  "media/stock/900x600/70.jpg",
];

const topProducts = [
  {
    image: "media/products/1.png",
    name: "Wireless Headphones",
    price: "$49.99",
  },
  {
    image: "media/products/2.png",
    name: "Smartwatch",
    price: "$129.99",
  },
  {
    image: "media/products/3.png",
    name: "Portable Bluetooth Speaker",
    price: "$29.99",
  },
  {
    image: "media/products/4.png",
    name: "Drone with Camera",
    price: "$399.99",
  },
];

const LandingHeroSection: React.FC<LandingHeroSectionProps> = ({
  manifest,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  });

  return (
    <motion.div
      className="container py-3 px-lg-10"
      initial="hidden"
      animate="visible"
      variants={fadeVariant}
      style={{ /*  maxWidth: "1200px", */ margin: "0 auto" }}
    >
      <div className="row g-3">
        {/* LEFT BANNER */}
        <div className="col-md-3">
          <motion.div
            className="card border-0 shadow-sm overflow-hidden"
            variants={fadeVariant}
            style={{ height: "300px", position: "relative" }}
          >
            <img
              src={toAbsoluteUrl("media/banners/metronic-ph.png")}
              alt="Promotional Banner"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              className="card-body"
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                padding: "10px",
              }}
            >
              <h6 className="fw-bold" style={{ color: "#f33d02" }}>
                Limited Time Offer
              </h6>
              <p className="mb-2" style={{ fontSize: "0.8rem" }}>
                Save big on select electronics. Use code{" "}
                <strong style={{ fontWeight: "bold" }}>TECHDEAL</strong>
              </p>
              <button
                className="btn btn-sm"
                style={{
                  backgroundColor: "#114786",
                  color: "white",
                  padding: "5px 10px",
                  fontSize: "0.7rem",
                }}
              >
                Collect Coupon
              </button>
            </div>
          </motion.div>
        </div>

        {/* MIDDLE SLIDER */}
        <div className="col-md-6">
          <motion.div
            className="position-relative overflow-hidden rounded shadow-sm"
            variants={fadeVariant}
            style={{ height: "300px" }}
          >
            <motion.img
              key={slides[currentSlide]}
              src={toAbsoluteUrl(slides[currentSlide])}
              alt={`Slide ${currentSlide + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />

            <button
              className="btn btn-icon btn-sm rounded-circle"
              onClick={handlePrev}
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                color: "white",
              }}
            >
              <i className="bi bi-chevron-left text-white"></i>
            </button>
            <button
              className="btn btn-icon btn-sm rounded-circle"
              onClick={handleNext}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                color: "white",
              }}
            >
              <i className="bi bi-chevron-right text-white"></i>
            </button>

            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {slides.map((_, index) => (
                <span
                  key={index}
                  onClick={() => goToSlide(index)}
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor:
                      index === currentSlide ? "#114786" : "#bbb",
                    margin: "0 5px",
                    cursor: "pointer",
                  }}
                ></span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT TOP PRODUCTS */}
        <div className="col-md-3">
          <motion.div
            className="d-flex flex-column justify-content-between"
            variants={fadeVariant}
            style={{ height: "300px" }}
          >
            <div className="row g-2 flex-grow-1">
              {topProducts.map((product, index) => (
                <div className="col-6" key={index}>
                  <div
                    className="card border-0 shadow-sm"
                    style={{
                      height: "140px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={toAbsoluteUrl(product.image)}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLImageElement).style.transform =
                          "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLImageElement).style.transform =
                          "scale(1)";
                      }}
                    />
                    <div
                      className="card-body p-2"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        padding: "5px",
                        transform: "translateY(100%)",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform =
                          "translateY(0)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform =
                          "translateY(100%)";
                      }}
                    >
                      <h6
                        className="fw-semibold mb-1"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {product.name}
                      </h6>
                      <p
                        className="text-muted small mb-0"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {product.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LandingHeroSection;
