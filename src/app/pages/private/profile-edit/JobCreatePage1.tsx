import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FiSave } from "react-icons/fi";
import { useAuth } from "../../../modules/auth";
import { http_post } from "../../../services/Api";
import { JobModel } from "../../../models/JobModel";
import {
  TextInput,
  SelectInput,
  TextArea,
  RadioButton,
} from "../../../components/FormComponents";
import { COUNTRIES } from "../../../../Constants";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import Utils from "../../../services/Utils";
// import { Editor } from "@tinymce/tinymce-react";
import { PageTitle } from "../../../../_metronic/layout/core";

const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 10 },
};

const employmentStatuses = [
  { value: "Full Time", label: "Full Time" },
  { value: "Part Time", label: "Part Time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
];

const workplaces = [
  { value: "Onsite", label: "Onsite" },
  { value: "Remote", label: "Remote" },
  { value: "Hybrid", label: "Hybrid" },
];

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Job title is required"),
  category_id: Yup.string().required("Category is required"),
  district_id: Yup.string().required("District is required"),
  sub_county_id: Yup.string().required("Sub-County is required"),
  address: Yup.string().required("Address is required"),
  vacancies_count: Yup.number()
    .required("Vacancies count is required")
    .min(1, "At least one vacancy is required"),
  employment_status: Yup.string().required("Employment status is required"),
  workplace: Yup.string().required("Workplace is required"),
  responsibilities: Yup.string()
    .required("Responsibilities are required")
    .min(100, "Responsibilities must be at least 100 characters"),
  experience_field: Yup.string().required("Experience field is required"),
  experience_period: Yup.string().required("Experience period is required"),
  show_salary: Yup.string().required("Show salary is required"),
  minimum_salary: Yup.number()
    .required("Minimum salary is required")
    .min(0, "Minimum salary cannot be negative"),
  maximum_salary: Yup.number()
    .required("Maximum salary is required")
    .min(0, "Maximum salary cannot be negative"),
  benefits: Yup.string().required("Benefits are required"),
  gender: Yup.string().required("Gender is required"),
  min_age: Yup.number()
    .required("Minimum age is required")
    .min(18, "Minimum age must be at least 18"),
  max_age: Yup.number()
    .required("Maximum age is required")
    .min(18, "Maximum age must be at least 18"),
  required_video_cv: Yup.string().required("Required video CV is required"),
  minimum_academic_qualification: Yup.string().required(
    "Minimum academic qualification is required"
  ),
  application_method: Yup.string().required("Application method is required"),
  application_method_details: Yup.string().required(
    "Application method details are required"
  ),
});

