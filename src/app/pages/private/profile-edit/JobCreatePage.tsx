import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  TextInput,
  SelectInput,
  TextArea,
  RadioButton,
  SubmitButton,
} from "../../../components/FormComponents";
import { useAuth } from "../../../modules/auth";
import { PageTitle } from "../../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import { Content } from "../../../../_metronic/layout/components/content";

// For text editing:
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// For animations:
import { motion } from "framer-motion";
import { http_post, http_get } from "../../../services/Api";
import { JobModel } from "../../../models/JobModel";
import { Spinner } from "react-bootstrap";
import { EMPLOYMENT_STATUS_OPTIONS } from "../../../../Constants";

// Dummy data for select fields (Keep these as they are)
const SUB_COUNTY_OPTIONS = [
  { value: "SC001", label: "Sub County 1" },
  { value: "SC002", label: "Sub County 2" },
  { value: "SC003", label: "Sub County 3" },
];

const JOB_CATEGORY_OPTIONS = [
  { value: "JC001", label: "IT & Software" },
  { value: "JC002", label: "Marketing & Sales" },
  { value: "JC003", label: "Education & Training" },
];

const MIN_ACADEMIC_OPTIONS = [
  { value: "None", label: "No Formal Education" },
  { value: "Primary", label: "Primary Level" },
  { value: "Secondary", label: "Secondary Level" },
  { value: "Certificate", label: "Certificate" },
  { value: "Diploma", label: "Diploma" },
  { value: "Degree", label: "Bachelor's Degree" },
  { value: "Masters", label: "Master's Degree" },
  { value: "PhD", label: "PhD" },
];

const JOB_STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "closed", label: "Closed" },
  { value: "pending", label: "Pending" },
];


const WORKPLACE_OPTIONS = [
  { value: "Onsite", label: "Onsite" },
  { value: "Remote", label: "Remote" },
  { value: "Hybrid", label: "Hybrid" },
];

const YES_NO_OPTIONS = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const GENDER_OPTIONS = [
  { value: "Other", label: "Any" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const APPLICATION_METHOD_OPTIONS = [
  { value: "online", label: "Online (using this system)" },
  { value: "email", label: "Email" },
  { value: "hard-copy", label: "Hard Copy" },
  { value: "physical", label: "Physical Delivery" },
  { value: "other", label: "Other" },
];

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Job title is required"),
  responsibilities: Yup.string()
    .required("Responsibilities are required")
    .min(100, "Responsibilities must be at least 100 characters"),
  vacancies_count: Yup.number()
    .required("Vacancies count is required")
    .min(1, "At least one vacancy is required"),
  deadline: Yup.date()
    .typeError("Deadline must be a valid date")
    .required("Application Deadline is required")
    .min(new Date(), "Application Deadline cannot be in the past"),
  employment_status: Yup.string().required("Employment Status is required"),
  workplace: Yup.string().required("Workplace is required"),
  show_salary: Yup.string().required("Show Salary is required"),
  minimum_salary: Yup.number()
    .min(50000, "Minimum Salary must be at least 50000 UGX")
    .required("Minimum Salary is required"),
  maximum_salary: Yup.number()
    .required("Maximum Salary is required")
    .test(
      "max-salary-check",
      "Maximum Salary cannot be less than the Minimum Salary",
      function (value) {
        const { minimum_salary } = this.parent;
        return value >= minimum_salary;
      }
    ),
  sub_county_id: Yup.string().required("Sub County is required"),
  gender: Yup.string().required("Preferred Gender is required"),
  min_age: Yup.number()
    .required("Minimum Age is required")
    .min(10, "Min Age must be at least 18"),
  max_age: Yup.number()
    .required("Maximum Age is required")
    .test(
      "max-age-check",
      "Max Age cannot be less than the Min Age",
      function (value) {
        const { min_age } = this.parent;
        if (value === undefined) return false;
        return value >= min_age;
      }
    ),
  experience_field: Yup.string().required("Experience Field is required"),
  experience_period: Yup.number()
    .required("Experience Period is required")
    .min(0, "Experience Period cannot be negative"),
  application_method: Yup.string().required("Application Method is required"),
  job_category_id: Yup.string().required("Job Category is required"),
  minimum_academic_qualification: Yup.string().required(
    "Minimum Academic Qualification is required"
  ),
  status: Yup.string().required("Job Status is required"),
});

const JobCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { id } = useParams<{ id?: string }>();
  const isEditMode = !!id;
  const [showPreferredCountries, setShowPreferredCountries] = useState(false);
  const [showDisabilityDetails, setShowDisabilityDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [jobLoading, setJobLoading] = useState(false);
  const [initialJobValues, setInitialJobValues] = useState<JobModel>(
    () => new JobModel()
  );

  useEffect(() => {
    if (!currentUser) {
      toast.error("Please log in first.");
      navigate("/login");
    }

    if (isEditMode && id) {
      fetchJobDetails(id);
    }
  }, [currentUser, navigate, isEditMode, id]);

  const fetchJobDetails = async (jobId: string) => {
    setJobLoading(true);
    setErrorMessage("");
    try {
      const resp = await http_get(`jobs/${jobId}`);
      const jobData = JobModel.fromJson(JSON.stringify(resp.data));
      console.log("Fetched job details:", jobData);
      setInitialJobValues(jobData);
    } catch (error: any) {
      console.error("Error fetching job details:", error);
      toast.error("Failed to load job details for editing.");
      setErrorMessage(error?.message || "Failed to load job details.");
    } finally {
      setJobLoading(false);
    }
  };

  const handleSubmit = async (values: JobModel, actions: any) => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);
    try {
      let resp;
      if (isEditMode && id) {
        resp = await http_post(`jobs/${id}`, values);
        toast.success("Job updated successfully");
      } else {
        resp = await http_post("job-create", values);
        toast.success("Job created successfully");
      }

      const data = JobModel.fromJson(JSON.stringify(resp));
      if (Number(data.id) <= 0) {
        throw new Error(
          `Failed to ${
            isEditMode ? "update" : "create"
          } job because of invalid ID`
        );
      }

      navigate("/admin/company-jobs");
    } catch (error: any) {
      setErrorMessage("Failed: " + error?.message || "An error occurred");
      toast.error(
        `Job ${isEditMode ? "update" : "creation"} failed: ${
          error?.message || "An error occurred"
        }`
      );
      actions.setSubmitting(false);
    } finally {
      setIsLoading(false);
      actions.setSubmitting(false);
    }
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0 },
  };

  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: "Jobs",
            path: "/admin/company-jobs",
            isActive: false,
          },
        ]}
      >
        {isEditMode ? "Edit Job" : "Create Job"}
      </PageTitle>
      <ToolbarWrapper />
      <Content>
        <motion.div
          className="card card-custom mx-auto"
          style={{ maxWidth: "900px" }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="card-body">
            {jobLoading && !errorMessage && (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" role="status">
                  <span className="visually-hidden">
                    Loading Job Details...
                  </span>
                </Spinner>
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
            )}

            {!jobLoading &&
              !errorMessage && ( // Modified condition: Render form only when NOT loading AND NO error
                <Formik
                  initialValues={initialJobValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize
                >
                  {({
                    values,
                    setFieldValue,
                    isSubmitting,
                    errors,
                    touched,
                  }) => (
                    <Form className="form w-100">
                      <h2 className="mb-5">
                        {isEditMode ? "Edit Job Details" : "Job Details"}
                      </h2>

                      {/* ... (rest of the form fields - same as before) ... */}
                      {/* Title, Deadline, Status */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="title"
                            label="Job Title *"
                            placeholder="e.g., Software Engineer"
                            component={TextInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="deadline"
                            label="Application Deadline *"
                            component={TextInput}
                            type="date"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="status"
                            label="Job Status *"
                            options={JOB_STATUS_OPTIONS}
                            component={SelectInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="job_category_id"
                            label="Job Category *"
                            options={JOB_CATEGORY_OPTIONS}
                            component={SelectInput}
                          />
                        </div>
                      </div>

                      {/* Employment Status & Workplace */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="employment_status"
                            label="Employment Status *"
                            options={EMPLOYMENT_STATUS_OPTIONS}
                            // Radio
                            component={(props: any) => (
                              <RadioButton
                                {...props}
                                radioClass="form-check form-check-inline"
                              />
                            )}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="workplace"
                            label="Workplace *"
                            options={WORKPLACE_OPTIONS}
                            // Radio
                            component={(props: any) => (
                              <RadioButton
                                {...props}
                                radioClass="form-check form-check-inline"
                              />
                            )}
                          />
                        </div>
                      </div>

                      {/* Salary Range */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="show_salary"
                            label="Show Salary *"
                            options={YES_NO_OPTIONS}
                            component={(props: any) => (
                              <RadioButton
                                {...props}
                                radioClass="form-check form-check-inline"
                              />
                            )}
                          />
                        </div>
                        <div className="col-md-3">
                          <Field
                            name="minimum_salary"
                            label="Minimum Salary (UGX)"
                            placeholder="Min UGX e.g. 50000"
                            component={TextInput}
                            type="number"
                          />
                        </div>
                        <div className="col-md-3">
                          <Field
                            name="maximum_salary"
                            label="Maximum Salary (UGX)"
                            placeholder="Max UGX"
                            component={TextInput}
                            type="number"
                          />
                        </div>
                      </div>

                      {/* Sub County, Gender */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="sub_county_id"
                            label="Sub County *"
                            options={SUB_COUNTY_OPTIONS}
                            component={SelectInput}
                          />
                        </div>
                        <div className="col-md-6">
                          {/* field for address */}
                          <Field
                            name="address"
                            label="Address"
                            placeholder="e.g., Plot 123, Street Name"
                            component={TextInput}
                          />
                        </div>
                      </div>

                      {/* Age Range */}
                      <div className="row mb-3">
                        <div className="col-md-6 ">
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <Field
                                name="min_age"
                                label="Minimum Age *"
                                placeholder="e.g 18"
                                component={TextInput}
                                type="number"
                              />
                            </div>
                            <div className="col-md-6">
                              <Field
                                name="max_age"
                                label="Maximum Age *"
                                placeholder="65"
                                component={TextInput}
                                type="number"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="gender"
                            label="Preferred Gender *"
                            options={GENDER_OPTIONS}
                            // Radio
                            component={(props: any) => (
                              <RadioButton
                                {...props}
                                radioClass="form-check form-check-inline"
                              />
                            )}
                          />
                        </div>
                      </div>

                      {/* Experience Info */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="experience_field"
                            label="Experience Field *"
                            placeholder="e.g. IT, Finance"
                            component={TextInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="experience_period"
                            label="Experience Period (Years) *"
                            placeholder="e.g. 2"
                            component={TextInput}
                            type="number"
                          />
                        </div>
                      </div>

                      {/* Minimum Academic Qualification */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="minimum_academic_qualification"
                            label="Minimum Academic Qualification *"
                            options={MIN_ACADEMIC_OPTIONS}
                            component={SelectInput}
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
                      </div>

                      {/* Responsibilities */}
                      <div className="mb-3">
                        <label className="form-label fw-bolder text-gray-900">
                          Responsibilities
                        </label>
                        <ReactQuill
                          theme="snow"
                          value={values.responsibilities}
                          onChange={(val) =>
                            setFieldValue("responsibilities", val)
                          }
                          style={{ height: "180px", marginBottom: "40px" }}
                        />
                        {errors.responsibilities &&
                          touched.responsibilities && (
                            <div className="text-danger">
                              {errors.responsibilities}
                            </div>
                          )}
                      </div>

                      {/* Benefits */}
                      <br />
                      <div className="mb-3 mt-0">
                        <label className="form-label fw-bolder text-gray-900">
                          Benefits
                        </label>
                        <ReactQuill
                          theme="snow"
                          value={values.benefits}
                          onChange={(val) => setFieldValue("benefits", val)}
                          style={{ height: "180px", marginBottom: "40px" }}
                        />
                      </div>

                      {/* Application Method */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="application_method"
                            label="Application Method *"
                            options={APPLICATION_METHOD_OPTIONS}
                            component={SelectInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="application_method_details"
                            label="Application Method Details"
                            placeholder="e.g., Send CV to hr@example.com"
                            component={TextInput}
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-end mt-4">
                        <SubmitButton
                          label={isEditMode ? "Update Job" : "Create Job"}
                          isSubmitting={isSubmitting}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
          </div>
        </motion.div>
      </Content>
    </>
  );
};

export default JobCreatePage;
