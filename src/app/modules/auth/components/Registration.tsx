import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { PasswordMeterComponent } from "../../../../_metronic/assets/ts/components";
import { useAuth } from "../core/Auth";
import { User } from "../../../models/User";
import { toast } from "react-toastify";
import { http_post, login } from "../../../services/Api";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  changepassword: "",
  phone_number: "",
  acceptTerms: false,
};

const registrationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("First name is required"),
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  last_name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Last name is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols"),
  phone_number: Yup.string()
    .min(5, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
  changepassword: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password")], "Password and Confirm Password didn't match"),
  acceptTerms: Yup.bool().required("You must accept the terms and conditions"),
});

export function Registration() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setSubmitting(true);
      setStatus("");
      try {
        const resp = await http_post("users/register", {
          first_name: values.first_name,
          last_name: values.last_name,
          name: values.first_name + " " + values.last_name,
          email: values.email,
          password: values.password,
          phone_number: values.phone_number,
          phone_number_1: values.phone_number,
          username: values.phone_number,
          gender: "Male",
        });
        setLoading(false);
        setSubmitting(false);
        setStatus("");

        toast.success("Registration successful, logging in...");

        setStatus("");
        setSubmitting(true);
        setLoading(true);

        try {
          const newUser = await login(values.email, values.password);
          setCurrentUser(newUser);
          saveAuth(newUser);
          toast.success("Login successful");
          navigate("/admin/dashboard");
        } catch (error) {
          setStatus("Invalid email or password");
        } finally {
          setSubmitting(false);
          setLoading(false);
        }

        // setLoading(false);
        //saveAuth(auth);
        //const { data: user } = await getUserByToken(auth.api_token);
        //setCurrentUser(user);
      } catch (error) {
        setSubmitting(false);
        setLoading(false);
        setStatus(error + "");
      }
    },
  });

  useEffect(() => {
    PasswordMeterComponent.bootstrap();
  }, []);

  return (
    <form
      className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      noValidate
      id="kt_login_signup_form"
      onSubmit={formik.handleSubmit}
    >
      <div className="text-center mb-11">
        <div className="text-gray-500 fw-semibold fs-6">Welcome</div>
        <h1 className="text-gray-900 fw-bolder mb-3 mt-1">Skills Uganda</h1>
        <Link to="/" className="mb-12">
          <img
            alt="Logo"
            src={toAbsoluteUrl("media/logos/logo.svg")}
            className="h-75px"
          />
        </Link>
      </div>
      <div className="separator separator-content my-14">
        <span className="w-125px text-gray-500 fw-semibold fs-7">
          Creaye Account
        </span>
      </div>

      {formik.status && (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      )}

      {/* begin::Form group first_name */}
      <div className="fv-row mb-8">
        <label className="form-label fw-bolder text-gray-900 fs-6">
          First name
        </label>
        <input
          placeholder="First name"
          type="text"
          autoComplete="off"
          {...formik.getFieldProps("first_name")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid":
                formik.touched.first_name && formik.errors.first_name,
            },
            {
              "is-valid":
                formik.touched.first_name && !formik.errors.first_name,
            }
          )}
        />
        {formik.touched.first_name && formik.errors.first_name && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.first_name}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}
      <div className="fv-row mb-8">
        {/* begin::Form group last_name */}
        <label className="form-label fw-bolder text-gray-900 fs-6">
          Last name
        </label>
        <input
          placeholder="Last name"
          type="text"
          autoComplete="off"
          {...formik.getFieldProps("last_name")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid": formik.touched.last_name && formik.errors.last_name,
            },
            {
              "is-valid": formik.touched.last_name && !formik.errors.last_name,
            }
          )}
        />
        {formik.touched.last_name && formik.errors.last_name && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.last_name}</span>
            </div>
          </div>
        )}
        {/* end::Form group */}
      </div>

      {/* begin::Form group Email */}
      <div className="fv-row mb-8">
        <label className="form-label fw-bolder text-gray-900 fs-6">Email</label>
        <input
          placeholder="Email"
          type="email"
          autoComplete="off"
          {...formik.getFieldProps("email")}
          className={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.email && formik.errors.email },
            {
              "is-valid": formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Phone Number */}
      <div className="fv-row mb-8">
        <label className="form-label fw-bolder text-gray-900 fs-6">
          Phone Number
        </label>
        <input
          placeholder="Phone Number"
          type="text"
          autoComplete="off"
          {...formik.getFieldProps("phone_number")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid":
                formik.touched.phone_number && formik.errors.phone_number,
            },
            {
              "is-valid":
                formik.touched.phone_number && !formik.errors.phone_number,
            }
          )}
        />
        {formik.touched.phone_number && formik.errors.phone_number && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.phone_number}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className="fv-row mb-8" data-kt-password-meter="true">
        <div className="mb-1">
          <label className="form-label fw-bolder text-gray-900 fs-6">
            Password
          </label>
          <div className="position-relative mb-3">
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              {...formik.getFieldProps("password")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.password && formik.errors.password,
                },
                {
                  "is-valid":
                    formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          {/* begin::Meter */}
          <div
            className="d-flex align-items-center mb-3"
            data-kt-password-meter-control="highlight"
          >
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
          </div>
          {/* end::Meter */}
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className="fv-row mb-5">
        <label className="form-label fw-bolder text-gray-900 fs-6">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Password confirmation"
          autoComplete="off"
          {...formik.getFieldProps("changepassword")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid":
                formik.touched.changepassword && formik.errors.changepassword,
            },
            {
              "is-valid":
                formik.touched.changepassword && !formik.errors.changepassword,
            }
          )}
        />
        {formik.touched.changepassword && formik.errors.changepassword && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.changepassword}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="fv-row mb-8">
        <label
          className="form-check form-check-inline"
          htmlFor="kt_login_toc_agree"
        >
          <input
            className="form-check-input"
            type="checkbox"
            id="kt_login_toc_agree"
            {...formik.getFieldProps("acceptTerms")}
          />
          <span>
            I Accept the{" "}
            <a
              href="https://keenthemes.com/metronic/?page=faq"
              target="_blank"
              className="ms-1 link-primary"
            >
              Terms
            </a>
            .
          </span>
        </label>
        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.acceptTerms}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="text-center">
        <button
          type="submit"
          id="kt_sign_up_submit"
          className="btn btn-lg btn-primary w-100 mb-5"
          disabled={
            formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms
          }
        >
          {!loading && <span className="indicator-label">Submit</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...{" "}
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
        <Link to="/auth/login">
          <button
            type="button"
            id="kt_login_signup_form_cancel_button"
            className="btn btn-lg btn-light-primary w-100 mb-5"
          >
            Cancel
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  );
}
