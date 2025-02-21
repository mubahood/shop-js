// src/app/pages/company/CompanyJobOffersPage.tsx
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  Table,
  Spinner,
  Alert,
  Pagination,
  Button,
  Modal,
  Form,
  Badge,
} from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FiSearch } from "react-icons/fi";

import { JobOffer, PaginatedResponse } from "../../models/JobOffer";
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle } from "../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { http_post } from "../../services/Api";

// Simple page fade animation
const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 10 },
};

/** A small component that color-codes an offer's status */
const StatusBadge: React.FC<{ status: string }> = React.memo(({ status }) => {
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
    case "Cancelled":
      variant = "dark";
      break;
    default:
      variant = "secondary";
      break;
  }
  return <Badge bg={variant}>{status}</Badge>;
});
StatusBadge.displayName = "StatusBadge";

/** Table row representing a single company job offer */
const JobOfferRow: React.FC<{
  offer: JobOffer;
  idx: number;
  currentPage: number;
  rowLoading: boolean;
  onViewOffer: (offer: JobOffer) => void;
  onCancelOffer: (offer: JobOffer) => void;
}> = React.memo(
  ({ offer, idx, currentPage, rowLoading, onViewOffer, onCancelOffer }) => {
    const rowNumber = (currentPage - 1) * 10 + (idx + 1);

    return (
      <tr>
        <td>{rowLoading ? <Skeleton /> : rowNumber}</td>
        <td>
          {rowLoading ? (
            <Skeleton width={120} />
          ) : (
            offer.job_title || "No Title"
          )}
        </td>
        <td>
          {rowLoading ? (
            <Skeleton width={120} />
          ) : (
            offer.candidate_text || offer.candidate_id
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
          ) : (
            offer.created_at?.split("T")[0] || "N/A"
          )}
        </td>
        <td>
          {rowLoading ? (
            <Skeleton width={70} />
          ) : (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onViewOffer(offer)}
            >
              View
            </Button>
          )}{" "}
          {rowLoading || offer.status !== "Pending" ? null : (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onCancelOffer(offer)}
            >
              Cancel
            </Button>
          )}
        </td>
      </tr>
    );
  }
);
JobOfferRow.displayName = "JobOfferRow";

/** Modal: read-only details about a job offer */
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
          <strong>Candidate ID/Text:</strong>{" "}
          {offer.candidate_text || offer.candidate_id}
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
          <>
            <h6 className="mt-3">Candidate’s Message</h6>
            <div className="bg-light p-2 rounded">
              {offer.candidate_message || "No message provided."}
            </div>
          </>
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

/** Modal: company to confirm cancellation with an optional reason */
const CancelOfferModal: React.FC<{
  show: boolean;
  offer: JobOffer | null;
  onClose: () => void;
  onCancelConfirmed: () => void;
}> = ({ show, offer, onClose, onCancelConfirmed }) => {
  const [cancelMessage, setCancelMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (offer) {
      setCancelMessage("");
      setError("");
    }
  }, [offer]);

  const handleConfirmCancel = async () => {
    if (!offer) return;
    setLoading(true);
    setError("");
    try {
      const payload = {
        status: "Cancelled",
        candidate_message: cancelMessage.trim(),
      };
      // Update the offer on the backend
      await http_post(`/job-offers/${offer.id}?_method=PUT`, payload);

      toast.success(`Offer cancelled successfully.`);
      onClose();
      onCancelConfirmed();
    } catch (err: any) {
      console.error(err);
      setError("Failed to cancel the offer. " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  if (!offer) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cancel Job Offer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <p>
          You are about to cancel the following offer:
          <br />
          <b>{offer.job_title}</b> for candidate{" "}
          <strong>{offer.candidate_text || offer.candidate_id}</strong>
        </p>
        <hr />
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Reason / Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Add a brief reason or message (optional)"
            value={cancelMessage}
            onChange={(e) => setCancelMessage(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirmCancel}
          disabled={loading}
        >
          {loading ? "Cancelling..." : "Cancel Offer"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/** Main component for the company’s job offers page */
const CompanyJobOffersPage: React.FC = () => {
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowLoadingIndices] = useState<number[]>([]); // If you want skeletons row by row

  // Modals
  const [viewModalOffer, setViewModalOffer] = useState<JobOffer | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const [cancelModalOffer, setCancelModalOffer] = useState<JobOffer | null>(
    null
  );
  const [showCancelModal, setShowCancelModal] = useState(false);

  /** Fetch all company job offers from the backend */
  const fetchOffers = useCallback(async (page: number, search: string) => {
    setIsLoading(true);
    setError("");
    try {
      const params = {} as Record<string, string | number>;
      if (search) params.search = search;

      const resp: PaginatedResponse<JobOffer> =
        await JobOffer.fetchCompanyOffers(page, params);
      setOffers(resp.data);
      setCurrentPage(resp.current_page);
      setLastPage(resp.last_page);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load job offers.");
      toast.error("Error loading job offers.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOffers(currentPage, searchTerm);
  }, [fetchOffers, currentPage, searchTerm]);

  // Search
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchOffers(1, searchTerm);
  };

  // Pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setCurrentPage(newPage);
    }
  };

  // View Offer
  const handleViewOffer = (offer: JobOffer) => {
    setViewModalOffer(offer);
    setShowViewModal(true);
  };
  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewModalOffer(null);
  };

  // Cancel Offer
  const handleCancelOffer = (offer: JobOffer) => {
    setCancelModalOffer(offer);
    setShowCancelModal(true);
  };
  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setCancelModalOffer(null);
  };
  const handleCancelConfirmed = () => {
    // Refresh list after cancellation
    handleCloseCancelModal();
    fetchOffers(currentPage, searchTerm);
  };

  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: "Company Job Offers",
            path: "/company-job-offers",
            isActive: true,
          },
        ]}
      >
        Company Job Offers
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
            {/* Search Form */}
            <form
              onSubmit={handleSearchSubmit}
              className="row mb-3"
              autoComplete="off"
            >
              <div className="col-md-4">
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-primary text-white">
                    <FiSearch />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by candidate or job..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit" variant="primary">
                    Search
                  </Button>
                </div>
              </div>
            </form>

            {/* Loading Spinner */}
            {isLoading && (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            )}

            {/* Error */}
            {!isLoading && error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}

            {/* No Offers */}
            {!isLoading && !error && offers.length === 0 && (
              <Alert variant="info" className="text-center">
                No job offers found.
              </Alert>
            )}

            {/* Table of Offers */}
            {!isLoading && !error && offers.length > 0 && (
              <div className="table-responsive">
                <Table striped hover className="align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Job Title</th>
                      <th>Candidate</th>
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
                        rowLoading={rowLoadingIndices.includes(idx)}
                        onViewOffer={handleViewOffer}
                        onCancelOffer={handleCancelOffer}
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
          {showCancelModal && cancelModalOffer && (
            <CancelOfferModal
              show={showCancelModal}
              offer={cancelModalOffer}
              onClose={handleCloseCancelModal}
              onCancelConfirmed={handleCancelConfirmed}
            />
          )}
        </AnimatePresence>
      </Content>
    </>
  );
};

export default CompanyJobOffersPage;
