import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

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

  const handleAdd = async (e) => {
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

      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required and cannot be empty.",
        showConfirmButton: true,
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          htmlContainer: "swal-text",
          icon: "swal-icon",
          confirmButton: "swal-confirm",
        },
        didOpen: () => {
          const popup = document.querySelector(".swal-popup");
          const title = document.querySelector(".swal-title");
          const text = document.querySelector(".swal-text");
          const icon = document.querySelector(".swal-icon");

          if (popup) popup.style.padding = "15px";
          if (popup) popup.style.maxWidth = "350px";
          if (icon) icon.style.margin = "10px auto -10px auto";
          if (title) title.style.fontSize = "1.8rem";
          if (text) text.style.fontSize = "1.2rem";
          if (text) text.style.marginBottom = "1.2rem";

          const confirmBtn = document.querySelector(".swal-confirm");
          if (confirmBtn) {
            confirmBtn.style.backgroundColor = "#7A3200";
            confirmBtn.style.color = "white";
            confirmBtn.style.border = "none";
            confirmBtn.style.padding = "16px 16px";
            confirmBtn.style.borderRadius = "6px";
            confirmBtn.style.transition = "background-color 0.2s";
          }
          const style = document.createElement("style");
          style.innerHTML = `.swal-confirm:hover { background-color: #7A3200 !important; }`;
          document.head.appendChild(style);
        },
      });
    }

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !address.trim() ||
      !contactNumber.trim()
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required and cannot be empty.",
        showConfirmButton: true,
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          htmlContainer: "swal-text",
          icon: "swal-icon",
          confirmButton: "swal-confirm",
        },
        didOpen: () => {
          const popup = document.querySelector(".swal-popup");
          const title = document.querySelector(".swal-title");
          const text = document.querySelector(".swal-text");
          const icon = document.querySelector(".swal-icon");

          if (popup) {
            popup.style.padding = "15px";
            popup.style.maxWidth = "350px";
          }
          if (icon) {
            icon.style.margin = "10px auto -30px auto";
          }
          if (title) {
            title.style.marginBottom = "6px";
            title.style.fontSize = "1.8rem";
          }
          if (text) {
            text.style.marginBottom = "10px";
            text.style.fontSize = "1.2rem";
          }

          const confirmBtn = document.querySelector(".swal-confirm");

          if (confirmBtn) {
            confirmBtn.style.backgroundColor = "#7A3200";
            confirmBtn.style.color = "white";
            confirmBtn.style.border = "none";
            confirmBtn.style.padding = "13px 16px";
            confirmBtn.style.borderRadius = "6px";
            confirmBtn.style.transition = "background-color 0.2s";
          }

          const style = document.createElement("style");
          style.innerHTML = `
                .swal-confirm:hover {
                  background-color: #7A3200 !important;
                }
              `;
          document.head.appendChild(style);
        },
      });
    }

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedAddress = address.trim();
    const trimmedContactNumber = contactNumber.trim();

    const contactNumberPattern = /^[0-9]{11}$/;
    if (!contactNumberPattern.test(trimmedContactNumber)) {
      if (/\D/.test(trimmedContactNumber)) {
        return Swal.fire({
          icon: "error",
          title: "Invalid Contact Number",
          text: "Contact number must only contain numbers.",
          showConfirmButton: true,

          customClass: {
            popup: "swal-popup",
            title: "swal-title",
            htmlContainer: "swal-text",
            icon: "swal-icon",
            confirmButton: "swal-confirm",
          },
          didOpen: () => {
            const popup = document.querySelector(".swal-popup");
            const title = document.querySelector(".swal-title");
            const text = document.querySelector(".swal-text");
            const icon = document.querySelector(".swal-icon");

            if (popup) {
              popup.style.padding = "15px";
              popup.style.maxWidth = "350px";
            }
            if (icon) {
              icon.style.margin = "10px auto -30px auto";
            }
            if (title) {
              title.style.marginBottom = "6px";
              title.style.fontSize = "1.8rem";
            }
            if (text) {
              text.style.marginBottom = "10px";
              text.style.fontSize = "1.2rem";
            }

            const confirmBtn = document.querySelector(".swal-confirm");

            if (confirmBtn) {
              confirmBtn.style.backgroundColor = "#7A3200";
              confirmBtn.style.color = "white";
              confirmBtn.style.border = "none";
              confirmBtn.style.padding = "13px 16px";
              confirmBtn.style.borderRadius = "6px";
              confirmBtn.style.transition = "background-color 0.2s";
            }

            const style = document.createElement("style");
            style.innerHTML = `
                .swal-confirm:hover {
                  background-color: #7A3200 !important;
                }
              `;
            document.head.appendChild(style);
          },
        });
      } else {
        return Swal.fire({
          icon: "error",
          title: "Invalid Contact Number",
          text: "Contact number must be exactly 11 digits.",
          showConfirmButton: true,

          customClass: {
            popup: "swal-popup",
            title: "swal-title",
            htmlContainer: "swal-text",
            icon: "swal-icon",
            confirmButton: "swal-confirm",
          },
          didOpen: () => {
            const popup = document.querySelector(".swal-popup");
            const title = document.querySelector(".swal-title");
            const text = document.querySelector(".swal-text");
            const icon = document.querySelector(".swal-icon");

            if (popup) {
              popup.style.padding = "15px";
              popup.style.maxWidth = "350px";
            }
            if (icon) {
              icon.style.margin = "10px auto -30px auto";
            }
            if (title) {
              title.style.marginBottom = "6px";
              title.style.fontSize = "1.8rem";
            }
            if (text) {
              text.style.marginBottom = "10px";
              text.style.fontSize = "1.2rem";
            }

            const confirmBtn = document.querySelector(".swal-confirm");

            if (confirmBtn) {
              confirmBtn.style.backgroundColor = "#7A3200";
              confirmBtn.style.color = "white";
              confirmBtn.style.border = "none";
              confirmBtn.style.padding = "13px 16px";
              confirmBtn.style.borderRadius = "6px";
              confirmBtn.style.transition = "background-color 0.2s";
            }

            const style = document.createElement("style");
            style.innerHTML = `
                .swal-confirm:hover {
                  background-color: #7A3200 !important;
                }
              `;
            document.head.appendChild(style);
          },
        });
      }
    }

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

    Swal.fire({
      icon: "success",
      title: "Student added successfully!",
      text: `${firstName} ${lastName}'s data has been added.`,
      showConfirmButton: true,

      customClass: {
        popup: "swal-popup",
        title: "swal-title",
        htmlContainer: "swal-text",
        icon: "swal-icon",
        confirmButton: "swal-confirm",
      },
      didOpen: () => {
        const popup = document.querySelector(".swal-popup");
        const title = document.querySelector(".swal-title");
        const text = document.querySelector(".swal-text");
        const icon = document.querySelector(".swal-icon");

        if (popup) {
          popup.style.padding = "15px";
          popup.style.maxWidth = "350px";
        }
        if (icon) {
          icon.style.margin = "10px auto -30px auto";
        }
        if (title) {
          title.style.marginBottom = "6px";
          title.style.fontSize = "1.8rem";
        }
        if (text) {
          text.style.marginBottom = "10px";
          text.style.fontSize = "1.2rem";
        }

        const confirmBtn = document.querySelector(".swal-confirm");

        if (confirmBtn) {
          confirmBtn.style.backgroundColor = "#004332";
          confirmBtn.style.color = "white";
          confirmBtn.style.border = "none";
          confirmBtn.style.padding = "13px 16px";
          confirmBtn.style.borderRadius = "6px";
          confirmBtn.style.transition = "background-color 0.2s";
        }

        const style = document.createElement("style");
        style.innerHTML = `
                .swal-confirm:hover {
                  background-color: #004332 !important;
                }
              `;
        document.head.appendChild(style);
      },
    });
  };

  const handleContactNumberChange = (e) => {
    const value = e.target.value;

    // If non-numeric input is detected
    if (/\D/.test(value)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Only numbers are allowed in the contact number.",
        showConfirmButton: true,
        customClass: {
          /* your custom Swal styles here */
        },
      });
      return; // Don't update the state if invalid
    }

    // If length exceeds 11 digits
    if (value.length > 11) {
      Swal.fire({
        icon: "error",
        title: "Too Long",
        text: "Contact number must not exceed 11 digits.",
        showConfirmButton: true,
        customClass: {
          /* your custom Swal styles here */
        },
      });
      return; // Don't update the state if too long
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
            <form className="space-y-4" onSubmit={handleAdd}>
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
