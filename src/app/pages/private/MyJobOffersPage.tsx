// src/app/pages/candidate/MyJobOffersPage.tsx
import React, { useEffect, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  Badge,
  Button,
  Spinner,
  Table,
  Alert,
  Pagination,
  Modal,
  Form,
} from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FiSearch } from "react-icons/fi";

import { JobOffer, PaginatedResponse } from "../../models/JobOffer";
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle } from "../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { http_post } from "../../services/Api";

interface MyJobOffersPageProps {}

const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, y: 10 },
};

/**
 * StatusBadge: A small, memoized component to display a color-coded job offer status badge.
 */
const StatusBadge = memo(({ status }: { status: string }) => {
  let variant = "secondary";
  switch (status) {
    case "Pending":
      variant = "warning";
      break;
    case "Accepted":
      variant = "success";
      break;
    case "Declined":
      variant = "danger";
      break;
    default:
      variant = "secondary";
      break;
  }
  return <Badge bg={variant}>{status}</Badge>;
});
StatusBadge.displayName = "StatusBadge";

/**
 * JobOfferRow: Memoized table row component to display a single job offer in the list.
 * It includes a skeleton loading state and buttons for viewing details and responding to offers.
 */
const JobOfferRow = memo(
  ({
    offer,
    idx,
    currentPage,
    rowLoading,
    onViewDetails,
    onRespond,
  }: {
    offer: JobOffer;
    idx: number;
    currentPage: number;
    rowLoading: boolean;
    onViewDetails: (offer: JobOffer) => void;
    onRespond: (offer: JobOffer) => void;
  }) => {
    const rowNumber = (currentPage - 1) * 10 + (idx + 1);

    return (
      <tr>
        <td>{rowLoading ? <Skeleton /> : rowNumber}</td>
        <td>
          {rowLoading ? (
            <Skeleton width={120} />
          ) : (
            <>{offer.company_name || offer.company_text || "N/A"}</>
          )}
        </td>
        <td>
          {rowLoading ? (
            <Skeleton width={120} />
          ) : (
            <>{offer.job_title || "No Title"}</>
          )}
        </td>
        <td>
          {rowLoading ? (
            <Skeleton width={60} />
          ) : (
            <StatusBadge status={offer.status} />
          )}
        </td>
        <td>
          {rowLoading ? (
            <Skeleton width={100} />
          ) : offer.created_at ? (
            offer.created_at.split("T")[0]
          ) : (
            "N/A"
          )}
        </td>
        <td>
          {rowLoading ? (
            <Skeleton width={70} />
          ) : (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onViewDetails(offer)}
            >
              View
            </Button>
          )}{" "}
          {rowLoading || offer.status !== "Pending" ? null : ( // Only show Respond if status is Pending
            <Button
              variant="primary"
              size="sm"
              onClick={() => onRespond(offer)}
            >
              Respond
            </Button>
          )}
        </td>
      </tr>
    );
  }
);
JobOfferRow.displayName = "JobOfferRow";

/**
 * OfferViewModal: Modal component for displaying read-only details of a job offer.
 */
