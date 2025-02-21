import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Modal } from "bootstrap";
import { motion } from "framer-motion";
import { JobModel } from "../../models/JobModel";
import parse from "html-react-parser";
import { useAuth } from "../../modules/auth";
import Utils from "../../services/Utils";
import { http_post } from "../../services/Api";
import { toast } from "react-toastify";

interface ApplicationFormData {
  applicantMessage: string;
  attachments: FileList | null;
  additionalInfo: string;
}

const ApplyJobPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [job, setJob] = useState<JobModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [confirmModal, setConfirmModal] = useState<Modal | null>(null);

  const [formData, setFormData] = useState<ApplicationFormData>({
    applicantMessage: "",
    attachments: null,
    additionalInfo: "",
  });
  const [submitSuccess, setSubmitSuccess] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");

  useEffect(() => {
    if (!currentUser) {
      alert("Please login to apply for jobs.");
      navigate("/login");
      return;
    }
    const fetchJob = async () => {
      if (!id) {
        setError("No job ID specified.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError("");
        const fetchedJob = await JobModel.fetchJobById(id);
        setJob(fetchedJob);
      } catch (err: any) {
        setError(err.message || "Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, currentUser, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: files || value,
    }));
  };

  const showModal = () => {
    const modalEl = document.getElementById("confirmModal");
    if (!modalEl) return;
    const modalInstance = new Modal(modalEl);
    setConfirmModal(modalInstance);
    modalInstance.show();
  };

  const handleConfirmSubmit = async () => {
    confirmModal?.hide();
    setSubmitError("");
    setSubmitSuccess("");
    try {
      const submissionData = new FormData();
      submissionData.append("job_id", id || "");
      submissionData.append("applicant_message", formData.applicantMessage);
      submissionData.append("additional_info", formData.additionalInfo);
      if (formData.attachments) {
        Array.from(formData.attachments).forEach((file) => {
          submissionData.append("attachments[]", file);
        });
      }
      setLoading(true);
      try {
        await http_post("job-apply", submissionData);
        toast.success("Job application submitted successfully");
        navigate(`/admin/my-job-applications`);
      } catch (error) {
        setSubmitError("Failed: " + error);
        toast.error(error + "");
      } finally {
        setLoading(false);
      }
    } catch (err: any) {
      setSubmitError(err?.message || "An error occurred while submitting.");
    }
  };

  if (loading) {
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
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  return (
    <motion.div
      className="container py-4 px-2 px-lg-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <ol className="breadcrumb breadcrumb-item text-muted fs-6 fw-bold mb-5 mx-3">
        <li className="breadcrumb-item pe-3">
          <Link to="/" className="active text-decoration-none">
            Home
          </Link>
        </li>
        <li className="breadcrumb-item pe-3">
          <Link to="/jobs" className="active text-decoration-none">
            Jobs
          </Link>
        </li>
        <li className="breadcrumb-item pe-0">
          <Link to={`/jobs/${id}`} className="active text-decoration-none">
            {job?.title}
          </Link>
        </li>
        <li className="breadcrumb-item px-3 text-muted">Apply</li>
      </ol>
      <div className="row gy-4">
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0 fs-1 pt-6 text-white">
                Online - Job application form
              </h2>
            </div>
            <div className="card-body">
              <div
                className="alert alert-warning alert-dismissible fade show mt-0"
                role="alert"
              >
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Make sure your profile is well updated before submitting.
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
              {submitSuccess && (
                <div className="alert alert-success">{submitSuccess}</div>
              )}
              {submitError && (
                <div className="alert alert-danger">{submitError}</div>
              )}

              <p>You are applying for this job as:</p>
              <div className="card border border-2 border-primary">
                <div className="card-body py-3 px-3">
                  <div className="d-flex mb-2 align-items-center">
                    <div className="symbol symbol-60px me-5">
                      <img
                        src={Utils.img(currentUser?.avatar || "")}
                        alt="Applicant"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <div className="text-gray-900 fw-bold fs-6">
                        {currentUser?.name}
                      </div>
                      <span className="text-muted d-block fw-semibold">
                        {currentUser?.phone_number_1}
                      </span>
                      <span className="text-muted d-block fw-semibold">
                        {currentUser?.email}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mt-3">
                    <Link
                      to="/admin/profile-edit/photo"
                      target="_blank"
                      className="btn btn-link d-flex align-items-center"
                    >
                      <i className="bi bi-pencil-square me-2"></i>
                      <span>Update My CV</span>
                    </Link>
                  </div>
                </div>
              </div>

              <hr className="mt-10" />

              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold mt-3">
                    Add Attachments
                  </label>
                  <input
                    type="file"
                    name="attachments"
                    multiple
                    className="form-control"
                    onChange={handleChange}
                  />
                  <small className="text-muted">
                    Upload any relevant documents as needed.
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Your Message</label>
                  <textarea
                    className="form-control"
                    name="applicantMessage"
                    rows={5}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={showModal}
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4">
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
                {job?.category_id || "N/A"}
              </li>
              <li className="mb-2">
                <i className="bi bi-briefcase me-2 text-muted"></i>
                <strong>Employment Type: </strong>
                {job?.employment_status || "N/A"}
              </li>
              <li className="mb-2">
                <i className="bi bi-laptop me-2 text-muted"></i>
                <strong>Workplace: </strong>
                {job?.workplace || "N/A"}
              </li>
              <li className="mb-2">
                <i className="bi bi-cash-stack me-2 text-muted"></i>
                <strong>Salary: </strong>
                {job?.show_salary === "Yes" ? (
                  <>
                    UGX {new Intl.NumberFormat().format(job?.minimum_salary)} -{" "}
                    {new Intl.NumberFormat().format(job?.maximum_salary)}
                  </>
                ) : (
                  "Hidden"
                )}
              </li>
              <li className="mb-2">
                <i className="bi bi-bar-chart-line me-2 text-muted"></i>
                <strong>Experience: </strong>
                {job?.experience_period || "Not specified"}
              </li>
              <li className="mb-2">
                <i className="bi bi-mortarboard-fill me-2 text-muted"></i>
                <strong>Min. Qualification: </strong>
                {job?.minimum_academic_qualification || "N/A"}
              </li>
              <li className="mb-2">
                <i className="bi bi-person-fill me-2 text-muted"></i>
                <strong>Gender: </strong>
                {job?.gender || "N/A"}
              </li>
              <li className="mb-2">
                <i className="bi bi-people-fill me-2 text-muted"></i>
                <strong>Vacancies: </strong>
                {job?.vacancies_count || 1}
              </li>
              <li className="mb-2">
                <i className="bi bi-card-list me-2 text-muted"></i>
                <strong>Status: </strong>
                {job?.status}
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-white p-4 rounded shadow-sm mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h6 className="fw-bold mb-3">Application Instructions</h6>
            <p className="text-muted">
              {parse(job?.application_method_details || "N/A")}
            </p>
            <hr />
            <p>
              Skills.ug will not be responsible for any financial transactions
              or fraud by the company after applying through the website. This
              platform only connects companies and job seekers.
            </p>
          </motion.div>
        </div>
      </div>

      <div
        className="modal fade"
        id="confirmModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title text-white">
                Confirm Your Application
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Your Message:</strong>{" "}
                {formData.applicantMessage || "Not provided"}
              </p>
              <p>
                <strong>Additional Info:</strong>{" "}
                {formData.additionalInfo || "Not provided"}
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Edit
              </button>
              <button className="btn btn-primary" onClick={handleConfirmSubmit}>
                Confirm &amp; Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ApplyJobPage;
