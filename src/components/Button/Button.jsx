import React from "react";

const Button = ({
  text,

  type = "button",

  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className= {`btn btn-secondary bg-transparent border border-stone-500 input-bordered --tw-border-opacity: 0.2  text-white ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
