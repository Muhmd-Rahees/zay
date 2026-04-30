import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="w-20 h-20 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
