interface FormInputProps {
  label?: string;
  placeholder?: string;
  id?: string;
  htmlFor?: string;
  labelClass?: string;
  inputClass?: string;
  type?: string;
  name?: string;
}

export const FormInput = (props: FormInputProps) => {
  const {
    label,
    placeholder,
    id,
    htmlFor,
    inputClass,
    labelClass,
    type = 'text',
    name,
  } = props;
  const defaultInputClass =
    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
  const defaultLabelClass = 'block text-gray-700 text-sm font-bold mb-2';

  return (
    <>
      <label className={`${defaultLabelClass} ${labelClass}`} htmlFor={htmlFor}>
        {label}
      </label>
      <input
        className={`${defaultInputClass} ${inputClass}`}
        id={id}
        type={type}
        placeholder={placeholder}
        name={name}
      />
    </>
  );
};
