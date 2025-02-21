// src/app/pages/public/sections/LandingCourseSection.tsx

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* Inline CSS. In production, move these rules to a .css or .scss file. */
const inlineStyles = `
.landing-course-section {
  background-color: #f9f9f9;
  padding: 30px 0;
  position: relative;
}

/* Container max width and default margin */
.landing-course-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* -----------------------------------
   TOP BANNER
----------------------------------- */
.course-banner {
  display: flex;
  align-items: center;
  background: #f64e60; /* Danger color, example from Metronic */
  color: #fff;
  border-radius: 0.475rem;
  margin-bottom: 1.5rem;
  overflow: hidden;
  padding: 1.5rem;
  position: relative;
}
.course-banner::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(rgba(255,255,255,0.15), transparent 70%);
  pointer-events: none;
}
.course-banner img {
  max-height: 70px;
  margin-right: 1rem;
  object-fit: contain;
  flex-shrink: 0;
}
.course-banner-content {
  flex: 1;
}
.course-banner-content h2 {
  margin: 0 0 0.3rem;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
}
.course-banner-content p {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.9;
}

/* -----------------------------------
   COURSE COLUMNS LAYOUT
----------------------------------- */
.course-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}
.course-column {
  flex: 1;
  min-width: 300px;
  background-color: #fff;
  border-radius: 0.475rem;
  padding: 1rem 1.2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  position: relative;
  transition: box-shadow 0.2s, transform 0.2s;
}
.course-column:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}
.course-column h4 {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #3F4254; /* Default text color */
  font-weight: 600;
  margin-bottom: 1rem;
}
.course-column h4 i {
  font-size: 1.2rem;
  color: #0d6efd;
  margin-right: 0.5rem;
}

/* COURSE LIST */
.course-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.course-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  margin-bottom: 1rem;
}
.course-icon {
  width: 36px;
  height: 36px;
  border-radius: 0.475rem;
  background: #E4E6EF; /* Light Gray */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: #3F4254;
  font-size: 1.1rem;
}
.course-info {
  flex: 1;
}
.course-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: #3F4254;
  margin-bottom: 2px;
}
.course-date {
  font-size: 0.75rem;
  color: #7E8299;
}

/* 'View all' link at bottom of card */
.view-all-link {
  margin-top: 1rem;
  text-align: right;
  font-size: 0.85rem;
}
.view-all-link a {
  color: #0d6efd;
  text-decoration: none;
  font-weight: 500;
}
.view-all-link a:hover {
  text-decoration: underline;
}

/* Responsive single-column fallback */
@media (max-width: 768px) {
  .course-columns {
    flex-direction: column;
  }
}
`;

// Example daylong vs. evening courses data
const daylongCourses = [
  {
    title: "Practical Accounting for Non-Accounting Professionals",
    dateRange: "30 Jan - 1 Feb 2025",
  },
  {
    title: "Total Productive Maintenance (TPM)",
    dateRange: "Friday, January 31, 2025",
  },
  {
    title: "SMART EMAILing for Successful Correspondence",
    dateRange: "31 Jan - 1 Feb 2025",
  },
  {
    title: "Xero for Accounting & Bookkeeping Outsourcing",
    dateRange: "6 - 8 Feb 2025",
  },
  {
    title: "Supply Chain Management in Garments Sector",
    dateRange: "7 - 8 Feb 2025",
  },
  {
    title: "Bond License, Bonded Warehouse & Bond Management",
    dateRange: "7 - 8 Feb 2025",
  },
  {
    title: "LC Management for Procurement & Supply Chain",
    dateRange: "7 - 8 Feb 2025",
  },
];

const eveningCourses = [
  {
    title: "Import - Export - C&F Agent - Shipping & Customs Process",
    dateRange: "5 - 26 Feb 2025",
  },
  {
    title: "Practical HR",
    dateRange: "5 - 17 Feb 2025",
  },
  {
    title: "Internal Auditor certificate course on ISO 9001:2015",
    dateRange: "5 - 17 Feb 2025",
  },
  {
    title: "Food Safety Management System - ISO 22000",
    dateRange: "5 - 17 Feb 2025",
  },
  {
    title: "Managing Fleet Vehicle Repairs & Maintenance",
    dateRange: "6 - 18 Feb 2025",
  },
  {
    title: "Training of Trainer (TOT)",
    dateRange: "6 - 20 Feb 2025",
  },
  {
    title: "ISO 14001:2015 Environmental Management System (EMS)",
    dateRange: "6 - 18 Feb 2025",
  },
];

// Framer Motion Variants
const containerVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};
const columnVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

/**
 * LandingCourseSection - a polished, professional section
 * with a top banner and two columns of courses/training.
 */
const LandingCourseSection: React.FC = () => {
  return (
    <section className="landing-course-section">
      <style>{inlineStyles}</style>
      <div className="container">
        {/* Top Banner */}
        <motion.div
          className="course-banner"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src="https://bdjobs.com/images/bdjobs-training-bg.jpg"
            alt="8learning"
          />
          <div className="course-banner-content">
            <h2>8Learning</h2>
            <p>Recharge Your Career with World-Class Courses</p>
          </div>
        </motion.div>

        {/* Course Columns */}
        <motion.div
          className="course-columns"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {/* Daylong Training */}
          <motion.div className="course-column" variants={columnVariant}>
            <h4>
              <i className="bi bi-sun me-1"></i>DAYLONG TRAINING
            </h4>
            <ul className="course-list">
              {daylongCourses.map((course, idx) => (
                <li key={idx}>
                  <div className="course-icon">
                    <i className="bi bi-briefcase"></i>
                  </div>
                  <div className="course-info">
                    <div className="course-title">{course.title}</div>
                    <div className="course-date">{course.dateRange}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="view-all-link">
              <Link to="/8learning/daylong">View all Daylong Training</Link>
            </div>
          </motion.div>

          {/* Evening Courses */}
          <motion.div className="course-column" variants={columnVariant}>
            <h4>
              <i className="bi bi-moon-stars me-1"></i>EVENING COURSES
            </h4>
            <ul className="course-list">
              {eveningCourses.map((course, idx) => (
                <li key={idx}>
                  <div className="course-icon">
                    <i className="bi bi-calendar3-event"></i>
                  </div>
                  <div className="course-info">
                    <div className="course-title">{course.title}</div>
                    <div className="course-date">{course.dateRange}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="view-all-link">
              <Link to="/8learning/evening">View all Evening Courses</Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingCourseSection;
