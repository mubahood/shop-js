// src/app/components/FooterSection.tsx

import React from "react";
import { Link } from "react-router-dom";

/**
 * A single-file React footer component
 * inspired by the reference image (similar to bdjobs.com footer).
 * Rebranded for Skills.ug with columns for About, Job Seekers, Recruiters, Tools & Social Media.
 */
const FooterSection: React.FC = () => {
  return (
    <footer
      className=" bg-dark text-light pt-5 pb-3"
      style={{ fontSize: "0.9rem" }}
    >
      <div className="container px-3 px-lg-10">
        <div className="row gy-4">
          {/* Column 1: About Skills.ug */}
          <div className="col-6 col-md-3">
            <h5 className="mb-3 fw-bold">About Skills.ug</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/about" className="text-decoration-none text-light">
                  About Skills.ug
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-decoration-none text-light">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/accessibility"
                  className="text-decoration-none text-light"
                >
                  Accessibility Statement
                </Link>
              </li>
              <li>
                <Link
                  to="/partners/international"
                  className="text-decoration-none text-light"
                >
                  International Partners
                </Link>
              </li>
              <li>
                <Link
                  to="/partners/others"
                  className="text-decoration-none text-light"
                >
                  Other Partners
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-decoration-none text-light"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/feedback"
                  className="text-decoration-none text-light"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-decoration-none text-light">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Job Seekers */}
          <div className="col-6 col-md-3">
            <h5 className="mb-3 fw-bold">Job Seekers</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/edit-resume"
                  className="text-decoration-none text-light"
                >
                  Edit Resume
                </Link>
              </li>
              <li>
                <Link
                  to="/skillsug-pro"
                  className="text-decoration-none text-light"
                >
                  Skills.ug Pro{" "}
                  <span className="badge bg-warning text-dark ms-1">NEW</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/video-cv"
                  className="text-decoration-none text-light"
                >
                  Video CV
                </Link>
              </li>
              <li>
                <Link
                  to="/my-panel"
                  className="text-decoration-none text-light"
                >
                  My Skills.ug Panel
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-decoration-none text-light"
                >
                  List of Features
                </Link>
              </li>
              <li>
                <Link
                  to="/career-counseling"
                  className="text-decoration-none text-light"
                >
                  Career Counseling
                </Link>
              </li>
              <li>
                <Link
                  to="/video-guides"
                  className="text-decoration-none text-light"
                >
                  Video Guides
                </Link>
              </li>
              <li>
                <Link
                  to="/jobseekers-faq"
                  className="text-decoration-none text-light"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Recruiter */}
          <div className="col-6 col-md-3">
            <h5 className="mb-3 fw-bold">Recruiter</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/employer/register"
                  className="text-decoration-none text-light"
                >
                  Create Account
                </Link>
              </li>
              <li>
                <Link
                  to="/employer/products"
                  className="text-decoration-none text-light"
                >
                  Products/Service
                </Link>
              </li>
              <li>
                <Link
                  to="/employer/disability-inclusion"
                  className="text-decoration-none text-light"
                >
                  Disability Inclusion Practice
                </Link>
              </li>
              <li>
                <Link
                  to="/employer/post-job"
                  className="text-decoration-none text-light"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  to="/employer/faq"
                  className="text-decoration-none text-light"
                >
                  FAQ
                </Link>
              </li>
            </ul>

            <h6 className="text-light mt-4 mb-2 fw-bold">
              Download Employer App
            </h6>
            <div className="d-flex gap-2">
              <a href="#playstore" className="text-decoration-none">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  style={{ height: "30px" }}
                />
              </a>
              <a href="#appstore" className="text-decoration-none">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  style={{ height: "30px" }}
                />
              </a>
            </div>
          </div>

          {/* Column 4: Tools & Social Media */}
          <div className="col-6 col-md-3">
            <h5 className="mb-3 fw-bold">Tools & Social Media</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/app/android"
                  className="text-decoration-none text-light"
                >
                  <i className="bi bi-android2 me-1"></i> Skills.ug Android App
                </Link>
              </li>
              <li>
                <Link to="/app/ios" className="text-decoration-none text-light">
                  <i className="bi bi-apple me-1"></i> Skills.ug iOS App
                </Link>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none text-light"
                >
                  <i className="bi bi-facebook me-1"></i> Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none text-light"
                >
                  <i className="bi bi-youtube me-1"></i> Youtube
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none text-light"
                >
                  <i className="bi bi-linkedin me-1"></i> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none text-light"
                >
                  <i className="bi bi-instagram me-1"></i> Instagram
                </a>
              </li>
            </ul>

            <h6 className="text-light mt-4 mb-2 fw-bold">
              Download Mobile App
            </h6>
            <div className="d-flex flex-wrap gap-2">
              <a href="#playstore" className="text-decoration-none">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  style={{ height: "30px" }}
                />
              </a>
              <a href="#appstore" className="text-decoration-none">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  style={{ height: "30px" }}
                />
              </a>
              <a href="#appgallery" className="text-decoration-none">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Huawei_AppGallery_badge_EN.svg"
                  alt="App Gallery"
                  style={{ height: "30px" }}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom: Contact Info */}
        <div className="row mt-4">
          <div className="col text-center text-secondary">
            <p className="mb-1">
              Need any support? Call to{" "}
              <i className="bi bi-telephone-outbound-fill text-warning"></i>{" "}
              <span className="text-warning fw-bold">
                0963-866-6444, 0189-762-7858
              </span>
            </p>
            <p className="mb-0" style={{ fontSize: "0.85rem" }}>
              Our Contact Centre is available from 9 am to 8 pm (Saturday to
              Thursday)
            </p>
          </div>
        </div>

        {/* Optional copyright */}
        <div className="row mt-3">
          <div className="col text-center">
            <small className="text-secondary">
              &copy; {new Date().getFullYear()} Skills.ug | All rights reserved.
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
