import { Field } from "redux-form";
import styles from "./FormsControls.module.css";

export const FormControl = ({
  input,
  meta: { touched, error },
  child,
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

export const Textarea = props => {
  const { input, meta, child, ...RestProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...RestProps} />
    </FormControl>
  );
};

export const Input = props => {
  const { input, meta, child, ...RestProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...RestProps} />
    </FormControl>
  );
};

export const createField = (
  placeholder,
  name,
  validators,
  component,
  props = {},
  text = ""
) => (
  <div>
    <Field
      validate={validators}
      placeholder={placeholder}
      component={component}
      name={name}
      {...props}
    />{" "}
    {text}
  </div>
);
