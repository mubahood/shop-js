import React from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import Utils from "../../../services/Utils";

interface LandingCategoriesSectionProps {
  manifest?: any;
  height?: number;
  width?: number;
}

const fadeVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

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
  const categories = Array.isArray(manifest?.CATEGORIES)
    ? manifest.CATEGORIES.filter((cat: any) => cat.show_in_categories === "Yes")
    : [];

  const chunkedDesktop = chunkArray(categories, 7);
  const chunkedMobile = chunkArray(categories, 3);

  return (
    <motion.div
      className="container px-10 mt-5 "
      initial="hidden"
      animate="visible"
      variants={fadeVariant}
    >
      <div
        className=" py-5 px-0"
        style={{
          margin: "0 auto",
          background:
            "linear-gradient(135deg,rgb(185, 204, 255) 0%,rgb(255, 221, 221) 100%)",
          borderRadius: 8,
        }}
      >
        <h2
          className="text-center fw-bold mb-4"
          style={{ color: "#114786", textTransform: "uppercase" }}
        >
          Shop by Category
        </h2>

        <div className="d-none d-md-block">
          {chunkedDesktop.map((row, rowIndex) => (
            <div className="row g-4 mb-4" key={rowIndex}>
              {row.map((cat: any) => {
                const categoryImg = cat.image
                  ? Utils.img(cat.image)
                  : toAbsoluteUrl("media/stock/600x600/img-1.jpg");
                return (
                  <div className="col text-center" key={cat.id}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Link
                        to={`/shop?category=${cat.id}`}
                        className="text-decoration-none"
                      >
                        <div
                          className="mx-auto mb-2"
                          style={{
                            width,
                            height,
                            borderRadius: "50%",
                            overflow: "hidden",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            border: "3px solid transparent",
                            transition: "border-color 0.3s",
                          }}
                        >
                          <img
                            src={categoryImg}
                            alt={cat.category}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <span
                          className="d-inline-block px-3 py-1 fw-semibold"
                          style={{
                            background: "#114786",
                            color: "#fff",
                            borderRadius: 20,
                            fontSize: "0.85rem",
                            transition: "background 0.3s",
                          }}
                        >
                          {cat.category}
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="d-md-none">
          {chunkedMobile.map((row, rowIndex) => (
            <div className="row row-cols-3 g-3 mb-4" key={rowIndex}>
              {row.map((cat: any) => {
                const categoryImg = cat.image
                  ? Utils.img(cat.image)
                  : toAbsoluteUrl("media/stock/600x600/img-1.jpg");
                return (
                  <div className="col text-center" key={cat.id}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Link
                        to={`/shop?category=${cat.id}`}
                        className="text-decoration-none"
                      >
                        <div
                          className="mx-auto mb-2"
                          style={{
                            width,
                            height,
                            borderRadius: "50%",
                            overflow: "hidden",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            border: "3px solid transparent",
                            transition: "border-color 0.3s",
                          }}
                        >
                          <img
                            src={categoryImg}
                            alt={cat.category}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <span
                          className="d-inline-block px-3 py-1 fw-semibold"
                          style={{
                            background: "#114786",
                            color: "#fff",
                            borderRadius: 20,
                            fontSize: "0.75rem",
                            transition: "background 0.3s",
                          }}
                        >
                          {cat.category}
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LandingCategoriesSection;
/*  
0517A1FF
and
F75E1EFF
*/
