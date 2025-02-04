interface FormButtonProps {
  customButtonClass?: string;
  label?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  clickEvent?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export const FormButton = (props: FormButtonProps) => {
  const { customButtonClass, label, buttonType = 'button', clickEvent } = props;
  const defaultButtonClass =
    'cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';

  return (
    <>
      <button
        onClick={clickEvent}
        className={defaultButtonClass ? defaultButtonClass : customButtonClass}
        type={buttonType}
      >
        {label}
      </button>
    </>
  );
};
