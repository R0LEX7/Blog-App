import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {

    const id = useId();
  return (
    <div className="form-control w-full max-w-xs">
      {label && (
        <label className="label">
          <span className="label-text capitalize">{label}</span>
        </label>
      )}
      <input
        type={type}
        placeholder="Type here"
        className={`input input-bordered w-full max-w-xs ${className}`}
        ref={ref}
        {...props}
        id = {id}
      />
    </div>
  );
});

export default Input;
