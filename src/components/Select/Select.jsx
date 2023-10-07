import React , {useId} from "react";

function Select({ label, options, className = "", ...props }, ref) {
  const id = useId();
  return (
    <select className="select select-ghost w-full max-w-xs capitalize m-2" {...props} id={id} ref={ref}>
      <option disabled value="">
        {label}
      </option>
      {options?.map((option) => (
        <option key={option} className="m-2 text-base" value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default React.forwardRef(Select);