const JobCreatePage1: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!currentUser) {
      toast.error("Please login to create a job");
      navigate("/login");
    } else {
      setIsLoading(false);
    }
  }, [currentUser, navigate]);

  const initialValues = new JobModel();

  const handleSubmit = async (values: JobModel, actions: any) => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await http_post("jobs", values);
      const jobData = JobModel.fromJson(JSON.stringify(response.data));
      toast.success("Job submitted successfully");
      navigate("admin/jobs");
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Job creation failed");
      toast.error(error.response?.data?.message || "Job creation failed");
    } finally {
      setIsLoading(false);
      actions.setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: "Job Management",
            path: "/jobs",
            isActive: true,
          },
        ]}
      >
        Create Job
      </PageTitle>
      <ToolbarWrapper />

      <Content>
        <AnimatePresence mode="wait">
          <motion.div
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {isLoading && (
              <motion.div
                className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-25"
                style={{ zIndex: 9999 }}
              >
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </motion.div>
            )}

            <div className="card card-custom">
              <div className="card-body mx-auto" style={{ maxWidth: "800px" }}>
                {errorMessage && (
                  <motion.div
                    className="alert alert-danger mb-5"
                    variants={fadeVariant}
                    role="alert"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                {successMessage && (
                  <motion.div
                    className="alert alert-success mb-5"
                    variants={fadeVariant}
                    role="alert"
                  >
                    {successMessage}
                  </motion.div>
                )}

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, setFieldValue, isSubmitting }) => (
                    <Form className="form w-100">
                      <div className="row g-5">
                        <div className="col-12">
                          <h2 className="mb-5">Job Information</h2>
                          <div className="row g-4">
                            <div className="col-md-6">
                              <Field
                                name="title"
                                label="Job Title *"
                                component={TextInput}
                              />
                            </div>
                            <div className="col-md-6">
                              <Field
                                name="category_id"
                                label="Category *"
                                component={TextInput}
                              />
                            </div>
                            <div className="col-md-6">
                              <Field
                                name="district_id"
                                label="District *"
                                component={TextInput}
                              />
                            </div>
                            <div className="col-md-6">
                              <Field
                                name="sub_county_id"
                                label="Sub-County *"
                                component={TextInput}
                              />
                            </div>
                            <div className="col-md-12">
                              <Field
                                name="address"
                                label="Address *"
                                component={TextArea}
                              />
                            </div>
                            <div className="col-md-6">
                              <Field
                                name="vacancies_count"
                                label="Vacancies Count *"
                                component={TextInput}
                                type="number"
                              />
                            </div>
                            <div className="col-md-6">
                              <Field
                                name="employment_status"
                                label="Employment Status *"
                                options={employmentStatuses}
                                component={SelectInput}
                              />
                            </div>
                            <div className="col-md-6">
                              <Field
                                name="workplace"
                                label="Workplace *"
                                options={workplaces}
                                component={SelectInput}
                              />
                            </div>
                            {/* <div className="col-md-12">
                              <Field
                                name="responsibilities"
                                label="Responsibilities *"
                                component={(props: any) => (
                                  <Editor
                                    {...props}
                                    init={{
                                      height: 200,
                                      menubar: false,
                                      plugins: [
                                        "advlist autolink lists link image charmap print preview anchor",
                                        "searchreplace visualblocks code fullscreen",
                                        "insertdatetime media table paste code help wordcount",
                                      ],
                                      toolbar:
                                        "undo redo | formatselect | bold italic backcolor | \
                                        alignleft aligncenter alignright alignjustify | \
                                        bullist numlist outdent indent | removeformat | help",
                                    }}
                                    onEditorChange={(content) =>
                                      setFieldValue("responsibilities", content)
                                    }
                                  />
                                )}
                              />
                            </div> */}
                            <div className="col-md-6">
                              <Field
                                name="experience_field"
                                label="Experience Field *"
                                component={TextInput}
                              />
                            </div>
                            <div className="col-md-6">
                              <Field
                                name="experience_period"
                                label="Experience Period *"
                                component={TextInput}
                              />
                            </div>
                            <div className="col-md-6">
                              <Field
                                name="show_salary"
                                label="Show Salary *"
                                options={[
                                  { value: "Yes", label: "Yes" },
                                  { value: "No", label: "No" },
                                ]}
                                component={RadioButton}
                              />
                            </div>
                            <div className="col-md-6">
                              <Field
                                name="minimum_salary"
                                label="Minimum Salary *"
                                component={TextInput}
                                type="number"
                              />
                            </div>
                            <div className="col-md-6">
                              <Field
                                name="maximum_salary"
                                label="Maximum Salary *"
                                component={TextInput}
                                type="number"
                              />
                            </div>
                            <div className="col-md-12">
                              <Field
                                name="benefits"
                                label="Benefits *"
                                component={TextArea}
                              />
                            </div>
                            <div className="col-md-6">
                              <Field
                                name="gender"
                                label="Gender *"
                                options={[
                                  { value: "Male", label: "Male" },
                                  { value: "Female", label: "Female" },
                                  { value: "Any", label: "Any" },
                                ]}
                                component={SelectInput}
                              />
                            </div>
                            <div className="col-md-6">
                              <Field
                                name="min_age"
                                label="Minimum Age *"
                                component={TextInput}
                                type="number"
                              />
                            </div>
                            <div className="col-md-6">
                              <Field
                                name="max_age"
                                label="Maximum Age *"
                                component={TextInput}
                                type="number"
                              />
                            </div>
                            <div className="col-md-6">
                              <Field
                                name="required_video_cv"
                                label="Required Video CV *"
                                options={[
                                  { value: "Yes", label: "Yes" },
                                  { value: "No", label: "No" },
                                ]}
                                component={RadioButton}
                              />
                            </div>
                            <div className="col-md-6">
                              <Field
                                name="minimum_academic_qualification"
                                label="Minimum Academic Qualification *"
                                component={TextInput}
                              />
                            </div>
                            {/* vacancies_count */}
                            {/*  <div className="col-md-6">
                              <Field
                                name="vacancies_count"
                                label="Available Vacancies Count *"
                                component={TextInput}
                                type="number"
                              />
                            </div> */}
                            <div className="col-md-6">
                              <Field
                                name="application_method"
                                label="Application Method *"
                                component={TextInput}
                              />
                            </div>
                            <div className="col-md-12">
                              <Field
                                name="application_method_details"
                                label="Application Method Details *"
                                component={TextArea}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-12 mt-5">
                          <div className="d-flex justify-content-end gap-3">
                            <button
                              type="button"
                              className="btn btn-light"
                              onClick={() => navigate("/jobs")}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <FiSave className="me-2" />
                                  Submitting...
                                </>
                              ) : (
                                <>
                                  <FiSave className="me-2" />
                                  Create Job
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Content>
    </>
  );
};

export default JobCreatePage1;
