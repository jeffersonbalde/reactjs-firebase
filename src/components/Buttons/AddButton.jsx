import React from "react";
import { FaUserPlus } from "react-icons/fa"; // default icon
import { motion } from "framer-motion";

const AddButton = ({ onClick, text = "Add Student", Icon = FaUserPlus }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2 px-5 py-2.5 bg-[#00304F] text-white rounded-lg shadow-md hover:bg-[#00304F] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
    >
      <Icon size={16} />
      <span className="text-sm font-medium">{text}</span>
    </motion.button>
  );
};

export default AddButton;