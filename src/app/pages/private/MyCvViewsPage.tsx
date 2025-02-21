// src/app/pages/candidate/MyCvViewsPage.tsx
import React, { useEffect, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, Spinner, Table, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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

interface MyCvViewsPageProps {}

/** Row component for displaying a single view record */
const ViewRecordRow = memo(
  ({
    record,
    idx,
    currentPage,
    rowLoading,
  }: {
    record: ViewRecord;
    idx: number;
    currentPage: number;
    rowLoading: boolean;
  }) => {
    const rowNumber = (currentPage - 1) * 10 + (idx + 1);
    return (
      <tr>
        <td>{rowLoading ? <Skeleton /> : rowNumber}</td>
        <td>
          {rowLoading ? (
            <Skeleton width={120} />
          ) : (
            record.viewer_text || record.viewer_id || "N/A"
          )}
        </td>
        <td>
          {rowLoading ? (
            <Skeleton width={100} />
          ) : record.created_at ? (
            record.created_at.split("T")[0]
          ) : (
            "N/A"
          )}
        </td>
      </tr>
    );
  }
);
ViewRecordRow.displayName = "ViewRecordRow";

const MyCvViewsPage: React.FC<MyCvViewsPageProps> = () => {
  const [records, setRecords] = useState<ViewRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);

  // Fetch CV view records filtered by type "CV"
  const fetchRecords = useCallback(async (page: number) => {
    setIsLoading(true);
    setError("");
    try {
      const params = { type: "CV" };
      const queryParams = new URLSearchParams({
        page: String(page),
        ...Object.fromEntries(
          Object.entries(params).map(([k, v]) => [k, String(v)])
        ),
      });
      const response = await http_get(
        `/view-records?${queryParams.toString()}`
      );
      if (response.code !== 1) {
        throw new Error(response.message || "Failed to fetch view records.");
      }
      const paginated: PaginatedResponse<ViewRecord> = response.data;
      paginated.data = paginated.data.map((item: any) =>
        ViewRecord.fromJson(item)
      );
      setRecords(paginated.data);
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
    fetchRecords(currentPage);
  }, [fetchRecords, currentPage]);

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
            title: "My CV Views",
            path: "/my-cv-views",
            isActive: true,
          },
        ]}
      >
        My CV Views
      </PageTitle>
      <Content>
        <ToolbarWrapper />
        <motion.div
          className="container-fluid card py-4 card shadow-sm"
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
            {!isLoading && !error && records.length === 0 && (
              <Alert variant="info" className="text-center">
                No CV views recorded yet.
              </Alert>
            )}
            {!isLoading && !error && records.length > 0 && (
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
                    {records.map((record, idx) => (
                      <ViewRecordRow
                        key={record.id}
                        record={record}
                        idx={idx}
                        currentPage={currentPage}
                        rowLoading={false}
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

export default MyCvViewsPage;
