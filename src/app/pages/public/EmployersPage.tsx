import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { CvModel, PaginatedResponse } from "../../models/CvModel";
import Utils from "../../services/Utils";
import { JobSkeleton } from "./JobDetailPage";
import { http_post } from "../../services/Api"; // for the follow POST

interface EmployersPageProps {}

interface SearchFilter {
  search: string;
  industry?: string;
  employeesMin?: number;
  employeesMax?: number;
  establishedAfter?: number;
  certifications?: string;
}

const defaultSearchValues: SearchFilter = {
  search: "",
  industry: "",
  employeesMin: undefined,
  employeesMax: undefined,
  establishedAfter: undefined,
  certifications: "",
};

// Example industry array
const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Education",
  "Construction",
  "Transportation",
];

// Simple fade animation
const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 10 },
};

const EmployersPage: React.FC<EmployersPageProps> = () => {
  const [companies, setCompanies] = useState<CvModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchFilter, setSearchFilter] =
    useState<SearchFilter>(defaultSearchValues);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isGridView, setIsGridView] = useState(true);

  // For the Modal
  const [selectedCompany, setSelectedCompany] = useState<CvModel | null>(null);
  const [showModal, setShowModal] = useState(false);

  // For the "Follow" button
  const [isFollowing, setIsFollowing] = useState(false);

  // Fetch data on mount or when page/filter changes
  useEffect(() => {
    fetchCompanies(currentPage, searchFilter);
    // eslint-disable-next-line
  }, [currentPage, searchFilter]);

  // Fetch Companies
  const fetchCompanies = async (page: number, filter: SearchFilter) => {
    try {
      setIsLoading(true);
      const params = {
        search: filter.search,
        industry: filter.industry || "",
        employeesMin: filter.employeesMin?.toString() || "",
        employeesMax: filter.employeesMax?.toString() || "",
        establishedAfter: filter.establishedAfter?.toString() || "",
        certifications: filter.certifications || "",
        is_company: "true",
      };

      const result: PaginatedResponse<CvModel> = await CvModel.fetchJobs(
        page,
        params
      );
      setCompanies(result.data);
      setCurrentPage(result.current_page);
      setTotalPages(result.last_page);
    } catch (error) {
      toast.error("Failed to load company data.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search form
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCompanies(1, searchFilter);
  };

  // Reset filters
  const handleReset = () => {
    setSearchFilter(defaultSearchValues);
    setCurrentPage(1);
  };

  // Pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Open the modal
  const viewCompanyDetails = async (company: CvModel) => {
    try {
      const payload = { type: "COMPANY", item_id: company.id };
      const response = await http_post("/view-record-create", payload);
      if (response.code == 1) {
        // toast.success("View recorded successfully.");
      } else {
        // toast.error(response.message);
      }
    } catch (error: any) {
      /*  console.error("Error recording view:", error);
      toast.error("" + error); */
    } finally {
    }

    setSelectedCompany(company);
    setShowModal(true);
  };

  // Follow button click
  const handleFollowCompany = async () => {
    if (!selectedCompany) return;

    setIsFollowing(true);
    try {
      const payload = {
        company_id: selectedCompany.id, // or whichever field needed
      };
      // e.g. POST /company-follow with { company_id: ... }
      await http_post("/company-follow", payload);

      toast.success("You are now following this company.");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to follow the company because: " + err);
    } finally {
      setIsFollowing(false);
    }
  };

  // If loading entire page, show skeleton or spinner
  if (isLoading) {
    return JobSkeleton();
  }

  return (
    <motion.div
      className="container py-4 px-2 px-md-4"
      variants={fadeVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="row g-4">
        {/* --- Filters Sidebar --- */}
        <div className="col-lg-3">
          <motion.div className="card border-0 shadow-sm h-100" layout>
            <div className="card-body">
              <h4 className="mb-4">Search Employers</h4>
              <form onSubmit={handleSearch}>
                {/* Search Input */}
                <div className="mb-3">
                  <label className="form-label">Company Search</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name or industry..."
                    value={searchFilter.search}
                    onChange={(e) =>
                      setSearchFilter((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Industry */}
                <div className="mb-3">
                  <label className="form-label">Industry</label>
                  <select
                    className="form-select"
                    value={searchFilter.industry}
                    onChange={(e) =>
                      setSearchFilter((prev) => ({
                        ...prev,
                        industry: e.target.value,
                      }))
                    }
                  >
                    <option value="">All Industries</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Employees Range */}
                <div className="mb-3">
                  <label className="form-label">Company Size</label>
                  <div className="row g-2">
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Min"
                        min="0"
                        value={searchFilter.employeesMin || ""}
                        onChange={(e) =>
                          setSearchFilter((prev) => ({
                            ...prev,
                            employeesMin: Number(e.target.value),
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
                        value={searchFilter.employeesMax || ""}
                        onChange={(e) =>
                          setSearchFilter((prev) => ({
                            ...prev,
                            employeesMax: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Established After */}
                <div className="mb-3">
                  <label className="form-label">Established After</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Year"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={searchFilter.establishedAfter || ""}
                    onChange={(e) =>
                      setSearchFilter((prev) => ({
                        ...prev,
                        establishedAfter: Number(e.target.value),
                      }))
                    }
                  />
                </div>

                {/* Certifications */}
                <div className="mb-4">
                  <label className="form-label">Certifications</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. ISO, OSHA..."
                    value={searchFilter.certifications}
                    onChange={(e) =>
                      setSearchFilter((prev) => ({
                        ...prev,
                        certifications: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Search
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* --- Main Content --- */}
        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold mb-0">Employers</h3>
            <div className="d-flex gap-2">
              <button
                className={`btn btn-sm ${
                  isGridView ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setIsGridView(true)}
              >
                <i className="bi bi-grid"></i>
              </button>
              <button
                className={`btn btn-sm ${
                  !isGridView ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setIsGridView(false)}
              >
                <i className="bi bi-list"></i>
              </button>
            </div>
          </div>

          {companies.length === 0 ? (
            <div className="alert alert-secondary">
              No companies found. Try adjusting your filters.
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={isGridView ? "grid" : "list"}
                variants={fadeVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {isGridView ? (
                  // Grid View
                  <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                    {companies.map((company) => (
                      <div key={company.id} className="col">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                              <img
                                src={Utils.img(
                                  company.company_logo || "default-company.png"
                                )}
                                alt="Company"
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                                className="me-3 border"
                              />
                              <div>
                                <h5 className="mb-0">{company.company_name}</h5>
                                <small className="text-muted">
                                  {company.company_main_category_id}
                                </small>
                              </div>
                            </div>
                            <p className="small mb-2 text-muted">
                              <strong>Employees:</strong>{" "}
                              {company.company_employees_range}
                              {" | "}
                              <strong>Location:</strong>{" "}
                              {company.company_country}
                            </p>
                            <p className="text-truncate-3 small text-muted">
                              {company.company_description}
                            </p>
                          </div>
                          <div className="card-footer bg-white border-0">
                            <button
                              className="btn btn-sm border border-1 border-primary btn-outline-primary w-100"
                              onClick={() => viewCompanyDetails(company)}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // List View
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Company</th>
                          <th>Industry</th>
                          <th>Employees</th>
                          <th>Country</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {companies.map((company) => (
                          <tr key={company.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src={Utils.img(
                                    company.company_logo ||
                                      "default-company.png"
                                  )}
                                  alt="Company"
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                    objectFit: "cover",
                                    borderRadius: "4px",
                                  }}
                                  className="me-2 border"
                                />
                                <div>
                                  <div className="fw-semibold">
                                    {company.company_name}
                                  </div>
                                  <small className="text-muted">
                                    {company.company_sub_category_id}
                                  </small>
                                </div>
                              </div>
                            </td>
                            <td>{company.company_main_category_id}</td>
                            <td>{company.company_employees_range}</td>
                            <td>{company.company_country}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => viewCompanyDetails(company)}
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
          {totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    « Prev
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pg) => (
                    <li
                      key={pg}
                      className={`page-item ${
                        currentPage === pg ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(pg)}
                      >
                        {pg}
                      </button>
                    </li>
                  )
                )}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next »
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Company Detail Modal */}
      <AnimatePresence>
        {showModal && selectedCompany && (
          <motion.div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content border-0">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title mb-0 text-white">
                    {selectedCompany.company_name}
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                  />
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-4 border-end">
                      <div className="text-center mb-3">
                        <img
                          src={Utils.img(
                            selectedCompany.company_logo ||
                              "default-company.png"
                          )}
                          alt="Company logo"
                          className="img-fluid border"
                          style={{ maxWidth: "200px", borderRadius: "4px" }}
                        />
                      </div>
                      <div>
                        <h6 className="fw-semibold mb-2">At a Glance</h6>
                        <ul className="list-unstyled mb-0 small">
                          <li className="mb-1">
                            <strong>Industry:</strong>{" "}
                            {selectedCompany.company_main_category_id || "N/A"}
                          </li>
                          <li className="mb-1">
                            <strong>Founded:</strong>{" "}
                            {selectedCompany.company_year_of_establishment ||
                              "N/A"}
                          </li>
                          <li className="mb-1">
                            <strong>Employees:</strong>{" "}
                            {selectedCompany.company_employees_range || "N/A"}
                          </li>
                          <li className="mb-1">
                            <strong>Location:</strong>{" "}
                            {selectedCompany.company_address || "N/A"}
                          </li>
                          <li className="mb-1">
                            <strong>Certifications:</strong>{" "}
                            {selectedCompany.company_certifications || "N/A"}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <h5 className="fw-semibold mb-3">About the Company</h5>
                      <p className="small">
                        {selectedCompany.company_description}
                      </p>

                      <div className="row g-3 mt-3">
                        <div className="col-md-6">
                          <h6 className="fw-semibold">Online Presence</h6>
                          <ul className="list-unstyled small">
                            {selectedCompany.company_website_url && (
                              <li>
                                <a
                                  href={selectedCompany.company_website_url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Website
                                </a>
                              </li>
                            )}
                            {selectedCompany.company_facebook_url && (
                              <li>
                                <a
                                  href={selectedCompany.company_facebook_url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Facebook
                                </a>
                              </li>
                            )}
                            {selectedCompany.company_linkedin_url && (
                              <li>
                                <a
                                  href={selectedCompany.company_linkedin_url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  LinkedIn
                                </a>
                              </li>
                            )}
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <h6 className="fw-semibold">Details</h6>
                          <ul className="list-unstyled small">
                            <li>
                              <strong>License:</strong>{" "}
                              {selectedCompany.company_trade_license_no ||
                                "N/A"}
                            </li>
                            <li>
                              <strong>Tax ID:</strong>{" "}
                              {selectedCompany.company_tax_id || "N/A"}
                            </li>
                            <li>
                              <strong>Ownership:</strong>{" "}
                              {selectedCompany.company_ownership_type || "N/A"}
                            </li>
                            <li>
                              <strong>Operating Hours:</strong>{" "}
                              {selectedCompany.company_operating_hours || "N/A"}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer with "Follow" & "View More" buttons */}
                <div className="modal-footer border-0">
                  {/* "Follow" button */}
                  <button
                    className="btn btn-sm btn btn-sm btn-primary"
                    disabled={isFollowing}
                    onClick={handleFollowCompany}
                  >
                    {isFollowing ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        />
                        Following...
                      </>
                    ) : (
                      "Follow Company"
                    )}
                  </button>

                  {/* "Close" button */}
                  <button
                    className="btn btn-sm btn-secondary"
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
    </motion.div>
  );
};

export default EmployersPage;
