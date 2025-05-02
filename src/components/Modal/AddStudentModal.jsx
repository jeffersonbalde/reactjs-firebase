import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import showAlert from "../ConfirmationDialog/ConfirmationDialog";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

const AddStudentModal = ({
  isOpen,
  onClose,
  employees,
  setEmployees,
  getEmployees,
}) => {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    contactNumber: false,
  });

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const addressRef = useRef(null);
  const contactNumberRef = useRef(null);

  useEffect(() => {
    if (isOpen && firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, [isOpen]);

  const handleAddValidation = async (e) => {
    e.preventDefault();

    const newErrors = {
      firstName: !firstName.trim() ? "First name is required" : "",
      lastName: !lastName.trim() ? "Last name is required" : "",
      address: !address.trim() ? "Address is required" : "",
      contactNumber: !contactNumber.trim() ? "Contact number is required" : "",
    };

    setErrors(newErrors);

    const firstErrorField = Object.keys(newErrors).find(
      (key) => newErrors[key]
    );

    if (firstErrorField) {
      switch (firstErrorField) {
        case "firstName":
          firstNameRef.current.focus();
          break;
        case "lastName":
          lastNameRef.current.focus();
          break;
        case "address":
          addressRef.current.focus();
          break;
        case "contactNumber":
          contactNumberRef.current.focus();
          break;
        default:
          break;
      }

      return showAlert({
        icon: "error",
        title: "Error!",
        text: "Please fill in all required fields.",
      });
    }

    const trimmedContactNumber = contactNumber.trim();
    const contactNumberPattern = /^[0-9]{11}$/;
    
    if (!contactNumberPattern.test(trimmedContactNumber)) {
      contactNumberRef.current.focus(); // Always focus the input
    
      if (/\D/.test(trimmedContactNumber)) {
        return showAlert({
          icon: "error",
          title: "Error!",
          text: "Only numbers are allowed in the contact number.",
        });
      } else {
        return showAlert({
          icon: "error",
          title: "Error!",
          text: "Contact number must be exactly 11 digits.",
        });
      }
    }

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedAddress = address.trim();

    const newEmployee = {
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      address: trimmedAddress,
      contactNumber: trimmedContactNumber,
    };

    employees.push(newEmployee);

    try {
      await addDoc(collection(db, "employees"), {
        ...newEmployee,
      });
    } catch (error) {
      console.log(error);
    }

    setEmployees(employees);
    onClose();

    setFirstName("");
    setLastName("");
    setAddress("");
    setContactNumber("");

    getEmployees();

    return showAlert({
      icon: "success",
      title: "Student added successfully!",
      text: `${firstName} ${lastName}'s data has been added.`,
    });
  };

  const handleContactNumberChange = (e) => {
    const value = e.target.value;

    // If non-numeric input is detected
    if (/\D/.test(value)) {
      return showAlert({
        icon: "error",
        title: "Error!",
        text: "Only numbers are allowed in the contact number.",
      });
    }

    // If length exceeds 11 digits
    if (value.length > 11) {
      return showAlert({
        icon: "error",
        title: "Error!",
        text: "Contact number must not exceed 11 digits.",
      });
    }

    setContactNumber(value); // If valid, update normally
    if (errors.contactNumber && e.target.value.trim() !== "") {
      setErrors((prev) => ({ ...prev, contactNumber: false }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.30)] "
            style={{ backgroundColor: "rgba(0, 0, 0, 0.30)" }}
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
            <h2 className="text-xl font-bold mb-6 border-b border-gray-300 pb-5">
              Add New Student
            </h2>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleAddValidation}>
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="firstName"
                  className="text-md font-medium text-black"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  ref={firstNameRef}
                  type="text"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (errors.firstName && e.target.value.trim() !== "") {
                      setErrors((prev) => ({ ...prev, firstName: false }));
                    }
                  }}
                  className={`w-full p-3 border rounded-md outline-none transition text-black font-medium
                      ${
                        errors.firstName
                          ? "shadow-md border-red-500 ring-0 ring-red-400"
                          : "shadow-sm border-gray-300 focus:border-blue-500 focus:ring-0 focus:ring-blue-500 focus:shadow-md"
                      }`}
                />
                {errors.firstName && (
                  <div style={{ color: "red", fontSize: "1.1rem" }}>
                    {errors.firstName}
                  </div>
                )}
              </div>

              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="lastName"
                  className="text-md font-medium text-black"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                  value={lastName}
                  ref={lastNameRef}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (errors.lastName && e.target.value.trim() !== "") {
                      setErrors((prev) => ({ ...prev, lastName: false }));
                    }
                  }}
                  className={`w-full p-3 border rounded-md outline-none transition text-black font-medium
                    ${
                      errors.lastName
                        ? "shadow-md border-red-500 ring-0 ring-red-400"
                        : "shadow-sm border-gray-300 focus:border-blue-500 focus:ring-0 focus:ring-blue-500 focus:shadow-md"
                    }`}
                />
                {errors.lastName && (
                  <div style={{ color: "red", fontSize: "1.1rem" }}>
                    {errors.lastName}
                  </div>
                )}
              </div>

              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="address"
                  className="text-md font-medium text-black"
                >
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Enter Address"
                  value={address}
                  ref={addressRef}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address && e.target.value.trim() !== "") {
                      setErrors((prev) => ({ ...prev, address: false }));
                    }
                  }}
                  className={`w-full p-3 border rounded-md outline-none transition text-black font-medium
                      ${
                        errors.address
                          ? "shadow-md border-red-500 ring-0 ring-red-400"
                          : "shadow-sm border-gray-300 focus:border-blue-500 focus:ring-0 focus:ring-blue-500 focus:shadow-md"
                      }`}
                />
                {errors.address && (
                  <div style={{ color: "red", fontSize: "1.1rem" }}>
                    {errors.address}
                  </div>
                )}
              </div>

              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="contactNumber"
                  className="text-md font-medium text-black"
                >
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactNumber"
                  type="text"
                  placeholder="Enter Contact Number"
                  value={contactNumber}
                  ref={contactNumberRef}
                  // onChange={(e) => {
                  //   setContactNumber(e.target.value);
                  //   if (errors.contactNumber && e.target.value.trim() !== "") {
                  //     setErrors((prev) => ({ ...prev, contactNumber: false }));
                  //   }
                  // }}
                  onChange={handleContactNumberChange}
                  className={`w-full p-3 border rounded-md outline-none transition text-black font-medium
                    ${
                      errors.contactNumber
                        ? "shadow-md border-red-500 ring-0 ring-red-400"
                        : "shadow-sm border-gray-300 focus:border-blue-500 focus:ring-0 focus:ring-blue-500 focus:shadow-md"
                    }`}
                />
                {errors.contactNumber && (
                  <div style={{ color: "red", fontSize: "1.1rem" }}>
                    {errors.contactNumber}
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6 gap-3">
                <motion.button
                  type="submit"
                  whileHover={{ y: -3 }} // Moves the button up when hovered
                  transition={{ duration: 0.3 }}
                  className="px-6 py-2 text-white bg-[#004332] rounded-lg shadow-md hover:bg-[#003022] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
                >
                  Add
                </motion.button>

                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ y: -3 }} // Moves the button up when hovered
                  transition={{ duration: 0.3 }}
                  className="px-6 py-2 text-white bg-[#7A3200] rounded-lg shadow-md hover:bg-[#5c2400] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 cursor-pointer"
                >
                  Close
                </motion.button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddStudentModal;