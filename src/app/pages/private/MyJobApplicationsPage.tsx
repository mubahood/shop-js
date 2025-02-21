// src/app/pages/admin/MyJobApplicationsPage.tsx
import React, { useState, useEffect, useCallback } from "react"; // Import useCallback
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  MyJonApplicationModel,
  PaginatedResponse,
} from "../../models/MyJonApplicationModel";
import Utils from "../../services/Utils"; // You might not be using Utils, review its usage.
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle } from "../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { FiSearch } from "react-icons/fi";
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
} from "react-bootstrap"; // Using React-Bootstrap for UI - consider Metronic's UI library if available

interface MyJobApplicationsPageProps {}

const fadeVariant = {
  /* ... fadeVariant (no change) ... */
};

// Reusable Status Badge Component
const StatusBadge: React.FC<{ status: string }> = React.memo(({ status }) => {
  // Using React.memo for potential performance optimization
  let badgeClassName = "bg-secondary";
  switch (status) {
    case "Pending":
      badgeClassName = "bg-warning";
      break;
    case "Interview":
      badgeClassName = "bg-info";
      break;
    case "Hired":
      badgeClassName = "bg-success";
      break;
    case "Declined":
      badgeClassName = "bg-danger";
      break;
  }
  return <Badge className={badgeClassName}>{status}</Badge>;
});
StatusBadge.displayName = "StatusBadge"; // Explicitly set display name for React.memo

// Job Application Row Component
const JobApplicationRow: React.FC<{
  app: MyJonApplicationModel;
  idx: number;
  currentPage: number;
  onViewDetails: (app: MyJonApplicationModel) => void;
}> = React.memo(({ app, idx, currentPage, onViewDetails }) => {
  // Using React.memo
  return (
    <tr key={app.id}>
      <td>{(currentPage - 1) * 10 + (idx + 1)}</td>
      <td>{app.job_text || app.job_id}</td>
      <td>
        <StatusBadge status={app.status} />
      </td>
      <td>{app.created_at?.split("T")[0] || "N/A"}</td>
      <td>
        {app.interview_scheduled_at
          ? app.interview_scheduled_at.split("T")[0]
          : "N/A"}
      </td>
      <td>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => onViewDetails(app)}
        >
          View
        </Button>
      </td>
    </tr>
  );
});
JobApplicationRow.displayName = "JobApplicationRow"; // Explicitly set display name for React.memo

// Job Application Detail Modal Component
const JobApplicationDetailModal: React.FC<{
  showModal: boolean;
  selectedApp: MyJonApplicationModel | null;
  onCloseModal: () => void;
}> = ({ showModal, selectedApp, onCloseModal }) => {
  if (!selectedApp) return null; // Or handle loading state if modal content is fetched separately

  return (
    <Modal show={showModal} onHide={onCloseModal} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Application for: {selectedApp.job_text || selectedApp.job_id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <strong>Status:</strong> {selectedApp.status}
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>
              <strong>Applied On:</strong>{" "}
              {selectedApp.created_at?.split("T")[0]}
            </p>
            <p>
              <strong>Applicant Message:</strong> <br />{" "}
              {selectedApp.applicant_message || "No message"}
            </p>
            <p>
              <strong>Attachments:</strong> {selectedApp.attachments || "None"}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Employer Message:</strong> <br />{" "}
              {selectedApp.employer_message || "N/A"}
            </p>
            <p>
              <strong>Decline Reason:</strong>{" "}
              {selectedApp.decline_reason || "N/A"}
            </p>
          </div>
        </div>
        <hr />
        <h6>Interview Details</h6>
        <p>
          <strong>Scheduled At:</strong>{" "}
          {selectedApp.interview_scheduled_at
            ? selectedApp.interview_scheduled_at.split("T")[0]
            : "N/A"}
        </p>
        <p>
          <strong>Location:</strong> {selectedApp.interview_location || "N/A"}
        </p>
        <p>
          <strong>Type:</strong> {selectedApp.interview_type || "N/A"}
        </p>
        <p>
          <strong>Result:</strong> {selectedApp.interview_result || "Pending"}
        </p>
        <p>
          <strong>Interviewer Notes:</strong>{" "}
          {selectedApp.interviewer_notes || "N/A"}
        </p>
        <p>
          <strong>Interviewer Rating:</strong>{" "}
          {selectedApp.interviewer_rating || "N/A"}
        </p>
        <p>
          <strong>Interviewee Feedback:</strong>{" "}
          {selectedApp.interviewee_feedback || "N/A"}
        </p>
        <p>
          <strong>Interviewee Rating:</strong>{" "}
          {selectedApp.interviewee_rating || "N/A"}
        </p>
        <hr />
        <h6>Onboarding</h6>
        <p>
          <strong>Contract URL:</strong> {selectedApp.contract_url || "N/A"}
        </p>
        <p>
          <strong>Onboarding Start:</strong>{" "}
          {selectedApp.onboarding_start_date || "N/A"}
        </p>
        <p>
          <strong>Onboarding Notes:</strong>{" "}
          {selectedApp.onboarding_notes || "N/A"}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const MyJobApplicationsPage: React.FC<MyJobApplicationsPageProps> = () => {
  const [apps, setApps] = useState<MyJonApplicationModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<MyJonApplicationModel | null>(
    null
  );

  // Use useCallback for handleSearchSubmit and handlePageChange for memoization benefits if passed down as props
  const fetchApplications = useCallback(
    async (page: number, search: string) => {
      // Using useCallback
      setIsLoading(true);
      setError("");
      try {
        const params = {} as Record<string, string | number>;
        if (search) params.search = search;
        const resp: PaginatedResponse<MyJonApplicationModel> =
          await MyJonApplicationModel.fetchJobs(page, params);
        setApps(resp.data);
        setCurrentPage(resp.current_page);
        setLastPage(resp.last_page);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load job applications.");
        toast.error("Error loading applications.");
      } finally {
        setIsLoading(false);
      }
    },
    []
  ); // Dependency array is empty as fetchApplications doesn't depend on any state/props directly defined in this component scope, but it is important to include if it does.

  useEffect(() => {
    fetchApplications(currentPage, searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm, fetchApplications]); // Added fetchApplications to dependency array as it's used in useEffect

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      // Using useCallback
      e.preventDefault();
      setCurrentPage(1);
      fetchApplications(1, searchTerm);
    },
    [searchTerm, fetchApplications]
  ); // Dependencies for useCallback

  const handlePageChange = useCallback(
    (newPage: number) => {
      // Using useCallback
      if (newPage >= 1 && newPage <= lastPage) {
        setCurrentPage(newPage);
      }
    },
    [lastPage]
  ); // Dependencies for useCallback

  const viewDetails = useCallback((app: MyJonApplicationModel) => {
    // Using useCallback
    setSelectedApp(app);
    setShowModal(true);
  }, []); // Dependencies for useCallback

  const closeModal = useCallback(() => {
    // Using useCallback for modal close
    setShowModal(false);
  }, []); // No dependencies

  return (
    <>
      <PageTitle
        breadcrumbs={[{ title: "Jobs", path: "/admin/jobs", isActive: false }]}
      >
        My Job Applications
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
            <Form className="mb-4" onSubmit={handleSearchSubmit}>
              <InputGroup>
                <InputGroup.Text>
                  <FiSearch />
                </InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </InputGroup>
            </Form>

            {isLoading && (
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

            {!isLoading && !error && apps.length === 0 && (
              <div className="d-flex flex-column align-items-center justify-content-center py-5">
                <Alert variant="info" className="text-center w-50">
                  <h4>No Job Applications Found</h4>
                  <p className="mb-4">You haven't applied for any jobs yet.</p>
                  <Button href="/jobs" as="a" variant="primary">
                    Browse Jobs
                  </Button>
                </Alert>
              </div>
            )}

            {!isLoading && !error && apps.length > 0 && (
              <div className="table-responsive">
                <Table striped hover className="align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Job</th>
                      <th>Status</th>
                      <th>Applied On</th>
                      <th>Interview Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apps.map((app, idx) => (
                      <JobApplicationRow
                        key={app.id}
                        app={app}
                        idx={idx}
                        currentPage={currentPage}
                        onViewDetails={viewDetails}
                      />
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            {!isLoading && !error && lastPage > 1 && (
              <Pagination className="mt-4 justify-content-center">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                />
                {Array.from({ length: lastPage }, (_, i) => i + 1).map((pg) => (
                  <Pagination.Item
                    key={pg}
                    active={pg === currentPage}
                    onClick={() => handlePageChange(pg)}
                  >
                    {pg}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= lastPage}
                />
              </Pagination>
            )}

            <AnimatePresence>
              {showModal && selectedApp && (
                <JobApplicationDetailModal
                  showModal={showModal}
                  selectedApp={selectedApp}
                  onCloseModal={closeModal}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </Content>
    </>
  );
};

export default MyJobApplicationsPage;
