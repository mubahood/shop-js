import React, { useState, useCallback, memo } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../../modules/auth";
import { http_post } from "../../../../services/Api";
import Utils from "../../../../services/Utils";
import { ProfileModel } from "../../../../models/ProfileModel";
import { SelectInput, TextInput } from "../../../../components/FormComponents";
import { FiEdit, FiTrash2, FiPlus, FiSave, FiArrowRight } from "react-icons/fi";
import { Button, Card, Container, Dropdown, Modal } from "react-bootstrap";
import { motion } from "framer-motion";

// Education levels
const educationLevels = [
  { value: "primary", label: "Primary School" },
  { value: "secondary", label: "Secondary School" },
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master", label: "Master's Degree" },
  { value: "doctorate", label: "Doctorate" },
  { value: "diploma", label: "Diploma" },
  { value: "certificate", label: "Certificate" },
];

// Yup validations
const academicValidation = Yup.object().shape({
  education_level: Yup.string().required("Education level is required"),
  major: Yup.string().required("Major/Concentration is required"),
  institution: Yup.string().required("Institution name is required"),
  duration: Yup.string().required("Duration is required"),
  graduation_year: Yup.string()
    .required("Graduation year is required")
    .matches(/^\d{4}$/, "Must be a valid year"),
  result: Yup.string().required("Result is required"),
});

const trainingValidation = Yup.object().shape({
  training_title: Yup.string().required("Training title is required"),
  provider: Yup.string().required("Provider is required"),
  year: Yup.string()
    .required("Year is required")
    .matches(/^\d{4}$/, "Must be valid year"),
  remarks: Yup.string().nullable(),
});

const certificateValidation = Yup.object().shape({
  certificate_title: Yup.string().required("Certificate title is required"),
  issuing_authority: Yup.string().required("Issuing authority is required"),
  date_issued: Yup.string().required("Date issued is required"),
  certificate_id: Yup.string().nullable(),
});

