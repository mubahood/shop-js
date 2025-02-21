// src/app/pages/public/JobListingPage.tsx

import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import Utils from "../../services/Utils";
import { http_get, http_post } from "../../services/Api";
import { JobModel, PaginatedResponse } from "../../models/JobModel";
import { toast } from "react-toastify";
import { ManifestModel } from "../../models/Manifest";
import Select from "react-select";
import { DistrictModel } from "../../models/DistrictModel";
import { EMPLOYMENT_STATUS_OPTIONS } from "../../../Constants";

const fadeVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const JobListingPage: React.FC = () => {
  // Filter states
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [job_categories, set_job_categories] = useState<
    { id: number; name: string }[]
  >([]);
  const [manifest, set_manifest] = useState(new ManifestModel());
  const [industry, setIndustry] = useState("");
  const [district, setDistrict] = useState("");
  const [deadline, setDeadline] = useState("");
  const [company, setCompany] = useState("");
  const [salaryScale, setSalaryScale] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [gender, setGender] = useState("");
  const [experienceField, setExperienceField] = useState("");

  // Jobs and pagination states
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [districts, setDistricts] = useState<DistrictModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  // Dummy data arrays for filters
  const dummyCategories = [
    "Accounting",
    "IT & Software",
    "Marketing",
    "Engineering",
  ];
  const dummyIndustries = [
    "Manufacturing",
    "Banking",
    "Telecom",
    "NGO/Development",
  ];
  const dummyDistricts = [
    "Kampala",
    "Jinja",
    "Gulu",
    "Mbarara",
    "Lira",
    "Mbale",
  ];
  const dummyCompanies = [
    "Company A",
    "Company B",
    "Company C",
    "Skills.ug",
    "Organization X",
  ];
  const dummySalaryRanges = [
    { label: "Below 1,000,000 UGX", value: "1000000" },
    { label: "1,000,000 - 2,000,000 UGX", value: "2000000" },
    { label: "2,000,000 - 5,000,000 UGX", value: "5000000" },
    { label: "Above 5,000,000 UGX", value: "99999999" },
  ];
  const dummySortOptions = ["Newest", "Oldest", "High Salary", "Low Salary"];
  const dummyEmploymentStatus = [
    "Full Time",
    "Part Time",
    "Contract",
    "Internship",
    "Freelance",
  ];
  const dummyWorkplace = ["Onsite", "Remote", "Hybrid"];
  const dummyGender = ["Any", "Male", "Female", "Other"];

  // useSearchParams for URL query management
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchThings = async () => {
    var man = null;
    try {
      man = await ManifestModel.getItems();
    } catch (err) {
      toast.error("Failed to fetch things.");
      return;
    }

    var _districts = null;
    try {
      _districts = await DistrictModel.getItems();
    } catch (error) {}

    if (_districts != null) {
      setDistricts(_districts);
    } else {
      toast.error("Failed to fetch districts.");
    }
    //districts

    set_manifest(man);
  };

  // On mount, initialize filter states from URL query params and fetch jobs
  useEffect(() => {
    fetchThings();
    setKeyword(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "");
    setIndustry(searchParams.get("industry") || "");
    setDistrict(searchParams.get("district") || "");
    setDeadline(searchParams.get("deadline") || "");
    setCompany(searchParams.get("company") || "");
    setSalaryScale(searchParams.get("salary") || "");
    setSortBy(searchParams.get("sort") || "Newest");
    setEmploymentStatus(searchParams.get("employment_status") || "");
    setWorkplace(searchParams.get("workplace") || "");
    setGender(searchParams.get("gender") || "");
    setExperienceField(searchParams.get("experience_field") || "");
    setCurrentPage(Number(searchParams.get("page")) || 1);

    if (searchParams.has("search"))
      setKeyword(searchParams.get("search") || "");
    if (searchParams.has("category"))
      setCategory(searchParams.get("category") || "");
    if (searchParams.has("industry"))
      setIndustry(searchParams.get("industry") || "");
    if (searchParams.has("district"))
      setDistrict(searchParams.get("district") || "");
    if (searchParams.has("deadline"))
      setDeadline(searchParams.get("deadline") || "");
    if (searchParams.has("company"))
      setCompany(searchParams.get("company") || "");
    if (searchParams.has("salary"))
      setSalaryScale(searchParams.get("salary") || "");
    if (searchParams.has("sort"))
      setSortBy(searchParams.get("sort") || "Newest");
    if (searchParams.has("employment_status"))
      setEmploymentStatus(searchParams.get("employment_status") || "");
    if (searchParams.has("workplace"))
      setWorkplace(searchParams.get("workplace") || "");
    if (searchParams.has("gender")) setGender(searchParams.get("gender") || "");
    if (searchParams.has("experience_field"))
      setExperienceField(searchParams.get("experience_field") || "");
    fetchJobsList(Number(searchParams.get("page")) || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch jobs from the API based on current filters and page number
  const fetchJobsList = useCallback(
    async (pageNumber: number) => {
      setLoading(true);
      setError("");
      try {
        const params: Record<string, string | number> = {};
        if (keyword) params.search = keyword;
        if (category) params.category = category;
        if (industry) params.industry = industry;
        if (district) params.district = district;
        if (deadline) params.deadline = deadline;
        if (company) params.company = company;
        if (salaryScale) params.salary = salaryScale;
        if (sortBy) params.sort = sortBy;
        if (employmentStatus) params.employment_status = employmentStatus;
        if (workplace) params.workplace = workplace;
        if (gender) params.gender = gender;
        if (experienceField) params.experience_field = experienceField;

        //get latest params
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.forEach((value, key) => {
          params[key] = value;
        });

        const response: PaginatedResponse<JobModel> = await JobModel.fetchJobs(
          pageNumber,
          params
        );
        setJobs(response.data);
        setCurrentPage(response.current_page);
        setLastPage(response.last_page);
        setTotalJobs(response.total);
      } catch (err: any) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [
      keyword,
      category,
      industry,
      district,
      deadline,
      company,
      salaryScale,
      sortBy,
      employmentStatus,
      workplace,
      gender,
      experienceField,
    ]
  );

  // Update the URL with current filter states (always resets page to 1)
  const updateURLWithFilters = () => {
    const params: Record<string, string> = {};
    if (keyword) params.search = keyword;
    if (category) params.category = category;
    if (industry) params.industry = industry;
    if (district) params.district = district;
    if (deadline) params.deadline = deadline;
    if (company) params.company = company;
    if (salaryScale) params.salary = salaryScale;
    if (sortBy) params.sort = sortBy;
    if (employmentStatus) params.employment_status = employmentStatus;
    if (workplace) params.workplace = workplace;
    if (gender) params.gender = gender;
    if (experienceField) params.experience_field = experienceField;
    params.page = "1";
    setSearchParams(params, { replace: true });
  };

  // Handle filter apply button click
  const handleFilterChange = () => {
    updateURLWithFilters();
    setCurrentPage(1);
    fetchJobsList(1);
  };

  // Handle pagination and update URL
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > lastPage) return;
    setCurrentPage(newPage);
    const params = Object.fromEntries([...searchParams]);
    params.page = String(newPage);
    setSearchParams(params, { replace: true });
    fetchJobsList(newPage);
  };

  // Reset filters
  const clearFilters = () => {
    setKeyword("");
    setCategory("");
    setIndustry("");
    setDistrict("");
    setDeadline("");
    setCompany("");
    setSalaryScale("");
    setSortBy("Newest");
    setEmploymentStatus("");
    setWorkplace("");
    setGender("");
    setExperienceField("");
    setCurrentPage(1);
    setSearchParams({}, { replace: true });
    fetchJobsList(1);
  };

  // ----- Company View Record Submission -----
  // When a user clicks to view a company, we record a view record of type "COMPANY".
  const viewCompanyDetails = async (companyObj: JobModel) => {
    try {
      // Here, we assume the current user is already authenticated
      // and that the backend requires: type, viewer_id, and item_id.
      // Replace "YOUR_USER_ID" with your actual user id retrieval logic.
      const viewerId = localStorage.getItem("userId") || "0";
      const payload = {
        type: "COMPANY",
        viewer_id: viewerId,
        item_id: companyObj.id,
        company_id: companyObj.posted_by_id, // if needed
      };
      await http_post("/view-record-create", payload);
      toast.success("Company view recorded.");
    } catch (err: any) {
      console.error("Error recording company view:", err);
      toast.error("Failed to record company view.");
    }
    // Open the modal after recording the view.
    setSelectedCompanyForView(companyObj);
    setShowModal(true);
  };

  // For viewing company details, we reuse a simple modal.
  const [selectedCompanyForView, setSelectedCompanyForView] =
    useState<JobModel | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Modal component to show company details
  const CompanyDetailModal: React.FC<{
    company: JobModel | null;
    onClose: () => void;
  }> = ({ company, onClose }) => {
    if (!company) return null;
    return (
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
              <h5 className="modal-title mb-0 text-white">{company.title}</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-4 border-end">
                  <div className="text-center mb-3">
                    <img
                      src={Utils.img(company.job_icon || "default-company.png")}
                      alt="Company logo"
                      className="img-fluid border"
                      style={{ maxWidth: "200px", borderRadius: "4px" }}
                    />
                  </div>
                  <div>
                    <h6 className="fw-semibold mb-2">At a Glance</h6>
                    <ul className="list-unstyled mb-0 small">
                      <li className="mb-1">
                        <strong>Location:</strong>{" "}
                        {company.district_id || "N/A"}
                      </li>
                      <li className="mb-1">
                        <strong>Employment:</strong> {company.employment_status}{" "}
                        | {company.workplace}
                      </li>
                      <li className="mb-1">
                        <strong>Salary:</strong>{" "}
                        {company.show_salary === "Yes"
                          ? `UGX ${new Intl.NumberFormat().format(
                              company.minimum_salary
                            )} – ${new Intl.NumberFormat().format(
                              company.maximum_salary
                            )}`
                          : "Hidden"}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-8">
                  <h5 className="fw-semibold mb-3">About the Job</h5>
                  <p className="small">{company.responsibilities}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0">
              <Link
                to={`/jobs/${company.id}`}
                className="btn btn-sm btn-primary"
              >
                View More
              </Link>
              <button className="btn btn-sm btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="container py-4 px-2 px-lg-10">
      <div className="row gx-3">
        {/* LEFT FILTER COLUMN */}
        <motion.div
          className="col-12 col-md-3 mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-white rounded shadow-sm p-3">
            <h6 className="fw-bold mb-3 d-flex align-items-center">
              <i className="bi bi-funnel-fill me-2 text-primary"></i>Refine Your
              Search
            </h6>
            {/* Keyword */}
            <div className="mb-2">
              <label className="form-label mb-1">Keyword</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="e.g. Engineer"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            {/* Category */}
            <div className="mb-2">
              <label className="form-label mb-1">Category </label>
              {(() => {
                const options = [];
                var selected_cat_label = "All";
                if (Array.isArray(manifest.CATEGORIES)) {
                  for (const cat of manifest.CATEGORIES) {
                    if (cat.id + "" == category + "") {
                      selected_cat_label =
                        cat.name + " (" + cat.jobs_count + ")";
                    }
                    options.push({
                      value: cat.id,
                      label: `${cat.name} (${cat.jobs_count})`,
                    });
                  }
                }
                return (
                  <Select
                    value={
                      category
                        ? { value: category, label: selected_cat_label }
                        : null
                    }
                    onChange={(selected) => {
                      //if is same, return
                      if (selected?.value + "" === category) return;
                      setCategory(selected?.value + "" || "");
                      console.log(selected?.value);
                    }}
                    options={options}
                  />
                );
              })()}
            </div>

            {/* District */}
            <div className="mb-2">
              <label className="form-label mb-1">District</label>

              {(() => {
                const options = [];
                var selected_district_label = "";
                if (Array.isArray(districts)) {
                  for (const item of districts) {
                    if (item.id + "" == district + "") {
                      selected_district_label = item.name;
                      if (item.jobs_count) {
                        selected_district_label += " (" + item.jobs_count + ")";
                      } else {
                        selected_district_label += " (0)";
                      }
                    }
                    options.push({
                      value: item.id,
                      label: `${item.name} (${
                        item.jobs_count ? item.jobs_count : 0
                      })`,
                    });
                  }
                }
                return (
                  <Select
                    value={
                      district
                        ? { value: district, label: selected_district_label }
                        : null
                    }
                    onChange={(selected) => {
                      //if is same, return
                      if (selected?.value + "" == district) return;
                      setDistrict(selected?.value + "" || "");
                      console.log(selected?.value);
                    }}
                    options={options}
                  />
                );
              })()}
            </div>
            {/* Deadline */}
            <div className="mb-2">
              <label className="form-label mb-1">Deadline</label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            {/* Salary */}
            <div className="mb-3">
              <label className="form-label mb-1">Salary</label>
              <select
                className="form-select form-select-sm"
                value={salaryScale}
                onChange={(e) => setSalaryScale(e.target.value)}
              >
                <option value="">Any</option>
                {dummySalaryRanges.map((sr) => (
                  <option key={sr.value} value={sr.value}>
                    {sr.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Employment Status */}
            <div className="mb-2">
              <label className="form-label mb-1">Employment Status</label>
              <select
                className="form-select form-select-sm"
                value={employmentStatus}
                onChange={(e) => setEmploymentStatus(e.target.value)}
              >
                <option value="">Any</option>
                {Array.isArray(EMPLOYMENT_STATUS_OPTIONS) &&
                  EMPLOYMENT_STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
            </div>
            {/* Workplace */}
            <div className="mb-2">
              <label className="form-label mb-1">Workplace</label>
              <select
                className="form-select form-select-sm"
                value={workplace}
                onChange={(e) => setWorkplace(e.target.value)}
              >
                <option value="">Any</option>
                {dummyWorkplace.map((wp) => (
                  <option key={wp} value={wp}>
                    {wp}
                  </option>
                ))}
              </select>
            </div>
            {/* Gender */}
            <div className="mb-2">
              <label className="form-label mb-1">Gender</label>
              <select
                className="form-select form-select-sm"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                {dummyGender.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            {/* Experience Field */}
            <div className="mb-2">
              <label className="form-label mb-1">Experience Field</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="e.g. IT, Finance"
                value={experienceField}
                onChange={(e) => setExperienceField(e.target.value)}
              />
            </div>
            {/* Buttons */}
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-primary flex-grow-1"
                onClick={handleFilterChange}
              >
                <i className="bi bi-search me-1"></i>Apply
              </button>
              <button
                className="btn btn-sm btn-secondary"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </div>
        </motion.div>

        {/* RIGHT MAIN COLUMN */}
        <div className="col-12 col-md-9">
          {/* Topbar for Quick Search + Sort */}
          <motion.div
            className="bg-white shadow-sm rounded p-3 d-flex align-items-center justify-content-between mb-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="h4 mb-0">Jobs</h1>
            <div className="ms-auto">
              <label className="me-2 text-muted">Sort By:</label>
              <select
                className="form-select form-select-sm d-inline-block w-auto"
                style={{ minWidth: "120px" }}
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                  fetchJobsList(1);
                }}
              >
                {dummySortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Loading */}
          {loading && (
            <div className="py-4 text-center">
              <div className="spinner-border text-primary" role="status" />
              <p className="mt-2">Loading jobs...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* No Jobs */}
          {!loading && !error && jobs.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">
                No jobs found for the selected criteria.
              </p>
            </div>
          )}

          {/* JOB LISTINGS */}
          {!loading && !error && jobs.length > 0 && (
            <div className="row row-cols-1 row-cols-md-2 g-3">
              {jobs.map((job) => (
                <div className="col" key={job.id}>
                  <motion.div
                    className="card h-100 border-0 shadow-sm rounded-3"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link
                      to={`/jobs/${job.id}`}
                      className="text-decoration-none text-dark"
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h5 className="card-title mb-0 fw-semibold">
                            {job.title}
                          </h5>
                          {job.job_icon && (
                            <img
                              src={Utils.img(job.job_icon)}
                              alt={job.title}
                              style={{ width: "40px", height: "40px" }}
                              className="ms-3"
                            />
                          )}
                        </div>
                        {/* Location */}
                        <div className="mb-2">
                          <small className="text-muted d-block">
                            <i className="bi bi-geo-alt-fill me-1"></i>
                            <strong>Location:</strong>{" "}
                            {job.district_id || "N/A"}
                          </small>
                        </div>
                        {/* Deadline */}
                        <div className="mb-2">
                          <small className="text-muted d-block">
                            <i className="bi bi-alarm me-1"></i>
                            {/* 25-03-29T00:00:00.000000Z */}
                            <strong>Deadline:</strong>{" "}
                            {Utils.formatDate(job.deadline) || "N/A"}
                          </small>
                        </div>
                        {/* Salary */}
                        <div className="mb-2">
                          <small className="text-muted d-block">
                            <i className="bi bi-cash-stack me-1"></i>
                            <strong>Salary:</strong>{" "}
                            {job.show_salary === "Yes" ? (
                              <>
                                UGX{" "}
                                {new Intl.NumberFormat().format(
                                  job.minimum_salary
                                )}{" "}
                                –{" "}
                                {new Intl.NumberFormat().format(
                                  job.maximum_salary
                                )}
                              </>
                            ) : (
                              "Hidden"
                            )}
                          </small>
                        </div>
                        {/* Employment & Workplace */}
                        <div>
                          <small className="text-muted d-block">
                            <strong>Employment:</strong> {job.employment_status}{" "}
                            | <strong>Workplace:</strong> {job.workplace}
                          </small>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {!loading && !error && totalJobs > 0 && (
            <div className="d-flex justify-content-between align-items-center mt-4">
              <small className="text-muted">
                Page <strong>{currentPage}</strong> of{" "}
                <strong>{lastPage}</strong> | Total:{" "}
                <strong>{totalJobs}</strong>
              </small>
              <div>
                <button
                  className="btn btn-outline-secondary btn-sm me-1"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  <i className="bi bi-chevron-left"></i> Prev
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= lastPage}
                >
                  Next <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .container {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
        .btn-primary {
          background-color: #114786;
          border-color: #114786;
        }
        .btn-primary:hover {
          background-color: #0f3a6d;
          border-color: #0f3a6d;
        }
      `}</style>

      {/* Company Detail Modal */}
      <AnimatePresence>
        {showModal && selectedCompanyForView && (
          <CompanyDetailModal
            company={selectedCompanyForView}
            onClose={() => {
              setShowModal(false);
              setSelectedCompanyForView(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobListingPage;
