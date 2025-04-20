import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import Utils from "../../../services/Utils";
import { useAuth } from "../../../modules/auth";
import ShimmerImage from "../../../components/ShimmerImage";

interface LandingRecommendedProductsSectionProps {
  manifest?: any;
}

interface ProductItem {
  id: number;
  name: string;
  mainImage: string;
  hoverImage: string | null;
  priceNum: number;
  priceLabel: string;
}

const ProductCard: React.FC<{ product: ProductItem }> = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const { addToCart, isInCart } = useAuth();
  const inCart = isInCart(String(product.id));

  return (
    <div
      className="col d-flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card w-100 shadow-sm product-card">
        <Link
          to={`/product/${product.id}`}
          className="text-decoration-none text-dark d-flex flex-column h-100"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1 / 1",
              background: "#e9ecef",
            }}
          >
            <ShimmerImage
              src={
                hovered && product.hoverImage
                  ? product.hoverImage
                  : product.mainImage
              }
              alt={product.name}
              width={200}
              height={200}
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
          </div>
          <div className="card-body p-2 d-flex flex-column bg-white">
            <h6
              className="mb-2"
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.3,
                height: "2.4rem",
                overflow: "hidden",
                fontWeight: 500,
              }}
            >
              {product.name}
            </h6>
            <div className="mt-auto d-flex justify-content-between align-items-center">
              <span style={{ color: "#0517A1FF", fontWeight: 600 }}>
                UGX {product.priceLabel}
              </span>
              {inCart ? (
                <Link
                  to="/cart"
                  className="btn btn-sm btn-primary p-1"
                  style={{ width: 32, height: 32, borderRadius: "50%" }}
                >
                  <i className="bi bi-cart-check" />
                </Link>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart({
                      id: String(product.id),
                      price: product.priceNum,
                      name: product.name,
                      mainImage: product.mainImage,
                    });
                  }}
                  className="btn btn-sm btn-outline-primary p-1"
                  style={{ width: 32, height: 32, borderRadius: "50%" }}
                >
                  <i className="bi bi-cart-plus" />
                </button>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

const LandingRecommendedProductsSection: React.FC<
  LandingRecommendedProductsSectionProps
> = ({ manifest }) => {
  const section2 = manifest?.SECTION_2_PRODUCTS || {};
  const products: ProductItem[] = Object.values(section2).map((item: any) => {
    let hover: string | null = null;
    try {
      const rates = JSON.parse(item.rates || "[]");
      if (Array.isArray(rates) && rates[1]?.src)
        hover = Utils.img(rates[1].src);
    } catch {}
    const priceNum = Number(item.price_1) || 0;
    return {
      id: item.id,
      name: item.name || "Untitled",
      mainImage: item.feature_photo
        ? Utils.img(item.feature_photo)
        : toAbsoluteUrl("media/products/placeholder.png"),
      hoverImage: hover,
      priceNum,
      priceLabel: Utils.moneyFormat(item.price_1),
    };
  });

  useEffect(() => {
    const css = document.createElement("style");
    css.textContent = `
      .recommended-section { padding: 2rem 0; }
      .recommended-grid { margin: 0 -0.5rem; }
      .recommended-grid .col { padding: 0 0.5rem; margin-bottom: 1rem; }
      @media (min-width: 1200px) {
        .recommended-grid .col { flex: 0 0 16.6667%; max-width: 16.6667%; }
      }
      .product-card { transition: transform 0.2s, box-shadow 0.2s; }
      .product-card:hover { transform: translateY(-4px); box-shadow: 0 6px 20px rgba(0,0,0,0.1); }
    `;
    document.head.appendChild(css);
    return () => {
      document.head.removeChild(css);
    };
  }, []);

  if (!products.length) {
    return (
      <section className="recommended-section container">
        <h2 className="text-center mb-4">Recommended Products</h2>
        <p className="text-center text-muted">No products available</p>
      </section>
    );
  }

  return (
    <section className="recommended-section container">
      <h2 className="text-center mb-4">Recommended Products</h2>
      <div className="row recommended-grid row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="text-center mt-4">
        <Link
          to="/shop"
          className="btn btn-lg"
          style={{
            background: "linear-gradient(90deg, #0517A1FF, #F75E1EFF)",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: 4,
            fontWeight: 600,
          }}
        >
          Browse All Products
        </Link>
      </div>
    </section>
  );
};

export default LandingRecommendedProductsSection;
