import React, { useState, useCallback, memo } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../../modules/auth";
import { http_post } from "../../../../services/Api";
import Utils from "../../../../services/Utils";
import { ProfileModel } from "../../../../models/ProfileModel";
import {
  SelectInput,
  TextInput,
  DateInput,
} from "../../../../components/FormComponents";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiSave,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import {
  Button,
  Card,
  Container,
  Dropdown,
  Modal,
  Accordion,
} from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
};

interface Accomplishment {
  id: string;
  type: string;
  title: string;
  description: string;
  url: string;
  issueDate: string;
}

const accomplishmentTypes = [
  { value: "publication", label: "Publication" },
  { value: "award", label: "Award" },
  { value: "project", label: "Project" },
  { value: "other", label: "Other" },
];

const accomplishmentValidation = Yup.object().shape({
  type: Yup.string().required("Accomplishment type is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  url: Yup.string().url("Must be a valid URL").nullable(),
  issueDate: Yup.string().required("Issue date is required"),
});

const AccomplishmentEntry = memo(
  ({
    accomplishment,
    index,
    onEdit,
    onDelete,
  }: {
    accomplishment: Accomplishment;
    index: number;
    onEdit: () => void;
    onDelete: () => void;
  }) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <Card className="mb-3 hover-shadow transition-all">
        <Card.Header className="d-flex justify-content-between align-items-center bg-light">
          <div>
            <h5 className="mb-0 text-primary">{accomplishment.title}</h5>
            <small className="text-muted text-capitalize">
              {accomplishment.type}
            </small>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="link" className="no-arrow p-0">
              <motion.div whileHover={{ scale: 1.1 }}>
                <FiEdit className="text-muted fs-5" />
              </motion.div>
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
          <motion.div layout className="row g-2">
            <div className="col-md-4">
              <label className="text-muted small">Issue Date</label>
              <p className="mb-0">{accomplishment.issueDate}</p>
            </div>
            <div className="col-md-8">
              <label className="text-muted small">URL</label>
              <p className="mb-0">
                {accomplishment.url ? (
                  <a
                    href={accomplishment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {accomplishment.url}
                  </a>
                ) : (
                  "N/A"
                )}
              </p>
            </div>
          </motion.div>
          <motion.div layout className="mt-3">
            <label className="text-muted small">Description</label>
            <p className="mb-0">{accomplishment.description}</p>
          </motion.div>
        </Card.Body>
      </Card>
    </motion.div>
  )
);

const ProfileEditAccomplishment = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!currentUser) {
    toast.error("User not found");
    return null;
  }

  const initialValues = {
    accomplishments: currentUser?.school_pay_payment_code
      ? JSON.parse(currentUser.school_pay_payment_code)
      : [],
    submitAction: "",
  };

  const handleSubmit = useCallback(
    async (values: typeof initialValues) => {
      setIsSubmitting(true);
      try {
        const updatedUser = {
          ...currentUser,
          school_pay_payment_code: JSON.stringify(values.accomplishments),
        };
        const resp = await http_post("profile", {
          school_pay_payment_code: JSON.stringify(values.accomplishments),
        });

        const data = ProfileModel.fromJson(JSON.stringify(resp));
        Utils.saveProfile(data);

        toast.success("Accomplishments updated successfully", {
          icon: <span>✅</span>,
        });

        if (values.submitAction === "saveAndNext") {
          navigate("/admin/profile-edit/some-other-page");
        }
      } catch (error) {
        toast.error("Failed to save accomplishments", {
          icon: <span>❌</span>,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [currentUser, setCurrentUser, navigate]
  );

  const confirmDelete = useCallback(
    (index: number, remove: (i: number) => void) => {
      toast(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="d-flex flex-column p-3"
        >
          <h6 className="mb-3">Delete this accomplishment?</h6>
          <div className="d-flex gap-2">
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                remove(index);
                toast.dismiss();
              }}
            >
              Delete
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => toast.dismiss()}
            >
              Cancel
            </Button>
          </div>
        </motion.div>,
        { icon: <span>⚠️</span> }
      );
    },
    []
  );

  return (
    <Container fluid="lg" className="py-4">
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          accomplishments: Yup.array().of(accomplishmentValidation),
        })}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Accordion
              defaultActiveKey="0"
              className="shadow-sm rounded-3 overflow-hidden"
            >
              <Accordion.Item eventKey="0">
                <h2 className="accordion-header bg-light text-black fw-bold">
                  <Accordion.Button className="bg-light text-black fw-bold text-gray-900">
                    <span className="fs-1 fw-bolder text-primary">
                      Accomplishments & Achievements
                    </span>
                  </Accordion.Button>
                </h2>
                <Accordion.Collapse eventKey="0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4"
                  >
                    <div className="d-flex justify-content-end mb-4">
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setEditIndex(null);
                            setShowModal(true);
                          }}
                        >
                          <FiPlus className="me-2" /> Add Accomplishment
                        </Button>
                      </motion.div>
                    </div>

                    <FieldArray name="accomplishments">
                      {({ push, remove, replace }) => (
                        <AnimatePresence mode="popLayout">
                          {values.accomplishments.map(
                            (acc: Accomplishment, index: number) => (
                              <AccomplishmentEntry
                                key={acc.id}
                                accomplishment={acc}
                                index={index}
                                onEdit={() => {
                                  setEditIndex(index);
                                  setShowModal(true);
                                }}
                                onDelete={() => confirmDelete(index, remove)}
                              />
                            )
                          )}
                        </AnimatePresence>
                      )}
                    </FieldArray>
                  </motion.div>
                </Accordion.Collapse>
              </Accordion.Item>
            </Accordion>

            <AccomplishmentModal
              show={showModal}
              onHide={() => setShowModal(false)}
              onSubmit={(vals) => {
                if (editIndex !== null) {
                  setFieldValue(`accomplishments[${editIndex}]`, vals);
                } else {
                  setFieldValue("accomplishments", [
                    ...values.accomplishments,
                    vals,
                  ]);
                }
                setShowModal(false);
              }}
              initialValues={
                editIndex !== null ? values.accomplishments[editIndex] : null
              }
            />

            <motion.div
              className="d-flex justify-content-between mt-5 border-top pt-4"
              layout
            >
              <motion.div whileHover={{ x: -5 }}>
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/admin/profile-edit/employment")}
                >
                  ← Back
                </Button>
              </motion.div>
              <div className="d-flex gap-2">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={() => setFieldValue("submitAction", "save")}
                    disabled={isSubmitting}
                  >
                    <FiSave className="me-2" />
                    {isSubmitting ? (
                      <span className="spinner-border spinner-border-sm" />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    type="submit"
                    variant="success"
                    onClick={() => navigate("/admin/my-cv")}
                    disabled={isSubmitting}
                  >
                    Finish
                    <FiCheck className="ms-2" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

const AccomplishmentModal = memo(
  ({
    show,
    onHide,
    onSubmit,
    initialValues,
  }: {
    show: boolean;
    onHide: () => void;
    onSubmit: (values: Accomplishment) => void;
    initialValues: Accomplishment | null;
  }) => (
    <Modal show={show} onHide={onHide} centered size="lg">
      <motion.div variants={modalVariants} initial="hidden" animate="visible">
        <Formik
          initialValues={
            initialValues || {
              id: Math.random().toString(36).substr(2, 9),
              type: "",
              title: "",
              description: "",
              url: "",
              issueDate: "",
            }
          }
          validationSchema={accomplishmentValidation}
          onSubmit={onSubmit}
          validateOnChange={false}
        >
          {({ handleSubmit, isValidating }) => (
            <>
              <Modal.Header closeButton className="bg-light">
                <Modal.Title className="text-primary">
                  {initialValues
                    ? "Edit Accomplishment"
                    : "Add New Accomplishment"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row g-3">
                  <div className="col-md-6">
                    <Field
                      name="type"
                      label="Type"
                      component={(props: any) => (
                        <SelectInput
                          {...props}
                          options={accomplishmentTypes}
                          placeholder="Select type"
                        />
                      )}
                    />
                  </div>
                  <div className="col-md-6">
                    <Field
                      name="title"
                      label="Title"
                      placeholder="Best Research Paper 2023"
                      component={TextInput}
                    />
                  </div>
                  <div className="col-12">
                    <Field
                      name="description"
                      label="Description"
                      placeholder="Describe your accomplishment..."
                      component={TextInput}
                      as="textarea"
                      rows={4}
                    />
                  </div>
                  <div className="col-md-6">
                    <Field
                      name="url"
                      label="URL"
                      placeholder="https://example.com"
                      component={TextInput}
                    />
                  </div>
                  <div className="col-md-6">
                    <Field
                      name="issueDate"
                      label="Issue Date"
                      component={DateInput}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="border-0">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button variant="outline-secondary" onClick={onHide}>
                    Cancel
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    variant="primary"
                    onClick={() => handleSubmit()}
                    disabled={isValidating}
                  >
                    {initialValues ? "Save Changes" : "Add Accomplishment"}
                  </Button>
                </motion.div>
              </Modal.Footer>
            </>
          )}
        </Formik>
      </motion.div>
    </Modal>
  )
);

export default ProfileEditAccomplishment;
