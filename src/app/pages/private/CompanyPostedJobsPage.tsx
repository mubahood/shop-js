// src/app/pages/admin/CompanyPostedJobsPage.tsx
import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { JobModel, PaginatedResponse } from "../../models/JobModel"; // Assuming JobModel is in "../../models/JobModel"
import Utils from "../../services/Utils";
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle } from "../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { FiSearch, FiTrash2, FiEye } from "react-icons/fi"; // Removed FiEdit, Added FiEye for View, Keep FiTrash2
import {
  Button,
  InputGroup,
  Form,
  FormControl,
  Spinner,
  Alert,
  Table,
  Badge,
  Pagination,
  Modal,
} from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom"; // Import Link for navigation

interface CompanyPostedJobsPageProps {}

const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, y: 10 },
};

// Reusing StatusBadge Component (adapt statuses for Jobs if needed)
const JobStatusBadge: React.FC<{ status: string }> = React.memo(
  ({ status }) => {
    let badgeClassName = "bg-light-secondary text-secondary";
    let textColorClass = "text-secondary";
    switch (status) {
      case "Pending":
        badgeClassName = "bg-light-warning text-warning";
        textColorClass = "text-warning";
        break;
      case "Active": // Example Job Status
        badgeClassName = "bg-light-success text-success";
        textColorClass = "text-success";
        break;
      case "Draft": // Example Job Status
        badgeClassName = "bg-light-info text-info";
        textColorClass = "text-info";
        break;
      case "Closed": // Example Job Status
        badgeClassName = "bg-light-danger text-danger";
        textColorClass = "text-danger";
        break;
      // Add more job statuses as needed
    }
    return (
      <Badge className={`badge ${badgeClassName} ${textColorClass}`}>
        {status}
      </Badge>
    );
  }
);
JobStatusBadge.displayName = "JobStatusBadge";

// Job Row Component - Adapted for JobModel
const CompanyJobRow: React.FC<{
  job: JobModel;
  idx: number;
  currentPage: number;
  onDeleteJob: (jobId: string) => void; // Handler for Delete action
  isRowLoading: boolean;
}> = React.memo(({ job, idx, currentPage, onDeleteJob, isRowLoading }) => {
  const formattedDeadline = job.deadline
    ? new Date(job.deadline).toLocaleDateString()
    : "N/A";
  const formattedPostedDate = job.created_at
    ? new Date(job.created_at).toLocaleDateString()
    : "N/A"; // Assuming created_at exists in JobModel

  return (
    <tr key={job.id}>
      <td>
        {isRowLoading ? <Skeleton /> : (currentPage - 1) * 10 + (idx + 1)}
      </td>
      <td>{isRowLoading ? <Skeleton width={150} /> : job.title}</td>
      <td>
        {isRowLoading ? (
          <Skeleton width={80} />
        ) : (
          <JobStatusBadge status={job.status} />
        )}
      </td>
      <td>{isRowLoading ? <Skeleton width={100} /> : formattedDeadline}</td>
      <td>{isRowLoading ? <Skeleton width={100} /> : job.vacancies_count}</td>
      <td>{isRowLoading ? <Skeleton width={100} /> : job.employment_status}</td>
      <td>{isRowLoading ? <Skeleton width={100} /> : formattedPostedDate}</td>
      <td className="d-flex gap-1">
        {/* Edit Button - Now a Link to Edit Page */}
        {isRowLoading ? (
          <Skeleton width={60} />
        ) : (
          <Link
            to={`/admin/job-create/${job.id}`} // Link to edit page
            className="btn btn-outline-primary btn-sm font-weight-bold"
            title="Edit Job Posting"
          >
            Edit
          </Link>
        )}
        {/* View Button - Link to Public Job Page */}
        {isRowLoading ? (
          <Skeleton width={60} />
        ) : (
          <Link
            to={`/jobs/${job.id}`} // Link to public view page
            className="btn btn-outline-info btn-sm font-weight-bold"
            title="View Job Posting"
            target="_blank"
          >
            <FiEye /> View
          </Link>
        )}
        {/* Delete Button - Triggers Delete Confirmation */}
        {isRowLoading ? (
          <Skeleton width={60} />
        ) : (
          <Button
            variant="danger"
            size="sm"
            className="btn-sm font-weight-bold"
            onClick={() => onDeleteJob(job.id)} // Call Delete Handler
            title="Delete Job Posting"
          >
            <FiTrash2 /> Delete
          </Button>
        )}
      </td>
    </tr>
  );
});
CompanyJobRow.displayName = "CompanyJobRow";

