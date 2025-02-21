// src/app/pages/admin/CompanyJobApplicationsPage.tsx
import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  MyJonApplicationModel,
  PaginatedResponse,
} from "../../models/MyJonApplicationModel";
import Utils from "../../services/Utils";
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
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { http_post } from "../../services/Api";

interface CompanyJobApplicationsPageProps {}

const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, y: 10 },
};

const StatusBadge: React.FC<{ status: string }> = React.memo(({ status }) => {
  let badgeClassName = "bg-light-secondary text-secondary";
  let textColorClass = "text-secondary";
  switch (status) {
    case "Pending":
      badgeClassName = "bg-light-warning text-warning";
      textColorClass = "text-warning";
      break;
    case "Interview":
      badgeClassName = "bg-light-info text-info";
      textColorClass = "text-info";
      break;
    case "Hired":
      badgeClassName = "bg-light-success text-success";
      textColorClass = "text-success";
      break;
    case "Declined":
      badgeClassName = "bg-light-danger text-danger";
      textColorClass = "text-danger";
      break;
    case "On Hold":
      badgeClassName = "bg-light-primary text-primary";
      textColorClass = "text-primary";
      break;
    case "Rejected":
      badgeClassName = "bg-light-danger text-danger";
      textColorClass = "text-danger";
      break;
  }
  return (
    <Badge className={`badge ${badgeClassName} ${textColorClass}`}>
      {status}
    </Badge>
  );
});
StatusBadge.displayName = "StatusBadge";

