import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { http_get, http_post } from "../../services/Api";
import Utils from "../../services/Utils";
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle } from "../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { ProfileModel } from "../../models/ProfileModel";
import { BASE_URL } from "../../../Constants";
import { pageSkeleton } from "./JobDetailPage";

export default function CvPDFPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [pdfSource, setPdfSource] = useState<string>("");
  const [profile, setProfile] = useState<ProfileModel>(new ProfileModel());

  // Fetch CV and then auto-submit a view record
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await http_get(`cvs/${id}`);
      if (response.code !== 1) {
        toast.error(response.message || "Failed to fetch CV");
        setLoading(false);
        return;
      }
      const fetchedProfile = ProfileModel.fromJson(JSON.stringify(response.data));
      if (!fetchedProfile.id) {
        toast.error("Failed to fetch CV");
        setLoading(false);
        return;
      }
      setProfile(fetchedProfile);
      setPdfSource(BASE_URL + "/storage/" + fetchedProfile.school_pay_account_id);

      // Automatically record the view of the CV
      await submitViewRecord();
    } catch (error: any) {
      console.error("Error fetching CV:", error);
      toast.error("Failed to fetch CV: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Automatically submit a view record of type "CV"
  const submitViewRecord = async () => {
    try {
      const payload = { type: "CV", item_id: id };
      const response = await http_post("/view-record-create", payload);
      if (response.code === 1) {
        toast.success("View recorded successfully.");
      } else { 
      }
    } catch (error: any) {
/*       console.error("Error recording view:", error);
      toast.error("Failed to record view: " + error.message); */
    }
  };

  useEffect(() => {
    document.title = "My CV";
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return pageSkeleton();
  }

  return (
    <Content>
      <ol className="breadcrumb breadcrumb-item text-muted fs-6 fw-bold mb-5 mx-3">
          <li className="breadcrumb-item pe-3">
            <Link to="/" className="active text-decoration-none">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item pe-3 ">
            <Link to="/cv-bank" className="active text-decoration-none">
              CVs
            </Link>
          </li>
          <li className="breadcrumb-item px-3 text-muted ">{profile.name}</li>
        </ol>
      <div className="  shadow-sm my-4">
      
        <ToolbarWrapper />
        <div className="card-body">
          <section className="pdf-viewer-container mb-4">
            <iframe
              title="My CV PDF Viewer"
              src={pdfSource}
              className="pdf-iframe"
              allowFullScreen
              aria-label="PDF viewer"
            />
          </section>
          <div className="pdf-footer text-center">
            <Link to="/cv-bank" className="btn btn-outline-primary">
              Back to CV Bank
            </Link>
          </div>
        </div>
      </div>
      <style>{`
        .cv-page-container {
          max-width: 900px;
          margin: auto;
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
        }
        .pdf-viewer-container {
          border: 1px solid #ddd;
          border-radius: 5px;
          overflow: hidden;
          background-color: #fdfdfd;
          height: 95vh;
        }
        .pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        .pdf-footer {
          padding: 1rem;
        }
        @media print {
          .cv-page-container {
            margin: 0;
            box-shadow: none;
          }
        }
      `}</style>
    </Content>
  );
}
