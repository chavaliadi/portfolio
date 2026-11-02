import React from "react";

const Alert = ({ type, text }) => {
  return (
    <div className='fixed top-24 left-0 right-0 z-50 flex justify-center items-center px-4 pointer-events-none'>
      <div
        className={`px-5 py-3 rounded-xl border flex items-center gap-3 shadow-xl backdrop-blur-md transition-all ${
          type === "danger"
            ? "bg-red-950/90 text-red-200 border-red-800"
            : "bg-emerald-950/90 text-emerald-200 border-emerald-800"
        }`}
        role='alert'
      >
        <span
          className={`px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${
            type === "danger"
              ? "bg-red-500/20 text-red-300"
              : "bg-emerald-500/20 text-emerald-300"
          }`}
        >
          {type === "danger" ? "Error" : "Success"}
        </span>
        <p className='text-sm font-medium'>{text}</p>
      </div>
    </div>
  );
};

export default Alert;
