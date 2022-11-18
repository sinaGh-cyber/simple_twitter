const FormInput = ({
  label,
  name,
  validation,
  placeHolder,
  useFormInput,
  type,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormInput;

  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        dir="ltr"
        className="w-72  rounded-md   border-gray-dark focus:border-blue outline-none border-2 mt-2 py-2 px-3"
        placeholder={placeHolder}
        type={type}
        id={name}
        {...register(name, validation)}
      />
      {errors[name] && <p>{errors[name].message}</p>}
    </div>
  );
};

export default FormInput;
