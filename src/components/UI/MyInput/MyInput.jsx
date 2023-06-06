import css from "./MyInput.module.css";

const MyInput = ({
  name,
  label,
  register,
  errors,
  required,
  type,
  validationSchema,
  handleBlur,
  variant = "input",
  placeholder = "",
}) => {
  return variant === "textarea" ? (
    <div className={css.inputWrp}>
      <label htmlFor={name} className={css.inputLabel}>
        {label}
        {/* {required && "*"} */}
      </label>
      <textarea
        className={css.textarea}
        id={name}
        name={name}
        type={type}
        {...register(name, validationSchema)}
        onBlur={() => handleBlur(`${name}`)}
        rows="5"
        placeholder={placeholder}
      />
      {errors[name] && <p className={css.error}>{errors[name].message}</p>}
    </div>
  ) : (
    <div className={css.inputWrp}>
      <label htmlFor={name} className={css.inputLabel}>
        {label}
        {/* {required && "*"} */}
      </label>
      <input
        className={css.input}
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        {...register(name, validationSchema)}
        onBlur={() => handleBlur(`${name}`)}
      />
      {errors[name] && <p className={css.error}>{errors[name].message}</p>}
    </div>
  );
};
export default MyInput;
