// src/components/form/FormComponents.tsx

import React from "react";
import clsx from "clsx";
import { FieldProps } from "formik";
import { FieldInputProps, FormikProps } from "formik";

//
// ErrorMessage Component
//
const ErrorMessage: React.FC<{ error: string | undefined }> = ({ error }) => {
  return error ? <div className="text-danger mt-1">{error}</div> : null;
};

//
// TextInput Component
//
export const TextInput: React.FC<
  FieldProps & { label: string; placeholder?: string; type?: string }
> = ({ field, form, label, placeholder = "", type = "text" }) => {
  const isError = form.touched[field.name] && form.errors[field.name];

  return (
    <div className="mb-4">
      <label className="form-label fs-6 fw-bolder text-gray-900">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...field}
        value={field.value ?? ""}
        className={clsx(
          "form-control bg-transparent",
          { "is-invalid": isError },
          { "is-valid": !isError && form.touched[field.name] }
        )}
      />
      <ErrorMessage error={form.errors[field.name] as string} />
    </div>
  );
};
//
// SelectInput Component
//
export const SelectInput: React.FC<
  FieldProps & { label: string; options: { value: string; label: string }[] }
> = ({ field, form, label, options }) => {
  const isError = form.touched[field.name] && form.errors[field.name];

  return (
    <div className="mb-4">
      <label className="form-label fs-6 fw-bolder text-gray-900">{label}</label>
      <select
        {...field}
        value={field.value ?? ""}
        className={clsx(
          "form-select bg-transparent",
          { "is-invalid": isError },
          { "is-valid": !isError && form.touched[field.name] }
        )}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessage error={form.errors[field.name] as string} />
    </div>
  );
};
//
// DateInput Component
//
export const DateInput: React.FC<FieldProps & { label: string }> = ({
  field,
  form,
  label,
}) => {
  const isError = form.touched[field.name] && form.errors[field.name];

  return (
    <div className="mb-4">
      <label className="form-label fs-6 fw-bolder text-gray-900">{label}</label>
      <input
        type="date"
        {...field}
        value={field.value ?? ""}
        className={clsx(
          "form-control bg-transparent",
          { "is-invalid": isError },
          { "is-valid": !isError && form.touched[field.name] }
        )}
      />
      <ErrorMessage error={form.errors[field.name] as string} />
    </div>
  );
};
//
// TextArea Component
//
export const TextArea: React.FC<
  FieldProps & { label: string; placeholder?: string }
> = ({ field, form, label, placeholder = "" }) => {
  const isError = form.touched[field.name] && form.errors[field.name];

  return (
    <div className="mb-4">
      <label className="form-label fs-6 fw-bolder text-gray-900">{label}</label>
      <textarea
        placeholder={placeholder}
        {...field}
        value={field.value ?? ""}
        className={clsx(
          "form-control bg-transparent",
          { "is-invalid": isError },
          { "is-valid": !isError && form.touched[field.name] }
        )}
      />
      <ErrorMessage error={form.errors[field.name] as string} />
    </div>
  );
};
//
// Checkbox Component
//
export const Checkbox: React.FC<FieldProps & { label: string }> = ({
  field,
  form,
  label,
}) => {
  const isError = form.touched[field.name] && form.errors[field.name];

  return (
    <div className="mb-4 form-check">
      <input
        type="checkbox"
        checked={field.value ?? false}
        onChange={field.onChange}
        onBlur={field.onBlur}
        name={field.name}
        className={clsx(
          "form-check-input",
          { "is-invalid": isError },
          { "is-valid": !isError && form.touched[field.name] }
        )}
      />
      <label className="form-check-label">{label}</label>
      <ErrorMessage error={form.errors[field.name] as string} />
    </div>
  );
};
//
// RadioButton Component
//
interface RadioOption {
  value: string;
  label: string;
}

interface RadioButtonProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  options: RadioOption[];
  label: string;
  radioClass?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  field,
  form,
  options,
  label,
  radioClass,
  onChange: customOnChange,
}) => {
  return (
    <div>
      <label className="form-label fs-6 fw-bolder text-gray-900">{label}</label>
      <div className="mb-4 mt-3">
        {options.map((option) => (
          <div className={radioClass} key={option.value}>
            <input
              type="radio"
              name={field.name}
              value={option.value}
              checked={field.value === option.value}
              onChange={(e) => {
                form.setFieldValue(field.name, e.target.value);
                if (customOnChange) {
                  customOnChange(e);
                }
              }}
              className="form-check-input"
            />
            <label className="form-check-label">{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

//
// SubmitButton Component
//
export const SubmitButton: React.FC<{
  label: string;
  isSubmitting: boolean;
}> = ({ label, isSubmitting }) => {
  return (
    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
      {isSubmitting ? "Submitting..." : label}
    </button>
  );
};
