import React from "react";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from "../../../utils/validators/validators";
import styles from "./FormsControls.module.css";

type FormControlPropsType = {
  meta: WrappedFieldMetaProps;
  children: React.ReactNode;
};
export const FormControl: React.FC<FormControlPropsType> = ({
  meta: { touched, error },
  children,
}) => {
  const hasError = touched && error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{children}</div>
      <div>{hasError && <span>{error}</span>}</div>
    </div>
  );
};

export const Textarea: React.FC<WrappedFieldProps> = props => {
  // const { input, meta, child, ...RestProps } = props;
  const { input, meta, ...RestProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...RestProps} />
    </FormControl>
  );
};

export const Input: React.FC<WrappedFieldProps> = props => {
  // const { input, meta, child, ...RestProps } = props;
  const { input, meta, ...RestProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...RestProps} />
    </FormControl>
  );
};

export function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: React.FC<WrappedFieldProps>,
  props = {},
  text = ""
) {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />
      {text}
    </div>
  );
}

export type GetStringKeys<T> = Extract<keyof T, string>;
