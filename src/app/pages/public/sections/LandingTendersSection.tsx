// src/app/pages/public/sections/LandingTendersSection.tsx

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ManifestModel } from "../../../models/Manifest";
import Utils from "../../../services/Utils";

/**
 * Single-file React component for "Tenders"
 * reusing up to 20 random entries from manifest.TOP_JOBS.
 */

/* Inline CSS for demonstration. Adjust or relocate to a .css / .scss file. */
const styles = `
.landing-tenders-section {
  position: relative;
  background-color: #f5f5f5;
  padding: 40px 0;
}
.landing-tenders-section::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 400px;
  background: linear-gradient(to bottom right, #f5f5f5 25%, rgba(245, 245, 245, 0) 70%), url("https://bdjobs.com/images/tender-bg.jpg") bottom right / contain no-repeat;
  z-index: 1;
}
.landing-tenders-section .container-relative {
  position: relative;
  z-index: 2;
}
.landing-tenders-section .section-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  color: #444;
}
.landing-tenders-section .section-header .icon {
  font-size: 1.5rem;
  color: #0d6efd;
  margin-right: 0.5rem;
}
.landing-tenders-section .section-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}
.landing-tenders-section .card-tender {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #dee2e6;
  transition: all 0.2s ease;
  overflow: hidden;
}
.landing-tenders-section .card-tender:hover {
  transform: scale(1.01);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
}
.landing-tenders-section .card-body {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 16px;
}
.landing-tenders-section .tender-logo {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  object-fit: contain;
  background-color: #fff;
  border: 1px solid #eee;
}
.landing-tenders-section .info-wrapper {
  flex: 1;
  min-width: 0;
}
.landing-tenders-section .org-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #343a40;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.landing-tenders-section .tender-title {
  font-size: 0.85rem;
  font-weight: 500;
  color: #495057;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.landing-tenders-section .card-footer {
  font-size: 0.8rem;
  background-color: #fafafa;
  border-top: 1px solid #dee2e6;
  padding: 10px 12px;
  color: #6c757d;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.landing-tenders-section .card-footer .deadline {
  font-weight: 600;
  color: #b02a37;
}
.landing-tenders-section .stretched-link {
  position: absolute;
  inset: 0;
  text-indent: -9999px;
  overflow: hidden;
  z-index: 1;
}
@media (max-width: 576px) {
  .landing-tenders-section {
    padding: 20px 0;
  }
}
`;

/** Framer Motion variants for container and item animations */
const containerVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.02,
      duration: 0.5,
    },
  },
};
const itemVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

interface LandingTendersSectionProps {
  manifest: ManifestModel | null;
}

const LandingTendersSection: React.FC<LandingTendersSectionProps> = ({
  manifest,
}) => {
  /**
   * Convert the top jobs into "tenders". We:
   * 1) Randomly shuffle the array
   * 2) Take up to 20 items
   * 3) Map each item to a 'tender' shape
   */
  const topJobs: any[] = Array.isArray(manifest?.TOP_JOBS)
    ? manifest.TOP_JOBS
    : [];

  // Randomly shuffle (Fisher–Yates / Durstenfeld shuffle)
  const shuffled = [...topJobs];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Slice the first 20
  const tenders = shuffled.slice(0, 21).map((job: any, index: number) => {
    const id = job.id || `TENDER_${index + 1}`;
    const orgName = job.companyName
      ? job.companyName
      : `Org #${job.posted_by_id || "X"}`;
    const shortTitle = job.title || "Request for EOI";
    const logo = job.job_icon || "https://via.placeholder.com/50";
    const deadline = job.deadline ? job.deadline.slice(0, 10) : "2025-12-31";
    const description = job.responsibilities || "Short job details...";

    return {
      id,
      orgName,
      shortTitle,
      description,
      deadline,
      logo,
    };
  });

  return (
    <section className="landing-tenders-section position-relative">
      {/* Inline styles */}
      <style>{styles}</style>

      <div className="container container-relative px-lg-10">
        {/* Section header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="icon">
            <i className="bi bi-file-earmark-text"></i>
          </span>
          <h3 className="mb-0 text-uppercase">
            TENDERS / Expression of Interest (EOI)
          </h3>
        </motion.div>

        <motion.div
          className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {tenders.map((tender) => (
            <motion.div className="col" key={tender.id} variants={itemVariant}>
              <div className="card card-tender h-100">
                <div className="card-body">
                  <img
                    src={Utils.img(tender.logo)}
                    alt={tender.orgName}
                    className="tender-logo"
                  />
                  <div className="info-wrapper">
                    <div className="org-name">{tender.orgName}</div>
                    <div className="tender-title">{tender.shortTitle}</div>
                  </div>
                </div>
                <div className="card-footer">
                  <small>{tender.description.substring(0, 40)}...</small>
                  <small className="deadline">
                    Deadline: {tender.deadline}
                  </small>
                </div>
                <Link
                  to={`/tender/${tender.id}`}
                  className="stretched-link"
                  title="View Tender Details"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LandingTendersSection;
