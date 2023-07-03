import styles from "./FormsControls.module.css";

export const FormControl = ({ input, meta, child, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{props.children}</div>
      <idv>{hasError && <span>{meta.error}</span>}</idv>
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
