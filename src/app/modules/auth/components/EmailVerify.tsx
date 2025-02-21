import { useEffect, useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useAuth } from "../core/Auth";
import { http_post } from "../../../services/Api";
import { toast } from "react-toastify";
import Utils from "../../../services/Utils";
import { DB_LOGGED_IN_PROFILE } from "../core/AuthHelpers";

const verifySchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  code: Yup.string()
    .min(6, "Minimum 6 symbols")
    .max(6, "Maximum 6 symbols")
    .required("Verification code is required"),
});

export function EmailVerify() {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { saveAuth, setCurrentUser, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      toast.info("You are not logged in. Please login first.");
      navigate("/auth/login");
    }
  }, [currentUser, navigate]);

  const formik = useFormik({
    initialValues: {
      email: currentUser?.email || "",
      code: "",
    },
    validationSchema: verifySchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setStatus("");
      setSubmitting(true);
      setLoading(true);
      setSuccessMessage("");

      try {
        const payload = {
          email: values.email,
          code: values.code,
        };
        const data = await http_post(`/email-verify`, payload);

        if (data.verification !== "Yes") {
          throw new Error("Email verification failed.");
        }
        await Utils.update_logged_in_user();

        //delay for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await Utils.update_logged_in_user();

        toast.success("Email verified successfully!");
        setSuccessMessage("Email verified successfully!");

        navigate("/admin/dashboard");
      } catch (error: any) {
        setStatus(error.message);
        toast.error(error.message);
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const handleResendCode = async () => {
    setResendLoading(true);
    try {
      await http_post(`send-mail-verification-code`, {
        email: currentUser?.email,
      });
      toast.success(
        "Verification code resent successfully! Check your spam folder if not found in your inbox."
      );
    } catch (error: any) {
      toast.error("Failed to resend verification code. " + error.message);
    } finally {
      setResendLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      if (logout) {
        await logout();
      } else {
        setCurrentUser(undefined);
      }
      toast.info("You have been logged out.");
      navigate("/auth/login");
    } catch (error: any) {
      toast.error("Logout failed. " + error.message);
    }
  };

  return (
    <form
      className="form w-100"
      onSubmit={formik.handleSubmit}
      noValidate
      id="kt_email_verify_form"
    >
      {/* add test button */}
      {/* <button
        type="button"
        className="btn btn-primary"
        onClick={async () => {
          Utils.update_logged_in_user();
          // const profile = Utils.getStorage(DB_LOGGED_IN_PROFILE);
          // console.log("profile", profile);
        }}
      >
        Test
      </button> */}

      <div className="text-center mb-11">
        <div className="text-gray-500 fw-semibold fs-6">Email Verification</div>
        <h1 className="text-gray-900 fw-bolder mb-3 mt-1">Verify Your Email</h1>
        <div className="mb-12">
          <img
            alt="Logo"
            src={toAbsoluteUrl("media/logos/logo.svg")}
            className="h-75px"
          />
        </div>
      </div>

      {formik.status && (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      )}

      {successMessage && (
        <div className="mb-lg-15 alert alert-success">
          <div className="alert-text font-weight-bold">{successMessage}</div>
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
          disabled
          readOnly
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.email}</span>
          </div>
        )}
      </div>

      <div className="fv-row mb-3">
        <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
          Enter the verification code sent to your email address
        </label>
        <input
          autoComplete="off"
          {...formik.getFieldProps("code")}
          className={clsx("form-control bg-transparent", {
            "is-invalid": formik.touched.code && formik.errors.code,
            "is-valid": formik.touched.code && !formik.errors.code,
          })}
          type="text"
          name="code"
        />
        {formik.touched.code && formik.errors.code && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.code}</span>
            </div>
          </div>
        )}
      </div>

      <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
        <div>
          <button
            type="button"
            className="btn btn-link"
            onClick={handleResendCode}
            disabled={resendLoading}
          >
            {resendLoading
              ? "Resending..."
              : "Did not receive the code? Resend Code"}
          </button>
        </div>
      </div>

      <div className="d-grid mb-10">
        <button
          type="submit"
          id="kt_verify_submit"
          className="btn btn-primary"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className="indicator-label">Verify Email</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </div>

      <div className="text-gray-500 text-center fw-semibold fs-6">
        Want to cancel?{" "}
        <button
          type="button"
          className="btn btn-link text-danger fw-bolder"
          onClick={handleCancel}
        >
          Logout
        </button>
      </div>
    </form>
  );
}
