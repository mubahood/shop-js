import React, { useEffect, useState } from "react";
import Utils from "../../services/Utils";
import { Content } from "../../../_metronic/layout/components/content";
import { http_get } from "../../services/Api";
import { toast } from "react-toastify";
import { ProfileModel } from "../../models/ProfileModel";
import { BASE_URL } from "../../../Constants";
import { pageSkeleton } from "../public/JobDetailPage";

export default function MyCVPage() {
  // Use a utility-provided file if available, otherwise fallback to the user's PDF URL.

  const [loading, setLoading] = useState<boolean>(true);
  const [pdfSource, setPdfSource] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);

    var response = null;
    try {
      response = await http_get(`users/me`);
      if (response.code !== 1) {
        toast.error(
          response.message || "Failed to fetch cv because : " + response.message
        );
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch cv because : " + error);
      console.error("Error fetching job by ID:", error);
      throw error;
    }
    setLoading(false);
    var profile = ProfileModel.fromJson(JSON.stringify(response.data));
    if (profile.id == "") {
      toast.error("Failed to fetch cv because : " + response.message);
      return;
    }
    //school_pay_account_id
    setPdfSource(BASE_URL + "/storage/" + profile.school_pay_account_id);
  };

  useEffect(() => {
    document.title = "My CV";
    fetchData();
  }, []);

  if (loading) {
    return pageSkeleton();
  }

  return (
    <Content>
      <main className="">
        <section className="pdf-viewer-container">
          <iframe
            title="My CV PDF Viewer"
            src={pdfSource}
            className="pdf-iframe"
            allowFullScreen
            aria-label="PDF viewer"
          />
        </section>

        <style>{`
        .pdf-page-container {
          max-width: 900px;
          margin: 20px auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        header h2 {
          text-align: center;
          margin-bottom: 1rem;
          color: #333;
        }
        .pdf-viewer-container {
          border: 1px solid #ddd;
          border-radius: 5px;
          overflow: hidden;
          background-color: #fff;
          height: 95vh;
        }
        .pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }
        .pdf-footer {
          text-align: center;
          margin-top: 15px;
        }
        .pdf-footer a {
          color: #0078d7;
          text-decoration: none;
          font-weight: bold;
        }
        .pdf-footer a:hover {
          text-decoration: underline;
        }
        @media print {
          .pdf-page-container {
            margin: 0;
            padding: 0;
            box-shadow: none;
          }
        }
      `}</style>
      </main>
    </Content>
  );
}