// Single item components
interface AcademicEntryProps {
  academic: {
    id: string;
    education_level: string;
    major: string;
    institution: string;
    duration: string;
    graduation_year: string;
    result: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const AcademicEntry: React.FC<AcademicEntryProps> = memo(
  ({ academic, onEdit, onDelete }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-3 hover-shadow">
        <Card.Header className="d-flex justify-content-between align-items-center bg-light">
          <div>
            <h5 className="mb-0 text-primary">
              {academic.education_level} - {academic.major}
            </h5>
            <small className="text-muted">{academic.institution}</small>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="link" className="no-arrow">
              <FiEdit className="text-muted" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item onClick={onEdit}>
                <FiEdit className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item onClick={onDelete} className="text-danger">
                <FiTrash2 className="me-2" /> Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body>
          <div className="row g-2">
            <div className="col-md-4">
              <label className="text-muted small">Duration</label>
              <p className="mb-0">{academic.duration}</p>
            </div>
            <div className="col-md-4">
              <label className="text-muted small">Graduation Year</label>
              <p className="mb-0">{academic.graduation_year}</p>
            </div>
            <div className="col-md-4">
              <label className="text-muted small">Result</label>
              <p className="mb-0">{academic.result}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )
);

interface TrainingEntryProps {
  training: {
    id: string;
    training_title: string;
    provider: string;
    year: string;
    remarks?: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const TrainingEntry: React.FC<TrainingEntryProps> = memo(
  ({ training, onEdit, onDelete }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-3 hover-shadow">
        <Card.Header className="d-flex justify-content-between align-items-center bg-light">
          <div>
            <h5 className="mb-0 text-primary">{training.training_title}</h5>
            <small className="text-muted">{training.provider}</small>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="link" className="no-arrow">
              <FiEdit className="text-muted" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item onClick={onEdit}>
                <FiEdit className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item onClick={onDelete} className="text-danger">
                <FiTrash2 className="me-2" /> Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body>
          <div className="row g-2">
            <div className="col-md-4">
              <label className="text-muted small">Year</label>
              <p className="mb-0">{training.year}</p>
            </div>
            <div className="col-md-8">
              <label className="text-muted small">Remarks</label>
              <p className="mb-0">{training.remarks || "N/A"}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )
);

interface CertificateEntryProps {
  certificate: {
    id: string;
    certificate_title: string;
    issuing_authority: string;
    date_issued: string;
    certificate_id?: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const CertificateEntry: React.FC<CertificateEntryProps> = memo(
  ({ certificate, onEdit, onDelete }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-3 hover-shadow">
        <Card.Header className="d-flex justify-content-between align-items-center bg-light">
          <div>
            <h5 className="mb-0 text-primary">
              {certificate.certificate_title}
            </h5>
            <small className="text-muted">
              {certificate.issuing_authority}
            </small>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="link" className="no-arrow">
              <FiEdit className="text-muted" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item onClick={onEdit}>
                <FiEdit className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item onClick={onDelete} className="text-danger">
                <FiTrash2 className="me-2" /> Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body>
          <div className="row g-2">
            <div className="col-md-6">
              <label className="text-muted small">Date Issued</label>
              <p className="mb-0">{certificate.date_issued}</p>
            </div>
            <div className="col-md-6">
              <label className="text-muted small">Certificate ID</label>
              <p className="mb-0">{certificate.certificate_id || "N/A"}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )
);

// Main component
const ProfileEditEducation: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showTrainingsModal, setShowTrainingsModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editTrainIndex, setEditTrainIndex] = useState<number | null>(null);
  const [editCertIndex, setEditCertIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!currentUser) {
    toast.error("User not found");
    return null;
  }

  const initialValues = {
    academics: currentUser?.degree_university_name
      ? JSON.parse(currentUser.degree_university_name)
      : [],
    trainings: currentUser?.high_school_name
      ? JSON.parse(currentUser.high_school_name)
      : [],
    certifications: currentUser?.seconday_school_name
      ? JSON.parse(currentUser.seconday_school_name)
      : [],
    submitAction: "",
  };

  const handleSubmit = useCallback(
    async (values: typeof initialValues) => {
      setIsSubmitting(true);
      try {
        const updatedUser = {
          ...currentUser,
          degree_university_name: JSON.stringify(values.academics),
          high_school_name: JSON.stringify(values.trainings),
          seconday_school_name: JSON.stringify(values.certifications),
        };
        const resp = await http_post("profile", updatedUser);
        const data = ProfileModel.fromJson(JSON.stringify(resp));
        Utils.saveProfile(data);
        toast.success("Profile updated successfully", {
          icon: <span>✅</span>,
        });
        if (values.submitAction === "saveAndNext") {
          setCurrentUser(data);
          navigate("/admin/profile-edit/employment");
        }
      } catch (error) {
        toast.error("Failed to save profile updates", {
          icon: <span>❌</span>,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [currentUser, setCurrentUser, navigate]
  );

  const confirmDelete = useCallback(
    (index: number, remove: (index: number) => void, label: string) => {
      toast(
        <div>
          <p>Delete this {label} entry?</p>
          <div className="d-flex gap-2 mt-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                remove(index);
                toast.dismiss();
              }}
            >
              Delete
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => toast.dismiss()}
            >
              Cancel
            </button>
          </div>
        </div>,
        { icon: <span>⚠️</span> }
      );
    },
    []
  );

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validationSchema={Yup.object({
        academics: Yup.array().of(academicValidation),
        trainings: Yup.array().of(trainingValidation),
        certifications: Yup.array().of(certificateValidation),
      })}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form>
          {/* Accordion */}
          <div className="accordion" id="eduAccordion">
            {/* Academics */}
            <motion.div
              className="accordion-item"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2
                className="accordion-header bg-light text-black fw-bold"
                id="academicsHeading"
              >
                <button
                  className="accordion-button bg-light text-black fw-bold text-gray-900"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#academicsCollapse"
                  aria-expanded="true"
                  aria-controls="academicsCollapse"
                >
                  <span className="fs-1 fw-bolder text-primary">
                    Academic Qualifications
                  </span>
                </button>
              </h2>
              <div
                id="academicsCollapse"
                className="accordion-collapse collapse show"
                aria-labelledby="academicsHeading"
                data-bs-parent="#eduAccordion"
              >
                <div className="accordion-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="fw-bold">List of Academic Entries</span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setEditIndex(null);
                        setShowModal(true);
                      }}
                    >
                      <FiPlus className="me-2" /> Add Entry
                    </Button>
                  </div>
                  <FieldArray name="academics">
                    {({ push, remove, replace }) => (
                      <>
                        {values.academics.map(
                          (
                            academic: AcademicEntryProps["academic"],
                            index: number
                          ) => (
                            <AcademicEntry
                              key={academic.id}
                              academic={academic}
                              onEdit={() => {
                                setEditIndex(index);
                                setShowModal(true);
                              }}
                              onDelete={() =>
                                confirmDelete(index, remove, "academic")
                              }
                            />
                          )
                        )}
                        <AcademicModal
                          show={showModal}
                          onHide={() => setShowModal(false)}
                          onSubmit={(vals) => {
                            if (editIndex !== null) replace(editIndex, vals);
                            else push(vals);
                            setShowModal(false);
                          }}
                          initialValues={
                            editIndex !== null
                              ? values.academics[editIndex]
                              : null
                          }
                        />
                      </>
                    )}
                  </FieldArray>
                </div>
              </div>
            </motion.div>

            {/* Trainings */}
            <motion.div
              className="accordion-item"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h2
                className="accordion-header bg-light text-black fw-bold"
                id="trainingHeading"
              >
                <button
                  className="accordion-button bg-light text-black fw-bold text-gray-900 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#trainingCollapse"
                  aria-expanded="false"
                  aria-controls="trainingCollapse"
                >
                  <span className="fs-1 fw-bolder text-primary">Trainings</span>
                </button>
              </h2>
              <div
                id="trainingCollapse"
                className="accordion-collapse collapse"
                aria-labelledby="trainingHeading"
                data-bs-parent="#eduAccordion"
              >
                <div className="accordion-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="fw-bold">List of Trainings</span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setEditTrainIndex(null);
                        setShowTrainingsModal(true);
                      }}
                    >
                      <FiPlus className="me-2" /> Add Training
                    </Button>
                  </div>
                  <FieldArray name="trainings">
                    {({ push, remove, replace }) => (
                      <>
                        {values.trainings.map(
                          (
                            training: TrainingEntryProps["training"],
                            index: number
                          ) => (
                            <TrainingEntry
                              key={training.id}
                              training={training}
                              onEdit={() => {
                                setEditTrainIndex(index);
                                setShowTrainingsModal(true);
                              }}
                              onDelete={() =>
                                confirmDelete(index, remove, "training")
                              }
                            />
                          )
                        )}
                        <TrainingsModal
                          show={showTrainingsModal}
                          onHide={() => setShowTrainingsModal(false)}
                          onSubmit={(vals) => {
                            if (editTrainIndex !== null)
                              replace(editTrainIndex, vals);
                            else push(vals);
                            setShowTrainingsModal(false);
                          }}
                          initialValues={
                            editTrainIndex !== null
                              ? values.trainings[editTrainIndex]
                              : null
                          }
                        />
                      </>
                    )}
                  </FieldArray>
                </div>
              </div>
            </motion.div>

            {/* Certificates */}
            <motion.div
              className="accordion-item"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h2
                className="accordion-header bg-light text-black fw-bold"
                id="certHeading"
              >
                <button
                  className="accordion-button bg-light text-black fw-bold text-gray-900 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#certCollapse"
                  aria-expanded="false"
                  aria-controls="certCollapse"
                >
                  <span className="fs-1 fw-bolder text-primary">
                    Professional Certificates
                  </span>
                </button>
              </h2>
              <div
                id="certCollapse"
                className="accordion-collapse collapse"
                aria-labelledby="certHeading"
                data-bs-parent="#eduAccordion"
              >
                <div className="accordion-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="fw-bold">List of Certificates</span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setEditCertIndex(null);
                        setShowCertModal(true);
                      }}
                    >
                      <FiPlus className="me-2" /> Add Certificate
                    </Button>
                  </div>
                  <FieldArray name="certifications">
                    {({ push, remove, replace }) => (
                      <>
                        {values.certifications.map(
                          (
                            certificate: CertificateEntryProps["certificate"],
                            index: number
                          ) => (
                            <CertificateEntry
                              key={certificate.id}
                              certificate={certificate}
                              onEdit={() => {
                                setEditCertIndex(index);
                                setShowCertModal(true);
                              }}
                              onDelete={() =>
                                confirmDelete(index, remove, "certificate")
                              }
                            />
                          )
                        )}
                        <CertificateModal
                          show={showCertModal}
                          onHide={() => setShowCertModal(false)}
                          onSubmit={(vals) => {
                            if (editCertIndex !== null)
                              replace(editCertIndex, vals);
                            else push(vals);
                            setShowCertModal(false);
                          }}
                          initialValues={
                            editCertIndex !== null
                              ? values.certifications[editCertIndex]
                              : null
                          }
                        />
                      </>
                    )}
                  </FieldArray>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="d-flex justify-content-between mt-5 border-top pt-4 mb-4 pe-5 ps-0">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => navigate("/admin/profile-edit/bio")}
            >
              ← Back
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
                Next Step
                <FiArrowRight className="ms-2" />
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

