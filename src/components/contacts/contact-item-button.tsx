interface ContactItemButtonProps {
  color?: string;
  bgColor?: string;
  text?: string;
  clickEvent?: () => void;
}

export const ContactItemButton = ({
  color,
  bgColor,
  text,
  clickEvent,
}: ContactItemButtonProps) => {
  return (
    <>
      <button
        className={`${color ? color : 'text-white'} ${
          bgColor ? bgColor : 'bg-emerald-600'
        } pl-4 pr-4 pt-1 pb-1 rounded-2xl mr-1 cursor-pointer`}
        onClick={clickEvent}
      >
        {text ? text : 'Activate'}
      </button>
    </>
  );
};
