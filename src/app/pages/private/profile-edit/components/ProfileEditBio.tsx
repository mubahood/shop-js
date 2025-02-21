import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  TextInput,
  DateInput,
  SelectInput,
  SubmitButton,
  TextArea,
  RadioButton,
} from "../../../../components/FormComponents";
import { COUNTRIES } from "../../../../../Constants";
import { useProfileEdit } from "../ProfileEditContext";
import { ProfileModel } from "../../../../models/ProfileModel";
import { useAuth } from "../../../../modules/auth";
import { http_post } from "../../../../services/Api";
import Utils from "../../../../services/Utils";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiSave } from "react-icons/fi";
import { DistrictModel } from "../../../../models/DistrictModel";
import { ManifestModel } from "../../../../models/Manifest";

const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, y: 10 },
};

const ProfileEditBio: React.FC = () => {
  const navigate = useNavigate();
  const [showPreferredCountries, setShowPreferredCountries] = useState(false);
  const [showDisabilityDetails, setShowDisabilityDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useAuth();
  const { currentUser } = useAuth();
  const [districts, setDistricts] = useState<
    { value: string; label: string }[]
  >([]);
  const [job_categories, setJobCategories] = useState<
    { value: string; label: string }[]
  >([]);

  if (!currentUser) {
    alert("User not found");
    return null;
  }

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string()
      .min(2, "Last Name must be at least 2 characters")
      .required("Last Name is required"),
    sex: Yup.string().required("Gender is required"),
    title: Yup.string().required("Title is required"),
  });

  useEffect(() => {
    load_districts();
  }, []);

  const load_districts = async () => {
    var man = await ManifestModel.getItems();
    if (man != null && man["CATEGORIES"] != null) {
      var temp_cats = [];
      //loop through the man["CATEGORIES"]
      for (var key in man["CATEGORIES"]) {
        var temp = man["CATEGORIES"][key];
        if (temp == null) continue;
        temp_cats.push({ value: temp["id"], label: temp["name"] });
      }
      if (temp_cats.length > 0) {
        setJobCategories(temp_cats);
      } else {
        alert("No job categories found");
      }
    }

    var _districts = [];
    try {
      _districts = await DistrictModel.getItems();
    } catch (error) {
      alert("Failed to load districts: " + error);
      return;
    }

    if (_districts.length < 1) {
      alert("No districts found");
      return;
    }

    setDistricts([]);
    let districts_1 = [];
    for (const item of _districts) {
      if (item.name) {
        districts_1.push({ value: item.id + "", label: item.name });
      }
    }
    setDistricts(districts_1);
  };
  const handleSubmit = async (values: typeof currentUser, actions: any) => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);
    const submitAction = values?.submitAction || "save";
    try {
      const resp = await http_post("profile", values);
      const data = ProfileModel.fromJson(JSON.stringify(resp));
      setCurrentUser(data);
      Utils.saveProfile(data);
      setSuccessMessage("Profile updated successfully");
      toast.success("Profile updated successfully");
      if (submitAction === "saveAndNext") {
        navigate("/admin/profile-edit/education");
      }
    } catch (error) {
      setErrorMessage("Failed: " + error);
      toast.error("Profile update failed");
      actions.setSubmitting(false);
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
      {({ values, isSubmitting, setFieldValue }) => (
        <AnimatePresence mode="wait">
          <motion.div
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Form>
              {isLoading && (
                <motion.div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
                  variants={fadeVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ zIndex: 9999 }}
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
                  variants={fadeVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
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

              {/*      <button
                type="button"
                className="btn btn-lg btn-info"
                onClick={() => load_districts()}
              >
                collect data
              </button>
 */}
              {successMessage && (
                <motion.div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                  variants={fadeVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
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

              <div className="accordion" id="profileEditAccordion">
                <motion.div
                  className="accordion-item"
                  variants={fadeVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2
                    className="accordion-header bg-light text-black fw-bold"
                    id="headingOne"
                  >
                    <button
                      className="accordion-button bg-light text-black fw-bold text-gray-900"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <span className="fs-1 fw-bolder text-primary">
                        Personal Details
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#profileEditAccordion"
                  >
                    <div className="accordion-body">
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="title"
                            label="Title"
                            options={[
                              { value: "Mr", label: "Mr" },
                              { value: "Mrs", label: "Mrs" },
                              { value: "Miss", label: "Miss" },
                              { value: "Ms", label: "Ms" },
                              { value: "Dr", label: "Dr" },
                              { value: "Prof", label: "Prof" },
                              { value: "Rev", label: "Rev" },
                              { value: "Hon", label: "Hon" },
                            ]}
                            component={SelectInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="first_name"
                            label={
                              <>
                                First Name{" "}
                                <span className="text-danger">*</span>
                              </>
                            }
                            placeholder="Enter First Name"
                            component={TextInput}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="last_name"
                            label="Last Name"
                            placeholder="Enter Last Name"
                            component={TextInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="sex"
                            label="Gender"
                            options={[
                              { value: "Male", label: "Male" },
                              { value: "Female", label: "Female" },
                              { value: "Other", label: "Other" },
                            ]}
                            component={(props: any) => (
                              <SelectInput {...props} />
                            )}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="father_name"
                            label="Father's Name"
                            placeholder="Enter Father's Name"
                            component={TextInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="mother_name"
                            label="Mother's Name"
                            placeholder="Enter Mother's Name"
                            component={TextInput}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="date_of_birth"
                            label="Date of Birth"
                            component={DateInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="religion"
                            label="Religion"
                            options={[
                              { value: "Islam", label: "Islam" },
                              { value: "Christian", label: "Christian" },
                              { value: "Hindu", label: "Hindu" },
                              { value: "Other", label: "Other" },
                            ]}
                            component={SelectInput}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="marital_status"
                            label="Marital Status"
                            options={[
                              { value: "Single", label: "Single" },
                              { value: "Married", label: "Married" },
                              { value: "Divorced", label: "Divorced" },
                              { value: "Widowed", label: "Widowed" },
                            ]}
                            component={SelectInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="nationality"
                            label="Nationality"
                            options={COUNTRIES}
                            component={SelectInput}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="languages"
                            label="Languages"
                            placeholder="e.g. English, Swahili"
                            component={TextInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="blood_group"
                            label="Blood Group"
                            options={[
                              { value: "A+", label: "A+" },
                              { value: "A-", label: "A-" },
                              { value: "B+", label: "B+" },
                              { value: "B-", label: "B-" },
                              { value: "O+", label: "O+" },
                              { value: "O-", label: "O-" },
                              { value: "AB+", label: "AB+" },
                              { value: "AB-", label: "AB-" },
                            ]}
                            component={SelectInput}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-4">
                          <Field
                            name="height"
                            label="Height"
                            placeholder="e.g. 170 cm"
                            component={TextInput}
                          />
                        </div>
                        <div className="col-md-4">
                          <Field
                            name="weight"
                            label="Weight"
                            placeholder="e.g. 65 kg"
                            component={TextInput}
                          />
                        </div>
                        <div className="col-md-4">
                          <Field
                            name="has_disability"
                            label="Do you have a disability?"
                            options={[
                              { value: "Yes", label: "Yes" },
                              { value: "No", label: "No" },
                            ]}
                            component={(props: any) => (
                              <RadioButton
                                {...props}
                                radioClass="form-check form-check-inline"
                                onChange={(e) => {
                                  props.form.setFieldValue(
                                    props.field.name,
                                    e.target.value
                                  );
                                  setShowDisabilityDetails(
                                    e.target.value === "Yes"
                                  );
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        {showDisabilityDetails && (
                          <motion.div
                            variants={fadeVariant}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <Field
                                  name="is_registered_on_disability"
                                  label="Are you registered on ict4personswithdisabilities.org?"
                                  options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                  ]}
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
                                  name="disability_type"
                                  label="Disability Type"
                                  placeholder="Enter Disability Type"
                                  component={TextInput}
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <Field
                                  name="dificulty_display_on_cv"
                                  label="Display Difficulty on CV"
                                  options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                  ]}
                                  component={(props: any) => (
                                    <RadioButton
                                      {...props}
                                      radioClass="form-check form-check-inline"
                                    />
                                  )}
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-3">
                                <Field
                                  name="dificulty_to_see"
                                  label="Difficulty to See"
                                  options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                  ]}
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
                                  name="dificulty_to_hear"
                                  label="Difficulty to Hear"
                                  options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                  ]}
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
                                  name="dificulty_to_walk"
                                  label="Difficulty to Walk"
                                  options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                  ]}
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
                                  name="dificulty_to_speak"
                                  label="Difficulty to Speak"
                                  options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                  ]}
                                  component={(props: any) => (
                                    <RadioButton
                                      {...props}
                                      radioClass="form-check form-check-inline"
                                    />
                                  )}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="accordion-item"
                  variants={fadeVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2
                    className="accordion-header bg-light text-black fw-bold"
                    id="headingTwo"
                  >
                    <button
                      className="accordion-button collapsed bg-light text-black fw-bold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <span className="fs-1 fw-bolder text-primary">
                        Contact & Identity
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#profileEditAccordion"
                  >
                    <div className="accordion-body">
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="district_id"
                            label="District"
                            placeholder="District of Residence"
                            options={districts}
                            component={SelectInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="home_address"
                            label="Home Address"
                            placeholder="Permanent or Family Residence"
                            component={TextInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="current_address"
                            label="Current Address"
                            placeholder="Present Working/Residence Address"
                            component={TextInput}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="phone_number_1"
                            label={<>Phone Number 1</>}
                            placeholder="Primary Contact No."
                            component={TextInput}
                            disabled
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="phone_number_2"
                            label="Phone Number 2"
                            placeholder="Alternate Contact No."
                            component={TextInput}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="country_code"
                            label="Country Code"
                            placeholder="e.g. +256"
                            component={TextInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="emergency_person_name"
                            label="Emergency Contact Name"
                            placeholder="Who to contact in emergency"
                            component={TextInput}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="emergency_person_phone"
                            label="Emergency Contact Phone"
                            placeholder="Enter phone no."
                            component={TextInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="national_id_number"
                            label="National ID Number"
                            placeholder="Enter your National ID"
                            component={TextInput}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="passport_number"
                            label="Passport Number"
                            placeholder="Enter Passport No."
                            component={TextInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="tin"
                            label="TIN"
                            placeholder="Tax Identification Number"
                            component={TextInput}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="nssf_number"
                            label="NSSF Number"
                            placeholder="Social Security Number"
                            component={TextInput}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="accordion-item"
                  variants={fadeVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2
                    className="accordion-header bg-light text-black fw-bold"
                    id="headingThree"
                  >
                    <button
                      className="accordion-button collapsed bg-light text-black fw-bold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      <span className="fs-1 fw-bolder text-primary">
                        Professional & Job Preferences
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#profileEditAccordion"
                  >
                    <div className="accordion-body">
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="special_qualification"
                            label="Job Designation"
                            placeholder="e.g. Software Engineer, Business Analyst, etc."
                            component={TextInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="objective"
                            label="Career Objective"
                            placeholder="Briefly describe your career objective"
                            component={TextArea}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-12">
                          <Field
                            name="career_summary"
                            label="Career Summary"
                            placeholder="Short summary of work experience"
                            component={TextArea}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="present_salary"
                            label="Present Salary"
                            placeholder="Enter current salary if employed"
                            component={TextInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="expected_salary"
                            label="Expected Salary"
                            placeholder="Enter your expected salary"
                            component={TextInput}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="expected_job_level"
                            label="Expected Job"
                            placeholder="e.g. Software Engineer, Business Analyst, etc."
                            component={TextInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="expected_job_nature"
                            label="Expected Job Nature"
                            placeholder="Full Time / Part Time / Contract"
                            component={TextInput}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="preferred_job_location"
                            label="Preferred Job Location"
                            placeholder="e.g. Kampala"
                            component={TextInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="preferred_job_category"
                            label="Select Preferred Job Category"
                            placeholder="e.g. IT, Finance, Marketing"
                            options={job_categories}
                            component={SelectInput}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="preferred_job_category_other"
                            label="Preferred Job Category (Other)"
                            placeholder="Enter if not listed above"
                            component={TextInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="preferred_job_districts"
                            label="Preferred Job Districts"
                            placeholder="List any specific districts"
                            component={TextInput}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Field
                            name="preferred_job_abroad"
                            label="Preferred Job Abroad"
                            options={[
                              { value: "Yes", label: "Yes" },
                              { value: "No", label: "No" },
                            ]}
                            component={(props: any) => (
                              <RadioButton
                                {...props}
                                radioClass="form-check form-check-inline"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  props.form.setFieldValue(
                                    props.field.name,
                                    e.target.value
                                  );
                                  setShowPreferredCountries(
                                    e.target.value === "Yes"
                                  );
                                }}
                              />
                            )}
                          />
                        </div>
                        <AnimatePresence mode="wait">
                          {showPreferredCountries && (
                            <motion.div
                              className="col-md-6"
                              variants={fadeVariant}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                            >
                              <Field
                                name="preferred_job_countries"
                                label="Preferred Job Countries"
                                placeholder="List countries if abroad is yes"
                                component={TextInput}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="d-flex justify-content-between mt-5 border-top pt-4 mb-5 mb-lg-10">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/admin/profile-edit/photo")}
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
          </motion.div>
        </AnimatePresence>
      )}
    </Formik>
  );
};

export default ProfileEditBio;
