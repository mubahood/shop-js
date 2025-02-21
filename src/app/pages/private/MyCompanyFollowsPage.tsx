// src/app/pages/MyCompanyFollowsPage.tsx
import React, { useEffect, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  Alert,
  Button,
  Form,
  Modal,
  Pagination,
  Spinner,
  Table,
} from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { CompanyFollow, PaginatedResponse } from "../../models/CompanyFollow";
import { PageTitle } from "../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import { http_post } from "../../services/Api";

/** Framer Motion fade variant */
const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, y: 10 },
};

/** Single row in the table (memoized for performance) */
const CompanyFollowRow = memo(
  ({
    follow,
    idx,
    currentPage,
    rowLoading,
    onUnfollowClick,
  }: {
    follow: CompanyFollow;
    idx: number;
    currentPage: number;
    rowLoading: boolean;
    onUnfollowClick: (follow: CompanyFollow) => void;
  }) => {
    const rowNumber = (currentPage - 1) * 10 + (idx + 1);

    return (
      <tr>
        <td>{rowLoading ? <Skeleton /> : rowNumber}</td>
        <td>
          {rowLoading ? (
            <Skeleton width={120} />
          ) : (
            <strong>{follow.company_text || follow.company_id}</strong>
          )}
        </td>
        <td>
          {rowLoading ? (
            <Skeleton width={100} />
          ) : (
            follow.created_at?.split("T")[0]
          )}
        </td>
        <td>
          {rowLoading ? (
            <Skeleton width={60} />
          ) : (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onUnfollowClick(follow)}
            >
              Unfollow
            </Button>
          )}
        </td>
      </tr>
    );
  }
);
CompanyFollowRow.displayName = "CompanyFollowRow";

/** Modal to confirm the 'unfollow' action */
const UnfollowConfirmModal: React.FC<{
  show: boolean;
  follow: CompanyFollow | null;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ show, follow, loading, onClose, onConfirm }) => {
  if (!follow) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header className="bg-danger text-white" closeButton>
        <Modal.Title>Unfollow Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to unfollow{" "}
          <strong>{follow.company_text || "this company"}</strong>?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" />
              Removing...
            </>
          ) : (
            "Unfollow"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/** Main Page Component */
const MyCompanyFollowsPage: React.FC = () => {
  const [follows, setFollows] = useState<CompanyFollow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Optional: search filter (like we do in MyJobOffersPage)
  const [searchTerm, setSearchTerm] = useState("");

  // For confirm unfollow modal
  const [showModal, setShowModal] = useState(false);
  const [selectedFollow, setSelectedFollow] = useState<CompanyFollow | null>(
    null
  );
  const [unfollowLoading, setUnfollowLoading] = useState(false);

  // For row-level placeholders if desired
  const [rowLoadingIndices] = useState<number[]>([]);

  // -------------------------------------------
  // Fetch My Company Follows
  // -------------------------------------------
  const fetchFollows = useCallback(async (page: number, search: string) => {
    setIsLoading(true);
    setError("");
    try {
      const params = {} as Record<string, string | number>;
      // Optional search param
      if (search) params.search = search;

      const resp: PaginatedResponse<CompanyFollow> =
        await CompanyFollow.fetchMyCompanyFollows(page, params);

      setFollows(resp.data);
      setCurrentPage(resp.current_page);
      setLastPage(resp.last_page);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load followed companies.");
      toast.error("Error loading data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFollows(currentPage, searchTerm);
  }, [fetchFollows, currentPage, searchTerm]);

  // -------------------------------------------
  // Pagination
  // -------------------------------------------
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setCurrentPage(newPage);
    }
  };

  // -------------------------------------------
  // Unfollow
  // -------------------------------------------
  const handleUnfollowClick = (follow: CompanyFollow) => {
    setSelectedFollow(follow);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFollow(null);
  };

  const handleConfirmUnfollow = async () => {
    if (!selectedFollow) return;
    setUnfollowLoading(true);
    try {
      await http_post("/company-unfollow", {
        company_id: selectedFollow.company_id,
      });
      toast.success("Successfully unfollowed the company.");
      // Refresh the list
      fetchFollows(currentPage, searchTerm);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to unfollow.");
    } finally {
      setUnfollowLoading(false);
      handleCloseModal();
    }
  };

  // -------------------------------------------
  // Searching
  // -------------------------------------------
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset to page 1 for new search
    setCurrentPage(1);
    fetchFollows(1, searchTerm);
  };

  // -------------------------------------------
  // Render
  // -------------------------------------------
  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: "My Followed Companies",
            path: "/my-company-follows",
            isActive: true,
          },
        ]}
      >
        My Followed Companies
      </PageTitle>
      <Content>
        <ToolbarWrapper />
        <motion.div
          className="container-fluid py-4 card shadow-sm"
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="card-body">
            {/* Optional: Search Bar */}
            <Form
              onSubmit={handleSearchSubmit}
              className="row mb-3"
              autoComplete="off"
            >
              <div className="col-md-4">
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-primary text-white">
                    <FiSearch />
                  </span>
                  <Form.Control
                    type="text"
                    placeholder="Search by company name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit" variant="primary">
                    Search
                  </Button>
                </div>
              </div>
            </Form>

            {/* Loading */}
            {isLoading && (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            )}

            {/* Error */}
            {!isLoading && error && <Alert variant="danger">{error}</Alert>}

            {/* No Follows */}
            {!isLoading && !error && follows.length === 0 && (
              <Alert variant="info" className="text-center">
                You have not followed any companies yet.
              </Alert>
            )}

            {/* Table of Follows */}
            {!isLoading && !error && follows.length > 0 && (
              <div className="table-responsive">
                <Table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: "50px" }}>#</th>
                      <th>Company</th>
                      <th>Followed On</th>
                      <th style={{ width: "100px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {follows.map((follow, idx) => (
                      <CompanyFollowRow
                        key={follow.id}
                        follow={follow}
                        idx={idx}
                        currentPage={currentPage}
                        rowLoading={rowLoadingIndices.includes(idx)} // If row-level loading is used
                        onUnfollowClick={handleUnfollowClick}
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

        {/* Unfollow Confirmation Modal */}
        <AnimatePresence>
          {showModal && selectedFollow && (
            <UnfollowConfirmModal
              show={showModal}
              follow={selectedFollow}
              loading={unfollowLoading}
              onClose={handleCloseModal}
              onConfirm={handleConfirmUnfollow}
            />
          )}
        </AnimatePresence>
      </Content>
    </>
  );
};

export default MyCompanyFollowsPage;