// Delete Confirmation Modal (Reused - still needed for Delete)
const DeleteConfirmationModal: React.FC<{
  showModal: boolean;
  jobIdToDelete: string | null;
  onCloseModal: () => void;
  onConfirmDelete: (jobId: string) => void;
  loading: boolean;
}> = ({ showModal, jobIdToDelete, onCloseModal, onConfirmDelete, loading }) => {
  return (
    <Modal show={showModal} onHide={onCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this job posting? This action cannot be
        undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseModal} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            if (jobIdToDelete) onConfirmDelete(jobIdToDelete);
          }}
          disabled={loading}
        >
          {loading ? <Spinner size="sm" animation="border" /> : "Delete Job"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const CompanyPostedJobsPage: React.FC<CompanyPostedJobsPageProps> = () => {
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingList, setIsUpdatingList] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0); // Added totalJobs state
  const [searchTerm, setSearchTerm] = useState("");
  // Removed Edit Modal State: showEditModal, selectedJob, openEditModal, closeEditModal
  const [rowLoadingIndices, setRowLoadingIndices] = useState<number[]>([]);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false); // Delete confirm modal
  const [jobIdToDelete, setJobIdToDelete] = useState<string | null>(null); // Job ID to delete
  const [isDeletingJob, setIsDeletingJob] = useState(false); // Loading state for delete action

  const fetchJobsData = useCallback(async (page: number, search: string) => {
    setIsLoading(true);
    setError("");
    try {
      const params = {} as Record<string, string | number>;
      if (search) params.search = search;
      const resp: PaginatedResponse<JobModel> = await JobModel.fetchCompanyJobs(
        page,
        params
      ); // Or JobModel.fetchJobs - adjust as needed
      setJobs(resp.data);
      setCurrentPage(resp.current_page);
      setLastPage(resp.last_page);
      setTotalJobs(resp.total); // Set total jobs from response
    } catch (err: any) {
      console.error(err);
      setError("Failed to load job postings.");
      toast.error("Error loading job postings.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobsData(currentPage, searchTerm);
  }, [currentPage, searchTerm, fetchJobsData]);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setCurrentPage(1);
      fetchJobsData(1, searchTerm);
    },
    [searchTerm, fetchJobsData]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= lastPage) {
        setCurrentPage(newPage);
      }
    },
    [lastPage]
  );

  // Delete Confirmation Modal Handlers (Reused)
  const openDeleteConfirmModal = useCallback((jobId: string) => {
    setJobIdToDelete(jobId);
    setShowDeleteConfirmModal(true);
  }, []);

  const closeDeleteConfirmModal = useCallback(() => {
    setShowDeleteConfirmModal(false);
    setJobIdToDelete(null);
  }, []);

  const handleRefreshJobList = useCallback(() => {
    setIsUpdatingList(true);
    fetchJobsData(currentPage, searchTerm).finally(() =>
      setIsUpdatingList(false)
    );
  }, [currentPage, searchTerm, fetchJobsData]);

  const handleDeleteJobConfirm = useCallback(
    async (jobId: string) => {
      setIsDeletingJob(true);
      try {
        await JobModel.deleteJob(jobId);
        toast.success("Job posting deleted successfully!");
        closeDeleteConfirmModal();
        handleRefreshJobList(); // Refresh job list
      } catch (error: any) {
        console.error("Error deleting job:", error);
        toast.error("Failed to delete job posting.");
      } finally {
        setIsDeletingJob(false);
      }
    },
    [handleRefreshJobList, closeDeleteConfirmModal]
  );

  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: "Admin",
            path: "/admin/dashboard", // Adjust path as needed
            isActive: false,
          },
          {
            title: "Posted Jobs",
            path: "/admin/company-posted-jobs",
            isActive: false,
          },
        ]}
      >
        Manage Posted Jobs
      </PageTitle>
      <ToolbarWrapper />
      <Content>
        <motion.div
          className="container-fluid py-4 card shadow-sm"
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-4">
                <Form onSubmit={handleSearchSubmit}>
                  <InputGroup size="sm">
                    <InputGroup.Text className="bg-primary border-primary text-white">
                      <FiSearch color="white" />
                    </InputGroup.Text>
                    <FormControl
                      type="text"
                      placeholder="Search jobs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="primary" type="submit" size="sm">
                      Search
                    </Button>
                  </InputGroup>
                </Form>
              </div>
            </div>

            {(isLoading || isUpdatingList) && (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}

            {!isLoading && error && (
              <Alert variant="danger" role="alert">
                {error}
              </Alert>
            )}

            {!isLoading && !error && jobs.length === 0 && (
              <div className="d-flex flex-column align-items-center justify-content-center py-5">
                <Alert variant="info" className="text-center w-50">
                  <h4 className="font-weight-bold">No Job Postings Found</h4>
                  <p className="mb-4">No jobs have been posted yet.</p>
                  {/* Optionally add a "Create Job" button here if appropriate */}
                </Alert>
              </div>
            )}

            {!isLoading && !error && jobs.length > 0 && (
              <div className="table-responsive">
                <Table striped bordered hover className="align-middle">
                  {" "}
                  {/* Added bordered for better visual structure */}
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Deadline</th>
                      <th>Vacancies</th>
                      <th>Employment</th>
                      <th>Posted Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job, idx) => (
                      <CompanyJobRow
                        key={job.id}
                        job={job}
                        idx={idx}
                        currentPage={currentPage}
                        onDeleteJob={openDeleteConfirmModal} // Only need delete handler now
                        isRowLoading={rowLoadingIndices.includes(idx)}
                      />
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={8} className="text-center text-muted">
                        Showing page {currentPage} of {lastPage} | Total Jobs:{" "}
                        {totalJobs}
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </div>
            )}

            {!isLoading && !error && lastPage > 1 && (
              <Pagination className="mt-4 justify-content-center">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="pagination-prev next-link"
                >
                  Previous
                </Pagination.Prev>
                {Array.from({ length: lastPage }, (_, i) => i + 1).map((pg) => (
                  <Pagination.Item
                    key={pg}
                    active={pg === currentPage}
                    onClick={() => handlePageChange(pg)}
                    className="page-item"
                  >
                    {pg}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= lastPage}
                  className="pagination-next next-link"
                >
                  Next
                </Pagination.Next>
              </Pagination>
            )}
          </div>
        </motion.div>
      </Content>

      {/* Delete Confirmation Modal (Reused - still needed for Delete) */}
      <DeleteConfirmationModal
        showModal={showDeleteConfirmModal}
        jobIdToDelete={jobIdToDelete}
        onCloseModal={closeDeleteConfirmModal}
        onConfirmDelete={handleDeleteJobConfirm}
        loading={isDeletingJob}
      />
    </>
  );
};

export default CompanyPostedJobsPage;