// Modals
interface AcademicModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (vals: any) => void;
  initialValues: any;
}

const AcademicModal: React.FC<AcademicModalProps> = memo(
  ({ show, onHide, onSubmit, initialValues }) => (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Formik
        initialValues={
          initialValues || {
            id: Math.random().toString(36).substr(2, 9),
            education_level: "",
            major: "",
            institution: "",
            duration: "",
            graduation_year: "",
            result: "",
          }
        }
        validationSchema={academicValidation}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        {({ handleSubmit, isValidating }) => (
          <>
            <Modal.Header closeButton className="bg-light">
              <Modal.Title>
                {initialValues ? "Edit Education" : "Add New Education"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-6">
                  <Field
                    name="education_level"
                    label="Education Level"
                    component={(props: any) => (
                      <SelectInput
                        {...props}
                        options={educationLevels}
                        placeholder="Select"
                      />
                    )}
                  />
                </div>
                <div className="col-md-6">
                  <Field
                    name="major"
                    label="Major/Concentration"
                    placeholder="e.g. Computer Science"
                    component={TextInput}
                  />
                </div>
                <div className="col-md-12">
                  <Field
                    name="institution"
                    label="Institution Name"
                    placeholder="University of Example"
                    component={TextInput}
                  />
                </div>
                <div className="col-md-4">
                  <Field
                    name="duration"
                    label="Duration"
                    placeholder="e.g. 4 years"
                    component={TextInput}
                  />
                </div>
                <div className="col-md-4">
                  <Field
                    name="graduation_year"
                    label="Graduation Year"
                    placeholder="2020"
                    component={TextInput}
                  />
                </div>
                <div className="col-md-4">
                  <Field
                    name="result"
                    label="Result"
                    placeholder="e.g. GPA 3.8"
                    component={TextInput}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handleSubmit()}
                disabled={isValidating}
              >
                {initialValues ? "Save Changes" : "Add Education"}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  )
);

interface TrainingsModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (vals: any) => void;
  initialValues: any;
}

const TrainingsModal: React.FC<TrainingsModalProps> = memo(
  ({ show, onHide, onSubmit, initialValues }) => (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Formik
        initialValues={
          initialValues || {
            id: Math.random().toString(36).substr(2, 9),
            training_title: "",
            provider: "",
            year: "",
            remarks: "",
          }
        }
        validationSchema={trainingValidation}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        {({ handleSubmit, isValidating }) => (
          <>
            <Modal.Header closeButton className="bg-light">
              <Modal.Title>
                {initialValues ? "Edit Training" : "Add New Training"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-6">
                  <Field
                    name="training_title"
                    label="Training Title"
                    placeholder="e.g. Project Management"
                    component={TextInput}
                  />
                </div>
                <div className="col-md-6">
                  <Field
                    name="provider"
                    label="Provider"
                    placeholder="e.g. ABC Institute"
                    component={TextInput}
                  />
                </div>
                <div className="col-md-6">
                  <Field
                    name="year"
                    label="Year"
                    placeholder="2021"
                    component={TextInput}
                  />
                </div>
                <div className="col-md-6">
                  <Field
                    name="remarks"
                    label="Remarks"
                    placeholder="Any relevant notes..."
                    component={TextInput}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handleSubmit()}
                disabled={isValidating}
              >
                {initialValues ? "Save Changes" : "Add Training"}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  )
);

interface CertificateModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (vals: any) => void;
  initialValues: any;
}

const CertificateModal: React.FC<CertificateModalProps> = memo(
  ({ show, onHide, onSubmit, initialValues }) => (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Formik
        initialValues={
          initialValues || {
            id: Math.random().toString(36).substr(2, 9),
            certificate_title: "",
            issuing_authority: "",
            date_issued: "",
            certificate_id: "",
          }
        }
        validationSchema={certificateValidation}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        {({ handleSubmit, isValidating }) => (
          <>
            <Modal.Header closeButton className="bg-light">
              <Modal.Title>
                {initialValues ? "Edit Certificate" : "Add New Certificate"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-6">
                  <Field
                    name="certificate_title"
                    label="Certificate Title"
                    placeholder="e.g. Certified Network Admin"
                    component={TextInput}
                  />
                </div>
                <div className="col-md-6">
                  <Field
                    name="issuing_authority"
                    label="Issuing Authority"
                    placeholder="e.g. Cisco"
                    component={TextInput}
                  />
                </div>
                <div className="col-md-6">
                  <Field
                    name="date_issued"
                    label="Date Issued"
                    placeholder="2022-05-10"
                    component={TextInput}
                  />
                </div>
                <div className="col-md-6">
                  <Field
                    name="certificate_id"
                    label="Certificate ID"
                    placeholder="Optional"
                    component={TextInput}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handleSubmit()}
                disabled={isValidating}
              >
                {initialValues ? "Save Changes" : "Add Certificate"}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  )
);

export default ProfileEditEducation;
