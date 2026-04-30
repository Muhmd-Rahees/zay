import React from "react";

const LoadSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="w-20 h-20 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadSpinner;