const JobApplicationRow: React.FC<{
  app: MyJonApplicationModel;
  idx: number;
  currentPage: number;
  onOpenReviewModal: (app: MyJonApplicationModel) => void;
  onOpenViewModal: (app: MyJonApplicationModel) => void;
  isRowLoading: boolean;
}> = React.memo(
  ({
    app,
    idx,
    currentPage,
    onOpenReviewModal,
    onOpenViewModal,
    isRowLoading,
  }) => {
    return (
      <tr key={app.id}>
        <td>
          {isRowLoading ? <Skeleton /> : (currentPage - 1) * 10 + (idx + 1)}
        </td>
        <td>
          {isRowLoading ? (
            <Skeleton width={150} />
          ) : (
            <a
              href={`/cv-bank/${app.employer_id}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Click to view applicant cv"
            >
              {app.employer_text || app.employer_id}
            </a>
          )}
        </td>
        <td>
          {isRowLoading ? <Skeleton width={150} /> : app.job_text || app.job_id}
        </td>
        <td>
          {isRowLoading ? (
            <Skeleton width={80} />
          ) : (
            <StatusBadge status={app.status} />
          )}
        </td>
        <td>
          {isRowLoading ? (
            <Skeleton width={100} />
          ) : (
            app.created_at?.split("T")[0] || "N/A"
          )}
        </td>
        <td>
          {isRowLoading ? (
            <Skeleton width={120} />
          ) : app.interview_scheduled_at ? (
            app.interview_scheduled_at.split("T")[0]
          ) : (
            "N/A"
          )}
        </td>
        <td className="d-flex gap-1">
          {" "}
          {/* d-flex and gap-1 for side-by-side buttons */}
          {isRowLoading ? (
            <Skeleton width={60} />
          ) : (
            <Button
              variant="outline-primary" // Outline for View Details
              size="sm"
              className="btn-sm font-weight-bold"
              onClick={() => onOpenViewModal(app)}
            >
              View Details
            </Button>
          )}
          {isRowLoading ? (
            <Skeleton width={60} />
          ) : (
            <Button
              variant="primary" // Primary for Review
              size="sm"
              className="btn-sm btn-primary font-weight-bold"
              onClick={() => onOpenReviewModal(app)}
            >
              Review
            </Button>
          )}
        </td>
      </tr>
    );
  }
);
JobApplicationRow.displayName = "JobApplicationRow";

// Separate View Modal Component (Read-Only)
const JobApplicationViewModal: React.FC<{
  showModal: boolean;
  selectedApp: MyJonApplicationModel | null;
  onCloseModal: () => void;
}> = ({ showModal, selectedApp, onCloseModal }) => {
  if (!selectedApp) return null;

  return (
    <Modal show={showModal} onHide={onCloseModal} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Application Details: {selectedApp.job_text || selectedApp.job_id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="mb-4">
          <h5 className="font-weight-bold text-primary mb-3">
            Application Overview
          </h5>
          <Row>
            <Col md={6}>
              <p>
                <strong>Status:</strong>{" "}
                <StatusBadge status={selectedApp.status} />
              </p>
              <p>
                <strong>Applied On:</strong>{" "}
                {selectedApp.created_at?.split("T")[0] || "N/A"}
              </p>
              <p>
                <strong>Applicant Message:</strong>
              </p>
              <div className="card card-body bg-light-secondary rounded-sm">
                {selectedApp.applicant_message || "No message"}
              </div>
              <p className="mt-2">
                <strong>Attachments:</strong>{" "}
                {selectedApp.attachments || "None"}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Employer Message:</strong>{" "}
                {selectedApp.employer_message || "N/A"}
              </p>
              <p>
                <strong>Decline Reason:</strong>{" "}
                {selectedApp.decline_reason || "N/A"}
              </p>
            </Col>
          </Row>
        </section>

        <section
          className="mb-4"
          style={{ borderTop: "1px solid #eee", paddingTop: "15px" }}
        >
          <h5 className="font-weight-bold text-primary mb-3">
            Interview Details
          </h5>
          <Row>
            <Col md={6}>
              <p>
                <strong>Scheduled At:</strong>{" "}
                {selectedApp.interview_scheduled_at
                  ? selectedApp.interview_scheduled_at.split("T")[0]
                  : "N/A"}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {selectedApp.interview_location || "N/A"}
              </p>
              <p>
                <strong>Type:</strong> {selectedApp.interview_type || "N/A"}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Result:</strong>{" "}
                {selectedApp.interview_result || "Pending"}
              </p>
              <p>
                <strong>Interviewer Notes:</strong>{" "}
                {selectedApp.interviewer_notes || "N/A"}
              </p>
              <p>
                <strong>Interviewer Rating:</strong>{" "}
                {selectedApp.interviewer_rating || "N/A"}
              </p>
            </Col>
          </Row>
        </section>

        <section
          className="mb-4"
          style={{ borderTop: "1px solid #eee", paddingTop: "15px" }}
        >
          <h5 className="font-weight-bold text-primary mb-3">
            Interviewee Feedback
          </h5>
          <Row>
            <Col md={6}>
              <p>
                <strong>Feedback to Interviewee:</strong>{" "}
                {selectedApp.interviewee_feedback || "N/A"}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Interviewee Rating:</strong>{" "}
                {selectedApp.interviewee_rating || "N/A"}
              </p>
            </Col>
          </Row>
        </section>

        <section
          className="mb-4"
          style={{ borderTop: "1px solid #eee", paddingTop: "15px" }}
        >
          <h5 className="font-weight-bold text-primary mb-3">Onboarding</h5>
          <Row>
            <Col md={6}>
              <p>
                <strong>Contract URL:</strong>{" "}
                {selectedApp.contract_url || "N/A"}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Onboarding Start:</strong>{" "}
                {selectedApp.onboarding_start_date || "N/A"}
              </p>
              <p>
                <strong>Onboarding Notes:</strong>{" "}
                {selectedApp.onboarding_notes || "N/A"}
              </p>
            </Col>
          </Row>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Job Application Detail Modal Component (Review Form - previously JobApplicationDetailModal)
const JobApplicationReviewModal: React.FC<{
  showModal: boolean;
  selectedApp: MyJonApplicationModel | null;
  onCloseModal: () => void;
  onApplicationUpdate: () => void;
}> = ({ showModal, selectedApp, onCloseModal, onApplicationUpdate }) => {
  const [localApp, setLocalApp] = useState<MyJonApplicationModel | null>(
    selectedApp
  );
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    setLocalApp(selectedApp);
  }, [selectedApp]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (!localApp) return;
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleInputChange(e);
  };

  const handleSubmitUpdate = async () => {
    if (!localApp) return;
    setUpdateLoading(true);
    setUpdateError(null);
    try {
      var resp = await http_post(
        `/job-application-update/${localApp.id}`,
        localApp
      );
      console.log("==============================");
      console.log(resp);
      console.log("==============================");
      toast.success("Application updated successfully!");
      onCloseModal();
      onApplicationUpdate();
    } catch (error: any) {
      console.error("Error updating application:", error);
      setUpdateError("Failed to update application. because " + error);
      toast.error("Failed to update application because " + error);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (!localApp) return null;

  const currentStatus = localApp.status;
  const isDeclinedOrRejected = ["Declined", "Rejected"].includes(currentStatus);
  const showInterviewDetails = [
    "Interview",
    "Hired",
    "Declined",
    "Rejected",
    "On Hold",
  ].includes(currentStatus);
  const showIntervieweeFeedback = ["Hired", "Declined", "Rejected"].includes(
    currentStatus
  );
  const showOnboarding = currentStatus === "Hired";

  return (
    <Modal show={showModal} onHide={onCloseModal} size="lg" centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="text-white">
          Review Application: {localApp.job_text || localApp.job_id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {updateError && <Alert variant="danger">{updateError}</Alert>}

        <Form>
          <section className="mb-6">
            <h5 className="font-weight-bold text-primary mb-4">
              Application Status
            </h5>
            <Row className="mb-3 align-items-stretch">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Current Status</strong>
                  </Form.Label>
                  <Form.Select
                    name="status"
                    value={localApp.status}
                    onChange={handleStatusChange}
                    className="form-control form-control-outline"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Interview">Interview</option>
                    <option value="Hired">Hired</option>
                    <option value="Declined">Declined</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Rejected">Rejected</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              {isDeclinedOrRejected && (
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Decline/Reject Reason</strong>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="decline_reason"
                      value={localApp.decline_reason || ""}
                      onChange={handleInputChange}
                      placeholder="Reason for decline/rejection (internal use)"
                      className="form-control form-control-outline"
                    />
                  </Form.Group>
                </Col>
              )}
            </Row>
          </section>

          <section className="mb-6">
            <h5 className="font-weight-bold text-primary mb-4">
              Applicant Information
            </h5>
            <Row className="mb-3">
              <Col md={6}>
                <div className="mb-3">
                  <strong className="text-dark">Applicant Message:</strong>
                  <p className="text-muted card card-body bg-light-secondary rounded-sm">
                    {localApp.applicant_message || "No message"}
                  </p>
                </div>
                <div>
                  <strong className="text-dark">Attachments:</strong>
                  <p className="text-muted">{localApp.attachments || "None"}</p>
                </div>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Employer Message to Applicant</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="employer_message"
                    value={localApp.employer_message || ""}
                    onChange={handleInputChange}
                    placeholder="Optional message to applicant"
                    className="form-control form-control-outline"
                  />
                </Form.Group>
              </Col>
            </Row>
          </section>

          {showInterviewDetails && (
            <section className="mb-6">
              <h5 className="font-weight-bold text-primary mb-4">
                Interview Details
              </h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Scheduled At</strong>
                    </Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="interview_scheduled_at"
                      value={
                        localApp.interview_scheduled_at
                          ? localApp.interview_scheduled_at.slice(0, 16)
                          : ""
                      }
                      onChange={handleInputChange}
                      className="form-control form-control-outline"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Location</strong>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="interview_location"
                      value={localApp.interview_location || ""}
                      onChange={handleInputChange}
                      placeholder="Interview Location"
                      className="form-control form-control-outline"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Interview Type</strong>
                    </Form.Label>
                    <Form.Select
                      name="interview_type"
                      value={localApp.interview_type || ""}
                      onChange={handleInputChange}
                      className="form-control form-control-outline"
                    >
                      <option value="">Select Type</option>
                      <option value="In-person">In-person</option>
                      <option value="Virtual">Virtual</option>
                      <option value="Phone">Phone</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Interviewer Notes</strong>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="interviewer_notes"
                      value={localApp.interviewer_notes || ""}
                      onChange={handleInputChange}
                      placeholder="Notes from the interviewer"
                      className="form-control form-control-outline"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Interview Result</strong>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="interview_result"
                      value={localApp.interview_result || ""}
                      onChange={handleInputChange}
                      placeholder="Interview Result"
                      className="form-control form-control-outline"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Interviewer Rating</strong>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="interviewer_rating"
                      value={localApp.interviewer_rating || ""}
                      onChange={handleInputChange}
                      placeholder="Rating given by interviewer"
                      className="form-control form-control-outline"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </section>
          )}

          {showIntervieweeFeedback && (
            <section className="mb-6">
              <h5 className="font-weight-bold text-primary mb-4">
                Interviewee Feedback
              </h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Feedback to Interviewee</strong>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="interviewee_feedback"
                      value={localApp.interviewee_feedback || ""}
                      onChange={handleInputChange}
                      placeholder="Feedback for the interviewee"
                      className="form-control form-control-outline"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Interviewee Rating</strong>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="interviewee_rating"
                      value={localApp.interviewee_rating || ""}
                      onChange={handleInputChange}
                      placeholder="Rating given by interviewee (if collected)"
                      className="form-control form-control-outline"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </section>
          )}

          {showOnboarding && (
            <section className="mb-6">
              <h5 className="font-weight-bold text-primary mb-4">Onboarding</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Contract URL</strong>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="contract_url"
                      value={localApp.contract_url || ""}
                      onChange={handleInputChange}
                      placeholder="URL of the contract document"
                      className="form-control form-control-outline"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Onboarding Start Date</strong>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="onboarding_start_date"
                      value={localApp.onboarding_start_date || ""}
                      onChange={handleInputChange}
                      className="form-control form-control-outline"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Onboarding Notes</strong>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="onboarding_notes"
                      value={localApp.onboarding_notes || ""}
                      onChange={handleInputChange}
                      placeholder="Any onboarding notes"
                      className="form-control form-control-outline"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </section>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-top pt-4">
        <Button
          variant="primary"
          onClick={handleSubmitUpdate}
          disabled={updateLoading}
          className="btn-primary font-weight-bold"
        >
          {updateLoading ? (
            <Spinner size="sm" animation="border" />
          ) : (
            "Update Application"
          )}
        </Button>
        <Button
          variant="secondary"
          onClick={onCloseModal}
          disabled={updateLoading}
          className="btn-secondary font-weight-bold ml-2"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const CompanyJobApplicationsPage: React.FC<
  CompanyJobApplicationsPageProps
> = () => {
  const [apps, setApps] = useState<MyJonApplicationModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingList, setIsUpdatingList] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false); // Modal for Review Form
  const [showViewModal, setShowViewModal] = useState(false); // Modal for View Details
  const [selectedApp, setSelectedApp] = useState<MyJonApplicationModel | null>(
    null
  );
  const [selectedViewApp, setSelectedViewApp] =
    useState<MyJonApplicationModel | null>(null); // Separate state for view modal
  const [rowLoadingIndices, setRowLoadingIndices] = useState<number[]>([]);

  const fetchApplications = useCallback(
    async (page: number, search: string) => {
      setIsLoading(true);
      setError("");
      try {
        const params = {} as Record<string, string | number>;
        if (search) params.search = search;
        const resp: PaginatedResponse<MyJonApplicationModel> =
          await MyJonApplicationModel.fetchCompanyJobs(page, params);
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
  );

  useEffect(() => {
    fetchApplications(currentPage, searchTerm);
  }, [currentPage, searchTerm, fetchApplications]);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setCurrentPage(1);
      fetchApplications(1, searchTerm);
    },
    [searchTerm, fetchApplications]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= lastPage) {
        setCurrentPage(newPage);
      }
    },
    [lastPage]
  );

  // Renamed to openReviewModal and closeReviewModal for clarity
  const openReviewModal = useCallback((app: MyJonApplicationModel) => {
    setSelectedApp(app);
    setShowReviewModal(true);
  }, []);

  const closeReviewModal = useCallback(() => {
    setShowReviewModal(false);
  }, []);

  // New functions for View Details Modal
  const openViewModal = useCallback((app: MyJonApplicationModel) => {
    setSelectedViewApp(app);
    setShowViewModal(true);
  }, []);

  const closeViewModal = useCallback(() => {
    setShowViewModal(false);
  }, []);

  const handleRefreshApplicationsList = useCallback(() => {
    setIsUpdatingList(true);
    fetchApplications(currentPage, searchTerm).finally(() =>
      setIsUpdatingList(false)
    );
  }, [currentPage, searchTerm, fetchApplications]);

  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: "Jobs",
            path: "/admin/company-job-applications",
            isActive: false,
          },
        ]}
      >
        Company - Job Applications
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
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="primary" type="submit" size="sm"></Button>
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn-primary font-weight-bold"
                    >
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

            {!isLoading && !error && apps.length === 0 && (
              <div className="d-flex flex-column align-items-center justify-content-center py-5">
                <Alert variant="info" className="text-center w-50">
                  <h4 className="font-weight-bold">
                    No Job Applications Found
                  </h4>
                  <p className="mb-4">You haven't applied for any jobs yet.</p>
                  <Button
                    href="/jobs"
                    as="a"
                    variant="primary"
                    className="btn-primary font-weight-bold"
                  >
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
                      <th>Applicant</th>
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
                        onOpenReviewModal={openReviewModal} // Pass openReviewModal
                        onOpenViewModal={openViewModal} // Pass openViewModal
                        isRowLoading={rowLoadingIndices.includes(idx)}
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

            <AnimatePresence>
              {showReviewModal && selectedApp && (
                <JobApplicationReviewModal // Renamed Modal Component
                  showModal={showReviewModal}
                  selectedApp={selectedApp}
                  onCloseModal={closeReviewModal} // Pass closeReviewModal
                  onApplicationUpdate={handleRefreshApplicationsList}
                />
              )}
              {showViewModal &&
                selectedViewApp && ( // Render View Modal
                  <JobApplicationViewModal
                    showModal={showViewModal}
                    selectedApp={selectedViewApp}
                    onCloseModal={closeViewModal} // Pass closeViewModal
                  />
                )}
            </AnimatePresence>
          </div>
        </motion.div>
      </Content>
    </>
  );
};

export default CompanyJobApplicationsPage;
