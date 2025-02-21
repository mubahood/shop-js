// src/app/pages/CompanyFollowersPage.tsx
import React, { useEffect, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  Alert,
  Button,
  Form,
  Pagination,
  Spinner,
  Table,
} from "react-bootstrap";
import { FiSearch } from "react-icons/fi";

import { CompanyFollow, PaginatedResponse } from "../../models/CompanyFollow";
import { PageTitle } from "../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";

// Simple fade animation variant for Framer Motion
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
 * A memoized row component to display each follower.
 * No actions except viewing the follower's CV by clicking their name.
 */
const CompanyFollowerRow = memo(
  ({
    follow,
    idx,
    currentPage,
    rowLoading,
  }: {
    follow: CompanyFollow;
    idx: number;
    currentPage: number;
    rowLoading: boolean;
  }) => {
    const rowNumber = (currentPage - 1) * 10 + (idx + 1);

    // Link to open the user's CV in a new tab:
    // e.g. `/cv-bank/<user_id>` or some route that displays that user's CV
    const cvLink = `/cv-bank/${follow.user_id}`;

    return (
      <tr>
        <td style={{ width: "50px" }}>
          {rowLoading ? <Spinner size="sm" animation="border" /> : rowNumber}
        </td>
        <td>
          {rowLoading ? (
            <span>Loading...</span>
          ) : (
            <a href={cvLink} target="_blank" rel="noreferrer">
              {follow.user_text || follow.user_id}
            </a>
          )}
        </td>
        <td>
          {rowLoading ? (
            <span>Loading...</span>
          ) : (
            follow.created_at?.split("T")[0] || "N/A"
          )}
        </td>
      </tr>
    );
  }
);
CompanyFollowerRow.displayName = "CompanyFollowerRow";

/**
 * Main page component that displays the company's followers in a table.
 */
const CompanyFollowersPage: React.FC = () => {
  // -------------- State --------------
  const [followers, setFollowers] = useState<CompanyFollow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Optional search bar state
  const [searchTerm, setSearchTerm] = useState("");

  // For row-level placeholders if desired
  const [rowLoadingIndices] = useState<number[]>([]);

  // -------------- Data Fetch --------------
  const fetchFollowers = useCallback(async (page: number, search: string) => {
    setIsLoading(true);
    setError("");
    try {
      // We can pass the search term as a param if your backend supports it
      const params = {} as Record<string, string | number>;
      if (search) {
        params.search = search;
      }

      const resp: PaginatedResponse<CompanyFollow> =
        await CompanyFollow.fetchCompanyFollowers(page, params);

      setFollowers(resp.data);
      setCurrentPage(resp.current_page);
      setLastPage(resp.last_page);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load company followers.");
      toast.error("Error loading data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFollowers(currentPage, searchTerm);
  }, [fetchFollowers, currentPage, searchTerm]);

  // -------------- Search --------------
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchFollowers(1, searchTerm);
  };

  // -------------- Pagination --------------
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setCurrentPage(newPage);
    }
  };

  // -------------- Render --------------
  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: "Company Followers",
            path: "/company-followers",
            isActive: true,
          },
        ]}
      >
        Company Followers
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
            {/* Search bar */}
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
                    placeholder="Search by user's name..."
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

            {/* No Followers */}
            {!isLoading && !error && followers.length === 0 && (
              <Alert variant="info" className="text-center">
                No followers found.
              </Alert>
            )}

            {/* Table of Followers */}
            {!isLoading && !error && followers.length > 0 && (
              <div className="table-responsive">
                <Table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: "50px" }}>#</th>
                      <th>Follower Name</th>
                      <th>Followed On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {followers.map((follow, idx) => (
                      <CompanyFollowerRow
                        key={follow.id}
                        follow={follow}
                        idx={idx}
                        currentPage={currentPage}
                        rowLoading={rowLoadingIndices.includes(idx)}
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
      </Content>
    </>
  );
};

export default CompanyFollowersPage;
