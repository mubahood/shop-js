// src/app/pages/private/jobs/JobsPage.tsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";

import { useAuth } from "../../../modules/auth";
import { PageTitle } from "../../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import { Content } from "../../../../_metronic/layout/components/content";

import { TextInput, SelectInput } from "../../../components/FormComponents";
import { JobModel } from "../../../models/JobModel";

interface JobsPageProps {}

// Example filter options (status, categories, etc.)
const JOB_STATUS_OPTIONS = [
  { value: "", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "closed", label: "Closed" },
  { value: "pending", label: "Pending" },
];

const CATEGORY_OPTIONS = [
  { value: "", label: "All" },
  { value: "JC001", label: "IT & Software" },
  { value: "JC002", label: "Marketing & Sales" },
  { value: "JC003", label: "Education & Training" },
];

const defaultSearchValues = {
  search: "",
  status: "",
  category_id: "",
};

// Framer motion variants for fade in/out
const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, y: 10 },
};

const JobsPage: React.FC<JobsPageProps> = () => {
  const { currentUser } = useAuth();

  // States
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchFilter, setSearchFilter] = useState(defaultSearchValues);

  // For viewing job details in a modal
  const [selectedJob, setSelectedJob] = useState<JobModel | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch user’s jobs on mount / filter change
  useEffect(() => {
    if (!currentUser) {
      toast.error("Please log in.");
      return;
    }
    fetchMyJobs(currentPage, searchFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, currentPage, searchFilter]);

  /**
   * Fetch the authenticated user's jobs from /my-jobs
   */
  const fetchMyJobs = async (
    page: number,
    filter: typeof defaultSearchValues
  ) => {
    try {
      setIsLoading(true);
      const params: Record<string, string> = {};
      if (filter.search) params.search = filter.search;
      if (filter.status) params.status = filter.status;
      if (filter.category_id) params.category_id = filter.category_id;

      const paginatedResult = await JobModel.fetchMyJobs(page, params);
      const { data, current_page, last_page } = paginatedResult;

      setJobs(data);
      setCurrentPage(current_page);
      setTotalPages(last_page);
    } catch (error: any) {
      toast.error("Failed to load jobs.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reload the current page data
   */
  const handleReload = () => {
    fetchMyJobs(currentPage, searchFilter);
  };

  /**
   * Handle job deletion
   */
  const handleDelete = async (job: JobModel) => {
    try {
      const confirmMsg = `Are you sure you want to delete job: ${job.title}?`;
      if (window.confirm(confirmMsg)) {
        await JobModel.deleteJob(job.id);
        toast.success("Job deleted successfully!");
        fetchMyJobs(currentPage, searchFilter);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete the job.");
    }
  };

  /**
   * Displays the modal for job details
   */
  const viewJobDetails = (job: JobModel) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  /**
   * Pagination logic
   */
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: "Jobs",
            path: "/admin/jobs",
            isActive: false,
          },
        ]}
      >
        My Jobs
      </PageTitle>

      {/* Custom Top Toolbar */}
      <div className="toolbar-wrapper">
        {/* Right Aligned Buttons */}
        <div className="d-flex align-items-center">
          <button
            className="btn btn-sm btn-light-info me-2"
            onClick={handleReload}
            title="Reload Jobs"
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Reload
          </button>
          <Link to="/admin/jobs/create" className="btn btn-sm btn-primary">
            <i className="bi bi-plus me-2"></i>Create Job
          </Link>
        </div>
      </div>

      <Content>
        <motion.div
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="card card-custom p-5">
            <h2 className="mb-5">All My Jobs</h2>

            {/* Filter Form */}
            <Formik
              initialValues={searchFilter}
              validationSchema={Yup.object({
                search: Yup.string().nullable(),
                status: Yup.string().nullable(),
                category_id: Yup.string().nullable(),
              })}
              onSubmit={(values) => {
                setSearchFilter(values);
                setCurrentPage(1);
              }}
            >
              {({ isSubmitting, resetForm }) => (
                <Form>
                  <div className="row g-4">
                    <div className="col-md-4">
                      <Field
                        name="search"
                        label="Search"
                        placeholder="Search by title"
                        component={TextInput}
                      />
                    </div>
                    <div className="col-md-4">
                      <Field
                        name="status"
                        label="Status"
                        options={JOB_STATUS_OPTIONS}
                        component={SelectInput}
                      />
                    </div>
                    <div className="col-md-4">
                      <Field
                        name="category_id"
                        label="Category"
                        options={CATEGORY_OPTIONS}
                        component={SelectInput}
                      />
                    </div>
                  </div>
                  <div className="mt-4 d-flex">
                    <button
                      type="submit"
                      className="btn btn-primary me-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Searching..." : "Search"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => {
                        resetForm();
                        setSearchFilter(defaultSearchValues);
                        setCurrentPage(1);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            {/* Data Table */}
            <div className="table-responsive mt-5">
              <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                <thead>
                  <tr className="fw-bold text-muted">
                    <th>#</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Deadline</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : jobs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No jobs found.
                      </td>
                    </tr>
                  ) : (
                    jobs.map((job, index) => (
                      <tr key={job.id}>
                        <td>{(currentPage - 1) * 10 + index + 1}</td>
                        <td
                          className="text-primary fw-bold cursor-pointer"
                          onClick={() => viewJobDetails(job)}
                        >
                          {job.title}
                        </td>
                        <td>{job.category_id}</td>
                        <td>{job.status}</td>
                        <td>{job.deadline}</td>
                        <td>
                          <Link
                            to={`/admin/jobs/${job.id}/edit`}
                            className="btn btn-sm btn-light-primary me-2"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            className="btn btn-sm btn-light-danger"
                            onClick={() => handleDelete(job)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-5">
              <nav>
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <li
                        key={page}
                        className={`page-item ${
                          page === currentPage ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
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
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </motion.div>

        {/* Modal for viewing job details */}
        <AnimatePresence>
          {showModal && selectedJob && (
            <motion.div
              className="modal fade show d-block"
              tabIndex={-1}
              variants={fadeVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      Job Details: {selectedJob.title}
                    </h5>
                    <button
                      type="button"
                      className="btn btn-icon btn-sm btn-light btn-hover-danger"
                      onClick={() => setShowModal(false)}
                    >
                      <i className="bi bi-x fs-2"></i>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>
                      <strong>Status:</strong> {selectedJob.status}
                    </p>
                    <p>
                      <strong>Category:</strong> {selectedJob.category_id}
                    </p>
                    <p>
                      <strong>Deadline:</strong> {selectedJob.deadline}
                    </p>
                    <p>
                      <strong>Workplace:</strong> {selectedJob.workplace}
                    </p>
                    <p>
                      <strong>Employment Status:</strong>{" "}
                      {selectedJob.employment_status}
                    </p>
                    <hr />
                    <p>
                      <strong>Responsibilities:</strong>
                    </p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedJob.responsibilities || "<em>None</em>",
                      }}
                    />
                    <hr />
                    <p>
                      <strong>Benefits:</strong>
                    </p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedJob.benefits || "<em>None</em>",
                      }}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-light"
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
      </Content>
    </>
  );
};

export default JobsPage;
