import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const AddEmployeeModal = ({isOpen, onClose}) => {
  return (
    <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
        className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.30)] "
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.30)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md bg-white rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
          animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
          exit={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
        >
          <h2 className="text-xl font-bold mb-4">Add New Student</h2>

          {/* Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Contact Number"
              className="w-full px-4 py-2 border rounded-md"
            />

            <div className="flex justify-end mt-6">
              <button
                type="button"   
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
              >
                Close
              </button>
            </div>
          </form>
        </motion.div>
      </>
    )}
  </AnimatePresence>
  )
}

export default AddEmployeeModal