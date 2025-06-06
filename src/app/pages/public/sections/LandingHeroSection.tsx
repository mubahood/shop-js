import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import Utils from "../../../services/Utils";
import ShimmerImage from "../../../components/ShimmerImage";

interface LandingHeroSectionProps {
  manifest?: any;
}

const fadeVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const LandingHeroSection: React.FC<LandingHeroSectionProps> = ({
  manifest,
}) => {
  const leftBannerImage = manifest?.FIRST_BANNER?.first_banner_image
    ? Utils.img(manifest.FIRST_BANNER.first_banner_image)
    : toAbsoluteUrl("media/banners/metronic-ph.png");
  const leftBannerCategoryId = manifest?.FIRST_BANNER?.category_id || null;
  const leftBannerUrl = leftBannerCategoryId
    ? `/shop?category=${leftBannerCategoryId}`
    : "/shop";

  const slides =
    Array.isArray(manifest?.SLIDER_CATEGORIES) &&
    manifest.SLIDER_CATEGORIES.length > 0
      ? manifest.SLIDER_CATEGORIES.map((cat: any) => ({
          id: cat.id,
          image: cat.banner_image ? Utils.img(cat.banner_image) : "",
        }))
      : [];

  const topProducts = Array.isArray(manifest?.TOP_4_PRODUCTS)
    ? manifest.TOP_4_PRODUCTS.map((product: any) => ({
        id: product.id,
        image: product.feature_photo
          ? Utils.img(product.feature_photo)
          : toAbsoluteUrl("media/products/placeholder.png"),
        name: product.name ?? "Untitled",
        price: product.price_1 ? `${product.price_1}` : "0.00",
      }))
    : [];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const handlePrev = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides]);

  return (
    <motion.div
      className="container py-3 px-lg-10"
      initial="hidden"
      animate="visible"
      variants={fadeVariant}
      style={{ margin: "0 auto" }}
    >
      <div className="row g-3">
        {/* LEFT BANNER */}
        <div className="col-md-3">
          <motion.div
            className="card border-0 shadow-sm overflow-hidden"
            variants={fadeVariant}
            style={{ height: "300px", position: "relative" }}
          >
            <Link
              to={leftBannerUrl}
              style={{ display: "block", height: "100%" }}
            >
              <ShimmerImage
                src={leftBannerImage}
                alt="Promotional Banner"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                className="card-body"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
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
            </Link>
          </motion.div>
        </div>

        {/* MIDDLE SLIDER */}
        <div className="col-md-6">
          {slides.length > 0 ? (
            <motion.div
              className="position-relative overflow-hidden rounded shadow-sm"
              variants={fadeVariant}
              style={{ height: "300px" }}
            >
              <Link
                to={`/shop?category=${slides[currentSlide].id}`}
                style={{ display: "block", height: "100%" }}
              >
                <ShimmerImage
                  key={slides[currentSlide].image}
                  src={slides[currentSlide].image}
                  alt={`Slide ${currentSlide + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Link>

              {slides.length > 1 && (
                <>
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
                    {slides.map((_: any, index: number) => (
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
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center bg-light"
              style={{ height: "300px" }}
            >
              <p className="text-muted mb-0">No Banners Found</p>
            </div>
          )}
        </div>

        {/* RIGHT TOP PRODUCTS */}
        <div className="col-md-3">
          <motion.div
            className="d-flex flex-column justify-content-between"
            variants={fadeVariant}
            style={{ height: "300px" }}
          >
            <div className="row g-2 flex-grow-1">
              {topProducts.length > 0 ? (
                topProducts.map(
                  (
                    product: { id: any; image: string | undefined; price: any },
                    index: React.Key | null | undefined
                  ) => (
                    <div className="col-6" key={index}>
                      <Link
                        to={
                          product.id
                            ? `/product/${product.id}`
                            : "/product/unknown"
                        }
                        className="card border-0 shadow-sm"
                        style={{
                          height: "140px",
                          position: "relative",
                          overflow: "hidden",
                          display: "block",
                        }}
                      >
                        <ShimmerImage
                          src={
                            product.image ||
                            toAbsoluteUrl("media/products/placeholder.png")
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
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
                          }}
                        >
                          {/*    <h6 className="fw-semibold mb-1 text-white" style={{ fontSize: "0.8rem" }}>
                          {product.name}
                        </h6> */}
                          <p
                            className="text-white small mb-0"
                            style={{ fontSize: "0.7rem" }}
                          >
                            UGX {Utils.moneyFormat(product.price)}
                          </p>
                        </div>
                      </Link>
                    </div>
                  )
                )
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: "100%", width: "100%" }}
                >
                  <p className="text-muted mb-0">No Products Found</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>



    </motion.div>
  );
};

export default LandingHeroSection;
