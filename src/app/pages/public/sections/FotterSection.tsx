// src/app/components/FooterSection.tsx

import React from "react";
import { Link } from "react-router-dom";

const slides = [
  "media/stock/900x600/1.jpg",
  "media/stock/900x600/2.jpg",
  "media/stock/900x600/3.jpg",
  "media/stock/900x600/4.jpg",
  "media/stock/900x600/70.jpg",
];

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
        {/* Footer Bottom: Contact Info */}
        <div className="row mt-4">
          <div className="col text-center text-secondary">
            <a
              href="https://play.google.com/store/apps/details?id=com.eurosatgroup.blitxpress"
              target="_blank"
              className="text-decoration-none"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                style={{ height: "30px" }}
              />
            </a>
            &nbsp;&nbsp;
            <a
              href="https://apps.apple.com/om/app/blitxpress/id6742859129"
              target="_blank"
              className="text-decoration-none"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                style={{ height: "30px" }}
              />
            </a>
          </div>
        </div>
      </div>
      <div className="container px-3 px-lg-10">
        {/* Footer Bottom: Contact Info */}
        <div className="row mt-4">
          <div className="col text-center text-secondary">
            <p className="mb-1">
              Need any support? Call to{" "}
              <i className="bi bi-telephone-outbound-fill text-warning"></i>{" "}
              <span className="text-warning fw-bold">+256 701 070684</span>
            </p>
            <p className="mb-0" style={{ fontSize: "0.85rem" }}>
              Our Contact Centre is available from 9 am to 8 pm
            </p>
          </div>
        </div>

        {/* Optional copyright */}
        <div className="row mt-3">
          <div className="col text-center">
            <small className="text-secondary">
              &copy; {new Date().getFullYear()} blitxpress.com | All rights
              reserved.
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
