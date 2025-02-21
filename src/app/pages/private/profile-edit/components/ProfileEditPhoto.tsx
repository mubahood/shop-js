import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { useProfileEdit } from "../ProfileEditContext";
import { ProfileModel } from "../../../../models/ProfileModel";
import { useAuth } from "../../../../modules/auth";
import { http_post } from "../../../../services/Api";
import Utils from "../../../../services/Utils";
import { FiArrowRight, FiSave, FiX } from "react-icons/fi";

const ProfileEditPhoto: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const { setCurrentUser } = useAuth();
  const { currentUser } = useAuth();
  if (!currentUser) return null;

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().min(2).required("Last Name is required"),
    sex: Yup.string().required("Gender is required"),
    title: Yup.string().required("Title is required"),
  });

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setProfilePhoto(acceptedFiles[0]);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (values: typeof currentUser, actions: any) => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);
    const submitAction = values.submitAction || "save";
    try {
      if (!profilePhoto) {
        toast.warn("Select a profile photo first.");
        return;
      }
      const formData = new FormData();
      Object.entries(values).forEach(([key, val]) => {
        formData.append(key, val ? val.toString() : "");
      });
      if (profilePhoto) {
        formData.append("profile_photo", profilePhoto);
      }
      const resp = await http_post("profile", formData);
      const data = ProfileModel.fromJson(JSON.stringify(resp));
      setCurrentUser(data);
      Utils.saveProfile(data);
      setSuccessMessage("Profile updated successfully");
      toast.success("Profile updated successfully");
      if (submitAction === "saveAndNext") {
        navigate("/admin/profile-edit/bio");
      }
    } catch (error) {
      setErrorMessage("Failed: " + error);
      toast.error("Profile update failed");
    } finally {
      setIsLoading(false);
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={currentUser}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <motion.div
            className="card-header bg-light text-black fw-bold ps-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-primary fs-1 fw-bolder mt-7 ps-0">
              Personal Details
            </h2>
          </motion.div>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
              }}
            >
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </motion.div>
          )}

          {errorMessage && (
            <motion.div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {errorMessage}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              />
            </motion.div>
          )}
          {successMessage && (
            <motion.div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {successMessage}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </motion.div>
          )}

          {currentUser.avatar &&
            !currentUser.avatar.toLowerCase().includes("user") && (
              <motion.div
                className="d-flex justify-content-center mb-4 mt-5 mt-lg-10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <img
                  src={Utils.img(currentUser.avatar)}
                  alt="avatar"
                  style={{ width: 200, height: 200, borderRadius: "10%" }}
                />
              </motion.div>
            )}

          <motion.div
            className="d-flex justify-content-center mb-4 mt-5 mt-lg-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div
              {...getRootProps()}
              style={{
                width: 200,
                height: 200,
                border: "2px dashed #ccc",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              <input {...getInputProps()} />
              {profilePhoto ? (
                <img
                  src={URL.createObjectURL(profilePhoto)}
                  alt="profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <p className="text-muted mb-0">
                  <span className="ms-3 fs-6 fw-bold text-gray-700">
                    {currentUser.avatar &&
                    !currentUser.avatar.toLowerCase().includes("user")
                      ? "Set profile photo"
                      : "Change profile photo"}
                  </span>
                </p>
              )}
            </div>
          </motion.div>

          <motion.div
            className="d-flex justify-content-between mt-5 border-top pt-4 mb-5 mb-lg-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => navigate("/admin/profile-edit/education")}
            >
              <FiX className="me-2 text-danger" />
              Cancel
            </button>
            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => setFieldValue("submitAction", "save")}
                disabled={isSubmitting}
              >
                <FiSave className="me-2" />
                {isSubmitting ? "Saving..." : "Save"}
              </button>
              <button
                type="submit"
                className="btn btn-success"
                onClick={() => setFieldValue("submitAction", "saveAndNext")}
                disabled={isSubmitting}
              >
                Next Step <FiArrowRight className="ms-2" />
              </button>
            </div>
          </motion.div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileEditPhoto;
