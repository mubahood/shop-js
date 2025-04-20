import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import Utils from "../../../services/Utils";
import { useAuth } from "../../../modules/auth";
import ShimmerImage from "../../../components/ShimmerImage";

const fadeVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function divideIntoThree<T>(arr: T[]): T[][] {
  const per = Math.ceil(arr.length / 3);
  return [arr.slice(0, per), arr.slice(per, per * 2), arr.slice(per * 2)];
}

const LandingTopProductsSection: React.FC<{ manifest?: any }> = ({
  manifest,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const { addToCart, isInCart } = useAuth();

  const raw = Object.values(manifest?.SECTION_1_PRODUCTS || {});
  const products = raw.map((item: any) => {
    const num = Number(item.price_1) || 0;
    return {
      id: item.id,
      name: item.name || "Untitled",
      imageUrl: item.feature_photo
        ? Utils.img(item.feature_photo)
        : toAbsoluteUrl("media/products/placeholder.png"),
      priceNum: num,
      priceLabel: `UGX ${Utils.moneyFormat(item.price_1)}`,
    };
  });

  const [first, second, third] = divideIntoThree(products);
  const tabs = [
    { label: "BEST SELLERS", items: first },
    { label: "JUST IN", items: second },
    { label: "QUICKSHIP", items: third },
  ];

  const handleAdd = (e: React.MouseEvent, p: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: String(p.id),
      price: p.priceNum,
      name: p.name,
      mainImage: p.imageUrl,
    });
  };

  if (!products.length) {
    return (
      <div className="container py-5">
        <p className="text-center text-muted">No products found</p>
      </div>
    );
  }

  return (
    <motion.div
      className="container px-10  py-4 pt-10 "
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeVariant}
    >
      <div className=" ">
        <div className="d-flex justify-content-center mb-3 gap-3">
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                border: "none",
                background: "none",
                fontSize: "1.4rem",
                cursor: "pointer",
                color: activeTab === i ? "#F75E1EFF" : "#767676",
                borderBottom:
                  activeTab === i
                    ? "2px solid #F75E1EFF"
                    : "2px solid transparent",
                fontWeight: 600,
                padding: "0 8px",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 2 },
            576: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
          }}
        >
          {tabs[activeTab].items.map((p) => (
            <SwiperSlide key={p.id}>
              <Link
                to={`/product/${p.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <motion.div
                className="card py-2 px-2 shadow-sm border-0 rounded-3 overflow-hidden"
                  whileHover={{
                    scale: 1.03,
                    y: -4,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  }}
                  style={{
                    borderRadius: 8,
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    background: "#f8f9fa",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      height: 260,
                      background: "#e9ecef",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ShimmerImage
                      src={p.imageUrl}
                      alt={p.name}
                      width={300}
                      height={260}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    {isInCart(String(p.id)) ? (
                      <Link
                        to="/cart"
                        style={{
                          position: "absolute",
                          bottom: 8,
                          right: 8,
                          background: "#0517A1FF",
                          borderRadius: "50%",
                          width: 36,
                          height: 36,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i
                          className="bi bi-cart-check"
                          style={{ color: "#fff" }}
                        />
                      </Link>
                    ) : (
                      <button
                        onClick={(e) => handleAdd(e, p)}
                        style={{
                          position: "absolute",
                          bottom: 8,
                          right: 8,
                          background: "#F75E1EFF",
                          border: "none",
                          borderRadius: "50%",
                          width: 36,
                          height: 36,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <i
                          className="bi bi-cart-plus"
                          style={{ color: "#fff" }}
                        />
                      </button>
                    )}
                  </div>
                  <div
                    style={{
                      padding: "8px",
                      background: "#ffffff",
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        lineHeight: 1.2,
                        height: "2.8rem",
                        overflow: "hidden",
                        marginBottom: 6,
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        marginTop: "auto",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          color: "#0517A1FF",
                          fontWeight: 600,
                          fontSize: "1rem",
                        }}
                      >
                        {p.priceLabel}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-4">
          <Link
            to="/shop"
            style={{
              display: "inline-block",
              background: "linear-gradient(90deg, #0517A1FF, #F75E1EFF)",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: 4,
              fontWeight: 600,
            }}
          >
            Browse All Products
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LandingTopProductsSection;
