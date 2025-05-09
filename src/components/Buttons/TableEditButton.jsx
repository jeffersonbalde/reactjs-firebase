import React from "react";

const TableEditButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-sm text-[#24292F] rounded-md shadow-sm bg-[#E1E4E8] hover:bg-[#D5D7DA] transition-colors duration-200 cursor-pointer mr-3"
    >
      Edit
    </button>
  );
};

export default TableEditButton;