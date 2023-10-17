import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-[80vh] grid place-items-center">
      <span className=" w-36 lg:w-48 md:w-48 loading loading-infinity  ">
        Loading...
      </span>
    </div>
  );
};

export default Loader;
