import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-bootstrap";
import {
  FaPhoneAlt,
  FaCheck,
  FaCloudUploadAlt,
  FaTshirt,
  FaShippingFast,
  FaStar,
  FaRegClock,
  FaBox,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import LandingHeroSection from "./sections/LandingHeroSection";
import LandingCategoriesSection from "./sections/LandingCategoriesSection";
import LandingJobsSection from "./sections/LandingJobsSection";
import LandingTendersSection from "./sections/LandingTendersSection";
import LandingSlidesSection from "./sections/LandingSlidesSection";
import LandingCourseSection from "./sections/LandingCourseSection";
import { ManifestModel } from "../../models/Manifest";
import FooterSection from "./sections/FotterSection";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

const ShimmerLoader: React.FC = () => (
  <>
    <div className="shimmer-wrapper">
      <div className="shimmer"></div>
    </div>
  </>
);

const LandingPage: React.FC = () => {
  const [my_manifest, setManifest] = useState<ManifestModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await ManifestModel.getItems();
      setManifest(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <ShimmerLoader />;
  }

  return (
    <div className="landing-page">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="alert-reload text-center mb-0"
      ></motion.div>
      <LandingHeroSection manifest={my_manifest} />
      <LandingCategoriesSection manifest={my_manifest} />
      <LandingJobsSection manifest={my_manifest} />
      <LandingTendersSection manifest={my_manifest} />
      <LandingSlidesSection />
      <LandingCourseSection />
      {/* <FooterSection /> */}
    </div>
  );
};

export default LandingPage;

// Add these styles
const styles = `
.hero-section {
  padding: 120px 0;
  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), 
              url('https://static.vecteezy.com/system/resources/thumbnails/038/949/537/small_2x/ai-generated-laundry-basket-with-dirty-clothes-on-blurred-background-of-washing-machine-photo.jpg') center/cover;
}

.stat-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
}

.step-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  .icon-wrapper {
    font-size: 2.5rem;
  }
}

.testimonial-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin: 0 1rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.benefits-list {
  list-style: none;
  padding-left: 0;
  li {
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
  }
}

.shimmer-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background:rgb(146, 183, 219);
  background-image: linear-gradient(to right,rgb(228, 228, 228) 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-repeat: no-repeat;
  background-size: 800px 104px;
  position: relative;
  animation: shimmer 1.5s infinite linear;
}

.shimmer {
  width: 100%;
  height: 100%;
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-repeat: no-repeat;
  background-size: 800px 104px;
  position: absolute;
  top: 0;
  left: 0;
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: -800px 0;
  }
  100% {
    background-position: 800px 0;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 80px 0;
  }
  .display-4 {
    font-size: 2rem;
  }
}
`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
export { LandingPage };
