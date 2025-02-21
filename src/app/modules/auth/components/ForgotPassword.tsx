import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { http_post } from "../../../services/Api";
import { toast } from "react-toastify";

const resetSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  code: Yup.string().min(6, "Minimum 6 symbols").max(6, "Maximum 6 symbols"),
  password: Yup.string()
    .min(8, "Minimum 8 symbols")
    .max(50, "Maximum 50 symbols")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [showCodeFields, setShowCodeFields] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setStatus("");

      try {
        const { email, code, password } = values;
        const data = await http_post(`/password-reset-submit`, {
          'email': email,
          'code': code,
          'password': password,
        });

       

        toast.success("Password reset successful! You can now login with your new password.");  
        navigate("/auth/login");
      } catch (error: any) {
        setStatus(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  const handlePasswordResetRequest = async () => {
    setRequestLoading(true);
    try {
      await http_post(`/password-reset-request`, {
        email: formik.values.email,
      });
      toast.success(
        "Password reset request sent! Check your email for the verification code."
      );
      setShowCodeFields(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setRequestLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/auth/login");
  };

  const handleToggleCodeFields = () => {
    setShowCodeFields(!showCodeFields);
  };

  return (
    <form
      className="form w-100"
      noValidate
      onSubmit={formik.handleSubmit}
      id="kt_password_reset_form"
    >
      <div className="text-center mb-11">
        <h1 className="text-gray-900 fw-bolder mb-3">Forgot Password?</h1>
        <div className="text-gray-500 fw-semibold fs-6">
          Enter your email to reset your password.
        </div>
      </div>

      {formik.status && (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      )}

      <div className="fv-row mb-8">
        <label className="form-label fs-6 fw-bolder text-gray-900">Email</label>
        <input
          placeholder="Email"
          {...formik.getFieldProps("email")}
          className={clsx("form-control bg-transparent", {
            "is-invalid": formik.touched.email && formik.errors.email,
            "is-valid": formik.touched.email && !formik.errors.email,
          })}
          type="email"
          name="email"
          autoComplete="off"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.email}</span>
          </div>
        )}
      </div>

      <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
        <div></div>
        <div>
          <button
            type="button"
            className="btn btn-link"
            onClick={handleToggleCodeFields}
          >
            {showCodeFields
              ? "I need to request a code"
              : "I already have a code"}
          </button>
        </div>
      </div>

      {!showCodeFields && (
        <div className="d-grid mb-10">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePasswordResetRequest}
            disabled={requestLoading}
          >
            {requestLoading ? (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            ) : (
              <span className="indicator-label">Request Password Reset</span>
            )}
          </button>
        </div>
      )}

      {showCodeFields && (
        <>
          <div className="fv-row mb-8">
            <label className="form-label fs-6 fw-bolder text-gray-900">
              Verification Code
            </label>
            <input
              placeholder="Enter code"
              {...formik.getFieldProps("code")}
              className={clsx("form-control bg-transparent", {
                "is-invalid": formik.touched.code && formik.errors.code,
                "is-valid": formik.touched.code && !formik.errors.code,
              })}
              type="text"
              name="code"
              autoComplete="off"
            />
            {formik.touched.code && formik.errors.code && (
              <div className="fv-plugins-message-container">
                <span role="alert">{formik.errors.code}</span>
              </div>
            )}
          </div>

          <div className="fv-row mb-8">
            <label className="form-label fs-6 fw-bolder text-gray-900">
              New Password
            </label>
            <input
              placeholder="New Password"
              {...formik.getFieldProps("password")}
              className={clsx("form-control bg-transparent", {
                "is-invalid": formik.touched.password && formik.errors.password,
                "is-valid": formik.touched.password && !formik.errors.password,
              })}
              type="password"
              name="password"
              autoComplete="off"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="fv-plugins-message-container">
                <span role="alert">{formik.errors.password}</span>
              </div>
            )}
          </div>

          <div className="fv-row mb-8">
            <label className="form-label fs-6 fw-bolder text-gray-900">
              Confirm New Password
            </label>
            <input
              placeholder="Confirm New Password"
              {...formik.getFieldProps("confirmPassword")}
              className={clsx("form-control bg-transparent", {
                "is-invalid":
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword,
                "is-valid":
                  formik.touched.confirmPassword &&
                  !formik.errors.confirmPassword,
              })}
              type="password"
              name="confirmPassword"
              autoComplete="off"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="fv-plugins-message-container">
                  <span role="alert">{formik.errors.confirmPassword}</span>
                </div>
              )}
          </div>

          <div className="d-grid mb-10">
            <button
              type="submit"
              id="kt_password_reset_submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span
                  className="indicator-progress"
                  style={{ display: "block" }}
                >
                  Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              ) : (
                <span className="indicator-label">Reset Password</span>
              )}
            </button>
          </div>
        </>
      )}

      <div className="text-gray-500 text-center fw-semibold fs-6">
        <button
          type="button"
          className="btn btn-link text-gray-900 fw-bolder"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
