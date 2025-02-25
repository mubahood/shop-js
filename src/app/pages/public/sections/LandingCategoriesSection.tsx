import React from "react";
import { motion } from "framer-motion";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";

interface LandingCategoriesSectionProps {
  manifest?: any;
}

const fadeVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const categories_photos = [
  "media/stock/600x600/img-1.jpg",
  "media/stock/600x600/img-2.jpg",
  "media/stock/600x600/img-3.jpg",
  "media/stock/600x600/img-4.jpg",
  "media/stock/600x600/img-5.jpg",
  "media/stock/600x600/img-6.jpg",
  "media/stock/600x600/img-7.jpg",
  "media/stock/600x600/img-8.jpg",
  "media/stock/600x600/img-9.jpg",
  "media/stock/600x600/img-10.jpg",
  "media/stock/600x600/img-11.jpg",
  "media/stock/600x600/img-12.jpg",
  "media/stock/600x600/img-13.jpg",
  "media/stock/600x600/img-14.jpg",
  "media/stock/600x600/img-15.jpg",
  "media/stock/600x600/img-16.jpg",
  //... add more as needed
];

const categoryNames = [
  "TVs & Home Theaters",
  "Audio",
  "Cameras & Camcorders",
  "Computers & Tablets",
  "Gaming",
  "Smart Home",
  "Wearables",
  "Mobile Phones",
  "Accessories",
  "Headphones",
  "Drones",
  "Gaming Consoles",
  "Printers & Ink",
  "Software",
  "Networking",
  "Office Electronics", 
  //... add more as needed
];

const LandingCategoriesSection: React.FC<LandingCategoriesSectionProps> = ({
  manifest,
}) => {
  return (
    <motion.div
      className="container py-5"
      initial="hidden"
      animate="visible"
      variants={fadeVariant}
      style={{ margin: "0 auto" }}
    >
      {/* Categories Grid - Row 1 */}
      <div className="row row-cols-7 g-2">
        {categories_photos.slice(0, 7).map((photo, index) => (
          <div className="col text-center" key={index}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <img
                src={toAbsoluteUrl(photo)}
                alt={categoryNames[index]}
                className="img-fluid rounded-circle"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <p className="fw-semibold mt-2 mb-0">
                {categoryNames[index]}
              </p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Categories Grid - Row 2 */}
      <div className="row row-cols-7 g-2 mt-3">
        {categories_photos.slice(7, 14).map((photo, index) => (
          <div className="col text-center" key={index + 7}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <img
                src={toAbsoluteUrl(photo)}
                alt={categoryNames[index + 8]}
                className="img-fluid rounded-circle"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <p className="fw-semibold mt-2 mb-0">
                {categoryNames[index + 8]}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LandingCategoriesSection;