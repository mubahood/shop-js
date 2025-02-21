// src/app/pages/CompanyProfileViewsPage.tsx
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Table, Alert, Spinner, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle } from "../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { ViewRecord, PaginatedResponse } from "../../models/ViewRecord ";
import { http_get } from "../../services/Api";

const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 10 },
};

const CompanyProfileViewsPage: React.FC = () => {
  const [views, setViews] = useState<ViewRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);

  // Fetch view records for authenticated company with type "COMPANY"
  const fetchViews = useCallback(async (page: number) => {
    setIsLoading(true);
    setError("");
    try {
      const params = { type: "COMPANY" };
      const queryParams = new URLSearchParams({
        page: String(page),
        ...Object.fromEntries(
          Object.entries(params).map(([key, val]) => [key, String(val)])
        ),
      });
      // Using endpoint for company view records (adjust URL as needed)
      const response = await http_get(
        `/company-view-records?${queryParams.toString()}`
      );
      if (response.code !== 1) {
        throw new Error(
          response.message || "Failed to fetch company profile views."
        );
      }
      const paginated: PaginatedResponse<ViewRecord> = response.data;
      paginated.data = paginated.data.map((item: any) =>
        ViewRecord.fromJson(item)
      );
      setViews(paginated.data);
      setCurrentPage(paginated.current_page);
      setLastPage(paginated.last_page);
    } catch (err: any) {
      console.error("Error fetching view records:", err);
      setError(err.message || "Failed to load view records.");
      toast.error(err.message || "Failed to load view records.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchViews(currentPage);
  }, [fetchViews, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
     <PageTitle
          breadcrumbs={[
            {
              title: "Company Profile Views",
              path: "/company-profile-views",
              isActive: true,
            },
          ]}
        >
          Company Profile Views
        </PageTitle>
      <Content>
       
        <ToolbarWrapper />
        <motion.div
          className="card container-fluid py-4 card shadow-sm my-4"
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
           
          <div className="card-body">
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
            {!isLoading && !error && views.length === 0 && (
              <Alert variant="info" className="text-center">
                No profile views recorded yet.
              </Alert>
            )}
            {!isLoading && !error && views.length > 0 && (
              <div className="table-responsive">
                <Table striped hover className="align-middle">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: "50px" }}>#</th>
                      <th>Viewer</th>
                      <th>Viewed On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {views.map((view, idx) => (
                      <tr key={view.id}>
                        <td>{(currentPage - 1) * 10 + (idx + 1)}</td>
                        <td>{view.viewer_text || view.viewer_id || "N/A"}</td>
                        <td>
                          {view.created_at
                            ? view.created_at.split("T")[0]
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
            {!isLoading && !error && lastPage > 1 && (
              <Pagination className="mt-4 justify-content-center">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
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
                  disabled={currentPage === lastPage}
                >
                  Next
                </Pagination.Next>
              </Pagination>
            )}
          </div>
        </motion.div>
        <style>{`
        .card {
          border-radius: 8px;
        }
        .card-header {
          font-family: Arial, sans-serif;
        }
        @media print {
          .card {
            box-shadow: none;
            border: none;
          }
        }
      `}</style>
      </Content>
    </>
  );
};

export default CompanyProfileViewsPage;
