import React from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import Utils from "../../../services/Utils"; // Adjust import path as needed

interface LandingCategoriesSectionProps {
  manifest?: any;
  height?: number;
  width?: number;
}

const fadeVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/** Splits an array into smaller chunks of `size` items each. */
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunked: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
}

const LandingCategoriesSection: React.FC<LandingCategoriesSectionProps> = ({
  manifest,
  height = 120,
  width = 120,
}) => {
  // Filter out only categories that should be shown
  const categories = Array.isArray(manifest?.CATEGORIES)
    ? manifest.CATEGORIES.filter((cat: any) => cat.show_in_categories === "Yes")
    : [];

  // Separate the data into 7-column rows for desktop and 3-column rows for mobile
  const chunkedDesktop = chunkArray(categories, 7);
  const chunkedMobile = chunkArray(categories, 3);

  return (
    <motion.div
      className="container py-5"
      initial="hidden"
      animate="visible"
      variants={fadeVariant}
      style={{ margin: "0 auto" }}
    >
      {/* DESKTOP/TABLET VIEW: 7 columns, hidden on mobile */}
      <div className="d-none d-md-block">
        {chunkedDesktop.map((row, rowIndex) => (
          <div className="row row-cols-7 g-3 mb-4" key={rowIndex}>
            {row.map((cat: any) => {
              const categoryImg = cat.image
                ? Utils.img(cat.image)
                : toAbsoluteUrl("media/stock/600x600/img-1.jpg"); // fallback image

              return (
                <div className="col text-center" key={cat.id}>
                  <motion.div
                    style={{ transition: "transform 0.2s" }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link to={`/shop?category=${cat.id}`}>
                      <img
                        src={categoryImg}
                        alt={cat.category}
                        className="img-fluid rounded-circle"
                        style={{
                          width: width + "px",
                          height: height + "px",
                          objectFit: "cover",
                        }}
                      />
                      <p
                        className="fw-semibold mt-2 mb-0"
                        style={{ transition: "color 0.2s", color: "#333" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#f33d02")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#333")
                        }
                      >
                        {cat.category}
                      </p>
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* MOBILE VIEW: 3 columns, hidden on desktops/tablets */}
      <div className="d-md-none">
        {chunkedMobile.map((row, rowIndex) => (
          <div className="row row-cols-3 g-3 mb-4" key={rowIndex}>
            {row.map((cat: any) => {
              const categoryImg = cat.image
                ? Utils.img(cat.image)
                : toAbsoluteUrl("media/stock/600x600/img-1.jpg");

              return (
                <div className="col text-center" key={cat.id}>
                  <motion.div
                    style={{ transition: "transform 0.2s" }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link to={`/shop?category=${cat.id}`}>
                      <img
                        src={categoryImg}
                        alt={cat.category}
                        className="img-fluid rounded-circle"
                        style={{
                          width: width + "px",
                          height: height + "px",
                          objectFit: "cover",
                        }}
                      />
                      <p
                        className="fw-semibold mt-2 mb-0"
                        style={{ transition: "color 0.2s", color: "#333" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#f33d02")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#333")
                        }
                      >
                        {cat.category}
                      </p>
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LandingCategoriesSection;
