// src/app/components/HomePage/HeroCarousel.tsx
import React from "react";
import { Carousel, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useManifestCategories, useManifest } from "../../hooks/useManifest";
import Utils from "../../utils/imageUtils";
import "./HeroCarousel.css";

const HeroCarousel: React.FC = () => {
  const categories = useManifestCategories();
  const { isLoading, error } = useManifest();

  console.log("🎠 HeroCarousel API Status:", {
    isLoading,
    error: error ? "API Error" : null,
    categoriesCount: categories?.length || 0,
  });

  // Filter categories that have show_in_banner = "Yes" exactly like Flutter
  const bannerCategories =
    categories?.filter((cat) => {
      const showInBanner =
        cat.show_in_banner?.toString().toLowerCase() === "yes";
      const hasBannerImage = cat.banner_image && cat.banner_image.trim() !== "";
      console.log(
        `🎠 Category "${cat.category}": show_in_banner="${cat.show_in_banner}" -> ${showInBanner}, has_image=${hasBannerImage}`
      );
      return showInBanner; // Only check show_in_banner, image is optional
    }) || [];

  console.log(
    "🎠 All categories:",
    categories?.map((cat) => ({
      id: cat.id,
      name: cat.category,
      show_in_banner: cat.show_in_banner,
    }))
  );

  console.log(
    "🎠 Banner categories filtered:",
    bannerCategories.map((cat) => ({
      id: cat.id,
      name: cat.category,
      banner_image: cat.banner_image,
      show_in_banner: cat.show_in_banner,
      imageUrl: Utils.img(cat.banner_image),
    }))
  );

  if (isLoading) {
    return (
      <div className="hero-carousel-wrapper">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "400px", backgroundColor: "#f8f9fa" }}
        >
          <Spinner animation="border" variant="primary" />
          <span className="ms-2">Loading banners...</span>
        </div>
      </div>
    );
  }

  if (error || bannerCategories.length === 0) {
    return (
      <div className="hero-carousel-wrapper">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "400px", backgroundColor: "#f8f9fa" }}
        >
          <div className="text-center">
            <h5 className="text-muted">No banners configured</h5>
            <p className="text-muted">
              Contact admin to set up category banners
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-carousel-clean">
      <Carousel
        interval={4000} // 4 seconds like Flutter
        fade={true} // Modern fade effect
        pause="hover"
        controls={false}
        indicators={true}
        className="modern-hero-carousel"
        aria-label="Product category banners"
      >
        {bannerCategories.map((category) => {
          const bannerImageUrl = category.banner_image
            ? Utils.img(category.banner_image)
            : null;

          return (
            <Carousel.Item key={category.id}>
              <Link
                to={`/products?category=${category.id}`}
                className="text-decoration-none d-block "
                aria-label={`Shop ${category.category} products`}
>
                <div
                  className="hero-slide"
                  style={{
                    height: "450px",
                    background: bannerImageUrl
                      ? `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.3)), url(${bannerImageUrl})`
                      : `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                    borderRadius: "0",
                    overflow: "hidden",
                  }}
                >
                  {/* Subtle category badge in bottom left */}
                  <div className="position-absolute bottom-0 start-0 p-4">
                    <span className="badge bg-dark bg-opacity-75 text-white px-3 py-2 fs-6">
                      {category.category}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="hero-slide-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center opacity-0">
                    <div className="text-center text-white">
                      <h3 className="mb-2">Shop {category.category}</h3>
                      <span className="btn btn-light px-4">
                        Explore Collection →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
