// src/app/pages/public/sections/LandingHeroSection.tsx

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { ManifestModel } from "../../../models/Manifest";
import { BASE_URL } from "../../../../Constants";

interface LandingHeroSectionProps {
  manifest: ManifestModel | null;
}

const fadeVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const LandingHeroSection: React.FC<LandingHeroSectionProps> = ({ manifest }) => {
  // Fallback if manifest is null
  const currentManifest = manifest || new ManifestModel();

  // Stats data for display
  const statsData = [
    {
      label: "Live Positions",
      value: currentManifest.LIVE_JOBS || "0",
      icon: "bi-briefcase",
      delta: "+12.3%",
    },
    {
      label: "Vacancies",
      value: currentManifest.VACANCIES || "0",
      icon: "bi-building",
      delta: "+5.8%",
    },
    {
      label: "New (7 Days)",
      value: currentManifest.NEW_JOBS || "0",
      icon: "bi-lightning",
      delta: "+24.1%",
    },
    {
      label: "Companies",
      value: currentManifest.COMPANIES || "0",
      icon: "bi-people",
      delta: "+8.4%",
    },
  ];

  // Quick links (categories) – these will now pass the category filter to the jobs page
  const quickLinks = Array.isArray(currentManifest.CATEGORIES)
    ? currentManifest.CATEGORIES.slice(0, 6).map((cat: any) => ({
        label: cat.name || "Unknown Category",
        id: cat.id,
        count: cat.jobs_count ?? 0,
        isHot: false,
        isNew: false,
      }))
    : [];

  // Top cities for the location selector
  const topCities = Array.isArray(currentManifest.TOP_CITIES)
    ? currentManifest.TOP_CITIES.slice(0, 8).map((city: any) => ({
        name: city.name || "Unknown City",
        count: city.jobs_count ?? 0,
        id: city.id,
        photo: city.photo,
      }))
    : [];

  return (
    <motion.div
      className="position-relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeVariant}
      style={{
        background: `
          linear-gradient(45deg, rgba(17,71,134,0.95) 0%, rgba(243,61,2,0.9) 100%),
          url(${toAbsoluteUrl("media/stock/1920x1080/img-1.jpg")})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "0 24px 48px -12px rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    >
      {/* Subtle pattern overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10 bg-pattern-dots" />

      <div className="container position-relative z-index-2 py-10 py-lg-12 px-10">
        <div className="row g-8 align-items-center">
          {/* LEFT CONTENT */}
          <div className="col-lg-7">
            <motion.div variants={fadeVariant}>
              <div className="mb-8 text-center text-lg-start">
                <h1 className="display-2 text-white mb-4 fw-800">
                  Find Your Next <span className="text-accent">Career</span> Move
                </h1>
                <p className="lead text-white text-opacity-75 mb-6">
                  Discover top jobs from leading companies in Uganda and beyond!
                </p>
              </div>
            </motion.div>

            {/* SEARCH FORM – submits via GET to the /jobs route */}
            <motion.div variants={fadeVariant}>
              <form method="get" action="/jobs">
                <div className="card bg-white bg-opacity-10 border border-white border-opacity-10 shadow-lg">
                  <div className="card-body p-2">
                    <div className="row g-3 align-items-center">
                      {/* Keyword Search */}
                      <div className="col-md-5">
                        <div className="input-group">
                          <span className="input-group-text bg-transparent border-0 pe-1">
                            <i className="bi bi-search fs-4 text-white text-opacity-50"></i>
                          </span>
                          <input
                            type="text"
                            name="search"
                            className="form-control form-control-lg border-0 bg-transparent text-white placeholder-white-50"
                            placeholder="Job title, skills..."
                            style={{ minWidth: "180px" }}
                          />
                        </div>
                      </div>
                      {/* Location Selector */}
                      <div className="col-md-4">
                        <div className="input-group">
                          <span className="input-group-text bg-transparent border-0 pe-1">
                            <i className="bi bi-geo-alt fs-4 text-white text-opacity-50"></i>
                          </span>
                          <select
                            name="district"
                            className="form-select form-select-lg border-0 bg-transparent text-white"
                          >
                            <option value="">Any Location</option>
                            {topCities.map((city) => (
                              <option
                                key={city.id || city.name}
                                value={city.id}
                                className="text-dark"
                              >
                                {city.name} ({city.count})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* Search Button */}
                      <div className="col-md-3">
                        <button type="submit" className="btn btn-accent btn-lg w-100 fw-bold hover-lift">
                          Search Jobs
                          <i className="bi bi-arrow-right-short ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>

            {/* STATS GRID */}
            <motion.div
              className="row g-4 mt-8"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {statsData.map((stat, index) => (
                <motion.div key={index} className="col-6 col-md-3" variants={fadeVariant}>
                  <div className="card bg-white bg-opacity-5 hover-scale border border-white border-opacity-10">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div className="icon-circle bg-primary bg-opacity-10 text-primary">
                            <i className={`bi ${stat.icon} fs-3`}></i>
                          </div>
                        </div>
                        {/* Text */}
                        <div className="flex-grow-1 ms-3">
                          <div className="text-white text-opacity-75 fs-7 mb-1">{stat.label}</div>
                          <div className="d-flex align-items-center">
                            <div className="text-white fs-4 fw-bold me-2">{stat.value}</div>
                            <span className="badge bg-success bg-opacity-10 text-success fs-8">{stat.delta}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT CONTENT (SIDEBAR) */}
          <div className="col-lg-5">
            <motion.div
              className="card bg-white bg-opacity-10 border border-white border-opacity-10 overflow-hidden"
              variants={fadeVariant}
            >
              <div className="card-header bg-white bg-opacity-05 border-bottom border-white border-opacity-10 py-5">
                <h3 className="text-primary mb-0">
                  <i className="bi bi-lightning-charge text-primary me-2"></i>
                  Trending Categories
                </h3>
              </div>
              <div className="card-body position-relative">
                <div className="vstack gap-3">
                  {quickLinks.map((link, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={`/jobs?category=${encodeURIComponent(link.id)}`}
                        className="d-flex justify-content-between align-items-center p-3 rounded-3 text-decoration-none hover-scale bg-white bg-opacity-03"
                      >
                        <div className="d-flex align-items-center">
                          <span className="text-dark fw-medium">{link.label}</span>
                          {link.isHot && (
                            <span className="badge bg-danger bg-opacity-25 text-danger ms-3">Hot</span>
                          )}
                          {link.isNew && (
                            <span className="badge bg-success bg-opacity-25 text-success ms-2">New</span>
                          )}
                        </div>
                        <span className="badge bg-primary text-white fs-7 fw-bold">{link.count}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                {/* Faded gradient overlay to hint at scrolling */}
                <div
                  className="position-absolute bottom-0 start-0 w-100"
                  style={{
                    height: "40px",
                    background: "linear-gradient(to top, rgba(17,71,134,1) 0%, rgba(17,71,134,0) 100%)",
                  }}
                ></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trusted Brands Section (Optional) */}
      <div className="container position-relative z-index-2 py-6">
        <div className="text-center text-white-50 mb-4 fs-6">Trusted by leading organizations</div>
        <div className="d-flex flex-wrap justify-content-center gap-6 bg-light rounded-3 p-4">
          {["8tech.png", "ucc.png", "nkumba.svg", "makerere.png", "nita.png"].map((logo, i) => (
            <motion.img
              key={i}
              src={BASE_URL + "/public/assets/img/" + logo}
              className="h-30px opacity-100 hover-opacity-100"
              alt="Brand logo"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </div>
      </div>

      <style>{`
        /* Branding based on primary and accent colours */
        .text-accent {
          color: #f33d02 !important;
        }
        .btn-accent {
          background-color: #f33d02;
          border-color: #f33d02;
          color: #fff;
        }
        .btn-accent:hover {
          background-color: #e03300;
          border-color: #e03300;
        }
      `}</style>
    </motion.div>
  );
};

export default LandingHeroSection;