const OfferViewModal: React.FC<{
  show: boolean;
  offer: JobOffer | null;
  onClose: () => void;
}> = ({ show, offer, onClose }) => {
  if (!offer) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Job Offer Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="text-primary mb-3">{offer.job_title || "No Title"}</h5>
        <p>
          <strong>Company:</strong>{" "}
          {offer.company_name || offer.company_text}
        </p>
        <p>
          <strong>Salary:</strong> {offer.salary || "N/A"}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {offer.start_date ? offer.start_date.split("T")[0] : "N/A"}
        </p>
        <div className="mb-3">
          <strong>Job Description:</strong>
          <div
            className="bg-light p-2 rounded mt-1"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {offer.job_description || "No description provided."}
          </div>
        </div>
        <hr />
        <p>
          <strong>Status:</strong> <StatusBadge status={offer.status} />
        </p>
        {offer.candidate_message && (
          <div className="mt-3">
            <p>
              <strong>Your Message:</strong>
            </p>
            <div className="bg-light p-2 rounded">
              {offer.candidate_message || "No message provided."}
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/**
 * RespondModal: Modal component for handling job offer responses (Accept/Decline) with an optional message.
 */
const RespondModal: React.FC<{
  show: boolean;
  offer: JobOffer | null;
  onClose: () => void;
  onResponseSubmitted: () => void;
}> = ({ show, offer, onClose, onResponseSubmitted }) => {
  const [candidateMessage, setCandidateMessage] = useState("");
  const [actionType, setActionType] = useState<"accept" | "decline" | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (offer) {
      // Reset state when a new offer is to be responded to
      setCandidateMessage("");
      setActionType(null);
      setError("");
    }
  }, [offer]);

  const handleSubmit = async () => {
    if (!actionType || !offer) {
      toast.error("Please select Accept or Decline.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const updatedStatus = actionType === "accept" ? "Accepted" : "Declined";
      const payload = {
        status: updatedStatus,
        candidate_message: candidateMessage.trim(),
      };

      // API call to update the job offer status
      await http_post(`/job-offers/${offer.id}?_method=PUT`, payload);

      toast.success(`Job offer ${updatedStatus.toLowerCase()} successfully!`);
      onClose();
      onResponseSubmitted(); // Notify parent to refresh job offers list
    } catch (err: any) {
      console.error("Error updating job offer:", err); // More descriptive error logging
      setError(
        "Failed to update the job offer. " +
          (err.message || "Please check your connection and try again.")
      ); // User-friendly error message
      toast.error("Failed to update job offer."); // Toast for immediate feedback
    } finally {
      setLoading(false);
    }
  };

  if (!offer) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Respond to Job Offer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <p>
          You are responding to:
          <br />
          <strong>{offer.job_title}</strong> at{" "}
          <strong>{offer.company_name || offer.company_text}</strong>
        </p>
        <hr />
        <div className="mb-3">
          <Form.Label className="fw-semibold">Message (optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write a short message (e.g., additional notes)."
            value={candidateMessage}
            onChange={(e) => setCandidateMessage(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between mt-4">
          <Button
            variant="outline-success"
            onClick={() => setActionType("accept")}
            active={actionType === "accept"}
          >
            Accept
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => setActionType("decline")}
            active={actionType === "decline"}
          >
            Decline
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={loading || !actionType}
        >
          {loading ? (
            <Spinner animation="border" size="sm" as="span" />
          ) : (
            "Submit Response"
          )}{" "}
          {/* Spinner for loading */}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/**
 * MyJobOffersPage: Main page component to display and manage job offers for a candidate.
 * It handles fetching, searching, paginating, viewing, and responding to job offers.
 */
const MyJobOffersPage: React.FC<MyJobOffersPageProps> = () => {
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowLoadingIndices, setRowLoadingIndices] = useState<number[]>([]); // Consider if still needed, or remove if not actually loading individual rows

  // Modals state
  const [viewModalOffer, setViewModalOffer] = useState<JobOffer | null>(null);
  const [respondModalOffer, setRespondModalOffer] = useState<JobOffer | null>(
    null
  );
  const [showViewModal, setShowViewModal] = useState(false);
  const [showRespondModal, setShowRespondModal] = useState(false);

  /**
   * Fetches job offers for the current user from the backend API.
   * Uses useCallback to prevent unnecessary re-renders and optimize performance.
   */
  const fetchOffers = useCallback(
    async (page: number, search: string) => {
      setIsLoading(true);
      setError("");
      try {
        const params = {} as Record<string, string | number>;
        if (search) {
          params.search = search;
        }
        const resp: PaginatedResponse<JobOffer> = await JobOffer.fetchMyOffers(
          page,
          params
        );
        setOffers(resp.data);
        setCurrentPage(resp.current_page);
        setLastPage(resp.last_page);
      } catch (apiError: any) {
        // More specific error type
        console.error("API Error fetching job offers:", apiError);
        setError("Failed to load job offers. Please check your connection."); // More user-friendly error message
        toast.error("Failed to load job offers.");
      } finally {
        setIsLoading(false);
      }
    },
    [] // Dependency array is empty as fetchOffers doesn't depend on any state within the component scope, except for setIsLoading, setError, etc., which are stable.
  );

  // Fetch offers on initial load and when page or search term changes
  useEffect(() => {
    fetchOffers(currentPage, searchTerm);
  }, [fetchOffers, currentPage, searchTerm]);

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setCurrentPage(1); // Reset to the first page on new search
    fetchOffers(1, searchTerm); // Fetch offers based on the new search term
  };

  // Handle pagination page changes
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setCurrentPage(newPage);
    }
  };

  // --- Modal Handlers ---
  const handleViewDetails = (offer: JobOffer) => {
    setViewModalOffer(offer);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewModalOffer(null);
  };

  const handleRespond = (offer: JobOffer) => {
    setRespondModalOffer(offer);
    setShowRespondModal(true);
  };

  const handleCloseRespondModal = () => {
    setShowRespondModal(false);
    setRespondModalOffer(null);
  };

  // Callback after a response is submitted in RespondModal
  const handleResponseSubmitted = () => {
    handleCloseRespondModal(); // Close the response modal
    fetchOffers(currentPage, searchTerm); // Refresh job offers list to reflect updated status
  };

  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: "My Job Offers",
            path: "/my-job-offers",
            isActive: true,
          },
        ]}
      >
        My Job Offers
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
            {/* Search Bar */}
            <Form
              onSubmit={handleSearchSubmit}
              className="row mb-3"
              autoComplete="off"
            >
              <div className="col-md-4">
                <Form.Group className="input-group input-group-sm">
                  <span className="input-group-text bg-primary text-white">
                    <FiSearch />
                  </span>
                  <Form.Control
                    type="text"
                    placeholder="Search by job or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit" variant="primary">
                    Search
                  </Button>
                </Form.Group>
              </div>
            </Form>

            {/* Loading, Error, and No Offers States */}
            {isLoading && (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            )}

            {!isLoading && error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}

            {!isLoading && !error && offers.length === 0 && (
              <Alert variant="info" className="text-center">
                You have no job offers yet.
              </Alert>
            )}

            {/* Job Offers Table */}
            {!isLoading && !error && offers.length > 0 && (
              <div className="table-responsive">
                <Table striped hover className="align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Company</th>
                      <th>Job Title</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offers.map((offer, idx) => (
                      <JobOfferRow
                        key={offer.id}
                        offer={offer}
                        idx={idx}
                        currentPage={currentPage}
                        rowLoading={rowLoadingIndices.includes(idx)} // Consider if row-level loading is still relevant
                        onViewDetails={handleViewDetails}
                        onRespond={handleRespond}
                      />
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && !error && lastPage > 1 && (
              <Pagination className="mt-4 justify-content-center">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  Previous
                </Pagination.Prev>
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
                >
                  Next
                </Pagination.Next>
              </Pagination>
            )}
          </div>
        </motion.div>

        {/* Modals */}
        <AnimatePresence>
          {showViewModal && viewModalOffer && (
            <OfferViewModal
              show={showViewModal}
              offer={viewModalOffer}
              onClose={handleCloseViewModal}
            />
          )}

          {showRespondModal && respondModalOffer && (
            <RespondModal
              show={showRespondModal}
              offer={respondModalOffer}
              onClose={handleCloseRespondModal}
              onResponseSubmitted={handleResponseSubmitted}
            />
          )}
        </AnimatePresence>
      </Content>
    </>
  );
};

export default MyJobOffersPage;
