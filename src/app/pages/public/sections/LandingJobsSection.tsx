// src/app/pages/public/sections/LandingJobsSection.tsx

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ManifestModel } from "../../../models/Manifest";
import Utils from "../../../services/Utils";

/**
 * Single-file React component for displaying "Top Jobs"
 * from manifest.TOP_JOBS with inline styling and Framer Motion animations.
 */

/* Inline CSS for demonstration. 
   Adjust or relocate to a .css / .scss file as preferred. */
const styles = `
.landing-top-jobs-section {
  background-color:rgb(255, 255, 255);
  padding: 20px 0;
}
.landing-top-jobs-section .section-title {
  font-weight: 600;
  font-size: 1.25rem;
  color: #dc3545; /* Red color (Bootstrap 'danger') */
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.landing-top-jobs-section .section-subtitle {
  background-color: #dc3545;
  color: #fff;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 3px;
  margin-left: 0.5rem;
}
.landing-top-jobs-section .card {
  border: 1px solid #dee2e6;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 6px;
  position: relative;
}
.landing-top-jobs-section .card:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.landing-top-jobs-section .card-body {
  display: flex;
  align-items: center;
  padding: 12px;
}
.landing-top-jobs-section .company-logo {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 0.6rem;
  border-radius: 4px;
  flex-shrink: 0;
  background-color: #fff;
  border: 1px solid #eee;
}
.landing-top-jobs-section .company-info {
  flex: 1;
  overflow: hidden;
}
.landing-top-jobs-section .company-name {
  font-size: 0.85rem;
  color: #495057;
  font-weight: 500;
  margin-bottom: 2px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.landing-top-jobs-section .job-title {
  font-size: 0.88rem;
  font-weight: 600;
  color: #343a40;
  line-height: 1.2;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.landing-top-jobs-section .card-footer {
  font-size: 0.75rem;
  background-color: #fff;
  border-top: 1px solid #dee2e6;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
}
.landing-top-jobs-section .meta-icon {
  margin-right: 4px;
  color: #6c757d;
}
.landing-top-jobs-section .stretched-link {
  position: absolute;
  inset: 0;
  text-indent: -9999px;
  overflow: hidden;
  z-index: 1;
}
/* Responsive columns */
@media (max-width: 576px) {
  .landing-top-jobs-section .row {
    margin: 0;
  }
  .landing-top-jobs-section .col {
    padding: 0.3rem;
  }
}
`;

// Framer Motion variants for container and items
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

interface LandingJobsSectionProps {
  manifest: ManifestModel | null;
}

const LandingJobsSection: React.FC<LandingJobsSectionProps> = ({
  manifest,
}) => {
  // Safely retrieve topJobs array from manifest
  const topJobs = manifest?.TOP_JOBS ?? [];

  return (
    <div className="landing-top-jobs-section">
      {/* Inject inline styles */}
      <style>{styles}</style>

      <div className="container px-3 px-lg-10">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <i className="bi bi-fire text-danger fs-4 me-2"></i> TOP JOBS
          <span className="section-subtitle ms-2">New</span>
        </motion.div>

        <motion.div
          className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-2"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {topJobs.map((job: any) => {
            // Fallbacks if data is missing
            const jobTitle = job.title || "Untitled Job";
            const jobIcon = job.job_icon || "https://via.placeholder.com/50";
            // Show "Company #posted_by_id" if no known company name
            const companyName =
              job.companyName || `Company #${job.posted_by_id || "N/A"}`;
            const slots = job.vacancies_count ?? 1;
            const deadline = job.deadline
              ? job.deadline.substring(0, 10)
              : "N/A";
            const jobId = job.id || "0";

            return (
              <motion.div className="col" key={jobId} variants={itemVariant}>
                <div className="card h-100">
                  <div className="card-body">
                    <img
                      src={Utils.img(jobIcon)}
                      alt={companyName}
                      className="company-logo"
                    />
                    <div className="company-info">
                      <div className="company-name">{companyName}</div>
                      <div className="job-title">{jobTitle}</div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div>
                      <i className="bi bi-people-fill meta-icon"></i>Slots:{" "}
                      {slots}
                    </div>
                    <div>
                      <i className="bi bi-calendar-event meta-icon"></i>
                      Deadline: {deadline}
                    </div>
                  </div>

                  {/* Stretched link for the entire card */}
                  <Link
                    to={`/jobs/${jobId}`}
                    className="stretched-link"
                    title="View Job Details"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default LandingJobsSection;
