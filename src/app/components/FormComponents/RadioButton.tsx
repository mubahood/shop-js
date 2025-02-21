import React from "react";
import { FieldInputProps, FormikProps } from "formik";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioButtonProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  options: RadioOption[];
  radioClass?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  field,
  form,
  options,
  radioClass,
  onChange: customOnChange,
}) => {
  return (
    <>
      {options.map((option) => (
        <div className={radioClass} key={option.value}>
          <input
            type="radio"
            id={`${field.name}-${option.value}`}
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
          <label
            htmlFor={`${field.name}-${option.value}`}
            className="form-check-label"
          >
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default RadioButton;
