// src/app/pages/public/JobDetailPage.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { JobModel } from "../../models/JobModel";
import Utils from "../../services/Utils";
import parse from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const JobSkeleton = () => (
  <div className="container py-4 px-2 px-lg-10">
    <div className="row mb-4 g-3">
      <div className="col-12 col-lg-8">
        <div className="d-flex align-items-start">
          <Skeleton circle width={80} height={80} className="me-3" />
          <div style={{ width: "100%" }}>
            <Skeleton height={32} width="60%" />
            <Skeleton height={20} width="40%" />
            <Skeleton height={20} width="30%" />
            <Skeleton height={20} width="30%" />
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-4">
        <Skeleton height={38} width="100%" />
      </div>
    </div>

    <div className="row gy-4">
      <div className="col-12 col-lg-8">
        <div className="bg-white p-4 rounded shadow-sm mb-4">
          <Skeleton height={24} width="30%" className="mb-3" />
          <Skeleton count={10} />
        </div>
      </div>
      <div className="col-12 col-lg-4">
        <div className="bg-white p-4 rounded shadow-sm">
          <Skeleton height={24} width="40%" className="mb-3" />
          <Skeleton count={8} />
        </div>
      </div>
    </div>
  </div>
);
export const pageSkeleton = () => (
  <div className="container py-4 px-2 px-lg-10">
    <div className="row mb-4 g-3">
      <div className="col-12 col-lg-8">
        <div className="d-flex align-items-start">
          <Skeleton circle width={80} height={80} className="me-3" />
          <div style={{ width: "100%" }}>
            <Skeleton height={32} width="60%" />
            <Skeleton height={20} width="40%" />
            <Skeleton height={20} width="30%" />
            <Skeleton height={20} width="30%" />
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-4">
        <Skeleton height={38} width="100%" />
      </div>
    </div>

    <div className="row gy-4">
      <div className="col-12 col-lg-8">
        <div className="bg-white p-4 rounded shadow-sm mb-4">
          <Skeleton height={24} width="30%" className="mb-3" />
          <Skeleton count={20} />
        </div>
      </div>
      <div className="col-12 col-lg-4">
        <div className="bg-white p-4 rounded shadow-sm">
          <Skeleton height={24} width="40%" className="mb-3" />
          <Skeleton count={20} />
        </div>
      </div>
    </div>
  </div>
);

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [job, setJob] = useState<JobModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      setLoading(true);
      setError("");
      try {
        const fetchedJob = await JobModel.fetchJobById(id);
        setJob(fetchedJob);
      } catch (err: any) {
        setError(err.message || "Failed to fetch job details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApplyNow = () => {
    // e.g., Redirect to application form
    navigate(`/jobs/${id}/apply`);
  };

  const handleSaveJob = () => {
    // e.g., Save to user’s saved jobs or local storage
    alert("Job saved to your profile!");
  };

  const handleShareJob = () => {
    // Could integrate your social sharing logic
    alert("Share link copied or open share UI!");
  };

  if (loading) {
    return JobSkeleton();
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
        <div className="text-center">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <motion.div
      className="container py-4 px-2 px-lg-10 "
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <ol className="breadcrumb breadcrumb-item text-muted fs-6 fw-bold mb-5 mx-3">
        <li className="breadcrumb-item pe-3">
          <Link to="/" className="active text-decoration-none">
            Home
          </Link>
        </li>
        <li className="breadcrumb-item pe-3 ">
          <Link to="/jobs" className="active text-decoration-none">
            Jobs
          </Link>
        </li>
        <li className="breadcrumb-item px-3 text-muted ">{job.title}</li>
      </ol>

      {/* Main Row */}
      <div className="row gy-4 mx-0">
        {/* Left Column */}
        <div className="col-12 col-lg-8">
          <motion.div
            className="bg-white p-4 rounded shadow-sm mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Title Row */}
            <div className="row mb-4 g-3">
              <div className="col-12 ">
                <div className="d-flex align-items-start">
                  {/* Job Icon */}
                  {job.job_icon && (
                    <img
                      src={Utils.img(job.job_icon)}
                      alt={job.title}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                      className="rounded me-3"
                    />
                  )}
                  <div>
                    <h2 className="fw-bold mb-1">{job.title}</h2>
                    {/* Location / District */}
                    <p className="mb-2 text-muted">
                      <i className="bi bi-geo-alt-fill me-1" />
                      {job.district_id || "Location N/A"}
                    </p>

                    {/* Deadline */}
                    <p className="mb-2 text-danger">
                      <i className="bi bi-alarm me-1" />
                      Application Deadline:{" "}
                      <strong>{job.deadline || "Not specified"}</strong>
                    </p>

                    {/* Status */}
                    <span
                      className={`badge ${
                        job.status === "Open"
                          ? "bg-success"
                          : job.status === "Closed"
                          ? "bg-danger"
                          : "bg-secondary"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="" />

            <h5 className="fw-bold mb-3 mt-5">Job Description</h5>
            <div>
              {job.responsibilities
                ? parse(job.responsibilities)
                : "No description provided."}
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-4 rounded shadow-sm mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h5 className="fw-bold mb-3">Benefits & Other Info</h5>
            <div>
              {job.benefits
                ? parse(job.benefits)
                : "No benefits details provided."}
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-4 rounded shadow-sm mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h5 className="fw-bold mb-3">Application Method</h5>
            {job.application_method ? (
              <div>
                <strong>Method:</strong> {job.application_method}
                <br />
                <strong>Details:</strong>{" "}
                {job.application_method_details || "N/A"}
              </div>
            ) : (
              <div>No application instructions provided.</div>
            )}
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="col-12 col-lg-4">
          {/* Key Details Card */}
          <motion.div
            className="bg-white p-4 rounded shadow-sm mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h6 className="fw-bold mb-3">Job Details</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <i className="bi bi-building me-2 text-muted"></i>
                <strong>Category: </strong>
                {job.category_id || "N/A"}
              </li>
              <li className="mb-2">
                <i className="bi bi-briefcase me-2 text-muted"></i>
                <strong>Employment Type: </strong>
                {job.employment_status || "N/A"}
              </li>
              <li className="mb-2">
                <i className="bi bi-laptop me-2 text-muted"></i>
                <strong>Workplace: </strong>
                {job.workplace || "N/A"}
              </li>
              <li className="mb-2">
                <i className="bi bi-cash-stack me-2 text-muted"></i>
                <strong>Salary: </strong>
                {job.show_salary === "Yes" ? (
                  <>
                    UGX {new Intl.NumberFormat().format(job.minimum_salary)} -{" "}
                    {new Intl.NumberFormat().format(job.maximum_salary)}
                  </>
                ) : (
                  "Hidden"
                )}
              </li>
              <li className="mb-2">
                <i className="bi bi-bar-chart-line me-2 text-muted"></i>
                <strong>Experience: </strong>
                {job.experience_period || "Not specified"}
              </li>
              <li className="mb-2">
                <i className="bi bi-mortarboard-fill me-2 text-muted"></i>
                <strong>Min. Qualification: </strong>
                {job.minimum_academic_qualification || "N/A"}
              </li>
              <li className="mb-2">
                <i className="bi bi-person-fill me-2 text-muted"></i>
                <strong>Gender: </strong>
                {job.gender || "N/A"}
              </li>
              <li className="mb-2">
                <i className="bi bi-people-fill me-2 text-muted"></i>
                <strong>Vacancies: </strong>
                {job.vacancies_count || 1}
              </li>
              <li className="mb-2">
                <i className="bi bi-card-list me-2 text-muted"></i>
                <strong>Status: </strong>
                {job.status}
              </li>
            </ul>
          </motion.div>

          {/* Quick Actions Card (optional) */}
          <motion.div
            className="bg-white p-4 rounded shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h6 className="fw-bold mb-3">Actions</h6>
            <div className="d-grid gap-2">
              <button className="btn btn-primary" onClick={handleApplyNow}>
                <i className="bi bi-send-fill me-1" />
                Apply Now
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={handleSaveJob}
              >
                <i className="bi bi-bookmark-heart me-1" />
                Save This Job
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={handleShareJob}
              >
                <i className="bi bi-share-fill me-1" />
                Share
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Go Back Link */}
      <div className="mt-5">
        <Link to="/jobs" className="text-decoration-none">
          <i className="bi bi-arrow-left me-1" />
          Back to Job Listings
        </Link>
      </div>
    </motion.div>
  );
};

export default JobDetailPage;
