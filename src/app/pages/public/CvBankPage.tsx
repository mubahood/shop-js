import React, { useState, useEffect } from "react";
import { CvModel, PaginatedResponse } from "../../models/CvModel";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Utils from "../../services/Utils";
import { Link } from "react-router-dom";
import { JobSkeleton } from "./JobDetailPage";
import { http_post } from "../../services/Api";
import { useAuth } from "../../modules/auth";

interface CvBankPageProps {}

interface SearchFilter {
  search: string;
  experienceMin?: number;
  experienceMax?: number;
  educationLevel?: string;
  skills?: string;
}

const defaultSearchValues: SearchFilter = {
  search: "",
  experienceMin: undefined,
  experienceMax: undefined,
  educationLevel: "",
  skills: "",
};

const educationLevels = [
  "High School",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
];

const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, y: 10 },
};

const CvBankPage: React.FC<CvBankPageProps> = () => {
  const [cvList, setCvList] = useState<CvModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [searchFilter, setSearchFilter] =
    useState<SearchFilter>(defaultSearchValues);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isGridView, setIsGridView] = useState(true);
  const [selectedCv, setSelectedCv] = useState<CvModel | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();

  // New state for the 'Offer Job' modal and conditional modals
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showLoginRequiredModal, setShowLoginRequiredModal] = useState(false);
  const [showCompanyRequiredModal, setShowCompanyRequiredModal] = useState(false);
  const [offerForm, setOfferForm] = useState({
    jobTitle: "",
    companyName: "",
    salary: "",
    startDate: "",
    jobDescription: "",
  });
  // New state for loading during job offer submission
  const [isOfferLoading, setIsOfferLoading] = useState(false);

  useEffect(() => {
    if (currentUser != null) {
      setIsLoggedIn(true);
      if (currentUser?.is_company == "Yes") {
        setIsCompany(true);
      } else {
        setIsCompany(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsCompany(false);
    }
    fetchCvList(currentPage, searchFilter);
    // eslint-disable-next-line
  }, [currentPage, searchFilter]);

  const fetchCvList = async (page: number, filter: SearchFilter) => {
    try {
      setIsLoading(true);
      const params = {
        search: filter.search,
        experienceMin: filter.experienceMin?.toString() || "",
        experienceMax: filter.experienceMax?.toString() || "",
        educationLevel: filter.educationLevel || "",
        skills: filter.skills || "",
      };
      const result: PaginatedResponse<CvModel> = await CvModel.fetchJobs(
        page,
        params
      );
      setCvList(result.data);
      setCurrentPage(result.current_page);
      setTotalPages(result.last_page);
    } catch (error) {
      toast.error("Failed to load CV bank data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCvList(1, searchFilter);
  };

  const handleReset = () => {
    setSearchFilter(defaultSearchValues);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const viewCvDetails = (cv: CvModel) => {
    setSelectedCv(cv);
    setShowModal(true);
  };

  const openOfferModal = () => {
    if (!isLoggedIn) {
      setShowLoginRequiredModal(true);
      setShowModal(false); // Close the CV details modal
      return;
    }

    if (!isCompany) {
      setShowCompanyRequiredModal(true);
      setShowModal(false); // Close the CV details modal
      return;
    }
    setShowOfferModal(true);
    setShowModal(false); // Close the CV details modal
  };

  const closeOfferModal = () => {
    setShowOfferModal(false);
  };

  const closeLoginRequiredModal = () => {
    setShowLoginRequiredModal(false);
    setShowModal(true); // Re-open the CV details modal
  };

  const closeCompanyRequiredModal = () => {
    setShowCompanyRequiredModal(false);
    setShowModal(true); // Re-open the CV details modal
  };


  const handleOfferFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOfferForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Set offer loading to true
    setIsOfferLoading(true);
    var resp;
    try {
      resp = await http_post("/job-offer-create", {
        job_title: offerForm.jobTitle,
        company_name: offerForm.companyName,
        salary: offerForm.salary,
        start_date: offerForm.startDate,
        job_description: offerForm.jobDescription,
        candidate_id: selectedCv?.id,
      });
      toast.success("Job offer created successfully!");
      setShowOfferModal(false);
    } catch (error) {
      toast.error(error + "");
    } finally {
      // Set offer loading to false regardless of success or failure
      setIsOfferLoading(false);
    }
  };

  if (isLoading) {
    return JobSkeleton();
  }

  return (
    <motion.div
      className="container py-4 px-0 px-md-12"
      variants={fadeVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="d-flex justify-content-between align-items-center mb-0">
        <ol className="breadcrumb breadcrumb-item text-muted fs-6 fw-bold mb-5 mx-0 mt-2">
          <li className="breadcrumb-item pe-3">
            <Link to="/" className="active text-decoration-none">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item px-3 text-muted">CV Bank</li>
        </ol>
        <div className="d-flex gap-2 mb-2">
          <button
            className={`btn btn-outline-secondary ${
              isGridView ? "active" : ""
            }`}
            onClick={() => setIsGridView(true)}
          >
            <i className="bi bi-grid-fill"></i> Grid
          </button>
          <button
            className={`btn btn-outline-secondary ${
              !isGridView ? "active" : ""
            }`}
            onClick={() => setIsGridView(false)}
          >
            <i className="bi bi-list-task"></i> Table
          </button>
        </div>
      </div>
      <div className="row g-4">
        {/* Filters Sidebar */}
        <div className="col-lg-3">
          <motion.div
            className="card shadow-sm h-100"
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="card-body">
              <form onSubmit={handleSearch}>
                <div className="mb-3">
                  <label className="form-label">Search by Name/Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter keywords..."
                    value={searchFilter.search}
                    onChange={(e) =>
                      setSearchFilter((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Experience Range (years)</label>
                  <div className="row g-2">
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Min"
                        min="0"
                        value={searchFilter.experienceMin || ""}
                        onChange={(e) =>
                          setSearchFilter((prev) => ({
                            ...prev,
                            experienceMin: parseInt(e.target.value) || 0,
                          }))
                        }
                      />
                    </div>
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Max"
                        min="0"
                        value={searchFilter.experienceMax || ""}
                        onChange={(e) =>
                          setSearchFilter((prev) => ({
                            ...prev,
                            experienceMax: parseInt(e.target.value) || 0,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Education Level</label>
                  <select
                    className="form-select"
                    value={searchFilter.educationLevel}
                    onChange={(e) =>
                      setSearchFilter((prev) => ({
                        ...prev,
                        educationLevel: e.target.value,
                      }))
                    }
                  >
                    <option value="">All Education Levels</option>
                    {educationLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label">Skills</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., JavaScript, React, Python"
                    value={searchFilter.skills}
                    onChange={(e) =>
                      setSearchFilter((prev) => ({
                        ...prev,
                        skills: e.target.value,
                      }))
                    }
                  />
                  <div className="form-text">Separate skills with commas</div>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-funnel me-2"></i>
                    Apply Filters
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={handleReset}
                  >
                    <i className="bi bi-arrow-counterclockwise me-2"></i>
                    Reset Filters
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : cvList.length === 0 ? (
            <div className="alert alert-warning">
              No matching candidates found.
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={isGridView ? "grid" : "table"}
                variants={fadeVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {isGridView ? (
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {cvList.map((cv, idx) => (
                      <motion.div
                        className="col"
                        key={cv.id}
                        variants={fadeVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="card h-100 shadow-sm">
                          <div className="card-body text-center">
                            <div className="d-flex justify-content-center mb-3">
                              {cv.avatar ? (
                                <img
                                  src={Utils.img(cv.avatar)}
                                  alt="Avatar"
                                  className="rounded-circle"
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                  }}
                                />
                              ) : (
                                <div
                                  className="rounded-circle"
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    backgroundColor: "#dee2e6",
                                  }}
                                />
                              )}
                            </div>
                            <h5 className="card-title mb-2">
                              {cv.name || `${cv.first_name} ${cv.last_name}`}
                            </h5>
                            <div className="text-muted small mb-3">
                              <div>{cv.email}</div>
                              <div>
                                {cv.phone_number_1 || cv.phone_number_2}
                              </div>
                            </div>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => viewCvDetails(cv)}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Avatar</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cvList.map((cv, index) => (
                          <tr key={cv.id}>
                            <td>{index + 1 + (currentPage - 1) * 10}</td>
                            <td>
                              {cv.avatar ? (
                                <img
                                  src={Utils.img(cv.avatar)}
                                  alt="Avatar"
                                  className="rounded-circle"
                                  style={{ width: "40px", height: "40px" }}
                                />
                              ) : (
                                <div
                                  className="rounded-circle"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    backgroundColor: "#dee2e6",
                                  }}
                                />
                              )}
                            </td>
                            <td>
                              {cv.name || `${cv.first_name} ${cv.last_name}`}
                            </td>
                            <td>{cv.email}</td>
                            <td>{cv.phone_number_1 || cv.phone_number_2}</td>
                            <td>
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => viewCvDetails(cv)}
                              >
                                Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <button className="page-link">Previous</button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        page === currentPage ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      <button className="page-link">{page}</button>
                    </li>
                  )
                )}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <button className="page-link">Next</button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Main Modal */}
      <AnimatePresence>
        {showModal && selectedCv && (
          <motion.div
            className="modal fade show d-block"
            tabIndex={-1}
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedCv.name ||
                      `${selectedCv.first_name} ${selectedCv.last_name}`}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-4 text-center">
                      {selectedCv.avatar ? (
                        <img
                          src={Utils.img(selectedCv.avatar)}
                          alt="Avatar"
                          className="img-fluid rounded-circle mb-3"
                          style={{ width: "150px", height: "150px" }}
                        />
                      ) : (
                        <div
                          className="rounded-circle bg-secondary mb-3"
                          style={{
                            width: "150px",
                            height: "150px",
                            margin: "0 auto",
                          }}
                        />
                      )}
                      <h5>Contact Information</h5>
                      <ul className="list-unstyled">
                        <li>
                          <strong>Email:</strong> {selectedCv.email}
                        </li>
                        <li>
                          <strong>Phone:</strong>{" "}
                          {selectedCv.phone_number_1 ||
                            selectedCv.phone_number_2}
                        </li>
                        <li>
                          <strong>Location:</strong>{" "}
                          {selectedCv.current_address}
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-8">
                      <h5>Professional Details</h5>
                      <div className="mb-4">
                        <h6>Objective</h6>
                        <p>{selectedCv.objective || "Not specified"}</p>
                      </div>
                      <div className="mb-4">
                        <h6>Career Summary</h6>
                        <p>{selectedCv.career_summary || "Not specified"}</p>
                      </div>
                      <div className="mb-4">
                        <h6>Special Qualifications</h6>
                        <p>
                          {selectedCv.special_qualification || "None provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                  <div>
                    <Link
                      to={`/cv-bank/${selectedCv.id}`}
                      className="btn btn-primary me-2"
                    >
                      View Complete Cv
                    </Link>
                    <button
                      className="btn btn-success"
                      onClick={openOfferModal}
                    >
                      Offer a Job
                    </button>
                  </div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 'Offer a Job' Modal */}
      <AnimatePresence>
        {showOfferModal && (
          <motion.div
            className="modal fade show d-block"
            tabIndex={-1}
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-md modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Offer a Job</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeOfferModal}
                  />
                </div>
                <form onSubmit={handleOfferSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Job Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="jobTitle"
                        value={offerForm.jobTitle}
                        onChange={handleOfferFormChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Company Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="companyName"
                        value={offerForm.companyName}
                        onChange={handleOfferFormChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Proposed Salary (UGX)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="salary"
                        value={offerForm.salary}
                        onChange={handleOfferFormChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="startDate"
                        value={offerForm.startDate}
                        onChange={handleOfferFormChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Job Description</label>
                      <textarea
                        className="form-control"
                        name="jobDescription"
                        rows={3}
                        value={offerForm.jobDescription}
                        onChange={handleOfferFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isOfferLoading} // Disable button when loading
                    >
                      {isOfferLoading ? ( // Show loader if loading
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Submitting...
                        </>
                      ) : (
                        "Submit Offer" // Default button text
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeOfferModal}
                      disabled={isOfferLoading} // Disable button when loading
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Required Modal */}
      <AnimatePresence>
        {showLoginRequiredModal && (
          <motion.div
            className="modal fade show d-block"
            tabIndex={-1}
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Login Required</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeLoginRequiredModal}
                  />
                </div>
                <div className="modal-body">
                  <p>You need to be logged in as a company to offer a job.</p>
                  <p>Please <Link to="/login">login</Link> to continue.</p>
                </div>
                <div className="modal-footer">
                  <Link to="/login" className="btn btn-primary">
                    Login
                  </Link>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeLoginRequiredModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Company Registration Required Modal */}
      <AnimatePresence>
        {showCompanyRequiredModal && (
          <motion.div
            className="modal fade show d-block"
            tabIndex={-1}
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Company Registration Required</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeCompanyRequiredModal}
                  />
                </div>
                <div className="modal-body">
                  <p>You need to register as a company to offer a job.</p>
                  <p>Please <Link to="/admin/company-profile-edit">register your company profile</Link> to continue.</p>
                </div>
                <div className="modal-footer">
                  <Link to="/admin/company-profile-edit" className="btn btn-primary">
                    Register Company
                  </Link>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeCompanyRequiredModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CvBankPage;